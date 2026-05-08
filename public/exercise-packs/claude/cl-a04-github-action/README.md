# Claude en GitHub Actions

Vendor: claude
Curso: Claude Advanced Automation
Duracion: 60 min
Superficie: GitHub Actions
Modelo recomendado: Sonnet
Permisos: CI read + PR comment
Coste estimado: medio-alto: CI + tokens + reintentos

## Objetivo

Diseña una Action que invoque Claude para revisar PRs con permisos minimos.

## Tareas

1. Definir trigger pull_request.
2. Limitar permisos de token.
3. Escribir salida esperada como comentario de PR.

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

