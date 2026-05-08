'use client'

import { useRef } from 'react'
import { Maximize2, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Chapter } from '@/lib/movie-script'

interface ControlsProps {
  isPlaying: boolean
  progress: number
  currentTimeMs: number
  totalDuration: number
  sceneName: string
  voiceEnabled: boolean
  chapters: Chapter[]
  onToggle: () => void
  onRestart: () => void
  onSeek: (timeMs: number) => void
  onToggleVoice: () => void
  onToggleFullscreen: () => void
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function Controls({
  isPlaying,
  progress,
  currentTimeMs,
  totalDuration,
  sceneName,
  voiceEnabled,
  chapters,
  onToggle,
  onRestart,
  onSeek,
  onToggleVoice,
  onToggleFullscreen,
}: ControlsProps) {
  const barRef = useRef<HTMLDivElement>(null)

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onSeek(((e.clientX - rect.left) / rect.width) * totalDuration)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background via-background/90 to-transparent pt-16 pb-3 px-4 md:px-6">

      {/* Chapter labels — small ticks above bar */}
      <div className="relative w-full h-5 mb-1 hidden md:block">
        {chapters.map(ch => {
          const pct = (ch.startMs / totalDuration) * 100
          return (
            <button
              key={ch.id}
              onClick={() => onSeek(ch.startMs)}
              style={{ left: `${pct}%` }}
              className="absolute -translate-x-1/2 text-[10px] font-mono text-muted-foreground/60 hover:text-muted-foreground transition-colors whitespace-nowrap"
            >
              {ch.label}
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      <div
        ref={barRef}
        onClick={handleBarClick}
        className="relative w-full h-1.5 bg-secondary rounded-full mb-3 cursor-pointer group"
      >
        {/* Chapter tick marks */}
        {chapters.slice(1).map(ch => {
          const pct = (ch.startMs / totalDuration) * 100
          return (
            <div
              key={ch.id}
              style={{ left: `${pct}%` }}
              className="absolute top-0 bottom-0 w-px bg-muted-foreground/30"
            />
          )
        })}

        {/* Filled track */}
        <div
          className="h-full bg-accent rounded-full relative transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        >
          {/* Scrubber thumb */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-accent rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2" />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-9 w-9">
            {isPlaying
              ? <Pause className="h-4 w-4" />
              : <Play className="h-4 w-4 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onRestart} className="h-9 w-9">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs font-mono text-muted-foreground ml-1 tabular-nums">
            {formatTime(currentTimeMs)} / {formatTime(totalDuration)}
          </span>
        </div>

        <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">
          {sceneName}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullscreen}
            className="h-9 w-9"
            title="Pantalla completa (F5)"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleVoice}
            className="h-9 w-9"
            title={voiceEnabled ? 'Silenciar voz' : 'Activar voz'}
          >
            {voiceEnabled
              ? <Volume2 className="h-4 w-4" />
              : <VolumeX className="h-4 w-4 text-muted-foreground/40" />}
          </Button>
          <span className="text-xs font-mono text-muted-foreground/50 hidden sm:block">
            Space · ← · →
          </span>
        </div>
      </div>
    </div>
  )
}
