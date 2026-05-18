'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Eye, Lightbulb, MousePointerClick, Sparkles } from 'lucide-react'

interface MediaBreakContent {
  vendor?: string
  kind: 'reflection' | 'meme' | 'diagram' | 'screenshot'
  title: string
  imageUrl: string
  alt?: string
  caption: string
  situation: string
  tension: string
  example: string
  action: string
  evidence: string
  decision: string
  rubric?: {
    learns: string
    does: string
    decides: string
  }
}

interface MediaBreakSceneProps {
  content: MediaBreakContent
  progress: number
}

const toneByKind: Record<MediaBreakContent['kind'], string> = {
  reflection: 'from-cyan-300/18 via-white/[0.035] to-transparent',
  meme: 'from-amber-300/18 via-white/[0.035] to-transparent',
  diagram: 'from-emerald-300/18 via-white/[0.035] to-transparent',
  screenshot: 'from-violet-300/18 via-white/[0.035] to-transparent',
}

function short(value: string, max = 96) {
  return value.length > max ? `${value.slice(0, max - 3)}...` : value
}

function ProgressPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/38">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(8, Math.min(100, value))}%` }}
          transition={{ duration: 0.45 }}
          className="h-full rounded-full bg-white/70"
        />
      </div>
    </div>
  )
}

export function MediaBreakScene({ content, progress }: MediaBreakSceneProps) {
  const showRubric = progress > 54
  const showDecision = progress > 78

  return (
    <div className="relative h-full overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className={`absolute inset-x-0 top-0 h-96 bg-gradient-to-b ${toneByKind[content.kind]}`} />

      <main className="relative grid h-full min-h-0 gap-5 px-4 pb-24 pt-5 md:px-8 md:pb-28 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/18 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white/58" />
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">
                {content.vendor ?? 'AI'} / {content.kind}
              </span>
            </div>
            <span className="rounded border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
              media break
            </span>
          </div>

          <div className="grid min-h-0 gap-4 p-4 md:grid-cols-[minmax(0,1fr)_18rem]">
            <motion.figure
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-0 overflow-hidden rounded-lg border border-white/10 bg-black/30"
            >
              <Image
                src={content.imageUrl}
                alt={content.alt ?? content.title}
                fill
                sizes="(min-width: 1280px) 60vw, 100vw"
                unoptimized
                className="object-contain"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-14">
                <p className="text-sm font-semibold leading-6 text-white">{content.caption}</p>
              </figcaption>
            </motion.figure>

            <aside className="hidden min-h-0 space-y-3 overflow-hidden md:block">
              <div className="rounded-lg border border-white/10 bg-black/18 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/38">situacion</p>
                <p className="mt-2 text-sm leading-6 text-white/76">{short(content.situation)}</p>
              </div>
              <div className="rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-amber-100/55">tension</p>
                <p className="mt-2 text-sm leading-6 text-white/78">{short(content.tension)}</p>
              </div>
              <div className="rounded-lg border border-emerald-200/20 bg-emerald-200/[0.06] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-100/55">accion</p>
                <p className="mt-2 text-sm leading-6 text-white/78">{short(content.action)}</p>
              </div>
            </aside>
          </div>
        </section>

        <aside className="hidden min-h-0 space-y-3 overflow-hidden xl:block">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/38">momento memorable</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">{content.title}</h1>
            <p className="mt-3 text-sm leading-6 text-white/62">{content.example}</p>
          </div>

          <div className="grid gap-3">
            <ProgressPill label="atencion" value={62 + progress * 0.2} />
            <ProgressPill label="transferencia" value={Math.max(12, progress)} />
          </div>

          <motion.div
            animate={{ opacity: showRubric ? 1 : 0.25, y: showRubric ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-white/58" />
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/38">rubrica</p>
            </div>
            <div className="space-y-3">
              <p className="flex gap-2 text-sm leading-6 text-white/72"><Eye className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan-200" />{content.rubric?.learns ?? content.evidence}</p>
              <p className="flex gap-2 text-sm leading-6 text-white/72"><MousePointerClick className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-200" />{content.rubric?.does ?? content.action}</p>
              <p className="flex gap-2 text-sm leading-6 text-white/72"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-200" />{content.rubric?.decides ?? content.decision}</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: showDecision ? 1 : 0.2, x: showDecision ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border border-white/10 bg-black/22 p-4"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-white/38">
              <ArrowRight className="h-3.5 w-3.5" />
              decision
            </div>
            <p className="text-sm font-semibold leading-6 text-white">{content.decision}</p>
          </motion.div>
        </aside>
      </main>
    </div>
  )
}
