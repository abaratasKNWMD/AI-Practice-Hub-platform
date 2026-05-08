'use client'

import { motion } from 'framer-motion'

interface SummaryItem {
  number: string
  label: string
  body: string
}

interface FinaleContent {
  title: string
  summary: SummaryItem[]
  cta: string
}

interface FinaleSceneProps {
  content: FinaleContent
  progress: number
}

export function FinaleScene({ content, progress }: FinaleSceneProps) {
  const visibleItems = Math.floor((progress / 100) * (content.summary.length + 0.9))
  const showCta = progress > 80

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background px-6 md:px-16 lg:px-32 py-10 pb-28">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6"
      >
        Resumen
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-balance"
      >
        {content.title}
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {content.summary.map((item, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i < visibleItems ? 1 : 0, y: i < visibleItems ? 0 : 12 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2"
          >
            <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">
              {item.number}
            </span>
            <p className="text-base font-semibold text-foreground">{item.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </div>

      {showCta && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-accent/40 bg-accent/5 px-6 py-5"
        >
          <p className="text-base md:text-lg font-semibold text-foreground text-balance">
            {content.cta}
          </p>
        </motion.div>
      )}
    </div>
  )
}
