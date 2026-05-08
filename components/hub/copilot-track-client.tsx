'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Bot,
  ClipboardCheck,
  Clock,
  Code2,
  ExternalLink,
  GitBranch,
  MonitorPlay,
  Play,
  Search,
  ShieldCheck,
  Terminal,
  Wallet,
  Workflow,
  Wrench,
} from 'lucide-react'
import type { CourseMeta, ExerciseMeta, MaterialMeta, WorkshopMeta } from '@/lib/content-schema'

interface CopilotTrackClientProps {
  courses: CourseMeta[]
  exercises: ExerciseMeta[]
  workshops: WorkshopMeta[]
  materials: MaterialMeta[]
}

const LEVELS = ['all', 'orientation', 'basic', 'medium', 'advanced', 'enterprise'] as const
const TYPES = ['all', 'lab', 'template', 'review', 'automation', 'capstone'] as const
const COSTS = ['all', 'bajo', 'medio', 'alto'] as const

const levelLabel: Record<string, string> = {
  all: 'Todos',
  orientation: 'CP0',
  basic: 'Basic',
  medium: 'Medium',
  advanced: 'Advanced',
  enterprise: 'Enterprise',
}

const typeLabel: Record<string, string> = {
  all: 'Todos',
  lab: 'Labs',
  template: 'Templates',
  review: 'Review',
  automation: 'Automation',
  capstone: 'Capstone',
}

function costBand(exercise: ExerciseMeta) {
  const text = exercise.estimatedCost.toLowerCase()
  if (text.includes('alto')) return 'alto'
  if (text.includes('medio')) return 'medio'
  return 'bajo'
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-md border px-3 text-xs font-medium transition ${
        active
          ? 'border-sky-300/60 bg-sky-300/15 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.14)]'
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
      <Icon className="h-3.5 w-3.5 text-sky-200" />
      {label}
    </span>
  )
}

function ActionLink({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-md border px-3 text-xs font-semibold transition ${
        primary
          ? 'border-sky-300/60 bg-sky-300 text-zinc-950 hover:bg-sky-200'
          : 'border-white/10 bg-white/[0.04] text-zinc-100 hover:border-white/25 hover:bg-white/[0.08]'
      }`}
    >
      {children}
    </Link>
  )
}

function VsCodeVisual() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
        </div>
        <span className="text-xs font-mono text-zinc-500">github.copilot.training</span>
      </div>
      <div className="grid min-h-[26rem] grid-cols-[3.3rem_1fr_19rem]">
        <div className="border-r border-white/10 bg-[#0b0f14] p-3">
          <div className="space-y-4 text-zinc-500">
            <Code2 className="h-5 w-5 text-sky-300" />
            <Search className="h-5 w-5" />
            <GitBranch className="h-5 w-5" />
            <Bot className="h-5 w-5 text-emerald-300" />
          </div>
        </div>
        <div className="bg-[#0d1117] p-5 font-mono text-sm">
          <p className="text-zinc-500">src/discount.js</p>
          <pre className="mt-6 whitespace-pre-wrap leading-7 text-zinc-300">
            <span className="text-fuchsia-300">function</span> applyDiscount(price, pct) {'{\n'}
            {'  '}<span className="text-zinc-500">{'// Copilot ghost text aparece aqui'}</span>{'\n'}
            {'  '}<span className="text-sky-300">if</span> (pct &lt; 0 || pct &gt; 100) {'{\n'}
            {'    '}<span className="text-emerald-300">throw new Error</span>(<span className="text-amber-200">{'\'Invalid discount\''}</span>){'\n'}
            {'  }'}{'\n'}
            {'  '}<span className="text-zinc-500">return Math.round(price * (1 - pct / 100))</span>{'\n'}
            {'}'}
          </pre>
        </div>
        <div className="border-l border-white/10 bg-[#111827]/80 p-4">
          <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">Copilot Chat</p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Ask para entender. Edit para cambios pequenos. Agent para tareas multiarchivo con criterio de cierre.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            {['Ask', 'Edit', 'Agent'].map((mode, index) => (
              <div key={mode} className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-300">
                <span>{mode}</span>
                <span className="font-mono text-sky-200">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CopilotTrackClient({ courses, exercises, workshops, materials }: CopilotTrackClientProps) {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('all')
  const [type, setType] = useState<(typeof TYPES)[number]>('all')
  const [cost, setCost] = useState<(typeof COSTS)[number]>('all')
  const [surface, setSurface] = useState('all')

  const courseById = useMemo(() => new Map(courses.map(course => [course.id, course])), [courses])
  const surfaces = useMemo(() => ['all', ...Array.from(new Set(exercises.map(exercise => exercise.surface)))], [exercises])
  const videoCount = useMemo(() => courses.reduce((total, course) => total + course.videoSlugs.length, 0), [courses])

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesLevel = level === 'all' || exercise.level === level
      const matchesType = type === 'all' || exercise.type === type
      const matchesSurface = surface === 'all' || exercise.surface === surface
      const matchesCost = cost === 'all' || costBand(exercise) === cost
      return matchesLevel && matchesType && matchesSurface && matchesCost
    })
  }, [cost, exercises, level, surface, type])

  return (
    <div className="space-y-14">
      <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <MetaPill icon={BookOpen} label={`${courses.length} cursos`} />
            <MetaPill icon={Wrench} label={`${exercises.length} ejercicios`} />
            <MetaPill icon={MonitorPlay} label={`${videoCount} videos`} />
            <MetaPill icon={Wallet} label="premium requests" />
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
            GitHub Copilot Practice
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
            De autocomplete suelto a disciplina de equipo: VS Code, Ask/Edit/Agent, instructions,
            prompt files, custom agents, MCP, code review, cloud agent y gobierno de coste.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <ActionLink href="#ejercicios" primary>
              <Search className="h-4 w-4" />
              Explorar ejercicios
            </ActionLink>
            <ActionLink href="/player/cp-masterclass-10m-copilot-workbench">
              <Play className="h-4 w-4" />
              Ver masterclass 10m
            </ActionLink>
          </div>
        </div>
        <VsCodeVisual />
      </section>

      <section id="cursos" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">Ruta Copilot</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Cursos autoconsumibles CP0-CP4</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Los PPT fuente quedan enlazados, pero la practica vive en labs, prompts, agents y workshops.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map(course => (
            <article key={course.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-2">
                <MetaPill icon={BookOpen} label={`${course.code} / ${levelLabel[course.level]}`} />
                <MetaPill icon={Clock} label={course.duration} />
                <MetaPill icon={ClipboardCheck} label={`${course.exerciseIds.length} labs`} />
                <MetaPill icon={MonitorPlay} label={`${course.videoSlugs.length} videos`} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-zinc-50">{course.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{course.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <ActionLink href={`/tracks/copilot/courses/${course.id}`} primary>
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
            </article>
          ))}
        </div>
      </section>

      <section id="ejercicios" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Practice platform</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Ejercicios Copilot filtrables</h2>
          </div>
          <label className="text-xs text-zinc-400 xl:w-[28rem]">
            Superficie
            <select
              value={surface}
              onChange={event => setSurface(event.target.value)}
              className="mt-1 h-9 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-xs text-zinc-100 outline-none focus:border-sky-300/50"
            >
              {surfaces.map(item => (
                <option key={item} value={item}>{item === 'all' ? 'Todas' : item}</option>
              ))}
            </select>
          </label>
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
              <article key={exercise.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
                <div className="flex flex-wrap gap-2">
                  <MetaPill icon={GitBranch} label={course?.code ?? exercise.level} />
                  <MetaPill icon={Clock} label={`${exercise.durationMin} min`} />
                  <MetaPill icon={Terminal} label={exercise.surface} />
                  <MetaPill icon={ShieldCheck} label={exercise.permissionMode} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-zinc-50">{exercise.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{exercise.briefing}</p>
                <div className="mt-4 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-400">
                  Modelo/coste: {exercise.recommendedModel} / {exercise.estimatedCost}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <ActionLink href={`/tracks/copilot/exercises/${exercise.id}`} primary>
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
      </section>

      <section id="workshops" className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">Workshops</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">10 retos autoconsumibles + tutoria</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {workshops.map(workshop => (
            <article key={workshop.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <MetaPill icon={Workflow} label={workshop.duration} />
              <h3 className="mt-4 text-lg font-semibold text-zinc-50">{workshop.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{workshop.audience}</p>
              <div className="mt-5">
                <ActionLink href={`/tracks/copilot/workshops/${workshop.id}`} primary>
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
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Workspace, PPTs y pack .github</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Ejercicios originales, soluciones, instructions, prompts, agents, MCP inventory y gobierno.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {materials.map(material => (
            <Link key={material.id} href={material.href} className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[11px] text-sky-100">
                  {material.type}
                </span>
                <ExternalLink className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-200" />
              </div>
              <p className="mt-3 text-sm font-semibold text-zinc-100">{material.title}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{material.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
