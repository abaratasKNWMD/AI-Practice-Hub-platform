# Lab 05: LLM-as-a-Judge y evals

## Objetivo

Convertir una rubrica de review en un criterio evaluable.

## Duracion

35 minutos.

## Material

- `../plantillas/eval-rubric-pr-review.json`
- `../ejemplos/pr-swarm-local/out/review.json` despues de ejecutar el lab 01
- Documentacion Evals: https://developers.openai.com/api/docs/guides/evals

## Pasos

1. Abre la rubrica JSON.
2. Identifica que puede evaluarse con string checks.
3. Identifica que requiere model grader.
4. Define un dataset pequeno con diffs y decisiones humanas.
5. Pide a Codex que proponga tres casos frontera.

## Prompt para Codex

```text
Disena una eval para medir calidad de reviews PR generadas por un swarm Codex.
Incluye:
- schema de item;
- salida esperada;
- graders deterministas;
- graders de modelo;
- casos frontera;
- coste aproximado cualitativo por run.
```

## Cierre

Un juez sin eval propia puede convertirse en otra fuente de errores. Evalua tambien al juez.
