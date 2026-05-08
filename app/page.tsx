import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, FileText, GraduationCap, MonitorPlay, Sparkles, Wrench } from 'lucide-react'
import {
  getClaudeCourses,
  getClaudeExercises,
  getClaudeMaterials,
  getClaudeWorkshops,
  getCodexCourses,
  getCodexExercises,
  getCodexMaterials,
  getCodexWorkshops,
  getCopilotCourses,
  getCopilotExercises,
  getCopilotMaterials,
  getCopilotWorkshops,
  getTracks,
} from '@/lib/content'

function TrackCard({
  title,
  vendor,
  summary,
  href,
  status,
  metrics,
}: {
  title: string
  vendor: string
  summary: string
  href: string
  status: 'active' | 'soon'
  metrics: Array<{ label: string; value: string }>
}) {
  const body = (
    <article className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.065]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">{vendor}</p>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-50">{title}</h3>
        </div>
        <span className={`rounded-md border px-2 py-1 text-xs ${status === 'active' ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100' : 'border-white/10 bg-black/20 text-zinc-400'}`}>
          {status === 'active' ? 'activo' : 'proximamente'}
        </span>
      </div>
      <p className="mt-4 min-h-24 text-sm leading-6 text-zinc-400">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {metrics.map(metric => (
          <span key={metric.label} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-zinc-300">
            <strong className="text-zinc-50">{metric.value}</strong> {metric.label}
          </span>
        ))}
      </div>
      <div className="mt-6 flex min-h-9 items-center text-sm font-semibold text-emerald-100">
        {status === 'active' ? (
          <>
            Abrir ruta
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          'Ruta visible en roadmap'
        )}
      </div>
    </article>
  )

  if (status === 'active') {
    return <Link href={href}>{body}</Link>
  }

  return <div aria-disabled="true">{body}</div>
}

export default async function Home() {
  const [
    tracks,
    codexCourses,
    codexExercises,
    codexWorkshops,
    codexMaterials,
    copilotCourses,
    copilotExercises,
    copilotWorkshops,
    copilotMaterials,
    claudeCourses,
    claudeExercises,
    claudeWorkshops,
    claudeMaterials,
  ] = await Promise.all([
    getTracks(),
    getCodexCourses(),
    getCodexExercises(),
    getCodexWorkshops(),
    getCodexMaterials(),
    getCopilotCourses(),
    getCopilotExercises(),
    getCopilotWorkshops(),
    getCopilotMaterials(),
    getClaudeCourses(),
    getClaudeExercises(),
    getClaudeWorkshops(),
    getClaudeMaterials(),
  ])
  const courses = [...codexCourses, ...copilotCourses, ...claudeCourses]
  const exercises = [...codexExercises, ...copilotExercises, ...claudeExercises]
  const workshops = [
    ...codexWorkshops.map(workshop => ({ ...workshop, vendor: 'codex' })),
    ...copilotWorkshops.map(workshop => ({ ...workshop, vendor: 'copilot' })),
    ...claudeWorkshops.map(workshop => ({ ...workshop, vendor: 'claude' })),
  ]
  const materials = [...codexMaterials, ...copilotMaterials, ...claudeMaterials]
  const videoCount = courses.reduce((total, course) => total + course.videoSlugs.length, 0)

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#050505_0%,#111411_44%,#1b1711_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-6 md:px-8 md:py-10">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-300/30 bg-emerald-300/10">
              <Sparkles className="h-4 w-4 text-emerald-200" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-50">AI Practice Hub</p>
              <p className="text-xs text-zinc-500">Codex + Copilot + Claude build</p>
            </div>
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/tracks/codex"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
            >
              Codex
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tracks/copilot"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-sky-300/30 bg-sky-300/10 px-3 text-xs font-semibold text-sky-100 transition hover:border-sky-300/50"
            >
              Copilot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tracks/claude"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-rose-300/30 bg-rose-300/10 px-3 text-xs font-semibold text-rose-100 transition hover:border-rose-300/50"
            >
              Claude
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/operaciones"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-amber-300/30 bg-amber-300/10 px-3 text-xs font-semibold text-amber-100 transition hover:border-amber-300/50"
            >
              Sprints
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/plataforma"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/50"
            >
              Learner OS
              <GraduationCap className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-stretch">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-emerald-300/35 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
                plataforma principal
              </span>
              <span className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100">
                videos CourseScript
              </span>
              <span className="rounded-md border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 text-xs font-medium text-amber-100">
                ejercicios autoconsumibles
              </span>
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Cursos practicos de IA para dejar de explicar lo mismo cada semana.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">
              Hub operativo con rutas Codex, Copilot y Claude, decks existentes, labs, materiales,
              workshops, videos simulados, notas para impartir y conciencia de coste/modelo/permisos.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {[
                [BookOpen, `${courses.length}`, 'cursos'],
                [Wrench, `${exercises.length}`, 'ejercicios'],
                [MonitorPlay, `${videoCount}`, 'videos'],
                [FileText, `${materials.length}`, 'materiales'],
              ].map(([Icon, value, label]) => {
                const RealIcon = Icon as typeof BookOpen
                return (
                  <div key={label as string} className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <RealIcon className="h-4 w-4 text-emerald-200" />
                    <p className="mt-3 text-2xl font-semibold">{value as string}</p>
                    <p className="text-xs text-zinc-500">{label as string}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <span className="text-xs font-mono text-zinc-500">codex.practice.local</span>
            </div>
            <div className="relative aspect-[16/11]">
              <Image
                src="/decks/codex/curso-02/qa-visual/curso2-mac-slide-058.png"
                alt="Vista de curso Codex"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.04)_45%)]" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">Codex potente</p>
                <p className="mt-2 max-w-xl text-2xl font-semibold text-white">Modelos, MCPs, skills, subagentes y coste en una ruta guiada.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">Vendors</p>
              <h2 className="mt-2 text-2xl font-semibold">Rutas de plataforma</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-400">
              <Clock className="h-4 w-4 text-amber-200" />
              Codex, Copilot y Claude implementados en primera iteracion.
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {tracks.map(track => (
              <TrackCard key={track.id} {...track} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {workshops.map(workshop => (
            <Link
              key={workshop.id}
              href={`/tracks/${workshop.vendor}/workshops/${workshop.id}`}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/25 hover:bg-white/[0.065]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200">{workshop.duration}</p>
              <h3 className="mt-3 text-lg font-semibold text-zinc-50">{workshop.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{workshop.audience}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
