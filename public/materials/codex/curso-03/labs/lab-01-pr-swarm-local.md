# Lab 01: PR swarm local

## Objetivo

Construir y ejecutar un swarm local que revise un diff con roles Architect, QA, Security y Judge.

## Duracion

35 minutos.

## Material

- `../ejemplos/pr-swarm-local/`
- `../plantillas/swarm-contract.yml`
- `../plantillas/pr-swarm-finding.schema.json`

## Pasos

1. Ejecuta `npm test`.
2. Ejecuta `npm run review`.
3. Abre `out/review.json`.
4. Pide a Codex que convierta el JSON en comentario de PR.
5. Cambia el fixture para anadir o quitar un riesgo.
6. Repite el review y compara decisiones.

## Prompt para Codex

```text
Lee el output `out/review.json` del PR swarm.
Deduplica hallazgos, separa bloqueantes de recomendaciones y redacta un comentario de PR con tono profesional.
No inventes evidencia que no este en el JSON.
```

## Cierre

Pregunta al grupo:

- Que hallazgo bloquearia merge?
- Que parte deberia hacer un humano?
- Que parte se puede automatizar en CI?
- Que coste tiene ejecutar esto en cada PR?
