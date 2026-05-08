# Agente que lee repo con herramientas acotadas

Vendor: claude
Curso: Claude Agent SDK Enterprise
Duracion: 60 min
Superficie: Agent SDK tools
Modelo recomendado: Sonnet
Permisos: Read/Grep/Glob
Coste estimado: medio

## Objetivo

Modifica el ejemplo para que el agente solo pueda leer y buscar antes de emitir conclusion.

## Tareas

1. Revisar allowedTools.
2. Crear prompt que prohíba editar.
3. Definir salida con paths y riesgos.

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

