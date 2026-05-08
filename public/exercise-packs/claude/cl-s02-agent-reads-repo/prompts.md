# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Agente que lee repo con herramientas acotadas
- Contexto: Modifica el ejemplo para que el agente solo pueda leer y buscar antes de emitir conclusion.
- Superficie: Agent SDK tools
- Permisos: Read/Grep/Glob
- Modelo recomendado: Sonnet
- Coste estimado: medio

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

