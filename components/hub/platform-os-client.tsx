'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type ElementType, type ReactNode } from 'react'
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Download,
  GraduationCap,
  HelpCircle,
  MonitorPlay,
  Route,
  Search,
  Send,
  Users,
  Wrench,
} from 'lucide-react'
import type { CourseMeta, ExerciseMeta, Track, WorkshopMeta } from '@/lib/content-schema'
import type { LearningOs } from '@/lib/platform-schema'

type Vendor = 'codex' | 'copilot' | 'claude'
type ExerciseStatus = 'not-started' | 'in-progress' | 'blocked' | 'submitted' | 'reviewed'

interface VendorItem<T> {
  vendor: Vendor
  item: T
}

interface PlatformOsClientProps {
  learningOs: LearningOs
  tracks: Track[]
  courses: Array<VendorItem<CourseMeta>>
  exercises: Array<VendorItem<ExerciseMeta>>
  workshops: Array<VendorItem<WorkshopMeta>>
}

interface ProgressEntry {
  progress: number
  updatedAt: string
}

interface ExerciseProgress {
  status: ExerciseStatus
  notes: string
  updatedAt: string
}

interface TutoringRequest {
  id: string
  slot: string
  vendor: string
  topic: string
  evidence: string
  status: 'requested' | 'scheduled' | 'closed'
  createdAt: string
}

interface DoubtEntry {
  id: string
  text: string
  evidence: string
  status: 'new' | 'answered' | 'converted-to-material'
  createdAt: string
}

interface LearningState {
  courses: Record<string, ProgressEntry>
  videos: Record<string, ProgressEntry>
  workshops: Record<string, ProgressEntry>
  exercises: Record<string, ExerciseProgress>
  tutoring: TutoringRequest[]
  doubts: DoubtEntry[]
}

const STORAGE_KEY = 'ai-practice-hub.learning-os.v1'

const EXERCISE_STATUSES: ExerciseStatus[] = ['not-started', 'in-progress', 'blocked', 'submitted', 'reviewed']

const statusLabel: Record<ExerciseStatus, string> = {
  'not-started': 'No iniciado',
  'in-progress': 'En progreso',
  blocked: 'Bloqueado',
  submitted: 'Entregado',
  reviewed: 'Revisado',
}

const statusScore: Record<ExerciseStatus, number> = {
  'not-started': 0,
  'in-progress': 35,
  blocked: 20,
  submitted: 75,
  reviewed: 100,
}

const emptyState: LearningState = {
  courses: {},
  videos: {},
  workshops: {},
  exercises: {},
  tutoring: [],
  doubts: [],
}

function nowIso() {
  return new Date().toISOString()
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function readState(): LearningState {
  if (typeof window === 'undefined') return emptyState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    return { ...emptyState, ...JSON.parse(raw) } as LearningState
  } catch {
    return emptyState
  }
}

function scoreAverage(values: number[]) {
  if (!values.length) return 0
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length)
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: ElementType; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/10 backdrop-blur-xl">
      <Icon className="h-4 w-4 text-emerald-200" />
      <p className="mt-4 text-2xl font-semibold text-zinc-50">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-3 min-h-10 text-xs leading-5 text-zinc-400">{detail}</p>
    </div>
  )
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold text-zinc-50">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function ProgressBar({ value, tone = 'emerald' }: { value: number; tone?: 'emerald' | 'sky' | 'rose' | 'amber' }) {
  const color = {
    emerald: 'bg-emerald-300',
    sky: 'bg-sky-300',
    rose: 'bg-rose-300',
    amber: 'bg-amber-300',
  }[tone]

  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full ${color} transition-[width]`} style={{ width: `${clampProgress(value)}%` }} />
    </div>
  )
}

function getVendorHref(vendor: Vendor, kind: 'course' | 'exercise' | 'workshop', id: string) {
  const segment = kind === 'course' ? 'courses' : kind === 'exercise' ? 'exercises' : 'workshops'
  return `/tracks/${vendor}/${segment}/${id}`
}

export function PlatformOsClient({ learningOs, tracks, courses, exercises, workshops }: PlatformOsClientProps) {
  const [state, setState] = useState<LearningState>(emptyState)
  const [mounted, setMounted] = useState(false)
  const [vendorFilter, setVendorFilter] = useState<'all' | Vendor>('all')
  const [routeMode, setRouteMode] = useState<'roles' | 'objectives'>('roles')
  const [tutoringDraft, setTutoringDraft] = useState({
    slot: learningOs.tutoringPolicy.defaultSlots[0] ?? '',
    vendor: 'codex',
    topic: '',
    evidence: '',
  })
  const [doubtDraft, setDoubtDraft] = useState({ text: '', evidence: '' })

  useEffect(() => {
    setState(readState())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [mounted, state])

  const uniqueVideos = useMemo(() => {
    const slugs = new Set<string>()
    for (const course of courses) course.item.videoSlugs.forEach(slug => slugs.add(slug))
    for (const workshop of workshops) workshop.item.videoSlugs.forEach(slug => slugs.add(slug))
    return Array.from(slugs).sort()
  }, [courses, workshops])

  const vendorCourses = useMemo(
    () => courses.filter(course => vendorFilter === 'all' || course.vendor === vendorFilter),
    [courses, vendorFilter],
  )
  const vendorExercises = useMemo(
    () => exercises.filter(exercise => vendorFilter === 'all' || exercise.vendor === vendorFilter),
    [exercises, vendorFilter],
  )
  const vendorWorkshops = useMemo(
    () => workshops.filter(workshop => vendorFilter === 'all' || workshop.vendor === vendorFilter),
    [vendorFilter, workshops],
  )

  const courseLookup = useMemo(() => new Map(courses.map(({ vendor, item }) => [item.id, { vendor, item }])), [courses])
  const courseScore = scoreAverage(courses.map(({ item }) => state.courses[item.id]?.progress ?? 0))
  const videoScore = scoreAverage(uniqueVideos.map(slug => state.videos[slug]?.progress ?? 0))
  const exerciseScore = scoreAverage(exercises.map(({ item }) => statusScore[state.exercises[item.id]?.status ?? 'not-started']))
  const workshopScore = scoreAverage(workshops.map(({ item }) => state.workshops[item.id]?.progress ?? 0))
  const globalScore = scoreAverage([courseScore, videoScore, exerciseScore, workshopScore])

  const statusCounts = EXERCISE_STATUSES.map(status => ({
    status,
    count: exercises.filter(({ item }) => (state.exercises[item.id]?.status ?? 'not-started') === status).length,
  }))

  const unlockedBadges = learningOs.badges.filter(badge => {
    if (badge.id === 'badge-first-course') return Object.values(state.courses).some(entry => entry.progress >= 100)
    if (badge.id === 'badge-three-reviewed') return Object.values(state.exercises).filter(entry => entry.status === 'reviewed').length >= 3
    if (badge.id === 'badge-cost-aware') return state.courses['codex-operating-model']?.progress >= 100 || state.courses['copilot-cloud-enterprise']?.progress >= 100 || state.courses['claude-agent-sdk-enterprise']?.progress >= 100
    if (badge.id === 'badge-workshop-ready') return Object.values(state.workshops).some(entry => entry.progress >= 100)
    if (badge.id === 'badge-pr-ready') return state.videos['cx-workshop-60m-first-task-to-pr']?.progress >= 90 || state.videos['cp-workshop-60m-vscode-to-pr-review']?.progress >= 90
    if (badge.id === 'badge-instructor-signal') return state.doubts.length > 0
    return false
  })

  const updateProgress = (kind: 'courses' | 'videos' | 'workshops', id: string, progress: number) => {
    setState(current => ({
      ...current,
      [kind]: {
        ...current[kind],
        [id]: { progress: clampProgress(progress), updatedAt: nowIso() },
      },
    }))
  }

  const updateExercise = (id: string, status: ExerciseStatus, notes = state.exercises[id]?.notes ?? '') => {
    setState(current => ({
      ...current,
      exercises: {
        ...current.exercises,
        [id]: { status, notes, updatedAt: nowIso() },
      },
    }))
  }

  const addTutoring = () => {
    if (!tutoringDraft.topic.trim()) return
    setState(current => ({
      ...current,
      tutoring: [
        {
          id: `tut-${Date.now()}`,
          slot: tutoringDraft.slot,
          vendor: tutoringDraft.vendor,
          topic: tutoringDraft.topic.trim(),
          evidence: tutoringDraft.evidence.trim(),
          status: 'requested',
          createdAt: nowIso(),
        },
        ...current.tutoring,
      ],
    }))
    setTutoringDraft(draft => ({ ...draft, topic: '', evidence: '' }))
  }

  const addDoubt = () => {
    if (!doubtDraft.text.trim()) return
    setState(current => ({
      ...current,
      doubts: [
        {
          id: `doubt-${Date.now()}`,
          text: doubtDraft.text.trim(),
          evidence: doubtDraft.evidence.trim(),
          status: 'new',
          createdAt: nowIso(),
        },
        ...current.doubts,
      ],
    }))
    setDoubtDraft({ text: '', evidence: '' })
  }

  const exportProgress = () => {
    const payload = {
      exportedAt: nowIso(),
      score: { globalScore, courseScore, videoScore, exerciseScore, workshopScore },
      state,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ai-practice-progress-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">Learner OS</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
              Plataforma de progreso, tutoria y adopcion.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
              Todo lo que faltaba para dejar de tener slides sueltas: progreso por curso, video,
              ejercicio y workshop, rutas por rol/objetivo, cohortes, dudas, instructor, metricas y export.
            </p>
          </div>
          <button
            type="button"
            onClick={exportProgress}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-300/60 bg-emerald-300 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200"
          >
            <Download className="h-4 w-4" />
            Exportar progreso
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard icon={BarChart3} label="global" value={`${globalScore}%`} detail="Media ponderada de cursos, videos, ejercicios y workshops." />
          <MetricCard icon={BookOpen} label="cursos" value={`${courseScore}%`} detail={`${courses.length} cursos trazados en Codex, Copilot y Claude.`} />
          <MetricCard icon={MonitorPlay} label="videos" value={`${videoScore}%`} detail={`${uniqueVideos.length} videos con progreso persistente.`} />
          <MetricCard icon={Wrench} label="ejercicios" value={`${exerciseScore}%`} detail={`${exercises.length} retos con estado operativo.`} />
          <MetricCard icon={GraduationCap} label="badges" value={`${unlockedBadges.length}/${learningOs.badges.length}`} detail="Logros internos para activar continuidad." />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <Panel eyebrow="Rutas" title="Por rol y por objetivo">
          <div className="flex flex-wrap gap-2">
            {(['roles', 'objectives'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setRouteMode(mode)}
                className={`min-h-9 rounded-md border px-3 text-xs font-semibold transition ${routeMode === mode ? 'border-emerald-300/60 bg-emerald-300 text-zinc-950' : 'border-white/10 bg-black/20 text-zinc-300 hover:border-white/25'}`}
              >
                {mode === 'roles' ? 'Roles' : 'Objetivos'}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3">
            {(routeMode === 'roles' ? learningOs.roleRoutes : learningOs.objectiveRoutes).map(route => (
              <article key={route.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-50">{route.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {'audience' in route ? route.audience : route.goal}
                    </p>
                  </div>
                  <Route className="h-5 w-5 shrink-0 text-emerald-200" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {route.courseIds.slice(0, 4).map(id => {
                    const course = courseLookup.get(id)
                    if (!course) return null
                    return (
                      <Link key={id} href={getVendorHref(course.vendor, 'course', id)} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300 hover:border-white/25">
                        {course.item.code}
                      </Link>
                    )
                  })}
                  {route.videoSlugs.slice(0, 3).map(slug => (
                    <Link key={slug} href={`/player/${slug}`} className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[11px] text-cyan-100 hover:border-cyan-300/40">
                      video
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Progreso real" title="Cursos, videos, ejercicios y workshops">
          <div className="flex flex-wrap gap-2">
            {(['all', 'codex', 'copilot', 'claude'] as const).map(vendor => (
              <button
                key={vendor}
                type="button"
                onClick={() => setVendorFilter(vendor)}
                className={`min-h-9 rounded-md border px-3 text-xs font-semibold transition ${vendorFilter === vendor ? 'border-emerald-300/60 bg-emerald-300 text-zinc-950' : 'border-white/10 bg-black/20 text-zinc-300 hover:border-white/25'}`}
              >
                {vendor === 'all' ? 'Todos' : vendor}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <BookOpen className="h-4 w-4 text-emerald-200" />
                Cursos
              </h3>
              {vendorCourses.map(({ vendor, item }) => (
                <div key={item.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={getVendorHref(vendor, 'course', item.id)} className="text-sm font-semibold text-zinc-100 hover:underline">
                      {item.code} / {item.title}
                    </Link>
                    <span className="font-mono text-xs text-zinc-400">{state.courses[item.id]?.progress ?? 0}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={state.courses[item.id]?.progress ?? 0}
                    onChange={event => updateProgress('courses', item.id, Number(event.target.value))}
                    className="mt-3 w-full accent-emerald-300"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <Wrench className="h-4 w-4 text-amber-200" />
                Ejercicios
              </h3>
              {vendorExercises.map(({ vendor, item }) => (
                <div key={item.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <Link href={getVendorHref(vendor, 'exercise', item.id)} className="text-sm font-semibold text-zinc-100 hover:underline">
                    {item.title}
                  </Link>
                  <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                    <select
                      value={state.exercises[item.id]?.status ?? 'not-started'}
                      onChange={event => updateExercise(item.id, event.target.value as ExerciseStatus)}
                      className="h-9 rounded-md border border-white/10 bg-zinc-950 px-3 text-xs text-zinc-100 outline-none focus:border-emerald-300/50"
                    >
                      {EXERCISE_STATUSES.map(status => (
                        <option key={status} value={status}>{statusLabel[status]}</option>
                      ))}
                    </select>
                    <span className="inline-flex h-9 items-center rounded-md border border-white/10 px-3 text-xs text-zinc-400">
                      {item.durationMin} min
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <MonitorPlay className="h-4 w-4 text-cyan-200" />
                Videos
              </h3>
              {uniqueVideos.slice(0, 18).map(slug => (
                <div key={slug} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/player/${slug}`} className="font-mono text-xs text-zinc-200 hover:underline">{slug}</Link>
                    <span className="font-mono text-xs text-zinc-400">{state.videos[slug]?.progress ?? 0}%</span>
                  </div>
                  <ProgressBar value={state.videos[slug]?.progress ?? 0} tone="sky" />
                </div>
              ))}
              <p className="text-xs text-zinc-500">Los videos se actualizan automaticamente desde el player. Se muestran los primeros 18 para mantener la vista ligera.</p>
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <Users className="h-4 w-4 text-rose-200" />
                Workshops
              </h3>
              {vendorWorkshops.map(({ vendor, item }) => (
                <div key={item.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={getVendorHref(vendor, 'workshop', item.id)} className="text-sm font-semibold text-zinc-100 hover:underline">
                      {item.title}
                    </Link>
                    <span className="font-mono text-xs text-zinc-400">{state.workshops[item.id]?.progress ?? 0}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={state.workshops[item.id]?.progress ?? 0}
                    onChange={event => updateProgress('workshops', item.id, Number(event.target.value))}
                    className="mt-3 w-full accent-rose-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Panel eyebrow="Cohortes" title="Sistema de cohorts">
          <div className="space-y-3">
            {learningOs.cohorts.map(cohort => (
              <article key={cohort.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{cohort.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">{cohort.focus}</p>
                  </div>
                  <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-emerald-100">{cohort.status}</span>
                </div>
                <div className="mt-3 grid gap-2 text-xs text-zinc-400">
                  <span>{cohort.cadence}</span>
                  <span>{cohort.nextSession} / {cohort.seats} plazas</span>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Tutoria" title="Agenda y reserva">
          <div className="space-y-3">
            <p className="text-sm leading-6 text-zinc-400">{learningOs.tutoringPolicy.cadence}</p>
            <select
              value={tutoringDraft.slot}
              onChange={event => setTutoringDraft(draft => ({ ...draft, slot: event.target.value }))}
              className="h-10 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-emerald-300/50"
            >
              {learningOs.tutoringPolicy.defaultSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
            </select>
            <input
              value={tutoringDraft.topic}
              onChange={event => setTutoringDraft(draft => ({ ...draft, topic: event.target.value }))}
              placeholder="Tema de la tutoria"
              className="h-10 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50"
            />
            <textarea
              value={tutoringDraft.evidence}
              onChange={event => setTutoringDraft(draft => ({ ...draft, evidence: event.target.value }))}
              placeholder="Evidencia: curso, ejercicio, error, diff o captura"
              className="min-h-24 w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50"
            />
            <button type="button" onClick={addTutoring} className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-emerald-300/60 bg-emerald-300 px-3 text-sm font-semibold text-zinc-950">
              <CalendarDays className="h-4 w-4" />
              Solicitar tutoria
            </button>
            <div className="space-y-2">
              {state.tutoring.slice(0, 3).map(request => (
                <div key={request.id} className="rounded-md border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
                  <strong>{request.slot}</strong> / {request.topic}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel eyebrow="Dudas" title="Bandeja recurrente">
          <div className="space-y-3">
            <textarea
              value={doubtDraft.text}
              onChange={event => setDoubtDraft(draft => ({ ...draft, text: event.target.value }))}
              placeholder="Duda concreta que no debe perderse"
              className="min-h-24 w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50"
            />
            <input
              value={doubtDraft.evidence}
              onChange={event => setDoubtDraft(draft => ({ ...draft, evidence: event.target.value }))}
              placeholder="Evidencia o enlace interno"
              className="h-10 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50"
            />
            <button type="button" onClick={addDoubt} className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-cyan-300/50 bg-cyan-300 px-3 text-sm font-semibold text-zinc-950">
              <Send className="h-4 w-4" />
              Registrar duda
            </button>
            <div className="space-y-2">
              {state.doubts.slice(0, 4).map(doubt => (
                <div key={doubt.id} className="rounded-md border border-white/10 bg-black/20 p-3 text-xs leading-5 text-zinc-300">
                  <HelpCircle className="mb-2 h-4 w-4 text-cyan-200" />
                  {doubt.text}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Panel eyebrow="Instructor" title="Panel de decision">
          <div className="grid gap-3 md:grid-cols-3">
            {statusCounts.map(item => (
              <div key={item.status} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-zinc-50">{item.count}</p>
                <p className="mt-1 text-xs text-zinc-500">{statusLabel[item.status]}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-amber-300/20 bg-amber-300/[0.06] p-4">
              <p className="text-sm font-semibold text-amber-100">Bloqueos para tutoria</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {statusCounts.find(item => item.status === 'blocked')?.count ?? 0} ejercicios bloqueados. Si sube de 5, crear microvideo o FAQ.
              </p>
            </div>
            <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
              <p className="text-sm font-semibold text-cyan-100">Dudas recurrentes</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {state.doubts.length} dudas registradas. Las repetidas deben convertirse en material.
              </p>
            </div>
          </div>
        </Panel>

        <Panel eyebrow="Badges" title="Certificados internos">
          <div className="grid gap-3 sm:grid-cols-2">
            {learningOs.badges.map(badge => {
              const unlocked = unlockedBadges.some(item => item.id === badge.id)
              return (
                <div key={badge.id} className={`rounded-lg border p-4 ${unlocked ? 'border-emerald-300/40 bg-emerald-300/10' : 'border-white/10 bg-black/20'}`}>
                  {unlocked ? <CheckCircle2 className="h-5 w-5 text-emerald-200" /> : <Award className="h-5 w-5 text-zinc-500" />}
                  <p className="mt-3 text-sm font-semibold text-zinc-100">{badge.title}</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{badge.criteria}</p>
                </div>
              )
            })}
          </div>
        </Panel>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Tracks activos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tracks.map(track => (
                <Link key={track.id} href={track.href} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-100 hover:border-white/25">
                  {track.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-400">
            <Search className="h-4 w-4 text-emerald-200" />
            El progreso vive en localStorage para esta v1. El export genera el artefacto portable.
          </div>
        </div>
      </section>
    </div>
  )
}
