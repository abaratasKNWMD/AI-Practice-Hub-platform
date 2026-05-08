# Release notes v0.2.0

Fecha: 2026-05-08

## Nuevo

- 4 workshops simulados de 1h:
  - Codex first task to PR.
  - Copilot VS Code to PR review.
  - Claude memory to automation.
  - Transversal vendor selection.
- Packs de instructor por workshop.
- Inventario `workshops-1h.json`.
- Inventario `release-ops.json`.
- Script `release:smoke`.
- Script `qa:visual`.

## Cambios

- Las rutas de workshop vendor muestran pack instructor cuando existe.
- `/operaciones` se convierte en panel de sprints, videos, workshops, packs y release.
- Sprint 05 y Sprint 06 pasan a estado `done`.

## Riesgos conocidos

- La QA visual depende de Chrome o Edge instalados localmente.
- Siguen existiendo warnings heredadas de lint no bloqueantes.
