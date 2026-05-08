import { z } from 'zod'

export const roleRouteSchema = z.object({
  id: z.string(),
  role: z.string(),
  title: z.string(),
  audience: z.string(),
  objectiveIds: z.array(z.string()),
  courseIds: z.array(z.string()),
  exerciseIds: z.array(z.string()),
  workshopIds: z.array(z.string()),
  videoSlugs: z.array(z.string()),
  outcomes: z.array(z.string()),
})

export const objectiveRouteSchema = z.object({
  id: z.string(),
  title: z.string(),
  goal: z.string(),
  courseIds: z.array(z.string()),
  exerciseIds: z.array(z.string()),
  videoSlugs: z.array(z.string()),
  successMetric: z.string(),
})

export const cohortSchema = z.object({
  id: z.string(),
  name: z.string(),
  focus: z.string(),
  cadence: z.string(),
  nextSession: z.string(),
  seats: z.number().int().positive(),
  status: z.string(),
  routeIds: z.array(z.string()),
})

export const tutoringPolicySchema = z.object({
  cadence: z.string(),
  rules: z.array(z.string()),
  defaultSlots: z.array(z.string()),
})

export const badgeSchema = z.object({
  id: z.string(),
  title: z.string(),
  criteria: z.string(),
})

export const learningOsSchema = z.object({
  roleRoutes: z.array(roleRouteSchema),
  objectiveRoutes: z.array(objectiveRouteSchema),
  cohorts: z.array(cohortSchema),
  tutoringPolicy: tutoringPolicySchema,
  badges: z.array(badgeSchema),
})

export type RoleRoute = z.infer<typeof roleRouteSchema>
export type ObjectiveRoute = z.infer<typeof objectiveRouteSchema>
export type Cohort = z.infer<typeof cohortSchema>
export type TutoringPolicy = z.infer<typeof tutoringPolicySchema>
export type BadgeMeta = z.infer<typeof badgeSchema>
export type LearningOs = z.infer<typeof learningOsSchema>
