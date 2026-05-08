import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, ExternalLink, FileText, MonitorPlay, Play } from 'lucide-react'
import { CourseOperatingLayer } from '@/components/hub/course-operating-layer'
import { byIds, getClaudeCourse, getClaudeExercises, getClaudeMaterials } from '@/lib/content'

const creatorNotes: Record<string, string[]> = {
  'claude-orientation': [
    'Abrir con una comparacion clara: prompt gigante frente a memoria versionada.',
    'Insistir en que /usage y /context son habitos de higiene, no comandos avanzados.',
    'Este modulo debe dejar al alumno preparado para no preguntar lo mismo en tutoria.'
  ],
  'claude-basic': [
    'El objetivo no es escribir el CLAUDE.md perfecto: es escribir uno que se use.',
    'Mostrar como una regla vaga se convierte en regla verificable.',
    'Cerrar siempre con handoff y evidencia de verificacion.'
  ],
  'claude-operator': [
    'Skills y subagentes deben nacer de repeticion real, no de ganas de complicar.',
    'Explorer read-only con Haiku es un buen ejemplo de ahorro de contexto.',
    'MCP se enseña como inventario de riesgo antes de enseñarlo como superpoder.'
  ],
  'claude-advanced-automation': [
    'Los hooks son deterministicos: bloquean, auditan o recuerdan. No sustituyen criterio.',
    'Plugins sirven para distribuir practica de equipo con version y owner.',
    'GitHub Actions debe explicarse con permisos minimos y responsabilidad humana.'
  ],
  'claude-agent-sdk-enterprise': [
    'El SDK se explica como producto interno evaluable, no como otra manera de llamar al modelo.',
    'Contrato JSON y evals son la diferencia entre demo y piloto.',
    'Terminar con go/no-go: calidad, coste, riesgo y owner.'
  ]
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-300">{children}</span>
}

export default async function ClaudeCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [course, allExercises, allMaterials] = await Promise.all([
    getClaudeCourse(id),
    getClaudeExercises(),
    getClaudeMaterials(),
  ])

  if (!course) notFound()

  const exercises = byIds(allExercises, course.exerciseIds)
  const materials = byIds(allMaterials, course.materialIds)
  const notes = creatorNotes[course.id] ?? []

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050505_0%,#15110f_44%,#10151a_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(251,113,133,0.18),transparent_30%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-6">
          <Link href="/tracks/claude" className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
            <ArrowLeft className="h-4 w-4" />
            Ruta Claude
          </Link>
        </header>

        <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap gap-2">
            <Pill>{course.code}</Pill>
            <Pill>{course.level}</Pill>
            <Pill>{course.duration}</Pill>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{course.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">{course.summary}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {course.deckUrl ? (
              <Link href={course.deckUrl} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-rose-300/60 bg-rose-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-rose-200">
                <BookOpen className="h-4 w-4" />
                Deck fuente
              </Link>
            ) : null}
            {course.videoSlugs[0] ? (
              <Link href={`/player/${course.videoSlugs[0]}`} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
                <Play className="h-4 w-4" />
                Primer video
              </Link>
            ) : null}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><ClipboardCheck className="h-5 w-5 text-rose-200" />Resultados esperados</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              {course.outcomes.map(outcome => <li key={outcome} className="rounded-md border border-white/10 bg-black/20 p-3">{outcome}</li>)}
            </ul>
          </section>
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><FileText className="h-5 w-5 text-amber-200" />Notas del creador</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              {notes.map(note => <p key={note} className="rounded-md border border-white/10 bg-black/20 p-3">{note}</p>)}
            </div>
          </section>
        </div>

        <CourseOperatingLayer
          vendor="claude"
          course={course}
          exercises={exercises}
          materials={materials}
          accent="rose"
        />

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><MonitorPlay className="h-6 w-6 text-cyan-200" />Microvideos</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {course.videoSlugs.map(slug => (
              <Link key={slug} href={`/player/${slug}`} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
                <span className="font-mono text-sm text-zinc-200">{slug}</span>
                <Play className="h-4 w-4 text-rose-200" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><ClipboardCheck className="h-6 w-6 text-rose-200" />Ejercicios asociados</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map(exercise => (
              <Link key={exercise.id} href={`/tracks/claude/exercises/${exercise.id}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
                <div className="flex flex-wrap gap-2"><Pill>{exercise.durationMin} min</Pill><Pill>{exercise.difficulty}</Pill><Pill>{exercise.type}</Pill></div>
                <h3 className="mt-4 text-lg font-semibold">{exercise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{exercise.briefing}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-rose-100">Empezar<ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><FileText className="h-6 w-6 text-amber-200" />Materiales</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {materials.map(material => (
              <Link key={material.id} href={material.href} className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
                <span><span className="text-sm font-semibold text-zinc-100">{material.title}</span><span className="mt-1 block text-xs leading-5 text-zinc-400">{material.summary}</span></span>
                <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
