import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const sceneKinds = new Set([
  'title',
  'concept',
  'compare',
  'linear',
  'thinking',
  'coding',
  'preview',
  'error',
  'finale',
  'prompt',
  'streaming',
  'diff',
  'terminal',
  'pr-review',
  'cost',
  'decision',
  'pause',
  'quiz',
  'branch',
  'risk',
])
const templates = new Set(['technical', 'sales', 'onboarding', 'executive'])
const durations = new Set([10, 20, 30, 60])

const root = process.cwd()
const blueprintDir = path.join(root, 'public', 'video-blueprints')
const outputDir = path.join(root, 'public', 'courses')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function secondsToMs(seconds) {
  return Math.round(seconds * 1000)
}

function validateBlueprint(blueprint, filename) {
  assert(typeof blueprint.id === 'string' && blueprint.id, `${filename}: missing id`)
  assert(typeof blueprint.title === 'string' && blueprint.title, `${filename}: missing title`)
  assert(typeof blueprint.description === 'string' && blueprint.description, `${filename}: missing description`)
  assert(durations.has(blueprint.durationMin), `${filename}: durationMin must be 10, 20, 30 or 60`)
  assert(templates.has(blueprint.template ?? 'technical'), `${filename}: invalid template`)
  assert(Array.isArray(blueprint.chapters) && blueprint.chapters.length, `${filename}: chapters required`)
  assert(Array.isArray(blueprint.scenes) && blueprint.scenes.length > 1, `${filename}: scenes required`)

  const ids = new Set()
  let totalSec = 0
  for (const scene of blueprint.scenes) {
    assert(typeof scene.id === 'string' && scene.id, `${filename}: scene missing id`)
    assert(!ids.has(scene.id), `${filename}: duplicate scene id ${scene.id}`)
    ids.add(scene.id)
    assert(sceneKinds.has(scene.kind), `${filename}: invalid scene kind ${scene.kind}`)
    assert(Number.isInteger(scene.durationSec) && scene.durationSec > 0, `${filename}: invalid duration for ${scene.id}`)
    assert(scene.screen && typeof scene.screen === 'object', `${filename}: ${scene.id} missing screen`)
    assert(scene.screen.content && typeof scene.screen.content === 'object', `${filename}: ${scene.id} missing screen.content`)
    assert(Array.isArray(scene.voiceover) && scene.voiceover.length, `${filename}: ${scene.id} missing voiceover`)
    if (Array.isArray(scene.beats)) {
      let beatTotal = 0
      const beatIds = new Set()
      for (const beat of scene.beats) {
        assert(typeof beat.id === 'string' && beat.id, `${filename}: ${scene.id} beat missing id`)
        assert(!beatIds.has(beat.id), `${filename}: duplicate beat id ${beat.id}`)
        beatIds.add(beat.id)
        assert(typeof beat.label === 'string' && beat.label, `${filename}: ${scene.id} beat missing label`)
        assert(Number.isInteger(beat.durationSec) && beat.durationSec > 0, `${filename}: invalid beat duration for ${scene.id}`)
        if (beat.kind) assert(sceneKinds.has(beat.kind), `${filename}: invalid beat kind ${beat.kind}`)
        beatTotal += beat.durationSec
      }
      assert(beatTotal === scene.durationSec, `${filename}: beat duration sum for ${scene.id} is ${beatTotal}s, expected ${scene.durationSec}s`)
    }
    totalSec += scene.durationSec
  }

  for (const chapter of blueprint.chapters) {
    assert(ids.has(chapter.sceneId), `${filename}: chapter ${chapter.id} references missing scene ${chapter.sceneId}`)
  }

  const expectedSec = blueprint.durationMin * 60
  assert(totalSec === expectedSec, `${filename}: duration sum is ${totalSec}s, expected ${expectedSec}s`)
}

function makeSubtitles(source, startMs, endMs) {
  if (Array.isArray(source.subtitles) && source.subtitles.length) {
    return source.subtitles.map(subtitle => ({
      text: subtitle.text,
      startMs: startMs + secondsToMs(subtitle.startSec),
      endMs: startMs + secondsToMs(subtitle.endSec),
    }))
  }

  const duration = endMs - startMs
  const slice = duration / source.voiceover.length
  return source.voiceover.map((text, index) => {
    const lineStart = startMs + Math.round(slice * index) + 400
    const lineEnd = index === source.voiceover.length - 1
      ? endMs - 500
      : startMs + Math.round(slice * (index + 1)) - 300
    return {
      text,
      startMs: Math.max(startMs, lineStart),
      endMs: Math.min(endMs, Math.max(lineStart + 1200, lineEnd)),
    }
  })
}

function splitDuration(totalSec, parts) {
  const base = Math.floor(totalSec / parts)
  const remainder = totalSec - base * parts
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0))
}

function getAutoBeatKinds(scene) {
  if (scene.kind === 'coding') return ['prompt', 'streaming', 'diff', 'terminal', 'decision', 'risk', 'pr-review', 'cost', 'branch', 'quiz']
  if (scene.kind === 'error') return ['terminal', 'risk', 'prompt', 'streaming', 'diff', 'decision', 'pause', 'terminal', 'cost', 'quiz']
  if (scene.kind === 'compare') return ['decision', 'risk', 'cost', 'quiz', 'prompt', 'streaming', 'branch', 'pause', 'pr-review', 'decision']
  if (scene.kind === 'thinking') return ['streaming', 'decision', 'cost', 'pause', 'prompt', 'branch', 'risk', 'quiz', 'terminal', 'pr-review']
  if (scene.kind === 'linear') return ['branch', 'decision', 'cost', 'pr-review', 'prompt', 'streaming', 'diff', 'terminal', 'risk', 'quiz']
  if (scene.kind === 'preview') return ['pr-review', 'terminal', 'decision', 'cost', 'risk', 'prompt', 'streaming', 'diff', 'pause', 'quiz']
  if (scene.kind === 'finale') return ['quiz', 'pr-review', 'cost', 'pause', 'decision', 'branch', 'risk', 'terminal', 'streaming', 'quiz']
  return ['prompt', 'streaming', 'decision', 'branch', 'cost', 'risk', 'diff', 'terminal', 'pause', 'quiz']
}

function autoBeatCount(blueprint, scene) {
  if (Array.isArray(scene.beats) && scene.beats.length) return scene.beats.length
  if (blueprint.durationMin === 60) return 10
  if (blueprint.durationMin === 30) return 5
  if (blueprint.durationMin === 20) return 4
  if (blueprint.durationMin === 10) return 3
  return 1
}

function vendorProfile(vendor = 'platform') {
  const profiles = {
    codex: {
      name: 'Codex',
      file: 'AGENTS.md',
      surface: 'CLI, IDE y cloud task',
      modelFast: 'modelo rapido para lectura',
      modelStrong: 'modelo fuerte para cambios ambiguos',
      permission: 'readonly antes de workspace-write',
      command: 'pnpm test -- auth.spec.ts',
      artifact: 'diff pequeno, tests y resumen de coste',
      risk: 'ediciones amplias sin plan',
    },
    copilot: {
      name: 'Copilot',
      file: 'copilot-instructions.md',
      surface: 'VS Code Ask, Edit, Agent y PR review',
      modelFast: 'modelo rapido de Copilot Chat',
      modelStrong: 'modelo avanzado para Agent o PR complejo',
      permission: 'seleccion y rutas acotadas',
      command: 'pnpm test -- total.spec.ts',
      artifact: 'patch local, test y comentario de PR',
      risk: 'aceptar sugerencias sin evidencia',
    },
    claude: {
      name: 'Claude',
      file: 'CLAUDE.md',
      surface: 'Claude Code, skills, hooks, subagentes y MCP',
      modelFast: 'modelo eficiente para lectura y clasificacion',
      modelStrong: 'modelo fuerte para arquitectura o automatizacion',
      permission: 'tool access minimo y hooks con rollback',
      command: 'pnpm test -- auth.spec.ts',
      artifact: 'skill, hook o patch con owner',
      risk: 'automatizar sin frontera ni firma humana',
    },
    platform: {
      name: 'AI Practice Hub',
      file: 'ruta-de-aprendizaje.json',
      surface: 'hub, workshops, metricas y tutorias',
      modelFast: 'modelo economico para triaje',
      modelStrong: 'modelo fuerte para criterio transversal',
      permission: 'datos mock y evidencias anonimizadas',
      command: 'pnpm release:smoke',
      artifact: 'decision de ruta, ejercicio y evidencia',
      risk: 'formacion bonita sin transferencia al trabajo real',
    },
  }
  return profiles[vendor] ?? profiles.platform
}

function shortText(value, fallback = 'criterio operativo', max = 118) {
  if (!value) return fallback
  if (typeof value === 'string') return value.length > max ? `${value.slice(0, max - 3)}...` : value
  if (Array.isArray(value)) return shortText(value.join(', '), fallback, max)
  if (typeof value === 'object') {
    const first = Object.values(value).flat().find(item => typeof item === 'string')
    return shortText(first, fallback, max)
  }
  return fallback
}

function sceneSignal(scene) {
  const content = scene.screen?.content ?? {}
  return shortText(
    content.task ?? content.issue ?? content.prompt ?? content.rule ?? content.description ?? content.headline ?? content.title ?? scene.screen?.title,
    scene.name,
  )
}

function pickVoiceover(blueprint, scene, beat, index, count) {
  const profile = vendorProfile(blueprint.vendor)
  if (count === 1) return scene.voiceover
  const text = shortText(scene.voiceover[index % scene.voiceover.length], scene.name, 86)
  const labels = ['Pantalla de accion', 'Contexto visible', 'Decision humana', 'Evidencia', 'Coste y riesgo', 'Checkpoint']
  const label = beat?.label ?? labels[index % labels.length]
  return [
    `${label}: ${text}`,
    `En ${profile.name}, esta pantalla se aterriza en ${profile.surface}.`,
    `La evidencia esperada es ${profile.artifact}.`,
    shortText(scene.action?.detail ?? scene.screen.presenterCue, 'El instructor conecta pantalla, decision y siguiente paso.'),
  ]
}

function stringifySnippet(value) {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value, null, 2).slice(0, 900)
  } catch {
    return 'Contenido de la escena.'
  }
}

function buildOperationalContent(blueprint, scene, beat, index) {
  const profile = vendorProfile(blueprint.vendor)
  const sourceContent = beat.screen?.content ?? scene.screen.content
  const action = beat.action ?? scene.action
  const mode = beat.kind ?? 'decision'
  const title = beat.screen?.title ?? scene.screen.title ?? scene.name
  const snippet = stringifySnippet(sourceContent)
  const signal = sceneSignal(scene)
  const actionDetail = shortText(action?.detail ?? scene.screen.presenterCue, signal)
  const filename = shortText(sourceContent?.filename ?? sourceContent?.file ?? sourceContent?.path ?? profile.file, profile.file)
  const acceptance = sourceContent?.acceptance ?? sourceContent?.expected ?? sourceContent?.checks ?? sourceContent?.rules ?? []
  const acceptanceText = Array.isArray(acceptance) && acceptance.length ? shortText(acceptance[0], 'criterio verificable') : 'criterio verificable'
  const step = index + 1

  return {
    mode,
    vendor: blueprint.vendor,
    title,
    eyebrow: `${blueprint.title} / ${scene.name}`,
    label: beat.label,
    presenterCue: beat.screen?.presenterCue ?? scene.screen.presenterCue,
    actionLabel: action?.label,
    actionDetail,
    expectedOutput: action?.expectedOutput,
    prompt: [
      `Actua como ${profile.name} en modo ${mode}.`,
      `Objetivo: ${signal}.`,
      `Lee ${filename} y solo las rutas necesarias.`,
      `Antes de cambiar nada, devuelve hipotesis, criterio de cierre y riesgo.`,
      `Permiso actual: ${profile.permission}.`,
      `Salida esperada: ${profile.artifact}.`,
    ].join('\n'),
    response: [
      `${profile.name} localiza la senal principal: ${signal}.`,
      `Propone trabajar sobre ${filename} y mantener fuera cualquier cambio no pedido.`,
      `Criterio de cierre: ${acceptanceText}; si falta evidencia, no se aprueba.`,
      `Decision: seguir con ${profile.modelFast} salvo que aparezca acoplamiento real.`,
    ],
    diff: [
      `diff --git a/${filename} b/${filename}`,
      `- // comportamiento implicito sin evidencia: ${signal}`,
      `+ // criterio explicito: ${acceptanceText}`,
      `+ audit.model = "${step % 3 === 0 ? profile.modelStrong : profile.modelFast}"`,
      '+ audit.doneWhen = "test, review y coste registrados"',
    ],
    terminal: [
      `$ ${profile.command}`,
      `PASS ${filename}`,
      `checked: ${acceptanceText}`,
      `model: ${step % 3 === 0 ? profile.modelStrong : profile.modelFast}`,
      `permission: ${profile.permission}`,
    ],
    review: [
      { severity: step % 5 === 0 ? 'high' : 'note', text: `Verificar que ${filename} no arrastra cambios laterales.` },
      { severity: 'medium', text: `${profile.name} debe explicar evidencia, no solo mostrar una respuesta correcta.` },
      { severity: 'note', text: `Owner humano firma si ${acceptanceText} queda demostrado.` },
    ],
    cost: {
      model: step % 3 === 0 ? profile.modelStrong : step % 3 === 1 ? profile.modelFast : 'modelo estandar con contexto reducido',
      tokens: step % 3 === 0 ? 'alto controlado por ventana concreta' : step % 3 === 1 ? 'bajo por lectura acotada' : 'medio por patch y test',
      permission: scene.action?.type === 'tool-run' ? 'ejecucion acotada con comando visible' : profile.permission,
      stopRule: `Parar si ${profile.name} no aporta evidencia nueva en el siguiente intento.`,
    },
    decision: {
      question: `Decision humana antes de continuar con ${profile.name}`,
      options: ['seguir con alcance actual', 'pedir mas contexto', 'subir modelo', 'bloquear y llevar a tutoria'],
      selected: index % 4,
    },
    risk: {
      items: [profile.risk, 'Coste por iteracion', 'Contexto incompleto', 'Calidad de evidencia', 'Responsabilidad humana'],
      level: index % 3 === 0 ? 'bajo' : index % 3 === 1 ? 'medio' : 'alto',
    },
    branch: {
      steps: blueprint.vendor === 'copilot'
        ? ['Issue', 'Ask', 'Edit', 'Agent', 'Tests', 'Review', 'PR']
        : blueprint.vendor === 'claude'
          ? ['Brief', 'CLAUDE.md', 'Skill', 'Hook', 'MCP', 'Eval', 'Signoff']
          : ['Issue', 'Branch', 'Plan', 'Patch', 'Tests', 'Review', 'PR'],
      active: Math.min(6, index + 2),
    },
    quiz: {
      question: `Que evidencia cierra esta pantalla de ${profile.name}?`,
      answers: ['Una respuesta convincente', 'Un diff probado o decision documentada', 'Un prompt mas largo'],
      correct: 1,
    },
    source: {
      ...sourceContent,
      operationalSignal: signal,
      snippet,
    },
  }
}

function expandBlueprintScene(blueprint, scene) {
  const count = autoBeatCount(blueprint, scene)
  if (count === 1 && !Array.isArray(scene.beats)) {
    return [{
      id: scene.id,
      name: scene.name,
      durationSec: scene.durationSec,
      kind: scene.kind,
      content: scene.screen.content,
      voiceover: scene.voiceover,
      subtitles: scene.subtitles,
      action: scene.action,
      sourceSceneId: scene.id,
    }]
  }

  const durations = Array.isArray(scene.beats)
    ? scene.beats.map(beat => beat.durationSec)
    : splitDuration(scene.durationSec, count)
  const kinds = getAutoBeatKinds(scene)

  return durations.map((durationSec, index) => {
    const beat = Array.isArray(scene.beats) ? scene.beats[index] : {
      id: `beat-${String(index + 1).padStart(2, '0')}`,
      label: ['Prompt', 'Respuesta', 'Decision', 'Timeline', 'Coste', 'Riesgo', 'Diff', 'Terminal', 'Pausa', 'Checkpoint'][index] ?? `Beat ${index + 1}`,
      durationSec,
      kind: kinds[index % kinds.length],
      voiceover: pickVoiceover(blueprint, scene, null, index, count),
      action: scene.action,
    }

    return {
      id: `${scene.id}__${beat.id}`,
      name: `${scene.name} / ${beat.label}`,
      durationSec,
      kind: beat.kind ?? kinds[index % kinds.length] ?? 'decision',
      content: buildOperationalContent(blueprint, scene, beat, index),
      voiceover: beat.voiceover ?? pickVoiceover(blueprint, scene, beat, index, count),
      subtitles: beat.subtitles,
      action: beat.action ?? scene.action,
      sourceSceneId: scene.id,
    }
  })
}

function buildCourse(blueprint) {
  let cursorMs = 0
  const sceneStart = new Map()
  const generatedScenes = blueprint.scenes.flatMap(scene => expandBlueprintScene(blueprint, scene))
  const scenes = generatedScenes.map(scene => {
    const startMs = cursorMs
    const endMs = startMs + secondsToMs(scene.durationSec)
    cursorMs = endMs
    if (!sceneStart.has(scene.sourceSceneId)) sceneStart.set(scene.sourceSceneId, startMs)
    sceneStart.set(scene.id, startMs)

    return {
      id: scene.id,
      name: scene.name,
      startMs,
      endMs,
      type: scene.kind,
      content: scene.content,
      subtitles: makeSubtitles(scene, startMs, endMs),
      voiceover: scene.voiceover,
      screen: {
        mode: scene.kind,
        title: scene.content?.title ?? scene.name,
        visual: scene.content?.source?.visual ?? scene.content?.mode ?? scene.kind,
      },
      blueprintAction: scene.action,
    }
  })

  return {
    id: blueprint.id,
    title: blueprint.title,
    description: blueprint.description,
    template: blueprint.template ?? 'technical',
    durationPreset: blueprint.durationMin,
    durationMs: cursorMs,
    voice: blueprint.voice ?? 'es-ES-AlvaroNeural',
    author: blueprint.author ?? 'AI Practice Hub',
    createdAt: blueprint.createdAt,
    chapters: blueprint.chapters.map(chapter => ({
      id: chapter.id,
      label: chapter.label,
      startMs: sceneStart.get(chapter.sceneId) ?? 0,
    })),
    scenes,
    generatedFrom: `public/video-blueprints/${blueprint.id}.json`,
  }
}

async function main() {
  const files = (await fs.readdir(blueprintDir)).filter(file => file.endsWith('.json')).sort()
  assert(files.length, 'No video blueprints found')
  await fs.mkdir(outputDir, { recursive: true })

  for (const file of files) {
    const blueprint = JSON.parse(await fs.readFile(path.join(blueprintDir, file), 'utf8'))
    validateBlueprint(blueprint, file)
    const course = buildCourse(blueprint)
    await fs.writeFile(path.join(outputDir, `${course.id}.json`), `${JSON.stringify(course, null, 2)}\n`, 'utf8')
    console.log(`generated ${course.id} (${course.durationMs}ms, ${course.scenes.length} scenes)`)
  }
}

main().catch(error => {
  console.error(error.message)
  process.exit(1)
})
