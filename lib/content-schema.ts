import { z } from 'zod'

export const levelSchema = z.enum(['orientation', 'basic', 'medium', 'advanced', 'ultra', 'enterprise'])

export const trackSchema = z.object({
  id: z.string(),
  vendor: z.string(),
  title: z.string(),
  status: z.enum(['active', 'soon']),
  summary: z.string(),
  href: z.string(),
  accent: z.string(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
})

export const materialSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  courseId: z.string().optional(),
  href: z.string(),
  summary: z.string(),
})

export const courseMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  code: z.string(),
  level: levelSchema,
  duration: z.string(),
  summary: z.string(),
  deckUrl: z.string().optional(),
  videoSlugs: z.array(z.string()),
  exerciseIds: z.array(z.string()),
  materialIds: z.array(z.string()),
  status: z.enum(['ready', 'draft']),
  outcomes: z.array(z.string()),
})

export const exerciseMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  level: levelSchema,
  courseId: z.string(),
  durationMin: z.number(),
  surface: z.string(),
  recommendedModel: z.string(),
  permissionMode: z.string(),
  estimatedCost: z.string(),
  briefing: z.string(),
  tasks: z.array(z.string()),
  hints: z.array(z.string()),
  solution: z.string(),
  materialIds: z.array(z.string()),
  videoSlug: z.string().optional(),
  difficulty: z.enum(['starter', 'practice', 'pro', 'enterprise']),
  type: z.enum(['lab', 'template', 'review', 'automation', 'capstone']),
})

export const workshopMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  audience: z.string(),
  challengeIds: z.array(z.string()),
  videoSlugs: z.array(z.string()),
  facilitatorNotes: z.array(z.string()),
  outputs: z.array(z.string()),
  instructorPackHref: z.string().optional(),
  minuteGuideHref: z.string().optional(),
  demoHref: z.string().optional(),
  promptsHref: z.string().optional(),
})

export type Track = z.infer<typeof trackSchema>
export type CourseMeta = z.infer<typeof courseMetaSchema>
export type ExerciseMeta = z.infer<typeof exerciseMetaSchema>
export type WorkshopMeta = z.infer<typeof workshopMetaSchema>
export type MaterialMeta = z.infer<typeof materialSchema>
export type Level = z.infer<typeof levelSchema>
