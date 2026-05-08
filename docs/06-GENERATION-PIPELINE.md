# 3-Agent Generation Pipeline

The pipeline transforms raw documentation into a complete CourseJSON using 3 LLM agents.

## Endpoint

```
POST /api/generate-course
Content-Type: application/json

{
  "content": "Your documentation text...",
  "title": "Course Title",
  "template": "technical",  // or "sales", "onboarding", "executive"
  "duration": 10            // 5, 10, 15, or 20 minutes
}
```

**Response**: Server-Sent Events (SSE) stream with progress updates

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT PIPELINE (Sequential)                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Input Doc                                                      │
│      ↓                                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  AGENT 1: Analyst                                       │    │
│  │  Model: llama-3.1-8b-instant                            │    │
│  │  Task: Extract N content blocks, detect language        │    │
│  │  Output: { blocks[], detectedLanguage }                 │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              ↓                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  AGENT 2: Director                                      │    │
│  │  Model: llama-3.3-70b-versatile                         │    │
│  │  Task: Assign scene types, timestamps, write subtitles  │    │
│  │  Output: { scenes[] with timing + subtitleScript }      │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              ↓                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  AGENT 3: Writer (Sequential with delays)               │    │
│  │  Model: llama-3.1-8b-instant                            │    │
│  │  Task: Generate content object for each scene           │    │
│  │  Output: { content, subtitles } per scene               │    │
│  │  Note: 2s delay between scenes (rate limit protection)  │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              ↓                                  │
│  Write to /public/courses/[slug].json                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Agent Details

### Agent 1: Analyst

**Purpose**: Read document, extract key concepts, decide structure

**Input**:
- Raw document content (truncated to 8000 chars)
- Title
- Template preference
- Duration preset

**Output**:
```typescript
{
  blocks: Array<{
    heading: string       // Max 8 words
    body: string          // 2-4 sentences
    suggestedScene: string // Scene type
  }>,
  detectedLanguage: "es" | "en" | ...
}
```

**Rules enforced by prompt**:
- First block must be `title`
- Last block must be `finale`
- Exactly N blocks based on duration (6/10/14/18)

### Agent 2: Director

**Purpose**: Plan the visual flow, assign timestamps, write the narrative

**Input**:
- Blocks from Analyst
- Template definition
- Total duration in ms

**Output**:
```typescript
{
  scenes: Array<{
    id: string
    name: string
    type: SceneType
    startMs: number
    endMs: number
    subtitleScript: string[]  // 2-4 lines to be spoken
  }>
}
```

**Timing algorithm**: Divides total duration evenly across scenes.

### Agent 3: Writer

**Purpose**: Generate the actual content for each scene

**Input** (per scene):
- Director's scene plan
- Original block content
- Scene type schema with example

**Output**:
```typescript
{
  content: { ... },  // Matches scene type schema exactly
  subtitles: Array<{ text, startMs, endMs }>
}
```

**Critical**: The prompt enforces exact field names matching the React components.

## SSE Progress Events

```typescript
interface AgentStatus {
  stage: "analyst" | "director" | "writer" | "done" | "error"
  message: string
  progress: number  // 0-100
  detail?: string
}
```

Example stream:
```
data: {"stage":"analyst","message":"Analyzing document...","progress":10}

data: {"stage":"analyst","message":"8 blocks identified","progress":25}

data: {"stage":"director","message":"Planning visual flow...","progress":35}

data: {"stage":"director","message":"10 scenes planned","progress":50}

data: {"stage":"writer","message":"Scene 1 of 10: Intro","progress":55}

data: {"stage":"writer","message":"Scene 2 of 10: RAG Basics","progress":60}

...

data: {"stage":"done","message":"Course ready!","progress":100,"courseId":"rag-explained-10min"}
```

## Rate Limiting (Groq Free Tier)

Groq's free tier has a 12,000 TPM (tokens per minute) limit. The pipeline handles this by:

1. Using `llama-3.1-8b-instant` for Analyst and Writer (smaller, fewer tokens)
2. Sequential Writer calls with 2-second delays
3. Compact JSON in prompts (no pretty-printing)

## Output Location

Generated courses are saved to:
```
/public/courses/[slug].json
```

The slug is derived from the title (kebab-case, URL-safe).

## Error Handling

On any agent failure, the stream emits:
```json
{"stage":"error","message":"Error message","progress":0}
```

The UI should display this and allow retry.
