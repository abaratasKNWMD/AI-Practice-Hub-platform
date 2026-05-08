# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Handoff planner -> implementer -> reviewer
- Contexto: Practicar roles diferenciados sin convertir Copilot en teatro: plan, implementacion y review.
- Superficie: VS Code custom agents
- Permisos: read-only por rol, write solo implementer
- Modelo recomendado: Modelo premium si hay alta ambiguedad
- Coste estimado: Medio-alto: varios agentes/iteraciones

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

