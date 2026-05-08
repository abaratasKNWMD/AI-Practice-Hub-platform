# CourseScript Engine — Architecture Overview

## What is this?

CourseScript is a system that transforms documentation into interactive video courses. It has three main parts:

1. **Generation Pipeline** — 3 LLM agents that convert text/docs into a structured JSON
2. **Player Engine** — React hook + components that render the JSON as a timed video
3. **TTS System** — Server-side voice synthesis synced to subtitles

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Upload Doc    →    3-Agent Pipeline    →    CourseJSON        │
│   (.md, .txt)        (Groq LLMs)              (saved to disk)   │
│                                                                 │
│                              ↓                                  │
│                                                                 │
│                       /player/[slug]                            │
│                              ↓                                  │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  MoviePlayer                                            │   │
│   │  ├── useMoviePlayer() hook (timing, playback)           │   │
│   │  ├── Scene Components (9 types)                         │   │
│   │  ├── Subtitles (animated text overlay)                  │   │
│   │  ├── Controls (timeline, chapters, play/pause)          │   │
│   │  └── TTS (/api/tts → edge-tts-universal)                │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
/lib
├── course-schema.ts      # Master schema: templates, scene types, CourseJSON interface
├── movie-script.ts       # Types (Scene, Subtitle) + hardcoded demo course

/hooks
└── use-movie-player.ts   # Core playback engine (timing, seek, voice sync)

/components/movie
├── movie-player.tsx      # Main wrapper, routes scene.type to component
├── controls.tsx          # Timeline, chapters, play/pause/restart
├── subtitles.tsx         # Animated subtitle overlay
└── scenes/
    ├── title-scene.tsx   # Opening screen
    ├── concept-scene.tsx # Key concept with typed text + bullet points
    ├── compare-scene.tsx # Side-by-side comparison
    ├── linear-scene.tsx  # Linear-style task card
    ├── thinking-scene.tsx # AI reasoning steps animation
    ├── coding-scene.tsx  # Syntax-highlighted code editor
    ├── preview-scene.tsx # Dashboard/UI preview
    ├── error-scene.tsx   # Sentry error + fix
    └── finale-scene.tsx  # Summary + CTA

/app/api
├── tts/route.ts          # Text-to-Speech (edge-tts-universal)
├── generate-course/route.ts  # 3-agent pipeline with SSE streaming
└── courses/[slug]/route.ts   # Serves CourseJSON from disk

/app
├── page.tsx              # Home / course catalog
├── crear/page.tsx        # Course creation UI
└── player/[slug]/page.tsx # Player page
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `framer-motion` | Scene transitions, typing animations, reveals |
| `edge-tts-universal` | Server-side TTS via Microsoft Edge voices |
| `lucide-react` | Icons for UI and scene components |
| `tailwindcss` | Styling (dark theme with CSS variables) |

## Data Flow

1. **Static Course**: `MOVIE_SCRIPT` in `lib/movie-script.ts` is the default demo
2. **Generated Course**: POST to `/api/generate-course` → writes JSON to `/public/courses/[slug].json`
3. **Playback**: `/player/[slug]` fetches JSON → passes to `useMoviePlayer({ script, totalDurationMs })` → player renders

## Timing Model

All timing is in **milliseconds from start**:

- `Scene.startMs` / `Scene.endMs` — when the scene is visible
- `Subtitle.startMs` / `Subtitle.endMs` — when subtitle + voice plays
- `sceneProgress` — 0-100% within current scene (drives animations)
- `progress` — 0-100% of total course

The hook runs a 50ms interval, computes elapsed time, finds current scene/subtitle, and triggers voice.
