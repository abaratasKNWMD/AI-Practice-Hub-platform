# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: CLAUDE.md para un repo real
- Contexto: Genera un CLAUDE.md para un repositorio de practica tras leer su estructura y scripts.
- Superficie: Project memory
- Permisos: write memory file
- Modelo recomendado: Sonnet
- Coste estimado: bajo-medio: lectura de estructura + edicion

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

