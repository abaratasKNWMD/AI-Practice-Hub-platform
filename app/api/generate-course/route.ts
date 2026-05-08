// ═══════════════════════════════════════════════════════════════
// /api/generate-course — 3-Agent Pipeline with SSE streaming
// ═══════════════════════════════════════════════════════════════
// POST body: { content: string, title: string, template: CourseTemplate, duration: DurationPreset }
// Returns: text/event-stream with AgentStatus events, final event = { stage:'done', courseId }
// ═══════════════════════════════════════════════════════════════

import { NextRequest } from 'next/server'
import {
  TEMPLATES,
  SCENE_TYPE_CATALOG,
  SCENE_COUNT,
  DURATION_MS,
  type CourseTemplate,
  type DurationPreset,
  type CourseJSON,
  type AgentStatus,
} from '@/lib/course-schema'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const maxDuration = 120

const GROQ_API_KEY = process.env.GROQ_API_KEY!
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const FAST_MODEL = 'llama-3.1-8b-instant'   // Writer: small, fast, ~4x fewer tokens
const SMART_MODEL = 'llama-3.3-70b-versatile' // Analyst + Director: needs reasoning

// ── Groq call helper ──────────────────────────────────────────

async function groqCall(model: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.4,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq error ${res.status}: ${err}`)
  }
  const data = await res.json()
  return data.choices[0].message.content
}

// ── SSE helper ────────────────────────────────────────────────

function sseEvent(controller: ReadableStreamDefaultController, status: AgentStatus) {
  const encoder = new TextEncoder()
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(status)}\n\n`))
}

// ── AGENT 1: Analyst ──────────────────────────────────────────
// Reads the raw content, extracts key concepts, decides structure

async function runAnalyst(
  content: string,
  title: string,
  template: CourseTemplate,
  duration: DurationPreset
): Promise<{ blocks: { heading: string; body: string; suggestedScene: string }[]; detectedLanguage: string }> {
  const sceneCount = SCENE_COUNT[duration]
  const templateDef = TEMPLATES[template]

  const system = `You are a curriculum analyst. Your job is to read a document and extract exactly ${sceneCount} content blocks that will become scenes in a visual course.

Template: ${templateDef.label} — ${templateDef.description}
Preferred scene types: ${templateDef.preferredScenes.join(', ')}

Available scene types and when to use them:
${Object.entries(SCENE_TYPE_CATALOG).map(([type, def]) => `- ${type}: ${def.description}`).join('\n')}

Rules:
- Extract exactly ${sceneCount} blocks (including title as first and finale as last)
- First block MUST have suggestedScene: "title"
- Last block MUST have suggestedScene: "finale"
- Choose suggestedScene from: ${Object.keys(SCENE_TYPE_CATALOG).join(', ')}
- Each block heading should be concise (max 8 words)
- Each block body should summarize the key idea in 2-4 sentences
- Detect the language of the input document

Respond with valid JSON only: { "blocks": [...], "detectedLanguage": "es" | "en" | ... }`

  const raw = await groqCall(FAST_MODEL, system, `Document title: "${title}"\n\nContent:\n${content.slice(0, 8000)}`)
  return JSON.parse(raw)
}

// ── AGENT 2: Director ─────────────────────────────────────────
// Takes blocks, assigns timestamps, writes subtitle scripts

async function runDirector(
  blocks: { heading: string; body: string; suggestedScene: string }[],
  title: string,
  template: CourseTemplate,
  duration: DurationPreset,
  detectedLanguage: string
): Promise<{ scenes: { id: string; name: string; startMs: number; endMs: number; type: string; subtitleScript: string[] }[] }> {
  const totalMs = DURATION_MS[duration]
  const templateDef = TEMPLATES[template]
  const msPerScene = Math.floor(totalMs / blocks.length)

  // Build timestamp plan
  const timestampPlan = blocks.map((b, i) => ({
    index: i,
    heading: b.heading,
    suggestedScene: b.suggestedScene,
    startMs: i * msPerScene,
    endMs: Math.min((i + 1) * msPerScene, totalMs),
  }))

  const system = `You are a video director for interactive educational content.
You receive a list of content blocks with timestamps and you must:
1. Confirm or adjust the scene type for each block (you may override suggestedScene if another type fits better)
2. Write 2-4 subtitle lines per scene (the narrator's spoken words)
3. Make subtitles match the voice tone: ${templateDef.voiceTone}
4. Write subtitles in language: ${detectedLanguage}
5. Each subtitle line should be max 12 words — punchy and clear

Scene types available: ${Object.keys(SCENE_TYPE_CATALOG).join(', ')}

Respond with valid JSON only:
{
  "scenes": [
    {
      "id": "scene-001",
      "name": "heading here",
      "startMs": 0,
      "endMs": 60000,
      "type": "title",
      "subtitleScript": ["Line 1 — max 12 words", "Line 2", "Line 3"]
    }
  ]
}`

  const raw = await groqCall(SMART_MODEL, system, JSON.stringify(timestampPlan))
  return JSON.parse(raw)
}

// ── AGENT 3: Writer (runs each scene in parallel) ─────────────
// Fills in the actual scene content for each scene type

async function runWriter(
  directorScene: { id: string; name: string; startMs: number; endMs: number; type: string; subtitleScript: string[] },
  originalBlock: { heading: string; body: string },
  language: string
): Promise<object> {
  const sceneDef = SCENE_TYPE_CATALOG[directorScene.type as keyof typeof SCENE_TYPE_CATALOG]
  if (!sceneDef) return {}

  const subtitleDurationMs = Math.floor((directorScene.endMs - directorScene.startMs) / (directorScene.subtitleScript.length + 1))

  // Keep example compact to minimise tokens sent to the model
  const exampleJSON = JSON.stringify(sceneDef.example)

  // Pre-compute subtitle timestamps so the LLM never needs to do math
  const sceneStart = directorScene.startMs
  const sceneEnd = directorScene.endMs
  const lines = directorScene.subtitleScript
  const slotMs = Math.floor((sceneEnd - sceneStart) / Math.max(lines.length, 1))
  const precomputedSubtitles = lines.map((text, i) => ({
    text,
    startMs: sceneStart + i * slotMs + 1000,
    endMs: Math.min(sceneStart + (i + 1) * slotMs, sceneEnd),
  }))

  const system = `You are a content writer for interactive video slides. You MUST follow the JSON contract EXACTLY.

Scene type: "${directorScene.type}"
Language for all text: ${language}

CRITICAL RULES:
1. Use EXACTLY the field names shown in the example — do NOT rename, add or remove fields
2. The example IS the schema — copy its structure exactly, only change the values
3. Do NOT wrap the content in extra keys — return it flat as shown
4. ALL numeric values in the JSON MUST be plain integers — NEVER write arithmetic expressions like "420000 + 1000". Pre-calculate every number yourself.

EXACT SCHEMA EXAMPLE (copy structure, replace values):
${exampleJSON}

The "subtitles" array is already computed for you — use these EXACT values, do NOT modify the numbers:
${JSON.stringify(precomputedSubtitles, null, 2)}

Respond with ONLY valid JSON with no comments, no trailing commas, and no expressions:
{
  "content": { /* fill using the schema above */ },
  "subtitles": [ /* copy the precomputed array EXACTLY as provided */ ]
}`

  const userPrompt = `Scene name: "${directorScene.name}"
Scene type: ${directorScene.type}
Source content to adapt: ${originalBlock.body}`

  const raw = await groqCall(FAST_MODEL, system, userPrompt)
  return JSON.parse(raw)
}

// ── Main route handler ────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    content,
    title = 'Untitled Course',
    template = 'technical',
    duration = 10,
  }: {
    content: string
    title: string
    template: CourseTemplate
    duration: DurationPreset
  } = body

  if (!content || content.trim().length < 50) {
    return new Response(JSON.stringify({ error: 'Content too short' }), { status: 400 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // ── AGENT 1: Analyst ─────────────────────────────────
        sseEvent(controller, { stage: 'analyst', message: 'Analizando documento...', progress: 5, detail: 'Extrayendo conceptos clave y estructura' })

        const { blocks, detectedLanguage } = await runAnalyst(content, title, template, duration)
        console.log('[v0] Analyst done. blocks:', blocks.length, 'lang:', detectedLanguage)
        console.log('[v0] First block:', JSON.stringify(blocks[0]))

        sseEvent(controller, { stage: 'analyst', message: `${blocks.length} bloques de contenido identificados`, progress: 25, detail: `Idioma detectado: ${detectedLanguage}` })

        // ── AGENT 2: Director ────────────────────────────────
        sseEvent(controller, { stage: 'director', message: 'Director organizando escenas...', progress: 30, detail: 'Asignando tipos de escena y timestamps' })

        const { scenes: directorScenes } = await runDirector(blocks, title, template, duration, detectedLanguage)
        console.log('[v0] Director done. scenes:', directorScenes.length)
        console.log('[v0] First scene:', JSON.stringify(directorScenes[0]))

        sseEvent(controller, { stage: 'director', message: `${directorScenes.length} escenas planificadas`, progress: 50, detail: 'Guión narrativo completado' })

        // ── AGENT 3: Writer (sequential with delay to respect 12k TPM limit) ──
        sseEvent(controller, { stage: 'writer', message: 'Generando contenido de escenas...', progress: 55, detail: `Escribiendo ${directorScenes.length} escenas` })

        const fullScenes: object[] = []
        for (let i = 0; i < directorScenes.length; i++) {
          const scene = directorScenes[i]
          const block = blocks[i] || blocks[blocks.length - 1]
          const result = await runWriter(scene, block, detectedLanguage)
          fullScenes.push(result)

          const pct = 55 + Math.floor(((i + 1) / directorScenes.length) * 35)
          sseEvent(controller, {
            stage: 'writer',
            message: `Escena ${i + 1} de ${directorScenes.length}: "${scene.name}"`,
            progress: pct,
            detail: `Tipo: ${scene.type}`,
          })

          // Wait 2s between scenes to stay well under 12k TPM (free tier)
          if (i < directorScenes.length - 1) {
            await new Promise(r => setTimeout(r, 2000))
          }
        }

        // ── Assemble final CourseJSON ─────────────────────────
        const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}-${Date.now()}`

        const courseJSON: CourseJSON = {
          id: slug,
          title,
          description: blocks[1]?.body || title,
          template,
          durationPreset: duration,
          durationMs: DURATION_MS[duration],
          voice: 'es-ES-AlvaroNeural',
          author: 'CourseScript AI',
          createdAt: new Date().toISOString(),
          chapters: directorScenes
            .filter((_, i) => i % 3 === 0)
            .map((s) => ({ id: s.id, label: s.name, startMs: s.startMs })),
          scenes: directorScenes.map((s, i) => {
            const writerOutput = fullScenes[i] as { content?: object; subtitles?: object[] } | undefined
            return {
              id: s.id,
              name: s.name,
              startMs: s.startMs,
              endMs: s.endMs,
              type: s.type as any,
              content: writerOutput?.content || {},
              subtitles: (writerOutput?.subtitles || []) as any,
            }
          }),
        }

        // ── Write file ────────────────────────────────────────
        const coursesDir = path.join(process.cwd(), 'public', 'courses')
        await fs.mkdir(coursesDir, { recursive: true })
        const filePath = path.join(coursesDir, `${slug}.json`)
        await fs.writeFile(filePath, JSON.stringify(courseJSON, null, 2), 'utf-8')
        console.log('[v0] Course written to:', filePath)
        console.log('[v0] Scene count:', courseJSON.scenes.length)
        console.log('[v0] First scene type:', courseJSON.scenes[0]?.type)
        console.log('[v0] First scene content keys:', Object.keys(courseJSON.scenes[0]?.content as object || {}))

        // ── Final SSE event ───────────────────────────────────
        sseEvent(controller, {
          stage: 'done',
          message: 'Curso generado con exito',
          progress: 100,
          detail: slug,
        })

        controller.close()
      } catch (err) {
        sseEvent(controller, {
          stage: 'error',
          message: err instanceof Error ? err.message : 'Error desconocido',
          progress: 0,
        })
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
