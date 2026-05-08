# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Dataset sintetico corporativo
- Contexto: Crear pares pregunta/respuesta y conversaciones senior-junior desde documentacion interna, sin filtrar secretos ni inventar normas.
- Superficie: datos sinteticos + fine-tuning readiness
- Permisos: read-only con datos anonimizados
- Modelo recomendado: GPT-5.5 para generacion y juez
- Coste estimado: Alto: generacion mas evaluacion

Devuelve:

1. Archivos o fuentes que revisarias.
2. Plan de 3 pasos.
3. Riesgos.
4. Criterio de terminado.

## Prompt 2 - Ejecucion acotada

Ejecuta solo el plan aprobado. No cambies comportamiento no relacionado. Cierra con:

- resumen del cambio
- evidencia
- checks ejecutados
- coste/modelo/permisos usados

