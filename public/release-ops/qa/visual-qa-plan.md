# QA visual desktop/mobile

Objetivo: detectar roturas visuales antes de usar la plataforma con alumnos.

## Viewports

- Desktop: `1440x900`
- Mobile: `390x844`

## Rutas criticas

- `/`
- `/operaciones`
- `/tracks/codex`
- `/tracks/copilot`
- `/tracks/claude`
- `/player/hub-workshop-60m-vendor-selection`
- `/tracks/codex/workshops/codex-workshop-1h-first-task-to-pr`
- `/tracks/copilot/workshops/copilot-workshop-1h-vscode-to-pr-review`
- `/tracks/claude/workshops/claude-workshop-1h-memory-to-automation`

## Comando

```bash
pnpm qa:decks
pnpm qa:player
pnpm qa:visual
```

El script usa Chrome o Edge en modo headless si estan instalados en rutas estandar de Windows. Las capturas se guardan en:

`public/release-ops/qa/screenshots`

Tambien genera:

`public/release-ops/qa/latest-deck-qa.json`

`public/release-ops/qa/latest-player-qa.json`

`public/release-ops/qa/latest-visual-qa.json`

## Criterios visuales

- No hay texto desbordado.
- Las cards mantienen espaciado en mobile.
- Los botones principales no se pisan.
- El player largo carga con controles visibles.
- Los packs de instructor aparecen como links claros.
- La pagina de operaciones muestra Sprint 05 y Sprint 06.
- Los 9 decks cumplen minimo: hero fuerte, 3 diagramas, 2 memes y 2 imagenes de reflexion.
- Los videos largos declaran pantalla, voz, subtitulos, accion, modelo/coste/permisos y checkpoints.
