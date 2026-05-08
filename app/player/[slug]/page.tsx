'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MoviePlayer } from '@/components/movie/movie-player'
import type { CourseJSON } from '@/lib/course-schema'

export default function PlayerPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [course, setCourse] = useState<CourseJSON | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const BUILTIN_SLUGS = ['spec-driven-dev']
  const isBuiltin = BUILTIN_SLUGS.includes(slug)

  useEffect(() => {
    if (!slug) return
    // Builtin courses are rendered with the hardcoded MOVIE_SCRIPT — no fetch needed
    if (isBuiltin) {
      setLoading(false)
      return
    }
    fetch(`/api/courses/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((data: CourseJSON) => {
        setCourse(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug, isBuiltin])

  if (loading) {
    return (
      <div className="w-full h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-muted-foreground">Cargando curso...</p>
      </div>
    )
  }

  if (error || (!course && !isBuiltin)) {
    return (
      <div className="w-full h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-mono text-muted-foreground">Curso no encontrado</p>
        <button
          onClick={() => router.push('/')}
          className="text-xs font-mono text-accent hover:underline"
        >
          Volver al catálogo
        </button>
      </div>
    )
  }

  return <MoviePlayer course={course ?? undefined} />
}
