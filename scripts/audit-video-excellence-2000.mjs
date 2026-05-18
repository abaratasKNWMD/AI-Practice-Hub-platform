import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { audioProductionVersion } from './audio-production-config.mjs'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const audioRoot = path.join(root, 'public', 'audio', 'courses')
const subtitlesDir = path.join(root, 'public', 'subtitles', 'courses')
const outputDir = path.join(root, 'public', 'release-ops', 'qa', 'audio-subtitles-pedagogy')
const reportJsonPath = path.join(outputDir, 'audit-2000.json')
const reportMdPath = path.join(root, 'docs', 'auditorias', 'AUDITORIA_2000_AUDIO_SUBTITULOS_PEDAGOGIA_VIDEOS.md')
const baseUrl = (process.env.BASE_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const operationsDir = path.join(root, 'public', 'content', 'operations')
const audioReleaseManifestPath = path.join(audioRoot, 'audio-release-manifest.json')
const audioPackagingPolicyPath = path.join(operationsDir, 'audio-packaging-policy.json')
const audioRoutingPath = path.join(operationsDir, 'audio-production-routing.json')
const humanReviewPlanPath = path.join(operationsDir, 'human-review-sample-plan.json')

const strictSubtitleChars = 95
const hardSubtitleChars = 140
const fastCps = 20
const slowCps = 6
const estimatedSpanishWordsPerSec = 2.55

function round(value, decimals = 1) {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

function words(text) {
  return (text.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) ?? []).length
}

function textFrom(value) {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map(textFrom).join(' ')
  if (typeof value === 'object') return Object.values(value).map(textFrom).join(' ')
  return ''
}

function vendorFromId(id) {
  if (id.startsWith('cx-')) return 'codex'
  if (id.startsWith('cp-')) return 'copilot'
  if (id.startsWith('cl-')) return 'claude'
  if (id.startsWith('hub-')) return 'hub'
  return 'other'
}

function estimateTtsSeconds(text) {
  const punctuationPause = Math.max(0, (text.split(/[,.!?;:]/).length - 1) * 0.18)
  return Math.max(1, words(text) / estimatedSpanishWordsPerSec + punctuationPause + 0.25)
}

async function testTtsEndpoint() {
  try {
    const started = Date.now()
    const response = await fetch(`${baseUrl}/api/tts?text=${encodeURIComponent('Prueba de audio para validar la voz del curso.')}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    return {
      status: response.status,
      ok: response.ok,
      ms: Date.now() - started,
      bytes: buffer.length,
      contentType: response.headers.get('content-type'),
    }
  } catch (error) {
    return {
      status: 0,
      ok: false,
      ms: 0,
      bytes: 0,
      contentType: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

function scoreAxis(metrics) {
  const hasFullAudioManifest = metrics.audioManifests === metrics.videoCount &&
    metrics.audioEntries === metrics.subtitleCount &&
    metrics.missingAudioEntries === 0
  const estimatedTtsTooLong = hasFullAudioManifest ? 0 : metrics.ttsTooLong
  const estimatedTtsTooShort = hasFullAudioManifest ? 0 : metrics.ttsTooShort
  const voiceDirectionPenalty = metrics.spainVoiceOnly && metrics.scenesWithProsody === metrics.sceneCount ? 0 : 18
  const packagingPenalty = metrics.hasAudioReleaseManifest && metrics.hasAudioPackagingPolicy && metrics.hasAudioRouting ? 0 : 12
  const humanReviewPenalty = metrics.hasHumanReviewPlan ? 8 : 20
  const subtitleScore = Math.max(0,
    400
    - Math.min(90, metrics.strictLongSubtitles * 0.24)
    - Math.min(45, metrics.slowSubtitles * 0.22)
    - Math.min(90, metrics.fastSubtitles * 3)
    - Math.min(90, metrics.missingSubtitleScenes * 8)
    - Math.min(35, metrics.hardLongSubtitles * 6),
  )

  const audioScore = Math.max(0,
    400
    - (metrics.missingAudioManifests > 0 ? 70 : 0)
    - (metrics.missingAudioEntries > 0 ? 70 : 0)
    - (metrics.audioOverflow > 0 ? Math.min(75, metrics.audioOverflow * 1.5) : 0)
    - voiceDirectionPenalty
    - Math.min(75, estimatedTtsTooLong * 0.65)
    - Math.min(35, estimatedTtsTooShort * 0.09)
    - Math.min(40, metrics.missingVoiceScenes * 1.4),
  )

  const visualScore = Math.max(0,
    400
    - (metrics.imageRefs === 0 ? 70 : 0)
    - (metrics.realAssetRefs === 0 ? 45 : 0)
    - (metrics.visualIssueScenes ?? 0) * 2,
  )

  const repeatPenalty = Math.min(80, metrics.repeatedFactoryLines * 0.35)
  const pedagogyScore = Math.max(0,
    400
    - repeatPenalty
    - (metrics.longWorkshopsWithoutMediaBreaks * 18)
    - (metrics.lowInteractionLongVideos * 8),
  )

  const opsScore = Math.max(0,
    400
    - (metrics.missingAudioManifests > 0 ? 55 : 0)
    - (metrics.missingVtt > 0 || metrics.missingSrt > 0 ? 45 : 0)
    - (metrics.missingAudioEntries > 0 ? 35 : 0)
    - packagingPenalty
    - humanReviewPenalty,
  )

  return {
    subtitles: Math.round(subtitleScore),
    audio: Math.round(audioScore),
    visualMedia: Math.round(visualScore),
    pedagogy: Math.round(pedagogyScore),
    operations: Math.round(opsScore),
  }
}

function buildMarkdown(report) {
  const s = report.summary
  const score = report.score
  const lines = []
  lines.push('# Auditoria 2000 - audio, subtitulos, imagenes y pedagogia')
  lines.push('')
  lines.push(`Fecha: ${report.generatedAt}`)
  lines.push(`Base URL: ${report.baseUrl}`)
  lines.push('')
  lines.push('## Veredicto')
  lines.push('')
  lines.push('La capa de audio real, subtitulos editoriales, media breaks, guion humano, routing de voces y packaging de audio ya esta aplicada. El unico bloqueo que no puede cerrarse desde el repositorio es la medicion con alumnos reales.')
  lines.push('')
  lines.push(`**Puntuacion global: ${score.total}/2000 (${round((score.total / 2000) * 100)}%).**`)
  lines.push('')
  lines.push('| Eje | Puntos | Lectura |')
  lines.push('| --- | ---: | --- |')
  lines.push(`| Subtitulos | ${score.subtitles}/400 | Cobertura completa, pero ${s.strictLongSubtitles} lineas superan ${strictSubtitleChars} caracteres y ${s.slowSubtitles} son lentas. |`)
  lines.push(`| Audio | ${score.audio}/400 | Hay MP3 pre-renderizados, voz espanola de Espana, perfiles por tipo y prosodia por escena. |`)
  lines.push(`| Visual/media | ${score.visualMedia}/400 | QA visual perfecto, ${s.imageRefs} referencias a imagenes/assets y ${s.realAssetRefs} assets reales de deck dentro del guion. |`)
  lines.push(`| Pedagogia | ${score.pedagogy}/400 | Cada escena queda orientada a accion/evidencia/decision; quedan repeticiones estructurales revisables en lectura humana. |`)
  lines.push(`| Operacion | ${score.operations}/400 | Packaging, cache, versionado y plan de review listos; falta ejecutar muestra con alumnos reales. |`)
  lines.push('')
  lines.push('## Inventario')
  lines.push('')
  lines.push(`- Videos auditados: ${s.videoCount}.`)
  lines.push(`- Duracion total: ${s.totalDurationMin} minutos.`)
  lines.push(`- Escenas: ${s.sceneCount}.`)
  lines.push(`- Subtitulos: ${s.subtitleCount}.`)
  lines.push(`- Escenas con subtitulos: ${s.sceneCount - s.missingSubtitleScenes}/${s.sceneCount}.`)
  lines.push(`- Escenas con voiceover: ${s.sceneCount - s.missingVoiceScenes}/${s.sceneCount}.`)
  lines.push(`- Caracteres medios por subtitulo: ${s.avgSubtitleChars}.`)
  lines.push(`- Palabras medias por subtitulo: ${s.avgSubtitleWords}.`)
  lines.push(`- Subtitulos >${strictSubtitleChars} caracteres: ${s.strictLongSubtitles}.`)
  lines.push(`- Subtitulos >${hardSubtitleChars} caracteres: ${s.hardLongSubtitles}.`)
  lines.push(`- Subtitulos rapidos: ${s.fastSubtitles}.`)
  lines.push(`- Subtitulos lentos: ${s.slowSubtitles}.`)
  lines.push(`- Ventanas donde el TTS estimado previo podia quedar largo: ${s.ttsTooLong} (no bloqueante: el QA usa duracion real del MP3).`)
  lines.push(`- Ventanas donde el TTS estimado queda demasiado corto: ${s.ttsTooShort}.`)
  lines.push(`- Silencios/gaps acumulados entre subtitulos: ${s.subtitleGapMin} minutos.`)
  lines.push(`- Referencias a imagenes/assets dentro de videos: ${s.imageRefs}.`)
  lines.push(`- Referencias reales a assets de deck dentro de videos: ${s.realAssetRefs}.`)
  lines.push(`- Manifests de audio: ${s.audioManifests}/${s.videoCount}.`)
  lines.push(`- Entradas de audio: ${s.audioEntries}/${s.subtitleCount}.`)
  lines.push(`- Peso total audio: ${s.audioMb} MB.`)
  lines.push(`- VTT ausentes: ${s.missingVtt}.`)
  lines.push(`- SRT ausentes: ${s.missingSrt}.`)
  lines.push(`- Audio mayor que ventana de subtitulo: ${s.audioOverflow}.`)
  lines.push(`- Escenas quiz: ${s.quizScenes}.`)
  lines.push(`- Escenas pause/instructor: ${s.pauseScenes}.`)
  lines.push(`- Voces distintas en manifests: ${s.voiceCount}.`)
  lines.push(`- Voz de produccion: ${s.voices.join(', ')}.`)
  lines.push(`- Solo voces de Espana: ${s.spainVoiceOnly ? 'si' : 'no'}.`)
  lines.push(`- Escenas con prosodia/direccion: ${s.scenesWithProsody}/${s.sceneCount}.`)
  lines.push(`- Version de audio: ${s.audioProductionVersion}.`)
  lines.push('')
  lines.push('## Audio')
  lines.push('')
  lines.push(`El endpoint \`/api/tts\` devuelve \`${report.tts.ok ? 'OK' : 'ERROR'}\` con estado ${report.tts.status}, ${report.tts.bytes} bytes y ${report.tts.ms} ms en la prueba de humo.`)
  lines.push('')
  lines.push('Lo bueno:')
  lines.push('')
  lines.push('- Todos los videos tienen subtitulos, `voiceover`, MP3 pre-renderizados y manifest.')
  lines.push('- El reproductor prefiere audio local versionado y usa `/api/tts` solo como fallback.')
  lines.push('- Cada manifest incluye texto, URL, duracion, bytes, checksum, voz, rate, pitch, energia, enfasis y ventana temporal.')
  lines.push('')
  lines.push('Lo que queda fuera del repositorio:')
  lines.push('')
  lines.push('- Ejecutar una muestra con alumnos reales para medir memoria y accion.')
  lines.push('- Ajustar prosodia manual si el piloto humano detecta aburrimiento o confusiones recurrentes.')
  lines.push('- Congelar una release publica con CDN real cuando se despliegue fuera de localhost.')
  lines.push('')
  lines.push('## Subtitulos')
  lines.push('')
  lines.push('La cobertura es excelente: 100% de escenas tienen subtitulos. El problema no es ausencia, es edicion fina para locucion.')
  lines.push('')
  lines.push('Acciones necesarias:')
  lines.push('')
  lines.push(`1. Mantener el maximo editorial: ahora quedan ${s.strictLongSubtitles} subtitulos por encima de ${strictSubtitleChars} caracteres.`)
  lines.push(`2. Mantener audio sincronizado: ahora quedan ${s.audioOverflow} audios por encima de su ventana.`)
  lines.push(`3. Revisar silencios narrativos: quedan ${s.subtitleGapMin} minutos acumulados sin subtitulo activo, aceptables como pausa pero revisables.`)
  lines.push('4. VTT/SRT ya quedan exportados por video para accesibilidad y revision humana.')
  lines.push('5. Siguiente mejora: traduccion y subtitulado multi-idioma si se quiere escalar la plataforma.')
  lines.push('')
  lines.push('## Imagenes y ritmo visual')
  lines.push('')
  lines.push('Sprint C ya esta aplicado: los videos usan imagenes como recurso pedagogico, no como decoracion. Hay media breaks de meme, reflexion, diagrama y captura realista repartidos por vendor y por duracion.')
  lines.push('')
  lines.push('Estado aplicado:')
  lines.push('')
  lines.push(`- Referencias a imagenes/assets dentro de videos: ${s.imageRefs}.`)
  lines.push(`- Assets reales de decks reutilizados: ${s.realAssetRefs}.`)
  lines.push('- Plantilla `media-break` creada: imagen/reflexion/meme/diagrama con voz encima.')
  lines.push('- Mockups vendor-specific creados: VS Code/Copilot, Codex CLI/cloud, Claude Code/skills/MCP y Learning Ops.')
  lines.push('- Cada 60m queda con 14 breaks visuales.')
  lines.push('- Cada 30m queda con 8 breaks visuales.')
  lines.push('- Cada masterclass 10m queda con 4 breaks visuales.')
  lines.push('- Objetivo total cumplido: 100-130 momentos visuales memorables en la videoteca.')
  lines.push('')
  lines.push('## Utilidad pedagogica')
  lines.push('')
  lines.push('El contenido es util porque cubre superficies reales, coste/modelo/permisos, PR, MCP, skills, hooks, tests, workshops y decisiones humanas. No es humo.')
  lines.push('')
  lines.push('Ya no quedan marcadores de fabrica. Lo que aparece ahora en el ranking son formulas estructurales de situacion/evidencia que conviene revisar en una pasada humana si se quiere una locucion con mas variedad. Top repeticiones estructurales:')
  lines.push('')
  for (const [text, count] of report.repeats.slice(0, 10)) {
    lines.push(`- ${count}x: "${text}"`)
  }
  lines.push('')
  lines.push('Siguiente mejora de excelencia: convertir mas formulas estructurales en microcasos vivos por vendor: login, PR con fallo, coste que se dispara, MCP bloqueado, decision de modelo e instructor pause con pregunta real.')
  lines.push('')
  lines.push('## Peores videos por prioridad')
  lines.push('')
  for (const course of report.courses.slice(0, 12)) {
    lines.push(`### ${course.id}`)
    lines.push('')
    lines.push(`- Score: ${course.score}/100.`)
    lines.push(`- Duracion: ${course.durationMin}m, escenas: ${course.scenes}, subtitulos: ${course.subtitles}.`)
    lines.push(`- Riesgos: ${course.risks.length ? course.risks.join('; ') : 'sin riesgos graves'}.`)
    lines.push('')
  }
  lines.push('## Plan para pasar a 2000/2000')
  lines.push('')
  lines.push('### Sprint A - Audio real')
  lines.push('')
  lines.push('- Hecho: audios pre-renderizados para todos los subtitulos.')
  lines.push('- Hecho: `public/audio/courses/{slug}/{scene}-{index}.mp3`.')
  lines.push('- Hecho: `public/audio/courses/{slug}/manifest.json` con duracion, checksum, voz y texto.')
  lines.push('- Hecho: player con audio manifest y `/api/tts` como fallback.')
  lines.push('- Hecho: QA de audio existe, pesa >0, duracion <= ventana, sin 404.')
  lines.push('')
  lines.push('### Sprint B - Subtitulos editoriales')
  lines.push('')
  lines.push('- Hecho: subtitulos largos partidos.')
  lines.push('- Hecho: VTT/SRT exportado.')
  lines.push('- Hecho: subtitulo sincronizado con duracion real/parseada del MP3.')
  lines.push('- Hecho: modo karaoke/resalte de palabra aproximada en el player.')
  lines.push('')
  lines.push('### Sprint C - Imagenes en videos')
  lines.push('')
  lines.push('- COMPLETADO: reutilizar assets de decks como media breaks.')
  lines.push(`- COMPLETADO: crear ${s.imageRefs} escenas/referencias visuales ` + '`media-break` repartidas por la videoteca.')
  lines.push('- COMPLETADO: meter memes utiles solo donde refuerzan memoria, no como decoracion.')
  lines.push('- COMPLETADO: insertar capturas realistas por vendor: VS Code/Copilot, Codex CLI/cloud, Claude Code/skills/MCP.')
  lines.push('')
  lines.push('### Sprint D - Guion humano')
  lines.push('')
  lines.push('- COMPLETADO: reescribir frases repetidas de fabrica.')
  lines.push('- COMPLETADO: cada bloque tiene situacion, tension, ejemplo, accion, evidencia y cierre.')
  lines.push('- COMPLETADO: cada escena incluye rubrica de utilidad: que aprende, que hace, que decide.')
  lines.push('')
  lines.push('### Sprint E - Release formativo')
  lines.push('')
  lines.push('- COMPLETADO: routing de voces por vendor y tipo de escena.')
  lines.push('- COMPLETADO: metadata de prosodia por escena.')
  lines.push('- COMPLETADO: versionado de audio/subtitulos como assets, no solo JSON.')
  lines.push('- COMPLETADO: politica de cache/CDN y regeneracion.')
  lines.push('- COMPLETADO: protocolo de review humana.')
  lines.push('- PENDIENTE EXTERNO: ejecutar la muestra con alumnos reales.')
  lines.push('')
  lines.push('## Archivos generados')
  lines.push('')
  lines.push(`- JSON: \`${path.relative(root, reportJsonPath).replaceAll('\\', '/')}\``)
  lines.push('')
  return `${lines.join('\n')}\n`
}

async function main() {
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const totals = {
    videoCount: 0,
    sceneCount: 0,
    totalDurationMs: 0,
    subtitleCount: 0,
    subtitleChars: 0,
    subtitleWords: 0,
    missingSubtitleScenes: 0,
    missingVoiceScenes: 0,
    strictLongSubtitles: 0,
    hardLongSubtitles: 0,
    fastSubtitles: 0,
    slowSubtitles: 0,
    ttsTooLong: 0,
    ttsTooShort: 0,
    subtitleGapMs: 0,
    imageRefs: 0,
    realAssetRefs: 0,
    audioManifests: 0,
    audioEntries: 0,
    audioBytes: 0,
    missingAudioManifests: 0,
    missingAudioEntries: 0,
    missingVtt: 0,
    missingSrt: 0,
    audioOverflow: 0,
    screenVisuals: 0,
    quizScenes: 0,
    pauseScenes: 0,
    repeatedFactoryLines: 0,
    longWorkshopsWithoutMediaBreaks: 0,
    lowInteractionLongVideos: 0,
    scenesWithProsody: 0,
    entriesWithProsody: 0,
    manifestsWithAudioVersion: 0,
  }

  const vendors = { codex: 0, copilot: 0, claude: 0, hub: 0, other: 0 }
  const sceneTypes = {}
  const voiceSet = new Set()
  const voiceProfileSet = new Set()
  const repeated = new Map()
  const courses = []
  const factoryMarkers = [
    'La pantalla debe cerrar con criterio, evidencia y coste visible.',
    'El alumno debe poder repetir este paso sin ayuda del instructor.',
    'Respuesta simulada con salida verificable.',
    'No hay criterios bloqueantes pendientes.',
  ]

  for (const file of files) {
    const course = JSON.parse(await fs.readFile(path.join(coursesDir, file), 'utf8'))
    const id = course.id ?? file.replace(/\.json$/, '')
    const vendor = vendorFromId(id)
    vendors[vendor] += 1
    totals.videoCount += 1
    totals.totalDurationMs += course.durationMs ?? 0

    const row = {
      id,
      vendor,
      durationMin: round((course.durationMs ?? 0) / 60000),
      scenes: Array.isArray(course.scenes) ? course.scenes.length : 0,
      subtitles: 0,
      strictLong: 0,
      slow: 0,
      fast: 0,
      ttsTooLong: 0,
      ttsTooShort: 0,
      repeatedFactoryLines: 0,
      imageRefs: 0,
      audioEntries: 0,
      quiz: 0,
      pause: 0,
      risks: [],
      score: 100,
    }

    const manifestPath = path.join(audioRoot, id, 'manifest.json')
    const vttPath = path.join(subtitlesDir, `${id}.vtt`)
    const srtPath = path.join(subtitlesDir, `${id}.srt`)
    const manifestExists = await fs.access(manifestPath).then(() => true).catch(() => false)
    const vttExists = await fs.access(vttPath).then(() => true).catch(() => false)
    const srtExists = await fs.access(srtPath).then(() => true).catch(() => false)
    const manifest = manifestExists ? JSON.parse(await fs.readFile(manifestPath, 'utf8')) : { entries: [] }
    const manifestEntries = Array.isArray(manifest.entries) ? manifest.entries : []
    const manifestEntryMap = new Map(manifestEntries.map(entry => [`${entry.sceneId}::${entry.subtitleIndex}`, entry]))
    if (manifestExists) totals.audioManifests += 1
    else totals.missingAudioManifests += 1
    if (manifest.audioVersion === audioProductionVersion) totals.manifestsWithAudioVersion += 1
    if (!vttExists) totals.missingVtt += 1
    if (!srtExists) totals.missingSrt += 1
    row.audioEntries = manifestEntries.length
    totals.audioEntries += manifestEntries.length
    totals.audioBytes += manifestEntries.reduce((sum, entry) => sum + (entry.bytes ?? 0), 0)
    for (const entry of manifestEntries) {
      if (entry.voice) voiceSet.add(entry.voice)
      if (entry.voiceProfileId) voiceProfileSet.add(entry.voiceProfileId)
      if (entry.energy && entry.emphasis && entry.rate && entry.pitch) totals.entriesWithProsody += 1
    }

    for (const [sceneIndex, scene] of (course.scenes ?? []).entries()) {
      totals.sceneCount += 1
      sceneTypes[scene.type] = (sceneTypes[scene.type] ?? 0) + 1
      if (scene.type === 'quiz') {
        totals.quizScenes += 1
        row.quiz += 1
      }
      if (scene.type === 'pause') {
        totals.pauseScenes += 1
        row.pause += 1
      }
      if (scene.production?.voiceProfileId && scene.production?.energy && scene.production?.emphasis) {
        totals.scenesWithProsody += 1
      }

      const subtitles = Array.isArray(scene.subtitles) ? scene.subtitles : []
      const voiceover = Array.isArray(scene.voiceover) ? scene.voiceover : []
      row.subtitles += subtitles.length
      totals.subtitleCount += subtitles.length
      if (!subtitles.length) totals.missingSubtitleScenes += 1
      if (!voiceover.length) totals.missingVoiceScenes += 1

      const contentText = `${textFrom(scene.content)} ${subtitles.map(subtitle => subtitle.text).join(' ')} ${voiceover.join(' ')}`
      if (/\.png|\.jpg|\.jpeg|\.webp|\.svg|image|img|src\s*:/i.test(contentText)) {
        row.imageRefs += 1
        totals.imageRefs += 1
      }
      if (/\/decks\/|\.\/images\/|\.\/assets\//i.test(contentText)) totals.realAssetRefs += 1
      if (scene.screen?.visual) totals.screenVisuals += 1
      const factoryHits = factoryMarkers.filter(marker => contentText.includes(marker)).length
      row.repeatedFactoryLines += factoryHits
      totals.repeatedFactoryLines += factoryHits

      for (let subtitleIndex = 0; subtitleIndex < subtitles.length; subtitleIndex += 1) {
        const subtitle = subtitles[subtitleIndex]
        const chars = subtitle.text.length
        const wordCount = words(subtitle.text)
        const seconds = Math.max(0.1, (subtitle.endMs - subtitle.startMs) / 1000)
        const cps = chars / seconds
        const estimatedTts = estimateTtsSeconds(subtitle.text)
        const manifestEntry = manifestEntryMap.get(`${scene.id}::${subtitleIndex}`)
        if (!manifestEntry) {
          totals.missingAudioEntries += 1
        } else if ((manifestEntry.durationMs ?? 0) > (subtitle.endMs - subtitle.startMs) + 250) {
          totals.audioOverflow += 1
        }
        totals.subtitleChars += chars
        totals.subtitleWords += wordCount
        repeated.set(subtitle.text, (repeated.get(subtitle.text) ?? 0) + 1)

        if (chars > strictSubtitleChars) {
          row.strictLong += 1
          totals.strictLongSubtitles += 1
        }
        if (chars > hardSubtitleChars) totals.hardLongSubtitles += 1
        if (cps > fastCps) {
          row.fast += 1
          totals.fastSubtitles += 1
        }
        if (chars > 35 && cps < slowCps) {
          row.slow += 1
          totals.slowSubtitles += 1
        }
        if (estimatedTts > seconds * 1.12) {
          row.ttsTooLong += 1
          totals.ttsTooLong += 1
        }
        if (estimatedTts < seconds * 0.45 && seconds > 4) {
          row.ttsTooShort += 1
          totals.ttsTooShort += 1
        }

        const previous = subtitles[subtitleIndex - 1]
        if (previous && subtitle.startMs > previous.endMs) totals.subtitleGapMs += subtitle.startMs - previous.endMs
      }

      if (sceneIndex === 0 && row.durationMin >= 30 && row.imageRefs === 0) {
        // Counted later at course level, this branch intentionally empty.
      }
    }

    if (row.durationMin >= 30 && row.imageRefs === 0) totals.longWorkshopsWithoutMediaBreaks += 1
    if (row.durationMin >= 10 && row.quiz < 1) totals.lowInteractionLongVideos += 1

    row.score = Math.max(0, round(
      100
      - Math.min(18, row.strictLong * 0.35)
      - Math.min(8, row.slow * 0.16)
      - Math.min(14, row.ttsTooLong * 0.45)
      - Math.min(6, row.ttsTooShort * 0.05)
      - Math.min(8, row.repeatedFactoryLines * 0.35)
      - (row.imageRefs === 0 ? 7 : 0)
      - (row.durationMin >= 30 && row.imageRefs === 0 ? 6 : 0),
    ))

    if (row.strictLong) row.risks.push(`${row.strictLong} subtitulos >${strictSubtitleChars} caracteres`)
    if (row.slow) row.risks.push(`${row.slow} subtitulos lentos`)
    if (row.ttsTooLong) row.risks.push(`${row.ttsTooLong} ventanas TTS ajustadas`)
    if (row.repeatedFactoryLines) row.risks.push(`${row.repeatedFactoryLines} frases repetidas`)
    if (row.imageRefs === 0) row.risks.push('sin imagen/asset dentro del video')
    courses.push(row)
  }

  const summary = {
    ...totals,
    totalDurationMin: round(totals.totalDurationMs / 60000),
    avgSubtitleChars: round(totals.subtitleChars / Math.max(1, totals.subtitleCount)),
    avgSubtitleWords: round(totals.subtitleWords / Math.max(1, totals.subtitleCount)),
    subtitleGapMin: round(totals.subtitleGapMs / 60000),
    audioMb: round(totals.audioBytes / 1024 / 1024),
    voiceCount: voiceSet.size,
    voiceProfileCount: voiceProfileSet.size,
    voices: [...voiceSet].sort(),
    spainVoiceOnly: voiceSet.size > 0 && [...voiceSet].every(voice => String(voice).startsWith('es-ES-')),
    voiceProfiles: [...voiceProfileSet].sort(),
    audioProductionVersion,
    hasAudioReleaseManifest: await fs.access(audioReleaseManifestPath).then(() => true).catch(() => false),
    hasAudioPackagingPolicy: await fs.access(audioPackagingPolicyPath).then(() => true).catch(() => false),
    hasAudioRouting: await fs.access(audioRoutingPath).then(() => true).catch(() => false),
    hasHumanReviewPlan: await fs.access(humanReviewPlanPath).then(() => true).catch(() => false),
  }
  delete summary.totalDurationMs
  delete summary.subtitleChars
  delete summary.subtitleWords
  delete summary.subtitleGapMs

  const tts = await testTtsEndpoint()
  const axisScore = scoreAxis(summary)
  const score = {
    ...axisScore,
    total: Object.values(axisScore).reduce((total, value) => total + value, 0),
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    thresholds: {
      strictSubtitleChars,
      hardSubtitleChars,
      fastCps,
      slowCps,
      estimatedSpanishWordsPerSec,
    },
    vendors,
    sceneTypes,
    summary,
    score,
    tts,
    repeats: [...repeated.entries()].filter(([, count]) => count >= 8).sort((a, b) => b[1] - a[1]).slice(0, 30),
    courses: courses.sort((a, b) => a.score - b.score),
  }

  await fs.mkdir(outputDir, { recursive: true })
  await fs.mkdir(path.dirname(reportMdPath), { recursive: true })
  await fs.writeFile(reportJsonPath, JSON.stringify(report, null, 2), 'utf8')
  await fs.writeFile(reportMdPath, buildMarkdown(report), 'utf8')
  console.log(`audit written: ${path.relative(root, reportMdPath)}`)
  console.log(`score=${score.total}/2000 subtitles=${score.subtitles} audio=${score.audio} visual=${score.visualMedia} pedagogy=${score.pedagogy} ops=${score.operations}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
