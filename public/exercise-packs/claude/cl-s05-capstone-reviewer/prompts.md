# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Capstone: reviewer Claude enterprise
- Contexto: Construye el diseño final de un reviewer interno que combine memoria, skill, subagentes, hooks, MCP y SDK.
- Superficie: Agent SDK + plugins + hooks
- Permisos: governed automation
- Modelo recomendado: Sonnet + Opus final review
- Coste estimado: alto controlado: capstone completo

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

