# AGENTS.md

## Mapa del repo

- `src/`: codigo de aplicacion.
- `tests/`: pruebas automatizadas.
- `docs/`: decisiones, runbooks y notas de arquitectura.
- `scripts/`: utilidades de desarrollo y CI.

## Comandos

- Instalar: `<comando real>`.
- Test rapido: `<comando real>`.
- Test completo: `<comando real>`.
- Lint/formato: `<comando real>`.
- Build: `<comando real>`.

No inventes comandos. Si no estan documentados, inspecciona el repo o pregunta.

## Reglas de trabajo para Codex

- Antes de editar, entiende el alcance y enumera archivos probables.
- Para cambios ambiguos, propone plan breve y espera confirmacion si el riesgo es alto.
- Edita solo los archivos necesarios para la tarea.
- No cambies contratos publicos, migraciones, permisos o dependencias sin decirlo antes.
- No leas ni imprimas secretos. Si encuentras credenciales, detente y avisa.
- Mantén los cambios pequenos y revisables.

## Done means

Un trabajo esta terminado cuando:

- El comportamiento pedido esta implementado o se explica por que no se pudo.
- Hay evidencia: test, build, lint, captura o razon concreta.
- El resumen final incluye archivos tocados, riesgo residual y siguiente paso.
- Si el mismo patron se repetira, se propone actualizar docs, AGENTS.md o una plantilla.

## Review

Para reviews, usa `plantillas/revision-pr.md` como guia. Prioriza bugs reales, regresiones, seguridad, tests faltantes y riesgos de operacion.

## Cuando actualizar este archivo

Actualiza AGENTS.md cuando Codex:

- Repite el mismo error dos veces.
- Usa un comando incorrecto.
- Toca una zona sensible sin contexto suficiente.
- Necesita recordar una convencion del equipo.
