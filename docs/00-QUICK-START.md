# CourseScript Engine — Quick Start

## What You Need to Port

### Core Files (Required)

```
/lib
├── course-schema.ts      # Types + templates + scene catalog
├── movie-script.ts       # Scene/Subtitle types + demo script

/hooks
└── use-movie-player.ts   # Playback engine

/components/movie
├── movie-player.tsx      # Main player component
├── controls.tsx          # Timeline + buttons
├── subtitles.tsx         # Text overlay
└── scenes/               # All 9 scene components
    ├── title-scene.tsx
    ├── concept-scene.tsx
    ├── compare-scene.tsx
    ├── linear-scene.tsx
    ├── thinking-scene.tsx
    ├── coding-scene.tsx
    ├── preview-scene.tsx
    ├── error-scene.tsx
    └── finale-scene.tsx

/app/api
└── tts/route.ts          # Voice synthesis
```

### Optional (Generation Pipeline)

```
/app/api/generate-course/route.ts   # 3-agent LLM pipeline
/app/crear/page.tsx                 # Creation UI
```

## Dependencies

```json
{
  "framer-motion": "^11.x",
  "edge-tts-universal": "^1.x",
  "lucide-react": "^0.x"
}
```

## Minimal Usage

```tsx
import { MoviePlayer } from '@/components/movie/movie-player'

// Option 1: Use built-in demo course
export default function Page() {
  return <MoviePlayer />
}

// Option 2: Load custom course
export default function Page() {
  const [course, setCourse] = useState(null)
  
  useEffect(() => {
    fetch('/api/courses/my-course')
      .then(r => r.json())
      .then(setCourse)
  }, [])
  
  if (!course) return <div>Loading...</div>
  return <MoviePlayer course={course} />
}
```

## Creating a Course Manually

Write a JSON file following the schema:

```json
{
  "id": "my-course",
  "title": "My Course Title",
  "durationMs": 300000,
  "scenes": [
    {
      "id": "s1",
      "name": "Intro",
      "type": "title",
      "startMs": 0,
      "endMs": 10000,
      "content": {
        "title": "Welcome",
        "subtitle": "Let's learn something",
        "tag": "Tutorial"
      },
      "subtitles": [
        { "text": "Welcome to this course", "startMs": 1000, "endMs": 4000 }
      ]
    }
  ],
  "chapters": []
}
```

## Environment Variables

For the generation pipeline (optional):
```
GROQ_API_KEY=your_groq_api_key
```

No env vars needed for the player itself — TTS uses Microsoft Edge (free, no key).

## Documentation Index

1. [Architecture Overview](./01-ARCHITECTURE.md)
2. [CourseJSON Schema](./02-COURSE-JSON-SCHEMA.md)
3. [Scene Types Reference](./03-SCENE-TYPES.md)
4. [Player Engine](./04-PLAYER-ENGINE.md)
5. [TTS/Voice System](./05-TTS-VOICE-SYSTEM.md)
6. [Generation Pipeline](./06-GENERATION-PIPELINE.md)
7. [Styling & Theming](./07-STYLING-AND-THEMING.md)

## Key Concepts

- **Scene**: A visual "slide" with a type, content, and subtitles
- **Progress**: 0-100% — drives all animations
- **SceneProgress**: 0-100% within current scene
- **Subtitles**: Timed text that triggers voice synthesis
- **Template**: Predefined scene sequence for different use cases
