'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Clock,
  Cpu,
  ExternalLink,
  FileText,
  Layers,
  MonitorPlay,
  Play,
  Search,
  ShieldCheck,
  Wallet,
  Workflow,
  Wrench,
} from 'lucide-react'
import type { CourseMeta, ExerciseMeta, MaterialMeta, WorkshopMeta } from '@/lib/content-schema'

interface CodexTrackClientProps {
  courses: CourseMeta[]
  exercises: ExerciseMeta[]
  workshops: WorkshopMeta[]
  materials: MaterialMeta[]
}

const LEVELS = ['all', 'orientation', 'basic', 'medium', 'advanced', 'ultra', 'enterprise'] as const
const TYPES = ['all', 'lab', 'template', 'review', 'automation', 'capstone'] as const
const DIFFICULTIES = ['all', 'starter', 'practice', 'pro', 'enterprise'] as const
const COSTS = ['all', 'bajo', 'medio', 'alto'] as const

const levelLabel: Record<string, string> = {
  all: 'Todos',
  orientation: 'Orientation',
  basic: 'Basic',
  medium: 'Medium',
  advanced: 'Advanced',
  ultra: 'Ultra',
  enterprise: 'Enterprise',
}

const typeLabel: Record<string, string> = {
  all: 'Todos',
  lab: 'Labs',
  template: 'Plantillas',
  review: 'Review',
  automation: 'Automatizacion',
  capstone: 'Capstone',
}

const difficultyLabel: Record<string, string> = {
  all: 'Todas',
  starter: 'Starter',
  practice: 'Practice',
  pro: 'Pro',
  enterprise: 'Enterprise',
}

const courseThumbs: Record<string, string> = {
  'codex-orientation': '/decks/codex/curso-01/qa-visual/slide-001.png',
  'codex-basic': '/decks/codex/curso-01/qa-visual/curso1-mac-slide-001.png',
  'codex-potente': '/decks/codex/curso-02/qa-visual/curso2-mac-slide-001.png',
  'codex-ultra': '/decks/codex/curso-03/qa-visual/curso3-mac-slide-001.png',
  'codex-operating-model': '/decks/codex/curso-03/qa-visual/slide-066.png',
}

function costBand(exercise: ExerciseMeta) {
  const text = exercise.estimatedCost.toLowerCase()
  if (text.includes('alto')) return 'alto'
  if (text.includes('medio')) return 'medio'
  return 'bajo'
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-md border px-3 text-xs font-medium transition ${
        active
          ? 'border-emerald-300/50 bg-emerald-300/15 text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.12)]'
          : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-zinc-100'
      }`}
    >
      {children}
    </button>
  )
}

function MetaPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-md border border-white/10 bg-black/20 px-2.5 text-[11px] text-zinc-300">
      <Icon className="h-3.5 w-3.5 text-emerald-200" />
      {label}
    </span>
  )
}

function ActionLink({
  href,
  children,
  primary,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-md border px-3 text-xs font-semibold transition ${
        primary
          ? 'border-emerald-300/60 bg-emerald-300 text-zinc-950 hover:bg-emerald-200'
          : 'border-white/10 bg-white/[0.04] text-zinc-100 hover:border-white/25 hover:bg-white/[0.08]'
      }`}
    >
      {children}
    </Link>
  )
}

export function CodexTrackClient({ courses, exercises, workshops, materials }: CodexTrackClientProps) {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('all')
  const [type, setType] = useState<(typeof TYPES)[number]>('all')
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>('all')
  const [cost, setCost] = useState<(typeof COSTS)[number]>('all')
  const [surface, setSurface] = useState('all')

  const courseById = useMemo(() => new Map(courses.map(course => [course.id, course])), [courses])
  const surfaces = useMemo(() => ['all', ...Array.from(new Set(exercises.map(exercise => exercise.surface)))], [exercises])
  const videoCount = useMemo(() => courses.reduce((total, course) => total + course.videoSlugs.length, 0), [courses])

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesLevel = level === 'all' || exercise.level === level
      const matchesType = type === 'all' || exercise.type === type
      const matchesDifficulty = difficulty === 'all' || exercise.difficulty === difficulty
      const matchesSurface = surface === 'all' || exercise.surface === surface
      const matchesCost = cost === 'all' || costBand(exercise) === cost
      return matchesLevel && matchesType && matchesDifficulty && matchesSurface && matchesCost
    })
  }, [cost, difficulty, exercises, level, surface, type])

  return (
    <div className="space-y-14">
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <MetaPill icon={BookOpen} label={`${courses.length} cursos`} />
            <MetaPill icon={Wrench} label={`${exercises.length} ejercicios`} />
            <MetaPill icon={MonitorPlay} label={`${videoCount} videos`} />
            <MetaPill icon={Wallet} label="coste visible" />
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
            Codex Practice Hub
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
            Ruta completa para convertir Codex en una plataforma de trabajo: cursos, decks, ejercicios,
            microvideos simulados, materiales, skills, MCPs, swarms y gobierno de coste.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <ActionLink href="#ejercicios" primary>
              <Search className="h-4 w-4" />
              Explorar ejercicios
            </ActionLink>
            <ActionLink href="/player/cx-masterclass-10m-codex-operating-system">
              <Play className="h-4 w-4" />
              Ver masterclass 10m
            </ActionLink>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Operating model</p>
          <div className="mt-5 space-y-4">
            {[
              ['Flipping training', 'El alumno consume video, deck y lab antes de la tutoria.'],
              ['Tutoria con criterio', 'Las sesiones se reservan para dudas reales, decisiones y desbloqueos.'],
              ['Practica medible', 'Cada ejercicio declara modelo, permisos, coste y evidencia esperada.'],
              ['Escalado enterprise', 'Skills, MCPs, swarms, CI y RAG entran cuando el equipo ya tiene base.'],
            ].map(([title, body], index) => (
              <div key={title} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-sm font-mono text-emerald-200">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cursos" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">Ruta Codex</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Cursos autoconsumibles</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Cada curso enlaza deck, microvideos, labs, plantillas y notas de imparticion.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map(course => (
            <article
              key={course.id}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-xl shadow-black/10 backdrop-blur-xl"
            >
              <div className="relative aspect-[16/8] overflow-hidden bg-zinc-900">
                <Image
                  src={courseThumbs[course.id] ?? '/decks/codex/curso-01/qa-visual/slide-001.png'}
                  alt={`Miniatura ${course.title}`}
                  fill
                  className="object-cover opacity-85"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={course.id === 'codex-orientation'}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.74),rgba(0,0,0,0.08))]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <span className="rounded-md border border-white/15 bg-black/40 px-2 py-1 text-xs font-mono text-emerald-100 backdrop-blur">
                      {course.code} / {levelLabel[course.level]}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{course.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-md border border-white/15 bg-black/40 px-2 py-1 text-xs text-zinc-200 backdrop-blur">
                    {course.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-sm leading-6 text-zinc-300">{course.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <MetaPill icon={MonitorPlay} label={`${course.videoSlugs.length} videos`} />
                  <MetaPill icon={ClipboardCheck} label={`${course.exerciseIds.length} labs`} />
                  <MetaPill icon={FileText} label={`${course.materialIds.length} materiales`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <ActionLink href={`/tracks/codex/courses/${course.id}`} primary>
                    Abrir curso
                    <ArrowRight className="h-4 w-4" />
                  </ActionLink>
                  {course.deckUrl ? (
                    <ActionLink href={course.deckUrl}>
                      Deck completo
                      <ExternalLink className="h-4 w-4" />
                    </ActionLink>
                  ) : null}
                  {course.videoSlugs[0] ? (
                    <ActionLink href={`/player/${course.videoSlugs[0]}`}>
                      Microvideo
                      <Play className="h-4 w-4" />
                    </ActionLink>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ejercicios" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Practice platform</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Ejercicios Codex filtrables</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:w-[34rem]">
            <label className="text-xs text-zinc-400">
              Superficie
              <select
                value={surface}
                onChange={event => setSurface(event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-xs text-zinc-100 outline-none focus:border-emerald-300/50"
              >
                {surfaces.map(item => (
                  <option key={item} value={item}>
                    {item === 'all' ? 'Todas' : item}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-zinc-400">
              Dificultad
              <select
                value={difficulty}
                onChange={event => setDifficulty(event.target.value as (typeof DIFFICULTIES)[number])}
                className="mt-1 h-9 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-xs text-zinc-100 outline-none focus:border-emerald-300/50"
              >
                {DIFFICULTIES.map(item => (
                  <option key={item} value={item}>
                    {difficultyLabel[item]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-3 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {LEVELS.map(item => (
              <Chip key={item} active={level === item} onClick={() => setLevel(item)}>
                {levelLabel[item]}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {TYPES.map(item => (
              <Chip key={item} active={type === item} onClick={() => setType(item)}>
                {typeLabel[item]}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {COSTS.map(item => (
              <Chip key={item} active={cost === item} onClick={() => setCost(item)}>
                {item === 'all' ? 'Coste: todos' : `Coste ${item}`}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {filteredExercises.map(exercise => {
            const course = courseById.get(exercise.courseId)
            return (
              <article
                key={exercise.id}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <MetaPill icon={Layers} label={course?.code ?? exercise.level} />
                  <MetaPill icon={Clock} label={`${exercise.durationMin} min`} />
                  <MetaPill icon={Cpu} label={exercise.recommendedModel} />
                  <MetaPill icon={ShieldCheck} label={exercise.permissionMode} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-zinc-50">{exercise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{exercise.briefing}</p>
                <div className="mt-4 grid gap-2 text-xs text-zinc-400 sm:grid-cols-2">
                  <span className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    Superficie: {exercise.surface}
                  </span>
                  <span className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    Coste: {exercise.estimatedCost}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <ActionLink href={`/tracks/codex/exercises/${exercise.id}`} primary>
                    Empezar ejercicio
                    <ArrowRight className="h-4 w-4" />
                  </ActionLink>
                  {exercise.videoSlug ? (
                    <ActionLink href={`/player/${exercise.videoSlug}`}>
                      Video
                      <Play className="h-4 w-4" />
                    </ActionLink>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>

        {filteredExercises.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-zinc-400">
            No hay ejercicios con esos filtros.
          </div>
        ) : null}
      </section>

      <section id="workshops" className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">Workshops</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Sesiones autoconsumibles con tutoria</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {workshops.map(workshop => (
            <article key={workshop.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <MetaPill icon={Workflow} label={workshop.duration} />
              <h3 className="mt-4 text-lg font-semibold text-zinc-50">{workshop.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{workshop.audience}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                {workshop.challengeIds.slice(0, 4).map(id => (
                  <span key={id} className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                    {id}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <ActionLink href={`/tracks/codex/workshops/${workshop.id}`} primary>
                  Abrir workshop
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="materiales" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Materiales</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Pack Codex consolidado</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Plantillas, labs, skills, acciones, registros de coste, auditorias y ejemplos ejecutables.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {materials.map(material => (
            <Link
              key={material.id}
              href={material.href}
              className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[11px] text-emerald-100">
                  {material.type}
                </span>
                <ExternalLink className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-200" />
              </div>
              <p className="mt-3 text-sm font-semibold text-zinc-100">{material.title}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{material.summary}</p>
              {material.courseId ? (
                <p className="mt-3 text-[11px] text-zinc-500">
                  {courseById.get(material.courseId)?.code ?? material.courseId}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
