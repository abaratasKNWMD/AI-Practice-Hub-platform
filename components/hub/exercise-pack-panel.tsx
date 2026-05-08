'use client'

import Link from 'next/link'
import { CheckCircle2, Download, FileCode2, FileText, GitPullRequest, LifeBuoy, ListChecks, ShieldCheck, Sparkles, Terminal } from 'lucide-react'

type Vendor = 'codex' | 'copilot' | 'claude'

const accentStyles = {
  codex: {
    border: 'border-emerald-300/20',
    bg: 'bg-emerald-300/[0.055]',
    icon: 'text-emerald-200',
    button: 'border-emerald-300/50 bg-emerald-300 text-zinc-950 hover:bg-emerald-200',
  },
  copilot: {
    border: 'border-sky-300/20',
    bg: 'bg-sky-300/[0.055]',
    icon: 'text-sky-200',
    button: 'border-sky-300/50 bg-sky-300 text-zinc-950 hover:bg-sky-200',
  },
  claude: {
    border: 'border-rose-300/20',
    bg: 'bg-rose-300/[0.055]',
    icon: 'text-rose-200',
    button: 'border-rose-300/50 bg-rose-300 text-zinc-950 hover:bg-rose-200',
  },
} satisfies Record<Vendor, Record<string, string>>

const files = [
  { label: 'README', href: 'README.md', icon: FileText, detail: 'briefing descargable' },
  { label: 'Prompts', href: 'prompts.md', icon: Sparkles, detail: 'arranque guiado' },
  { label: 'Rescate', href: 'rescue-prompts.md', icon: LifeBuoy, detail: 'cuando el alumno se atasca' },
  { label: 'Solucion', href: 'solution-guide.md', icon: CheckCircle2, detail: 'paso a paso' },
  { label: 'Diff', href: 'expected.diff', icon: FileCode2, detail: 'cambio esperado' },
  { label: 'Rubrica', href: 'rubric.md', icon: ListChecks, detail: 'criterios de revision' },
  { label: 'Autoevaluacion', href: 'self-assessment.md', icon: ShieldCheck, detail: 'check alumno' },
  { label: 'Instructor', href: 'instructor-mode.md', icon: Terminal, detail: 'modo tutoria' },
  { label: 'Validador', href: 'validator.mjs', icon: Terminal, detail: 'smoke local' },
  { label: 'PR simulado', href: 'pr-simulated/PR.md', icon: GitPullRequest, detail: 'review asincrona' },
]

const usageKey = 'ai-practice-hub.usage-events.v1'

function trackPackOpen(vendor: Vendor, exerciseId: string, href: string) {
  try {
    const raw = window.localStorage.getItem(usageKey)
    const usage = raw ? JSON.parse(raw) : []
    const events = Array.isArray(usage) ? usage : []
    const event = href.includes('self-assessment')
      ? 'self_assessment_open'
      : href.includes('instructor-mode')
        ? 'instructor_mode_open'
        : 'exercise_pack_open'
    window.localStorage.setItem(usageKey, JSON.stringify([
      { event, vendor, exerciseId, href, createdAt: new Date().toISOString() },
      ...events,
    ].slice(0, 1000)))
  } catch {
    // Local telemetry must never block the learning flow.
  }
}

export function ExercisePackPanel({ vendor, exerciseId }: { vendor: Vendor; exerciseId: string }) {
  const styles = accentStyles[vendor]
  const baseHref = `/exercise-packs/${vendor}/${exerciseId}`

  return (
    <section className={`mt-6 rounded-lg border ${styles.border} ${styles.bg} p-5 backdrop-blur-xl`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Download className={`h-5 w-5 ${styles.icon}`} />
            Pack autoconsumible
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
            Cada reto ya tiene repo de arranque, datos mock, errores intencionados, PR simulado, prompts, rescate,
            solucion guiada, diff esperado, rubrica, autoevaluacion y modo instructor.
          </p>
        </div>
        <Link
          href={`${baseHref}/starter/README.md`}
          onClick={() => trackPackOpen(vendor, exerciseId, 'starter/README.md')}
          className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition ${styles.button}`}
        >
          <Terminal className="h-4 w-4" />
          Abrir starter
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {files.map(({ label, href, icon: Icon, detail }) => (
          <Link
            key={href}
            href={`${baseHref}/${href}`}
            onClick={() => trackPackOpen(vendor, exerciseId, href)}
            className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-3 transition hover:border-white/25 hover:bg-white/[0.06]"
          >
            <Icon className={`h-4 w-4 ${styles.icon}`} />
            <span className="mt-3 block text-sm font-semibold text-zinc-100">{label}</span>
            <span className="mt-1 block text-xs leading-5 text-zinc-500">{detail}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
