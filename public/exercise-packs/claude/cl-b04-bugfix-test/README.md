# Bugfix con test minimo

Vendor: claude
Curso: Claude Basic
Duracion: 45 min
Superficie: Claude Code edit loop
Modelo recomendado: Sonnet
Permisos: workspace-write
Coste estimado: medio: lectura + patch + test

## Objetivo

Resuelve un bug pequeno aplicando el loop: reproducir, editar, verificar y resumir evidencia.

## Tareas

1. Pedir a Claude plan corto.
2. Ejecutar test o reproduccion minima.
3. Aplicar patch y reejecutar verificacion.

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

