# Scene Types Reference

Each scene type has a specific `content` schema. The component uses `progress` (0-100%) to animate reveals.

---

## `title`

Opening screen with large title, subtitle and tag.

**Component**: `components/movie/scenes/title-scene.tsx`

**Content Schema**:
```typescript
{
  title: string      // Main headline
  subtitle: string   // Secondary text
  tag: string        // Small label (e.g. "AI / LLMs")
}
```

**Animation**: Title fades in immediately, subtitle at 40%, tag at 65%.

---

## `concept`

Key concept with typed body text and bullet points.

**Component**: `components/movie/scenes/concept-scene.tsx`

**Content Schema**:
```typescript
{
  tag?: string         // Optional category label
  title: string        // Concept name
  body: string         // 2-4 sentences (typed out character by character)
  highlight?: string   // Optional callout box (appears at 80%)
  points?: string[]    // Bullet points (appear after body finishes)
}
```

**Animation**: Body text is "typed" based on progress. Points fade in one by one. Highlight appears last.

---

## `compare`

Two-column comparison with steps and totals.

**Component**: `components/movie/scenes/compare-scene.tsx`

**Content Schema**:
```typescript
{
  tag?: string
  left: {
    label: string                    // Column header (e.g. "Sin RAG")
    color: "destructive" | "accent"  // Red or green theme
    steps: Array<{
      icon: string                   // Lucide icon name (e.g. "AlertTriangle", "Check")
      text: string
    }>
    total: string                    // Summary line
  }
  right: {
    label: string
    color: "destructive" | "accent"
    steps: Array<{ icon: string, text: string }>
    total: string
  }
}
```

**Available Icons**: `FileText`, `MessageSquare`, `Code`, `GitPullRequest`, `AlertTriangle`, `TicketCheck`, `Zap`, `Code2`, `Eye`, `Check`

**Animation**: Steps reveal one by one based on progress. Totals appear at 85%.

---

## `linear`

Linear-style task/ticket card.

**Component**: `components/movie/scenes/linear-scene.tsx`

**Content Schema**:
```typescript
{
  ticketId: string      // e.g. "AI-042"
  title: string         // Task title
  project: string       // Project name
  priority: string      // "Low" | "Medium" | "High" | "Urgent"
  assignee: string
  status: string        // "Todo" | "In Progress" | "Done"
  labels: string[]      // Tags
  description: string   // Markdown-style description
}
```

**Animation**: Card slides in, elements fade based on progress.

---

## `thinking`

AI reasoning animation — thoughts appear one by one.

**Component**: `components/movie/scenes/thinking-scene.tsx`

**Content Schema**:
```typescript
{
  tag?: string
  title?: string
  thoughts: Array<{
    ms: number      // Relative milliseconds when thought appears
    text: string    // The thought/step
    done: boolean   // Checkbox state
  }>
}
```

**Animation**: Each thought fades in when `sceneProgress` reaches its `ms` threshold.

---

## `coding`

Syntax-highlighted code editor with typing animation.

**Component**: `components/movie/scenes/coding-scene.tsx`

**Content Schema**:
```typescript
{
  tag?: string
  filename: string      // e.g. "rag_pipeline.py"
  language?: string     // For display only (highlighting is auto)
  code: string          // The source code
  commentary?: Array<{
    atLine: number      // Line number
    text: string        // Side note
  }>
}
```

**Syntax Highlighting**: Built-in tokenizer supports:
- Keywords: `import`, `export`, `const`, `function`, etc.
- Components: PascalCase identifiers
- Strings: `"..."`, `'...'`, `` `...` ``
- JSX attributes: `className`, `onClick`, etc.
- Comments: `//`, `/* */`

**Animation**: Lines reveal based on progress. Cursor blinks at end.

---

## `preview`

Dashboard/UI preview with stats.

**Component**: `components/movie/scenes/preview-scene.tsx`

**Content Schema**:
```typescript
{
  tag?: string
  title: string
  description: string
  items?: Array<{
    label: string
    value: string
  }>
}
```

**Note**: Current implementation renders a hardcoded dashboard demo. Items are optional stats overlay.

---

## `error`

Sentry-style error with stack trace and fix.

**Component**: `components/movie/scenes/error-scene.tsx`

**Content Schema**:
```typescript
{
  tag?: string
  sentry: {
    id: string              // e.g. "SENTRY-1042"
    title: string           // Error message
    file: string            // File path
    line: number
    occurrences: number
    users: number
    first: string           // "hace 2 horas"
    trace: string[]         // Stack trace lines
    context: string         // Code snippet
  }
  linearFix: {
    ticketId: string
    title: string
    description: string
  }
  fix: string               // Before/after code
}
```

**Animation**: Error alert appears first, then ticket, then fix code.

---

## `finale`

Closing screen with summary cards and CTA.

**Component**: `components/movie/scenes/finale-scene.tsx`

**Content Schema**:
```typescript
{
  title: string
  summary: Array<{
    number: string    // "01", "02", etc.
    label: string     // Key takeaway title
    body: string      // Explanation
  }>
  cta: string         // Call to action text
}
```

**Animation**: Summary cards appear one by one, CTA fades in at the end.
