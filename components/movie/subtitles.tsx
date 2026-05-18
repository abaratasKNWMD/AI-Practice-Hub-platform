'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Subtitle } from '@/lib/movie-script'

interface SubtitlesProps {
  subtitle: Subtitle | null
  currentTimeMs: number
}

function karaokeParts(text: string, progress: number) {
  let wordIndex = 0
  const totalWords = text.split(/\s+/).filter(Boolean).length
  const activeWords = Math.max(1, Math.ceil(totalWords * progress))

  return text.split(/(\s+)/).map((part, index) => {
    if (/^\s+$/.test(part)) return <span key={index}>{part}</span>
    wordIndex += 1
    return (
      <span
        key={index}
        className={wordIndex <= activeWords ? 'text-foreground' : 'text-foreground/45'}
      >
        {part}
      </span>
    )
  })
}

export function Subtitles({ subtitle, currentTimeMs }: SubtitlesProps) {
  const subtitleProgress = subtitle
    ? Math.min(1, Math.max(0, (currentTimeMs - subtitle.startMs) / Math.max(1, subtitle.endMs - subtitle.startMs)))
    : 0

  return (
    // Sits just above the controls bar (controls bar is ~100px tall)
    <div data-movie-subtitles className="absolute bottom-[108px] left-0 right-0 flex justify-center px-6 pointer-events-none z-30">
      <AnimatePresence mode="wait">
        {subtitle && (
          <motion.div
            key={subtitle.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            data-subtitle-card
            className="px-5 py-2.5 bg-background/95 backdrop-blur-sm border border-border rounded-lg max-w-3xl shadow-lg"
          >
            <p data-subtitle-text data-karaoke className="text-base md:text-lg text-center font-medium leading-snug">
              {karaokeParts(subtitle.text, subtitleProgress)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
