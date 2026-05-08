'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AlertOctagon, AlertTriangle, Users, Clock, FileCode, Wrench } from 'lucide-react'

interface SentryData {
  id: string
  title: string
  file: string
  line: number
  occurrences: number
  users: number
  first: string
  trace: string[]
  context: string
}

interface LinearFix {
  ticketId: string
  title: string
  description: string
}

interface ErrorContent {
  tag?: string
  sentry: SentryData
  linearFix: LinearFix
  fix: string
}

interface ErrorSceneProps {
  content: ErrorContent
  progress: number
}

// Simple code tokenizer for the diff
function DiffLine({ line }: { line: string }) {
  const isRemoved = line.startsWith('// Antes')|| line.startsWith('<Kpi') && !line.includes('?.')
  const isAdded = line.startsWith('// Después') || line.includes('?.') || line.includes('?? 0') || line.includes('?? 0') || line.includes('!data.kpis') || line.includes('Empty')
  const isComment = line.startsWith('//')

  return (
    <div className={`flex text-xs font-mono leading-relaxed px-3 py-0.5 rounded ${
      isAdded && !isComment ? 'bg-green-500/10 text-green-400' :
      isRemoved && !isComment ? 'bg-red-500/10 text-red-400' :
      isComment ? 'text-zinc-500 italic' :
      'text-zinc-300'
    }`}>
      <span className="select-none w-4 shrink-0 text-zinc-600 mr-2">
        {isAdded && !isComment ? '+' : isRemoved && !isComment ? '-' : ' '}
      </span>
      <span className="whitespace-pre">{line}</span>
    </div>
  )
}

export function ErrorScene({ content, progress }: ErrorSceneProps) {
  const fixScrollRef = useRef<HTMLDivElement>(null)
  const linearScrollRef = useRef<HTMLDivElement>(null)

  // Phase 1 (0-30%): Sentry alert appears
  // Phase 2 (30-60%): Linear ticket for fix
  // Phase 3 (60-100%): The fix code types out
  const showSentry = progress >= 0
  const showLinear = progress >= 30
  const showFix = progress >= 58

  const fixLines = content.fix.split('\n')
  const fixProgress = showFix ? Math.max(0, (progress - 58) / 42) : 0
  const visibleFixLines = Math.floor(fixProgress * fixLines.length * 1.1)
  const visibleFix = fixLines.slice(0, Math.min(fixLines.length, visibleFixLines))

  const descLen = showLinear
    ? Math.floor(Math.max(0, (progress - 30) / 28) * content.linearFix.description.length * 1.1)
    : 0
  const visibleDesc = content.linearFix.description.slice(0, descLen)

  useEffect(() => {
    fixScrollRef.current?.scrollTo({ top: fixScrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleFixLines])

  useEffect(() => {
    linearScrollRef.current?.scrollTo({ top: linearScrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [descLen])

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background px-4 md:px-10 lg:px-16 py-8 pb-28 gap-6">
      {content.tag && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono tracking-widest text-muted-foreground uppercase shrink-0"
        >
          {content.tag}
        </motion.p>
      )}

      {/* ── Sentry alert ── */}
      {showSentry && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="shrink-0 rounded-xl border border-red-500/30 bg-red-500/5 overflow-hidden"
        >
          {/* Sentry header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-red-500/20 bg-red-500/10">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-xs font-mono text-red-400 font-semibold">Sentry — Error en produccion</span>
            <span className="ml-auto text-xs font-mono text-red-400/60">{content.sentry.id}</span>
          </div>

          <div className="p-4 space-y-3">
            {/* Error title */}
            <p className="text-sm font-mono text-red-300 font-semibold leading-snug">
              {content.sentry.title}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {content.sentry.occurrences.toLocaleString('es-ES')} ocurrencias
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {content.sentry.users} usuarios afectados
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {content.sentry.first}
              </span>
            </div>

            {/* File + line */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <FileCode className="w-3.5 h-3.5" />
              <span>{content.sentry.file}</span>
              <span className="text-muted-foreground/50">:</span>
              <span className="text-accent">{content.sentry.line}</span>
            </div>

            {/* Stack trace */}
            <div className="rounded-lg bg-zinc-950 border border-border p-3">
              {content.sentry.trace.map((line, i) => (
                <p key={i} className={`text-xs font-mono ${i === 0 ? 'text-red-400' : 'text-zinc-500'}`}>
                  {line}
                </p>
              ))}
            </div>

            {/* Code context */}
            <div className="rounded-lg bg-zinc-950 border border-border p-3">
              <p className="text-xs font-mono text-zinc-300 whitespace-pre">{content.sentry.context}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Linear fix ticket ── */}
      {showLinear && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="shrink-0 rounded-xl border border-accent/30 bg-accent/5 overflow-hidden"
        >
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-accent/20 bg-accent/10">
            <Wrench className="w-4 h-4 text-accent shrink-0" />
            <span className="text-xs font-mono text-accent font-semibold">Linear — Ticket de fix</span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">{content.linearFix.ticketId}</span>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">{content.linearFix.title}</p>
            <div
              ref={linearScrollRef}
              className="max-h-40 overflow-y-auto text-xs font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed"
            >
              {visibleDesc}
              {descLen < content.linearFix.description.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-1.5 h-3.5 bg-accent align-middle ml-0.5"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── The fix code ── */}
      {showFix && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="shrink-0 rounded-xl border border-border overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-muted-foreground">
              {content.sentry.file}
            </span>
          </div>
          <div
            ref={fixScrollRef}
            className="bg-zinc-950 p-3 overflow-y-auto max-h-64"
          >
            {visibleFix.map((line, i) => (
              <DiffLine key={i} line={line} />
            ))}
            {visibleFixLines < fixLines.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-2 h-3.5 bg-green-400 align-middle ml-5"
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
