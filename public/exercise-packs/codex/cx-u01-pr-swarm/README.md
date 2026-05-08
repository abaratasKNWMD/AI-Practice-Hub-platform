# PR swarm con roles

Vendor: codex
Curso: Codex Ultra
Duracion: 90 min
Superficie: multi-agent orchestration
Modelo recomendado: GPT-5.5
Permisos: read-only para agentes, write solo coordinador
Coste estimado: Alto: varios agentes y sintesis

## Objetivo

Construir una revision de PR con roles: arquitecto, desarrollador, QA y orquestador. El foco es coordinacion, no teatralidad.

## Tareas

1. Definir responsabilidades de cada rol.
2. Ejecutar analisis independiente sobre el mismo PR.
3. Resolver desacuerdos en una sintesis unica.
4. Emitir aprobado, cambios requeridos o preguntas.

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

