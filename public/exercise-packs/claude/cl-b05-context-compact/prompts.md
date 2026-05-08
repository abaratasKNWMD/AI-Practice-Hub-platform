# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de claude. Antes de editar, analiza la tarea:

- Objetivo: Compactar sin perder el hilo
- Contexto: Simula una tarea larga y prepara el resumen que debe sobrevivir a /compact.
- Superficie: /compact
- Permisos: chat command
- Modelo recomendado: Sonnet
- Coste estimado: bajo: control de contexto

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

