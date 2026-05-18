import { EdgeTTS } from 'edge-tts-universal'
import { NextRequest, NextResponse } from 'next/server'

// Server-side in-memory cache to avoid re-generating the same text
const audioCache = new Map<string, Buffer>()
const allowedVoices = new Set([
  'es-ES-AlvaroNeural',
  'es-ES-ElviraNeural',
])

export const runtime = 'nodejs'

function safeProsody(value: string | null, fallback: string, unit: '%' | 'Hz') {
  if (!value) return fallback
  const pattern = unit === '%' ? /^[+-]?\d{1,2}%$/ : /^[+-]?\d{1,3}Hz$/
  return pattern.test(value) ? value : fallback
}

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('text')
  if (!text || text.trim().length === 0) {
    return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  }

  const requestedVoice = req.nextUrl.searchParams.get('voice')
  const voice = requestedVoice && allowedVoices.has(requestedVoice) ? requestedVoice : 'es-ES-AlvaroNeural'
  const rate = safeProsody(req.nextUrl.searchParams.get('rate'), '+5%', '%')
  const pitch = safeProsody(req.nextUrl.searchParams.get('pitch'), '+0Hz', 'Hz')
  const cacheKey = `${voice}|${rate}|${pitch}|${text.trim().toLowerCase()}`

  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!
    return new NextResponse(cached, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'X-Voice': voice,
        'X-Voice-Rate': rate,
        'X-Voice-Pitch': pitch,
      },
    })
  }

  try {
    // EdgeTTS(text, voice, prosodyOptions) — server-side Node.js only
    const tts = new EdgeTTS(text.trim(), voice, {
      rate,
      pitch,
      volume: '+0%',
    })

    const result = await tts.synthesize()
    const audioBuffer = Buffer.from(await result.audio.arrayBuffer())

    // Keep cache bounded at 300 entries
    if (audioCache.size >= 300) {
      const firstKey = audioCache.keys().next().value
      if (firstKey !== undefined) audioCache.delete(firstKey)
    }
    audioCache.set(cacheKey, audioBuffer)

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'X-Voice': voice,
        'X-Voice-Rate': rate,
        'X-Voice-Pitch': pitch,
      },
    })
  } catch (err) {
    console.error('[TTS] Error generating audio:', err)
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 })
  }
}
