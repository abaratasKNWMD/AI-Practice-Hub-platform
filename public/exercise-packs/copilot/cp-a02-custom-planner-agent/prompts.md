# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Custom planner agent read-only
- Contexto: Crear un agente planner que inspecciona y planifica, pero no edita.
- Superficie: .github/agents
- Permisos: read/search
- Modelo recomendado: Modelo incluido o premium por politica
- Coste estimado: Medio: planificacion con contexto

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

