# Config segura de Codex

Vendor: codex
Curso: Codex Potente
Duracion: 35 min
Superficie: config.toml + permisos
Modelo recomendado: GPT-5.4
Permisos: workspace-write controlado
Coste estimado: Bajo: edicion de plantilla y revision

## Objetivo

Convertir una configuracion informal en perfiles claros de uso: lectura, escritura, ejecucion de tests y uso de red.

## Tareas

1. Revisar config-codex.example.toml.
2. Definir perfil alumno, perfil profesor y perfil automatizacion.
3. Marcar comandos permitidos y comandos que requieren revision humana.
4. Crear una checklist de arranque de sesion.

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

