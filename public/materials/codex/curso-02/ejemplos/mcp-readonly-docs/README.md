# MCP read-only docs lab

Servidor MCP local, sin dependencias externas, para explicar el patrón de herramientas gobernadas.

## Qué expone

- `search_docs`: busca en una base local de documentos.
- `read_doc`: lee un documento por id.

## Probar

```bash
npm test
```

## Conectar desde Codex

Ver `../../plantillas/config-codex.example.toml`.

## Seguridad

Este ejemplo es read-only, no usa red y no lee archivos fuera de `data/docs.json`. En un MCP real de empresa hay que añadir owner, allowlist, auth, logging, límites de datos y revisión de permisos.
