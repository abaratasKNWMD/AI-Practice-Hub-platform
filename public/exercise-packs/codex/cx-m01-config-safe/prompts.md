# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Config segura de Codex
- Contexto: Convertir una configuracion informal en perfiles claros de uso: lectura, escritura, ejecucion de tests y uso de red.
- Superficie: config.toml + permisos
- Permisos: workspace-write controlado
- Modelo recomendado: GPT-5.4
- Coste estimado: Bajo: edicion de plantilla y revision

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

