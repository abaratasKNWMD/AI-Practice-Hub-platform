import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { vendorFromId } from './audio-production-config.mjs'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const docsDir = path.join(root, 'docs', 'auditorias')
const operationsDir = path.join(root, 'public', 'content', 'operations')

function textFrom(value) {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map(textFrom).join(' ')
  if (typeof value === 'object') return Object.values(value).map(textFrom).join(' ')
  return ''
}

function words(text) {
  return (String(text).match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) ?? []).length
}

function clean(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim()
}

function courseRows(course) {
  return (course.scenes ?? []).flatMap(scene => (scene.subtitles ?? []).map(subtitle => ({
    scene,
    subtitle,
    text: clean(subtitle.text),
  })))
}

function nonTechnicalTimeHits(course) {
  const hits = []
  function walk(value, pathName = '') {
    if (typeof value === 'string') {
      if (!/\.id$|^id$|audioUrl|imageUrl|visual|path|url/i.test(pathName)) {
        const match = value.match(/\b\d+\s*m\b/gi)
        if (match) hits.push({ path: pathName, match })
      }
      return
    }
    if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${pathName}[${index}]`))
    else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) walk(item, pathName ? `${pathName}.${key}` : key)
    }
  }
  walk(course)
  return hits
}

function objectiveState(course) {
  const opening = courseRows(course).slice(0, 8).map(item => item.text).join(' ')
  return {
    hasObjective: /Objetivo de esta clase/i.test(opening),
    hasOutcome: /Al final debes poder/i.test(opening),
    hasRoute: /La ruta sera/i.test(opening),
    hasDecision: /mira esta decision/i.test(opening),
    opening,
  }
}

function scoreCourse(course) {
  const rows = courseRows(course)
  const subtitles = rows.map(row => row.text)
  const allText = textFrom(course)
  const objective = objectiveState(course)
  const voices = [...new Set((course.scenes ?? []).map(scene => scene.production?.voice).filter(Boolean))]
  const latinVoiceCount = voices.filter(voice => !voice.startsWith('es-ES-')).length
  const ellipsis = (allText.match(/\.{3,}|…/g) ?? []).length
  const timeHits = nonTechnicalTimeHits(course).length
  const longSubtitles = subtitles.filter(text => text.length > 88).length
  const clipped = subtitles.filter(text => /\.{3,}|…/.test(text)).length
  const maxSubtitleChars = Math.max(0, ...subtitles.map(text => text.length))
  const avgWords = Math.round((subtitles.reduce((sum, text) => sum + words(text), 0) / Math.max(1, subtitles.length)) * 10) / 10
  const chapters = (course.chapters ?? []).map(chapter => chapter.label || chapter.title).filter(Boolean)
  const mediaBreaks = (course.scenes ?? []).filter(scene => scene.type === 'media-break').length
  const risks = []
  if (!objective.hasObjective) risks.push('no abre con objetivo explicito')
  if (!objective.hasOutcome) risks.push('no promete salida observable')
  if (!objective.hasRoute) risks.push('no explica ruta')
  if (!objective.hasDecision) risks.push('no declara decision de alumno')
  if (latinVoiceCount) risks.push('usa voces fuera de Espana')
  if (ellipsis) risks.push('contiene puntos suspensivos')
  if (timeHits) risks.push('contiene abreviaturas tipo 10m en texto narrativo')
  if (longSubtitles) risks.push('subtitulos largos')
  if (clipped) risks.push('posibles cortes con puntos suspensivos')
  if ((course.durationMs ?? 0) >= 30 * 60000 && mediaBreaks < 8) risks.push('video largo con pocas pausas visuales')
  if ((course.durationMs ?? 0) >= 30 * 60000 && chapters.length < 5) risks.push('video largo sin cinco actos claros')

  const score = Math.max(0, 100
    - (!objective.hasObjective ? 15 : 0)
    - (!objective.hasOutcome ? 10 : 0)
    - (!objective.hasRoute ? 10 : 0)
    - (!objective.hasDecision ? 10 : 0)
    - latinVoiceCount * 12
    - Math.min(15, ellipsis * 0.4)
    - Math.min(15, timeHits * 2)
    - Math.min(12, longSubtitles * 0.8)
    - Math.min(12, clipped * 1.5)
    - ((course.durationMs ?? 0) >= 30 * 60000 && mediaBreaks < 8 ? 8 : 0)
    - ((course.durationMs ?? 0) >= 30 * 60000 && chapters.length < 5 ? 8 : 0))

  return {
    id: course.id,
    title: course.title,
    vendor: vendorFromId(course.id),
    durationMin: Math.round((course.durationMs ?? 0) / 60000),
    scenes: course.scenes?.length ?? 0,
    subtitles: subtitles.length,
    voices,
    chapters,
    mediaBreaks,
    maxSubtitleChars,
    avgWords,
    objective,
    ellipsis,
    timeHits,
    longSubtitles,
    clipped,
    risks,
    teacherScore: Math.round(score),
  }
}

function buildMarkdown(report) {
  const lines = []
  lines.push('# Auditoria editorial narrativa - videos como clase')
  lines.push('')
  lines.push(`Fecha: ${report.generatedAt}`)
  lines.push('')
  lines.push('## Veredicto')
  lines.push('')
  lines.push('Esta auditoria mira lo que no ve una prueba tecnica: voz, pronunciacion, apertura docente, objetivo, ruta, decision del alumno y posibles cortes de subtitulo.')
  lines.push('')
  lines.push(`- Videos auditados: ${report.summary.videoCount}.`)
  lines.push(`- Score docente medio: ${report.summary.avgTeacherScore}/100.`)
  lines.push(`- Videos con objetivo explicito: ${report.summary.objectiveReady}/${report.summary.videoCount}.`)
  lines.push(`- Voces fuera de Espana: ${report.summary.nonSpainVoiceVideos}.`)
  lines.push(`- Abreviaturas tipo 10m en texto narrativo: ${report.summary.timeUnitRiskVideos}.`)
  lines.push(`- Puntos suspensivos/cortes: ${report.summary.ellipsisVideos}.`)
  lines.push(`- Subtitulos largos: ${report.summary.longSubtitleVideos}.`)
  lines.push('')
  lines.push('## Tabla por video')
  lines.push('')
  lines.push('| Video | Min | Escenas | Voz | Objetivo | Pausas | Score | Riesgo |')
  lines.push('| --- | ---: | ---: | --- | --- | ---: | ---: | --- |')
  for (const course of report.courses) {
    const objective = course.objective.hasObjective && course.objective.hasOutcome && course.objective.hasRoute && course.objective.hasDecision ? 'si' : 'no'
    const risk = course.risks.length ? course.risks.join('; ') : 'sin riesgo editorial automatico'
    lines.push(`| \`${course.id}\` | ${course.durationMin} | ${course.scenes} | ${course.voices.join(', ')} | ${objective} | ${course.mediaBreaks} | ${course.teacherScore} | ${risk} |`)
  }
  lines.push('')
  lines.push('## Lectura')
  lines.push('')
  lines.push('- El arranque de cada video debe funcionar como profesor: objetivo, salida observable, ruta y decision.')
  lines.push('- Las unidades se escriben para locucion: `10 minutos`, `1 hora`, `minuto 4`; no `10m`.')
  lines.push('- Se eliminan puntos suspensivos porque el TTS los interpreta como frase cortada.')
  lines.push('- La voz queda bloqueada a Espana en produccion. Si se quiere variedad, debe ser otra voz espanola validada a oido.')
  lines.push('- El siguiente nivel no es mas QA automatico: es ver 3 videos largos con alumnos reales y anotar donde se pierden.')
  lines.push('')
  return `${lines.join('\n')}\n`
}

async function main() {
  await fs.mkdir(docsDir, { recursive: true })
  await fs.mkdir(operationsDir, { recursive: true })
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const courses = []
  for (const file of files) {
    courses.push(scoreCourse(JSON.parse(await fs.readFile(path.join(coursesDir, file), 'utf8'))))
  }
  const summary = {
    videoCount: courses.length,
    avgTeacherScore: Math.round(courses.reduce((sum, course) => sum + course.teacherScore, 0) / Math.max(1, courses.length)),
    objectiveReady: courses.filter(course => course.objective.hasObjective && course.objective.hasOutcome && course.objective.hasRoute && course.objective.hasDecision).length,
    nonSpainVoiceVideos: courses.filter(course => course.voices.some(voice => !voice.startsWith('es-ES-'))).length,
    timeUnitRiskVideos: courses.filter(course => course.timeHits > 0).length,
    ellipsisVideos: courses.filter(course => course.ellipsis > 0 || course.clipped > 0).length,
    longSubtitleVideos: courses.filter(course => course.longSubtitles > 0).length,
  }
  const report = {
    generatedAt: new Date().toISOString(),
    summary,
    courses,
  }
  await fs.writeFile(path.join(operationsDir, 'editorial-narrative-audit.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  await fs.writeFile(path.join(docsDir, 'AUDITORIA_EDITORIAL_NARRATIVA_VIDEOS.md'), buildMarkdown(report), 'utf8')
  console.log(`editorial narrative audit: videos=${summary.videoCount} score=${summary.avgTeacherScore}/100 objectives=${summary.objectiveReady}/${summary.videoCount}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
