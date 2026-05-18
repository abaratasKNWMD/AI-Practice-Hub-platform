import { EdgeTTS } from 'edge-tts-universal'
import crypto from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import {
  audioProductionVersion,
  publicVoiceProfileCatalog,
  resolveVoiceProfile,
} from './audio-production-config.mjs'

const root = process.cwd()
const coursesDir = path.join(root, 'public', 'courses')
const audioRoot = path.join(root, 'public', 'audio', 'courses')
const subtitlesDir = path.join(root, 'public', 'subtitles', 'courses')
const cacheDir = path.join(root, '.tmp', 'audio-cache')
const defaultVoice = process.env.COURSE_VOICE ?? 'es-ES-AlvaroNeural'
const defaultRate = process.env.COURSE_VOICE_RATE ?? '+5%'
const force = process.env.AUDIO_FORCE === '1'
const only = process.env.AUDIO_ONLY?.split(',').map(item => item.trim()).filter(Boolean) ?? []

const bitrateTable = {
  V1L1: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448],
  V1L2: [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384],
  V1L3: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  V2L1: [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256],
  V2L2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
  V2L3: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
}

const sampleRateTable = {
  0: [11025, 12000, 8000],
  2: [22050, 24000, 16000],
  3: [44100, 48000, 32000],
}

function sha256Buffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

function sha256Text(text) {
  return crypto.createHash('sha256').update(text).digest('hex')
}

function safeName(value) {
  return String(value).replace(/[^a-z0-9-]+/gi, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 64) || 'scene'
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function estimateSpeechMs(text) {
  const words = (text.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) ?? []).length
  const punctuationPause = Math.max(0, (text.split(/[,.!?;:]/).length - 1) * 160)
  return Math.round(Math.max(1200, (words / 2.55) * 1000 + punctuationPause + 280))
}

function skipId3(buffer) {
  if (buffer.length > 10 && buffer.toString('ascii', 0, 3) === 'ID3') {
    const size =
      ((buffer[6] & 0x7f) << 21) |
      ((buffer[7] & 0x7f) << 14) |
      ((buffer[8] & 0x7f) << 7) |
      (buffer[9] & 0x7f)
    return 10 + size
  }
  return 0
}

function mp3DurationMs(buffer) {
  let offset = skipId3(buffer)
  let duration = 0
  let frames = 0

  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff || (buffer[offset + 1] & 0xe0) !== 0xe0) {
      offset += 1
      continue
    }

    const versionBits = (buffer[offset + 1] >> 3) & 0x03
    const layerBits = (buffer[offset + 1] >> 1) & 0x03
    const bitrateIndex = (buffer[offset + 2] >> 4) & 0x0f
    const sampleRateIndex = (buffer[offset + 2] >> 2) & 0x03
    const padding = (buffer[offset + 2] >> 1) & 0x01

    if (versionBits === 1 || layerBits === 0 || bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) {
      offset += 1
      continue
    }

    const mpeg1 = versionBits === 3
    const versionKey = mpeg1 ? 'V1' : 'V2'
    const layerName = layerBits === 3 ? 'L1' : layerBits === 2 ? 'L2' : 'L3'
    const bitrate = bitrateTable[`${versionKey}${layerName}`][bitrateIndex] * 1000
    const sampleRate = sampleRateTable[versionBits][sampleRateIndex]
    const samples = layerName === 'L1' ? 384 : layerName === 'L3' && !mpeg1 ? 576 : 1152
    const frameLength = layerName === 'L1'
      ? Math.floor(((12 * bitrate) / sampleRate + padding) * 4)
      : Math.floor((((layerName === 'L3' && !mpeg1 ? 72 : 144) * bitrate) / sampleRate) + padding)

    if (!frameLength || frameLength < 4) {
      offset += 1
      continue
    }

    duration += samples / sampleRate
    frames += 1
    offset += frameLength
  }

  return frames ? Math.round(duration * 1000) : 0
}

async function synthesize(text, profile) {
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const tts = new EdgeTTS(text, profile.voice, {
        rate: profile.rate,
        pitch: profile.pitch,
        volume: '+0%',
      })
      const result = await tts.synthesize()
      return Buffer.from(await result.audio.arrayBuffer())
    } catch (error) {
      lastError = error
      await new Promise(resolve => setTimeout(resolve, 700 * attempt))
    }
  }
  throw lastError
}

async function audioForText(text, profile) {
  const cacheKey = sha256Text(`${profile.voice}\n${profile.rate}\n${profile.pitch}\n${text}`)
  const cachePath = path.join(cacheDir, `${cacheKey}.mp3`)
  if (!force && await exists(cachePath)) return fs.readFile(cachePath)
  const buffer = await synthesize(text, profile)
  await fs.writeFile(cachePath, buffer)
  return buffer
}

function resyncScene(scene, durations) {
  if (!scene.subtitles?.length) return []
  const sceneStart = scene.startMs
  const sceneEnd = scene.endMs
  const availableStart = sceneStart + 450
  const availableEnd = sceneEnd - 300
  const availableMs = Math.max(1000, availableEnd - availableStart)
  const desiredGap = 180
  const windows = durations.map(durationMs => Math.max(1200, Math.ceil(durationMs + 260)))
  const totalNeeded = windows.reduce((sum, value) => sum + value, 0) + desiredGap * Math.max(0, windows.length - 1)
  const gap = totalNeeded > availableMs ? 45 : desiredGap
  let cursor = availableStart

  return scene.subtitles.map((subtitle, index) => {
    const duration = windows[index]
    const startMs = Math.min(Math.max(sceneStart, cursor), Math.max(sceneStart, sceneEnd - duration - 80))
    const endMs = Math.min(sceneEnd - 80, startMs + duration)
    cursor = endMs + gap
    return {
      ...subtitle,
      startMs,
      endMs,
    }
  })
}

function formatTimestamp(ms, separator) {
  const total = Math.max(0, Math.floor(ms))
  const hours = Math.floor(total / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const millis = total % 1000
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${separator}${String(millis).padStart(3, '0')}`
}

function escapeVtt(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function flattenSubtitles(course) {
  return course.scenes.flatMap(scene => scene.subtitles.map(subtitle => ({ ...subtitle, sceneId: scene.id })))
}

function toVtt(course) {
  const lines = ['WEBVTT', '', `NOTE ${course.id} - ${course.title}`, '']
  for (const [index, subtitle] of flattenSubtitles(course).entries()) {
    lines.push(String(index + 1))
    lines.push(`${formatTimestamp(subtitle.startMs, '.')} --> ${formatTimestamp(subtitle.endMs, '.')}`)
    lines.push(escapeVtt(subtitle.text))
    lines.push('')
  }
  return `${lines.join('\n')}\n`
}

function toSrt(course) {
  const lines = []
  for (const [index, subtitle] of flattenSubtitles(course).entries()) {
    lines.push(String(index + 1))
    lines.push(`${formatTimestamp(subtitle.startMs, ',')} --> ${formatTimestamp(subtitle.endMs, ',')}`)
    lines.push(subtitle.text)
    lines.push('')
  }
  return `${lines.join('\n')}\n`
}

async function processCourse(file) {
  const coursePath = path.join(coursesDir, file)
  const course = JSON.parse(await fs.readFile(coursePath, 'utf8'))
  if (only.length && !only.includes(course.id)) return null

  const courseAudioDir = path.join(audioRoot, course.id)
  await fs.mkdir(courseAudioDir, { recursive: true })
  const entriesByScene = new Map()
  const profileMap = new Map()
  let generated = 0
  let reused = 0

  for (let sceneIndex = 0; sceneIndex < course.scenes.length; sceneIndex += 1) {
    const scene = course.scenes[sceneIndex]
    const profile = resolveVoiceProfile(course, scene, {
      ...process.env,
      COURSE_VOICE: process.env.COURSE_VOICE ?? '',
      COURSE_VOICE_RATE: process.env.COURSE_VOICE_RATE ?? '',
    })
    profileMap.set(profile.id, profile)
    scene.production = {
      ...(scene.production && typeof scene.production === 'object' ? scene.production : {}),
      audioVersion: audioProductionVersion,
      voiceProfileId: profile.id,
      voice: profile.voice,
      rate: profile.rate,
      pitch: profile.pitch,
      energy: profile.energy,
      emphasis: profile.emphasis,
      pauseMs: profile.pauseMs,
      role: profile.role,
    }
    const sceneEntries = []
    for (let subtitleIndex = 0; subtitleIndex < scene.subtitles.length; subtitleIndex += 1) {
      const subtitle = scene.subtitles[subtitleIndex]
      const filename = `${String(sceneIndex + 1).padStart(3, '0')}-${safeName(scene.id)}-${String(subtitleIndex + 1).padStart(2, '0')}.mp3`
      const outputPath = path.join(courseAudioDir, filename)
      const buffer = await audioForText(subtitle.text, profile)
      const nextSha = sha256Buffer(buffer)
      if (!force && await exists(outputPath)) {
        const current = await fs.readFile(outputPath)
        if (sha256Buffer(current) === nextSha) {
          reused += 1
        } else {
          await fs.writeFile(outputPath, buffer)
          generated += 1
        }
      } else {
        await fs.writeFile(outputPath, buffer)
        generated += 1
      }

      const durationMs = mp3DurationMs(buffer) || estimateSpeechMs(subtitle.text)
      const entry = {
        sceneId: scene.id,
        sceneIndex,
        subtitleIndex,
        text: subtitle.text,
        startMs: subtitle.startMs,
        endMs: subtitle.endMs,
        audioUrl: `/audio/courses/${course.id}/${filename}?v=${nextSha.slice(0, 12)}`,
        durationMs,
        bytes: buffer.length,
        sha256: nextSha,
        voice: profile.voice,
        rate: profile.rate,
        pitch: profile.pitch,
        voiceProfileId: profile.id,
        energy: profile.energy,
        emphasis: profile.emphasis,
        pauseMs: profile.pauseMs,
        role: profile.role,
      }
      sceneEntries.push(entry)
    }
    entriesByScene.set(scene.id, sceneEntries)
  }

  const manifestEntries = []
  for (const scene of course.scenes) {
    const sceneEntries = entriesByScene.get(scene.id) ?? []
    const syncedSubtitles = resyncScene(scene, sceneEntries.map(entry => entry.durationMs))
    scene.subtitles = syncedSubtitles
    scene.voiceover = syncedSubtitles.map(subtitle => subtitle.text)
    for (const entry of sceneEntries) {
      const synced = syncedSubtitles[entry.subtitleIndex]
      manifestEntries.push({
        ...entry,
        startMs: synced?.startMs ?? entry.startMs,
        endMs: synced?.endMs ?? entry.endMs,
      })
    }
  }

  const manifest = {
    courseId: course.id,
    generatedAt: new Date().toISOString(),
    audioVersion: audioProductionVersion,
    voice: [...profileMap.values()][0]?.voice ?? course.voice ?? defaultVoice,
    rate: [...profileMap.values()][0]?.rate ?? defaultRate,
    voiceCount: new Set(manifestEntries.map(entry => entry.voice)).size,
    voiceProfileCount: profileMap.size,
    voiceProfiles: [...profileMap.values()].map(profile => ({
      id: profile.id,
      vendor: profile.vendor,
      role: profile.role,
      label: profile.label,
      voice: profile.voice,
      rate: profile.rate,
      pitch: profile.pitch,
      energy: profile.energy,
      emphasis: profile.emphasis,
      pauseMs: profile.pauseMs,
    })),
    entryCount: manifestEntries.length,
    totalAudioMs: manifestEntries.reduce((sum, entry) => sum + entry.durationMs, 0),
    entries: manifestEntries,
  }

  await fs.writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`, 'utf8')
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`
  await fs.writeFile(path.join(courseAudioDir, 'manifest.json'), manifestText, 'utf8')
  await fs.writeFile(path.join(subtitlesDir, `${course.id}.vtt`), toVtt(course), 'utf8')
  await fs.writeFile(path.join(subtitlesDir, `${course.id}.srt`), toSrt(course), 'utf8')

  return {
    id: course.id,
    entries: manifestEntries.length,
    generated,
    reused,
    manifestSha256: sha256Text(manifestText),
    voiceCount: manifest.voiceCount,
    voiceProfileCount: manifest.voiceProfileCount,
    voices: [...new Set(manifestEntries.map(entry => entry.voice))],
    totalAudioMs: manifest.totalAudioMs,
  }
}

async function main() {
  await fs.mkdir(audioRoot, { recursive: true })
  await fs.mkdir(cacheDir, { recursive: true })
  await fs.mkdir(subtitlesDir, { recursive: true })
  const files = (await fs.readdir(coursesDir)).filter(file => file.endsWith('.json')).sort()
  let totalEntries = 0
  let totalGenerated = 0
  let totalReused = 0

  for (const file of files) {
    const result = await processCourse(file)
    if (!result) continue
    totalEntries += result.entries
    totalGenerated += result.generated
    totalReused += result.reused
    console.log(`audio ${result.id}: entries=${result.entries} generated=${result.generated} reused=${result.reused}`)
  }

  const allCourseManifests = []
  for (const file of files) {
    const course = JSON.parse(await fs.readFile(path.join(coursesDir, file), 'utf8'))
    const manifestPath = path.join(audioRoot, course.id, 'manifest.json')
    if (!await exists(manifestPath)) continue
    const manifestText = await fs.readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(manifestText)
    const entries = Array.isArray(manifest.entries) ? manifest.entries : []
    allCourseManifests.push({
      id: course.id,
      manifestUrl: `/audio/courses/${course.id}/manifest.json`,
      manifestSha256: sha256Text(manifestText),
      entries: entries.length,
      voiceCount: manifest.voiceCount ?? new Set(entries.map(entry => entry.voice)).size,
      voiceProfileCount: manifest.voiceProfileCount ?? new Set(entries.map(entry => entry.voiceProfileId).filter(Boolean)).size,
      totalAudioMs: manifest.totalAudioMs ?? entries.reduce((sum, entry) => sum + (entry.durationMs ?? 0), 0),
      voices: [...new Set(entries.map(entry => entry.voice).filter(Boolean))],
      audioVersion: manifest.audioVersion,
    })
  }

  const releaseManifest = {
    audioVersion: audioProductionVersion,
    generatedAt: new Date().toISOString(),
    courseCount: allCourseManifests.length,
    entryCount: allCourseManifests.reduce((sum, item) => sum + item.entries, 0),
    generated: totalGenerated,
    reused: totalReused,
    voices: [...new Set(allCourseManifests.flatMap(item => item.voices))].sort(),
    voiceProfiles: publicVoiceProfileCatalog(),
    cachePolicy: {
      publicPath: '/audio/courses/{courseId}/{scene}-{subtitle}.mp3',
      immutable: true,
      manifestControlsVersion: true,
      regenerationTrigger: 'text, voice, rate, pitch or audioProductionVersion changes',
    },
    courses: allCourseManifests,
  }
  await fs.writeFile(path.join(audioRoot, 'audio-release-manifest.json'), `${JSON.stringify(releaseManifest, null, 2)}\n`, 'utf8')
  console.log(`audio manifests complete: courses=${files.length} entries=${totalEntries} generated=${totalGenerated} reused=${totalReused}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
