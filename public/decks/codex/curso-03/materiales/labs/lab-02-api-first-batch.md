# Lab 02: API-first y Batch JSONL

## Objetivo

Preparar requests Batch para un refactor masivo sin ejecutar llamadas reales.

## Duracion

40 minutos.

## Material

- `../ejemplos/batch-jsonl-planner/`
- `../plantillas/cost-budget.csv`
- Documentacion Batch API: https://developers.openai.com/api/docs/guides/batch

## Pasos

1. Abre `tasks/refactor-tasks.json`.
2. Ejecuta `npm test`.
3. Ejecuta `npm run build`.
4. Abre `out/refactor.batch.jsonl`.
5. Verifica que cada linea tiene `custom_id`, `method`, `url` y `body`.
6. Pide a Codex que detecte riesgos antes de lanzar un batch real.

## Prompt para Codex

```text
Revisa este JSONL Batch antes de subirlo.
Comprueba:
- un solo modelo en todo el archivo;
- custom_id unico y estable;
- endpoint correcto;
- output estructurado;
- criterios de aceptacion;
- riesgo de coste.
Devuelve una lista de bloqueantes y recomendaciones.
```

## Cierre

La idea clave: Batch no es "hazlo todo de noche". Es trabajo asincrono con IDs, pilotos, presupuestos y rollback.
