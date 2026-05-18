'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock3, ListChecks } from 'lucide-react'

interface LinearContent {
  ticketId: string
  title: string
  project: string
  priority: string
  assignee: string
  status: string
  labels: string[]
  description: string
}

interface LinearSceneProps {
  content: LinearContent
  progress: number
}

export function LinearScene({ content, progress }: LinearSceneProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const descLen = Math.floor((progress / 100) * content.description.length * 1.05)
  const visibleDesc = content.description.slice(0, Math.min(content.description.length, descLen))
  const isTyping = descLen < content.description.length

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [descLen])

  const PRIORITY_COLOR: Record<string, string> = {
    High: 'text-red-400 border-red-400/30 bg-red-400/10',
    Medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    Low: 'text-green-400 border-green-400/30 bg-green-400/10',
    Urgent: 'text-red-500 border-red-500/30 bg-red-500/10',
  }
  const priorityClass = PRIORITY_COLOR[content.priority] ?? 'text-muted-foreground border-border bg-card'

  const visibleLabels = content.labels.slice(0, Math.max(1, Math.ceil((progress / 100) * content.labels.length)))

  return (
    <div className="h-full overflow-hidden bg-background px-4 py-8 pb-28 md:px-10 lg:px-16">
      <div className="grid h-full min-h-0 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-0 w-full flex-col overflow-hidden rounded-lg border border-border"
      >
        {/* Linear top bar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span className="opacity-50">linear.app</span>
            <span>/</span>
            <span>{content.project}</span>
            <span>/</span>
            <span className="text-foreground">{content.ticketId}</span>
          </div>
        </div>

        {/* Scrollable ticket body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-card p-5 md:p-6 space-y-5">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              {content.ticketId}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded border text-accent border-accent/30 bg-accent/10">
              {content.status}
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${priorityClass}`}>
              {content.priority}
            </span>
            {content.labels.map(label => (
              <span key={label} className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">
                {label}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-foreground leading-snug">
            {content.title}
          </h2>

          {/* Meta */}
          <div className="flex flex-col gap-2 text-xs font-mono text-muted-foreground border border-border rounded-lg p-3 bg-background">
            <div className="flex gap-3">
              <span className="w-20 text-muted-foreground/60">Proyecto</span>
              <span className="text-foreground">{content.project}</span>
            </div>
            <div className="flex gap-3">
              <span className="w-20 text-muted-foreground/60">Asignado</span>
              <span className="text-accent">{content.assignee}</span>
            </div>
          </div>

          {/* Description — types out */}
          <div className="border-t border-border pt-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-3">
              Descripcion
            </p>
            <div className="text-sm text-foreground/80 font-mono leading-relaxed whitespace-pre-wrap">
              {visibleDesc}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 bg-accent align-middle ml-0.5"
                />
              )}
            </div>
          </div>

          {!isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2"
            >
              <Circle className="w-2 h-2 fill-accent text-accent" />
              Spec completo - listo para ejecutar
            </motion.div>
          )}
        </div>
      </motion.div>

      <aside className="hidden min-h-0 space-y-4 xl:block">
        <section className="rounded-lg border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">criterio de practica</p>
          </div>
          <div className="space-y-3">
            {['Objetivo claro', 'Restricciones visibles', 'Evidencia esperada', 'Owner humano'].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${progress > index * 22 ? 'border-accent/40 bg-accent/10 text-accent' : 'border-border text-muted-foreground/40'}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-sm text-foreground/75">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">estado</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">prioridad</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{content.priority}</p>
            </div>
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">avance</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{Math.round(progress)}%</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {visibleLabels.map(label => (
              <span key={label} className="rounded border border-accent/25 bg-accent/10 px-2 py-1 text-xs font-mono text-accent">
                {label}
              </span>
            ))}
          </div>
        </section>
      </aside>
      </div>
    </div>
  )
}
