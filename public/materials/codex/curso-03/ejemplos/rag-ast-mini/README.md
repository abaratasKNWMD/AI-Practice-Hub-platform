# RAG AST mini

Mini indice de codigo orientado a simbolos. Es deliberadamente pequeno y offline. En produccion se sustituiria el extractor por Tree-sitter, TypeScript compiler API u otro parser real.

## Ejecutar

```bash
npm test
npm run index
npm run search -- refreshSession
```

Resultado: `out/code-index.json`.

## Que explica

- Chunking por simbolo en vez de troceo ciego por tokens.
- Metadata para retrieval: file, range, kind, imports, tests, risk.
- Separacion entre `embedding_text` y `display_text`.
- Camino natural para exponer `search_symbol` por MCP read-only.
