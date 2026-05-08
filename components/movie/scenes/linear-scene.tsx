'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Circle } from 'lucide-react'

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

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background px-4 md:px-10 lg:px-16 py-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col min-h-0 max-w-3xl mx-auto w-full rounded-xl border border-border overflow-hidden"
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
              Spec completo — listo para ejecutar
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
