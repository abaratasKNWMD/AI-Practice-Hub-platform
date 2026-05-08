# CourseJSON Schema — The Contract

This is the single JSON format that:
1. The 3-agent pipeline outputs
2. The player reads and renders
3. You can hand-write for custom courses

## Full Interface

```typescript
interface CourseJSON {
  id: string                    // URL-safe slug: "rag-explained-10min"
  title: string                 // Display title
  description: string           // 1-2 sentence summary
  template: CourseTemplate      // "technical" | "sales" | "onboarding" | "executive"
  durationPreset: DurationPreset // 5 | 10 | 15 | 20 (minutes)
  durationMs: number            // Exact duration in ms (e.g. 600000 for 10min)
  voice: string                 // TTS voice ID (e.g. "es-ES-AlvaroNeural")
  author: string
  createdAt: string             // ISO date
  chapters: CourseChapter[]     // Navigation markers
  scenes: Scene[]               // The actual content
}

interface CourseChapter {
  id: string
  label: string                 // Short label for timeline
  startMs: number               // Jump point
}

interface Scene {
  id: string                    // Unique ID: "scene-001"
  name: string                  // Display name in controls
  startMs: number               // When scene starts
  endMs: number                 // When scene ends
  type: SceneType               // Which component to render
  content: object               // Type-specific content (see below)
  subtitles: Subtitle[]         // Voice + text overlay
}

interface Subtitle {
  text: string                  // What is spoken/shown
  startMs: number               // Global timestamp
  endMs: number
}

type SceneType = 
  | "title"      // Opening screen
  | "concept"    // Key concept explanation
  | "compare"    // Side-by-side comparison
  | "linear"     // Linear-style task card
  | "thinking"   // AI reasoning animation
  | "coding"     // Code editor with typing
  | "preview"    // UI/dashboard preview
  | "error"      // Error + fix scenario
  | "finale"     // Summary + CTA
```

## Duration Presets

| Preset | Duration (ms) | Recommended Scenes |
|--------|---------------|-------------------|
| 5 min  | 300,000       | 6 scenes          |
| 10 min | 600,000       | 10 scenes         |
| 15 min | 900,000       | 14 scenes         |
| 20 min | 1,200,000     | 18 scenes         |

## Templates

Each template has a suggested scene sequence and voice tone:

### `technical`
For: AI courses, APIs, documentation
Sequence: title → concept → linear → compare → coding → thinking → concept → coding → error → finale
Voice: pedagogical

### `sales`
For: Product demos, commercial pitches
Sequence: title → concept → compare → linear → thinking → concept → preview → finale
Voice: persuasive

### `onboarding`
For: User onboarding, employee training
Sequence: title → concept → linear → coding → linear → thinking → concept → linear → finale
Voice: friendly

### `executive`
For: C-level presentations, ROI, KPIs
Sequence: title → concept → compare → linear → thinking → compare → concept → finale
Voice: authoritative

## Example CourseJSON

```json
{
  "id": "rag-explained-10min",
  "title": "RAG: Retrieval Augmented Generation",
  "description": "Learn how RAG connects LLMs to your knowledge base",
  "template": "technical",
  "durationPreset": 10,
  "durationMs": 600000,
  "voice": "es-ES-AlvaroNeural",
  "author": "AI Team",
  "createdAt": "2024-01-15T10:00:00Z",
  "chapters": [
    { "id": "ch1", "label": "Intro", "startMs": 0 },
    { "id": "ch2", "label": "Concepts", "startMs": 60000 },
    { "id": "ch3", "label": "Code", "startMs": 300000 }
  ],
  "scenes": [
    {
      "id": "scene-001",
      "name": "Intro",
      "startMs": 0,
      "endMs": 12000,
      "type": "title",
      "content": {
        "title": "RAG explicado en 10 min",
        "subtitle": "De documentos a respuestas inteligentes",
        "tag": "AI / LLMs"
      },
      "subtitles": [
        { "text": "Bienvenidos a este curso sobre RAG", "startMs": 1000, "endMs": 4000 },
        { "text": "Retrieval Augmented Generation", "startMs": 5000, "endMs": 9000 }
      ]
    }
  ]
}
```
