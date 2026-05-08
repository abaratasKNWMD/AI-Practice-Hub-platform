# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: De error a fix sin parche gigante
- Contexto: Convertir un error pegado en un diagnostico y fix minimo con test o comprobacion.
- Superficie: VS Code + terminal
- Permisos: workspace-write
- Modelo recomendado: Modelo incluido; premium solo si el error es complejo
- Coste estimado: Medio-bajo: un diagnostico y un patch

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

