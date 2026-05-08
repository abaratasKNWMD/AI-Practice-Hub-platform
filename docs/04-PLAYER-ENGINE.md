# Player Engine — useMoviePlayer Hook

The heart of the system is the `useMoviePlayer` hook. It manages:
- Playback state (play/pause/seek/restart)
- Timing (currentTimeMs, progress)
- Scene transitions
- Subtitle sync
- Voice synthesis coordination

## Location

```
/hooks/use-movie-player.ts
```

## Usage

```tsx
import { useMoviePlayer } from '@/hooks/use-movie-player'

// Default: uses hardcoded MOVIE_SCRIPT
const player = useMoviePlayer()

// Dynamic: uses CourseJSON from API
const player = useMoviePlayer({
  script: course.scenes,
  totalDurationMs: course.durationMs
})
```

## Return Values

```typescript
{
  // State
  isPlaying: boolean           // Currently playing?
  currentTimeMs: number        // Global time in ms
  currentScene: Scene          // Active scene object
  currentSubtitle: Subtitle | null
  voiceEnabled: boolean
  progress: number             // 0-100 overall progress
  sceneProgress: number        // 0-100 within current scene
  totalDuration: number        // Total course duration in ms

  // Actions
  play: () => void
  pause: () => void
  toggle: () => void           // Play/pause toggle
  seek: (timeMs: number) => void
  restart: () => void
  toggleVoice: () => void
}
```

## Internal Architecture

### Timing Loop

```
┌─────────────────────────────────────────────────────────┐
│  setInterval(50ms)                                      │
│  ├── elapsed = Date.now() - startTimeRef                │
│  ├── findCurrentScene(elapsed)                          │
│  ├── findCurrentSubtitle(scene, elapsed)                │
│  ├── setCurrentScene / setCurrentSubtitle               │
│  ├── prefetchAhead(elapsed) — pre-cache next TTS        │
│  └── speakSubtitle() if new subtitle                    │
└─────────────────────────────────────────────────────────┘
```

### Scene Finding Algorithm

Scenes are sorted by `startMs`. Finding current scene:

```typescript
function findCurrentScene(timeMs: number): Scene {
  // Iterate backwards — first scene where timeMs >= startMs
  for (let i = script.length - 1; i >= 0; i--) {
    if (timeMs >= script[i].startMs) return script[i]
  }
  return script[0]
}
```

### Subtitle Sync

Within a scene, find active subtitle:

```typescript
function findCurrentSubtitle(scene: Scene, timeMs: number): Subtitle | null {
  for (const sub of scene.subtitles) {
    if (timeMs >= sub.startMs && timeMs <= sub.endMs) return sub
  }
  return null
}
```

### Voice Pre-fetching

To avoid audio delay, the hook pre-fetches TTS for upcoming subtitles:

```typescript
function prefetchAhead(timeMs: number) {
  // Find subtitles that start in the next 8 seconds
  // Fetch their audio via /api/tts and cache blob URLs
}
```

### Progress Calculation

```typescript
// Overall progress
progress = (currentTimeMs / totalDuration) * 100

// Scene progress (used for animations)
sceneProgress = ((currentTimeMs - scene.startMs) / (scene.endMs - scene.startMs)) * 100
```

## Keyboard Controls

Handled in `MoviePlayer` component:

| Key | Action |
|-----|--------|
| `Space` | Toggle play/pause |
| `R` | Restart |
| `←` | Seek -10s |
| `→` | Seek +10s |

## Auto-play

The player auto-plays after 800ms on mount:

```typescript
useEffect(() => {
  const timer = setTimeout(() => play(), 800)
  return () => clearTimeout(timer)
}, [play])
```

## Dynamic Script Loading

When `options.script` changes (e.g., new course loaded via API), the hook resets:

```typescript
const firstSceneId = options?.script?.[0]?.id
useEffect(() => {
  if (options?.script?.length > 0) {
    setCurrentScene(options.script[0])
    setCurrentTimeMs(0)
  }
}, [firstSceneId])
```
