'use client'

import { motion } from 'framer-motion'
import {
  FileText, MessageSquare, Code, GitPullRequest, AlertTriangle,
  TicketCheck, Zap, Code2, Eye, Check,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  FileText, MessageSquare, Code, GitPullRequest, AlertTriangle,
  TicketCheck, Zap, Code2, Eye, Check,
  Figma: Code2,
}

interface Step {
  icon: string
  text: string
}

interface Side {
  label: string
  color: 'destructive' | 'accent'
  steps: Step[]
  total: string
}

interface CompareContent {
  tag?: string
  left: Side
  right: Side
}

interface CompareSceneProps {
  content: CompareContent
  progress: number
}

export function CompareScene({ content, progress }: CompareSceneProps) {
  const totalSteps = Math.max(content.left.steps.length, content.right.steps.length)

  // Steps reveal after 20% progress
  const stepsProgress = Math.max(0, (progress - 20) / 80)
  const visibleSteps = Math.floor(stepsProgress * (totalSteps + 0.9))

  // Total label appears near end
  const showTotal = progress > 85

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background px-6 md:px-12 lg:px-20 py-8 pb-28">
      {/* Tag */}
      {content.tag && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6 text-center"
        >
          {content.tag}
        </motion.p>
      )}

      {/* Two columns */}
      <div className="flex-1 grid grid-cols-2 gap-6 md:gap-10 min-h-0 overflow-hidden">
        {([content.left, content.right] as const).map((side, sideIdx) => {
          const isRight = sideIdx === 1
          const accentColor = isRight ? 'border-accent/40 bg-accent/5' : 'border-destructive/30 bg-destructive/5'
          const labelColor = isRight ? 'text-accent' : 'text-destructive'
          const dotColor = isRight ? 'bg-accent' : 'bg-destructive'
          const borderColor = isRight ? 'border-accent/30' : 'border-destructive/20'

          return (
            <motion.div
              key={sideIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sideIdx * 0.15 }}
              className={`flex flex-col rounded-xl border p-5 md:p-6 overflow-hidden ${accentColor}`}
            >
              {/* Column header */}
              <div className={`text-sm md:text-base font-semibold mb-5 ${labelColor}`}>
                {side.label}
              </div>

              {/* Steps */}
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {side.steps.map((step, i) => {
                  const Icon = ICON_MAP[step.icon] ?? Code
                  const isVisible = i < visibleSteps

                  return (
                    <motion.div
                      key={i}
                      animate={{ opacity: isVisible ? 1 : 0.15, x: isVisible ? 0 : (isRight ? -6 : 6) }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border flex items-center justify-center ${borderColor}`}>
                        <Icon className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-foreground/80 leading-relaxed">{step.text}</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Total */}
              {showTotal && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`mt-4 pt-4 border-t ${borderColor} flex items-center gap-2`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                  <span className={`text-sm font-semibold ${labelColor}`}>{side.total}</span>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
