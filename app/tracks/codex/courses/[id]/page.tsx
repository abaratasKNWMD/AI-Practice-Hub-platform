import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, ExternalLink, FileText, MonitorPlay, Play } from 'lucide-react'
import { CourseOperatingLayer } from '@/components/hub/course-operating-layer'
import {
  byIds,
  getCodexCourse,
  getCodexExercises,
  getCodexMaterials,
} from '@/lib/content'

const courseThumbs: Record<string, string> = {
  'codex-orientation': '/decks/codex/curso-01/qa-visual/slide-001.png',
  'codex-basic': '/decks/codex/curso-01/qa-visual/curso1-mac-slide-001.png',
  'codex-potente': '/decks/codex/curso-02/qa-visual/curso2-mac-slide-001.png',
  'codex-ultra': '/decks/codex/curso-03/qa-visual/curso3-mac-slide-001.png',
  'codex-operating-model': '/decks/codex/curso-03/qa-visual/slide-066.png',
}

const creatorNotes: Record<string, string[]> = {
  'codex-orientation': [
    'Usa este modulo como puerta de entrada antes de cualquier workshop.',
    'No resuelvas dudas de Git en directo: envia al material y reserva la tutoria para criterio Codex.',
    'Insiste en permisos, coste y definicion de terminado desde el minuto uno.',
  ],
  'codex-basic': [
    'La clave es que el alumno cierre una tarea pequena con evidencia, no que vea una demo perfecta.',
    'Haz comparar prompt vago contra prompt de cuatro piezas.',
    'Si el grupo se atasca, vuelve al mapa de repo antes de editar.',
  ],
  'codex-potente': [
    'Este curso cambia de usar Codex a operar Codex.',
    'Pide que registren modelo, coste relativo, permisos y razon de escalado.',
    'La skill QA visual debe quedar reutilizable por el equipo.',
  ],
  'codex-ultra': [
    'No vendas swarms como teatro multiagente; vendelos como division de criterios.',
    'Cada automatizacion debe declarar limite de coste, salida estructurada y punto de revision humana.',
    'Usa PRs o repos realistas si el grupo ya es senior.',
  ],
  'codex-operating-model': [
    'Este modulo es para responsables: transforma cursos sueltos en sistema de adopcion.',
    'El objetivo es reducir demanda reactiva mediante autoconsumo, workshops y tutorias.',
    'Cierra con presupuesto, politica MCP y ritual de seguimiento.',
  ],
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-300">
      {children}
    </span>
  )
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [course, allExercises, allMaterials] = await Promise.all([
    getCodexCourse(id),
    getCodexExercises(),
    getCodexMaterials(),
  ])

  if (!course) notFound()

  const exercises = byIds(allExercises, course.exerciseIds)
  const materials = byIds(allMaterials, course.materialIds)
  const notes = creatorNotes[course.id] ?? []

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050505_0%,#111411_44%,#1b1711_100%)] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(16,185,129,0.18),transparent_30%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,40px_40px,40px_40px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-6">
          <Link
            href="/tracks/codex"
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
          >
            <ArrowLeft className="h-4 w-4" />
            Ruta Codex
          </Link>
        </header>

        <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="relative aspect-[16/7] min-h-72 overflow-hidden bg-zinc-950">
            <Image
              src={courseThumbs[course.id] ?? '/decks/codex/curso-01/qa-visual/slide-001.png'}
              alt={`Miniatura ${course.title}`}
              fill
              className="object-cover opacity-80"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),rgba(0,0,0,0.1)_55%)]" />
            <div className="absolute bottom-6 left-5 right-5 md:left-8 md:right-8">
              <div className="flex flex-wrap gap-2">
                <Pill>{course.code}</Pill>
                <Pill>{course.level}</Pill>
                <Pill>{course.duration}</Pill>
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{course.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{course.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {course.deckUrl ? (
                  <Link
                    href={course.deckUrl}
                    className="inline-flex min-h-9 items-center gap-2 rounded-md border border-emerald-300/60 bg-emerald-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-200"
                  >
                    <BookOpen className="h-4 w-4" />
                    Deck completo
                  </Link>
                ) : null}
                {course.videoSlugs[0] ? (
                  <Link
                    href={`/player/${course.videoSlugs[0]}`}
                    className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25"
                  >
                    <Play className="h-4 w-4" />
                    Primer video
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <ClipboardCheck className="h-5 w-5 text-emerald-200" />
              Resultados esperados
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              {course.outcomes.map(outcome => (
                <li key={outcome} className="rounded-md border border-white/10 bg-black/20 p-3">
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="h-5 w-5 text-amber-200" />
              Notas del creador
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              {notes.map(note => (
                <p key={note} className="rounded-md border border-white/10 bg-black/20 p-3">
                  {note}
                </p>
              ))}
            </div>
          </section>
        </div>

        <CourseOperatingLayer
          vendor="codex"
          course={course}
          exercises={exercises}
          materials={materials}
          accent="emerald"
        />

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <MonitorPlay className="h-6 w-6 text-cyan-200" />
            Microvideos
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {course.videoSlugs.map(slug => (
              <Link
                key={slug}
                href={`/player/${slug}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="font-mono text-sm text-zinc-200">{slug}</span>
                <Play className="h-4 w-4 text-emerald-200" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <ClipboardCheck className="h-6 w-6 text-emerald-200" />
            Ejercicios asociados
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map(exercise => (
              <Link
                key={exercise.id}
                href={`/tracks/codex/exercises/${exercise.id}`}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="flex flex-wrap gap-2">
                  <Pill>{exercise.durationMin} min</Pill>
                  <Pill>{exercise.difficulty}</Pill>
                  <Pill>{exercise.type}</Pill>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{exercise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{exercise.briefing}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-emerald-100">
                  Empezar
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <FileText className="h-6 w-6 text-amber-200" />
            Materiales
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
      </div>
    </main>
  )
}
