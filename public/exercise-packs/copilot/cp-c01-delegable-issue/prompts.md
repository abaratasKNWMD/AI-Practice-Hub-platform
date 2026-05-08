# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Issue delegable para cloud agent
- Contexto: Preparar un issue que Copilot cloud agent pueda ejecutar sin preguntar lo basico ni tocar alcance peligroso.
- Superficie: GitHub issue
- Permisos: repo policy + human review
- Modelo recomendado: Copilot cloud agent
- Coste estimado: Medio/alto: premium requests + Actions minutes

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

