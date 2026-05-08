# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Primer proyecto Agent SDK
- Contexto: Lee el agente de ejemplo y prepara el esqueleto minimo para ejecutar una review programatica.
- Superficie: Agent SDK
- Permisos: local sdk
- Modelo recomendado: Sonnet
- Coste estimado: medio: setup + primera consulta

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

