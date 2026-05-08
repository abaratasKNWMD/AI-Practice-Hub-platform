# Lab 05: subagentes para review

## Objetivo

Separar ruido de exploración del hilo principal y recibir hallazgos deduplicados.

## Material

- `../plantillas/handoff-agentes.md`
- `../plantillas/review-codex.md`
- Prompt `Subagentes con ownership` en `../prompts-potentes.md`

## Dinámica

1. Usa una rama o diff de práctica.
2. Pide tres subagentes: arquitectura, QA y seguridad.
3. Mantén todos en read-only.
4. Espera a los tres.
5. Deduplica hallazgos y decide gate final.

## Criterio de éxito

- El main thread no queda lleno de logs crudos.
- Cada subagente devuelve evidencia.
- El resumen final prioriza severidad y evita opiniones de estilo.
