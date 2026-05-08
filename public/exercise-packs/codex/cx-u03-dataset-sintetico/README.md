# Dataset sintetico corporativo

Vendor: codex
Curso: Codex Ultra
Duracion: 75 min
Superficie: datos sinteticos + fine-tuning readiness
Modelo recomendado: GPT-5.5 para generacion y juez
Permisos: read-only con datos anonimizados
Coste estimado: Alto: generacion mas evaluacion

## Objetivo

Crear pares pregunta/respuesta y conversaciones senior-junior desde documentacion interna, sin filtrar secretos ni inventar normas.

## Tareas

1. Seleccionar fuentes permitidas.
2. Generar ejemplos sinteticos con referencias.
3. Filtrar duplicados, secretos y respuestas no verificables.
4. Etiquetar por dominio, dificultad y riesgo.

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

