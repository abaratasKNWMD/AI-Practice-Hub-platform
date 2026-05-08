# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: GitHub MCP readonly
- Contexto: Conectar GitHub MCP para consultar issues/PRs sin abrir acciones destructivas.
- Superficie: MCP en IDE
- Permisos: read-only
- Modelo recomendado: Modelo incluido o premium segun consulta
- Coste estimado: Medio: mas contexto y herramientas

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

