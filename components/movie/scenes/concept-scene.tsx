'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ConceptContent {
  tag?: string
  title: string
  body: string
  highlight?: string
  points?: string[]
}

interface ConceptSceneProps {
  content: ConceptContent
  progress: number
}

export function ConceptScene({ content, progress }: ConceptSceneProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // How many characters of body text to reveal
  const bodyLen = Math.floor((progress / 100) * content.body.length * 1.1)
  const visibleBody = content.body.slice(0, Math.min(content.body.length, bodyLen))

  // Points appear after body is mostly done
  const bodyThreshold = 0.65
  const pointsProgress = progress > bodyThreshold * 100
    ? (progress - bodyThreshold * 100) / ((100 - bodyThreshold * 100))
    : 0
  const visiblePoints = content.points
    ? content.points.slice(0, Math.floor(pointsProgress * (content.points.length + 0.9)))
    : []

  // Highlight appears near the end
  const showHighlight = progress > 80

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleBody, visiblePoints.length])

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 md:px-16 lg:px-32 py-10 pb-28"
      >
        {/* Tag */}
        {content.tag && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6"
          >
            {content.tag}
          </motion.p>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight mb-8"
        >
          {content.title}
        </motion.h1>

        {/* Body — typed out */}
        <div className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap font-mono mb-8">
          {visibleBody}
          {bodyLen < content.body.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-accent align-middle ml-0.5"
            />
          )}
        </div>

        {/* Highlight callout */}
        {showHighlight && content.highlight && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="border-l-4 border-accent pl-5 py-2 mb-8 bg-accent/5 rounded-r-lg"
          >
            <p className="text-base md:text-lg font-semibold text-foreground">
              {content.highlight}
            </p>
          </motion.div>
        )}

        {/* Key points */}
        {visiblePoints.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-4">
              Puntos clave
            </p>
            {visiblePoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </span>
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
