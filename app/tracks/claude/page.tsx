import Link from 'next/link'
import { ArrowLeft, Brain } from 'lucide-react'
import { ClaudeTrackClient } from '@/components/hub/claude-track-client'
import { getClaudeCourses, getClaudeExercises, getClaudeMaterials, getClaudeWorkshops } from '@/lib/content'

export default async function ClaudeTrackPage() {
  const [courses, exercises, workshops, materials] = await Promise.all([
    getClaudeCourses(),
    getClaudeExercises(),
    getClaudeWorkshops(),
    getClaudeMaterials(),
  ])

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#050505_0%,#15110f_44%,#10151a_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(251,113,133,0.18),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(34,211,238,0.11),transparent_28%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
            <ArrowLeft className="h-4 w-4" />
            Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-rose-300/30 bg-rose-300/10">
              <Brain className="h-4 w-4 text-rose-200" />
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-zinc-50">Claude Code Practice</p>
              <p className="text-xs text-zinc-500">AI Practice Hub v1</p>
            </div>
          </div>
        </header>

        <ClaudeTrackClient courses={courses} exercises={exercises} workshops={workshops} materials={materials} />
      </div>
    </main>
  )
}

