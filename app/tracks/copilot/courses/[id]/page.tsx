import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, ExternalLink, FileText, MonitorPlay, Play } from 'lucide-react'
import { CourseOperatingLayer } from '@/components/hub/course-operating-layer'
import { byIds, getCopilotCourse, getCopilotExercises, getCopilotMaterials } from '@/lib/content'

const creatorNotes: Record<string, string[]> = {
  'copilot-git-survival': [
    'Este modulo debe consumirse antes del workshop para evitar perder tutoria explicando Git basico.',
    'Insiste en que PR y diff son lenguaje de colaboracion con humanos y agentes.',
    'No busques Git perfecto: busca autonomia minima.'
  ],
  'copilot-basic': [
    'Mostrar una completion mala y una buena ayuda mas que veinte slides.',
    'Ask, Edit y Agent deben quedar como decisiones de riesgo, no como botones decorativos.',
    'Cierra cada demo con diff y verificacion.'
  ],
  'copilot-medium': [
    'Separar copilot-instructions, instruction files y prompt files es la idea central.',
    'Haz que el grupo pode instrucciones largas: menos ruido, mas precision.',
    'El output debe ser un pack .github reutilizable.'
  ],
  'copilot-advanced': [
    'Agent mode no es la solucion por defecto; solo para tareas con alcance y done claros.',
    'Cada custom agent debe declarar herramientas y frontera.',
    'MCP se ensena readonly primero, con inventario de riesgo.'
  ],
  'copilot-cloud-enterprise': [
    'Cloud agent depende de plan, politica y disponibilidad: dilo siempre.',
    'La PR generada por IA nunca elimina la responsabilidad humana.',
    'Coste = premium requests + posibles Actions minutes + reintentos.'
  ]
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-300">{children}</span>
}

export default async function CopilotCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [course, allExercises, allMaterials] = await Promise.all([
    getCopilotCourse(id),
    getCopilotExercises(),
    getCopilotMaterials(),
  ])

  if (!course) notFound()

  const exercises = byIds(allExercises, course.exerciseIds)
  const materials = byIds(allMaterials, course.materialIds)
  const notes = creatorNotes[course.id] ?? []

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050505_0%,#10131a_44%,#14170f_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(56,189,248,0.18),transparent_30%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-6">
          <Link href="/tracks/copilot" className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
            <ArrowLeft className="h-4 w-4" />
            Ruta Copilot
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
              <Link href={course.deckUrl} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-sky-300/60 bg-sky-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-sky-200">
                <BookOpen className="h-4 w-4" />
                Deck completo
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
            <h2 className="flex items-center gap-2 text-lg font-semibold"><ClipboardCheck className="h-5 w-5 text-sky-200" />Resultados esperados</h2>
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
          vendor="copilot"
          course={course}
          exercises={exercises}
          materials={materials}
          accent="sky"
        />

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><MonitorPlay className="h-6 w-6 text-cyan-200" />Microvideos</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {course.videoSlugs.map(slug => (
              <Link key={slug} href={`/player/${slug}`} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
                <span className="font-mono text-sm text-zinc-200">{slug}</span>
                <Play className="h-4 w-4 text-sky-200" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><ClipboardCheck className="h-6 w-6 text-sky-200" />Ejercicios asociados</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map(exercise => (
              <Link key={exercise.id} href={`/tracks/copilot/exercises/${exercise.id}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/25 hover:bg-white/[0.06]">
                <div className="flex flex-wrap gap-2"><Pill>{exercise.durationMin} min</Pill><Pill>{exercise.difficulty}</Pill><Pill>{exercise.type}</Pill></div>
                <h3 className="mt-4 text-lg font-semibold">{exercise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{exercise.briefing}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-100">Empezar<ArrowRight className="h-4 w-4" /></span>
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
