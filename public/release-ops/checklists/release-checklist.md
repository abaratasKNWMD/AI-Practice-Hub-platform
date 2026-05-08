# Checklist release AI Practice Hub

Version objetivo: `0.2.0-sprint-06`

## Preflight

- Confirmar que `pnpm build:videos` genera todos los CourseScript desde blueprints.
- Confirmar que los 9 decks HTML abren.
- Confirmar que los 4 workshops de 1h abren desde `/player`.
- Confirmar que los packs de instructor abren desde `/workshop-packs`.
- Confirmar que `/operaciones` refleja el estado actual.

## Comandos

```bash
pnpm build:videos
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm release:smoke
pnpm qa:visual
```

## Criterios de aprobado

- Build sin errores.
- Smoke test sin rutas 404/500.
- Capturas desktop/mobile generadas.
- No hay imagenes referenciadas rotas en decks.
- Cada workshop de 1h tiene video, guia, demo, prompts y pack instructor.
- Cada feedback repetido tiene destino: microvideo, ejercicio, workshop o tutoria.

## Criterios de bloqueo

- Un player largo no carga.
- Un curso/deck principal no abre.
- Un pack instructor devuelve 404.
- Una ruta vendor no muestra workshops.
- Hay texto claramente desbordado en vista mobile.
- La version no esta documentada.
