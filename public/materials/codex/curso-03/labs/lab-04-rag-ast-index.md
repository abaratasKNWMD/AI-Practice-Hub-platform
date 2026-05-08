# Lab 04: RAG de codigo orientado a simbolos

## Objetivo

Crear un mini indice de codigo que Codex pueda usar para localizar funciones, clases y tests relacionados.

## Duracion

45 minutos.

## Material

- `../ejemplos/rag-ast-mini/`
- `../plantillas/rag-chunk-schema.json`

## Pasos

1. Ejecuta `npm test`.
2. Ejecuta `npm run index`.
3. Abre `out/code-index.json`.
4. Ejecuta `npm run search -- refreshSession`.
5. Pide a Codex que explique por que chunking por simbolo es mejor que cortar por tokens.

## Prompt para Codex

```text
Revisa este indice de codigo.
Evalua si los chunks tienen metadata suficiente para RAG enterprise:
- symbol
- kind
- file
- range
- imports
- tests
- risk
- embedding_text
Propone mejoras para convertirlo en MCP read-only.
```

## Cierre

El objetivo no es que el parser demo sea perfecto. El objetivo es que el grupo entienda que el retrieval de codigo necesita estructura, metadata y evals.
