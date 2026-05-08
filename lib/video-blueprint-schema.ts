import { z } from 'zod'

export const videoBlueprintSceneKindSchema = z.enum([
  'title',
  'concept',
  'compare',
  'linear',
  'thinking',
  'coding',
  'preview',
  'error',
  'finale',
  'prompt',
  'streaming',
  'diff',
  'terminal',
  'pr-review',
  'cost',
  'decision',
  'pause',
  'quiz',
  'branch',
  'risk',
])

export const videoBlueprintActionSchema = z.object({
  type: z.enum(['narrate', 'prompt', 'simulated-response', 'human-decision', 'tool-run', 'diff-review', 'pause', 'handoff', 'token-meter', 'model-choice', 'risk-check', 'quiz']),
  label: z.string(),
  detail: z.string(),
  expectedOutput: z.string().optional(),
}).passthrough()

export const videoBlueprintBeatSchema = z.object({
  id: z.string(),
  label: z.string(),
  kind: videoBlueprintSceneKindSchema.optional(),
  durationSec: z.number().int().positive(),
  screen: z.object({
    title: z.string().optional(),
    visual: z.string().optional(),
    content: z.unknown().optional(),
    presenterCue: z.string().optional(),
  }).passthrough().optional(),
  voiceover: z.array(z.string()).min(1).optional(),
  subtitles: z.array(z.object({
    text: z.string(),
    startSec: z.number().nonnegative(),
    endSec: z.number().positive(),
  })).optional(),
  action: videoBlueprintActionSchema.optional(),
}).passthrough()

export const videoBlueprintSceneSchema = z.object({
  id: z.string(),
  name: z.string(),
  chapterId: z.string().optional(),
  kind: videoBlueprintSceneKindSchema,
  durationSec: z.number().int().positive(),
  screen: z.object({
    title: z.string().optional(),
    visual: z.string().optional(),
    content: z.unknown(),
    presenterCue: z.string().optional(),
  }).passthrough(),
  voiceover: z.array(z.string()).min(1),
  subtitles: z.array(z.object({
    text: z.string(),
    startSec: z.number().nonnegative(),
    endSec: z.number().positive(),
  })).optional(),
  action: videoBlueprintActionSchema.optional(),
  beats: z.array(videoBlueprintBeatSchema).optional(),
})

export const videoBlueprintSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  vendor: z.enum(['codex', 'copilot', 'claude', 'platform']),
  template: z.enum(['technical', 'sales', 'onboarding', 'executive']).default('technical'),
  durationMin: z.union([z.literal(10), z.literal(20), z.literal(30), z.literal(60)]),
  voice: z.string().default('es-ES-AlvaroNeural'),
  author: z.string().default('AI Practice Hub'),
  createdAt: z.string(),
  chapters: z.array(z.object({
    id: z.string(),
    label: z.string(),
    sceneId: z.string(),
  })).min(1),
  scenes: z.array(videoBlueprintSceneSchema).min(2),
}).superRefine((blueprint, ctx) => {
  const ids = new Set(blueprint.scenes.map(scene => scene.id))
  for (const chapter of blueprint.chapters) {
    if (!ids.has(chapter.sceneId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['chapters', chapter.id],
        message: `Chapter references missing scene "${chapter.sceneId}"`,
      })
    }
  }

  const durationSec = blueprint.scenes.reduce((total, scene) => total + scene.durationSec, 0)
  const expectedSec = blueprint.durationMin * 60
  if (durationSec !== expectedSec) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['scenes'],
      message: `Scene duration sum is ${durationSec}s, expected ${expectedSec}s`,
    })
  }

  for (const scene of blueprint.scenes) {
    if (!scene.beats?.length) continue
    const beatDuration = scene.beats.reduce((total, beat) => total + beat.durationSec, 0)
    if (beatDuration !== scene.durationSec) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['scenes', scene.id, 'beats'],
        message: `Beat duration sum is ${beatDuration}s, expected ${scene.durationSec}s`,
      })
    }
  }
})

export type VideoBlueprint = z.infer<typeof videoBlueprintSchema>
export type VideoBlueprintScene = z.infer<typeof videoBlueprintSceneSchema>
export type VideoBlueprintAction = z.infer<typeof videoBlueprintActionSchema>
export type VideoBlueprintBeat = z.infer<typeof videoBlueprintBeatSchema>
