# Auditoria Omega - AI Practice Hub

Fecha: 2026-05-07  
Workspace auditado: `Formaciones Copilot/21 abril`  
Objetivo: transformar cursos, ejercicios y demos en una plataforma de activacion practica para GitHub Copilot, Codex, Claude e IA aplicada a desarrollo.

## 0. Resumen Ejecutivo

La necesidad no es crear otra formacion lineal de 12 horas. La necesidad es crear una plataforma que absorba demanda, reduzca repeticion docente, eleve el nivel de las tutorias y convierta a usuarios con poca experiencia en practicantes capaces de resolver retos con IA.

La estrategia recomendada es construir un **AI Practice Hub** con tres capas:

1. **Capa de rutas formativas**: Copilot, Codex, Claude, Git/GitHub minimo, IA para desarrollo.
2. **Capa de ejercicios autoconsumibles**: basic, medium, advanced, con repo inicial, pistas, solucion, prompts y validacion.
3. **Capa de microvideos simulados**: motor CourseScript, donde el video no es video renderizado, sino escenas interactivas guiadas por JSON, subtitulos, voz y componentes visuales.

El activo mas importante detectado es `b_cclDMm8Af2f`, porque ya contiene un motor CourseScript con:

- Player React/Next.
- Escenas animadas.
- Subtitulos.
- TTS via Edge.
- Pipeline generativo con agentes.
- Esquema JSON documentado.

El segundo activo clave es `workspace-github-copilot-main`, porque contiene ejercicios Copilot reales que pueden convertirse en retos autoconsumibles.

El tercer activo son los tres cursos Codex ya construidos:

- `01-curso-codex-web`: 34 pantallas.
- `02-curso-codex-potente-web`: 73 pantallas.
- `03-curso-codex-ultra-avanzado-web`: 74 pantallas.

La conclusion principal: **el video simulado debe ser plataforma central**, pero no como sustituto del ejercicio. Debe actuar como pre-brief, demo guiada y solucion narrada.

## 1. Ingenieria Inversa del Repo Actual

### 1.1 Raiz del workspace

Activos principales encontrados:

- `01-curso-codex-web`
- `02-curso-codex-potente-web`
- `03-curso-codex-ultra-avanzado-web`
- `b_cclDMm8Af2f`
- `workspace-github-copilot-main`
- 6 PPTX fuente:
  - `-01knm-ai-context-1-core.v1.1.pptx`
  - `-02knm-ai-assisted-development-1-core.v1.1.pptx`
  - `-03knm-ai-code-assistant-1-core.v1.1.pptx`
  - `knm-github-copilot-2-core.v1.2.pptx`
  - `knm-github-copilot-3-feature-basic.v1.2.pptx`
  - `knm-github-copilot-4-feature-advance-phase-1.v1.2.pptx`

### 1.2 Estado de los cursos Codex

Curso 1:

- Carpeta: `01-curso-codex-web`
- Pantallas: 34.
- Assets locales: 7.
- Materiales: si.
- Foco: Codex aterrizado a desarrolladores, contexto, workflow, coste, permisos, labs basicos.

Curso 2:

- Carpeta: `02-curso-codex-potente-web`
- Pantallas: 73.
- Assets locales: 14.
- Materiales: si.
- Foco: Codex potente, GPT-5.5 multimodal, modelos, coste, MCP, skills, subagentes, workflows, gobierno.

Curso 3:

- Carpeta: `03-curso-codex-ultra-avanzado-web`
- Pantallas: 74.
- Assets locales: 13.
- Materiales: si.
- Foco: swarms, API-first, datos sinteticos, destilacion, Enterprise RAG, jueces, CI/CD, gobierno.

Total Codex:

- 181 pantallas detectadas por metadata de slides.
- 34 assets raster principales.
- 3 kits de materiales.
- 15 labs Codex aproximados.
- Varios ejemplos ejecutables con tests.

### 1.3 Estado de los materiales Codex

Curso 1 contiene:

- Prompts Codex.
- Plantillas.
- Labs:
  - onboarding
  - bug login
  - review
- Mini proyecto `ejemplo-login`.
- Tests Node.

Curso 2 contiene:

- Prompts potentes.
- Labs:
  - modelos y coste
  - debug multimodal UI
  - MCP read-only
  - skill de equipo
  - subagentes review
  - capstone potente
- Ejemplos:
  - MCP read-only docs
  - session cost audit
  - UI debug
- Skill:
  - `qa-visual-codex`

Curso 3 contiene:

- Prompts ultra.
- Labs:
  - PR swarm local
  - API-first batch
  - dataset sintetico
  - RAG AST index
  - jueces/evals
  - capstone ultra
- Ejemplos:
  - batch JSONL planner
  - PR swarm local
  - RAG AST mini
  - synthetic dataset pipeline
- Skills:
  - `pr-swarm-codex`
  - `code-rag-index-codex`

### 1.4 Estado de los ejercicios Copilot

Carpeta: `workspace-github-copilot-main`

Contiene:

- 35 documentos Markdown de ejercicios.
- 30 archivos en `solutions`.
- Templates:
  - `prompt.template.md`
  - `exercise.template.md`
- Config:
  - custom commands
  - multiple GitHub accounts
  - MCP
- Offdocs:
  - code style
  - commit style

Ejercicios existentes detectados:

1. Setup Copilot.
2. Setup Copilot CLI.
3. Cheatsheets.
4. Code completion.
5. Shortcuts.
6. Comment to code.
7. Comment to code advanced.
8. Copilot Chat.
9. Copilot Chat inline.
10. Copilot Chat explain.
11. Copilot Chat refactoring.
12. Copilot Chat code fixes.
13. Copilot CLI explain interactive.
14. Copilot CLI explain programmatic.
15. Copilot CLI suggest programmatic.
16. Copilot CLI execution programmatic.
17. Smart actions.
18. Code review.
19. Unit test.
20. Test cases.
21. Documentation general.
22. Documentation code.
23. Custom instructions.
24. Best practices instructions.
25. Example all-in-one instructions.
26. Example specific Python instructions.
27. Custom agents.
28. Prompts.
29. Prompt example update README.
30. MCP GitHub.
31. Ask Gordon/PostgreSQL.
32. Orchestrator skills.

Observacion: hay documentos de apoyo y ejemplos que no son ejercicios puros, por eso el conteo funcional ronda 30-32 retos reutilizables.

### 1.5 Estado de `b_cclDMm8Af2f`

Es una app Next.js con:

- Next 16.
- React 19.
- Framer Motion.
- Tailwind.
- Lucide.
- Edge TTS.
- Rutas:
  - `/`
  - `/crear`
  - `/player/[slug]`
  - `/api/tts`
  - `/api/generate-course`
  - `/api/courses`
  - `/api/courses/[slug]`

Escenas existentes:

1. `title`
2. `concept`
3. `compare`
4. `linear`
5. `thinking`
6. `coding`
7. `preview`
8. `error`
9. `finale`

Capacidades existentes:

- Timed scenes.
- Subtitulos sincronizados.
- Voz generada por TTS.
- Controles de play/pause/restart/seek.
- Pipeline de tres agentes.
- Esquema CourseJSON documentado.

Deuda tecnica critica detectada:

- La documentacion afirma que `MoviePlayer` acepta `course`, pero la implementacion actual de `MoviePlayer` no recibe props.
- `useMoviePlayer` esta acoplado a `MOVIE_SCRIPT` y `TOTAL_DURATION_MS`.
- `Controls` importa `CHAPTERS` y `TOTAL_DURATION_MS` desde `movie-script`.
- `/player/[slug]` intenta hacer `<MoviePlayer course={course} />`, lo que exige refactor.
- La escena `preview` esta documentada como parcialmente hardcoded.
- El motor generativo usa `GROQ_API_KEY`, por tanto la plataforma sin esa variable solo reproduce, no genera.

Conclusion tecnica: `b_ccl` es reutilizable, pero hay que convertirlo de demo a motor parametrico real.

## 2. Vision de Producto

### 2.1 Nombre de trabajo

`AI Practice Hub`

Alternativas:

- `AI Dev Gym`
- `Copilot & Codex Academy`
- `IA Developer Lab`
- `Agentic Engineering Hub`
- `Knowmad AI Practice`

### 2.2 Promesa

Una plataforma interna donde cualquier desarrollador pueda:

- Ver una demo corta.
- Entender el flujo.
- Ejecutar un reto.
- Consultar pistas.
- Ver solucion resuelta.
- Llegar a tutorias con dudas concretas.

### 2.3 Problema que resuelve

Problemas actuales:

- Mucha demanda reactiva.
- Gente con conocimientos desiguales.
- Formaciones tardias.
- Cursos largos que consumen voz, agenda y preparacion.
- Preguntas de base repetidas: Git, fork, PR, setup.
- Falta de practica entre sesiones.
- Los alumnos saben usar un poco la herramienta, pero no tienen experiencia.

Solucion:

- Flipped training.
- Microvideos previos.
- Retos autoconsumibles.
- Tutoría programada.
- Workshops de retos.
- Material vivo y trazable.

### 2.4 Principio de diseño

El profesor deja de ser narrador repetitivo y pasa a ser:

- Curador.
- Coach.
- Reviewer.
- Desbloqueador.
- Diseñador de retos.

## 3. Arquitectura Objetivo

### 3.1 Componentes principales

1. **Portal**
   - Catalogo de rutas.
   - Buscador.
   - Filtros por nivel, herramienta, duracion, rol.
   - Estado de progreso.

2. **CourseScript Studio**
   - Player de videos simulados.
   - Editor/generador JSON.
   - Vista previa.
   - TTS.
   - Subtitulos.
   - Plantillas por herramienta.

3. **Exercise Engine**
   - Catalogo de retos.
   - Detalle de ejercicio.
   - Pistas progresivas.
   - Solucion.
   - Validacion local.
   - Descarga/copia de archivos iniciales.

4. **Workshop Builder**
   - Agrupa videos + retos + soluciones.
   - Crea sesiones de 1h, 2h, 4h o 12h.
   - Exporta agenda.
   - Exporta checklist de profesor.

5. **Tutorias**
   - Reserva de slots.
   - Enlace a reto concreto.
   - Pregunta obligatoria antes de reservar.
   - Evidencias adjuntas: repo, captura, error, comando.

6. **Admin Content**
   - Gestion de cursos.
   - Gestion de ejercicios.
   - Gestion de videos.
   - Versionado.
   - Publicacion.

### 3.2 Recomendacion de tecnologia

Base recomendada:

- Next.js como app principal.
- Reutilizar `b_cclDMm8Af2f` como base del motor de video.
- Migrar/absorber las webs estaticas Codex como contenido o rutas embebidas.
- Convertir ejercicios a JSON/MDX tipado.
- Usar filesystem al principio; base de datos despues.

Fase 1:

- JSON + Markdown en repo.
- Sin login.
- Sin tracking persistente o con localStorage.

Fase 2:

- Login interno.
- Progreso por usuario.
- Analytics de consumo.
- Favoritos.
- Solicitud de tutoría.

Fase 3:

- CMS o Git-backed content.
- Generacion asistida.
- Versionado de cursos.
- Exportacion SCORM/LMS si hiciera falta.

## 4. Modelo de Contenido

### 4.1 Entidades principales

`Track`

- Ruta formativa: Copilot, Codex, Claude, Git, IA Dev.

`Course`

- Unidad formativa grande.
- Puede contener modulos, videos, ejercicios y workshops.

`Module`

- Agrupa conceptos y retos.

`MicroVideo`

- CourseScript JSON.
- 3-10 minutos.
- Con escenas, subtitulos, voz y capitulos.

`Exercise`

- Reto autoconsumible.
- Tiene instrucciones, materiales, prompts, pistas, solucion y validacion.

`Workshop`

- Secuencia curada de videos y ejercicios para una sesion.

`Asset`

- Imagen, screenshot, mock, audio, plantilla, fixture, repo inicial.

`TutorSlot`

- Bloque de tutoria asociado a dudas de ejercicios.

### 4.2 Flujo ideal de aprendizaje

1. Alumno entra al portal.
2. Elige ruta.
3. Ve pretest o autodiagnostico.
4. Consume microvideo de 5 minutos.
5. Abre reto.
6. Prepara repo o usa sandbox.
7. Ejecuta prompts.
8. Valida con tests/checklist.
9. Consulta pista si se bloquea.
10. Ve solucion narrada si no llega.
11. Marca como completado.
12. Solo pide tutoría si tiene evidencia concreta.

### 4.3 Tipos de cursos

1. **Curso teoria condensada**
   - Similar a las webs Codex.
   - Pantallas 16:9.
   - Notas de creador.
   - Uso para referencia.

2. **Curso practico**
   - Microvideos + ejercicios.
   - Menos texto, mas accion.
   - Ideal para Copilot.

3. **Workshop**
   - Secuencia ejecutable.
   - Retos con tiempos.
   - Preparado para directo.

4. **Playbook**
   - Material de consulta.
   - Prompts, checklists, templates.

5. **Capstone**
   - Reto integrador.
   - Evaluacion final.

## 5. Video como Plataforma Central

### 5.1 Por que el video simulado es central

El video simulado resuelve tres problemas:

- Explica sin gastar voz del formador.
- Enseña flujo sin depender de una demo en vivo que puede fallar.
- Permite modificar contenido via JSON sin regrabar.

No sustituye al ejercicio. Lo prepara.

### 5.2 Usos del microvideo

1. Intro de curso.
2. Explicacion de concepto.
3. Demo de herramienta.
4. Pre-brief de ejercicio.
5. Solucion narrada.
6. Error comun.
7. Comparativa antes/despues.
8. Cierre de workshop.
9. Onboarding de setup.
10. Explicacion de Git/fork/PR.

### 5.3 Insercion de videos

Los videos deben poder insertarse en:

- Cabecera de curso.
- Inicio de modulo.
- Dentro de un ejercicio.
- En la seccion "ver solucion".
- En workshops.
- En paginas de ayuda.
- En rutas de onboarding.
- En tutorías como material obligatorio previo.

### 5.4 Tipos de microvideo por duracion

`nano`

- 60-90 segundos.
- Para definiciones: fork, branch, PR, prompt, contexto.

`micro`

- 3-5 minutos.
- Para explicar un flujo: fix bug, generar test, review.

`lesson`

- 7-10 minutos.
- Para workshop guiado.

`deep`

- 12-20 minutos.
- Para temas complejos: MCP, agentes, RAG, CI/CD.

### 5.5 Escenas existentes reutilizables

1. `title`
2. `concept`
3. `compare`
4. `linear`
5. `thinking`
6. `coding`
7. `preview`
8. `error`
9. `finale`

### 5.6 Escenas nuevas necesarias para Copilot/Codex/Claude

1. `vscode-shell`
   - Visualiza VS Code con explorer, editor, terminal y chat.

2. `copilot-chat`
   - Simula conversacion con Copilot Chat.

3. `codex-agent`
   - Simula agente que planifica, edita, ejecuta tests y resume.

4. `claude-artifact`
   - Simula artifact o workspace Claude.

5. `terminal-run`
   - Ejecuta comandos simulados con salida controlada.

6. `git-flow`
   - Muestra fork, clone, branch, commit, push, PR.

7. `diff-review`
   - Muestra diff antes/despues con highlights.

8. `prompt-lab`
   - Muestra prompt malo, prompt mejorado y resultado.

9. `test-runner`
   - Simula test rojo, cambio, test verde.

10. `browser-preview`
   - Muestra una mini UI o app corriendo.

11. `security-gate`
   - Muestra permisos, secretos, sandbox, red.

12. `cost-meter`
   - Muestra coste, tokens, input, output, cached input.

13. `agent-trace`
   - Timeline de acciones del agente.

14. `multi-agent-board`
   - Arquitecto, developer, QA, security, orchestrator.

15. `quiz-pause`
   - Pregunta interactiva antes de continuar.

16. `exercise-brief`
   - Presenta objetivo, archivos y criterios de aceptacion.

17. `solution-reveal`
   - Explica solucion paso a paso.

18. `mistake-scene`
   - Error tipico y por que pasa.

19. `checkpoint`
   - Resume lo hecho y desbloquea siguiente reto.

20. `tutor-trigger`
   - Indica cuando pedir ayuda y que evidencia traer.

### 5.7 Respuesta a la duda "hay que codificar todas las escenas?"

No hay que codificar cada video desde cero. Hay que codificar un **catalogo estable de escenas**.

Despues cada video se compone con JSON:

- Escena 1: title.
- Escena 2: vscode-shell.
- Escena 3: copilot-chat.
- Escena 4: diff-review.
- Escena 5: test-runner.
- Escena 6: finale.

Solo se codifica una escena nueva cuando aparece un patron visual que se repetira muchas veces.

### 5.8 Reglas para decidir si una escena se codifica

Codificar escena si:

- Aparece en mas de 3 videos.
- Tiene animacion repetible.
- Representa un flujo importante.
- Reduce mucho trabajo manual.
- Puede parametrizarse por JSON.

No codificar escena si:

- Es una imagen unica.
- Es un caso demasiado especifico.
- Puede resolverse con `concept`, `coding`, `compare` o `preview`.

## 6. Plataforma de Ejercicios

### 6.1 Objetivo

Que la persona pueda practicar sin profesor y llegar a tutoria con una duda concreta.

### 6.2 Anatomia de un ejercicio

Cada ejercicio debe tener:

1. ID unico.
2. Titulo.
3. Track.
4. Nivel.
5. Duracion estimada.
6. Herramienta principal.
7. Requisitos previos.
8. Microvideo de pre-brief.
9. Contexto.
10. Objetivo.
11. Archivos iniciales.
12. Instrucciones paso a paso.
13. Prompt recomendado.
14. Prompt alternativo.
15. Pistas progresivas.
16. Criterios de aceptacion.
17. Comandos de validacion.
18. Errores frecuentes.
19. Solucion textual.
20. Video solucion.
21. Extension opcional.
22. Rubrica.
23. Cuando pedir tutoría.

### 6.3 Niveles

`basic`

- Setup.
- Flujo guiado.
- Pocas decisiones.
- Validacion simple.

`medium`

- Contexto real.
- Varios archivos.
- Tests.
- Refactor.
- Prompts con restricciones.

`advanced`

- Agentes.
- MCP.
- CI/CD.
- Seguridad.
- Coste.
- Arquitectura.

`ultra`

- Swarms.
- API-first.
- RAG.
- Evals.
- Datasets.
- Workflows corporativos.

### 6.4 Tipos de reto

1. Setup.
2. Completion.
3. Prompting.
4. Explain.
5. Bugfix.
6. Refactor.
7. Test generation.
8. Documentation.
9. Code review.
10. PR workflow.
11. Agent workflow.
12. MCP integration.
13. Cost audit.
14. Security review.
15. RAG index.
16. Batch automation.
17. Dataset generation.
18. Multi-agent orchestration.
19. Evaluation.
20. Capstone.

## 7. Catalogo de Cursos Recomendado

### 7.1 Ruta 0 - Git/GitHub Survival

Motivo: si no se resuelve esto, las tutorias se llenan de dudas que no son IA.

Curso: `Git y GitHub minimo para IA`

Modulos:

1. Que es repo, clone, fork.
2. Branch, commit, push.
3. Pull request.
4. Conflictos basicos.
5. Como preparar una duda tecnica.

Microvideos:

1. Fork en 90 segundos.
2. Branch sin miedo.
3. PR como conversacion.
4. Como adjuntar evidencia.

Ejercicios:

1. Clonar repo.
2. Crear branch.
3. Editar archivo.
4. Commit.
5. Abrir PR.
6. Resolver conflicto simple.
7. Preparar issue de duda.

### 7.2 Ruta 1 - GitHub Copilot Basic

Objetivo: que la persona use Copilot sin depender del profesor.

Modulos:

1. Setup y modelo mental.
2. Completion.
3. Chat.
4. Inline chat.
5. Explain.
6. Fix.
7. Refactor.
8. Tests.
9. Docs.
10. Review.

Ejercicios base desde repo actual:

- Setup Copilot.
- Shortcuts.
- Code completion.
- Comment to code.
- Copilot Chat.
- Inline Chat.
- Explain.
- Refactoring.
- Code fixes.
- Unit tests.
- Test cases.
- Documentation.
- Code review.

Microvideos necesarios:

1. Copilot no es magia: contexto y archivo activo.
2. Completion: aceptar, rechazar, editar.
3. Chat: pregunta buena vs pregunta vaga.
4. Inline: cambio pequeno sin romper foco.
5. Fix bug: de error a cambio.
6. Tests: de funcion a casos.
7. Review: pedir riesgos y edge cases.

### 7.3 Ruta 2 - GitHub Copilot Medium

Objetivo: pasar de uso casual a flujo productivo.

Modulos:

1. Contexto de workspace.
2. Prompts reutilizables.
3. Custom instructions.
4. Refactor con tests.
5. Documentacion mantenible.
6. PR con Copilot.
7. Debugging guiado.
8. Buenas practicas.

Ejercicios:

1. Mejorar prompt de refactor.
2. Crear instrucciones de repo.
3. Convertir issue en plan.
4. Generar test suite.
5. Revisar PR con checklist.
6. Documentar modulo.
7. Refactor con snapshot de comportamiento.
8. Debug con logs.

### 7.4 Ruta 3 - GitHub Copilot Advanced

Objetivo: agentes, MCP, instrucciones corporativas y automatizacion.

Modulos:

1. Custom agents.
2. MCP.
3. Orquestadores.
4. Skills.
5. GitHub Actions.
6. Seguridad.
7. Gobierno.

Ejercicios existentes aprovechables:

- Custom agents.
- MCP GitHub.
- Ask Gordon/PostgreSQL.
- Orchestrator skills.
- Advanced prompts.
- Instructions best practices.

Microvideos:

1. De chat a agente.
2. MCP sin miedo.
3. Skill como conocimiento empaquetado.
4. PR review automatizable.
5. Gobierno y permisos.

### 7.5 Ruta 4 - Codex Basic

Basada en `01-curso-codex-web`.

Modulos:

1. Superficies Codex.
2. Contexto.
3. Prompt operativo.
4. Permisos.
5. Coste.
6. Labs.

Ejercicios:

1. Onboarding repo.
2. Bug login.
3. Review.
4. Crear AGENTS.md.
5. Registro de coste.

Microvideos:

1. Codex como agente de ingenieria.
2. El problema de la X.
3. Contexto minimo util.
4. Bug login con evidencia.
5. Review con riesgos.

### 7.6 Ruta 5 - Codex Potente

Basada en `02-curso-codex-potente-web`.

Modulos:

1. GPT-5.5 y modelos.
2. Multimodal.
3. Contexto.
4. MCP.
5. Skills.
6. Subagentes.
7. Coste y seguridad.
8. Capstone.

Ejercicios existentes:

1. Modelos y coste.
2. Debug multimodal UI.
3. MCP read-only.
4. Skill de equipo.
5. Subagentes review.
6. Capstone potente.

Microvideos:

1. Palanca de reasoning.
2. Imagen + codigo + consola.
3. MCP read-only en accion.
4. Skill para QA visual.
5. Handoff entre agentes.
6. Prompt injection y red.

### 7.7 Ruta 6 - Codex Ultra

Basada en `03-curso-codex-ultra-avanzado-web`.

Modulos:

1. Swarms.
2. API-first.
3. Batch automation.
4. Synthetic data.
5. Enterprise RAG.
6. Jueces y evals.
7. Gobierno.

Ejercicios existentes:

1. PR swarm local.
2. API-first batch.
3. Dataset sintetico.
4. RAG AST index.
5. Jueces/evals.
6. Capstone ultra.

Microvideos:

1. Debate entre agentes con protocolo.
2. Batch nocturno con JSONL.
3. Dataset sintetico con evidencia.
4. AST chunking.
5. LLM-as-a-Judge calibrado.
6. Gobierno de plataforma.

### 7.8 Ruta 7 - Claude para Desarrollo

Objetivo: cubrir demanda futura y multi-herramienta.

Modulos:

1. Claude Projects.
2. Contexto largo.
3. Artifacts.
4. Analisis de repo.
5. Refactor guiado.
6. Documentacion.
7. Comparativa con Copilot/Codex.

Ejercicios:

1. Explicar modulo grande.
2. Generar plan de refactor.
3. Crear artifact de UI.
4. Revisar arquitectura.
5. Convertir documento en checklist.
6. Comparar salida con Codex.

Microvideos:

1. Claude como analista.
2. Artifact como prototipo.
3. Contexto largo sin perder foco.
4. Claude vs Copilot vs Codex.

## 8. Workshops

### 8.1 Workshop como producto

Un workshop no debe ser una charla. Debe ser una secuencia:

1. Prework.
2. Microvideo.
3. Reto.
4. Pistas.
5. Solucion.
6. Debrief.
7. Siguiente reto.

### 8.2 Formatos

`workshop-60`

- 1 microvideo.
- 2 retos.
- 1 cierre.

`workshop-120`

- 2-3 microvideos.
- 4 retos.
- 1 capstone pequeno.

`workshop-240`

- 4-6 microvideos.
- 8 retos.
- Debrief por equipos.

`workshop-12h`

- Ruta completa.
- Prework obligatorio.
- Sesiones de dudas.
- Capstone final.

### 8.3 Workshops iniciales recomendados

1. Copilot Primeros Pasos.
2. Copilot Chat para resolver bugs.
3. Copilot para tests y refactor.
4. Git/GitHub para IA.
5. Codex Onboarding Repo.
6. Codex Bugfix con tests.
7. Codex Review y coste.
8. Codex Agentes y MCP.
9. Codex Ultra PR Swarm.
10. Claude para analisis de codigo.

## 9. Requisitos Funcionales

### 9.1 Plataforma

R001. La plataforma debe mostrar un catalogo de rutas formativas.  
R002. La plataforma debe permitir filtrar por herramienta.  
R003. La plataforma debe permitir filtrar por nivel.  
R004. La plataforma debe permitir filtrar por duracion.  
R005. La plataforma debe permitir filtrar por formato: curso, ejercicio, workshop, video.  
R006. La plataforma debe tener busqueda textual.  
R007. La plataforma debe mostrar progreso por ruta.  
R008. La plataforma debe mostrar requisitos previos por curso.  
R009. La plataforma debe mostrar tiempo estimado.  
R010. La plataforma debe distinguir contenido obligatorio y opcional.  
R011. La plataforma debe tener una ruta de onboarding Git/GitHub.  
R012. La plataforma debe permitir enlazar directamente a un ejercicio.  
R013. La plataforma debe permitir enlazar directamente a un microvideo.  
R014. La plataforma debe permitir marcar contenido como completado.  
R015. La plataforma debe permitir resetear progreso.  
R016. La plataforma debe funcionar inicialmente sin backend persistente.  
R017. La plataforma debe poder migrar a progreso persistente.  
R018. La plataforma debe poder exportar una ruta como agenda de workshop.  
R019. La plataforma debe poder mostrar material de profesor.  
R020. La plataforma debe separar material de alumno y material interno.

### 9.2 Cursos

R021. Cada curso debe tener ID estable.  
R022. Cada curso debe tener titulo.  
R023. Cada curso debe tener descripcion.  
R024. Cada curso debe tener herramienta principal.  
R025. Cada curso debe tener nivel.  
R026. Cada curso debe tener duracion estimada.  
R027. Cada curso debe tener modulos.  
R028. Cada curso debe tener objetivos de aprendizaje.  
R029. Cada curso debe tener prerrequisitos.  
R030. Cada curso debe tener microvideos asociados.  
R031. Cada curso debe tener ejercicios asociados.  
R032. Cada curso debe tener recursos.  
R033. Cada curso debe tener criterio de finalizacion.  
R034. Cada curso debe tener version.  
R035. Cada curso debe tener fecha de ultima revision.  
R036. Cada curso debe tener owner.  
R037. Cada curso debe indicar si esta listo para impartir.  
R038. Cada curso debe indicar si esta listo para autoconsumo.  
R039. Cada curso debe poder incluir slides existentes.  
R040. Cada curso debe poder incluir videos CourseScript.

### 9.3 Ejercicios

R041. Cada ejercicio debe tener ID estable.  
R042. Cada ejercicio debe tener nivel.  
R043. Cada ejercicio debe tener tiempo estimado.  
R044. Cada ejercicio debe tener objetivo.  
R045. Cada ejercicio debe tener contexto.  
R046. Cada ejercicio debe tener archivos iniciales.  
R047. Cada ejercicio debe tener instrucciones paso a paso.  
R048. Cada ejercicio debe tener prompts recomendados.  
R049. Cada ejercicio debe tener criterios de aceptacion.  
R050. Cada ejercicio debe tener comandos de validacion cuando aplique.  
R051. Cada ejercicio debe tener pistas progresivas.  
R052. Cada ejercicio debe tener solucion.  
R053. Cada ejercicio debe tener video solucion cuando sea prioritario.  
R054. Cada ejercicio debe tener errores frecuentes.  
R055. Cada ejercicio debe indicar cuando pedir tutoria.  
R056. Cada ejercicio debe indicar que evidencia llevar a tutoria.  
R057. Cada ejercicio debe estar vinculado a uno o mas conceptos.  
R058. Cada ejercicio debe estar vinculado a uno o mas videos.  
R059. Cada ejercicio debe poder descargarse o copiarse.  
R060. Cada ejercicio debe poder ejecutarse localmente cuando sea codigo.

### 9.4 Videos CourseScript

R061. Cada video debe ser un JSON validado por schema.  
R062. Cada video debe tener ID.  
R063. Cada video debe tener titulo.  
R064. Cada video debe tener descripcion.  
R065. Cada video debe tener duracion.  
R066. Cada video debe tener escenas.  
R067. Cada video debe tener subtitulos.  
R068. Cada video debe tener voz configurable.  
R069. Cada video debe tener capitulos.  
R070. Cada video debe poder reproducirse sin generacion LLM.  
R071. Cada video debe poder insertarse en cursos.  
R072. Cada video debe poder insertarse en ejercicios.  
R073. Cada video debe poder insertarse como solucion.  
R074. Cada video debe poder insertarse en workshop.  
R075. El player debe aceptar un CourseJSON por props.  
R076. El hook de playback debe dejar de depender de `MOVIE_SCRIPT`.  
R077. Los controles deben dejar de depender de `TOTAL_DURATION_MS` global.  
R078. Los capitulos deben venir del CourseJSON.  
R079. El TTS debe poder apagarse.  
R080. El video debe funcionar con subtitulos aunque falle TTS.

### 9.5 Escenas

R081. Debe mantenerse compatibilidad con las 9 escenas actuales.  
R082. Debe crearse escena `vscode-shell`.  
R083. Debe crearse escena `copilot-chat`.  
R084. Debe crearse escena `codex-agent`.  
R085. Debe crearse escena `claude-artifact`.  
R086. Debe crearse escena `terminal-run`.  
R087. Debe crearse escena `git-flow`.  
R088. Debe crearse escena `diff-review`.  
R089. Debe crearse escena `prompt-lab`.  
R090. Debe crearse escena `test-runner`.  
R091. Debe crearse escena `browser-preview`.  
R092. Debe crearse escena `security-gate`.  
R093. Debe crearse escena `cost-meter`.  
R094. Debe crearse escena `agent-trace`.  
R095. Debe crearse escena `multi-agent-board`.  
R096. Debe crearse escena `quiz-pause`.  
R097. Debe crearse escena `exercise-brief`.  
R098. Debe crearse escena `solution-reveal`.  
R099. Debe crearse escena `mistake-scene`.  
R100. Debe crearse escena `checkpoint`.

### 9.6 Workshops

R101. Un workshop debe tener ID.  
R102. Un workshop debe tener duracion.  
R103. Un workshop debe tener objetivos.  
R104. Un workshop debe tener prework.  
R105. Un workshop debe tener secuencia temporal.  
R106. Un workshop debe referenciar microvideos.  
R107. Un workshop debe referenciar ejercicios.  
R108. Un workshop debe incluir tiempos por actividad.  
R109. Un workshop debe tener guia de profesor.  
R110. Un workshop debe tener criterios de cierre.  
R111. Un workshop debe tener variante presencial.  
R112. Un workshop debe tener variante remota.  
R113. Un workshop debe poder exportarse a Markdown.  
R114. Un workshop debe poder exportarse a PDF en una fase posterior.  
R115. Un workshop debe marcar que retos son obligatorios.  
R116. Un workshop debe marcar que retos son bonus.  
R117. Un workshop debe incluir preguntas de debrief.  
R118. Un workshop debe incluir checklist de setup.  
R119. Un workshop debe incluir plan B si falla una herramienta.  
R120. Un workshop debe incluir material de seguimiento.

### 9.7 Tutorias

R121. La plataforma debe explicar que la tutoria no sustituye el prework.  
R122. La plataforma debe pedir reto asociado antes de tutoria.  
R123. La plataforma debe pedir evidencia.  
R124. La plataforma debe pedir error concreto.  
R125. La plataforma debe pedir que pistas se han probado.  
R126. La plataforma debe sugerir microvideos antes de reservar.  
R127. La plataforma debe permitir slots fijos.  
R128. La plataforma debe soportar 2º y 4º viernes del mes.  
R129. La plataforma debe soportar bloques de 2h.  
R130. La plataforma debe generar resumen para el tutor.

### 9.8 Assets

R131. Cada track debe tener identidad visual.  
R132. Copilot debe tener estetica VS Code/GitHub.  
R133. Codex debe tener estetica agente/cockpit.  
R134. Claude debe tener estetica documento/artifact.  
R135. Git debe tener estetica flujo/ramas.  
R136. Cada curso debe tener imagen portada.  
R137. Cada modulo debe tener icono.  
R138. Cada video debe tener thumbnail.  
R139. Cada ejercicio debe tener thumbnail opcional.  
R140. Cada solucion importante debe tener imagen o animacion.

### 9.9 Validacion y calidad

R141. Cada ejercicio de codigo debe tener comando de validacion.  
R142. Cada ejemplo Node debe tener `package.json`.  
R143. Cada ejemplo con tests debe tener test reproducible.  
R144. Cada prompt debe estar versionado.  
R145. Cada solucion debe indicar tradeoffs.  
R146. Cada reto debe evitar depender de servicios externos cuando no haga falta.  
R147. Cada reto con servicio externo debe tener modo mock.  
R148. Cada video debe tener duracion realista.  
R149. Cada video debe poder verse sin voz.  
R150. Cada video debe tener subtitulos legibles.

### 9.10 Gobierno

R151. Cada contenido debe tener owner.  
R152. Cada contenido debe tener version.  
R153. Cada contenido debe tener fecha de revision.  
R154. Cada contenido debe tener estado: draft, review, published, deprecated.  
R155. Cada contenido debe tener fuente.  
R156. Cada contenido sensible debe indicar restricciones.  
R157. Los cursos de modelos/precios deben marcarse como informacion viva.  
R158. Los contenidos de API deben revisarse periodicamente.  
R159. Los ejercicios deben pasar QA antes de publicarse.  
R160. Los videos deben pasar QA visual antes de publicarse.

## 10. Requisitos Tecnicos No Funcionales

R161. La app debe cargar rapido en local.  
R162. La app debe funcionar en Chrome y Edge.  
R163. La app debe ser responsive.  
R164. La app no debe tener scroll horizontal en movil.  
R165. El player debe soportar teclado.  
R166. El player debe soportar pantalla completa.  
R167. El player debe soportar subtitulos.  
R168. El player debe soportar mute.  
R169. El player debe tolerar fallo de TTS.  
R170. El player debe poder precargar audio.  
R171. El player debe evitar leaks de Blob URLs.  
R172. El player debe permitir seek.  
R173. El player debe permitir reinicio.  
R174. El player debe permitir saltar capitulos.  
R175. Los JSON deben validarse con Zod.  
R176. Los errores de schema deben mostrarse claramente.  
R177. Los contenidos deben poder vivir en Git.  
R178. Los contenidos deben ser revisables por PR.  
R179. Los assets deben tener naming estable.  
R180. Los assets deben estar optimizados.

## 11. Modelo de Datos Propuesto

### 11.1 `tracks.json`

Campos:

- `id`
- `title`
- `subtitle`
- `description`
- `tool`
- `levelRange`
- `thumbnail`
- `courses`
- `workshops`

### 11.2 `course.json`

Campos:

- `id`
- `title`
- `description`
- `trackId`
- `level`
- `durationMinutes`
- `status`
- `version`
- `owner`
- `updatedAt`
- `modules`
- `videos`
- `exercises`
- `resources`

### 11.3 `exercise.json`

Campos:

- `id`
- `title`
- `trackId`
- `courseId`
- `level`
- `durationMinutes`
- `tool`
- `objectives`
- `prerequisites`
- `briefVideoId`
- `solutionVideoId`
- `starterFiles`
- `instructions`
- `prompts`
- `hints`
- `acceptanceCriteria`
- `validation`
- `solution`
- `commonMistakes`
- `tutoringGate`

### 11.4 `course-script.json`

Basado en CourseJSON existente:

- `id`
- `title`
- `description`
- `template`
- `durationPreset`
- `durationMs`
- `voice`
- `author`
- `createdAt`
- `chapters`
- `scenes`

Extensiones recomendadas:

- `brand`
- `tool`
- `difficulty`
- `thumbnail`
- `relatedExerciseIds`
- `relatedCourseIds`
- `qaStatus`

## 12. Refactor Necesario de `b_ccl`

### 12.1 Prioridad maxima

1. Cambiar `MoviePlayer()` a `MoviePlayer({ course })`.
2. Cambiar `useMoviePlayer()` a `useMoviePlayer({ script, totalDurationMs })`.
3. Cambiar `Controls` para recibir `chapters` y `totalDurationMs` por props.
4. Mantener fallback a `MOVIE_SCRIPT`.
5. Arreglar `/player/[slug]` para que cargue cursos dinamicos.
6. Validar JSON antes de reproducir.
7. Crear carpeta `public/courses`.
8. Crear al menos 3 CourseJSON manuales:
   - Copilot Fix Bug.
   - Git Fork PR.
   - Codex Bug Login.

### 12.2 Refactor de escenas

1. Hacer `preview` data-driven.
2. Crear `vscode-shell`.
3. Crear `terminal-run`.
4. Crear `diff-review`.
5. Crear `prompt-lab`.
6. Crear `test-runner`.
7. Crear `git-flow`.
8. Crear `agent-trace`.

### 12.3 Refactor de generacion

1. Añadir templates nuevos:
   - `copilot`
   - `codex`
   - `claude`
   - `git`
   - `exercise-solution`
2. Añadir scene catalog extendido.
3. Permitir input desde ejercicio.
4. Permitir generar video de brief.
5. Permitir generar video de solucion.
6. Permitir regenerar solo una escena.
7. Añadir preview de JSON.
8. Añadir validacion antes de guardar.

## 13. Plan de Migracion de Contenidos

### 13.1 Copilot

1. Parsear 35 Markdown actuales.
2. Clasificarlos por nivel.
3. Normalizar formato.
4. Añadir IDs estables.
5. Asociar soluciones.
6. Crear starter packs.
7. Crear 10 microvideos iniciales.
8. Crear 1 workshop de 2h.

### 13.2 Codex

1. Mantener las webs como referencia.
2. Crear fichas de curso en plataforma.
3. Extraer labs a ejercicio JSON.
4. Crear microvideos para labs.
5. Crear workshops a partir de labs.
6. Crear solucion narrada para capstones.

### 13.3 Claude

1. Crear ruta nueva desde cero.
2. Crear 6 ejercicios.
3. Crear 4 microvideos.
4. Crear comparativa con Codex/Copilot.

## 14. Catalogo Inicial de Microvideos

### 14.1 Git/GitHub

1. `git-fork-90s`
   - Escenas: title, concept, git-flow, finale.

2. `branch-commit-pr`
   - Escenas: title, git-flow, terminal-run, diff-review, finale.

3. `como-pedir-ayuda`
   - Escenas: title, concept, compare, exercise-brief, finale.

### 14.2 Copilot Basic

4. `copilot-contexto-archivo-activo`
   - Escenas: title, vscode-shell, copilot-chat, concept, finale.

5. `completion-primer-cambio`
   - Escenas: title, vscode-shell, coding, checkpoint, finale.

6. `chat-explica-codigo`
   - Escenas: title, vscode-shell, copilot-chat, prompt-lab, finale.

7. `fix-bug-con-copilot`
   - Escenas: title, error, copilot-chat, diff-review, test-runner, finale.

8. `generar-tests`
   - Escenas: title, coding, copilot-chat, test-runner, solution-reveal, finale.

9. `review-pr`
   - Escenas: title, diff-review, copilot-chat, checklist, finale.

### 14.3 Copilot Advanced

10. `custom-instructions`
    - Escenas: title, concept, vscode-shell, coding, checkpoint, finale.

11. `mcp-github`
    - Escenas: title, concept, security-gate, vscode-shell, finale.

12. `custom-agent`
    - Escenas: title, agent-trace, vscode-shell, thinking, finale.

### 14.4 Codex

13. `codex-onboarding-repo`
    - Escenas: title, codex-agent, terminal-run, checkpoint, finale.

14. `codex-bug-login`
    - Escenas: title, error, codex-agent, diff-review, test-runner, finale.

15. `codex-review`
    - Escenas: title, diff-review, codex-agent, solution-reveal, finale.

16. `codex-coste`
    - Escenas: title, cost-meter, compare, checkpoint, finale.

17. `codex-mcp-readonly`
    - Escenas: title, security-gate, codex-agent, terminal-run, finale.

18. `codex-pr-swarm`
    - Escenas: title, multi-agent-board, agent-trace, diff-review, finale.

### 14.5 Claude

19. `claude-projects-contexto`
    - Escenas: title, claude-artifact, concept, finale.

20. `claude-artifact-ui`
    - Escenas: title, claude-artifact, browser-preview, finale.

21. `claude-analiza-repo`
    - Escenas: title, prompt-lab, claude-artifact, checklist, finale.

## 15. Catalogo Inicial de Ejercicios

### 15.1 Git/GitHub Survival

1. GIT-001: Clonar repo y abrir en VS Code.
2. GIT-002: Crear branch.
3. GIT-003: Commit con mensaje correcto.
4. GIT-004: Push y PR.
5. GIT-005: Fork y contribucion.
6. GIT-006: Resolver conflicto simple.
7. GIT-007: Preparar evidencia para tutoria.

### 15.2 Copilot Basic

1. COP-B-001: Setup Copilot.
2. COP-B-002: Code completion.
3. COP-B-003: Shortcuts.
4. COP-B-004: Comment to code.
5. COP-B-005: Chat pregunta basica.
6. COP-B-006: Inline chat.
7. COP-B-007: Explain code.
8. COP-B-008: Fix code.
9. COP-B-009: Refactor simple.
10. COP-B-010: Unit tests.
11. COP-B-011: Test cases.
12. COP-B-012: Generate docs.
13. COP-B-013: Code review.

### 15.3 Copilot Medium

1. COP-M-001: Prompt con contexto y restricciones.
2. COP-M-002: Refactor con tests.
3. COP-M-003: Documentar modulo real.
4. COP-M-004: Crear README util.
5. COP-M-005: Revisar PR con checklist.
6. COP-M-006: Debug con logs.
7. COP-M-007: Custom instructions basicas.
8. COP-M-008: Prompt reusable.

### 15.4 Copilot Advanced

1. COP-A-001: Custom instructions por stack.
2. COP-A-002: Custom agent.
3. COP-A-003: MCP GitHub.
4. COP-A-004: MCP Postgres Ask Gordon.
5. COP-A-005: Skill orquestador.
6. COP-A-006: PR review avanzado.
7. COP-A-007: Seguridad y datos.

### 15.5 Codex Basic

1. COD-B-001: Onboarding repo.
2. COD-B-002: Bug login.
3. COD-B-003: Review diff.
4. COD-B-004: AGENTS.md.
5. COD-B-005: Coste sesion.

### 15.6 Codex Potente

1. COD-P-001: Decision de modelo.
2. COD-P-002: Debug multimodal UI.
3. COD-P-003: MCP read-only docs.
4. COD-P-004: Skill QA visual.
5. COD-P-005: Subagentes review.
6. COD-P-006: Capstone potente.

### 15.7 Codex Ultra

1. COD-U-001: PR swarm local.
2. COD-U-002: API-first batch.
3. COD-U-003: Dataset sintetico.
4. COD-U-004: RAG AST index.
5. COD-U-005: Jueces/evals.
6. COD-U-006: Capstone ultra.

### 15.8 Claude

1. CLA-B-001: Explicar modulo largo.
2. CLA-B-002: Crear artifact.
3. CLA-B-003: Convertir documento en checklist.
4. CLA-M-001: Plan de refactor.
5. CLA-M-002: Comparar alternativas.
6. CLA-A-001: Arquitectura y riesgos.

## 16. Integracion de Videos con Cursos y Ejercicios

### 16.1 En cursos

Cada modulo de curso debe tener:

- Video intro opcional.
- Lectura/slides.
- Ejercicios.
- Video de cierre.

### 16.2 En ejercicios

Cada ejercicio importante debe tener:

- `briefVideoId`
- `solutionVideoId`

Para ejercicios basicos, el video puede ser compartido por varios retos.

### 16.3 En workshops

Un workshop debe montar una playlist:

1. Video contexto.
2. Reto 1.
3. Solucion corta.
4. Reto 2.
5. Debrief.
6. Capstone.

### 16.4 En tutorias

La plataforma debe mostrar:

- "Antes de pedir tutoria, mira estos videos".
- "Antes de pedir tutoria, intenta estas pistas".
- "Adjunta resultado de este comando".

## 17. Roadmap

### 17.1 Fase 0 - Consolidacion

Duracion: 2-4 dias.

Objetivos:

- Renombrar `b_cclDMm8Af2f` a nombre estable.
- Documentar estructura.
- Crear auditoria de deuda tecnica.
- Crear schemas iniciales.

### 17.2 Fase 1 - MVP Plataforma

Duracion: 1-2 semanas.

Objetivos:

- Portal con rutas.
- Importar CourseScript player.
- Refactor para cursos dinamicos.
- Catalogo de ejercicios Copilot basic.
- 3 microvideos manuales.
- 10 ejercicios autoconsumibles.

### 17.3 Fase 2 - Copilot Practice

Duracion: 2-3 semanas.

Objetivos:

- 30 retos Copilot normalizados.
- 10 microvideos.
- 2 workshops.
- Soluciones y validaciones.

### 17.4 Fase 3 - Codex Practice

Duracion: 2-3 semanas.

Objetivos:

- Integrar cursos Codex.
- Convertir labs a ejercicios.
- Crear microvideos para labs clave.
- Crear workshops Codex Basic/Potente/Ultra.

### 17.5 Fase 4 - Claude y Multi-tool

Duracion: 1-2 semanas.

Objetivos:

- Ruta Claude.
- Comparativas.
- Ejercicios de analisis y artifacts.

### 17.6 Fase 5 - Tutorias y Analitica

Duracion: 2 semanas.

Objetivos:

- Tracking.
- Reservas.
- Evidencia obligatoria.
- Analytics de consumo.

## 18. Riesgos

Riesgo 1: querer automatizar todos los videos antes de tener escenas estables.  
Mitigacion: crear primero 8-10 escenas de alto reuso.

Riesgo 2: convertir el portal en biblioteca pasiva.  
Mitigacion: cada curso debe llevar a retos y validacion.

Riesgo 3: ejercicios demasiado dependientes de herramientas externas.  
Mitigacion: mocks y fixtures locales.

Riesgo 4: contenido de modelos/precios desactualizado.  
Mitigacion: metadata de revision y avisos.

Riesgo 5: que los alumnos sigan pidiendo tutoria sin prework.  
Mitigacion: formulario con reto, evidencia y pistas probadas.

Riesgo 6: CourseScript demasiado rigido.  
Mitigacion: escenas genericas parametrizadas.

Riesgo 7: calidad baja en videos generados por LLM.  
Mitigacion: videos criticos escritos a mano, generacion solo como borrador.

## 19. Criterios de Exito

1. Reducir horas de explicacion repetitiva.
2. Aumentar calidad de dudas en tutoria.
3. Que el alumno complete retos sin profesor.
4. Que los workshops se monten desde piezas reutilizables.
5. Que los videos puedan modificarse sin regrabar.
6. Que cada ruta tenga progresion clara.
7. Que Git/fork/PR deje de aparecer como bloqueo en cursos IA.
8. Que Codex/Copilot/Claude tengan rutas diferenciadas.
9. Que ejercicios tengan validacion real.
10. Que el material sea mantenible por repo.

## 20. Primeros Entregables Recomendados

Entregable 1:

- `ai-practice-hub` app Next.
- Home con rutas.
- Catalogo inicial.

Entregable 2:

- CourseScript player refactorizado.
- 3 CourseJSON dinamicos.

Entregable 3:

- 10 ejercicios Copilot Basic normalizados.

Entregable 4:

- Workshop Copilot 2h.

Entregable 5:

- Ruta Git/GitHub Survival.

Entregable 6:

- Integracion de cursos Codex actuales como ruta avanzada.

## 21. Decision Recomendada

La decision recomendada es:

1. No seguir creando solo slides.
2. Crear plataforma practica.
3. Hacer de CourseScript el centro audiovisual.
4. Convertir ejercicios existentes en retos autoconsumibles.
5. Usar tutorias como desbloqueo, no como curso repetido.
6. Tratar Copilot, Codex y Claude como rutas complementarias.

El resultado buscado no es "tener material". Es tener una **maquina de activacion**.

