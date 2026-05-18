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
    <div className="flex h-full flex-col overflow-hidden bg-background px-6 py-8 pb-24 md:px-16 md:py-10 md:pb-28 lg:px-32">
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
        className="mb-8 text-3xl font-bold text-foreground text-balance md:mb-12 md:text-5xl"
      >
        {content.title}
      </motion.h2>

      <div className="mb-8 grid gap-4 overflow-hidden md:mb-12 md:grid-cols-2 md:gap-5">
        {content.summary.map((item, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i < visibleItems ? 1 : 0, y: i < visibleItems ? 0 : 12 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col gap-2 rounded-xl border border-border bg-card p-4 md:p-5 ${i > 1 ? 'hidden md:flex' : ''}`}
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
          className="hidden rounded-xl border border-accent/40 bg-accent/5 px-6 py-5 md:block"
        >
          <p className="text-base md:text-lg font-semibold text-foreground text-balance">
            {content.cta}
          </p>
        </motion.div>
      )}
    </div>
  )
}
