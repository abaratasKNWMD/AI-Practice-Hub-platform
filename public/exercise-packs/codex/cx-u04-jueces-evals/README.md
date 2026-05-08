# LLM-as-a-Judge y evals

Vendor: codex
Curso: Codex Ultra
Duracion: 80 min
Superficie: eval harness + rubrics
Modelo recomendado: GPT-5.5 juez, GPT-5.4 candidato
Permisos: read-only
Coste estimado: Alto si no se muestrea; medio con suite corta

## Objetivo

Construir una suite de evaluacion donde un modelo juez puntua codigo, respuesta y evidencias de otro agente.

## Tareas

1. Definir rubrica con criterios ponderados.
2. Crear casos positivos, negativos y ambiguos.
3. Ejecutar juez sobre salidas de ejemplo.
4. Analizar falsos positivos y coste.

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

