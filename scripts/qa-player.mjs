import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const coursesRoot = path.join(root, 'public', 'courses')
const outputPath = path.join(root, 'public', 'release-ops', 'qa', 'latest-player-qa.json')

const required60SceneTypes = [
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
]

const required30SceneTypes = [
  'prompt',
  'streaming',
  'terminal',
  'pr-review',
  'decision',
  'quiz',
  'risk',
]

function typeOfScene(scene) {
  return scene.type ?? scene.content?.mode ?? 'unknown'
}

function hasSubtitles(scene) {
  return Array.isArray(scene.subtitles) && scene.subtitles.length > 0
}

function hasVoice(scene) {
  return Array.isArray(scene.voiceover) && scene.voiceover.length > 0
}

function hasAction(scene) {
  const content = scene.content ?? {}
  return Boolean(content.actionLabel || content.actionDetail || content.presenterCue || content.prompt)
}

async function main() {
  const files = (await fs.readdir(coursesRoot)).filter(file => file.endsWith('.json')).sort()
  const reports = []

  for (const file of files) {
    const raw = await fs.readFile(path.join(coursesRoot, file), 'utf8')
    const course = JSON.parse(raw)
    const scenes = Array.isArray(course.scenes) ? course.scenes : []
    const types = [...new Set(scenes.map(typeOfScene))].sort()
    const durationMin = Math.round((course.durationMs ?? 0) / 60000)
    const isLong = durationMin >= 30
    const expectedScenes = durationMin >= 60 ? 48 : durationMin >= 30 ? 24 : 1
    const requiredTypes = durationMin >= 60 ? required60SceneTypes : durationMin >= 30 ? required30SceneTypes : []
    const missingTypes = isLong ? requiredTypes.filter(type => !types.includes(type)) : []
    const sceneGaps = scenes.filter(scene => typeof scene.startMs !== 'number' || typeof scene.endMs !== 'number' || scene.endMs <= scene.startMs)
    const subtitleMissing = scenes.filter(scene => !hasSubtitles(scene)).length
    const voiceMissing = scenes.filter(scene => !hasVoice(scene)).length
    const actionMissing = scenes.filter(scene => !hasAction(scene)).length
    const chapterIssues = Array.isArray(course.chapters) && course.chapters.length > 0 ? [] : ['missing chapters']

    reports.push({
      slug: course.id ?? file.replace(/\.json$/, ''),
      file,
      title: course.title,
      durationMs: course.durationMs ?? 0,
      durationMin,
      sceneCount: scenes.length,
      chapterCount: Array.isArray(course.chapters) ? course.chapters.length : 0,
      types,
      missingTypes,
      subtitleMissing,
      voiceMissing,
      actionMissing,
      sceneGaps: sceneGaps.map(scene => scene.id ?? scene.name ?? 'unknown'),
      chapterIssues,
      status: (
        scenes.length >= expectedScenes &&
        missingTypes.length === 0 &&
        sceneGaps.length === 0 &&
        subtitleMissing === 0 &&
        voiceMissing === 0 &&
        chapterIssues.length === 0
      ) ? 'passed' : 'needs-review',
    })
  }

  const longVideos = reports.filter(report => report.durationMin >= 30)
  const report = {
    generatedAt: new Date().toISOString(),
    status: longVideos.every(item => item.status === 'passed') ? 'passed' : 'needs-review',
    checkedVideos: reports.length,
    longVideos: longVideos.length,
    required60SceneTypes,
    required30SceneTypes,
    videos: reports,
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  for (const item of longVideos) {
    const label = item.status === 'passed' ? 'OK' : 'REVIEW'
    console.log(`${label} ${item.slug}: ${item.durationMin}m scenes=${item.sceneCount} chapters=${item.chapterCount} types=${item.types.length}`)
  }

  const failed = longVideos.filter(item => item.status !== 'passed')
  if (failed.length) {
    console.error(`player QA needs review: ${failed.map(item => item.slug).join(', ')}`)
    process.exit(1)
  }

  console.log(`player QA passed: ${longVideos.length} long videos`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
