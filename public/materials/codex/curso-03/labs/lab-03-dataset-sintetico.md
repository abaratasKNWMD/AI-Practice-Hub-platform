# Lab 03: Dataset sintetico para onboarding

## Objetivo

Generar ejemplos Q/A y conversaciones senior/junior con evidencia de rutas del repo.

## Duracion

40 minutos.

## Material

- `../ejemplos/synthetic-dataset-pipeline/`
- `../plantillas/dataset-card.md`

## Pasos

1. Abre `data/evidence.json`.
2. Ejecuta `npm test`.
3. Ejecuta `npm run build`.
4. Abre `out/onboarding.jsonl`.
5. Identifica ejemplos con `needs_human_source`.
6. Pide a Codex que proponga un eval baseline.

## Prompt para Codex

```text
Analiza este dataset JSONL.
Comprueba que cada respuesta cita evidencia, que no hay secretos, que la dificultad esta bien calibrada y que cada ejemplo puede convertirse en eval.
Devuelve:
- ejemplos listos;
- ejemplos que requieren humano;
- campos que faltan;
- propuesta de eval.
```

## Cierre

Mensaje para llevar: destilacion corporativa empieza por datasets verificables, no por entrenar modelos a ciegas.
