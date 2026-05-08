# Lab 03: MCP empresarial mínimo

## Objetivo

Entender MCP como patrón de herramientas gobernadas, no como colección de conectores.

## Material

- `../plantillas/config-codex.example.toml`
- `../plantillas/mcp-inventory.md`
- `../ejemplos/mcp-readonly-docs/`

## Pasos

1. Ejecuta el smoke test del servidor MCP local:

```bash
cd materiales/ejemplos/mcp-readonly-docs
npm test
```

2. Lee `config-codex.example.toml` y localiza la sección `mcp_servers.lab_docs`.
3. Rellena `mcp-inventory.md` para esta fuente.
4. Debate qué tools se permitirían en un repo real.

## Cierre

El objetivo no es "tener MCP". El objetivo es que Codex obtenga contexto fiable con permisos, timeout, owner y evidencia.
