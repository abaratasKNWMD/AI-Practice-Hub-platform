# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Subagente explorer read-only
- Contexto: Configura un subagente barato para mapear el repo sin contaminar el hilo principal.
- Superficie: .claude/agents
- Permisos: read-only tools
- Modelo recomendado: Haiku
- Coste estimado: bajo: separacion de contexto

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

