import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  ExternalLink,
  FileText,
  Lightbulb,
  Play,
  ShieldCheck,
  Wallet,
  Wrench,
} from 'lucide-react'
import { ExerciseStatusWidget } from '@/components/hub/exercise-status-widget'
import { ExercisePackPanel } from '@/components/hub/exercise-pack-panel'
import { FeedbackWidget } from '@/components/hub/feedback-widget'
import {
  byIds,
  getCodexCourse,
  getCodexExercise,
  getCodexMaterials,
} from '@/lib/content'

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-7 items-center rounded-md border border-white/10 bg-black/20 px-2.5 text-xs text-zinc-300">
      {children}
    </span>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <Icon className="h-4 w-4 text-emerald-200" />
      <p className="mt-3 text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-5 text-zinc-100">{value}</p>
    </div>
  )
}

export default async function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [exercise, allMaterials] = await Promise.all([
    getCodexExercise(id),
    getCodexMaterials(),
  ])

  if (!exercise) notFound()

  const [course] = await Promise.all([getCodexCourse(exercise.courseId)])
  const materials = byIds(allMaterials, exercise.materialIds)

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050505_0%,#111411_44%,#1b1711_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_84%_4%,rgba(251,191,36,0.1),transparent_28%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/tracks/codex"
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
          >
            <ArrowLeft className="h-4 w-4" />
            Ruta Codex
          </Link>
          {course ? (
            <Link
              href={`/tracks/codex/courses/${course.id}`}
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
            >
              <BookOpen className="h-4 w-4" />
              {course.code} / {course.title}
            </Link>
          ) : null}
        </header>

        <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap gap-2">
            <Pill>{exercise.level}</Pill>
            <Pill>{exercise.type}</Pill>
            <Pill>{exercise.difficulty}</Pill>
            <Pill>{exercise.surface}</Pill>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{exercise.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">{exercise.briefing}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard icon={Clock} label="Duracion" value={`${exercise.durationMin} min`} />
            <InfoCard icon={Cpu} label="Modelo recomendado" value={exercise.recommendedModel} />
            <InfoCard icon={ShieldCheck} label="Permisos" value={exercise.permissionMode} />
            <InfoCard icon={Wallet} label="Coste estimado" value={exercise.estimatedCost} />
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {exercise.videoSlug ? (
              <Link
                href={`/player/${exercise.videoSlug}`}
                className="inline-flex min-h-9 items-center gap-2 rounded-md border border-emerald-300/60 bg-emerald-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-200"
              >
                <Play className="h-4 w-4" />
                Ver microvideo
              </Link>
            ) : null}
            {materials[0] ? (
              <Link
                href={materials[0].href}
                className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
              >
                <FileText className="h-4 w-4" />
                Abrir material base
              </Link>
            ) : null}
          </div>
        </section>

        <ExerciseStatusWidget exerciseId={exercise.id} />
        <ExercisePackPanel vendor="codex" exerciseId={exercise.id} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Wrench className="h-5 w-5 text-emerald-200" />
              Tareas
            </h2>
            <ol className="mt-4 space-y-3">
              {exercise.tasks.map((task, index) => (
                <li key={task} className="grid grid-cols-[2rem_1fr] gap-3 rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-zinc-300">
                  <span className="font-mono text-emerald-200">{String(index + 1).padStart(2, '0')}</span>
                  <span>{task}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Lightbulb className="h-5 w-5 text-amber-200" />
              Pistas
            </h2>
            <div className="mt-4 space-y-3">
              {exercise.hints.map(hint => (
                <p key={hint} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-zinc-300">
                  {hint}
                </p>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-emerald-300/20 bg-emerald-300/[0.055] p-5 backdrop-blur-xl">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <CheckCircle2 className="h-5 w-5 text-emerald-200" />
            Solucion esperada
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-200">{exercise.solution}</p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <FileText className="h-6 w-6 text-cyan-200" />
            Materiales del ejercicio
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {materials.map(material => (
              <Link
                key={material.id}
                href={material.href}
                className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span>
                  <span className="text-sm font-semibold text-zinc-100">{material.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-zinc-400">{material.summary}</span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500" />
              </Link>
            ))}
          </div>
        </section>

        <FeedbackWidget kind="exercise" vendor="codex" targetId={exercise.id} />
      </div>
    </main>
  )
}
