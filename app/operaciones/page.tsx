import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Film, ListChecks, PlayCircle, Rocket } from 'lucide-react'

type VideoPlan = {
  id: string
  vendor: string
  status: 'implemented' | 'ready-to-script' | 'planned'
  durationMin: number
  playerSlug?: string
  purpose: string
  scenes: string[]
  acceptanceCriteria: string[]
}

type SprintPlan = {
  id: string
  status: 'done' | 'next' | 'planned'
  title: string
  goal: string
  deliverables: string[]
  definitionOfDone: string[]
}

type AssetAudit = {
  vendor: string
  course: string
  status: string
  hero: boolean
  operativeDiagrams: number
  memes: number
  reflectionImages: number
  notes: string
}

type ExercisePack = {
  id: string
  vendor: string
  exerciseId: string
  href: string
  status: string
  contains: string[]
}

type WorkshopOneHour = {
  id: string
  vendor: string
  status: string
  title: string
  routeHref: string
  playerSlug: string
  packHref: string
  minuteGuideHref: string
  demoHref: string
  outputs: string[]
}

type ReleaseOps = {
  version: string
  status: string
  releaseDate: string
  commands: string[]
  checklists: Array<{
    id: string
    title: string
    href: string
    status: string
  }>
  smokeTargets: string[]
  visualTargets: Array<{
    id: string
    path: string
    viewports: string[]
  }>
  metrics: string[]
  knownWarnings: string[]
}

async function readJson<T>(relativePath: string): Promise<T> {
  const raw = await fs.readFile(path.join(process.cwd(), 'public', 'content', 'operations', relativePath), 'utf-8')
  return JSON.parse(raw) as T
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    implemented: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
    done: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
    ready: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
    'ready-to-script': 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100',
    'ready-with-qa-needed': 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100',
    'release-candidate': 'border-violet-300/40 bg-violet-300/10 text-violet-100',
    next: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100',
    planned: 'border-amber-300/40 bg-amber-300/10 text-amber-100',
  }
  return (
    <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${styles[status] ?? styles.planned}`}>
      {status}
    </span>
  )
}

export default async function OperacionesPage() {
  const [videos, sprints, assetAudit, exercisePacks, workshopsOneHour, releaseOps] = await Promise.all([
    readJson<VideoPlan[]>('video-roadmap.json'),
    readJson<SprintPlan[]>('sprints.json'),
    readJson<AssetAudit[]>('asset-audit.json'),
    readJson<ExercisePack[]>('exercise-packs.json'),
    readJson<WorkshopOneHour[]>('workshops-1h.json'),
    readJson<ReleaseOps>('release-ops.json'),
  ])

  const implementedVideos = videos.filter(video => video.status === 'implemented')
  const nextSprints = sprints.filter(sprint => sprint.status === 'next')

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#050505_0%,#101312_48%,#1a1711_100%)] text-zinc-50">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8 px-4 py-6 md:px-8 md:py-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
            <ArrowLeft className="h-4 w-4" />
            Volver al hub
          </Link>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
              {implementedVideos.length} masterclass implementadas
            </span>
            <span className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100">
              {nextSprints.length} sprints siguientes
            </span>
          </div>
        </header>

        <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Operaciones</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Sprint board de AI Practice Hub
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            Estado unificado de videos largos, workshops, assets, ejercicios y release. Esta pagina no sustituye al
            documento de auditoria: lo convierte en backlog ejecutable dentro del hub.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-4">
            {[
              { icon: Film, value: `${videos.length}`, label: 'videos planificados' },
              { icon: PlayCircle, value: `${implementedVideos.length}`, label: 'ya reproducibles' },
              { icon: ListChecks, value: `${workshopsOneHour.length}`, label: 'workshops 1h' },
              { icon: Rocket, value: releaseOps.version, label: 'release actual' },
            ].map(({ icon: MetricIcon, value, label }) => (
              <div key={label} className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-4">
                <MetricIcon className="h-5 w-5 text-emerald-200" />
                <p className="mt-3 break-words text-2xl font-semibold text-white md:text-3xl">{value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {sprints.map(sprint => (
            <article key={sprint.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{sprint.id}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-50">{sprint.title}</h2>
                </div>
                <StatusPill status={sprint.status} />
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{sprint.goal}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Deliverables</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {sprint.deliverables.map(item => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">Done</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {sprint.definitionOfDone.map(item => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">Video roadmap</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Masterclass, workshops y videos largos</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {videos.map(video => (
              <article key={video.id} className="rounded-lg border border-white/10 bg-black/20 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{video.vendor} / {video.durationMin} min</p>
                    <h3 className="mt-2 text-xl font-semibold text-zinc-50">{video.id}</h3>
                  </div>
                  <StatusPill status={video.status} />
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{video.purpose}</p>
                {video.playerSlug ? (
                  <Link href={`/player/${video.playerSlug}`} className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-md border border-emerald-300/50 bg-emerald-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-200">
                    <PlayCircle className="h-4 w-4" />
                    Abrir video
                  </Link>
                ) : null}
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Escenas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {video.scenes.map(scene => (
                      <span key={scene} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-zinc-300">
                        {scene}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Sprint 05</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Workshops de 1 hora listos para impartir</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {workshopsOneHour.map(workshop => (
              <article key={workshop.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{workshop.vendor}</p>
                    <h3 className="mt-2 text-xl font-semibold text-zinc-50">{workshop.title}</h3>
                  </div>
                  <StatusPill status={workshop.status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/player/${workshop.playerSlug}`} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-emerald-300/50 bg-emerald-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-200">
                    <PlayCircle className="h-4 w-4" />
                    Video 1h
                  </Link>
                  <Link href={workshop.routeHref} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
                    Ruta
                  </Link>
                  <Link href={workshop.packHref} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-cyan-300/40 bg-cyan-300/10 px-3 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200">
                    Pack
                  </Link>
                  <Link href={workshop.minuteGuideHref} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/25">
                    Guion
                  </Link>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {workshop.outputs.map(output => (
                    <span key={output} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-zinc-300">
                      {output}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">Sprint 06</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Release ops para uso real con alumnos</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">version</p>
                  <h3 className="mt-2 text-2xl font-semibold text-zinc-50">{releaseOps.version}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{releaseOps.releaseDate}</p>
                </div>
                <StatusPill status={releaseOps.status} />
              </div>
              <div className="mt-5 grid gap-2">
                {releaseOps.commands.map(command => (
                  <code key={command} className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-emerald-100">
                    {command}
                  </code>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Documentos release</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {releaseOps.checklists.map(item => (
                  <Link key={item.id} href={item.href} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-zinc-100">{item.title}</span>
                      <StatusPill status={item.status} />
                    </div>
                    <p className="mt-2 font-mono text-xs text-zinc-500">{item.href}</p>
                  </Link>
                ))}
              </div>
            </article>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">Smoke targets</p>
              <p className="mt-3 text-3xl font-semibold text-white">{releaseOps.smokeTargets.length}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Rutas criticas cubiertas por `pnpm release:smoke`.</p>
            </article>
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200">Visual targets</p>
              <p className="mt-3 text-3xl font-semibold text-white">{releaseOps.visualTargets.length}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Desktop/mobile cubierto por `pnpm qa:visual`.</p>
            </article>
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Metricas</p>
              <p className="mt-3 text-3xl font-semibold text-white">{releaseOps.metrics.length}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Eventos minimos para medir adopcion y soporte.</p>
            </article>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">Sprint 03</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Auditoria visual por deck</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {assetAudit.map(item => (
              <article key={`${item.vendor}-${item.course}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{item.vendor}</p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-50">{item.course}</h3>
                  </div>
                  <StatusPill status={item.status} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md border border-white/10 bg-black/20 p-2">
                    <p className="text-xl font-semibold text-white">{item.operativeDiagrams}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">diagramas</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/20 p-2">
                    <p className="text-xl font-semibold text-white">{item.memes}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">memes</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/20 p-2">
                    <p className="text-xl font-semibold text-white">{item.reflectionImages}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">reflexion</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{item.notes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Sprint 04</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Packs autoconsumibles</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {exercisePacks.map(pack => (
              <article key={pack.id} className="rounded-lg border border-white/10 bg-black/20 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{pack.vendor}</p>
                    <h3 className="mt-2 text-xl font-semibold text-zinc-50">{pack.id}</h3>
                  </div>
                  <StatusPill status={pack.status} />
                </div>
                <p className="mt-3 text-sm text-zinc-400">Ejercicio: {pack.exerciseId}</p>
                <Link href={pack.href} className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-md border border-amber-300/50 bg-amber-300 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-amber-200">
                  Abrir pack
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pack.contains.map(item => (
                    <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
