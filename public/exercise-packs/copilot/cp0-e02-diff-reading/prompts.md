# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Leer diff antes de aceptar magia
- Contexto: Leer un diff como evidencia: que cambia, que riesgo mete, que test falta y que pregunta haria un reviewer.
- Superficie: VS Code diff
- Permisos: read-only
- Modelo recomendado: Modelo incluido / Ask
- Coste estimado: Muy bajo: una explicacion corta

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

