import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, FileText, MonitorPlay, Play, Users, Workflow } from 'lucide-react'
import { FeedbackWidget } from '@/components/hub/feedback-widget'
import { byIds, getClaudeExercises, getClaudeWorkshop } from '@/lib/content'

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-7 items-center rounded-md border border-white/10 bg-black/20 px-2.5 text-xs text-zinc-300">{children}</span>
}

export default async function ClaudeWorkshopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [workshop, allExercises] = await Promise.all([
    getClaudeWorkshop(id),
    getClaudeExercises(),
  ])

  if (!workshop) notFound()

  const exercises = byIds(allExercises, workshop.challengeIds)

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050505_0%,#15110f_44%,#10151a_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(251,113,133,0.16),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-6">
          <Link href="/tracks/claude" className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
            <ArrowLeft className="h-4 w-4" />
            Ruta Claude
          </Link>
        </header>

        <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap gap-2"><Pill>{workshop.duration}</Pill><Pill>{workshop.challengeIds.length} retos</Pill><Pill>{workshop.videoSlugs.length} videos</Pill></div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{workshop.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">{workshop.audience}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {workshop.videoSlugs[0] ? (
              <Link href={`/player/${workshop.videoSlugs[0]}`} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-rose-300/60 bg-rose-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-rose-200">
                <Play className="h-4 w-4" />
                Abrir primer video
              </Link>
            ) : null}
            {exercises[0] ? (
              <Link href={`/tracks/claude/exercises/${exercises[0].id}`} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
                <Workflow className="h-4 w-4" />
                Empezar primer reto
              </Link>
            ) : null}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Users className="h-5 w-5 text-rose-200" />Notas para facilitar</h2>
            <div className="mt-4 space-y-3">
              {workshop.facilitatorNotes.map(note => <p key={note} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-zinc-300">{note}</p>)}
            </div>
          </section>
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><CheckCircle2 className="h-5 w-5 text-cyan-200" />Outputs esperados</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {workshop.outputs.map(output => <p key={output} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-zinc-300">{output}</p>)}
            </div>
          </section>
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><MonitorPlay className="h-6 w-6 text-cyan-200" />Videos del workshop</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {workshop.videoSlugs.map(slug => (
              <Link key={slug} href={`/player/${slug}`} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
                <span className="font-mono text-sm text-zinc-200">{slug}</span>
                <Play className="h-4 w-4 text-rose-200" />
              </Link>
            ))}
          </div>
        </section>

        {workshop.instructorPackHref ? (
          <section className="mt-10 space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold"><FileText className="h-6 w-6 text-rose-200" />Pack instructor</h2>
            <div className="grid gap-3 md:grid-cols-4">
              {[
                ['Pack', workshop.instructorPackHref],
                ['Guion minuto a minuto', workshop.minuteGuideHref],
                ['Demo simulada', workshop.demoHref],
                ['Prompts', workshop.promptsHref],
              ].filter((item): item is [string, string] => Boolean(item[1])).map(([label, href]) => (
                <Link key={href} href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.06]">
                  {label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><FileText className="h-6 w-6 text-amber-200" />Retos del workshop</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map(exercise => (
              <Link key={exercise.id} href={`/tracks/claude/exercises/${exercise.id}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
                <div className="flex flex-wrap gap-2"><Pill>{exercise.level}</Pill><Pill>{exercise.difficulty}</Pill><Pill><Clock className="mr-1.5 h-3.5 w-3.5 text-rose-200" />{exercise.durationMin} min</Pill></div>
                <h3 className="mt-4 text-lg font-semibold">{exercise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{exercise.briefing}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-rose-100">Abrir reto<ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>

        <FeedbackWidget kind="workshop" vendor="claude" targetId={workshop.id} />
      </div>
    </main>
  )
}
