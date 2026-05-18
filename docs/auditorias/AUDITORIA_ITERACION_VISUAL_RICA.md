# Auditoria iteracion visual rica

Fecha: 2026-05-18

## Veredicto

La iteracion de video sube el sistema de un player correcto a una fabrica visual auditable. Se han creado plantillas operativas nuevas, se han compactado las versiones mobile y se ha ejecutado QA visual completo sobre todos los videos.

Estado estimado despues de esta iteracion: 92/100.

## Cambios aplicados

- `OpsScene` incorpora seis familias visuales nuevas:
  - IDE realista con explorer, editor, terminal y panel de IA;
  - PR review estilo GitHub;
  - MCP inventory board;
  - model/cost cockpit;
  - swarm orchestration map;
  - exercise resolution screen.
- Cada familia adapta contenido por vendor:
  - Codex: `AGENTS.md`, `.codex/config.toml`, tests, permisos y cloud task;
  - Copilot: `copilot-instructions.md`, VS Code, PR y premium requests;
  - Claude: `CLAUDE.md`, `.claude/skills`, hooks y MCP.
- Las escenas operativas ya no apilan toda la UI en mobile:
  - desktop mantiene rails laterales densos;
  - mobile muestra el artefacto principal en modo broadcast;
  - los paneles secundarios se ocultan o reducen para evitar slides largas.
- `CodingScene` corrige lineas largas de codigo con wrap seguro.
- `TitleScene`, `ConceptScene` y `FinaleScene` reducen peso visual mobile y evitan contenido fuera de pantalla.
- `Subtitles` y `Controls` exponen atributos de auditoria para que el QA mida contenido real sin confundir chrome del player.
- `scripts/audit-videos-100.mjs` queda reforzado:
  - captura todas las escenas;
  - distingue desktop/mobile;
  - mide contraste, desborde, densidad, subtitulos y peso visual;
  - ignora controles/subtitulos al calcular desborde del contenido.

## Resultado QA

- Videos auditados: 44.
- Escenas/slides auditadas: 961.
- Capturas desktop: 961.
- Capturas mobile: 961.
- Capturas totales: 1.922.
- Escenas lentas: 0.
- Escenas genericas: 0.
- Escenas con poco contenido declarado: 0.
- Subtitulos largos: 0.
- Issues visuales finales: 0.

## Validacion

- `pnpm lint`: OK con 3 warnings heredados no relacionados.
- `pnpm exec tsc --noEmit`: OK.
- `pnpm build`: OK.
- `pnpm run qa:player`: OK, 8 videos largos validados.
- `VIDEO_AUDIT_VISUAL=1 VIDEO_AUDIT_MOBILE=1 VIDEO_AUDIT_MOBILE_FULL=1 pnpm node scripts/audit-videos-100.mjs`: OK, 1.922 capturas y 0 issues visuales.

## Ficheros clave

- Auditoria 100%: `docs/auditorias/AUDITORIA_100_VIDEOS_COURSESCRIPT.md`
- JSON de auditoria: `public/release-ops/qa/video-audit-100/video-audit-100.json`
- Capturas QA: `public/release-ops/qa/video-audit-100/screenshots`
- Plantillas: `components/movie/scenes/ops-scene.tsx`
- QA script: `scripts/audit-videos-100.mjs`

## Siguiente frontera

- Sustituir mocks por capturas reales cuando haya repos finales de alumno.
- Crear variantes visuales de marca por vendor sin romper el sistema comun.
- Hacer revision humana de 30-40 capturas representativas para subir de 92/100 a 95/100 por gusto visual, no por fallos tecnicos.
