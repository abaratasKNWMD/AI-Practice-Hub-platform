# Debug multimodal de UI

Vendor: codex
Curso: Codex Potente
Duracion: 45 min
Superficie: imagen + browser + codigo
Modelo recomendado: GPT-5.5 multimodal
Permisos: workspace-write
Coste estimado: Medio: imagen, contexto UI y patch

## Objetivo

Usar captura visual como evidencia para que Codex arregle un fallo de interfaz sin perseguir sintomas equivocados.

## Tareas

1. Abrir la pantalla rota o revisar captura.
2. Pedir diagnostico visual con hipotesis verificables.
3. Aplicar un patch pequeno.
4. Revisar desktop y mobile.

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

