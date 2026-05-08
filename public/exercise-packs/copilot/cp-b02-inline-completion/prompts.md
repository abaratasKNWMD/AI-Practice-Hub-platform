# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Ghost text con criterio
- Contexto: Practicar autocompletado sin aceptar todo por velocidad. El alumno compara una sugerencia mediocre con una guiada por contexto.
- Superficie: VS Code editor
- Permisos: workspace-write
- Modelo recomendado: Modelo incluido
- Coste estimado: Bajo: inline suggestions incluidas en planes de pago

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

