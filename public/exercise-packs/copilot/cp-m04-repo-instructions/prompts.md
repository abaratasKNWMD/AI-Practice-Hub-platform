# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Copilot instructions de repositorio
- Contexto: Crear instrucciones persistentes cortas para que Copilot respete stack, comandos, seguridad y forma de cierre.
- Superficie: .github/copilot-instructions.md
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

