import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const baseUrl = (process.env.BASE_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const outputPath = path.join(root, 'public', 'release-ops', 'latest-smoke.json')

const routeTargets = [
  '/',
  '/operaciones',
  '/plataforma',
  '/tracks/codex',
  '/tracks/copilot',
  '/tracks/claude',
  '/tracks/codex/courses/codex-basic',
  '/tracks/copilot/courses/copilot-basic',
  '/tracks/claude/courses/claude-basic',
  '/tracks/codex/exercises/cx-b04-bug-login',
  '/tracks/copilot/exercises/cp-b06-error-to-fix',
  '/tracks/claude/exercises/cl-a01-hook-block-secrets',
  '/tracks/codex/workshops/codex-workshop-1h-first-task-to-pr',
  '/tracks/copilot/workshops/copilot-workshop-1h-vscode-to-pr-review',
  '/tracks/claude/workshops/claude-workshop-1h-memory-to-automation',
  '/player/cx-workshop-60m-first-task-to-pr',
  '/player/cp-workshop-60m-vscode-to-pr-review',
  '/player/cl-workshop-60m-memory-to-automation',
  '/player/hub-workshop-60m-vendor-selection',
  '/workshop-packs/codex/cx-workshop-60m-first-task-to-pr/README.md',
  '/workshop-packs/copilot/cp-workshop-60m-vscode-to-pr-review/README.md',
  '/workshop-packs/claude/cl-workshop-60m-memory-to-automation/README.md',
  '/workshop-packs/platform/hub-workshop-60m-vendor-selection/README.md',
  '/release-ops/checklists/release-checklist.md',
  '/release-ops/feedback/feedback-loop.md',
  '/release-ops/metrics/usage-metrics.md',
  '/release-ops/qa/visual-qa-plan.md',
  '/release-ops/versioning.md',
  '/content/operations/content-versions.json',
  '/content/operations/ownership.json',
  '/content/operations/freshness-checklist.json',
  '/content/operations/quarterly-review.json',
  '/content/operations/usage-measurement.json',
  '/exercise-packs/starters/transversal-starter/README.md'
]

const courseTargets = [
  ['cx-workshop-30m-first-real-task', 1800000, 24],
  ['cp-workshop-30m-error-to-pr', 1800000, 24],
  ['cl-workshop-30m-memory-to-hook', 1800000, 24],
  ['cx-workshop-60m-first-task-to-pr', 3600000, 48],
  ['cp-workshop-60m-vscode-to-pr-review', 3600000, 48],
  ['cl-workshop-60m-memory-to-automation', 3600000, 48],
  ['hub-workshop-60m-vendor-selection', 3600000, 48]
]

async function checkUrl(targetPath) {
  const startedAt = Date.now()
  try {
    const response = await fetch(`${baseUrl}${targetPath}`)
    const text = await response.text()
    return {
      target: targetPath,
      status: response.status,
      ok: response.ok,
      bytes: text.length,
      ms: Date.now() - startedAt
    }
  } catch (error) {
    return {
      target: targetPath,
      status: 0,
      ok: false,
      bytes: 0,
      ms: Date.now() - startedAt,
      error: error.message
    }
  }
}

async function checkCourse(slug, expectedDurationMs, expectedScenes) {
  const targetPath = `/api/courses/${slug}`
  const result = await checkUrl(targetPath)
  if (!result.ok) return { ...result, slug, expectedDurationMs, expectedScenes, durationMs: 0, scenes: 0 }

  const response = await fetch(`${baseUrl}${targetPath}`)
  const json = await response.json()
  return {
    ...result,
    slug,
    expectedDurationMs,
    expectedScenes,
    durationMs: json.durationMs,
    scenes: Array.isArray(json.scenes) ? json.scenes.length : 0,
    ok: result.ok && json.durationMs === expectedDurationMs && Array.isArray(json.scenes) && json.scenes.length >= expectedScenes
  }
}

async function main() {
  const routeResults = []
  for (const target of routeTargets) {
    routeResults.push(await checkUrl(target))
  }

  const courseResults = []
  for (const [slug, durationMs, expectedScenes] of courseTargets) {
    courseResults.push(await checkCourse(slug, durationMs, expectedScenes))
  }

  const allResults = [...routeResults, ...courseResults]
  const failed = allResults.filter(result => !result.ok)
  const report = {
    baseUrl,
    generatedAt: new Date().toISOString(),
    status: failed.length ? 'failed' : 'passed',
    routeResults,
    courseResults
  }

  await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  for (const result of allResults) {
    const label = result.ok ? 'OK' : 'FAIL'
    console.log(`${label} ${result.status} ${result.target} ${result.ms}ms`)
  }

  if (failed.length) {
    console.error(`release smoke failed: ${failed.length} target(s) failed`)
    process.exit(1)
  }

  console.log(`release smoke passed: ${allResults.length} checks`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
