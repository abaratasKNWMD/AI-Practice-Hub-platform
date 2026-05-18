# Auditoria Sprint C/D - media breaks y guion humano

Fecha: 2026-05-18

## Veredicto

Sprint C y Sprint D quedan implementados sobre la videoteca CourseScript.

- Videos auditados: 44.
- Escenas totales: 961.
- Media breaks aplicados: 107.
- Rubricas de utilidad: 961/961 escenas.
- Subtitulos editoriales: 3992.
- Audios MP3 manifestados: 3992.
- QA visual videoteca: 0 issues.
- Auditoria excelencia: 1950/2000.

## Sprint C - Imagenes en videos

Implementado:

- Se reutilizan assets reales de decks como pausas visuales.
- Se han creado 10 mockups realistas para vendor:
  - Codex CLI/cloud/task/PR/coste/MCP.
  - Copilot VS Code/Agent/PR review/context router.
  - Claude Code/skills/hooks/subagentes/MCP.
  - AI Practice Hub Learning Ops.
- Se han repartido 107 escenas `media-break` por la videoteca.
- Los memes entran como regla de memoria, no como decoracion.
- Los videos largos no quedan sin respiracion visual.

Distribucion:

| Tipo | Total |
| --- | ---: |
| screenshot | 40 |
| meme | 37 |
| reflection | 16 |
| diagram | 14 |

| Vendor | Total |
| --- | ---: |
| hub | 28 |
| copilot | 27 |
| codex | 26 |
| claude | 26 |

Regla de densidad aplicada:

| Formato | Media breaks |
| --- | ---: |
| Video 60m | 14 por video |
| Workshop 30m | 8 por video |
| Masterclass 10m | 4 por video |
| Microvideo seleccionado | 1 |

## Sprint D - Guion humano

Implementado:

- Las frases de fabrica originales quedan eliminadas.
- Cada bloque queda orientado a situacion, tension, ejemplo, accion, evidencia y decision.
- Cada escena incluye una rubrica pedagogica:
  - que aprende;
  - que hace;
  - que decide.
- El audio se ha regenerado tras la reescritura editorial.
- Los subtitulos VTT/SRT quedan sincronizados con los nuevos MP3.

## Archivos principales

- `components/movie/scenes/media-break-scene.tsx`
- `components/movie/movie-player.tsx`
- `lib/movie-script.ts`
- `lib/course-schema.ts`
- `scripts/apply-media-breaks-human-script.mjs`
- `public/video-assets/vendor-mockups/*.svg`
- `public/content/operations/video-media-breaks-sprint-cd.json`
- `docs/auditorias/AUDITORIA_2000_AUDIO_SUBTITULOS_PEDAGOGIA_VIDEOS.md`
- `docs/auditorias/AUDITORIA_100_VIDEOS_COURSESCRIPT.md`

## QA ejecutada

- `pnpm run audio:editorial`: OK.
- `pnpm run audio:generate`: OK, 1992 audios nuevos y 2000 reutilizados.
- `pnpm run audio:qa`: OK, 0 audios faltantes, 0 desbordes.
- `pnpm exec tsc --noEmit`: OK.
- `pnpm lint`: OK con 3 warnings heredados.
- `pnpm run qa:player`: OK, 8 videos largos.
- `pnpm build`: OK.
- `pnpm run release:smoke`: OK, 41 checks.
- `pnpm run qa:visual`: OK, 10 screenshots.
- `VIDEO_AUDIT_VISUAL=1 VIDEO_AUDIT_MOBILE=1 pnpm node scripts/audit-videos-100.mjs`: OK, 961 escenas desktop y 132 mobile, 0 issues.
- `pnpm node scripts/audit-video-excellence-2000.mjs`: 1950/2000.

## Lo que queda para 2000/2000

No queda deuda critica de Sprint C/D. Lo que falta para el 100 absoluto es direccion de produccion:

- Voces distintas por vendor o por tipo de escena.
- Revision humana de prosodia: energia, pausas y enfasis.
- Pasada editorial fina para reducir repeticiones estructurales de situacion/evidencia.
- Decision de packaging final: versionado de audio, cache CDN y politica de regeneracion.
- Review humana de una muestra de alumnos reales para medir memoria y accion.
