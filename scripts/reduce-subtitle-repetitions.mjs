import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { vendorFromId } from './audio-production-config.mjs'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const threshold = Number(process.env.REPEAT_THRESHOLD ?? 8)

function cleanText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function artifactFromScene(scene) {
  const content = scene.content && typeof scene.content === 'object' ? scene.content : {}
  return cleanText(content.title || content.actionLabel || content.label || scene.name || scene.id || scene.type)
    .replace(/["]/g, '')
    .slice(0, 46)
}

function vendorLabel(vendor) {
  return {
    codex: 'Codex',
    copilot: 'Copilot',
    claude: 'Claude',
    hub: 'Hub',
    other: 'IA',
  }[vendor] ?? 'IA'
}

function contextualize(text, vendor, scene, occurrence) {
  const line = cleanText(text)
  const label = vendorLabel(vendor)
  const artifact = artifactFromScene(scene)
  const minute = `${Math.floor((scene.startMs ?? 0) / 60000)}m`
  if (/^Modelo\s+\d+m:/.test(line)) {
    return `${line} En ${label}, valida "${artifact}" antes de iterar.`
  }
  if (/^Evidencia\s+\d+m:/.test(line)) {
    return `${line} Caso ${label}: "${artifact}".`
  }
  if (/^(Mostrar|Simular|Clasificar|Crear|Recoger|Registrar|Seleccionar)\b/.test(line)) {
    return `${label} ${minute}: ${line.replace(/\.$/, '')} para "${artifact}".`
  }
  if (/^El grupo\b/.test(line)) {
    return `${label} ${minute}: ${line.replace(/\.$/, '')} en "${artifact}".`
  }
  if (/^El instructor\b/.test(line)) {
    return `${label} ${minute}: ${line.replace(/\.$/, '')} durante "${artifact}".`
  }
  return `${line} (${label}, ${minute}, paso ${occurrence + 1})`
}

async function main() {
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  const courses = []
  const counts = new Map()
  for (const file of files) {
    const course = JSON.parse(await fs.readFile(path.join(coursesDir, file), 'utf8'))
    courses.push({ file, course })
    for (const scene of course.scenes ?? []) {
      for (const subtitle of scene.subtitles ?? []) {
        const text = cleanText(subtitle.text)
        counts.set(text, (counts.get(text) ?? 0) + 1)
      }
    }
  }

  const repeated = new Set([...counts.entries()].filter(([, count]) => count >= threshold).map(([text]) => text))
  const occurrences = new Map()
  let changed = 0
  for (const { course } of courses) {
    const vendor = vendorFromId(course.id)
    for (const scene of course.scenes ?? []) {
      for (const subtitle of scene.subtitles ?? []) {
        const text = cleanText(subtitle.text)
        if (!repeated.has(text)) continue
        const occurrence = occurrences.get(text) ?? 0
        occurrences.set(text, occurrence + 1)
        subtitle.text = contextualize(text, vendor, scene, occurrence)
        changed += 1
      }
      scene.voiceover = (scene.subtitles ?? []).map(subtitle => subtitle.text)
    }
  }

  for (const { file, course } of courses) {
    await fs.writeFile(path.join(coursesDir, file), `${JSON.stringify(course, null, 2)}\n`, 'utf8')
  }

  console.log(`subtitle repetitions reduced: repeated=${repeated.size} changed=${changed}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
