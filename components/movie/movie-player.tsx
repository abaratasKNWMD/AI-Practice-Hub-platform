'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMoviePlayer } from '@/hooks/use-movie-player'
import { Subtitles } from './subtitles'
import { Controls } from './controls'
import { TitleScene } from './scenes/title-scene'
import { LinearScene } from './scenes/linear-scene'
import { ThinkingScene } from './scenes/thinking-scene'
import { CodingScene } from './scenes/coding-scene'
import { PreviewScene } from './scenes/preview-scene'
import { FinaleScene } from './scenes/finale-scene'
import { ConceptScene } from './scenes/concept-scene'
import { CompareScene } from './scenes/compare-scene'
import { ErrorScene } from './scenes/error-scene'
import { OpsScene } from './scenes/ops-scene'
import { MediaBreakScene } from './scenes/media-break-scene'
import type {
  Scene,
  SceneType,
} from '@/lib/movie-script'
import { CHAPTERS } from '@/lib/movie-script'
import type { CourseJSON } from '@/lib/course-schema'
import type { CourseAudioManifest } from '@/lib/audio-manifest'

type AnyContent = any
const LEARNING_STORAGE_KEY = 'ai-practice-hub.learning-os.v1'

interface MoviePlayerProps {
  course?: CourseJSON
}

export function MoviePlayer({ course }: MoviePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastVideoProgressSaveRef = useRef(0)
  const [audioManifest, setAudioManifest] = useState<CourseAudioManifest | null>(null)
  const progressId = course?.id ?? 'spec-driven-dev'
  const chapters = course?.chapters ?? CHAPTERS
  const firstSubtitleLength = course?.scenes?.[0]?.subtitles?.[0]?.text?.length ?? 0
  const manifestCacheKey = course
    ? encodeURIComponent(`${course.id}-${course.durationMs}-${course.scenes?.length ?? 0}-${firstSubtitleLength}`)
    : ''

  useEffect(() => {
    let cancelled = false
    setAudioManifest(null)
    if (!course?.id) return

    fetch(`/audio/courses/${course.id}/manifest.json?v=${manifestCacheKey}`, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) return null
        return response.json() as Promise<CourseAudioManifest>
      })
      .then(manifest => {
        if (!cancelled) setAudioManifest(manifest)
      })
      .catch(() => {
        if (!cancelled) setAudioManifest(null)
      })

    return () => {
      cancelled = true
    }
  }, [course?.id, manifestCacheKey])

  const {
    isPlaying,
    currentTimeMs,
    currentScene,
    currentSubtitle,
    voiceEnabled,
    progress,
    sceneProgress,
    totalDuration,
    play,
    toggle,
    restart,
    seek,
    toggleVoice,
  } = useMoviePlayer({
    script: course?.scenes,
    totalDurationMs: course?.durationMs,
    audioManifest,
  })

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => play(), 800)
    return () => clearTimeout(timer)
  }, [play])

  useEffect(() => {
    if (typeof window === 'undefined' || totalDuration <= 0) return
    const percent = Math.min(100, Math.max(0, Math.round((currentTimeMs / totalDuration) * 100)))
    const now = Date.now()
    if (percent < 100 && now - lastVideoProgressSaveRef.current < 2000) return
    lastVideoProgressSaveRef.current = now

    try {
      const current = JSON.parse(window.localStorage.getItem(LEARNING_STORAGE_KEY) ?? '{}')
      const videos = current.videos && typeof current.videos === 'object' ? current.videos : {}
      const previous = videos[progressId]?.progress ?? 0
      window.localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify({
        ...current,
        videos: {
          ...videos,
          [progressId]: {
            progress: Math.max(previous, percent),
            updatedAt: new Date().toISOString(),
          },
        },
      }))
    } catch {
      // Progress is a convenience layer; playback must never fail because storage is unavailable.
    }
  }, [currentTimeMs, progressId, totalDuration])

  const toggleFullscreen = useCallback(() => {
    const target = containerRef.current
    if (!target) return

    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }

    void target.requestFullscreen()
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); toggle() }
      else if (e.code === 'F5') { e.preventDefault(); toggleFullscreen() }
      else if (e.code === 'KeyR') { restart() }
      else if (e.code === 'ArrowLeft') { seek(currentTimeMs - 10000) }
      else if (e.code === 'ArrowRight') { seek(currentTimeMs + 10000) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggle, toggleFullscreen, restart, seek, currentTimeMs])

  const renderScene = (scene: Scene) => {
    const c = scene.content as AnyContent
    const p = sceneProgress
    switch (scene.type as SceneType) {
      case 'title':    return <TitleScene   content={c} progress={p} />
      case 'concept':  return <ConceptScene content={c} progress={p} />
      case 'compare':  return <CompareScene content={c} progress={p} />
      case 'linear':   return <LinearScene  content={c} progress={p} />
      case 'thinking': return <ThinkingScene content={c} progress={p} />
      case 'coding':   return <CodingScene  content={c} progress={p} />
      case 'preview':  return <PreviewScene content={c} progress={p} />
      case 'error':    return <ErrorScene   content={c} progress={p} />
      case 'finale':   return <FinaleScene  content={c} progress={p} />
      case 'media-break': return <MediaBreakScene content={c} progress={p} />
      case 'prompt':
      case 'streaming':
      case 'diff':
      case 'terminal':
      case 'pr-review':
      case 'cost':
      case 'decision':
      case 'pause':
      case 'quiz':
      case 'branch':
      case 'risk':
        return <OpsScene content={c} progress={p} />
      default:         return null
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden font-sans">
      {/* Scene layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {renderScene(currentScene)}
        </motion.div>
      </AnimatePresence>

      {/* Subtitles — sit above controls */}
      <Subtitles subtitle={currentSubtitle} currentTimeMs={currentTimeMs} />

      {/* Controls bar */}
      <Controls
        isPlaying={isPlaying}
        progress={progress}
        currentTimeMs={currentTimeMs}
        totalDuration={totalDuration}
        sceneName={currentScene.name}
        voiceEnabled={voiceEnabled}
        chapters={chapters}
        onToggle={toggle}
        onRestart={restart}
        onSeek={seek}
        onToggleVoice={toggleVoice}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  )
}
