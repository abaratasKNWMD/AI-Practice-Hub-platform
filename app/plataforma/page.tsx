import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { PlatformOsClient } from '@/components/hub/platform-os-client'
import {
  getClaudeCourses,
  getClaudeExercises,
  getClaudeWorkshops,
  getCodexCourses,
  getCodexExercises,
  getCodexWorkshops,
  getCopilotCourses,
  getCopilotExercises,
  getCopilotWorkshops,
  getTracks,
} from '@/lib/content'
import { getLearningOs } from '@/lib/platform-content'

export default async function PlataformaPage() {
  const [
    learningOs,
    tracks,
    codexCourses,
    codexExercises,
    codexWorkshops,
    copilotCourses,
    copilotExercises,
    copilotWorkshops,
    claudeCourses,
    claudeExercises,
    claudeWorkshops,
  ] = await Promise.all([
    getLearningOs(),
    getTracks(),
    getCodexCourses(),
    getCodexExercises(),
    getCodexWorkshops(),
    getCopilotCourses(),
    getCopilotExercises(),
    getCopilotWorkshops(),
    getClaudeCourses(),
    getClaudeExercises(),
    getClaudeWorkshops(),
  ])

  const courses = [
    ...codexCourses.map(item => ({ vendor: 'codex' as const, item })),
    ...copilotCourses.map(item => ({ vendor: 'copilot' as const, item })),
    ...claudeCourses.map(item => ({ vendor: 'claude' as const, item })),
  ]
  const exercises = [
    ...codexExercises.map(item => ({ vendor: 'codex' as const, item })),
    ...copilotExercises.map(item => ({ vendor: 'copilot' as const, item })),
    ...claudeExercises.map(item => ({ vendor: 'claude' as const, item })),
  ]
  const workshops = [
    ...codexWorkshops.map(item => ({ vendor: 'codex' as const, item })),
    ...copilotWorkshops.map(item => ({ vendor: 'copilot' as const, item })),
    ...claudeWorkshops.map(item => ({ vendor: 'claude' as const, item })),
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#050505_0%,#111411_44%,#151019_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
          >
            <ArrowLeft className="h-4 w-4" />
            Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-300/30 bg-emerald-300/10">
              <Sparkles className="h-4 w-4 text-emerald-200" />
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-zinc-50">AI Practice Hub</p>
              <p className="text-xs text-zinc-500">Learning OS v1</p>
            </div>
          </div>
        </header>

        <PlatformOsClient
          learningOs={learningOs}
          tracks={tracks}
          courses={courses}
          exercises={exercises}
          workshops={workshops}
        />
      </div>
    </main>
  )
}
