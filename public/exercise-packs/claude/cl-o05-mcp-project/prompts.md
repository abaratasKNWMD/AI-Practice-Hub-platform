# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: MCP de proyecto read-only
- Contexto: Configura un inventario MCP que aporte contexto sin abrir escritura por defecto.
- Superficie: .mcp.json
- Permisos: read-only MCP
- Modelo recomendado: Sonnet
- Coste estimado: medio: conexion externa controlada

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

