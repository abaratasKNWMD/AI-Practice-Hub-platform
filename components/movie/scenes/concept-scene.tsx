'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Gauge, Layers3, Route, Sparkles } from 'lucide-react'

interface ConceptContent {
  tag?: string
  title: string
  body: string
  highlight?: string
  points?: string[]
}

interface ConceptSceneProps {
  content: ConceptContent
  progress: number
}

function visibleCount(progress: number, length: number) {
  return Math.min(length, Math.max(1, Math.ceil((progress / 100) * (length + 0.2))))
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(6, value))}%` }}
          transition={{ duration: 0.45 }}
          className="h-full rounded-full bg-foreground/70"
        />
      </div>
    </div>
  )
}

function InsightPanel({ content, progress }: ConceptSceneProps) {
  const points = content.points?.length ? content.points : [
    'Elegir superficie antes que prompt.',
    'Definir evidencia antes de pedir salida.',
    'Medir coste antes de iterar.',
    'Cerrar con decision humana.',
  ]
  const count = visibleCount(progress, points.length)

  return (
    <aside className="grid gap-4">
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">lectura operativa</p>
        </div>
        <div className="space-y-4">
          <Metric label="claridad" value={72 + progress * 0.2} />
          <Metric label="evidencia" value={Math.max(12, progress)} />
          <Metric label="coste bajo control" value={Math.max(18, 92 - progress * 0.18)} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Layers3 className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">puntos que deben quedar</p>
        </div>
        <div className="space-y-3">
          {points.map((point, index) => (
            <motion.div
              key={`${point}-${index}`}
              animate={{ opacity: index < count ? 1 : 0.25, x: index < count ? 0 : 6 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${index < count ? 'border-accent/50 bg-accent/10 text-accent' : 'border-border text-muted-foreground/40'}`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm leading-6 text-foreground/75">{point}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </aside>
  )
}

export function ConceptScene({ content, progress }: ConceptSceneProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bodyLen = Math.floor((progress / 100) * content.body.length * 1.08)
  const visibleBody = content.body.slice(0, Math.min(content.body.length, bodyLen))
  const isTyping = bodyLen < content.body.length
  const showHighlight = progress > 68

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleBody])

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(128,128,128,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,.22)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <header className="px-6 pt-6 md:px-12">
          <div className="flex flex-wrap items-center gap-3">
            {content.tag ? (
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">{content.tag}</span>
            ) : null}
            <span className="h-1 w-1 rounded-full bg-muted-foreground/35" />
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <Route className="h-3.5 w-3.5" />
              decision framework
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mt-4 max-w-5xl text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
          >
            {content.title}
          </motion.h1>
        </header>

        <main className="h-full min-h-0 overflow-hidden px-4 pb-24 pt-4 md:px-12 md:pb-28 md:pt-6">
          <div className="grid h-full min-h-0 gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <section ref={scrollRef} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-secondary/50 px-5 py-3">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">nota narrada</p>
              </div>
              <div className="space-y-4 p-4 md:space-y-6 md:p-7">
                <div className="font-mono text-sm leading-7 text-foreground/80 md:text-lg md:leading-8">
                  {visibleBody}
                  {isTyping ? (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="ml-1 inline-block h-4 w-2 bg-accent align-middle"
                    />
                  ) : null}
                </div>

                {showHighlight && content.highlight ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="border-l-4 border-accent bg-accent/10 p-4 md:p-5"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">frase que debe quedar</p>
                    </div>
                    <p className="text-base font-semibold leading-7 text-foreground md:text-lg">{content.highlight}</p>
                  </motion.div>
                ) : null}
              </div>
            </section>

            <div className="hidden min-h-0 xl:block">
              <InsightPanel content={content} progress={progress} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
