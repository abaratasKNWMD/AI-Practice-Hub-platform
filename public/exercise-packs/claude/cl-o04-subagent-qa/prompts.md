# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Subagente QA reviewer
- Contexto: Crea un subagente QA que revise cambios y recomiende pruebas antes de cerrar.
- Superficie: .claude/agents
- Permisos: read + bash tests
- Modelo recomendado: Sonnet
- Coste estimado: medio: revision focalizada

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

