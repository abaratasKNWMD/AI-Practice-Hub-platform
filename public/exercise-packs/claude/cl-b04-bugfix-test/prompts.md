# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Bugfix con test minimo
- Contexto: Resuelve un bug pequeno aplicando el loop: reproducir, editar, verificar y resumir evidencia.
- Superficie: Claude Code edit loop
- Permisos: workspace-write
- Modelo recomendado: Sonnet
- Coste estimado: medio: lectura + patch + test

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

