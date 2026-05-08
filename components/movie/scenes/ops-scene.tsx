'use client'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Bot,
  Coins,
  GitBranch,
  PauseCircle,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react'

interface OpsContent {
  mode: 'prompt' | 'streaming' | 'diff' | 'terminal' | 'pr-review' | 'cost' | 'decision' | 'pause' | 'quiz' | 'branch' | 'risk'
  vendor?: string
  title: string
  eyebrow?: string
  label?: string
  presenterCue?: string
  actionLabel?: string
  actionDetail?: string
  expectedOutput?: string
  prompt?: string
  response?: string[]
  diff?: string[]
  terminal?: string[]
  review?: Array<{ severity: string; text: string }>
  cost?: { model: string; tokens: string; permission: string; stopRule: string }
  decision?: { question: string; options: string[]; selected: number }
  risk?: { items: string[]; level: string }
  branch?: { steps: string[]; active: number }
  quiz?: { question: string; answers: string[]; correct: number }
}

interface OpsSceneProps {
  content: OpsContent
  progress: number
}

const modeLabel: Record<OpsContent['mode'], string> = {
  prompt: 'Prompt typed',
  streaming: 'Respuesta simulada',
  diff: 'Diff viewer',
  terminal: 'Terminal output',
  'pr-review': 'PR review',
  cost: 'Coste y tokens',
  decision: 'Decision humana',
  pause: 'Pausa instructor',
  quiz: 'Checkpoint',
  branch: 'Branch timeline',
  risk: 'Riesgos y permisos',
}

function visibleCount(progress: number, length: number) {
  return Math.min(length, Math.max(1, Math.ceil((progress / 100) * (length + 0.4))))
}

function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
        </div>
        <span className="truncate text-xs font-mono text-zinc-500">{title}</span>
      </div>
      {children}
    </div>
  )
}

function PromptView({ content, progress }: OpsSceneProps) {
  const text = content.prompt ?? content.actionDetail ?? 'Prompt operativo con objetivo, contexto, restricciones y done when.'
  const visible = text.slice(0, Math.max(8, Math.floor((progress / 100) * text.length)))
  return (
    <WindowFrame title="prompt.md">
      <div className="min-h-[22rem] p-5 font-mono text-sm leading-7 text-zinc-200">
        <span className="text-emerald-300">&gt; </span>
        <span className="whitespace-pre-wrap">{visible}</span>
        {visible.length < text.length ? <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-emerald-300 align-middle" /> : null}
      </div>
    </WindowFrame>
  )
}

function StreamingView({ content, progress }: OpsSceneProps) {
  const lines = content.response ?? ['Analizando contexto...', 'Preparando salida verificable...', 'Cerrando con evidencia.']
  return (
    <WindowFrame title="assistant-stream">
      <div className="min-h-[22rem] space-y-3 p-5">
        {lines.slice(0, visibleCount(progress, lines.length)).map((line, index) => (
          <motion.div key={line} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-md border border-emerald-300/20 bg-emerald-300/[0.06] p-3 text-sm leading-6 text-zinc-200">
            <Bot className="mb-2 h-4 w-4 text-emerald-200" />
            {line}
            <span className="mt-2 block text-xs font-mono text-zinc-500">chunk {String(index + 1).padStart(2, '0')}</span>
          </motion.div>
        ))}
      </div>
    </WindowFrame>
  )
}

function DiffView({ content, progress }: OpsSceneProps) {
  const lines = content.diff ?? ['- sin criterio de aceptacion', '+ con criterio de aceptacion y test']
  return (
    <WindowFrame title="git diff">
      <div className="min-h-[22rem] p-5 font-mono text-sm leading-7">
        {lines.slice(0, visibleCount(progress, lines.length)).map(line => (
          <div key={line} className={line.startsWith('+') ? 'text-emerald-300' : line.startsWith('-') ? 'text-red-300' : 'text-zinc-300'}>
            {line}
          </div>
        ))}
      </div>
    </WindowFrame>
  )
}

function TerminalView({ content, progress }: OpsSceneProps) {
  const lines = content.terminal ?? ['$ pnpm test', '✓ ok']
  return (
    <WindowFrame title="terminal">
      <div className="min-h-[22rem] p-5 font-mono text-sm leading-7 text-zinc-200">
        {lines.slice(0, visibleCount(progress, lines.length)).map(line => (
          <div key={line} className={line.includes('✓') ? 'text-emerald-300' : line.startsWith('$') ? 'text-cyan-200' : 'text-zinc-300'}>
            {line}
          </div>
        ))}
      </div>
    </WindowFrame>
  )
}

function ReviewView({ content, progress }: OpsSceneProps) {
  const findings = content.review ?? [{ severity: 'note', text: 'Review sin findings bloqueantes.' }]
  return (
    <WindowFrame title="pull-request-review.json">
      <div className="min-h-[22rem] space-y-3 p-5">
        {findings.slice(0, visibleCount(progress, findings.length)).map(item => (
          <div key={`${item.severity}-${item.text}`} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs font-mono text-amber-100">{item.severity}</span>
            <p className="mt-3 text-sm leading-6 text-zinc-200">{item.text}</p>
          </div>
        ))}
      </div>
    </WindowFrame>
  )
}

function CostView({ content, progress }: OpsSceneProps) {
  const cost = content.cost ?? { model: 'modelo estandar', tokens: 'medio', permission: 'readonly', stopRule: 'Parar sin evidencia nueva.' }
  const rows = [
    ['Modelo', cost.model],
    ['Tokens', cost.tokens],
    ['Permiso', cost.permission],
    ['Stop rule', cost.stopRule],
  ]
  return (
    <WindowFrame title="cost-ledger.csv">
      <div className="min-h-[22rem] p-5">
        <div className="mb-5 flex items-center gap-3 rounded-md border border-emerald-300/20 bg-emerald-300/[0.06] p-4">
          <Coins className="h-5 w-5 text-emerald-200" />
          <div>
            <p className="text-sm font-semibold text-zinc-100">Coste visible antes de continuar</p>
            <ProgressMeter value={Math.min(100, Math.max(10, progress))} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-zinc-100">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  )
}

function ProgressMeter({ value }: { value: number }) {
  return (
    <div className="mt-3 h-2 w-52 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-emerald-300" style={{ width: `${Math.round(value)}%` }} />
    </div>
  )
}

function DecisionView({ content, progress }: OpsSceneProps) {
  const decision = content.decision ?? { question: 'Que hacemos ahora?', options: ['continuar', 'parar'], selected: 0 }
  return (
    <WindowFrame title="human-decision">
      <div className="min-h-[22rem] p-5">
        <p className="text-xl font-semibold text-zinc-50">{decision.question}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {decision.options.slice(0, visibleCount(progress, decision.options.length)).map((option, index) => (
            <div key={option} className={`rounded-md border p-4 ${index === decision.selected ? 'border-emerald-300/50 bg-emerald-300/10' : 'border-white/10 bg-black/20'}`}>
              <PlayCircle className={`h-4 w-4 ${index === decision.selected ? 'text-emerald-200' : 'text-zinc-500'}`} />
              <p className="mt-3 text-sm font-semibold text-zinc-100">{option}</p>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  )
}

function PauseView({ content }: OpsSceneProps) {
  return (
    <WindowFrame title="instructor-pause">
      <div className="flex min-h-[22rem] flex-col items-center justify-center p-8 text-center">
        <PauseCircle className="h-14 w-14 text-amber-200" />
        <p className="mt-5 text-2xl font-semibold text-zinc-50">Pausa de instructor</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
          {content.presenterCue ?? content.actionDetail ?? 'Detener la demo y pedir al alumno que verbalice decision, evidencia y coste.'}
        </p>
      </div>
    </WindowFrame>
  )
}

function QuizView({ content, progress }: OpsSceneProps) {
  const quiz = content.quiz ?? { question: 'Que evidencia cierra esto?', answers: ['diff', 'opinion'], correct: 0 }
  return (
    <WindowFrame title="checkpoint">
      <div className="min-h-[22rem] p-5">
        <p className="text-xl font-semibold text-zinc-50">{quiz.question}</p>
        <div className="mt-5 space-y-3">
          {quiz.answers.slice(0, visibleCount(progress, quiz.answers.length)).map((answer, index) => (
            <div key={answer} className={`rounded-md border p-4 ${index === quiz.correct && progress > 70 ? 'border-emerald-300/50 bg-emerald-300/10' : 'border-white/10 bg-black/20'}`}>
              <p className="text-sm text-zinc-200">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  )
}

function BranchView({ content, progress }: OpsSceneProps) {
  const branch = content.branch ?? { steps: ['Issue', 'Branch', 'PR'], active: 1 }
  const active = Math.min(branch.steps.length - 1, Math.floor((progress / 100) * branch.steps.length))
  return (
    <WindowFrame title="branch-timeline">
      <div className="min-h-[22rem] p-5">
        <div className="space-y-4">
          {branch.steps.map((step, index) => (
            <div key={step} className="grid grid-cols-[2rem_1fr] gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${index <= active ? 'border-emerald-300/60 bg-emerald-300/10 text-emerald-100' : 'border-white/10 text-zinc-600'}`}>
                <GitBranch className="h-4 w-4" />
              </div>
              <div className={`rounded-md border p-3 ${index <= active ? 'border-emerald-300/25 bg-emerald-300/[0.06]' : 'border-white/10 bg-black/20'}`}>
                <p className="text-sm font-semibold text-zinc-100">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  )
}

function RiskView({ content, progress }: OpsSceneProps) {
  const risk = content.risk ?? { items: ['Permisos', 'Coste', 'Calidad'], level: 'medio' }
  return (
    <WindowFrame title="risk-register">
      <div className="min-h-[22rem] p-5">
        <div className="mb-4 rounded-md border border-amber-300/25 bg-amber-300/[0.07] p-4">
          <AlertTriangle className="h-5 w-5 text-amber-200" />
          <p className="mt-3 text-sm font-semibold text-zinc-100">Nivel de riesgo: {risk.level}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {risk.items.slice(0, visibleCount(progress, risk.items.length)).map(item => (
            <div key={item} className="rounded-md border border-white/10 bg-black/20 p-4">
              <ShieldCheck className="h-4 w-4 text-cyan-200" />
              <p className="mt-3 text-sm font-semibold text-zinc-100">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  )
}

export function OpsScene({ content, progress }: OpsSceneProps) {
  const mode = content.mode ?? 'decision'
  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="shrink-0 px-6 pt-5 md:px-10">
        <p className="text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">{content.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">{content.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{modeLabel[mode]} {content.label ? `/ ${content.label}` : ''}</p>
          </div>
          {content.actionLabel ? (
            <div className="rounded-md border border-accent/25 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent">
              {content.actionLabel}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-28 md:px-10">
        {mode === 'prompt' ? <PromptView content={content} progress={progress} /> : null}
        {mode === 'streaming' ? <StreamingView content={content} progress={progress} /> : null}
        {mode === 'diff' ? <DiffView content={content} progress={progress} /> : null}
        {mode === 'terminal' ? <TerminalView content={content} progress={progress} /> : null}
        {mode === 'pr-review' ? <ReviewView content={content} progress={progress} /> : null}
        {mode === 'cost' ? <CostView content={content} progress={progress} /> : null}
        {mode === 'decision' ? <DecisionView content={content} progress={progress} /> : null}
        {mode === 'pause' ? <PauseView content={content} progress={progress} /> : null}
        {mode === 'quiz' ? <QuizView content={content} progress={progress} /> : null}
        {mode === 'branch' ? <BranchView content={content} progress={progress} /> : null}
        {mode === 'risk' ? <RiskView content={content} progress={progress} /> : null}
      </div>
    </div>
  )
}
