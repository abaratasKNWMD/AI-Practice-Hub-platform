import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const audioRoot = path.join(root, 'public', 'audio', 'courses')
const subtitlesDir = path.join(root, 'public', 'subtitles', 'courses')
const outputDir = path.join(root, 'public', 'release-ops', 'qa', 'audio-subtitles-pedagogy')
const reportPath = path.join(outputDir, 'audio-subtitles-qa.json')
const maxChars = 95
const maxAudioOverflowMs = 250

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function words(text) {
  return (text.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) ?? []).length
}

function charsPerSec(subtitle) {
  return subtitle.text.length / Math.max(0.1, (subtitle.endMs - subtitle.startMs) / 1000)
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true })
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const courseReports = []
  const issues = []
  let totals = {
    courses: files.length,
    scenes: 0,
    subtitles: 0,
    manifests: 0,
    audioEntries: 0,
    audioBytes: 0,
    missingAudio: 0,
    missingManifest: 0,
    missingVtt: 0,
    missingSrt: 0,
    longSubtitles: 0,
    fastSubtitles: 0,
    slowSubtitles: 0,
    audioOverflow: 0,
  }

  for (const file of files) {
    const course = JSON.parse(await fs.readFile(path.join(coursesDir, file), 'utf8'))
    const manifestPath = path.join(audioRoot, course.id, 'manifest.json')
    const vttPath = path.join(subtitlesDir, `${course.id}.vtt`)
    const srtPath = path.join(subtitlesDir, `${course.id}.srt`)
    const courseReport = {
      id: course.id,
      scenes: course.scenes.length,
      subtitles: 0,
      entries: 0,
      issues: [],
    }

    totals.scenes += course.scenes.length
    const manifestExists = await exists(manifestPath)
    const vttExists = await exists(vttPath)
    const srtExists = await exists(srtPath)
    if (!manifestExists) {
      totals.missingManifest += 1
      courseReport.issues.push('manifest audio ausente')
    }
    if (!vttExists) {
      totals.missingVtt += 1
      courseReport.issues.push('VTT ausente')
    }
    if (!srtExists) {
      totals.missingSrt += 1
      courseReport.issues.push('SRT ausente')
    }

    const manifest = manifestExists ? JSON.parse(await fs.readFile(manifestPath, 'utf8')) : { entries: [] }
    const entryMap = new Map(manifest.entries.map(entry => [`${entry.sceneId}::${entry.subtitleIndex}`, entry]))
    if (manifestExists) totals.manifests += 1
    totals.audioEntries += manifest.entries.length
    courseReport.entries = manifest.entries.length

    for (const scene of course.scenes) {
      for (let subtitleIndex = 0; subtitleIndex < scene.subtitles.length; subtitleIndex += 1) {
        const subtitle = scene.subtitles[subtitleIndex]
        const key = `${scene.id}::${subtitleIndex}`
        const entry = entryMap.get(key)
        totals.subtitles += 1
        courseReport.subtitles += 1
        const cps = charsPerSec(subtitle)
        if (subtitle.text.length > maxChars) {
          totals.longSubtitles += 1
          courseReport.issues.push(`subtitulo largo ${scene.id}#${subtitleIndex + 1}`)
        }
        if (cps > 20) {
          totals.fastSubtitles += 1
          courseReport.issues.push(`subtitulo rapido ${scene.id}#${subtitleIndex + 1}`)
        }
        if (subtitle.text.length > 35 && cps < 5.2) {
          totals.slowSubtitles += 1
          courseReport.issues.push(`subtitulo lento ${scene.id}#${subtitleIndex + 1}`)
        }
        if (!entry) {
          totals.missingAudio += 1
          courseReport.issues.push(`audio sin entrada ${scene.id}#${subtitleIndex + 1}`)
          continue
        }
        const audioPath = path.join(root, 'public', entry.audioUrl.replace(/[?#].*$/, '').replace(/^\//, ''))
        if (!await exists(audioPath)) {
          totals.missingAudio += 1
          courseReport.issues.push(`audio 404 ${entry.audioUrl}`)
          continue
        }
        const stat = await fs.stat(audioPath)
        totals.audioBytes += stat.size
        if (stat.size <= 0) {
          totals.missingAudio += 1
          courseReport.issues.push(`audio vacio ${entry.audioUrl}`)
        }
        const subtitleWindow = subtitle.endMs - subtitle.startMs
        if (entry.durationMs > subtitleWindow + maxAudioOverflowMs) {
          totals.audioOverflow += 1
          courseReport.issues.push(`audio mayor que ventana ${scene.id}#${subtitleIndex + 1}: ${entry.durationMs}ms > ${subtitleWindow}ms`)
        }
        if (words(subtitle.text) === 0) {
          courseReport.issues.push(`subtitulo sin palabras ${scene.id}#${subtitleIndex + 1}`)
        }
      }
    }

    courseReport.issues = [...new Set(courseReport.issues)].slice(0, 40)
    courseReports.push(courseReport)
    for (const issue of courseReport.issues) issues.push({ courseId: course.id, issue })
  }

  const report = {
    generatedAt: new Date().toISOString(),
    totals: {
      ...totals,
      audioMb: Math.round((totals.audioBytes / 1024 / 1024) * 10) / 10,
      pass: totals.missingManifest === 0 &&
        totals.missingAudio === 0 &&
        totals.missingVtt === 0 &&
        totals.missingSrt === 0 &&
        totals.longSubtitles === 0 &&
        totals.fastSubtitles === 0 &&
        totals.audioOverflow === 0,
    },
    issues: issues.slice(0, 500),
    courses: courseReports,
  }

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`audio/subtitle QA written: ${path.relative(root, reportPath)}`)
  console.log(`pass=${report.totals.pass} subtitles=${totals.subtitles} audioEntries=${totals.audioEntries} missingAudio=${totals.missingAudio} long=${totals.longSubtitles} overflow=${totals.audioOverflow}`)
  if (!report.totals.pass) process.exitCode = 1
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
