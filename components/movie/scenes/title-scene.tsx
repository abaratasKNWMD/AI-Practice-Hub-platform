'use client'

import { motion } from 'framer-motion'

interface TitleContent {
  title: string
  subtitle: string
  tag: string
}

interface TitleSceneProps {
  content: TitleContent
  progress: number
}

export function TitleScene({ content, progress }: TitleSceneProps) {
  const showSubtitle = progress > 40
  const showTag = progress > 65

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background px-8 text-center gap-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showTag ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
      >
        {content.tag}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-balance"
      >
        {content.title}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="h-px w-24 bg-accent origin-center"
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 8 }}
        transition={{ duration: 0.6 }}
        className="text-lg md:text-xl text-muted-foreground text-balance"
      >
        {content.subtitle}
      </motion.p>
    </div>
  )
}
