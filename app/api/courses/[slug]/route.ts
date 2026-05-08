import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  // Sanitize slug — only allow alphanumeric, dash, underscore
  const safe = slug.replace(/[^a-zA-Z0-9\-_]/g, '')
  if (!safe) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })

  try {
    const filePath = path.join(process.cwd(), 'public', 'courses', `${safe}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    const course = JSON.parse(raw)
    return NextResponse.json(course)
  } catch {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }
}
