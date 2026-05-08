# Subagentes para review paralela

Vendor: codex
Curso: Codex Potente
Duracion: 50 min
Superficie: subagentes Codex
Modelo recomendado: GPT-5.5 para coordinacion, GPT-5.4 para exploracion
Permisos: read-only para exploradores
Coste estimado: Medio-alto: varias ramas de analisis

## Objetivo

Aprender a delegar trabajo no bloqueante: un agente explora tests, otro arquitectura, otro UX o seguridad.

## Tareas

1. Definir tres preguntas independientes.
2. Asignar a cada subagente un alcance cerrado.
3. Integrar findings sin duplicar trabajo.
4. Cerrar con decision del agente principal.

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

