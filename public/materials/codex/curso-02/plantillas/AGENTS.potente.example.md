# AGENTS.md

## Propósito

Este repo se trabaja con Codex como agente de ingeniería. Codex debe optimizar por cambios pequeños, evidencia verificable, seguridad y coste razonable.

## Mapa del repo

- `apps/`: aplicaciones.
- `packages/`: librerías compartidas.
- `tests/`: pruebas end-to-end o integración.
- `docs/`: ADRs, runbooks y decisiones.
- `.agents/skills/`: skills repo-scoped.
- `.codex/config.toml`: configuración del proyecto si el repo está marcado como trusted.

## Comandos

- Instalar: `<comando real>`.
- Desarrollo: `<comando real>`.
- Test rápido: `<comando real>`.
- Test completo: `<comando real>`.
- Lint/typecheck: `<comando real>`.
- Build: `<comando real>`.

No inventes comandos. Si no están documentados, inspecciona `package.json`, `pyproject.toml`, `Makefile`, CI o pregunta.

## Modelo y razonamiento

- Usa razonamiento bajo o medio para exploración, resumen y cambios mecánicos.
- Usa razonamiento alto para arquitectura, seguridad, bugs ambiguos, migraciones y decisiones costosas.
- No uses el modelo más potente por defecto si la tarea es lectura simple o formato.
- Antes de tareas largas, resume el plan y el contexto mínimo que vas a usar.

## Herramientas y permisos

- Empieza con lectura local y búsqueda en repo.
- Usa MCP read-only para docs, tickets, logs o diseños antes de copiar grandes bloques al prompt.
- No llames herramientas con efectos externos sin aprobación humana.
- No imprimas secretos, tokens, `.env`, claves privadas ni datos personales.

## Subagentes

Usa subagentes solo cuando el usuario lo pida o cuando sea explícitamente parte del lab. Cada subagente necesita:

- objetivo acotado;
- ownership de lectura o escritura;
- salida resumida;
- criterio de evidencia;
- prohibición de revertir cambios de otros.

## Done means

Un trabajo termina cuando:

- el cambio está implementado o el bloqueo está explicado;
- hay test, build, captura, diff review o evidencia equivalente;
- se resumen archivos tocados, riesgos y coste cualitativo;
- si el patrón se repetirá, se propone actualizar AGENTS.md, skill, prompt o config.
