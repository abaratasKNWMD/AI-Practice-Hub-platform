# Prompts iniciales

## Prompt 1 - Briefing verificable

Actua como asistente de codex. Antes de editar, analiza la tarea:

- Objetivo: Enterprise RAG con AST
- Contexto: Disenar un indice de codigo que no corte texto a ciegas, sino por unidades semanticas: funciones, clases, rutas y exports.
- Superficie: AST parsers + embeddings
- Permisos: read-only sobre codigo fuente
- Modelo recomendado: GPT-5.5 para diseno, embeddings para indice
- Coste estimado: Alto inicial, bajo por consulta si se cachea

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

