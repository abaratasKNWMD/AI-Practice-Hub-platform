# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Refactor controlado
- Contexto: Practicar refactor sin deriva de comportamiento, con limites y verificacion.
- Superficie: Copilot Edit / Agent
- Permisos: workspace-write
- Modelo recomendado: Modelo incluido o premium segun impacto
- Coste estimado: Medio: revisar diff y tests

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

