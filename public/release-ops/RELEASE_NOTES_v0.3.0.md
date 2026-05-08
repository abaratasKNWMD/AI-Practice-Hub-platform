# Release notes v0.3.0 - Learner OS + VideoBlueprint v2

Fecha: 2026-05-08

## Plataforma

- Nueva ruta `/plataforma`.
- Progreso local por curso, video, ejercicio y workshop.
- Estado por ejercicio: no iniciado, en progreso, bloqueado, entregado, revisado.
- Rutas por rol: desarrollador, QA, tech lead, arquitecto y manager.
- Rutas por objetivo: onboarding, productividad, PR, testing, legacy, automatizacion y gobierno.
- Sistema de cohortes, agenda de tutoria y bandeja de dudas recurrentes.
- Panel de instructor con bloqueos, dudas y estados.
- Panel de metricas y export JSON de progreso.
- Badges internos.

## Cursos

- Capa operativa en las paginas de curso Codex, Copilot y Claude.
- Indice de consumo: deck, videos, ejercicios y materiales.
- Resumen ejecutivo por bloque.
- Checkpoints de decision: cuando usar y cuando no usar.
- Modelo, coste y permisos por bloque practico.
- Enlaces directos a ejercicios, microvideos y materiales.

## Videos

- VideoBlueprint v2 con beats.
- Pantallas soportadas: prompt, streaming, diff, terminal, PR review, coste, decision, pausa, quiz, branch timeline y riesgos.
- Workshops 30m regenerados con 24 escenas.
- Videos 60m regenerados con 48 escenas.
- Progreso de video conectado al Learner OS.

## Validacion esperada

- `corepack pnpm build:videos`
- `corepack pnpm lint`
- `corepack pnpm exec tsc --noEmit`
- `corepack pnpm build`
- `corepack pnpm release:smoke`
- `corepack pnpm qa:visual`
