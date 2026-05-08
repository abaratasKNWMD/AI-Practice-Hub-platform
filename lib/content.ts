import { promises as fs } from 'fs'
import path from 'path'
import {
  courseMetaSchema,
  exerciseMetaSchema,
  materialSchema,
  trackSchema,
  workshopMetaSchema,
  type CourseMeta,
  type ExerciseMeta,
  type MaterialMeta,
  type Track,
  type WorkshopMeta,
} from './content-schema'

const contentRoot = path.join(process.cwd(), 'public', 'content')

async function readJson<T>(relativePath: string, parse: (value: unknown) => T): Promise<T> {
  const raw = await fs.readFile(path.join(contentRoot, relativePath), 'utf-8')
  return parse(JSON.parse(raw))
}

export async function getTracks(): Promise<Track[]> {
  return readJson('tracks.json', value => trackSchema.array().parse(value))
}

export async function getCodexCourses(): Promise<CourseMeta[]> {
  return readJson('codex/courses.json', value => courseMetaSchema.array().parse(value))
}

export async function getCodexExercises(): Promise<ExerciseMeta[]> {
  return readJson('codex/exercises.json', value => exerciseMetaSchema.array().parse(value))
}

export async function getCodexWorkshops(): Promise<WorkshopMeta[]> {
  return readJson('codex/workshops.json', value => workshopMetaSchema.array().parse(value))
}

export async function getCodexMaterials(): Promise<MaterialMeta[]> {
  return readJson('codex/materials.json', value => materialSchema.array().parse(value))
}

export async function getCopilotCourses(): Promise<CourseMeta[]> {
  return readJson('copilot/courses.json', value => courseMetaSchema.array().parse(value))
}

export async function getCopilotExercises(): Promise<ExerciseMeta[]> {
  return readJson('copilot/exercises.json', value => exerciseMetaSchema.array().parse(value))
}

export async function getCopilotWorkshops(): Promise<WorkshopMeta[]> {
  return readJson('copilot/workshops.json', value => workshopMetaSchema.array().parse(value))
}

export async function getCopilotMaterials(): Promise<MaterialMeta[]> {
  return readJson('copilot/materials.json', value => materialSchema.array().parse(value))
}

export async function getClaudeCourses(): Promise<CourseMeta[]> {
  return readJson('claude/courses.json', value => courseMetaSchema.array().parse(value))
}

export async function getClaudeExercises(): Promise<ExerciseMeta[]> {
  return readJson('claude/exercises.json', value => exerciseMetaSchema.array().parse(value))
}

export async function getClaudeWorkshops(): Promise<WorkshopMeta[]> {
  return readJson('claude/workshops.json', value => workshopMetaSchema.array().parse(value))
}

export async function getClaudeMaterials(): Promise<MaterialMeta[]> {
  return readJson('claude/materials.json', value => materialSchema.array().parse(value))
}

export async function getCodexCourse(id: string): Promise<CourseMeta | undefined> {
  const courses = await getCodexCourses()
  return courses.find(course => course.id === id)
}

export async function getCodexExercise(id: string): Promise<ExerciseMeta | undefined> {
  const exercises = await getCodexExercises()
  return exercises.find(exercise => exercise.id === id)
}

export async function getCodexWorkshop(id: string): Promise<WorkshopMeta | undefined> {
  const workshops = await getCodexWorkshops()
  return workshops.find(workshop => workshop.id === id)
}

export async function getCopilotCourse(id: string): Promise<CourseMeta | undefined> {
  const courses = await getCopilotCourses()
  return courses.find(course => course.id === id)
}

export async function getCopilotExercise(id: string): Promise<ExerciseMeta | undefined> {
  const exercises = await getCopilotExercises()
  return exercises.find(exercise => exercise.id === id)
}

export async function getCopilotWorkshop(id: string): Promise<WorkshopMeta | undefined> {
  const workshops = await getCopilotWorkshops()
  return workshops.find(workshop => workshop.id === id)
}

export async function getClaudeCourse(id: string): Promise<CourseMeta | undefined> {
  const courses = await getClaudeCourses()
  return courses.find(course => course.id === id)
}

export async function getClaudeExercise(id: string): Promise<ExerciseMeta | undefined> {
  const exercises = await getClaudeExercises()
  return exercises.find(exercise => exercise.id === id)
}

export async function getClaudeWorkshop(id: string): Promise<WorkshopMeta | undefined> {
  const workshops = await getClaudeWorkshops()
  return workshops.find(workshop => workshop.id === id)
}

export function byIds<T extends { id: string }>(items: T[], ids: string[]): T[] {
  const lookup = new Map(items.map(item => [item.id, item]))
  return ids.map(id => lookup.get(id)).filter((item): item is T => Boolean(item))
}
