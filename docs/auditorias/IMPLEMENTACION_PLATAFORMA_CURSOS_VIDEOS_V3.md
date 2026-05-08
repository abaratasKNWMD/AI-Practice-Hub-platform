# Implementacion v3 - Plataforma, cursos y videos

Fecha: 2026-05-08

## Estado

Aplicado sobre `b_cclDMm8Af2f`.

## 5.1 Plataforma

Implementado:

- Ruta nueva `/plataforma`.
- Progreso por curso.
- Progreso por video conectado al player.
- Progreso por workshop.
- Estado por ejercicio:
  - no iniciado
  - en progreso
  - bloqueado
  - entregado
  - revisado
- Rutas por rol:
  - desarrollador
  - QA
  - tech lead
  - arquitecto
  - manager
- Rutas por objetivo:
  - onboarding
  - productividad
  - PR
  - testing
  - legacy
  - automatizacion
  - gobierno
- Sistema de cohortes.
- Agenda de tutorias.
- Bandeja de dudas recurrentes.
- Panel de instructor.
- Panel de metricas.
- Export de progreso en JSON.
- Certificados/badges internos.

Archivos principales:

- `b_cclDMm8Af2f/app/plataforma/page.tsx`
- `b_cclDMm8Af2f/components/hub/platform-os-client.tsx`
- `b_cclDMm8Af2f/components/hub/exercise-status-widget.tsx`
- `b_cclDMm8Af2f/public/content/platform/learning-os.json`
- `b_cclDMm8Af2f/lib/platform-schema.ts`
- `b_cclDMm8Af2f/lib/platform-content.ts`

## 5.2 Cursos

Implementado:

- Capa operativa en paginas de curso Codex, Copilot y Claude.
- Indice de ruta por curso:
  - deck
  - videos
  - ejercicios
  - materiales
- Resumen ejecutivo por bloque.
- Checkpoints de decision:
  - cuando usar
  - cuando no usar
- Coste y modelo por bloque practico.
- Enlaces curso -> ejercicios.
- Enlaces curso -> microvideos.
- Enlaces curso -> materiales y packs.
- Widget de estado en paginas de ejercicio.

Archivos principales:

- `b_cclDMm8Af2f/components/hub/course-operating-layer.tsx`
- `b_cclDMm8Af2f/app/tracks/codex/courses/[id]/page.tsx`
- `b_cclDMm8Af2f/app/tracks/copilot/courses/[id]/page.tsx`
- `b_cclDMm8Af2f/app/tracks/claude/courses/[id]/page.tsx`
- `b_cclDMm8Af2f/app/tracks/codex/exercises/[id]/page.tsx`
- `b_cclDMm8Af2f/app/tracks/copilot/exercises/[id]/page.tsx`
- `b_cclDMm8Af2f/app/tracks/claude/exercises/[id]/page.tsx`

## 5.4 Videos

Implementado:

- VideoBlueprint v2 con beats.
- Expansion automatica:
  - videos 60m: 12 escenas base -> 48 escenas renderizadas.
  - workshops 30m: 12 escenas base -> 24 escenas renderizadas.
- Pantallas nuevas:
  - prompt typed
  - streaming simulado
  - diff viewer
  - terminal output
  - PR review view
  - coste/token meter
  - decision overlay
  - instructor pause
  - quiz/checkpoint
  - branch timeline
  - modelo recomendado por escena
  - riesgos/permisos por escena
- Player actualizado para renderizar escenas operativas.
- Progreso de video persistente en Learner OS.

Archivos principales:

- `b_cclDMm8Af2f/lib/video-blueprint-schema.ts`
- `b_cclDMm8Af2f/lib/video-blueprint-generator.ts`
- `b_cclDMm8Af2f/scripts/build-video-blueprints.mjs`
- `b_cclDMm8Af2f/lib/movie-script.ts`
- `b_cclDMm8Af2f/lib/course-schema.ts`
- `b_cclDMm8Af2f/components/movie/scenes/ops-scene.tsx`
- `b_cclDMm8Af2f/components/movie/movie-player.tsx`
- `b_cclDMm8Af2f/docs/08-VIDEO-BLUEPRINT-V2-BEATS.md`

## Videos regenerados

- `cl-workshop-30m-memory-to-hook`: 24 escenas.
- `cp-workshop-30m-error-to-pr`: 24 escenas.
- `cx-workshop-30m-first-real-task`: 24 escenas.
- `cl-workshop-60m-memory-to-automation`: 48 escenas.
- `cp-workshop-60m-vscode-to-pr-review`: 48 escenas.
- `cx-workshop-60m-first-task-to-pr`: 48 escenas.
- `hub-operating-model-60m`: 48 escenas.
- `hub-workshop-60m-vendor-selection`: 48 escenas.

## Validacion

Ejecutado:

- `corepack pnpm build:videos`
- `corepack pnpm exec tsc --noEmit`
- `corepack pnpm lint`
- `corepack pnpm build`
- `corepack pnpm release:smoke`
- `corepack pnpm qa:visual`

Resultado:

- TypeScript: OK.
- Build: OK.
- Smoke test: OK, 29 checks.
- QA visual: OK, 10 screenshots.
- Lint: OK con 3 warnings heredadas ya existentes:
  - `subtitleDurationMs` no usado en `app/api/generate-course/route.ts`.
  - `actionTypes` solo usado como tipo en `components/ui/use-toast.ts`.
  - `actionTypes` solo usado como tipo en `hooks/use-toast.ts`.

