# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Prompt files reutilizables
- Contexto: Crear prompts invocables para tests, refactor, review y PR, en vez de reescribir siempre la misma peticion.
- Superficie: .github/prompts
- Permisos: read-only -> workspace-write
- Modelo recomendado: Modelo incluido o Agent segun prompt
- Coste estimado: Medio: depende del modo y herramientas

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

