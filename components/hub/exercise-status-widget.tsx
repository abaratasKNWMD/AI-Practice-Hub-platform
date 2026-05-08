'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, ClipboardCheck } from 'lucide-react'

type ExerciseStatus = 'not-started' | 'in-progress' | 'blocked' | 'submitted' | 'reviewed'

interface ExerciseStatusWidgetProps {
  exerciseId: string
}

interface ExerciseProgress {
  status: ExerciseStatus
  notes: string
  updatedAt: string
}

const STORAGE_KEY = 'ai-practice-hub.learning-os.v1'

const statuses: ExerciseStatus[] = ['not-started', 'in-progress', 'blocked', 'submitted', 'reviewed']

const labels: Record<ExerciseStatus, string> = {
  'not-started': 'No iniciado',
  'in-progress': 'En progreso',
  blocked: 'Bloqueado',
  submitted: 'Entregado',
  reviewed: 'Revisado',
}

function readExercise(exerciseId: string): ExerciseProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const state = raw ? JSON.parse(raw) : {}
    return state.exercises?.[exerciseId] ?? { status: 'not-started', notes: '', updatedAt: new Date().toISOString() }
  } catch {
    return { status: 'not-started', notes: '', updatedAt: new Date().toISOString() }
  }
}

function writeExercise(exerciseId: string, progress: ExerciseProgress) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const state = raw ? JSON.parse(raw) : {}
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      exercises: {
        ...(state.exercises ?? {}),
        [exerciseId]: progress,
      },
    }))
  } catch {
    // The widget is progressive enhancement; the page remains usable without storage.
  }
}

export function ExerciseStatusWidget({ exerciseId }: ExerciseStatusWidgetProps) {
  const [progress, setProgress] = useState<ExerciseProgress>({
    status: 'not-started',
    notes: '',
    updatedAt: new Date().toISOString(),
  })

  useEffect(() => {
    setProgress(readExercise(exerciseId))
  }, [exerciseId])

  const update = (next: Partial<ExerciseProgress>) => {
    const value = { ...progress, ...next, updatedAt: new Date().toISOString() }
    setProgress(value)
    writeExercise(exerciseId, value)
  }

  return (
    <section className="mt-6 rounded-lg border border-emerald-300/20 bg-emerald-300/[0.055] p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-50">
            <ClipboardCheck className="h-5 w-5 text-emerald-200" />
            Estado del ejercicio
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Este estado se guarda en el Learner OS y permite llevar dudas reales a tutoria.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-200" />
          {labels[progress.status]}
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[16rem_1fr]">
        <select
          value={progress.status}
          onChange={event => update({ status: event.target.value as ExerciseStatus })}
          className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-emerald-300/50"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{labels[status]}</option>
          ))}
        </select>
        <input
          value={progress.notes}
          onChange={event => update({ notes: event.target.value })}
          placeholder="Nota breve: bloqueo, evidencia, test ejecutado, duda para tutoria..."
          className="h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50"
        />
      </div>
    </section>
  )
}
