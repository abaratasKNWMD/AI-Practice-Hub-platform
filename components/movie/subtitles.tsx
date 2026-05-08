'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Subtitle } from '@/lib/movie-script'

interface SubtitlesProps {
  subtitle: Subtitle | null
}

export function Subtitles({ subtitle }: SubtitlesProps) {
  return (
    // Sits just above the controls bar (controls bar is ~100px tall)
    <div className="absolute bottom-[108px] left-0 right-0 flex justify-center px-6 pointer-events-none z-30">
      <AnimatePresence mode="wait">
        {subtitle && (
          <motion.div
            key={subtitle.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="px-5 py-2.5 bg-background/95 backdrop-blur-sm border border-border rounded-lg max-w-3xl shadow-lg"
          >
            <p className="text-base md:text-lg text-center font-medium leading-snug text-foreground">
              {subtitle.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
