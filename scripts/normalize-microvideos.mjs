import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')

function chunkSubtitle(text) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (!clean) return []
  if (clean.length <= 110) return [clean]
  const parts = []
  let rest = clean
  while (rest.length > 110) {
    const cut = Math.max(rest.lastIndexOf('.', 108), rest.lastIndexOf(',', 108), rest.lastIndexOf(' ', 108))
    const index = cut > 45 ? cut + 1 : 108
    parts.push(rest.slice(0, index).trim())
    rest = rest.slice(index).trim()
  }
  if (rest) parts.push(rest)
  return parts
}

function subtitleTexts(scene) {
  const fromVoice = Array.isArray(scene.voiceover) ? scene.voiceover.flatMap(chunkSubtitle) : []
  const fromSubs = Array.isArray(scene.subtitles) ? scene.subtitles.flatMap(sub => chunkSubtitle(sub.text)) : []
  const texts = [...fromVoice, ...fromSubs].filter(Boolean)
  const unique = [...new Set(texts)]
  if (unique.length >= 3) return unique.slice(0, 4)
  return [
    ...unique,
    'La pantalla debe cerrar con criterio, evidencia y coste visible.',
    'El alumno debe poder repetir este paso sin ayuda del instructor.',
  ].slice(0, 4)
}

function makeSubtitles(scene, startMs, endMs) {
  const texts = subtitleTexts(scene)
  const usableStart = startMs + 500
  const usableEnd = endMs - 500
  const slice = Math.floor((usableEnd - usableStart) / texts.length)
  return texts.map((text, index) => ({
    text,
    startMs: usableStart + index * slice,
    endMs: Math.min(
      usableEnd,
      usableStart + index * slice + Math.max(1_800, Math.min(slice - 220, Math.round((text.length / 8) * 1000))),
    ),
  }))
}

function enrichContent(scene) {
  const content = scene.content
  if (!content || typeof content !== 'object') return

  if (scene.type === 'compare') {
    if (content.left?.steps?.length < 4) {
      content.left.steps.push({ icon: 'AlertTriangle', text: 'Sin evidencia, la decision vuelve a tutoria.' })
    }
    if (content.right?.steps?.length < 4) {
      content.right.steps.push({ icon: 'Check', text: 'Cerrar con criterio, coste y validacion.' })
    }
    content.auditNote = 'Comparativa enriquecida para explicar cuando usar, cuando no usar y como cerrar.'
  }

  if (scene.type === 'thinking') {
    content.thoughts = Array.isArray(content.thoughts) ? content.thoughts : []
    while (content.thoughts.length < 5) {
      content.thoughts.push({
        ms: content.thoughts.length * 7_000,
        text: ['Elegir modelo minimo viable.', 'Revisar permisos antes de ejecutar.', 'Cerrar con evidencia y coste.'][content.thoughts.length % 3],
        done: content.thoughts.length < 3,
      })
    }
    content.auditNote = 'Pensamiento ampliado para que la pantalla tenga decision, permiso y salida.'
  }

  if (scene.type === 'concept') {
    content.points = Array.isArray(content.points) ? content.points : []
    if (content.points.length < 4) {
      content.points.push('Coste: elegir modelo y contexto antes de pedir otra iteracion.')
      content.points.push('Cierre: evidencia, decision y siguiente accion visible.')
    }
  }

  if (scene.type === 'coding' && typeof content.code === 'string' && !content.code.includes('done_when')) {
    content.code += '\n\n# Cierre operativo\ndone_when: evidencia + coste + owner\nstop_rule: parar si no hay senal nueva'
  }
}

async function main() {
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  let touched = 0

  for (const file of files) {
    const filePath = path.join(coursesDir, file)
    const course = JSON.parse(await fs.readFile(filePath, 'utf8'))
    const durationMin = course.durationMs / 60_000
    if (durationMin > 2 || !Array.isArray(course.scenes) || course.scenes.length > 4) continue

    const slice = course.durationMs / course.scenes.length
    course.scenes = course.scenes.map((scene, index) => {
      const startMs = Math.round(slice * index)
      const endMs = index === course.scenes.length - 1 ? course.durationMs : Math.round(slice * (index + 1))
      enrichContent(scene)
      return {
        ...scene,
        startMs,
        endMs,
        subtitles: makeSubtitles(scene, startMs, endMs),
        voiceover: subtitleTexts(scene),
      }
    })

    if (Array.isArray(course.chapters)) {
      course.chapters = course.chapters.map(chapter => {
        const referenced = course.scenes.find(scene => scene.id === chapter.sceneId || scene.id === chapter.id)
        return referenced ? { ...chapter, startMs: referenced.startMs } : chapter
      })
    }

    await fs.writeFile(filePath, `${JSON.stringify(course, null, 2)}\n`, 'utf8')
    touched += 1
  }

  console.log(`normalized ${touched} microvideos`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
