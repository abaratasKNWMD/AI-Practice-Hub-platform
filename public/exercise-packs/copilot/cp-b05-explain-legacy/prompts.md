# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Explain de codigo legacy
- Contexto: Usar Copilot para entender codigo viejo sin inventar arquitectura ni tocar archivos.
- Superficie: Copilot Chat VS Code
- Permisos: read-only
- Modelo recomendado: Modelo incluido / Ask
- Coste estimado: Bajo

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

