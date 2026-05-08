# Lab 03: Review de PR con Codex

## Objetivo

Entrenar a Codex para revisar como un senior: pocos hallazgos, alta señal y evidencia.

## Preparacion

Usa cualquier repo con cambios locales o una rama de practica. Si no tienes diff, cambia un test o introduce un bug pequeño y obvio.

## Prompt

```text
Objetivo: revisa los cambios actuales como si fueran una PR.

Contexto:
- Revisa correctness, regresiones, seguridad y tests.
- Usa la rubrica de materiales/plantillas/revision-pr.md.

Restricciones:
- No edites archivos.
- No hagas comentarios de estilo salvo que bloqueen mantenibilidad.
- Cita archivo y linea cuando puedas.

Done when:
- Devuelves hallazgos ordenados por severidad.
- Incluyes preguntas abiertas.
- Terminas con approve, changes requested o needs manual check.
```

## Criterios de calidad

- Un buen review no busca cantidad.
- Un buen review explica impacto.
- Un buen review separa bug real de preferencia.
- Un buen review deja claro que prueba faltaria.
