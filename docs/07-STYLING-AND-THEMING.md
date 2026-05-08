# Styling & Theming

The player uses Tailwind CSS with CSS custom properties for theming.

## Color System

All colors use semantic tokens defined in `globals.css`:

```css
:root {
  --background: 0 0% 7%;          /* Near black */
  --foreground: 0 0% 95%;         /* Near white */
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 60%;
  --accent: 142 76% 46%;          /* Green accent */
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;       /* Red for errors */
  --border: 0 0% 15%;
  --card: 0 0% 9%;
}
```

## Typography

- **Headlines**: `font-bold`, large sizes (`text-5xl` to `text-8xl`)
- **Body**: `text-base md:text-lg`, `leading-relaxed`
- **Code**: `font-mono`, `text-[13px]`
- **Labels**: `text-xs font-mono tracking-widest uppercase`

## Animation Library

All animations use `framer-motion`:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>

// Scene transitions
<AnimatePresence mode="wait">
  <motion.div
    key={scene.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
```

## Common Patterns

### Typing Cursor

```tsx
<motion.span
  animate={{ opacity: [1, 0, 1] }}
  transition={{ duration: 0.6, repeat: Infinity }}
  className="inline-block w-2 h-4 bg-accent"
/>
```

### Progress-based Reveals

```tsx
// Show element when progress > 80%
const showHighlight = progress > 80

<motion.div
  animate={{ opacity: showHighlight ? 1 : 0 }}
  transition={{ duration: 0.5 }}
>
```

### Typed Text Effect

```tsx
// Reveal characters based on progress
const bodyLen = Math.floor((progress / 100) * text.length * 1.1)
const visibleText = text.slice(0, bodyLen)
```

### Staggered List Items

```tsx
const visibleCount = Math.floor(progress / 100 * items.length)
const visibleItems = items.slice(0, visibleCount)

{visibleItems.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35 }}
  >
```

## Layout Structure

### Full-screen Player

```tsx
<div className="relative w-full h-screen bg-background overflow-hidden">
  {/* Scene layer - fills screen */}
  <div className="absolute inset-0">
    {renderScene(currentScene)}
  </div>

  {/* Subtitles - positioned above controls */}
  <div className="absolute bottom-[108px] left-0 right-0 z-30">
    <Subtitles />
  </div>

  {/* Controls bar - fixed at bottom */}
  <div className="absolute bottom-0 left-0 right-0 z-20">
    <Controls />
  </div>
</div>
```

### Scene Content Area

Most scenes follow this pattern:

```tsx
<div className="flex flex-col h-full overflow-hidden bg-background">
  {/* Scrollable content */}
  <div className="flex-1 overflow-y-auto px-6 md:px-16 py-10 pb-28">
    {/* Content here - pb-28 leaves room for controls */}
  </div>
</div>
```

## Code Editor Styling (CodingScene)

```tsx
// Window chrome
<div className="rounded-lg border border-border overflow-hidden">
  {/* Title bar with traffic lights */}
  <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-border">
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
  </div>
  
  {/* Code area */}
  <div className="bg-zinc-950 p-4 font-mono text-[13px]">
```

## Responsive Breakpoints

- `md:` — 768px (tablet)
- `lg:` — 1024px (desktop)

Common patterns:
```css
px-6 md:px-16 lg:px-32   /* Progressive padding */
text-3xl md:text-4xl      /* Scaling headlines */
hidden lg:flex            /* Hide on mobile */
```

## Z-Index Layers

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Scene | 0 | Scene content |
| Controls | 20 | Bottom bar |
| Subtitles | 30 | Text overlay |
