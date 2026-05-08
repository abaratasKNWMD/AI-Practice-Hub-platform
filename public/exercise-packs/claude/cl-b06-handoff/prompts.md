# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Handoff listo para tutoria
- Contexto: Convierte una sesion en una ficha para que un profesor pueda revisar la duda en tutoria sin repetir todo.
- Superficie: Handoff
- Permisos: read-only
- Modelo recomendado: Haiku
- Coste estimado: bajo

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

