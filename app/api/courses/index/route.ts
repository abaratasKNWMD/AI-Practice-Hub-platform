import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const coursesDir = path.join(process.cwd(), 'public', 'courses')
    const files = await fs.readdir(coursesDir).catch(() => [])
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'index.json')

    const courses = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const raw = await fs.readFile(path.join(coursesDir, file), 'utf-8')
          const course = JSON.parse(raw)
          // Return only metadata, not the full scene array
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            template: course.template || 'technical',
            durationPreset: course.durationPreset || 10,
            author: course.author || 'CourseScript AI',
            createdAt: course.createdAt,
          }
        } catch {
          return null
        }
      })
    )

    return NextResponse.json({ courses: courses.filter(Boolean) })
  } catch {
    return NextResponse.json({ courses: [] })
  }
}
