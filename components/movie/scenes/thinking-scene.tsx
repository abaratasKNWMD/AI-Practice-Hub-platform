'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Thought {
  ms: number
  text: string
  done: boolean
}

interface ThinkingContent {
  tag?: string
  title?: string
  thoughts: Thought[]
}

interface ThinkingSceneProps {
  content: ThinkingContent
  progress: number
}

export function ThinkingScene({ content, progress }: ThinkingSceneProps) {
  // Scene duration is 50s. Derive elapsed ms from progress
  const sceneMs = (progress / 100) * 50000

  const visibleThoughts = content.thoughts.filter(t => sceneMs >= t.ms)
  const activeThought = visibleThoughts.at(-1)

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background px-6 md:px-16 lg:px-32 py-10 pb-28">
      {content.tag && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6"
        >
          {content.tag}
        </motion.p>
      )}

      {content.title && (
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-10"
        >
          {content.title}
        </motion.h2>
      )}

      <div className="flex flex-col gap-3">
        {content.thoughts.map((thought, i) => {
          const isVisible = sceneMs >= thought.ms
          const isActive = activeThought?.ms === thought.ms
          const isDone = isVisible && (thought.done || sceneMs >= thought.ms + 3500)

          return (
            <motion.div
              key={i}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                isActive && !isDone
                  ? 'border-accent/50 bg-accent/10'
                  : isDone
                  ? 'border-border bg-card'
                  : 'border-transparent bg-transparent'
              }`}
            >
              <div className="shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center">
                {isDone ? (
                  <Check className="w-3 h-3 text-accent" />
                ) : isActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-accent"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-muted" />
                )}
              </div>

              <span className={`text-sm md:text-base font-mono ${
                isActive && !isDone ? 'text-foreground' : isDone ? 'text-muted-foreground' : 'text-muted-foreground/20'
              }`}>
                {thought.text}
              </span>

              {isActive && !isDone && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="ml-auto shrink-0 w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {progress > 88 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-4 rounded-xl border border-accent/30 bg-accent/5"
        >
          <p className="text-sm font-mono text-accent">
            Plan completo. Iniciando generacion de codigo...
          </p>
        </motion.div>
      )}
    </div>
  )
}
