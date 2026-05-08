# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: MCP para cloud agent con allowlist
- Contexto: Disenar MCP cloud sin abrir todos los servidores ni exponer secretos.
- Superficie: GitHub repository settings
- Permisos: readonly + secrets controlados
- Modelo recomendado: Copilot cloud agent
- Coste estimado: Medio/alto si se recupera mucho contexto

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

