# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Baseline de coste y contexto
- Contexto: Define como se medira coste y contexto antes de hacer tareas largas con Claude.
- Superficie: /usage /context
- Permisos: read-only
- Modelo recomendado: Sonnet
- Coste estimado: bajo: medicion inicial

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

