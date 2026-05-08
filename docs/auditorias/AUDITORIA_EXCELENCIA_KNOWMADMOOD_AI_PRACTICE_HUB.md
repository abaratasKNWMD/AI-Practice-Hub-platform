# Auditoria de excelencia - AI Practice Hub knowmadmood

Fecha: 2026-05-08  
Estado: V4 aplicada tras Sprints 02, 03, 04, 05 y 06  
Base tecnica: Next.js en `b_cclDMm8Af2f`, decks HTML/CSS/JS, CourseScript, contenido JSON versionado.

---

## 1. Resumen ejecutivo

La plataforma ya no es solo un hub de cursos. Queda convertida en una primera version completa de producto formativo:

- 3 rutas vendor: Codex, Copilot y Claude.
- 9 decks HTML integrados.
- 44 videos CourseScript JSON.
- 8 videos largos validados: 3 workshops de 30 minutos y 5 videos/workshops de 60 minutos.
- 69 ejercicios con pack autoconsumible.
- 4 starter repos: Codex, Copilot, Claude y transversal.
- Progreso local por curso, video, ejercicio y workshop.
- Estados de ejercicio: no iniciado, en progreso, bloqueado, entregado y revisado.
- Feedback post-ejercicio y post-workshop.
- Operacion con versiones, owners, freshness checklist, revision trimestral, QA y smoke tests.

Diagnostico: V4 ya sirve para lanzar pilotos reales con alumnos. Lo que queda para excelencia enterprise es persistencia multiusuario, analitica centralizada, certificados, QA visual slide-by-slide completo y gobierno de cohorts en backend.

---

## 2. Estado de cursos e imagenes

Fuente viva: `b_cclDMm8Af2f/public/content/operations/deck-asset-usage-audit.json`.

| Vendor | Curso | Slides | Imagenes usadas | Diagramas | Memes | Reflexion | Estado |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Codex | 1 | 34 | 7/7 | 26 | 9 | 56 | OK |
| Codex | 2 | 83 | 14/14 | 67 | 24 | 140 | OK |
| Codex | 3 | 81 | 13/13 | 96 | 28 | 100 | OK |
| Copilot | 1 | 48 | 17/17 | 13 | 30 | 46 | OK |
| Copilot | 2 | 54 | 24/24 | 26 | 37 | 34 | OK |
| Copilot | 3 | 53 | 22/22 | 15 | 39 | 29 | OK |
| Claude | 1 | 48 | 20/20 | 22 | 16 | 57 | OK |
| Claude | 2 | 44 | 23/37 | 18 | 12 | 58 | OK |
| Claude | 3 | 46 | 25/34 | 17 | 17 | 59 | OK |

Todos los cursos superan el minimo pedido:

- Hero fuerte por curso.
- Minimo 3 diagramas operativos.
- Minimo 2 memes utiles.
- Minimo 2 imagenes de reflexion.

Codex curso 2 y Codex curso 3 quedaron auditados sin imagenes no usadas:

- Codex curso 2: 14/14 imagenes usadas.
- Codex curso 3: 13/13 imagenes usadas.

---

## 3. Imagenes nuevas aplicadas

Claude curso 3:

- 4 imagenes nuevas de reflexion.
- 3 memes utiles.
- Insertadas como slides nuevas.

Claude curso 2:

- 3 imagenes nuevas de reflexion.
- 3 diagramas accionables.
- Insertadas como slides nuevas.

Copilot curso 2:

- 5 diagramas operativos nuevos.
- Insertados como slides nuevas.

Codex curso 2:

- Auditoria corregida.
- Se insertaron las dos imagenes pendientes: contexto sin dieta y consola de gobierno.

---

## 4. Estado de videos

Fuente viva: `b_cclDMm8Af2f/public/release-ops/qa/latest-player-qa.json`.

Videos largos validados:

| Video | Duracion | Escenas | Capitulos | Tipos |
| --- | ---: | ---: | ---: | ---: |
| `cx-workshop-30m-first-real-task` | 30m | 24 | 5 | 8 |
| `cp-workshop-30m-error-to-pr` | 30m | 24 | 5 | 7 |
| `cl-workshop-30m-memory-to-hook` | 30m | 24 | 5 | 7 |
| `cx-workshop-60m-first-task-to-pr` | 60m | 48 | 5 | 11 |
| `cp-workshop-60m-vscode-to-pr-review` | 60m | 48 | 5 | 11 |
| `cl-workshop-60m-memory-to-automation` | 60m | 48 | 5 | 11 |
| `hub-workshop-60m-vendor-selection` | 60m | 48 | 5 | 11 |
| `hub-operating-model-60m` | 60m | 48 | 5 | 11 |

El player ya soporta:

- Prompt typed.
- Respuesta streaming simulada.
- Diff viewer.
- Terminal output.
- PR review view.
- Cost/token/model meter.
- Decision overlay.
- Instructor pause.
- Quiz/checkpoint.
- Branch timeline.
- Riesgos/permisos por escena.
- Voz declarada, subtitulos y accion por escena.

---

## 5. Ejercicios

Fuente viva: `b_cclDMm8Af2f/public/content/operations/exercise-packs.json`.

Inventario:

- Codex: 20 ejercicios.
- Copilot: 23 ejercicios.
- Claude: 26 ejercicios.
- Total: 69 ejercicios con pack.

Cada pack incluye:

- Starter.
- Datos mock.
- Errores intencionados.
- Validador `validator.mjs`.
- Prompts iniciales.
- Prompts de rescate.
- Solucion guiada.
- Diff esperado.
- Rubrica.
- Autoevaluacion.
- Modo instructor.
- PR simulado.
- Coste estimado desde la ficha del ejercicio.

Starters globales:

- `public/exercise-packs/starters/codex-starter`
- `public/exercise-packs/starters/copilot-starter`
- `public/exercise-packs/starters/claude-starter`
- `public/exercise-packs/starters/transversal-starter`

---

## 6. Operacion

Ficheros nuevos o actualizados:

- `public/content/operations/content-versions.json`
- `public/content/operations/freshness-checklist.json`
- `public/content/operations/ownership.json`
- `public/content/operations/quarterly-review.json`
- `public/content/operations/usage-measurement.json`
- `public/content/operations/codex-image-usage-audit.json`
- `public/content/operations/deck-asset-usage-audit.json`
- `public/release-ops/qa/latest-deck-qa.json`
- `public/release-ops/qa/latest-player-qa.json`

Comandos operativos:

```bash
pnpm build:videos
pnpm qa:decks
pnpm qa:player
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm release:smoke
pnpm qa:visual
```

---

## 7. Capa alumno e instructor

Aplicado en UI:

- Panel de pack autoconsumible en cada ejercicio.
- Registro local de apertura de packs.
- Feedback post-ejercicio.
- Feedback post-workshop.
- Eventos locales en `ai-practice-hub.usage-events.v1`.
- Feedback local en `ai-practice-hub.feedback.v1`.
- Estados de ejercicio en `ExerciseStatusWidget`.

Esto permite usar la plataforma en piloto sin backend.

---

## 8. Validacion actual

Validado:

- `pnpm build:videos`: OK.
- `pnpm qa:decks`: OK, 9 decks.
- `pnpm qa:player`: OK, 8 videos largos.
- `pnpm exec tsc --noEmit`: OK.
- `pnpm lint`: OK con 3 warnings heredados no bloqueantes.
- `pnpm build`: OK.
- `pnpm release:smoke`: OK, 41 checks.
- `pnpm qa:visual`: OK, 10 screenshots.

---

## 9. Que falta para excelencia enterprise

Prioridad 1:

- Persistencia real en backend para progreso, feedback, cohortes y metricas.
- Login de alumno/instructor.
- Panel instructor real con filtros por cohorte, vendor, rol, objetivo y estado.
- Export CSV/JSON centralizado.

Prioridad 2:

- QA visual slide-by-slide de los 9 decks, no solo auditoria estatica.
- Capturas desktop/mobile por curso completo.
- Deteccion automatica de texto desbordado por screenshot.
- Review humana final de tono, humor y cadencia.

Prioridad 3:

- Certificados o badges internos.
- Integracion LMS o SharePoint/Drive.
- Agenda real de tutorias.
- Bandeja de dudas recurrentes con deduplicacion.
- Analytics de adopcion por equipo.

Prioridad 4:

- Render opcional de videos simulados a MP4.
- Narracion TTS cacheada por escena.
- Editor visual de `VideoBlueprint`.
- Modo presentador con notas, pausas y temporizador.

---

## 10. Veredicto

La plataforma esta lista para piloto serio. Ya no falta contenido base: falta endurecerla como producto multiusuario y como sistema de medicion real.

Siguiente sprint recomendado: backend ligero de progreso + panel instructor + QA visual exhaustiva de decks.
