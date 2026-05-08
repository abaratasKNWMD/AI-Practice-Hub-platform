# GitHub Action con Codex reviewer

Vendor: codex
Curso: Codex Ultra
Duracion: 60 min
Superficie: GitHub Actions + Codex
Modelo recomendado: GPT-5.4
Permisos: CI read-only + comment
Coste estimado: Medio-alto: ejecucion por PR

## Objetivo

Disenar una action que revise PRs con contexto, limite de coste y salida estructurada.

## Tareas

1. Revisar la plantilla github-action-pr-swarm.yml.
2. Definir triggers y limites de ejecucion.
3. Configurar salida en comentario de PR o artifact.
4. Anadir guardas para evitar coste infinito.

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

