# TTS / Voice System

The player uses server-side text-to-speech via Microsoft Edge voices.

## Library

```
edge-tts-universal
```

This is a Node.js package that calls Microsoft's Edge TTS API. It's free, no API key required, and supports many languages/voices.

## API Endpoint

```
GET /api/tts?text=<encoded text>
```

**Location**: `/app/api/tts/route.ts`

**Response**: `audio/mpeg` binary

## Implementation

```typescript
import { EdgeTTS } from 'edge-tts-universal'

const tts = new EdgeTTS(text, 'es-ES-AlvaroNeural', {
  rate: '+5%',     // Slightly faster
  pitch: '+0Hz',
  volume: '+0%',
})

const result = await tts.synthesize()
const audioBuffer = Buffer.from(await result.audio.arrayBuffer())
```

## Server-side Caching

The API caches generated audio in memory (Map) to avoid re-generating:

```typescript
const audioCache = new Map<string, Buffer>()

// Bounded at 300 entries
if (audioCache.size >= 300) {
  audioCache.delete(audioCache.keys().next().value)
}
audioCache.set(cacheKey, audioBuffer)
```

## Client-side Flow

In `useMoviePlayer`:

1. **Pre-fetch**: When playback reaches T, fetch audio for subtitles starting at T+8s
2. **Cache**: Store blob URLs in `audioCacheRef`
3. **Play**: When subtitle becomes active, play from cache (instant) or fetch (slight delay)

```typescript
// Pre-fetch
const prefetch = (text: string) => {
  fetch(`/api/tts?text=${encodeURIComponent(text)}`)
    .then(r => r.blob())
    .then(blob => audioCacheRef.current.set(text, URL.createObjectURL(blob)))
}

// Play
const speakSubtitle = (text: string) => {
  const cached = audioCacheRef.current.get(text)
  if (cached) {
    audioRef.current.src = cached
    audioRef.current.play()
  }
}
```

## Available Voices

Some popular Microsoft Edge voices:

| Voice ID | Language | Gender |
|----------|----------|--------|
| `es-ES-AlvaroNeural` | Spanish (Spain) | Male |
| `es-ES-ElviraNeural` | Spanish (Spain) | Female |
| `es-MX-DaliaNeural` | Spanish (Mexico) | Female |
| `en-US-GuyNeural` | English (US) | Male |
| `en-US-JennyNeural` | English (US) | Female |
| `en-GB-RyanNeural` | English (UK) | Male |
| `pt-BR-FranciscaNeural` | Portuguese (Brazil) | Female |
| `fr-FR-DeniseNeural` | French | Female |
| `de-DE-ConradNeural` | German | Male |

Full list: https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support

## Prosody Options

```typescript
{
  rate: '+10%' | '-10%' | '+0%',   // Speed
  pitch: '+2Hz' | '-2Hz' | '+0Hz', // Pitch
  volume: '+10%' | '-10%' | '+0%'  // Volume
}
```

## Fallback / Mute

User can toggle voice with the volume button. When disabled:
- `voiceEnabledRef.current = false`
- `stopVoice()` is called to pause any playing audio
- Subtitles still display (visual only)

## Cleanup

On unmount, revoke all blob URLs to free memory:

```typescript
useEffect(() => {
  return () => {
    audioCacheRef.current.forEach(url => URL.revokeObjectURL(url))
    audioCacheRef.current.clear()
  }
}, [])
```
