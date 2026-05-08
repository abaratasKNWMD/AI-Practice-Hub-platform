# Bug login con plan antes de patch

Vendor: codex
Curso: Codex Basic
Duracion: 45 min
Superficie: CLI + tests
Modelo recomendado: GPT-5.4
Permisos: workspace-write
Coste estimado: Medio-bajo: exploracion, patch y tests

## Objetivo

Resolver un bug acotado de login sin saltarse la disciplina: reproducir, aislar, proponer plan, editar y verificar.

## Tareas

1. Pedir a Codex que reproduzca o explique como reproduciria el bug.
2. Exigir un plan de dos o tres pasos antes del patch.
3. Aplicar la correccion minima.
4. Ejecutar el test relevante o documentar el bloqueo.

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

