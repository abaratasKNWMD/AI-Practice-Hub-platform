# Demo simulada

## Auditoria de CLAUDE.md

```text
Audita este CLAUDE.md. Separa memoria estable, basura y candidatos a skill. Devuelve tabla keep, move y delete.
```

Respuesta simulada:

```text
KEEP: comandos, convenciones, limites.
MOVE TO SKILL: flujo repetido de fix-tests.
DELETE: explicaciones largas de arquitectura que no cambian decisiones.
```

## Skill

```md
# fix-tests
Use when a test fails and the cause is local.
Stop if more than 3 files need changes.
Output: diagnosis, patch, command, evidence.
```

## Hook

```text
Intento bloqueado: diff contiene API_KEY.
Accion: pedir al usuario mover secreto a variable segura.
```
