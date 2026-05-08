# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Presupuesto de coste por ruta Codex
- Contexto: Convertir consumo de tokens en una politica comprensible para alumnos, profesores y responsables.
- Superficie: governance + finance
- Permisos: read-only
- Modelo recomendado: GPT-5.4
- Coste estimado: Bajo: analisis y plantilla

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

