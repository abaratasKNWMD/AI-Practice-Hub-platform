# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Path-specific instructions
- Contexto: Separar reglas de frontend, backend, tests y review para que Copilot cargue contexto mas fino.
- Superficie: .github/instructions
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

