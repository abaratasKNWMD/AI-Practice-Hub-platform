# CLAUDE.md ejemplo de equipo

## Objetivo

Ayudar a Claude Code a trabajar en este repositorio con contexto estable, bajo coste y cambios verificables.

## Reglas de trabajo

- Antes de editar, leer el fichero objetivo y los tests relacionados.
- Para cambios multiarchivo, proponer plan corto y criterio de cierre.
- Mantener los cambios cerca de la peticion. No refactorizar por gusto.
- Despues de editar, ejecutar la verificacion mas barata que cubra el cambio.
- Si hay incertidumbre de producto, dejar pregunta concreta en vez de inventar comportamiento.
- No introducir secretos, tokens, claves o endpoints privados en ejemplos ni logs.

## Arquitectura

- `app/` contiene pantallas y rutas.
- `components/` contiene UI reutilizable.
- `lib/` contiene schema, loaders y utilidades.
- `public/content/` es la capa de contenido versionada.
- `public/materials/` contiene plantillas y recursos de curso.

## Compact instructions

Cuando se compacte la conversacion, conservar:

- Objetivo del usuario.
- Ficheros editados.
- Decisiones de arquitectura.
- Tests ejecutados y resultado.
- Riesgos pendientes.

## Coste y contexto

- Usar Sonnet para implementacion diaria.
- Reservar Opus para arquitectura compleja, debugging profundo o evaluacion final critica.
- Usar Haiku para subagentes simples de clasificacion, resumen o checks repetitivos.
- Usar `/usage` y `/context` cuando una tarea se alargue o parezca consumir demasiado contexto.
- Usar `/clear` al cambiar de tarea y `/compact` antes de perder informacion importante.

