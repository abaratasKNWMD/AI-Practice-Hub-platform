# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de copilot. Antes de editar, analiza la tarea:

- Objetivo: Setup Copilot en VS Code
- Contexto: Verificar que el alumno tiene Copilot operativo antes de entrar en completions, chat y agent mode.
- Superficie: VS Code
- Permisos: configuracion local
- Modelo recomendado: Modelo incluido
- Coste estimado: Muy bajo: setup y comprobacion

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

