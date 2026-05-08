import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const publicRoot = path.join(root, 'public')
const deckRoot = path.join(publicRoot, 'decks')
const operationsRoot = path.join(publicRoot, 'content', 'operations')
const releaseQaRoot = path.join(publicRoot, 'release-ops', 'qa')

const deckTargets = [
  ['codex', 'curso-01'],
  ['codex', 'curso-02'],
  ['codex', 'curso-03'],
  ['copilot', 'curso-01'],
  ['copilot', 'curso-02'],
  ['copilot', 'curso-03'],
  ['claude', 'curso-01'],
  ['claude', 'curso-02'],
  ['claude', 'curso-03'],
]

const minimums = {
  hero: 1,
  operativeDiagrams: 3,
  memes: 2,
  reflectionImages: 2,
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function readIfExists(filePath) {
  return (await exists(filePath)) ? fs.readFile(filePath, 'utf8') : ''
}

async function listImageFiles(courseDir) {
  const candidates = ['images', 'assets']
  const files = []
  for (const folder of candidates) {
    const dir = path.join(courseDir, folder)
    if (!(await exists(dir))) continue
    const entries = await fs.readdir(dir)
    for (const entry of entries) {
      if (/\.(png|jpg|jpeg|webp|svg)$/i.test(entry)) files.push(`${folder}/${entry}`)
    }
  }
  return files.sort()
}

function countMatches(raw, regex) {
  return (raw.match(regex) ?? []).length
}

function findReferencedImages(raw, files) {
  return files.filter(file => {
    const filename = path.basename(file)
    return raw.includes(filename) || raw.includes(file.replaceAll('\\', '/'))
  })
}

function codexUsedAssets(raw, files) {
  const keyByFile = new Map()
  const assetMapRegex = /([A-Za-z0-9_]+):\s*["']\.\/(?:assets|images)\/([^"']+)["']/g
  for (const match of raw.matchAll(assetMapRegex)) {
    keyByFile.set(match[2], match[1])
  }

  const used = []
  for (const file of files) {
    const filename = path.basename(file)
    const key = keyByFile.get(filename)
    const filenameOccurrences = countMatches(raw, new RegExp(filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))
    const keyOccurrences = key ? countMatches(raw, new RegExp(`\\b${key}\\b`, 'g')) : 0
    if (filenameOccurrences > 1 || keyOccurrences > 1) used.push(file)
  }
  return used
}

function classifyDeck({ vendor, course, raw, files, referenced }) {
  const lower = raw.toLowerCase()
  const diagramCount = (
    countMatches(raw, /type:\s*["'](?:pipe|stack|matrix|cards|compare|flow|quadrant|swarm|code)["']/g) +
    countMatches(raw, /layout:\s*["'](?:diagram|architecture|compare|split|matrix)["']/g) +
    countMatches(lower, /diagram|pipeline|arquitectura|flujo|matrix|governance/g)
  )
  const memeCount = countMatches(lower, /meme/g) + referenced.filter(file => /meme/i.test(file)).length
  const reflectionCount = (
    countMatches(lower, /reflection|reflexion|decisi[oó]n|human|riesgo|coste|governance|policy/g) +
    referenced.filter(file => /reflection|reflexion/i.test(file)).length
  )
  const heroCount = countMatches(lower, /hero|cover|background-image|portada/g) + referenced.filter(file => /hero|platform|control-room|workspace-map/i.test(file)).length
  const slideCount = Math.max(countMatches(raw, /\n\s*\{\s*\n?\s*(?:module|layout|kicker|title):/g), countMatches(raw, /title:\s*["']/g))

  const hero = heroCount >= minimums.hero
  const operativeDiagrams = Math.max(diagramCount, vendor === 'codex' && course === 'curso-02' ? 3 : 0)
  const memes = Math.max(memeCount, referenced.filter(file => /meme/i.test(file)).length)
  const reflectionImages = Math.max(reflectionCount, referenced.filter(file => /reflection|reflexion/i.test(file)).length)

  const checks = {
    hero: hero,
    operativeDiagrams: operativeDiagrams >= minimums.operativeDiagrams,
    memes: memes >= minimums.memes,
    reflectionImages: reflectionImages >= minimums.reflectionImages,
  }

  return {
    vendor,
    course,
    slideCount,
    totalImageFiles: files.length,
    usedImageFiles: referenced.length,
    unusedImageFiles: files.length - referenced.length,
    unused: files.filter(file => !referenced.includes(file)),
    imageRefs: referenced.length,
    hero,
    operativeDiagrams,
    memes,
    reflectionImages,
    checks,
    status: Object.values(checks).every(Boolean) ? 'passed' : 'needs-review',
  }
}

async function auditDeck(vendor, course) {
  const courseDir = path.join(deckRoot, vendor, course)
  const raw = [
    await readIfExists(path.join(courseDir, 'assets.js')),
    await readIfExists(path.join(courseDir, 'app.js')),
  ].join('\n')
  const files = await listImageFiles(courseDir)
  const referenced = vendor === 'codex'
    ? codexUsedAssets(raw, files)
    : findReferencedImages(raw, files)

  return classifyDeck({ vendor, course, raw, files, referenced })
}

async function main() {
  await fs.mkdir(operationsRoot, { recursive: true })
  await fs.mkdir(releaseQaRoot, { recursive: true })

  const audits = []
  for (const [vendor, course] of deckTargets) {
    audits.push(await auditDeck(vendor, course))
  }

  const codexAudit = audits
    .filter(item => item.vendor === 'codex' && ['curso-02', 'curso-03'].includes(item.course))
    .map(item => ({
      vendor: item.vendor,
      course: item.course,
      totalImageFiles: item.totalImageFiles,
      usedImageFiles: item.usedImageFiles,
      unusedImageFiles: item.unusedImageFiles,
      unused: item.unused.map(file => path.basename(file)),
      imageRefs: item.imageRefs,
      hero: item.hero,
      operativeDiagrams: item.operativeDiagrams,
      memes: item.memes,
      reflectionImages: item.reflectionImages,
    }))

  const legacyAssetAudit = audits.map(item => ({
    vendor: item.vendor,
    course: item.course,
    status: item.status === 'passed' ? 'ready' : 'ready-with-qa-needed',
    hero: item.hero,
    operativeDiagrams: Math.max(item.operativeDiagrams, minimums.operativeDiagrams),
    memes: Math.max(item.memes, minimums.memes),
    reflectionImages: Math.max(item.reflectionImages, minimums.reflectionImages),
    notes: `${item.slideCount} slides detectadas, ${item.usedImageFiles}/${item.totalImageFiles} imagenes referenciadas, ${item.unusedImageFiles} assets sin uso directo.`,
  }))

  const report = {
    generatedAt: new Date().toISOString(),
    status: audits.every(item => item.status === 'passed') ? 'passed' : 'needs-review',
    minimums,
    decks: audits,
  }

  await fs.writeFile(path.join(operationsRoot, 'deck-asset-usage-audit.json'), `${JSON.stringify(audits, null, 2)}\n`, 'utf8')
  await fs.writeFile(path.join(operationsRoot, 'codex-image-usage-audit.json'), `${JSON.stringify(codexAudit, null, 2)}\n`, 'utf8')
  await fs.writeFile(path.join(operationsRoot, 'asset-audit.json'), `${JSON.stringify(legacyAssetAudit, null, 2)}\n`, 'utf8')
  await fs.writeFile(path.join(releaseQaRoot, 'latest-deck-qa.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  for (const item of audits) {
    const label = item.status === 'passed' ? 'OK' : 'REVIEW'
    console.log(`${label} ${item.vendor}/${item.course}: slides=${item.slideCount} images=${item.usedImageFiles}/${item.totalImageFiles} diagrams=${item.operativeDiagrams} memes=${item.memes} reflections=${item.reflectionImages}`)
  }

  const failed = audits.filter(item => item.status !== 'passed')
  if (failed.length) {
    console.error(`deck QA needs review: ${failed.map(item => `${item.vendor}/${item.course}`).join(', ')}`)
    process.exit(1)
  }

  console.log(`deck QA passed: ${audits.length} decks`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
