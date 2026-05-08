# AGENTS.md minimo para un equipo

Vendor: codex
Curso: Codex Basic
Duracion: 30 min
Superficie: workspace Codex
Modelo recomendado: GPT-5.4
Permisos: workspace-write
Coste estimado: Bajo: lectura del repo y una edicion pequena

## Objetivo

Crear un AGENTS.md que convierta normas tacitas del equipo en instrucciones persistentes para Codex.

## Tareas

1. Revisar la plantilla AGENTS.example.md.
2. Adaptarla al repo con comandos reales y convenciones locales.
3. Anadir limites: no tocar secretos, no reordenar imports masivos, no reescribir tests sin motivo.
4. Pedir a Codex que critique el AGENTS.md como si fuera onboarding de un nuevo dev.

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

