# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Comentario a codigo verificable
- Contexto: Convertir comentarios vagos en especificaciones pequenas que generen codigo revisable.
- Superficie: VS Code editor
- Permisos: workspace-write
- Modelo recomendado: Modelo incluido
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

