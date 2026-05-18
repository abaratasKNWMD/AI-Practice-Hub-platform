import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const subtitlesDir = path.join(root, 'public', 'subtitles', 'courses')
const maxChars = Number(process.env.SUBTITLE_MAX_CHARS ?? 88)
const idealChars = Number(process.env.SUBTITLE_IDEAL_CHARS ?? 74)

function estimateSpeechMs(text) {
  const wordCount = (text.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) ?? []).length
  const punctuationPause = Math.max(0, (text.split(/[,.!?;:]/).length - 1) * 160)
  return Math.round(Math.max(1450, (wordCount / 2.55) * 1000 + punctuationPause + 280))
}

function cleanText(text) {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim()
}

function splitSentence(text) {
  const cleaned = cleanText(text)
  if (cleaned.length <= maxChars) return [cleaned]

  const punctuationParts = cleaned
    .split(/(?<=[.!?;:])\s+/)
    .flatMap(part => part.split(/,\s+(?=[A-ZÁÉÍÓÚÜÑa-záéíóúüñ0-9])/))
    .map(cleanText)
    .filter(Boolean)

  const chunks = []
  let current = ''
  for (const part of punctuationParts) {
    if (!current) {
      current = part
      continue
    }
    if (`${current} ${part}`.length <= idealChars) {
      current = `${current} ${part}`
    } else {
      chunks.push(current)
      current = part
    }
  }
  if (current) chunks.push(current)

  return chunks.flatMap(chunk => {
    if (chunk.length <= maxChars) return [chunk]
    const words = chunk.split(/\s+/)
    const wordChunks = []
    let line = ''
    for (const word of words) {
      if (!line) {
        line = word
        continue
      }
      if (`${line} ${word}`.length <= maxChars) {
        line = `${line} ${word}`
      } else {
        wordChunks.push(line)
        line = word
      }
    }
    if (line) wordChunks.push(line)
    return wordChunks
  })
}

function subtitleLines(scene) {
  const source = Array.isArray(scene.subtitles) && scene.subtitles.length
    ? scene.subtitles.map(subtitle => subtitle.text)
    : Array.isArray(scene.voiceover)
      ? scene.voiceover
      : []

  return source
    .flatMap(splitSentence)
    .map(cleanText)
    .filter(Boolean)
}

function timeSceneSubtitles(scene, lines) {
  if (!lines.length) return []
  const sceneStart = scene.startMs
  const sceneEnd = scene.endMs
  const availableStart = sceneStart + 450
  const availableEnd = sceneEnd - 450
  const availableMs = Math.max(1200, availableEnd - availableStart)
  const baseGapMs = lines.length <= 1 ? 0 : 260
  const estimated = lines.map(estimateSpeechMs)
  const totalEstimated = estimated.reduce((sum, value) => sum + value, 0) + baseGapMs * Math.max(0, lines.length - 1)
  const scale = totalEstimated > availableMs ? Math.max(0.72, (availableMs - baseGapMs * Math.max(0, lines.length - 1)) / Math.max(1, estimated.reduce((sum, value) => sum + value, 0))) : 1
  const gapMs = totalEstimated > availableMs ? 80 : Math.min(900, Math.floor((availableMs - totalEstimated) / Math.max(1, lines.length + 1)) + baseGapMs)
  let cursor = availableStart + (totalEstimated < availableMs ? Math.min(600, Math.floor((availableMs - totalEstimated) / 3)) : 0)

  return lines.map((text, index) => {
    const duration = Math.max(1300, Math.round(estimated[index] * scale))
    const startMs = Math.min(Math.max(sceneStart, cursor), sceneEnd - 900)
    const endMs = Math.min(sceneEnd - 250, Math.max(startMs + 1100, startMs + duration))
    cursor = endMs + gapMs
    return { text, startMs, endMs }
  })
}

function escapeVtt(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatTimestamp(ms, separator) {
  const total = Math.max(0, Math.floor(ms))
  const hours = Math.floor(total / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const millis = total % 1000
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${separator}${String(millis).padStart(3, '0')}`
}

function allSubtitles(course) {
  return course.scenes.flatMap(scene => scene.subtitles.map(subtitle => ({
    ...subtitle,
    sceneId: scene.id,
  })))
}

function toVtt(course) {
  const lines = ['WEBVTT', '', `NOTE ${course.id} - ${course.title}`, '']
  for (const [index, subtitle] of allSubtitles(course).entries()) {
    lines.push(String(index + 1))
    lines.push(`${formatTimestamp(subtitle.startMs, '.')} --> ${formatTimestamp(subtitle.endMs, '.')}`)
    lines.push(escapeVtt(subtitle.text))
    lines.push('')
  }
  return `${lines.join('\n')}\n`
}

function toSrt(course) {
  const lines = []
  for (const [index, subtitle] of allSubtitles(course).entries()) {
    lines.push(String(index + 1))
    lines.push(`${formatTimestamp(subtitle.startMs, ',')} --> ${formatTimestamp(subtitle.endMs, ',')}`)
    lines.push(subtitle.text)
    lines.push('')
  }
  return `${lines.join('\n')}\n`
}

async function main() {
  await fs.mkdir(subtitlesDir, { recursive: true })
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  let totalScenes = 0
  let totalSubtitles = 0
  let splitLines = 0

  for (const file of files) {
    const filePath = path.join(coursesDir, file)
    const course = JSON.parse(await fs.readFile(filePath, 'utf8'))
    for (const scene of course.scenes ?? []) {
      totalScenes += 1
      const previousCount = Array.isArray(scene.subtitles) ? scene.subtitles.length : 0
      const lines = subtitleLines(scene)
      splitLines += Math.max(0, lines.length - previousCount)
      scene.subtitles = timeSceneSubtitles(scene, lines)
      scene.voiceover = lines
      totalSubtitles += scene.subtitles.length
    }

    await fs.writeFile(filePath, `${JSON.stringify(course, null, 2)}\n`, 'utf8')
    await fs.writeFile(path.join(subtitlesDir, `${course.id}.vtt`), toVtt(course), 'utf8')
    await fs.writeFile(path.join(subtitlesDir, `${course.id}.srt`), toSrt(course), 'utf8')
  }

  console.log(`editorial subtitles complete: courses=${files.length} scenes=${totalScenes} subtitles=${totalSubtitles} splitLines=${splitLines}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
