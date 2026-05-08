import { EdgeTTS } from 'edge-tts-universal'
import { NextRequest, NextResponse } from 'next/server'

// Server-side in-memory cache to avoid re-generating the same text
const audioCache = new Map<string, Buffer>()

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('text')
  if (!text || text.trim().length === 0) {
    return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  }

  const cacheKey = text.trim().toLowerCase()

  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!
    return new NextResponse(cached, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  }

  try {
    // EdgeTTS(text, voice, prosodyOptions) — server-side Node.js only
    const tts = new EdgeTTS(text.trim(), 'es-ES-AlvaroNeural', {
      rate: '+5%',
      pitch: '+0Hz',
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
      },
    })
  } catch (err) {
    console.error('[TTS] Error generating audio:', err)
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 })
  }
}
