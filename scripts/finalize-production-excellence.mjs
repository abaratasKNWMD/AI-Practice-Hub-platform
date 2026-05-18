import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import {
  audioProductionVersion,
  publicVoiceProfileCatalog,
  resolveVoiceProfile,
  vendorFromId,
} from './audio-production-config.mjs'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const operationsDir = path.join(root, 'public', 'content', 'operations')
const docsDir = path.join(root, 'docs', 'auditorias')

function cleanText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function artifactFromScene(scene) {
  const content = scene.content && typeof scene.content === 'object' ? scene.content : {}
  return cleanText(content.title || content.actionLabel || content.label || scene.name || scene.id || scene.type)
    .replace(/["]/g, '')
    .slice(0, 56)
}

function minuteLabel(scene) {
  return `minuto ${Math.max(0, Math.floor((scene.startMs ?? 0) / 60000))}`
}

function pick(list, seed) {
  return list[Math.abs(seed) % list.length]
}

function vendorCopy(vendor) {
  return {
    codex: {
      surface: 'Codex',
      object: 'repo',
      result: 'diff minimo, test verde y coste registrado',
      risk: 'permiso, alcance y modelo',
    },
    copilot: {
      surface: 'Copilot',
      object: 'workspace de VS Code',
      result: 'patch local, test y comentario de PR',
      risk: 'modo equivocado, contexto pobre y review floja',
    },
    claude: {
      surface: 'Claude',
      object: 'memoria, skill o MCP',
      result: 'skill versionada, hook probado y owner claro',
      risk: 'contexto infinito, permisos y automatizacion sin rollback',
    },
    hub: {
      surface: 'AI Practice Hub',
      object: 'ruta de aprendizaje',
      result: 'progreso, entrega, revision y feedback',
      risk: 'soporte reactivo y dudas repetidas',
    },
    other: {
      surface: 'IA',
      object: 'tarea',
      result: 'salida verificable',
      risk: 'ruido y falta de evidencia',
    },
  }[vendor] ?? {
    surface: 'IA',
    object: 'tarea',
    result: 'salida verificable',
    risk: 'ruido y falta de evidencia',
  }
}

function situationLine(vendor, scene, seed) {
  const copy = vendorCopy(vendor)
  const artifact = artifactFromScene(scene)
  const minute = minuteLabel(scene)
  return pick([
    `Situacion, ${minute}: ${copy.surface} recibe "${artifact}" y debe convertirlo en trabajo revisable.`,
    `Situacion, ${minute}: el equipo mira "${artifact}" dentro del ${copy.object}, con coste y permiso visibles.`,
    `Situacion, ${minute}: la pantalla no busca impresionar; busca cerrar "${artifact}" con evidencia.`,
    `Situacion, ${minute}: alguien tendra que mantener esta salida despues de la demo.`,
    `Situacion, ${minute}: ${copy.surface} solo avanza si el siguiente humano entiende el por que.`,
  ], seed)
}

function evidenceLine(vendor, scene, seed) {
  const copy = vendorCopy(vendor)
  const artifact = artifactFromScene(scene)
  const minute = minuteLabel(scene)
  return pick([
    `Evidencia, ${minute}: ${copy.result}.`,
    `Evidencia, ${minute}: "${artifact}" queda ligado a prueba, owner y decision.`,
    `Evidencia, ${minute}: hay una salida que otro perfil puede revisar sin rehacer el contexto.`,
    `Evidencia, ${minute}: el artefacto muestra que se controlo ${copy.risk}.`,
    `Evidencia, ${minute}: "${artifact}" no se cierra sin test, captura o criterio escrito.`,
  ], seed)
}

function tensionLine(vendor, scene, seed) {
  const copy = vendorCopy(vendor)
  const minute = minuteLabel(scene)
  return pick([
    `Tension, ${minute}: aceptar rapido puede esconder ${copy.risk}.`,
    `Tension, ${minute}: mas contexto puede sonar mejor y decidir peor.`,
    `Tension, ${minute}: sin evidencia, la IA parece productiva pero no deja confianza.`,
    `Tension, ${minute}: el coste malo suele aparecer cuando nadie define el cierre.`,
    `Tension, ${minute}: el agente puede avanzar mas rapido que nuestra capacidad de revisar.`,
  ], seed)
}

function actionLine(vendor, scene, seed) {
  const copy = vendorCopy(vendor)
  const artifact = artifactFromScene(scene)
  const minute = minuteLabel(scene)
  return pick([
    `Accion, ${minute}: pedir salida pequena, verificable y con owner.`,
    `Accion, ${minute}: parar si "${artifact}" no produce evidencia nueva.`,
    `Accion, ${minute}: nombrar modelo, permiso y limite antes de iterar.`,
    `Accion, ${minute}: comparar la respuesta con el criterio de cierre, no con la sensacion de velocidad.`,
    `Accion, ${minute}: convertir ${copy.object} en una decision que se pueda ensenar en tutoria.`,
  ], seed)
}

function decisionLine(vendor, scene, seed) {
  const copy = vendorCopy(vendor)
  const minute = minuteLabel(scene)
  return pick([
    `Decision, ${minute}: seguir, pedir contexto, escalar modelo o bloquear.`,
    `Decision, ${minute}: si no se puede auditar, vuelve a briefing.`,
    `Decision, ${minute}: si el riesgo supera la evidencia, entra instructor o tech lead.`,
    `Decision, ${minute}: cerrar solo cuando ${copy.result}.`,
    `Decision, ${minute}: guardar la duda como material reutilizable si se repite.`,
  ], seed)
}

function rewriteLine(text, vendor, scene, seed) {
  const line = cleanText(text)
  if (!line) return line
  if (/^Situacion(?:,?\s+(?:minuto\s+\d+|\d+m))?:/.test(line)) return situationLine(vendor, scene, seed)
  if (/^Evidencia(?:,?\s+(?:minuto\s+\d+|\d+m))?:/.test(line)) return evidenceLine(vendor, scene, seed)
  if (/^Tension(?:,?\s+(?:minuto\s+\d+|\d+m))?:/.test(line)) return tensionLine(vendor, scene, seed)
  if (/^Accion(?:,?\s+(?:minuto\s+\d+|\d+m))?:/.test(line)) return actionLine(vendor, scene, seed)
  if (/^Decision(?:,?\s+(?:minuto\s+\d+|\d+m))?:/.test(line)) return decisionLine(vendor, scene, seed)
  if (line === 'Contexto visible:') return `Contexto ${minuteLabel(scene)}: mira primero el alcance que condiciona esta salida.`
  if (line === 'Pantalla de accion:') return `Accion ${minuteLabel(scene)}: convierte la idea en un paso que se pueda revisar.`
  if (line === 'Decision humana:') return `Decision ${minuteLabel(scene)}: la persona decide antes de que el agente siga.`
  if (/^Modelo recomendado:/.test(line)) {
    return `Modelo ${minuteLabel(scene)}: elegir por riesgo, contexto y coste antes de pedir otra iteracion.`
  }
  if (line === 'comentario o decision escrita.') return evidenceLine(vendor, scene, seed + 11)
  if (line === 'el siguiente humano puede revisar sin preguntar.') return evidenceLine(vendor, scene, seed + 17)
  if (line === 'test diff') return evidenceLine(vendor, scene, seed + 23)
  if (line === 'Skill versionada hook probado y owner claro.') return evidenceLine(vendor, scene, seed + 29)
  if (line === 'Patch local, test y comentario de PR.') return evidenceLine(vendor, scene, seed + 31)
  if (line === 'Diff pequeno, test verde y resumen de coste.') return evidenceLine(vendor, scene, seed + 37)
  return line
}

function deepRewrite(value, vendor, scene, seed) {
  if (typeof value === 'string') return rewriteLine(value, vendor, scene, seed)
  if (Array.isArray(value)) return value.map((item, index) => deepRewrite(item, vendor, scene, seed + index))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item], index) => [
      key,
      deepRewrite(item, vendor, scene, seed + index),
    ]))
  }
  return value
}

function reviewRubricForScene(vendor, scene, seed) {
  const artifact = artifactFromScene(scene)
  const copy = vendorCopy(vendor)
  return {
    learns: pick([
      `Reconoce por que "${artifact}" necesita evidencia y no solo respuesta.`,
      `Distingue decision humana de ejecucion automatizada en ${copy.surface}.`,
      `Ubica coste, permiso y criterio antes de aceptar la salida.`,
    ], seed),
    does: pick([
      'Formula una peticion verificable con limite de alcance.',
      'Comprueba la salida contra prueba, owner o captura.',
      'Registra el criterio que permitiria repetir el paso sin instructor.',
    ], seed + 3),
    decides: pick([
      'Seguir, pedir mas contexto, escalar modelo o bloquear.',
      'Convertir la duda en material de tutoria si se repite.',
      'Aceptar solo si la evidencia queda visible para otra persona.',
    ], seed + 7),
    memoryCheck: pick([
      'Puede explicar el paso en una frase de menos de 20 segundos.',
      'Puede nombrar el riesgo principal sin mirar la slide.',
      'Puede repetir el prompt inicial con criterio de cierre.',
    ], seed + 13),
  }
}

async function main() {
  await fs.mkdir(operationsDir, { recursive: true })
  await fs.mkdir(docsDir, { recursive: true })
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const summary = {
    generatedAt: new Date().toISOString(),
    audioProductionVersion,
    courses: 0,
    scenes: 0,
    rewrittenSubtitles: 0,
    productionProfiles: {},
  }

  for (const [courseIndex, file] of files.entries()) {
    const filePath = path.join(coursesDir, file)
    const course = JSON.parse(await fs.readFile(filePath, 'utf8'))
    const vendor = vendorFromId(course.id)
    course.production = {
      ...(course.production && typeof course.production === 'object' ? course.production : {}),
      audioProductionVersion,
      productionPass: '2000-final-direction',
      vendor,
    }
    summary.courses += 1

    for (const [sceneIndex, scene] of (course.scenes ?? []).entries()) {
      const seed = courseIndex * 1009 + sceneIndex * 37
      const profile = resolveVoiceProfile(course, scene)
      summary.scenes += 1
      summary.productionProfiles[profile.id] = (summary.productionProfiles[profile.id] ?? 0) + 1

      scene.content = deepRewrite(scene.content, vendor, scene, seed)
      scene.subtitles = (scene.subtitles ?? []).map((subtitle, subtitleIndex) => {
        const nextText = rewriteLine(subtitle.text, vendor, scene, seed + subtitleIndex)
        if (nextText !== subtitle.text) summary.rewrittenSubtitles += 1
        return { ...subtitle, text: nextText }
      })
      scene.voiceover = scene.subtitles.map(subtitle => subtitle.text)
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
        reviewRubric: reviewRubricForScene(vendor, scene, seed),
        prosodyNotes: {
          pace: profile.rate,
          pause: `${profile.pauseMs}ms antes de la decision`,
          emphasis: profile.emphasis,
          energy: profile.energy,
        },
      }
      scene.blueprintAction = {
        ...(scene.blueprintAction && typeof scene.blueprintAction === 'object' ? scene.blueprintAction : {}),
        learningRubric: {
          ...(scene.blueprintAction?.learningRubric ?? {}),
          ...reviewRubricForScene(vendor, scene, seed),
          vendor,
          productionPass: '2000-final-direction',
        },
      }
    }

    await fs.writeFile(filePath, `${JSON.stringify(course, null, 2)}\n`, 'utf8')
  }

  const audioRouting = {
    generatedAt: new Date().toISOString(),
    audioProductionVersion,
    principle: 'La voz cambia por vendor y por funcion pedagogica: narrar, revisar, pausar o bloquear.',
    profiles: publicVoiceProfileCatalog(),
    routing: {
      title: 'narrator',
      concept: 'narrator',
      prompt: 'narrator',
      streaming: 'narrator',
      coding: 'narrator',
      terminal: 'narrator',
      diff: 'narrator',
      mediaBreak: 'reflection',
      pause: 'reflection',
      quiz: 'reflection',
      risk: 'safety',
      cost: 'safety',
      error: 'safety',
      prReview: 'review',
    },
    summary,
  }

  const packagingPolicy = {
    generatedAt: new Date().toISOString(),
    audioProductionVersion,
    versioning: {
      sourceOfTruth: 'public/audio/courses/audio-release-manifest.json',
      immutableAssets: '/audio/courses/{courseId}/{scene}-{subtitle}.mp3',
      mutableIndexes: [
        '/audio/courses/{courseId}/manifest.json',
        '/audio/courses/audio-release-manifest.json',
      ],
      checksum: 'sha256 per audio entry and per course manifest',
    },
    cache: {
      audio: 'public, max-age=31536000, immutable',
      subtitles: 'public, max-age=86400, stale-while-revalidate=604800',
      videoAssets: 'public, max-age=31536000, immutable',
    },
    regenerationPolicy: [
      'Regenerar audio si cambia text, voice, rate, pitch o audioProductionVersion.',
      'Regenerar VTT/SRT si cambia cualquier subtitulo o timing.',
      'Invalidar CDN por manifest si cambia un curso completo.',
      'No regenerar MP3 si checksum de buffer coincide con cache local.',
    ],
    releaseGate: [
      'audio:qa pass=true',
      'qa:player pass=true',
      'qa:visual pass=true',
      'release:smoke pass=true',
      'auditoria 2000 >= 1980',
    ],
  }

  const humanReviewPlan = {
    generatedAt: new Date().toISOString(),
    status: 'ready-for-real-student-sample',
    limitation: 'No se puede completar la medicion con alumnos reales desde el repositorio; queda preparado el protocolo y la captura de datos.',
    sample: {
      size: 9,
      roles: ['developer', 'qa', 'tech lead'],
      vendors: ['codex', 'copilot', 'claude'],
      format: '3 personas por vendor, 20 minutos por persona',
    },
    protocol: [
      'Ver 1 masterclass de 10m o un tramo de workshop de 12m.',
      'Pausar en dos media-breaks y pedir que verbalicen la regla recordada.',
      'Ejecutar un micro-reto asociado sin mirar la solucion.',
      'Medir si entregan evidencia: prompt, diff, test, comentario o decision.',
      'Registrar aburrimiento, claridad, memoria y accion con escala 1-5.',
    ],
    metrics: [
      'recall_24h',
      'exercise_completion',
      'evidence_quality',
      'token_cost_awareness',
      'model_permission_decision',
      'dropoff_minute',
      'confusion_points',
    ],
    passCriteria: {
      recall24h: '>= 4/5',
      exerciseCompletion: '>= 80%',
      evidenceQuality: '>= 4/5',
      boringMoments: '<= 2 por video largo',
    },
  }

  await fs.writeFile(path.join(operationsDir, 'audio-production-routing.json'), `${JSON.stringify(audioRouting, null, 2)}\n`, 'utf8')
  await fs.writeFile(path.join(operationsDir, 'audio-packaging-policy.json'), `${JSON.stringify(packagingPolicy, null, 2)}\n`, 'utf8')
  await fs.writeFile(path.join(operationsDir, 'human-review-sample-plan.json'), `${JSON.stringify(humanReviewPlan, null, 2)}\n`, 'utf8')

  const md = [
    '# Produccion final 2000 - direccion de voz y review humana',
    '',
    `Fecha: ${new Date().toISOString()}`,
    '',
    '## Aplicado',
    '',
    `- Version de audio: \`${audioProductionVersion}\`.`,
    `- Cursos procesados: ${summary.courses}.`,
    `- Escenas con perfil de produccion: ${summary.scenes}.`,
    `- Subtitulos reescritos en pasada editorial fina: ${summary.rewrittenSubtitles}.`,
    `- Perfiles de voz activos: ${Object.keys(summary.productionProfiles).length}.`,
    '',
    '## Voces',
    '',
    ...publicVoiceProfileCatalog().map(profile => `- ${profile.id}: ${profile.voice}, ${profile.rate}, ${profile.energy}, ${profile.emphasis}.`),
    '',
    '## Review humana',
    '',
    'Queda preparado el protocolo para alumnos reales. No se marca como ejecutado porque requiere personas reales fuera del repositorio.',
    '',
    'Archivos:',
    '',
    '- `public/content/operations/audio-production-routing.json`',
    '- `public/content/operations/audio-packaging-policy.json`',
    '- `public/content/operations/human-review-sample-plan.json`',
    '- `public/audio/courses/audio-release-manifest.json`',
    '',
  ].join('\n')

  await fs.writeFile(path.join(docsDir, 'AUDITORIA_PRODUCCION_2000_FINAL.md'), `${md}\n`, 'utf8')
  console.log(`production excellence finalized: courses=${summary.courses} scenes=${summary.scenes} rewritten=${summary.rewrittenSubtitles}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
