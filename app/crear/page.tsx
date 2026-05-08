'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Zap, Clock, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { TEMPLATES, type CourseTemplate, type DurationPreset } from '@/lib/course-schema'

// ── Types ──────────────────────────────────────────────────────

interface AgentStatus {
  stage: 'analyst' | 'director' | 'writer' | 'done' | 'error'
  message: string
  progress: number
  detail?: string
}

// ── Sub-components ─────────────────────────────────────────────

function TemplateCard({
  id, label, description, selected, onClick,
}: {
  id: CourseTemplate; label: string; description: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
        selected
          ? 'border-accent bg-accent/10 text-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
      }`}
    >
      <div className="font-mono text-xs mb-1 text-accent opacity-80">{id.toUpperCase()}</div>
      <div className="font-semibold text-sm mb-1">{label}</div>
      <div className="text-xs leading-relaxed opacity-70">{description}</div>
    </button>
  )
}

function DurationButton({
  value, selected, onClick,
}: {
  value: DurationPreset; selected: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 text-sm font-mono rounded-md border transition-all duration-150 ${
        selected
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
      }`}
    >
      {value} min
    </button>
  )
}

function AgentStageRow({
  label, stage, currentStage, detail,
}: {
  label: string; stage: string; currentStage: string; detail?: string
}) {
  const stages = ['analyst', 'director', 'writer', 'done']
  const currentIdx = stages.indexOf(currentStage)
  const thisIdx = stages.indexOf(stage)
  const isDone = currentIdx > thisIdx
  const isActive = currentStage === stage
  const isPending = currentIdx < thisIdx

  return (
    <div className={`flex items-start gap-3 py-3 border-b border-border/50 last:border-0 transition-opacity duration-300 ${isPending ? 'opacity-30' : 'opacity-100'}`}>
      <div className="mt-0.5 shrink-0">
        {isDone && <CheckCircle className="w-4 h-4 text-accent" />}
        {isActive && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
          />
        )}
        {isPending && <div className="w-4 h-4 rounded-full border border-border" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-mono text-foreground">{label}</div>
        {(isActive || isDone) && detail && (
          <div className="text-xs text-muted-foreground mt-0.5 truncate">{detail}</div>
        )}
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────

export default function CrearPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [template, setTemplate] = useState<CourseTemplate>('technical')
  const [duration, setDuration] = useState<DurationPreset>(10)
  const [status, setStatus] = useState<AgentStatus | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setContent(text)
      if (!title) setTitle(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
    }
    reader.readAsText(file)
  }, [title])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setContent(text)
      if (!title) setTitle(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
    }
    reader.readAsText(file)
  }, [title])

  const handleGenerate = useCallback(async () => {
    if (!content.trim() || content.trim().length < 50) return
    setIsGenerating(true)
    setStatus({ stage: 'analyst', message: 'Iniciando pipeline de agentes...', progress: 2 })

    try {
      const res = await fetch('/api/generate-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, title: title || 'Curso sin título', template, duration }),
      })

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const event: AgentStatus = JSON.parse(line.slice(6))
            setStatus(event)
            if (event.stage === 'done' && event.detail) {
              // Redirect to player after short delay
              setTimeout(() => router.push(`/player/${event.detail}`), 800)
            }
          } catch {
            // ignore malformed JSON lines
          }
        }
      }
    } catch (err) {
      setStatus({
        stage: 'error',
        message: err instanceof Error ? err.message : 'Error desconocido',
        progress: 0,
      })
    } finally {
      setIsGenerating(false)
    }
  }, [content, title, template, duration, router])

  const canGenerate = content.trim().length >= 50 && !isGenerating

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Catálogo
        </button>
        <span className="text-xs font-mono text-muted-foreground/50">CourseScript Studio</span>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-3">
            Genera un curso
          </h1>
          <p className="text-muted-foreground text-lg">
            Sube documentación, un MD o pega texto. Tres agentes lo convierten en un curso interactivo listo para reproducir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Config ───────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Title */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Título del curso</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. RAG Architecture Deep Dive"
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/60 transition-colors text-sm"
              />
            </div>

            {/* Content input */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Contenido</label>
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="relative"
              >
                {content ? (
                  <div className="relative">
                    <Textarea
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      className="min-h-[280px] bg-card border-border font-mono text-xs text-muted-foreground resize-none focus:border-accent/60"
                      placeholder="Contenido del curso..."
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-accent/10 border border-accent/20 rounded px-2 py-1">
                      <FileText className="w-3 h-3 text-accent" />
                      <span className="text-xs font-mono text-accent">{content.length.toLocaleString()} chars</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full min-h-[280px] border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-accent/40 hover:text-foreground transition-all group cursor-pointer bg-card/50"
                  >
                    <Upload className="w-8 h-8 opacity-40 group-hover:opacity-70 transition-opacity" />
                    <div className="text-sm font-medium">Arrastra un fichero o haz click</div>
                    <div className="text-xs opacity-50">.md · .txt · .rst · .html</div>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.txt,.rst,.html,.mdx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Template */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Template</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(TEMPLATES).map(t => (
                  <TemplateCard
                    key={t.id}
                    id={t.id}
                    label={t.label}
                    description={t.description}
                    selected={template === t.id}
                    onClick={() => setTemplate(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Duración</label>
              <div className="flex gap-2">
                {([5, 10, 15, 20] as DurationPreset[]).map(d => (
                  <DurationButton key={d} value={d} selected={duration === d} onClick={() => setDuration(d)} />
                ))}
              </div>
            </div>

          </div>

          {/* ── Right: Status + CTA ─────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-8 self-start">

            {/* Agent pipeline status */}
            <div className="border border-border rounded-xl bg-card p-5">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Pipeline de agentes</div>

              <AgentStageRow
                label="Agente 1 — Analista"
                stage="analyst"
                currentStage={status?.stage || 'pending'}
                detail={status?.stage === 'analyst' ? status.detail : status ? 'Completo' : undefined}
              />
              <AgentStageRow
                label="Agente 2 — Director"
                stage="director"
                currentStage={status?.stage || 'pending'}
                detail={status?.stage === 'director' ? status.detail : undefined}
              />
              <AgentStageRow
                label="Agente 3 — Writer (paralelo)"
                stage="writer"
                currentStage={status?.stage || 'pending'}
                detail={status?.stage === 'writer' ? status.detail : undefined}
              />

              {/* Progress bar */}
              <AnimatePresence>
                {status && status.stage !== 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4"
                  >
                    <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
                      <span>{status.message}</span>
                      <span>{status.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        animate={{ width: `${status.progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              {status?.stage === 'error' && (
                <div className="mt-4 flex items-start gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono">{status.message}</p>
                </div>
              )}

              {/* Done */}
              {status?.stage === 'done' && (
                <div className="mt-4 flex items-center gap-2 text-accent">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <p className="text-xs font-mono">Redirigiendo al reproductor...</p>
                </div>
              )}
            </div>

            {/* Generate button */}
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              size="lg"
              className="w-full gap-2 font-mono"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  />
                  Generando...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generar curso
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </Button>

            {/* Metadata hint */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/50">
              <Clock className="w-3.5 h-3.5" />
              <span>~{duration === 5 ? '20' : duration === 10 ? '35' : duration === 15 ? '50' : '65'} segundos de generación</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
