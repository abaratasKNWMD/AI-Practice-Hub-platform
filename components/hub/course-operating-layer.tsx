import Link from 'next/link'
import { ArrowRight, ClipboardCheck, FileText, MonitorPlay, Route, Scale, Wallet } from 'lucide-react'
import type { CourseMeta, ExerciseMeta, MaterialMeta } from '@/lib/content-schema'

type Vendor = 'codex' | 'copilot' | 'claude'

interface CourseOperatingLayerProps {
  vendor: Vendor
  course: CourseMeta
  exercises: ExerciseMeta[]
  materials: MaterialMeta[]
  accent: 'emerald' | 'sky' | 'rose'
}

const vendorDecisionCopy: Record<Vendor, { use: string[]; avoid: string[]; model: string; cost: string }> = {
  codex: {
    use: [
      'Cuando hay que tocar repo, ejecutar checks, revisar diff o coordinar agentes.',
      'Cuando la tarea tiene criterio de terminado y evidencia objetiva.',
      'Cuando interesa guardar instrucciones de equipo en AGENTS.md, skills o MCP inventory.',
    ],
    avoid: [
      'Cuando solo necesitas una explicacion conceptual sin archivos.',
      'Cuando el alcance no esta congelado y vas a provocar reintentos caros.',
      'Cuando no puedes revisar permisos, diff o comandos antes de aceptar cambios.',
    ],
    model: 'Mini para lectura, GPT-5.4 para implementacion, GPT-5.5 para arquitectura, multimodal o alto riesgo.',
    cost: 'Coste controlado por fases: explorar, planear, editar, verificar y cerrar.',
  },
  copilot: {
    use: [
      'Cuando trabajas dentro de VS Code/GitHub y necesitas continuidad con issue, diff o PR.',
      'Cuando Ask/Edit/Agent se puede elegir por tamano y riesgo de la tarea.',
      'Cuando las instrucciones del repo reducen repeticion y premium requests.',
    ],
    avoid: [
      'Cuando Agent mode no tiene done claro ni comandos de verificacion.',
      'Cuando aceptas ghost text sin leer diff o tests.',
      'Cuando no sabes si la tarea consume premium requests de forma razonable.',
    ],
    model: 'Modelo default para flujo diario; modelos premium para razonamiento, multiarchivo y reviews profundas.',
    cost: 'Coste visible como premium requests, acciones de GitHub y reintentos por contexto pobre.',
  },
  claude: {
    use: [
      'Cuando necesitas memoria de proyecto, handoffs, skills, hooks o subagentes especialistas.',
      'Cuando el contexto estable puede vivir en CLAUDE.md en vez de repetirse en cada prompt.',
      'Cuando una automatizacion necesita reglas deterministicas antes de llamar al modelo.',
    ],
    avoid: [
      'Cuando CLAUDE.md se convierte en un vertedero de contexto.',
      'Cuando un skill todavia no representa un procedimiento repetible.',
      'Cuando un hook bloquea productividad sin explicar criterio.',
    ],
    model: 'Modelo rapido para exploracion, Sonnet/GPT equivalente para implementacion y modelo fuerte para arquitectura o evals.',
    cost: 'Coste gobernado con /usage, compactacion, memoria podada y routing por riesgo.',
  },
}

const accentClasses = {
  emerald: {
    text: 'text-emerald-200',
    border: 'border-emerald-300/25',
    bg: 'bg-emerald-300/[0.065]',
    button: 'border-emerald-300/60 bg-emerald-300 text-zinc-950 hover:bg-emerald-200',
  },
  sky: {
    text: 'text-sky-200',
    border: 'border-sky-300/25',
    bg: 'bg-sky-300/[0.065]',
    button: 'border-sky-300/60 bg-sky-300 text-zinc-950 hover:bg-sky-200',
  },
  rose: {
    text: 'text-rose-200',
    border: 'border-rose-300/25',
    bg: 'bg-rose-300/[0.065]',
    button: 'border-rose-300/60 bg-rose-300 text-zinc-950 hover:bg-rose-200',
  },
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-7 items-center rounded-md border border-white/10 bg-black/20 px-2.5 text-xs text-zinc-300">
      {children}
    </span>
  )
}

function sectionHref(vendor: Vendor, kind: 'exercises' | 'courses', id: string) {
  return `/tracks/${vendor}/${kind}/${id}`
}

export function CourseOperatingLayer({ vendor, course, exercises, materials, accent }: CourseOperatingLayerProps) {
  const tone = accentClasses[accent]
  const decision = vendorDecisionCopy[vendor]
  const routeIndex = [
    { label: 'Deck', value: course.deckUrl ? 'disponible' : 'sin deck', href: course.deckUrl },
    { label: 'Videos', value: `${course.videoSlugs.length}`, href: course.videoSlugs[0] ? `/player/${course.videoSlugs[0]}` : undefined },
    { label: 'Ejercicios', value: `${exercises.length}`, href: exercises[0] ? sectionHref(vendor, 'exercises', exercises[0].id) : undefined },
    { label: 'Materiales', value: `${materials.length}`, href: materials[0]?.href },
  ]

  const blocks = [
    {
      title: 'Bloque 1 / Contexto',
      summary: course.summary,
      close: 'El alumno debe poder explicar donde encaja este modulo y que evidencia espera producir.',
    },
    {
      title: 'Bloque 2 / Practica',
      summary: exercises.length
        ? `La practica se apoya en ${exercises.length} ejercicios: ${exercises.slice(0, 3).map(exercise => exercise.title).join(', ')}.`
        : 'Modulo conceptual: se usa para preparar criterio antes de entrar en ejercicios.',
      close: 'El cierre no es ver una demo: es dejar un entregable revisable.',
    },
    {
      title: 'Bloque 3 / Operacion',
      summary: `Materiales, videos y notas quedan conectados para que la tutoria se dedique a dudas de criterio.`,
      close: 'Si una duda se repite, debe convertirse en material, microvideo o FAQ.',
    },
  ]

  return (
    <section className="mt-10 space-y-6">
      <div className={`rounded-lg border ${tone.border} ${tone.bg} p-5 backdrop-blur-xl`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${tone.text}`}>Indice operativo del curso</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Como se consume, practica y verifica</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              Esta capa convierte el deck en una unidad autoconsumible: indice, resumen por bloque,
              decisiones de uso, coste/modelo y enlaces directos a evidencias.
            </p>
          </div>
          <Link
            href="/plataforma"
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition ${tone.button}`}
          >
            Abrir Learner OS
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {routeIndex.map(item => {
            const body = (
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <Route className={`h-4 w-4 ${tone.text}`} />
                <p className="mt-3 text-xs text-zinc-500">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-zinc-50">{item.value}</p>
              </div>
            )
            return item.href ? <Link key={item.label} href={item.href}>{body}</Link> : <div key={item.label}>{body}</div>
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-50">
            <ClipboardCheck className={`h-5 w-5 ${tone.text}`} />
            Resumen ejecutivo por bloque
          </h2>
          <div className="mt-4 space-y-3">
            {blocks.map(block => (
              <article key={block.title} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h3 className="text-sm font-semibold text-zinc-100">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{block.summary}</p>
                <p className={`mt-3 rounded-md border ${tone.border} ${tone.bg} p-3 text-xs leading-5 text-zinc-200`}>
                  Cierre: {block.close}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-50">
            <Scale className={`h-5 w-5 ${tone.text}`} />
            Checkpoints de decision
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/[0.055] p-4">
              <p className="text-sm font-semibold text-emerald-100">Cuando usar</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                {decision.use.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-amber-300/20 bg-amber-300/[0.055] p-4">
              <p className="text-sm font-semibold text-amber-100">Cuando no usar</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                {decision.avoid.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <MonitorPlay className={`h-4 w-4 ${tone.text}`} />
              <p className="mt-3 text-sm font-semibold text-zinc-100">Modelo recomendado</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{decision.model}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <Wallet className={`h-4 w-4 ${tone.text}`} />
              <p className="mt-3 text-sm font-semibold text-zinc-100">Conciencia de coste</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{decision.cost}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-50">
          <Wallet className={`h-5 w-5 ${tone.text}`} />
          Bloques practicos con modelo, permisos y coste
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {exercises.map(exercise => (
            <article key={exercise.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap gap-2">
                <Pill>{exercise.durationMin} min</Pill>
                <Pill>{exercise.recommendedModel}</Pill>
                <Pill>{exercise.permissionMode}</Pill>
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-100">{exercise.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{exercise.briefing}</p>
              <p className="mt-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-zinc-300">
                Coste: {exercise.estimatedCost}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={sectionHref(vendor, 'exercises', exercise.id)} className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition ${tone.button}`}>
                  Abrir ejercicio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {exercise.videoSlug ? (
                  <Link href={`/player/${exercise.videoSlug}`} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 hover:border-white/25">
                    Video
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-50">
          <FileText className={`h-5 w-5 ${tone.text}`} />
          Pack de prompts y materiales conectado
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {materials.slice(0, 9).map(material => (
            <Link key={material.id} href={material.href} className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-white/25 hover:bg-white/[0.06]">
              <p className="text-sm font-semibold text-zinc-100">{material.title}</p>
              <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-400">{material.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}
