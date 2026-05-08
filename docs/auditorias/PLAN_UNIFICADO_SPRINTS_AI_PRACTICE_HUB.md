# Plan unificado de sprints - AI Practice Hub

Fecha de corte: 2026-05-08

Este documento deja una foto unica de lo que existe, lo que falta y como ejecutar los siguientes sprints para llevar la plataforma a una version realmente publicable. La idea central es clara: la plataforma debe quitar carga repetitiva de formacion, mover conceptos basicos a autoconsumo y reservar tutorias/workshops para criterio, desbloqueos y practica real.

## 1. Estado ejecutivo

### Ya existe

- Hub principal en `b_cclDMm8Af2f`.
- Rutas activas:
  - `/`
  - `/tracks/codex`
  - `/tracks/copilot`
  - `/tracks/claude`
  - `/player/[slug]`
  - `/operaciones`
- 3 vendors implementados en contenido:
  - Codex.
  - GitHub Copilot.
  - Claude.
- 15 cursos metadata:
  - 5 Codex.
  - 5 Copilot.
  - 5 Claude.
- 69 ejercicios:
  - 20 Codex.
  - 23 Copilot.
  - 26 Claude.
- 11 workshops:
  - 3 Codex.
  - 4 Copilot.
  - 4 Claude.
- 114 materiales:
  - 29 Codex.
  - 48 Copilot.
  - 37 Claude.
- 36 videos CourseScript enlazables:
  - 11 Codex.
  - 12 Copilot.
  - 13 Claude.
- 9 decks HTML:
  - 3 Codex.
  - 3 Copilot.
  - 3 Claude.

### Implementado en esta pasada

- `cx-masterclass-10m-codex-operating-system`.
- `cp-masterclass-10m-copilot-workbench`.
- `cl-masterclass-10m-claude-operating-model`.
- Los tres masterclass quedan enlazados como primer video de cada ruta inicial.
- Los contadores de video de cada vendor ya son dinamicos.
- Nueva pagina `/operaciones` para ver sprints y roadmap de video dentro del hub.
- Nuevos JSON operativos:
  - `b_cclDMm8Af2f/public/content/operations/video-roadmap.json`
  - `b_cclDMm8Af2f/public/content/operations/sprints.json`

## 2. Inventario de cursos y decks

### Codex

- Curso 1: `public/decks/codex/curso-01`
  - Aproximadamente 34 slides.
  - Tiene imagenes embebidas/base64 y assets locales.
  - Estado: fuerte para primera iteracion.
  - Gap: necesita QA visual final y quizas export de capturas definitivas.
- Curso 2: `public/decks/codex/curso-02`
  - Aproximadamente 73 slides.
  - Estado: muy completo.
  - Gap: comprobar cadencia porque puede sentirse largo si no se separa por modulos/workshop.
- Curso 3: `public/decks/codex/curso-03`
  - Aproximadamente 74 slides.
  - Estado: potente para ultra avanzado.
  - Gap: necesita videos largos especificos de swarms, PR review, RAG AST y evaluaciones.

### Copilot

- Curso 1: `public/decks/copilot/curso-01`
  - 42 slides.
  - 17 imagenes usadas.
  - 0 imagenes rotas detectadas.
  - Estado: robusto.
- Curso 2: `public/decks/copilot/curso-02`
  - 41 slides.
  - 23 referencias de imagen.
  - 0 imagenes rotas detectadas.
  - Estado: robusto.
- Curso 3: `public/decks/copilot/curso-03`
  - 45 slides.
  - 30 referencias de imagen.
  - 0 imagenes rotas detectadas.
  - Estado: robusto.

### Claude

- Curso 1: `public/decks/claude/curso-01`
  - 44 slides.
  - 21 referencias de imagen.
  - 0 imagenes rotas detectadas.
  - Estado: fuerte tras ampliacion de visuales inteligentes.
- Curso 2: `public/decks/claude/curso-02`
  - 29 slides.
  - 14 imagenes usadas.
  - 31 assets disponibles.
  - Estado: bueno, pero puede usar mas assets ya creados.
- Curso 3: `public/decks/claude/curso-03`
  - 23 slides.
  - 11 imagenes usadas.
  - 19 assets disponibles.
  - Estado: funcional, pero es el deck que mas necesita ampliacion.
  - Gap prioritario: subirlo a 35-40 slides con hooks, plugins, GitHub Actions, PR triggers, secrets, OIDC, coste CI y capstone.

## 3. Inventario de videos

### Videos implementados

- Codex: 11 videos.
- Copilot: 12 videos.
- Claude: 13 videos.
- Total actual: 36 videos.

### Tipos de video actuales

- Microvideos de 90 segundos a varios minutos:
  - Orientacion.
  - Conceptos concretos.
  - Labs especificos.
  - Coste/modelos/permisos.
- Masterclass inicial de 10 minutos por vendor:
  - Ya implementadas como CourseScript real.

### Lo que falta en videos

- Videos workshop de 30 minutos.
- Video platform/operating model de 60 minutos.
- Video comparativo transversal de 20 minutos.
- Video scripts con respuestas simuladas:
  - Prompt que envia el alumno.
  - Respuesta simulada de Codex/Copilot/Claude.
  - Decision humana.
  - Accion siguiente.
  - Cierre con evidencia.
- Estandarizacion de video desde JSON:
  - Ahora los videos largos se pueden crear como JSON CourseScript, pero no hay una capa de blueprint editable por no-tecnicos que compile automaticamente a escenas.

## 4. Roadmap de videos largos

### Implementado

1. Codex masterclass 10m.
2. Copilot masterclass 10m.
3. Claude masterclass 10m.

### Siguiente bloque

1. `cx-workshop-30m-first-real-task`
   - Repo map.
   - AGENTS.md.
   - Bugfix.
   - Test.
   - Diff.
   - Handoff.

2. `cp-workshop-30m-error-to-pr`
   - Ask.
   - Edit.
   - Agent.
   - Instructions.
   - PR.
   - Premium request budget.

3. `cl-workshop-30m-memory-to-hook`
   - CLAUDE.md.
   - /context.
   - Skill.
   - Subagent.
   - MCP readonly.
   - Hook anti secretos.

4. `hub-operating-model-60m`
   - Flipping training.
   - Tutorias.
   - Cadencia mensual.
   - Metrica de adopcion.
   - Presupuesto de coste.
   - Modelo operativo.

5. `vendor-comparison-20m`
   - Decision Codex vs Copilot vs Claude.
   - Superficies.
   - Memoria.
   - Automatizacion.
   - MCP.
   - Coste.

## 5. Gaps de imagenes, memes y visuales

### No hay urgencia por imagen rota

La auditoria automatica detecta 0 imagenes rotas en los decks estructurados de Copilot y Claude. Codex usa una mezcla de base64, assets locales y capturas QA, pero tampoco aparece un bloqueo evidente.

### Si hay gaps de calidad visual

- Claude curso 3 debe subir de nivel visual:
  - Mas pantallas inteligentes.
  - Mas diagramas de hook lifecycle.
  - Mas PR/CI/coste.
  - Mas pantallas de reflexion.
  - Al menos 2 memes mas con aprendizaje real.
- Claude curso 2 tiene mas assets de los que usa:
  - Hay oportunidad de incrustar mas visuales existentes sin generar nuevos.
- Codex curso 2 y 3 son grandes:
  - Necesitan QA de cadencia, no necesariamente mas imagenes.
- Copilot esta bastante equilibrado:
  - Debe revisarse solo la consistencia visual entre cursos.

## 6. Gaps de ejercicios

### Lo que ya existe

Los ejercicios ya tienen:

- Objetivo.
- Nivel.
- Curso asociado.
- Duracion.
- Superficie.
- Modelo recomendado.
- Permission mode.
- Coste estimado.
- Briefing.
- Tasks.
- Hints.
- Solution.
- MaterialIds.
- VideoSlug.

### Lo que falta para que sean perfectos

- Repos mock por vendor con estado inicial reproducible.
- Carpeta `starter` y carpeta `solution` por ejercicio complejo.
- Diffs esperados.
- Tests reales o simulados por reto.
- Prompts de rescate:
  - "Claude/Codex/Copilot se ha ido por las ramas, como lo reconduzco".
  - "El agente pide permiso peligroso, que hago".
  - "El modelo propone refactor demasiado grande, como reducir scope".
- Rubrica de correccion por ejercicio.
- Evidencia esperada de cierre:
  - comando ejecutado.
  - resultado.
  - archivos tocados.
  - riesgo.
  - siguiente accion.

## 7. Gaps de workshops

### Ya existe

- Workshops metadata por vendor.
- Asociacion a ejercicios.
- VideoSlugs iniciales.
- Notas de facilitador.
- Outputs.

### Falta

- Guion minuto a minuto para workshops de 1 hora.
- Simulaciones de conversacion:
  - prompt del alumno.
  - respuesta esperada de la herramienta.
  - decision del facilitador.
  - posible fallo.
  - salida correcta.
- Videos largos de workshop.
- Packs descargables por workshop:
  - repo mock.
  - instrucciones.
  - solucion.
  - rubrica.
  - checklist de cierre.

## 8. Gaps de producto/plataforma

### Falta para entorno realmente operativo

- Persistencia de progreso por alumno.
- Cohorts o grupos.
- Marcado de ejercicios completados.
- Registro de dudas para tutorias.
- Feedback por curso.
- Versionado de contenido.
- Export de materiales por workshop.
- Analitica de consumo:
  - cursos vistos.
  - videos reproducidos.
  - ejercicios iniciados.
  - ejercicios completados.
- Metrica de coste real o estimado acumulado.
- Modo instructor:
  - ver notas.
  - abrir solucion.
  - ocultar solucion al alumno.

## 9. Sprints recomendados

### Sprint 00 - Foundation multi-vendor

Estado: hecho.

Incluye:

- Hub multi-vendor.
- Decks.
- Cursos.
- Ejercicios.
- Workshops.
- Materiales.
- Microvideos.

### Sprint 01 - Masterclass 10m por vendor

Estado: hecho en esta pasada.

Incluye:

- Codex masterclass 10m.
- Copilot masterclass 10m.
- Claude masterclass 10m.
- Enlaces iniciales por vendor.
- Contadores de video dinamicos.
- Pagina `/operaciones`.

### Sprint 02 - Video factory 30m/60m

Estado: siguiente.

Objetivo:

Estandarizar como se crean videos largos con menos codigo manual.

Entregables:

- Schema `VideoBlueprint`.
- Generador `blueprint -> CourseScript`.
- 3 workshops de 30 minutos.
- 1 video platform de 60 minutos.
- Validacion de duracion/capitulos/subtitulos.

Criterio de done:

- Cada video largo se edita desde JSON.
- Cada escena declara pantalla, voz, subtitulos y accion.
- El reproductor soporta 30-60 min sin romper controles.

### Sprint 03 - Assets inteligentes y memes por deck

Estado: siguiente.

Objetivo:

Homogeneizar calidad visual y humor pedagogico en los 9 decks.

Prioridad:

1. Claude curso 3.
2. Claude curso 2.
3. QA visual de Codex curso 2/3 por longitud.
4. Revision de consistencia Copilot.

Criterio de done:

- Cada deck tiene hero fuerte.
- Cada deck tiene minimo 3 diagramas operativos.
- Cada deck tiene minimo 2 memes utiles.
- Cada deck tiene minimo 2 imagenes de reflexion.
- No hay texto desbordado.

### Sprint 04 - Ejercicios con repos y soluciones

Estado: planificado.

Objetivo:

Convertir el catalogo en retos que se pueden ejecutar solos.

Entregables:

- Starter repo por vendor.
- Materiales por ejercicio.
- Prompts iniciales.
- Prompts de rescate.
- Solucion guiada.
- Diff esperado.
- Rubrica.

### Sprint 05 - Workshops 1h

Estado: planificado.

Objetivo:

Crear sesiones listas para impartir con video simulado y practica.

Entregables:

- Workshop 1h Codex.
- Workshop 1h Copilot.
- Workshop 1h Claude.
- Workshop 1h transversal.
- Guion minuto a minuto.
- Demo simulada.
- Pack instructor.

### Sprint 06 - Release ops

Estado: planificado.

Objetivo:

Preparar uso real con alumnos.

Entregables:

- QA visual desktop/mobile.
- Build y smoke test.
- Checklist release.
- Feedback loops.
- Versionado.
- Metricas de uso.

## 10. Decision recomendada

La siguiente decision tecnica deberia ser:

1. Implementar Sprint 02.
2. Crear `VideoBlueprint` y generador.
3. Construir primero `cx-workshop-30m-first-real-task`.

Motivo:

- Los decks ya existen.
- Los microvideos ya existen.
- Los ejercicios ya existen como metadata.
- El salto de valor esta en los workshops largos con respuestas simuladas.
- Ese formato reduce mas carga semanal que seguir puliendo slides.

## 11. Criterio de plataforma perfecta

La plataforma estara lista para una primera adopcion seria cuando:

- Cada vendor tenga:
  - 5 cursos.
  - 3 decks principales.
  - 1 masterclass de 10 minutos.
  - 1 workshop de 30 minutos.
  - 1 workshop de 1 hora.
  - ejercicios autoconsumibles con solucion.
  - materiales copiables.
  - politica de coste/permisos/modelos.
- La home permita entender:
  - que ruta tomar.
  - que video ver.
  - que ejercicio hacer.
  - que workshop reservar.
- El formador pueda:
  - abrir notas.
  - ver solucion.
  - dirigir tutorias con handoffs.
  - revisar outputs.
- El alumno pueda:
  - consumir solo.
  - practicar.
  - llegar a tutoria con dudas reales.

## 12. Archivos operativos creados

- `b_cclDMm8Af2f/public/courses/cx-masterclass-10m-codex-operating-system.json`
- `b_cclDMm8Af2f/public/courses/cp-masterclass-10m-copilot-workbench.json`
- `b_cclDMm8Af2f/public/courses/cl-masterclass-10m-claude-operating-model.json`
- `b_cclDMm8Af2f/public/content/operations/video-roadmap.json`
- `b_cclDMm8Af2f/public/content/operations/sprints.json`
- `b_cclDMm8Af2f/app/operaciones/page.tsx`

## 13. Actualizacion Sprint 02, 03 y 04

Fecha de aplicacion: 2026-05-08

### Sprint 02 aplicado

Se ha implementado una video factory real:

- Schema TypeScript/Zod:
  - `b_cclDMm8Af2f/lib/video-blueprint-schema.ts`
- Generador TS reutilizable:
  - `b_cclDMm8Af2f/lib/video-blueprint-generator.ts`
- Generador CLI:
  - `b_cclDMm8Af2f/scripts/build-video-blueprints.mjs`
- Comando:
  - `pnpm build:videos`
- Blueprints editables:
  - `b_cclDMm8Af2f/public/video-blueprints/cx-workshop-30m-first-real-task.json`
  - `b_cclDMm8Af2f/public/video-blueprints/cp-workshop-30m-error-to-pr.json`
  - `b_cclDMm8Af2f/public/video-blueprints/cl-workshop-30m-memory-to-hook.json`
  - `b_cclDMm8Af2f/public/video-blueprints/hub-operating-model-60m.json`
- CourseScript generado:
  - `b_cclDMm8Af2f/public/courses/cx-workshop-30m-first-real-task.json`
  - `b_cclDMm8Af2f/public/courses/cp-workshop-30m-error-to-pr.json`
  - `b_cclDMm8Af2f/public/courses/cl-workshop-30m-memory-to-hook.json`
  - `b_cclDMm8Af2f/public/courses/hub-operating-model-60m.json`

Los workshops de vendor quedan enlazados desde sus `workshops.json`, y el roadmap de videos los marca como `implemented`.

### Sprint 03 aplicado

Se ha reforzado la capa visual:

- Claude curso 3 ampliado con:
  - hook payload contract.
  - audit log.
  - marketplace interno.
  - rollout por anillos.
  - secrets lane/OIDC.
  - PR JSON contract.
  - CI cost budget.
  - meme CI slot machine.
  - workshop largo conectado.
  - policy as code.
  - capstone CL3.
- Claude curso 2 reforzado con:
  - loop fix-tests.
  - operator stack.
  - meme agente real vs teatro.
  - meme MCP universal plug.
  - conexion al workshop largo.
- Auditoria visual por deck:
  - `b_cclDMm8Af2f/public/content/operations/asset-audit.json`

### Sprint 04 aplicado

Se han creado packs autoconsumibles por vendor:

- Codex:
  - `b_cclDMm8Af2f/public/exercise-packs/codex/basic-login/`
  - enlazado al ejercicio `cx-b04-bug-login`.
- Copilot:
  - `b_cclDMm8Af2f/public/exercise-packs/copilot/error-to-pr/`
  - enlazado al ejercicio `cp-b06-error-to-fix`.
- Claude:
  - `b_cclDMm8Af2f/public/exercise-packs/claude/memory-to-hook/`
  - enlazado al ejercicio `cl-a01-hook-block-secrets`.

Cada pack contiene:

- `starter/`
- `solution/`
- `prompts.md`
- `rescue-prompts.md`
- `expected.diff`
- `solution-guide.md`
- `rubric.md`

Inventario operativo:

- `b_cclDMm8Af2f/public/content/operations/exercise-packs.json`

### Estado siguiente

Este estado queda superado por la ejecucion posterior de Sprint 05 y Sprint 06. La siguiente linea de trabajo pasa a ser cohortes, progreso local y tutoria.

### Validacion post-implementacion

Ejecutada el 2026-05-08:

- `pnpm build:videos`
  - OK.
  - Genera 4 videos largos:
    - `cx-workshop-30m-first-real-task`: 1.800.000 ms, 12 escenas.
    - `cp-workshop-30m-error-to-pr`: 1.800.000 ms, 12 escenas.
    - `cl-workshop-30m-memory-to-hook`: 1.800.000 ms, 12 escenas.
    - `hub-operating-model-60m`: 3.600.000 ms, 12 escenas.
- Validacion JSON:
  - OK en `public/content`.
  - OK en `public/video-blueprints`.
  - OK en `public/courses`.
- Validacion de imagenes referenciadas:
  - OK, no faltan imagenes enlazadas en decks.
- `pnpm lint`
  - OK con 3 warnings heredadas:
    - `app/api/generate-course/route.ts`: `subtitleDurationMs` no usado.
    - `components/ui/use-toast.ts`: `actionTypes` solo usado como tipo.
    - `hooks/use-toast.ts`: `actionTypes` solo usado como tipo.
- `pnpm exec tsc --noEmit`
  - OK.
  - Se excluye `public/exercise-packs` del typecheck global porque son starter repos didacticos con dependencias y bugs intencionados.
- `pnpm build`
  - OK.
- Smoke test HTTP en `localhost:3001`
  - `/operaciones`: 200.
  - `/player/cx-workshop-30m-first-real-task`: 200.
  - `/player/cp-workshop-30m-error-to-pr`: 200.
  - `/player/cl-workshop-30m-memory-to-hook`: 200.
  - `/player/hub-operating-model-60m`: 200.
  - `/api/courses/cx-workshop-30m-first-real-task`: 200, 30 min, 12 escenas.
  - `/api/courses/cp-workshop-30m-error-to-pr`: 200, 30 min, 12 escenas.
  - `/api/courses/cl-workshop-30m-memory-to-hook`: 200, 30 min, 12 escenas.
  - `/api/courses/hub-operating-model-60m`: 200, 60 min, 12 escenas.
  - `/decks/claude/curso-02/index.html`: 200.
  - `/decks/claude/curso-03/index.html`: 200.
  - `/exercise-packs/codex/basic-login/README.md`: 200.
  - `/exercise-packs/copilot/error-to-pr/README.md`: 200.
  - `/exercise-packs/claude/memory-to-hook/README.md`: 200.

### Pendiente real tras Sprint 05 y 06

- Corregir warnings heredadas de lint.
- Sprint 07:
  - cohortes y progreso local.
  - checklist por curso/workshop/ejercicio.
  - dudas preparadas para tutoria.
- Sprint 08:
  - mas packs autoconsumibles: al menos 3 por vendor.
  - repos starter comprimibles o clonables.
  - validadores por ejercicio.
- Sprint 09:
  - exportacion de guiones de video.
  - render futuro a video real si se decide pasar de simulacion a mp4.

## 14. Actualizacion Sprint 05 y Sprint 06

Fecha de aplicacion: 2026-05-08

### Sprint 05 aplicado

Se han creado 4 workshops de 1 hora con video simulado, demo y pack instructor:

- Codex:
  - blueprint: `b_cclDMm8Af2f/public/video-blueprints/cx-workshop-60m-first-task-to-pr.json`
  - course: `b_cclDMm8Af2f/public/courses/cx-workshop-60m-first-task-to-pr.json`
  - pack: `b_cclDMm8Af2f/public/workshop-packs/codex/cx-workshop-60m-first-task-to-pr/`
  - ruta: `/tracks/codex/workshops/codex-workshop-1h-first-task-to-pr`
- Copilot:
  - blueprint: `b_cclDMm8Af2f/public/video-blueprints/cp-workshop-60m-vscode-to-pr-review.json`
  - course: `b_cclDMm8Af2f/public/courses/cp-workshop-60m-vscode-to-pr-review.json`
  - pack: `b_cclDMm8Af2f/public/workshop-packs/copilot/cp-workshop-60m-vscode-to-pr-review/`
  - ruta: `/tracks/copilot/workshops/copilot-workshop-1h-vscode-to-pr-review`
- Claude:
  - blueprint: `b_cclDMm8Af2f/public/video-blueprints/cl-workshop-60m-memory-to-automation.json`
  - course: `b_cclDMm8Af2f/public/courses/cl-workshop-60m-memory-to-automation.json`
  - pack: `b_cclDMm8Af2f/public/workshop-packs/claude/cl-workshop-60m-memory-to-automation/`
  - ruta: `/tracks/claude/workshops/claude-workshop-1h-memory-to-automation`
- Transversal:
  - blueprint: `b_cclDMm8Af2f/public/video-blueprints/hub-workshop-60m-vendor-selection.json`
  - course: `b_cclDMm8Af2f/public/courses/hub-workshop-60m-vendor-selection.json`
  - pack: `b_cclDMm8Af2f/public/workshop-packs/platform/hub-workshop-60m-vendor-selection/`
  - ruta operativa: `/operaciones`

Cada pack contiene:

- `README.md`
- `minute-by-minute.md`
- `demo-simulated.md`
- `prompts.md`
- `instructor-pack.md`

Inventario operativo:

- `b_cclDMm8Af2f/public/content/operations/workshops-1h.json`

### Sprint 06 aplicado

Se ha creado una capa de release ops:

- Inventario:
  - `b_cclDMm8Af2f/public/content/operations/release-ops.json`
- Checklist:
  - `b_cclDMm8Af2f/public/release-ops/checklists/release-checklist.md`
- Feedback loops:
  - `b_cclDMm8Af2f/public/release-ops/feedback/feedback-loop.md`
- Metricas:
  - `b_cclDMm8Af2f/public/release-ops/metrics/usage-metrics.md`
- QA visual:
  - `b_cclDMm8Af2f/public/release-ops/qa/visual-qa-plan.md`
  - `b_cclDMm8Af2f/public/release-ops/qa/latest-visual-qa.json`
  - `b_cclDMm8Af2f/public/release-ops/qa/screenshots/`
- Versionado:
  - `b_cclDMm8Af2f/public/release-ops/versioning.md`
  - `b_cclDMm8Af2f/public/release-ops/RELEASE_NOTES_v0.2.0.md`
- Scripts:
  - `b_cclDMm8Af2f/scripts/release-smoke.mjs`
  - `b_cclDMm8Af2f/scripts/qa-visual.mjs`
- Comandos:
  - `pnpm release:smoke`
  - `pnpm qa:visual`

### Validacion Sprint 05 y 06

- `pnpm build:videos`: OK.
- Cursos 1h generados:
  - `cx-workshop-60m-first-task-to-pr`: 3.600.000 ms, 12 escenas, 5 capitulos.
  - `cp-workshop-60m-vscode-to-pr-review`: 3.600.000 ms, 12 escenas, 5 capitulos.
  - `cl-workshop-60m-memory-to-automation`: 3.600.000 ms, 12 escenas, 5 capitulos.
  - `hub-workshop-60m-vendor-selection`: 3.600.000 ms, 12 escenas, 5 capitulos.
- `pnpm lint`: OK con 3 warnings heredadas.
- `pnpm exec tsc --noEmit`: OK.
- `pnpm build`: OK.
- `pnpm release:smoke`: OK, 25 checks.
- `pnpm qa:visual`: OK, 8 capturas desktop/mobile.
- QA visual revisada:
  - home mobile renderiza.
  - `/operaciones` mobile ya no tiene overflow horizontal visible.
  - player 60m carga con timeline y controles.

### Estado siguiente real

Siguiente sprint natural:

- Sprint 07 - Cohortes, progreso y tutoria.
- Crear progreso local por alumno.
- Registrar dudas para tutoria.
- Convertir feedback repetido en backlog de microvideos, ejercicios o workshops.
