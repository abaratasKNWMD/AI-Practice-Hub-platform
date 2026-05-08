# Review de diff con evidencia

Vendor: codex
Curso: Codex Basic
Duracion: 35 min
Superficie: git diff + chat Codex
Modelo recomendado: GPT-5.4
Permisos: read-only
Coste estimado: Bajo: una revision enfocada

## Objetivo

Usar Codex como reviewer para detectar riesgos reales, no para opinar sobre estilo sin contexto.

## Tareas

1. Generar o abrir un diff pequeno.
2. Pedir findings ordenados por severidad con rutas y lineas.
3. Separar bugs, preguntas y sugerencias.
4. Convertir un finding en una tarea accionable.

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

