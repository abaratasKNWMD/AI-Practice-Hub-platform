# PR swarm local

Swarm offline para explicar como Architect, QA, Security y Judge revisan un diff antes de conectarlo a APIs reales.

## Ejecutar

```bash
npm test
npm run review
```

El resultado queda en `out/review.json`.

## Que demuestra

- Separacion de roles.
- Findings con evidencia.
- Gate de decision.
- Output JSON reutilizable por Codex, GitHub Actions o un juez LLM.

## Siguiente paso real

Conectar este prototipo a:

- GitHub Actions para obtener el diff de PR.
- Responses API o Agents SDK para ejecutar roles con modelos.
- Evals para medir si el juez acierta contra decisiones humanas.
