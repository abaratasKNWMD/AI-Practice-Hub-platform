'use client'

import { useMemo, useState } from 'react'
import { MessageSquareText, Send, Star } from 'lucide-react'

type FeedbackKind = 'exercise' | 'workshop'
type Vendor = 'codex' | 'copilot' | 'claude' | 'platform'

type FeedbackEntry = {
  id: string
  kind: FeedbackKind
  vendor: Vendor
  targetId: string
  score: number
  comment: string
  createdAt: string
}

const feedbackKey = 'ai-practice-hub.feedback.v1'
const usageKey = 'ai-practice-hub.usage-events.v1'

const styles = {
  codex: { icon: 'text-emerald-200', button: 'border-emerald-300/50 bg-emerald-300 text-zinc-950 hover:bg-emerald-200' },
  copilot: { icon: 'text-sky-200', button: 'border-sky-300/50 bg-sky-300 text-zinc-950 hover:bg-sky-200' },
  claude: { icon: 'text-rose-200', button: 'border-rose-300/50 bg-rose-300 text-zinc-950 hover:bg-rose-200' },
  platform: { icon: 'text-violet-200', button: 'border-violet-300/50 bg-violet-300 text-zinc-950 hover:bg-violet-200' },
} satisfies Record<Vendor, Record<string, string>>

function readJsonArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    const value = raw ? JSON.parse(raw) : []
    return Array.isArray(value) ? value as T[] : []
  } catch {
    return []
  }
}

function writeJsonArray<T>(key: string, value: T[]) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function FeedbackWidget({
  kind,
  vendor,
  targetId,
}: {
  kind: FeedbackKind
  vendor: Vendor
  targetId: string
}) {
  const [score, setScore] = useState(4)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)
  const vendorStyles = styles[vendor]

  const title = useMemo(() => (
    kind === 'exercise' ? 'Feedback post-ejercicio' : 'Feedback post-workshop'
  ), [kind])

  function submitFeedback() {
    const now = new Date().toISOString()
    const entry: FeedbackEntry = {
      id: `${kind}-${vendor}-${targetId}-${now}`,
      kind,
      vendor,
      targetId,
      score,
      comment: comment.trim(),
      createdAt: now,
    }
    const feedback = readJsonArray<FeedbackEntry>(feedbackKey)
    writeJsonArray(feedbackKey, [entry, ...feedback].slice(0, 300))
    const usage = readJsonArray<Record<string, unknown>>(usageKey)
    writeJsonArray(usageKey, [
      {
        event: 'feedback_submitted',
        kind,
        vendor,
        targetId,
        score,
        createdAt: now,
      },
      ...usage,
    ].slice(0, 1000))
    setSent(true)
  }

  return (
    <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <MessageSquareText className={`h-5 w-5 ${vendorStyles.icon}`} />
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
        Registro local para detectar dudas recurrentes, ajustar cadencia, mejorar materiales y priorizar tutorias.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map(value => (
          <button
            key={value}
            type="button"
            onClick={() => setScore(value)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md border transition ${
              value <= score ? 'border-amber-200 bg-amber-200 text-zinc-950' : 'border-white/10 bg-black/20 text-zinc-500 hover:border-white/25'
            }`}
            aria-label={`Puntuacion ${value}`}
          >
            <Star className="h-4 w-4" />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={event => {
          setComment(event.target.value)
          setSent(false)
        }}
        rows={4}
        className="mt-4 min-h-28 w-full rounded-lg border border-white/10 bg-black/25 p-3 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-white/30"
        placeholder="Que faltaba, que sobro, donde se atasco el alumno, que deberia convertirse en microvideo..."
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submitFeedback}
          className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition ${vendorStyles.button}`}
        >
          <Send className="h-4 w-4" />
          Guardar feedback
        </button>
        {sent ? <span className="text-xs font-semibold text-emerald-200">Feedback guardado localmente.</span> : null}
      </div>
    </section>
  )
}
