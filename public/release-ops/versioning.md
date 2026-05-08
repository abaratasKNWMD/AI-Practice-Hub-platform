# Versionado

## Version actual

`0.2.0-sprint-06`

## Semantica interna

- `0.1.x`: hub base multi-vendor.
- `0.2.x`: video factory, workshops largos, packs y release ops.
- `0.3.x`: seguimiento de progreso y cohortes.
- `0.4.x`: mas packs autoconsumibles y validadores por ejercicio.
- `1.0.0`: plataforma lista para uso estable con cohortes reales.

## Regla de release

Una version puede etiquetarse cuando:

- `pnpm build:videos` pasa.
- `pnpm build` pasa.
- `pnpm release:smoke` pasa.
- `pnpm qa:visual` genera capturas.
- El documento de operaciones se actualiza.

## Changelog 0.2.0

- Video factory 30/60 min.
- Workshops de 1h para Codex, Copilot, Claude y transversal.
- Packs de instructor.
- Scripts release smoke y QA visual.
- Inventario release ops.
- Feedback loops y metricas de uso.
