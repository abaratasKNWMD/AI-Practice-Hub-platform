# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Hook PreToolUse anti secretos
- Contexto: Implementa un hook que bloquee patrones de secretos antes de escribir ficheros.
- Superficie: Hooks
- Permisos: write hook script
- Modelo recomendado: Sonnet
- Coste estimado: medio: script + prueba

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

