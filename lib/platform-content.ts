import { promises as fs } from 'fs'
import path from 'path'
import { learningOsSchema, type LearningOs } from './platform-schema'

const platformRoot = path.join(process.cwd(), 'public', 'content', 'platform')

export async function getLearningOs(): Promise<LearningOs> {
  const raw = await fs.readFile(path.join(platformRoot, 'learning-os.json'), 'utf-8')
  return learningOsSchema.parse(JSON.parse(raw))
}
