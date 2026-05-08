# Solucion guiada - Claude Memory to Hook

1. `CLAUDE.md` contiene solo reglas globales.
2. `fix-tests` captura procedimiento repetible.
3. `explorer` queda en read-only.
4. El hook bloquea `.env`, `secret`, `token` y `credential`.
5. Se prueba caso bloqueado y caso permitido.

Handoff esperado:

```text
Memoria: CLAUDE.md minimo.
Skill: fix-tests creada.
Subagente: explorer read-only.
Hook: block-secrets probado.
Riesgo: falsos positivos en nombres de fixtures.
```
