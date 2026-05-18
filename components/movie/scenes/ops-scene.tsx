'use client'

import { motion } from 'framer-motion'
import {
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Coins,
  Database,
  FileCode2,
  GitPullRequest,
  Gauge,
  Layers3,
  LockKeyhole,
  PauseCircle,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
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
  source?: Record<string, unknown>
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

const modeTone: Record<OpsContent['mode'], string> = {
  prompt: 'from-cyan-400/25 via-cyan-300/5 to-transparent',
  streaming: 'from-emerald-400/25 via-emerald-300/5 to-transparent',
  diff: 'from-violet-400/25 via-violet-300/5 to-transparent',
  terminal: 'from-sky-400/25 via-sky-300/5 to-transparent',
  'pr-review': 'from-amber-400/25 via-amber-300/5 to-transparent',
  cost: 'from-lime-400/25 via-lime-300/5 to-transparent',
  decision: 'from-fuchsia-400/25 via-fuchsia-300/5 to-transparent',
  pause: 'from-orange-400/25 via-orange-300/5 to-transparent',
  quiz: 'from-teal-400/25 via-teal-300/5 to-transparent',
  branch: 'from-blue-400/25 via-blue-300/5 to-transparent',
  risk: 'from-rose-400/25 via-rose-300/5 to-transparent',
}

function visibleCount(progress: number, length: number) {
  return Math.min(length, Math.max(1, Math.ceil((progress / 100) * (length + 0.4))))
}

function short(value: unknown, fallback = 'pendiente', max = 94) {
  if (typeof value === 'string') return value.length > max ? `${value.slice(0, max - 3)}...` : value
  if (Array.isArray(value)) return short(value.join(', '), fallback, max)
  if (value && typeof value === 'object') return short(Object.values(value).flat().join(' / '), fallback, max)
  return fallback
}

function sourceRows(source?: Record<string, unknown>) {
  if (!source) return []
  return Object.entries(source)
    .filter(([, value]) => value !== undefined && value !== null)
    .slice(0, 5)
    .map(([key, value]) => ({ key, value: short(value, 'dato', 82) }))
}

function vendorName(vendor?: string) {
  if (!vendor) return 'AI'
  return vendor.charAt(0).toUpperCase() + vendor.slice(1)
}

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/10">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-white/70" />
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/55">{title}</p>
      </div>
      {children}
    </section>
  )
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-white/45">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(6, value))}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-white/70"
        />
      </div>
    </div>
  )
}

function WindowFrame({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
      <div className="hidden w-12 shrink-0 flex-col items-center gap-4 border-r border-white/10 bg-white/[0.035] py-4 md:flex">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <div className="mt-4 h-24 w-px bg-white/10" />
        <FileCode2 className="h-4 w-4 text-white/35" />
        <Terminal className="h-4 w-4 text-white/35" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.045] px-4 py-3">
          <span className="truncate text-xs font-mono text-white/50">{title}</span>
          <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-white/40">live</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        {footer ? <div className="border-t border-white/10 bg-white/[0.035] px-4 py-3">{footer}</div> : null}
      </div>
    </div>
  )
}

function vendorFiles(content: OpsContent) {
  const vendor = content.vendor ?? ''
  if (vendor.includes('copilot')) return ['.github/copilot-instructions.md', 'src/cart/total.ts', 'tests/cart/total.spec.ts', 'pull_request.md']
  if (vendor.includes('claude')) return ['CLAUDE.md', '.claude/skills/review/SKILL.md', '.claude/hooks/pretool.json', 'mcp.inventory.json']
  if (vendor.includes('codex')) return ['AGENTS.md', 'src/auth/validate-login.ts', 'tests/auth/login.spec.ts', '.codex/config.toml']
  return ['route-map.json', 'workshop-script.md', 'feedback-loop.json', 'release-checklist.md']
}

function vendorSurface(content: OpsContent) {
  const vendor = content.vendor ?? ''
  if (vendor.includes('copilot')) return 'VS Code / Copilot Chat'
  if (vendor.includes('claude')) return 'Claude Code / Skills / MCP'
  if (vendor.includes('codex')) return 'Codex CLI / Cloud task'
  return 'AI Practice Hub'
}

function RealisticIDEView({ content, progress }: OpsSceneProps) {
  const files = vendorFiles(content)
  const activeFile = files[Math.min(files.length - 1, Math.floor((progress / 100) * files.length))]
  const prompt = content.prompt ?? content.actionDetail ?? 'Define objetivo, contexto, restricciones y evidencia esperada.'
  const response = content.response ?? ['Analisis de contexto.', 'Plan verificable.', 'Cierre con evidencia.']
  const diff = content.diff ?? ['+ done_when = "test + review + coste"']
  const terminal = content.terminal ?? ['$ pnpm test', 'PASS escenario principal']
  const codeLines = [
    `// ${vendorSurface(content)}`,
    `// ${short(content.title, 'tarea operativa', 70)}`,
    '',
    ...prompt.split('\n').slice(0, 6),
    '',
    ...diff.slice(0, 4),
  ]
  const visibleCode = codeLines.slice(0, visibleCount(progress, codeLines.length))
  const visibleTerminal = terminal.slice(0, visibleCount(progress, terminal.length))

  return (
    <WindowFrame title={`${vendorSurface(content)} / ${activeFile}`} footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="grid h-full min-h-0 bg-[#0d1117] lg:grid-cols-[12rem_minmax(0,1fr)_16rem]">
        <aside className="hidden border-b border-white/10 bg-[#161b22] p-3 lg:block lg:border-b-0 lg:border-r">
          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">Explorer</p>
          <div className="space-y-1.5">
            {files.map((file, index) => (
              <div key={file} className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs ${file === activeFile ? 'bg-cyan-300/12 text-cyan-100' : 'text-white/55'}`}>
                <FileCode2 className="h-3.5 w-3.5" />
                <span className="truncate">{file}</span>
                {index < visibleCount(progress, files.length) ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300" /> : null}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded border border-white/10 bg-black/20 p-2.5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Run context</p>
            <p className="mt-2 text-xs leading-5 text-white/65">{short(content.label ?? content.actionDetail, 'alcance acotado', 74)}</p>
          </div>
        </aside>

        <section className="grid min-h-0 grid-rows-[1fr_9rem]">
          <div className="overflow-hidden p-4 font-mono text-[13px] leading-6">
            {visibleCode.map((line, index) => (
              <div key={`${line}-${index}`} className="grid grid-cols-[2.5rem_1fr] gap-3">
                <span className="select-none text-right text-white/20">{String(index + 1).padStart(2, '0')}</span>
                <span className={line.startsWith('+') ? 'text-emerald-300' : line.startsWith('-') ? 'text-red-300' : line.startsWith('//') ? 'text-white/35' : 'text-zinc-100'}>
                  {line || ' '}
                </span>
              </div>
            ))}
            {progress < 96 ? <span className="ml-14 inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" /> : null}
          </div>
          <div className="overflow-hidden border-t border-white/10 bg-black/35 p-3 font-mono text-xs leading-6">
            {visibleTerminal.map((line, index) => (
              <div key={`${line}-${index}`} className={line.includes('PASS') || line.includes('✓') || line.includes('checked') ? 'text-emerald-300' : line.startsWith('$') ? 'text-cyan-200' : 'text-white/65'}>
                {line}
              </div>
            ))}
          </div>
        </section>

        <aside className="hidden overflow-hidden border-t border-white/10 bg-[#161b22] p-3 lg:block lg:border-l lg:border-t-0">
          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">AI panel</p>
          <div className="space-y-3">
            {response.slice(0, visibleCount(progress, response.length)).map((line, index) => (
              <motion.div key={`${line}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded border border-emerald-300/20 bg-emerald-300/[0.07] p-3">
                <Bot className="mb-2 h-4 w-4 text-emerald-200" />
                <p className="text-xs leading-5 text-white/78">{short(line, 'respuesta verificable', 112)}</p>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>
    </WindowFrame>
  )
}

function GitHubPRReviewView({ content, progress }: OpsSceneProps) {
  const findings = content.review ?? [{ severity: 'note', text: 'Review sin findings bloqueantes.' }]
  const checks = ['lint', 'unit tests', 'security scan', 'cost ledger']
  return (
    <WindowFrame title="github.com/org/repo/pull/128/files" footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="h-full min-h-0 overflow-hidden bg-[#0d1117] p-4 text-white">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs text-white/45">Pull request #128</p>
            <h2 className="mt-1 text-2xl font-semibold">{short(content.title, 'PR revisable', 90)}</h2>
          </div>
          <div className="rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">Ready for review</div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
          <section className="space-y-3">
            {findings.slice(0, visibleCount(progress, findings.length)).map((finding, index) => (
              <motion.div key={`${finding.severity}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-md border border-white/10 bg-[#161b22] ${index > 0 ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <GitPullRequest className="h-4 w-4 text-violet-300" />
                  <span className="rounded bg-amber-300/10 px-2 py-0.5 text-xs text-amber-100">{finding.severity}</span>
                  <span className="text-xs text-white/45">src/module/{index + 1}.ts</span>
                </div>
                <p className="px-4 py-4 text-sm leading-6 text-white/78">{finding.text}</p>
              </motion.div>
            ))}
          </section>

          <aside className="hidden space-y-3 md:block">
            <Panel title="checks" icon={CheckCircle2}>
              <div className="space-y-3">
                {checks.map((check, index) => (
                  <div key={check} className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${progress > index * 20 ? 'bg-emerald-300' : 'bg-white/15'}`} />
                    <span className="text-sm text-white/72">{check}</span>
                    <span className="ml-auto text-xs text-white/35">{progress > index * 20 ? 'pass' : 'wait'}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="merge decision" icon={ShieldCheck}>
              <p className="text-sm leading-6 text-white/72">Aprobar solo si los findings tienen ruta, severidad, evidencia y coste registrado.</p>
            </Panel>
          </aside>
        </div>
      </div>
    </WindowFrame>
  )
}

function MCPInventoryBoardView({ content, progress }: OpsSceneProps) {
  const riskItems = content.risk?.items ?? ['Permisos', 'Coste', 'Contexto', 'Evidencia']
  const connectors = ['repo', 'docs', 'issues', 'ci', 'secrets', 'metrics']
  return (
    <WindowFrame title="mcp.inventory.board" footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="h-full min-h-0 overflow-hidden p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/35">Enterprise RAG / MCP</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Inventario de contexto y permisos</h2>
          </div>
          <span className="rounded border border-rose-300/25 bg-rose-300/10 px-3 py-2 text-xs text-rose-100">riesgo {content.risk?.level ?? 'medio'}</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {connectors.map((connector, index) => {
            const active = progress > index * 12
            return (
              <motion.div key={connector} animate={{ opacity: active ? 1 : 0.35 }} className={`rounded-lg border border-white/10 bg-white/[0.045] p-4 ${index > 1 ? 'hidden md:block' : ''}`}>
                <div className="mb-4 flex items-center justify-between">
                  <Database className="h-5 w-5 text-cyan-200" />
                  <span className={`rounded px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${index === 4 ? 'bg-rose-300/10 text-rose-100' : 'bg-emerald-300/10 text-emerald-100'}`}>
                    {index === 4 ? 'blocked' : 'read-only'}
                  </span>
                </div>
                <p className="font-semibold text-white">{connector}.mcp</p>
                <p className="mt-2 text-xs leading-5 text-white/58">{riskItems[index % riskItems.length]}</p>
                <div className="mt-4 space-y-2">
                  <Meter label="scope" value={active ? 78 : 18} />
                  <Meter label="owner" value={active ? 88 - index * 4 : 14} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </WindowFrame>
  )
}

function ModelCostCockpitView({ content, progress }: OpsSceneProps) {
  const cost = content.cost ?? { model: 'modelo estandar', tokens: 'medio', permission: 'readonly', stopRule: 'parar sin evidencia' }
  const models = ['fast', 'standard', 'strong']
  const selectedIndex = Math.min(models.length - 1, Math.floor((progress / 100) * models.length))
  return (
    <WindowFrame title="model-cost-cockpit" footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="grid h-full min-h-0 gap-4 p-5 lg:grid-cols-[1fr_17rem]">
        <section className="grid gap-4 md:grid-cols-3">
          {models.map((model, index) => {
            const selected = cost.model.toLowerCase().includes(model) || index === selectedIndex
            return (
              <motion.div key={model} className={`rounded-lg border p-4 ${index !== selectedIndex ? 'hidden md:block' : ''} ${selected ? 'border-lime-300/45 bg-lime-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                <Sparkles className={`h-5 w-5 ${selected ? 'text-lime-200' : 'text-white/35'}`} />
                <p className="mt-4 text-lg font-semibold text-white">{model}</p>
                <p className="mt-2 text-xs leading-5 text-white/58">{index === 0 ? 'lectura y triaje' : index === 1 ? 'patch con contexto' : 'arquitectura y riesgo'}</p>
                <div className="mt-5 space-y-3">
                  <Meter label="calidad" value={44 + index * 22} />
                  <Meter label="coste" value={26 + index * 28} />
                </div>
              </motion.div>
            )
          })}
        </section>
        <aside className="hidden space-y-3 md:block">
          <Panel title="seleccion actual" icon={Coins}>
            <div className="space-y-3 text-sm leading-6 text-white/72">
              <p><span className="text-white/35">Modelo:</span> {cost.model}</p>
              <p><span className="text-white/35">Tokens:</span> {cost.tokens}</p>
              <p><span className="text-white/35">Permiso:</span> {cost.permission}</p>
            </div>
          </Panel>
          <Panel title="stop rule" icon={LockKeyhole}>
            <p className="text-sm leading-6 text-white/72">{cost.stopRule}</p>
          </Panel>
          <Meter label="presupuesto escena" value={Math.max(16, progress)} />
        </aside>
      </div>
    </WindowFrame>
  )
}

function SwarmOrchestrationMapView({ content, progress }: OpsSceneProps) {
  const steps = content.branch?.steps ?? ['Architect', 'Developer', 'QA', 'Review']
  const roles = ['Orquestador', 'Arquitecto', 'Developer', 'QA', 'Security', 'Instructor']
  const active = visibleCount(progress, roles.length)
  return (
    <WindowFrame title="swarm.orchestration.map" footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="h-full min-h-0 overflow-hidden p-5">
        <div className="relative mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {roles.map((role, index) => (
            <motion.div key={role} animate={{ opacity: index < active ? 1 : 0.28, y: index < active ? 0 : 8 }} className={`rounded-lg border p-4 ${index > 2 ? 'hidden md:block' : ''} ${index === 0 ? 'border-blue-300/50 bg-blue-300/10 md:col-start-2' : 'border-white/10 bg-white/[0.045]'}`}>
              <Workflow className={index === 0 ? 'h-5 w-5 text-blue-200' : 'h-5 w-5 text-white/45'} />
              <p className="mt-3 font-semibold text-white">{role}</p>
              <p className="mt-2 text-xs leading-5 text-white/58">{steps[index % steps.length]} con salida verificable y limite de permisos.</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 hidden gap-3 md:grid md:grid-cols-4">
          {['plan', 'patch', 'tests', 'signoff'].map((item, index) => (
            <div key={item} className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">handoff {index + 1}</p>
              <p className="mt-2 text-sm font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  )
}

function ExerciseResolutionScreenView({ content, progress }: OpsSceneProps) {
  const decision = content.decision
  const quiz = content.quiz
  const answers = quiz?.answers ?? decision?.options ?? ['entender', 'aplicar', 'verificar']
  const selected = quiz?.correct ?? decision?.selected ?? 1
  return (
    <WindowFrame title="exercise.resolution.screen" footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="grid h-full min-h-0 gap-4 overflow-hidden p-5 lg:grid-cols-[1fr_17rem]">
        <section>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/35">reto autoconsumible</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{quiz?.question ?? decision?.question ?? content.title}</h2>
          <div className="mt-5 grid gap-3">
            {answers.slice(0, visibleCount(progress, answers.length)).map((answer, index) => (
              <motion.div key={`${answer}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-lg border p-4 ${index === selected && progress > 65 ? 'border-emerald-300/50 bg-emerald-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${index === selected && progress > 65 ? 'border-emerald-300/60 text-emerald-100' : 'border-white/10 text-white/35'}`}>
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-6 text-white">{answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <aside className="hidden space-y-3 md:block">
          <MiniChecklist title="entrega" items={['Prompt inicial', 'Evidencia', 'Diff esperado', 'Rubrica']} progress={progress} />
          <Panel title="resolucion guiada" icon={ClipboardCheck}>
            <p className="text-sm leading-6 text-white/72">La pantalla conecta teoria, prompt, salida, criterio de evaluacion y siguiente reto.</p>
          </Panel>
        </aside>
      </div>
    </WindowFrame>
  )
}

function PauseView({ content, progress }: OpsSceneProps) {
  return (
    <WindowFrame title="instructor-pause" footer={<ArtifactFooter content={content} progress={progress} />}>
      <div className="grid h-full min-h-0 gap-4 p-6 lg:grid-cols-[1fr_17rem]">
        <div className="flex flex-col justify-center">
          <PauseCircle className="h-16 w-16 text-amber-200" />
          <p className="mt-6 text-4xl font-semibold tracking-tight text-zinc-50">Pausa de instructor</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            {content.presenterCue ?? content.actionDetail ?? 'Detener la demo y pedir al alumno que verbalice decision, evidencia y coste.'}
          </p>
        </div>
        <div className="hidden md:block">
          <MiniChecklist title="Pregunta al grupo" items={['Que sabemos?', 'Que falta?', 'Que cuesta?', 'Quien firma?']} progress={progress} />
        </div>
      </div>
    </WindowFrame>
  )
}

function MiniChecklist({ title, items, progress }: { title: string; items: string[]; progress: number }) {
  const count = visibleCount(progress, items.length)
  return (
    <Panel title={title} icon={ClipboardCheck}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${index < count ? 'border-emerald-300/55 bg-emerald-300/10 text-emerald-100' : 'border-white/10 text-white/25'}`}>
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            <span className={`text-sm ${index < count ? 'text-zinc-100' : 'text-zinc-500'}`}>{item}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function ArtifactFooter({ content, progress }: OpsSceneProps) {
  return (
    <div className="grid gap-3 text-xs text-white/55 md:grid-cols-3">
      <span>Accion: {short(content.actionLabel ?? content.actionDetail, 'revisar evidencia', 58)}</span>
      <span>Progreso escena: {Math.round(progress)}%</span>
      <span>Salida: {short(content.expectedOutput ?? content.label, 'decision verificable', 58)}</span>
    </div>
  )
}

function ContextRail({ content, progress }: OpsSceneProps) {
  const rows = sourceRows(content.source)
  return (
    <div className="h-full min-h-0 space-y-3 overflow-hidden">
      <Panel title="contexto" icon={Database}>
        <div className="space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Vendor</p>
            <p className="mt-1 text-sm font-semibold text-white">{vendorName(content.vendor)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Modo</p>
            <p className="mt-1 text-sm text-white/75">{modeLabel[content.mode]}</p>
          </div>
          <Meter label="densidad" value={78 + progress * 0.18} />
        </div>
      </Panel>
      <Panel title="datos visibles" icon={Layers3}>
        <div className="space-y-2">
          {(rows.length ? rows : [{ key: 'senal', value: short(content.actionDetail ?? content.label, 'decision operativa') }]).map(row => (
            <div key={row.key} className="border-l border-white/10 pl-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{row.key}</p>
              <p className="mt-1 text-xs leading-5 text-white/70">{row.value}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function DecisionRail({ content, progress }: OpsSceneProps) {
  const cost = content.cost
  const risk = content.risk
  const selected = content.decision?.options?.[content.decision.selected]
  return (
    <div className="h-full min-h-0 space-y-3 overflow-hidden">
      <Panel title="decision" icon={Gauge}>
        <div className="space-y-3">
          <p className="text-sm font-semibold leading-6 text-white">{short(selected ?? content.actionDetail, 'seguir con alcance actual')}</p>
          <Meter label="confianza" value={Math.max(20, progress)} />
          <Meter label="riesgo residual" value={Math.max(8, 82 - progress * 0.45)} />
        </div>
      </Panel>
      <Panel title="coste/permisos" icon={Coins}>
        <div className="space-y-3 text-xs leading-5 text-white/70">
          <p><span className="text-white/35">Modelo:</span> {short(cost?.model, 'modelo segun riesgo', 68)}</p>
          <p><span className="text-white/35">Tokens:</span> {short(cost?.tokens, 'controlado', 68)}</p>
          <p><span className="text-white/35">Permiso:</span> {short(cost?.permission, 'minimo viable', 68)}</p>
        </div>
      </Panel>
      <Panel title="riesgo" icon={LockKeyhole}>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Nivel: {risk?.level ?? 'medio'}</p>
          {(risk?.items ?? ['Coste', 'Permisos', 'Evidencia']).slice(0, 3).map(item => (
            <div key={item} className="flex items-center gap-2 text-xs text-white/65">
              <ChevronRight className="h-3 w-3 text-white/35" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function renderArtifact(content: OpsContent, progress: number) {
  const props = { content, progress }
  if (content.mode === 'prompt') return <RealisticIDEView {...props} />
  if (content.mode === 'streaming') return <RealisticIDEView {...props} />
  if (content.mode === 'diff') return <RealisticIDEView {...props} />
  if (content.mode === 'terminal') return <RealisticIDEView {...props} />
  if (content.mode === 'pr-review') return <GitHubPRReviewView {...props} />
  if (content.mode === 'cost') return <ModelCostCockpitView {...props} />
  if (content.mode === 'decision') return <ExerciseResolutionScreenView {...props} />
  if (content.mode === 'pause') return <PauseView {...props} />
  if (content.mode === 'quiz') return <ExerciseResolutionScreenView {...props} />
  if (content.mode === 'branch') return <SwarmOrchestrationMapView {...props} />
  if (content.mode === 'risk') return <MCPInventoryBoardView {...props} />
  return null
}

export function OpsScene({ content, progress }: OpsSceneProps) {
  const mode = content.mode ?? 'decision'
  return (
    <div className="relative h-full overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className={`absolute inset-x-0 top-0 h-72 bg-gradient-to-b ${modeTone[mode]}`} />

      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <header className="shrink-0 px-4 pt-4 md:px-8 md:pt-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-white/45">
            <span>{content.eyebrow}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{modeLabel[mode]}</span>
          </div>
          <div className="mt-2 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-5xl">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-5xl">{content.title}</h1>
              <p className="mt-2 hidden text-sm leading-6 text-white/62 sm:block">{content.label ?? content.actionDetail}</p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Sparkles className="h-4 w-4 text-white/55" />
              <span className="border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-semibold text-white/70">
                {content.actionLabel ?? 'evidencia visible'}
              </span>
            </div>
          </div>
        </header>

        <main className="h-full min-h-0 overflow-hidden px-4 pb-24 pt-3 md:px-8 md:pb-28 md:pt-4">
          <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[16rem_minmax(0,1fr)_17rem]">
            <div className="hidden min-h-0 xl:block">
              <ContextRail content={{ ...content, mode }} progress={progress} />
            </div>
            <div className="min-h-0 min-w-0">{renderArtifact({ ...content, mode }, progress)}</div>
            <div className="hidden min-h-0 xl:block">
              <DecisionRail content={{ ...content, mode }} progress={progress} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
