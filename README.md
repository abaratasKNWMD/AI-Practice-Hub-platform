# AI Practice Hub

Plataforma de formacion practica para Codex, GitHub Copilot y Claude.

## Que incluye

- Hub Next.js principal.
- Rutas por vendor: Codex, Copilot y Claude.
- 9 cursos HTML integrados en `public/decks`.
- 44 videos CourseScript en `public/courses`.
- Video blueprints editables en `public/video-blueprints`.
- 69 ejercicios con packs autoconsumibles en `public/exercise-packs`.
- 4 starter repos en `public/exercise-packs/starters`.
- Workshops de 1h en `public/workshop-packs`.
- Operacion, QA, versionado y auditorias en `public/content/operations` y `docs/auditorias`.

## Importante sobre los cursos

Los cursos estan dentro del hub y se sirven desde:

- `public/decks/codex/curso-01`
- `public/decks/codex/curso-02`
- `public/decks/codex/curso-03`
- `public/decks/copilot/curso-01`
- `public/decks/copilot/curso-02`
- `public/decks/copilot/curso-03`
- `public/decks/claude/curso-01`
- `public/decks/claude/curso-02`
- `public/decks/claude/curso-03`

El hub los referencia por URL publica. No hace falta subir las carpetas originales externas `01-curso-*`, `02-curso-*`, `03-curso-*` si este repo se sube completo.

## Desarrollo local

```bash
corepack enable
corepack pnpm install
corepack pnpm dev --port 3001
```

Abrir:

```text
http://localhost:3001
```

## Validacion

```bash
corepack pnpm build:videos
corepack pnpm qa:decks
corepack pnpm qa:player
corepack pnpm exec tsc --noEmit
corepack pnpm lint
corepack pnpm build
```

Con servidor local levantado:

```bash
corepack pnpm release:smoke
corepack pnpm qa:visual
```

## Estado V4

- `qa:decks`: 9 decks OK.
- `qa:player`: 8 videos largos OK.
- `release:smoke`: 41 checks OK.
- `qa:visual`: 10 screenshots OK.

