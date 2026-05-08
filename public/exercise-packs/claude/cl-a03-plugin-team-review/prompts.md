# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Plugin team-review
- Contexto: Empaqueta una skill, un subagente y un hook dentro de un plugin de review reutilizable.
- Superficie: Plugins
- Permisos: plugin workspace
- Modelo recomendado: Sonnet
- Coste estimado: medio-alto: empaquetado + prueba

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

