# Subagente QA reviewer

Vendor: claude
Curso: Claude Operator
Duracion: 45 min
Superficie: .claude/agents
Modelo recomendado: Sonnet
Permisos: read + bash tests
Coste estimado: medio: revision focalizada

## Objetivo

Crea un subagente QA que revise cambios y recomiende pruebas antes de cerrar.

## Tareas

1. Leer qa-reviewer.md.
2. Añadir criterio de severidad.
3. Probar sobre un diff o ejercicio resuelto.

## Evidencia esperada

- Prompt inicial usado.
- Resultado o diff producido.
- Validacion ejecutada o bloqueo documentado.
- Coste/modelo/permisos registrados.
- Nota final para tutoria si queda duda.

## Archivos del pack

- `prompts.md`
- `rescue-prompts.md`
- `solution-guide.md`
- `expected.diff`
- `rubric.md`
- `self-assessment.md`
- `instructor-mode.md`
- `validator.mjs`
- `mock-data/input.json`
- `pr-simulated/PR.md`
- `starter/README.md`

