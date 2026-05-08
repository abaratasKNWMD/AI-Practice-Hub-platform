# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Tests con Copilot
- Contexto: Generar tests que cubran comportamiento real y no snapshots decorativos.
- Superficie: VS Code + test runner
- Permisos: workspace-write + execute
- Modelo recomendado: Modelo incluido para tests simples
- Coste estimado: Medio: generacion y ejecucion

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

