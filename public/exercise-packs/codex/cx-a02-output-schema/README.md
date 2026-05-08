# Salida estructurada para agentes

Vendor: codex
Curso: Codex Ultra
Duracion: 45 min
Superficie: JSON schema + evals
Modelo recomendado: GPT-5.4
Permisos: read-only
Coste estimado: Medio: varias validaciones de salida

## Objetivo

Evitar respuestas bonitas pero inutiles obligando a Codex a devolver findings, severidad, evidencia y acciones en un schema estable.

## Tareas

1. Definir schema de findings para review.
2. Probarlo con un diff de ejemplo.
3. Validar campos obligatorios.
4. Crear una salida humana a partir del JSON.

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

