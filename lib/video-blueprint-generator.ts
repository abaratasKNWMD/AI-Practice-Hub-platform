import type { CourseJSON, DurationPreset } from './course-schema'
import type { Scene, Subtitle } from './movie-script'
import type { VideoBlueprint, VideoBlueprintBeat, VideoBlueprintScene } from './video-blueprint-schema'

function secondsToMs(seconds: number) {
  return Math.round(seconds * 1000)
}

type SubtitleSource = Pick<VideoBlueprintScene, 'voiceover' | 'subtitles'>

function generatedSubtitles(source: SubtitleSource, startMs: number, endMs: number): Subtitle[] {
  if (source.subtitles?.length) {
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

function splitDuration(totalSec: number, parts: number): number[] {
  const base = Math.floor(totalSec / parts)
  const remainder = totalSec - base * parts
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0))
}

function getAutoBeatKinds(scene: VideoBlueprintScene): Array<VideoBlueprintBeat['kind']> {
  if (scene.kind === 'coding') return ['prompt', 'streaming', 'diff', 'terminal']
  if (scene.kind === 'error') return ['terminal', 'risk', 'prompt', 'decision']
  if (scene.kind === 'compare') return ['decision', 'risk', 'cost', 'quiz']
  if (scene.kind === 'thinking') return ['streaming', 'decision', 'cost', 'pause']
  if (scene.kind === 'linear') return ['branch', 'decision', 'cost', 'pr-review']
  if (scene.kind === 'preview') return ['pr-review', 'terminal', 'decision', 'cost']
  if (scene.kind === 'finale') return ['quiz', 'pr-review', 'cost', 'pause']
  return ['prompt', 'streaming', 'decision', 'cost']
}

function autoBeatCount(blueprint: VideoBlueprint, scene: VideoBlueprintScene) {
  if (scene.beats?.length) return scene.beats.length
  if (blueprint.durationMin === 60) return 4
  if (blueprint.durationMin === 30) return 2
  return 1
}

function pickVoiceover(scene: VideoBlueprintScene, index: number, count: number) {
  if (count === 1) return scene.voiceover
  const text = scene.voiceover[index % scene.voiceover.length]
  const labels = [
    'Pantalla de accion',
    'Respuesta simulada',
    'Decision humana',
    'Coste y riesgo',
  ]
  return [
    `${labels[index] ?? 'Paso'}: ${text}`,
    scene.action?.detail ?? scene.screen.presenterCue ?? 'El instructor conecta la pantalla con el criterio operativo.',
  ]
}

function stringifySnippet(value: unknown) {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value, null, 2).slice(0, 900)
  } catch {
    return 'Contenido de la escena.'
  }
}

function buildOperationalContent(blueprint: VideoBlueprint, scene: VideoBlueprintScene, beat: VideoBlueprintBeat, index: number) {
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

function expandBlueprintScene(blueprint: VideoBlueprint, scene: VideoBlueprintScene): Array<{
  id: string
  name: string
  durationSec: number
  kind: Scene['type']
  content: unknown
  voiceover: string[]
  subtitles?: VideoBlueprintBeat['subtitles']
  sourceSceneId: string
}> {
  const count = autoBeatCount(blueprint, scene)
  if (count === 1 && !scene.beats?.length) {
    return [{
      id: scene.id,
      name: scene.name,
      durationSec: scene.durationSec,
      kind: scene.kind,
      content: scene.screen.content,
      voiceover: scene.voiceover,
      subtitles: scene.subtitles,
      sourceSceneId: scene.id,
    }]
  }

  const durations = scene.beats?.map(beat => beat.durationSec) ?? splitDuration(scene.durationSec, count)
  const kinds = getAutoBeatKinds(scene)
  return durations.map((durationSec, index) => {
    const explicitBeat = scene.beats?.[index]
    const beat: VideoBlueprintBeat = explicitBeat ?? {
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
      kind: (beat.kind ?? kinds[index % kinds.length] ?? 'decision') as Scene['type'],
      content: buildOperationalContent(blueprint, scene, beat, index),
      voiceover: beat.voiceover ?? pickVoiceover(scene, index, count),
      subtitles: beat.subtitles,
      sourceSceneId: scene.id,
    }
  })
}

export function buildCourseFromBlueprint(blueprint: VideoBlueprint): CourseJSON {
  let cursorMs = 0
  const sceneStart = new Map<string, number>()
  const generatedScenes = blueprint.scenes.flatMap(scene => expandBlueprintScene(blueprint, scene))
  const scenes: Scene[] = generatedScenes.map(scene => {
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
      subtitles: generatedSubtitles(scene, startMs, endMs),
      voiceover: scene.voiceover,
      screen: {
        mode: scene.kind,
        title: typeof scene.content === 'object' && scene.content && 'title' in scene.content
          ? String((scene.content as { title?: unknown }).title ?? scene.name)
          : scene.name,
      },
    }
  })

  return {
    id: blueprint.id,
    title: blueprint.title,
    description: blueprint.description,
    template: blueprint.template,
    durationPreset: blueprint.durationMin as DurationPreset,
    durationMs: cursorMs,
    voice: blueprint.voice,
    author: blueprint.author,
    createdAt: blueprint.createdAt,
    chapters: blueprint.chapters.map(chapter => ({
      id: chapter.id,
      label: chapter.label,
      startMs: sceneStart.get(chapter.sceneId) ?? 0,
    })),
    scenes,
  }
}
