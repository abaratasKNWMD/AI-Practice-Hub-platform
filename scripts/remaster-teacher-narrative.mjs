import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { audioProductionVersion, resolveVoiceProfile, vendorFromId } from './audio-production-config.mjs'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const operationsDir = path.join(root, 'public', 'content', 'operations')

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function vendorName(vendor) {
  return {
    codex: 'Codex',
    copilot: 'Copilot',
    claude: 'Claude',
    hub: 'AI Practice Hub',
    other: 'IA',
  }[vendor] ?? 'IA'
}

function titleOf(course) {
  return clean(course.title || course.id)
    .replace(/\bPR\b/g, 'pull request')
    .replace(/\b1h\b/gi, '1 hora')
    .replace(/\b10m\b/gi, '10 minutos')
    .replace(/\b30m\b/gi, '30 minutos')
    .replace(/\b60m\b/gi, '60 minutos')
}

function normalizeSpeechText(text) {
  let value = clean(text)
  value = value.replace(/…/g, '.').replace(/\.{3,}/g, '.')
  value = value.replace(/\b1h\b/gi, '1 hora')
  value = value.replace(/\b(\d+)\s*h\b/gi, (_, n) => `${n} horas`)
  value = value.replace(/\b(\d+)\s*m\b/gi, (_, raw) => {
    const n = Number(raw)
    if (n <= 9) return `minuto ${n}`
    return `${n} minutos`
  })
  value = value.replace(/\b(\d+)\s*s\b/gi, (_, n) => `${n} segundos`)
  value = value.replace(/\bPR review\b/g, 'revision de pull request')
  value = value.replace(/\bPR\b/g, 'pull request')
  value = value.replace(/\bCLI\b/g, 'terminal')
  value = value.replace(/\bQA\b/g, 'calidad')
  value = value.replace(/\bLLM\b/g, 'modelo de lenguaje')
  value = value.replace(/\bMCP\b/g, 'M C P')
  value = value.replace(/\bSLM\b/g, 'modelo pequeno especializado')
  value = value.replace(/\bSDK\b/g, 'S D K')
  value = value.replace(/\bAPI\b/g, 'A P I')
  value = value.replace(/\bVS Code\b/g, 'Visual Studio Code')
  value = value.replace(/\s+([,.!?;:])/g, '$1')
  return value
}

const technicalKeys = new Set([
  'id',
  'sceneId',
  'courseId',
  'videoSlug',
  'videoSlugs',
  'exerciseIds',
  'materialIds',
  'audioUrl',
  'deckUrl',
  'href',
  'url',
  'path',
  'imageUrl',
  'visual',
  'source',
  'mode',
  'vendor',
  'type',
  'voice',
  'voiceProfileId',
  'audioVersion',
  'productionPass',
  'pronunciationPass',
])

function normalizeAllStrings(value, key = '') {
  if (typeof value === 'string') return normalizeSpeechText(value)
  if (Array.isArray(value)) return technicalKeys.has(key) ? value : value.map(item => normalizeAllStrings(item, key))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([entryKey, item]) => [
      entryKey,
      technicalKeys.has(entryKey) ? item : normalizeAllStrings(item, entryKey),
    ]))
  }
  return value
}

function chapterLabels(course) {
  const labels = (course.chapters ?? []).map(chapter => clean(chapter.label || chapter.title)).filter(Boolean)
  if (labels.length >= 3) return labels.slice(0, 5)
  return ['contrato', 'contexto', 'practica', 'verificacion', 'cierre']
}

function contractFor(course) {
  const vendor = vendorFromId(course.id)
  const title = titleOf(course)
  const labels = chapterLabels(course)
  const specific = {
    'cx-workshop-60m-first-task-to-pr': {
      objective: 'pasar de una peticion ambigua a un pull request revisable con Codex.',
      outcome: 'salir con briefing, AGENTS, plan, diff, tests y coste defendible.',
      route: 'briefing, mapa del repo, plan, patch, pruebas y handoff.',
      decision: 'si Codex esta produciendo evidencia o solo texto convincente.',
    },
    'cp-workshop-60m-vscode-to-pr-review': {
      objective: 'pasar de un error en Visual Studio Code a un pull request revisado con Copilot.',
      outcome: 'elegir Ask, Edit, Agent o review sin perder control del cambio.',
      route: 'diagnostico, instrucciones, edicion, pruebas, review y presupuesto.',
      decision: 'que modo de Copilot conviene en cada riesgo.',
    },
    'cl-workshop-60m-memory-to-automation': {
      objective: 'pasar de memoria dispersa a automatizacion controlada con Claude.',
      outcome: 'separar CLAUDE.md, skill, subagente, hook, M C P y evaluacion.',
      route: 'auditoria de contexto, skill, subagente, permisos, hook y rollout.',
      decision: 'que se guarda en memoria y que debe convertirse en control versionado.',
    },
    'hub-operating-model-60m': {
      objective: 'convertir formacion reactiva en un sistema de practica, tutoria y medicion.',
      outcome: 'tener un operating model para cursos, videos, ejercicios, metricas y owners.',
      route: 'demanda, rutas, contenido, video factory, ejercicios, tutorias y release.',
      decision: 'que dudas se resuelven con material y cuales deben ir a tutoria.',
    },
    'hub-workshop-60m-vendor-selection': {
      objective: 'decidir que plataforma usar segun tarea, riesgo, equipo y coste.',
      outcome: 'salir con una matriz de decision para Codex, Copilot, Claude y ruta transversal.',
      route: 'mapa de vendors, casos, permisos, coste, formacion y handoff.',
      decision: 'que herramienta conviene antes de abrir un agente.',
    },
  }[course.id]
  if (specific) return specific

  if (course.id.includes('masterclass')) {
    return {
      objective: `entender el sistema operativo de ${vendorName(vendor)} en 10 minutos.`,
      outcome: 'saber cuando usarlo, cuando no usarlo y que evidencia pedir.',
      route: `${labels.slice(0, 3).join(', ')} y cierre operativo.`,
      decision: 'si la herramienta encaja con el trabajo real del equipo.',
    }
  }

  if ((course.durationMs ?? 0) >= 29 * 60000) {
    return {
      objective: `practicar ${title} sin depender del instructor.`,
      outcome: 'terminar con una salida revisable y un criterio de cierre claro.',
      route: `${labels.slice(0, 4).join(', ')} y cierre.`,
      decision: 'si la evidencia permite avanzar o toca pedir ayuda.',
    }
  }

  return {
    objective: `resolver ${title} con criterio practico.`,
    outcome: 'quedarte con una regla de uso y un ejemplo repetible.',
    route: 'concepto, ejemplo y cierre.',
    decision: 'cuando aplicar esta tecnica en tu propio repositorio.',
  }
}

function buildOpeningSubtitles(course) {
  const contract = contractFor(course)
  return [
    `Objetivo de esta clase: ${contract.objective}`,
    `Al final debes poder ${contract.outcome}`,
    `La ruta sera: ${contract.route}`,
    `Durante el video mira esta decision: ${contract.decision}`,
  ].map(text => normalizeSpeechText(text))
}

function updateFirstScene(course) {
  const scene = course.scenes?.[0]
  if (!scene) return
  const contract = contractFor(course)
  scene.content = {
    ...(scene.content && typeof scene.content === 'object' ? scene.content : {}),
    narrativeContract: {
      objective: normalizeSpeechText(contract.objective),
      outcome: normalizeSpeechText(contract.outcome),
      route: normalizeSpeechText(contract.route),
      decision: normalizeSpeechText(contract.decision),
    },
  }
  if (scene.content.title) scene.content.title = normalizeSpeechText(scene.content.title)
  if (scene.content.subtitle) {
    scene.content.subtitle = `Objetivo: ${normalizeSpeechText(contract.objective)}`
  }
  if (scene.content.presenterCue) {
    scene.content.presenterCue = `Abre como profesor: objetivo, ruta, evidencia y decision humana.`
  }
  scene.subtitles = buildOpeningSubtitles(course).map((text, index) => ({
    text,
    startMs: scene.startMs + 600 + index * 5200,
    endMs: Math.min(scene.endMs - 600, scene.startMs + 4800 + index * 5200),
  }))
  scene.voiceover = scene.subtitles.map(subtitle => subtitle.text)
}

function applyProductionProfile(course, scene) {
  const profile = resolveVoiceProfile(course, scene)
  scene.production = {
    ...(scene.production && typeof scene.production === 'object' ? scene.production : {}),
    audioVersion: audioProductionVersion,
    voiceProfileId: profile.id,
    voice: profile.voice,
    rate: profile.rate,
    pitch: profile.pitch,
    energy: profile.energy,
    emphasis: profile.emphasis,
    pauseMs: profile.pauseMs,
    role: profile.role,
    pronunciationPass: 'spain-voice-units-v1',
  }
}

async function main() {
  await fs.mkdir(operationsDir, { recursive: true })
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const report = {
    generatedAt: new Date().toISOString(),
    courses: files.length,
    updatedOpenings: 0,
    normalizedStrings: 0,
    voices: {},
  }

  for (const file of files) {
    const filePath = path.join(coursesDir, file)
    const before = await fs.readFile(filePath, 'utf8')
    const course = normalizeAllStrings(JSON.parse(before))
    course.id = file.replace(/\.json$/, '')
    course.production = {
      ...(course.production && typeof course.production === 'object' ? course.production : {}),
      narrativePass: 'teacher-contract-v1',
      pronunciationPass: 'spain-voice-units-v1',
      audioProductionVersion,
    }
    updateFirstScene(course)
    report.updatedOpenings += 1
    for (const scene of course.scenes ?? []) {
      scene.subtitles = (scene.subtitles ?? []).map(subtitle => ({
        ...subtitle,
        text: normalizeSpeechText(subtitle.text),
      }))
      scene.voiceover = scene.subtitles.map(subtitle => subtitle.text)
      applyProductionProfile(course, scene)
      report.voices[scene.production.voice] = (report.voices[scene.production.voice] ?? 0) + 1
    }
    const after = `${JSON.stringify(course, null, 2)}\n`
    if (after !== before) report.normalizedStrings += 1
    await fs.writeFile(filePath, after, 'utf8')
  }

  await fs.writeFile(path.join(operationsDir, 'teacher-narrative-remaster.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`teacher narrative remaster complete: courses=${report.courses} openings=${report.updatedOpenings}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
