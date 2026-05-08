# Kit ultra del Curso 3: Codex como plataforma enterprise

Este paquete convierte el curso ultra avanzado en material operativo. Esta pensado para que el instructor pueda abrir archivos reales durante la clase, lanzar ejemplos offline y mostrar como Codex pasa de sesion individual a sistema gobernado.

## Ruta recomendada de uso

1. `prompts-ultra.md`: prompts listos para swarms, Batch, datasets, RAG, jueces y gobierno.
2. `plantillas/AGENTS.ultra.example.md`: contrato de repo para equipos humanos y agentes.
3. `plantillas/config-codex-ultra.example.toml`: configuracion Codex con subagentes, MCP, permisos y coste.
4. `ejemplos/pr-swarm-local/`: swarm local que revisa un diff sin llamar a APIs.
5. `ejemplos/batch-jsonl-planner/`: generador de JSONL para Batch API con validaciones.
6. `ejemplos/synthetic-dataset-pipeline/`: dataset sintetico de onboarding con evidencia obligatoria.
7. `ejemplos/rag-ast-mini/`: mini indice de codigo orientado a simbolos y busqueda.
8. `skills/pr-swarm-codex/SKILL.md`: skill reutilizable para reviews multi-agente.
9. `labs/`: guiones completos para impartir las practicas.

## Principios ultra

- Codex sigue siendo el plano de control: repo, diffs, tests, trazas y decisiones.
- Swarm no significa autonomia infinita. Significa roles, ownership, gates y evidencia.
- RAG no sustituye al criterio. Recupera contexto exacto para que Codex no improvise.
- Fine-tuning y destilacion empiezan despues de tener evals y datasets auditables.
- El coste se gobierna por pipeline: tokens, herramientas, embeddings, storage, training y tiempo humano.

## Demo rapida en 15 minutos

```bash
cd ejemplos/pr-swarm-local
npm test
npm run review
```

Despues abre `out/review.json` y pide a Codex:

```text
Analiza este output de PR swarm como tech lead. Deduplica hallazgos, separa bloqueantes de recomendaciones y redacta un comentario de PR con decision final.
```

## Fuentes

La estructura del kit se apoya en documentacion oficial consultada el 06/05/2026: Codex subagents, MCP, GPT-5.5 guidance, Agents SDK, Batch API, Evals y Reinforcement Fine-Tuning. Revisa modelos, precios, disponibilidad regional y APIs antes de impartir de nuevo.
