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
  if (scene.kind === 'coding') return ['prompt', 'streaming', 'diff', 'terminal']
  if (scene.kind === 'error') return ['terminal', 'risk', 'prompt', 'decision']
  if (scene.kind === 'compare') return ['decision', 'risk', 'cost', 'quiz']
  if (scene.kind === 'thinking') return ['streaming', 'decision', 'cost', 'pause']
  if (scene.kind === 'linear') return ['branch', 'decision', 'cost', 'pr-review']
  if (scene.kind === 'preview') return ['pr-review', 'terminal', 'decision', 'cost']
  if (scene.kind === 'finale') return ['quiz', 'pr-review', 'cost', 'pause']
  return ['prompt', 'streaming', 'decision', 'cost']
}

function autoBeatCount(blueprint, scene) {
  if (Array.isArray(scene.beats) && scene.beats.length) return scene.beats.length
  if (blueprint.durationMin === 60) return 4
  if (blueprint.durationMin === 30) return 2
  return 1
}

function pickVoiceover(scene, index, count) {
  if (count === 1) return scene.voiceover
  const text = scene.voiceover[index % scene.voiceover.length]
  const labels = ['Pantalla de accion', 'Respuesta simulada', 'Decision humana', 'Coste y riesgo']
  return [
    `${labels[index] ?? 'Paso'}: ${text}`,
    scene.action?.detail ?? scene.screen.presenterCue ?? 'El instructor conecta la pantalla con el criterio operativo.',
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
  const sourceContent = beat.screen?.content ?? scene.screen.content
  const action = beat.action ?? scene.action
  const mode = beat.kind ?? 'decision'
  const title = beat.screen?.title ?? scene.screen.title ?? scene.name
  const snippet = stringifySnippet(sourceContent)

  return {
    mode,
    vendor: blueprint.vendor,
    title,
    eyebrow: `${blueprint.title} / ${scene.name}`,
    label: beat.label,
    presenterCue: beat.screen?.presenterCue ?? scene.screen.presenterCue,
    actionLabel: action?.label,
    actionDetail: action?.detail,
    expectedOutput: action?.expectedOutput,
    prompt: action?.detail ?? scene.screen.presenterCue ?? snippet,
    response: [
      action?.expectedOutput ?? 'Respuesta simulada con salida verificable.',
      'Se cita evidencia, se limita alcance y se deja una decision humana clara.',
      'El cierre declara siguiente paso, coste aproximado y riesgo residual.',
    ],
    diff: [
      '- cambio ambiguo sin criterio de aceptacion',
      '+ cambio acotado con test, owner y evidencia',
      '+ registro de modelo, permiso y coste',
    ],
    terminal: [
      '$ pnpm test -- --runInBand',
      '✓ test relevante pasa',
      '✓ no hay errores de consola',
      'i coste relativo registrado',
    ],
    review: [
      { severity: 'blocker', text: 'No hay criterios bloqueantes pendientes.' },
      { severity: 'medium', text: action?.detail ?? 'Revisar alcance y evidencia antes de aprobar.' },
      { severity: 'note', text: 'El humano firma el criterio final.' },
    ],
    cost: {
      model: index % 3 === 0 ? 'modelo rapido' : index % 3 === 1 ? 'modelo estandar' : 'modelo fuerte',
      tokens: index % 3 === 0 ? 'bajo' : index % 3 === 1 ? 'medio' : 'alto controlado',
      permission: scene.action?.type === 'tool-run' ? 'ejecucion acotada' : 'readonly/workspace segun fase',
      stopRule: 'Parar si no hay evidencia nueva en el siguiente intento.',
    },
    decision: {
      question: 'Que debe decidir la persona antes de continuar?',
      options: ['seguir con alcance actual', 'pedir mas contexto', 'subir modelo', 'bloquear y llevar a tutoria'],
      selected: index % 4,
    },
    risk: {
      items: ['Permisos', 'Coste', 'Contexto', 'Calidad', 'Responsabilidad humana'],
      level: index % 3 === 0 ? 'bajo' : index % 3 === 1 ? 'medio' : 'alto',
    },
    branch: {
      steps: ['Issue', 'Branch', 'Plan', 'Patch', 'Tests', 'Review', 'PR'],
      active: Math.min(6, index + 2),
    },
    quiz: {
      question: 'Cual es la evidencia minima para cerrar esta pantalla?',
      answers: ['Una respuesta convincente', 'Un diff probado o decision documentada', 'Un prompt mas largo'],
      correct: 1,
    },
    source: sourceContent,
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
      label: ['Prompt', 'Respuesta', 'Decision', 'Coste'][index] ?? `Beat ${index + 1}`,
      durationSec,
      kind: kinds[index % kinds.length],
      voiceover: pickVoiceover(scene, index, count),
      action: scene.action,
    }

    return {
      id: `${scene.id}__${beat.id}`,
      name: `${scene.name} / ${beat.label}`,
      durationSec,
      kind: beat.kind ?? kinds[index % kinds.length] ?? 'decision',
      content: buildOperationalContent(blueprint, scene, beat, index),
      voiceover: beat.voiceover ?? pickVoiceover(scene, index, count),
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
