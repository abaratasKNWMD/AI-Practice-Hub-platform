# Auditoria Vendor - Codex Practice Hub

Fecha de referencia: 2026-05-07  
Objetivo: definir el contenido completo, los requisitos tecnicos y el plan de produccion para una ruta de formacion practica de Codex, usando el material local ya creado y adaptandolo a la documentacion oficial de OpenAI.

## 0. Resumen ejecutivo

Codex debe ser la ruta mas potente del AI Practice Hub. No es "un chat que ayuda a programar"; es una plataforma agentica con app de escritorio, extension IDE, CLI, tareas cloud, revisiones GitHub, configuracion persistente, MCP, skills, plugins, subagentes, automations, sandbox, approvals y control real de coste.

La propuesta es mantener los 3 cursos web ya creados, pero convertirlos en una experiencia practica conectada con:

- Plataforma de ejercicios por nivel: basic, medium, advanced, ultra.
- Microvideos CourseScript incrustados en cursos, workshops y resoluciones.
- Labs con repos y archivos predefinidos.
- Plantillas de `AGENTS.md`, `.codex/config.toml`, skills, MCP inventories, prompts y GitHub Actions.
- Talleres tipo tutoria donde la persona ya llega con contexto consumido.
- Conciencia explicita de tokens, creditos, modelos, razonamiento, contexto y costes por tarea.

El material local actual de Codex ya cubre gran parte de esta vision:

- Curso 1: 34 slides, 7 assets, 14 archivos de materiales.
- Curso 2: 73 slides, 14 assets, 30 archivos de materiales.
- Curso 3: 74 slides, 13 assets, 49 archivos de materiales.

La auditoria recomienda convertir esos cursos en la ruta oficial "Codex desde operador hasta arquitecto agentico", y producir encima un catalogo de ejercicios y microvideos especificos de Codex.

## 1. Fuentes oficiales revisadas

Estas fuentes deben quedar enlazadas en la plataforma y revisarse en cada release del curso:

- OpenAI Codex Quickstart: https://developers.openai.com/codex/quickstart
- OpenAI Codex Best Practices: https://developers.openai.com/codex/learn/best-practices
- OpenAI Codex Customization: https://developers.openai.com/codex/concepts/customization
- OpenAI Codex Pricing: https://developers.openai.com/codex/pricing
- OpenAI Codex GitHub Action: https://developers.openai.com/codex/github-action
- OpenAI Codex Configuration Reference: https://developers.openai.com/codex/config-reference
- OpenAI Codex Sandboxing: https://developers.openai.com/codex/concepts/sandboxing
- OpenAI Codex Agent Approvals and Security: https://developers.openai.com/codex/agent-approvals-security

Lectura aplicada:

- La guia oficial recomienda pensar Codex como un companero configurable, no como un asistente puntual.
- El flujo base debe ensenar contexto, objetivo, restricciones y "done when".
- `AGENTS.md` es la pieza principal de instrucciones duraderas.
- `config.toml` controla modelo, esfuerzo de razonamiento, sandbox, approvals, MCP, perfiles y multiagente.
- Los MCP son el puente hacia herramientas externas.
- Las skills empaquetan procesos repetibles.
- Los plugins distribuyen skills y capacidades a equipos.
- Los subagentes sirven para trabajo acotado y paralelo.
- Las automations convierten workflows estables en ejecuciones recurrentes.
- Codex GitHub Action permite CI/CD con `openai/codex-action@v1`.
- El coste se debe explicar por modelo, creditos, uso local/cloud, code review, cache de input y output tokens.

## 2. Ingenieria inversa local

### 2.1 Cursos Codex existentes

| Curso local | Estado | Slides | Assets | Materiales | Uso recomendado |
|---|---:|---:|---:|---:|---|
| `01-curso-codex-web` | listo como web | 34 | 7 | 14 | Ruta Basic |
| `02-curso-codex-potente-web` | listo como web | 73 | 14 | 30 | Ruta Medium/Advanced |
| `03-curso-codex-ultra-avanzado-web` | listo como web | 74 | 13 | 49 | Ruta Ultra/Enterprise |

Hallazgo: los cursos ya tienen una estetica diferenciada y recursos utiles. El trabajo pendiente no es rehacerlos: es conectarlos a ejercicios, microvideos, evaluaciones y una capa de navegacion tipo plataforma.

### 2.2 Materiales reutilizables curso 1

Curso 1 ya contiene:

- Labs:
  - `lab-01-onboarding.md`
  - `lab-02-bug-login.md`
  - `lab-03-review.md`
- Ejemplo de login con tests.
- `prompts-codex.md`.
- `AGENTS.example.md`.
- `coste-sesion.csv`.
- `mcp-inventory.md`.
- `revision-pr.md`.
- `tarea-codex.md`.

Uso recomendado:

- Transformar cada lab en ejercicio interactivo con enunciado, repo inicial, pistas, solucion, microvideo de resolucion y checklist.
- Convertir `AGENTS.example.md` en plantilla descargable y en ejercicio evaluable.
- Usar `coste-sesion.csv` como primera practica de conciencia de gasto.

### 2.3 Materiales reutilizables curso 2

Curso 2 ya contiene:

- Labs:
  - `lab-01-modelos-coste.md`
  - `lab-02-debug-multimodal-ui.md`
  - `lab-03-mcp-readonly.md`
  - `lab-04-skill-equipo.md`
  - `lab-05-subagentes-review.md`
  - `lab-06-capstone-potente.md`
- Ejemplos:
  - `mcp-readonly-docs`
  - `session-cost-audit`
  - `ui-debug`
- Skill:
  - `qa-visual-codex`
- Plantillas:
  - `AGENTS.potente.example.md`
  - `config`
  - `decision-modelo`
  - `handoff`
  - `mcp inventory`
  - `registro coste`
  - `review`

Uso recomendado:

- Convertir Curso 2 en la pieza central para "operar Codex con criterio".
- Anadir simulaciones de eleccion de modelo y esfuerzo: `low`, `medium`, `high`, `xhigh`.
- Hacer que el alumno compare resultados: mini-modelo para tarea rutinaria, modelo fuerte para arquitectura, cloud task para PR.

### 2.4 Materiales reutilizables curso 3

Curso 3 ya contiene:

- Labs:
  - `lab-01-pr-swarm-local.md`
  - `lab-02-api-first-batch.md`
  - `lab-03-dataset-sintetico.md`
  - `lab-04-rag-ast-index.md`
  - `lab-05-jueces-evals.md`
  - `lab-06-capstone-ultra.md`
- Ejemplos:
  - `batch-jsonl`
  - `pr-swarm`
  - `rag-ast`
  - `synthetic dataset`
- Skills:
  - `code-rag-index-codex`
  - `pr-swarm-codex`
- Plantillas:
  - `AGENTS.ultra`
  - `risk-register`
  - `cost-budget`
  - `eval-rubric`
  - `github-action`
  - `handoff`
  - `schemas`

Uso recomendado:

- Convertir Curso 3 en "Codex Enterprise Lab".
- Mantener el enfoque en swarms, evaluacion, datos sinteticos, RAG de codigo, API-first y CI/CD.
- Explicar que el alumno ya no esta aprendiendo "a pedir codigo", sino a construir sistemas de trabajo con agentes.

### 2.5 CourseScript local

Directorio central: `b_cclDMm8Af2f`.

Hallazgos:

- Es una app Next.js con reproductor simulado tipo video.
- Tiene escenas reutilizables:
  - `title`
  - `concept`
  - `compare`
  - `linear`
  - `thinking`
  - `coding`
  - `preview`
  - `error`
  - `finale`
- Tiene docs de arquitectura, schema, tipos de escena, TTS, generacion y styling.
- Permite simular un video sin renderizar video real.

Deuda tecnica detectada:

- La documentacion habla de `MoviePlayer` recibiendo `course`, pero el componente actual no esta parametrizado asi.
- `useMoviePlayer` esta acoplado a `MOVIE_SCRIPT` y `TOTAL_DURATION_MS`.
- `Controls` importa `CHAPTERS`/`TOTAL_DURATION_MS` de forma hardcoded.

Requisito clave:

- Antes de producir 50 microvideos Codex, refactorizar CourseScript para que acepte `course-script.json` por slug.

## 3. Modelo pedagogico Codex

### 3.1 Promesa

"Aprende a dirigir Codex como un equipo de ingenieria: contexto, permisos, modelos, herramientas, costes, agentes y entregables verificables."

### 3.2 Perfil de alumno

El usuario objetivo ya sabe programar mas que un usuario inicial. No necesita 12 horas explicando Git. Necesita:

- Entender rapidamente el marco mental.
- Practicar con problemas reales.
- Ver demos cortas y muy visuales.
- Aprender a no malgastar tokens.
- Aprender a configurar Codex para su equipo.
- Salir con plantillas que pueda llevar al trabajo.

### 3.3 Principios didacticos

1. Menos teoria repetida, mas operaciones.
2. Cada concepto termina en un archivo real.
3. Cada video resuelve un bloqueo concreto.
4. Cada curso tiene notas del creador para el formador.
5. Cada ejercicio mide una competencia observable.
6. Cada workshop reutiliza los mismos assets y no exige preparar desde cero.
7. Cada modulo incluye coste, seguridad y validacion.

## 4. Arquitectura de contenido Codex

### 4.1 Rutas

| Ruta | Nombre | Duracion sugerida | Resultado |
|---|---|---:|---|
| C0 | Codex Orientation | 45 min | Primer uso responsable |
| C1 | Codex Basic | 3 h | Resolver bugs pequenos y reviews |
| C2 | Codex Potente | 5 h | Configuracion, modelos, MCP, skills, subagentes |
| C3 | Codex Ultra | 6 h | Swarms, CI/CD, RAG, evals, API-first |
| C4 | Codex Enterprise Operating Model | 2 h | Gobierno, coste, seguridad, adopcion |

### 4.2 Relacion con webs existentes

- `01-curso-codex-web` alimenta C0 + C1.
- `02-curso-codex-potente-web` alimenta C2.
- `03-curso-codex-ultra-avanzado-web` alimenta C3 + C4.

### 4.3 Formato por curso

Cada curso Codex debe tener:

- Slides autoexplicativas.
- Notas del creador por slide.
- Microvideos incrustados.
- Enlaces a ejercicios.
- Assets visuales.
- Prompts listos.
- Plantillas descargables.
- Repos iniciales.
- Soluciones guiadas.
- Checklists de verificacion.
- Rubrica de evaluacion.
- Seccion de coste.
- Seccion de riesgos.
- Siguiente reto recomendado.

## 5. Cursos propuestos

### 5.1 Curso C0 - Codex Orientation

Objetivo: que nadie llegue a una tutoria preguntando que es Codex o como se empieza.

Pantallas necesarias:

1. Que es Codex y que no es.
2. Superficies: app, IDE, CLI, cloud.
3. Como iniciar sesion: ChatGPT vs API key.
4. Primer proyecto y primer prompt.
5. Agent mode y permisos.
6. Que puede leer, escribir y ejecutar.
7. Git checkpoint antes/despues.
8. Diferencia entre pedir, planificar y delegar.
9. Contexto minimo: objetivo, archivos, restricciones, done when.
10. Coste: que aumenta el consumo.
11. Seguridad: secrets, red, sandbox.
12. Primer ejercicio: explicar repo y proponer plan.

Microvideos:

- `cx-orientation-01-surface-map`: app vs IDE vs CLI vs cloud.
- `cx-orientation-02-first-task`: de prompt ambiguo a prompt operativo.
- `cx-orientation-03-permissions`: como pensar sandbox y approvals.

Ejercicios:

- E00. Abrir repo y pedir mapa tecnico.
- E01. Crear primer `AGENTS.md`.
- E02. Ejecutar una tarea read-only.
- E03. Pedir plan sin implementar.

### 5.2 Curso C1 - Codex Basic

Objetivo: activar al desarrollador para usar Codex en tareas reales de baja-media complejidad.

Modulos:

1. Prompt operativo.
2. Plan mode.
3. Lectura de errores.
4. Bug fixing minimo.
5. Tests y validacion.
6. Review local con `/review`.
7. `AGENTS.md` como memoria de equipo.
8. Coste y compactacion.
9. Primer mini-workshop.

Slides nuevas recomendadas:

- Slide "El prompt de 4 piezas".
- Slide "Done when no es decoracion".
- Slide "El diff es el contrato".
- Slide "Si no puede probarlo, no lo aceptes".
- Slide "Contexto caro vs contexto valioso".

Notas del creador:

- Explicar casos donde Codex parece equivocarse porque le falta el comando de test.
- Mostrar que una tarea bien cerrada gasta menos que 5 prompts vagos.
- Repetir que no hay que dar full access por comodidad en los primeros labs.

### 5.3 Curso C2 - Codex Potente

Objetivo: operar Codex como plataforma profesional.

Modulos:

1. Modelos y esfuerzo de razonamiento.
2. `config.toml` personal y de repo.
3. Perfiles de permisos.
4. MCP con herramientas externas.
5. Skills de equipo.
6. Plugins como unidad distribuible.
7. Subagentes para exploracion, QA y triage.
8. Multimodal: imagenes, UI, screenshots.
9. Handoffs y trabajo largo.
10. Registro de coste por sesion.

Practicas clave:

- Comparar un fix con GPT-5.4-mini, GPT-5.3-Codex y GPT-5.5.
- Crear skill `qa-visual-codex`.
- Conectar MCP readonly a docs internas mockeadas.
- Lanzar subagente explorador y subagente QA.
- Crear `.codex/config.toml` con perfiles `safe`, `workshop`, `ci`.

### 5.4 Curso C3 - Codex Ultra

Objetivo: construir sistemas de trabajo agenticos sobre Codex.

Modulos:

1. Arquitectura multiagente.
2. Swarms acotados.
3. Codex GitHub Action en PR.
4. Batch/API-first.
5. LLM-as-a-judge.
6. Synthetic data.
7. Enterprise RAG con AST.
8. Cost budget por pipeline.
9. Seguridad y prompt injection.
10. Capstone: PR swarm con evaluacion automatica.

Practicas clave:

- Crear workflow con `openai/codex-action@v1`.
- Crear prompt file `.github/codex/prompts/review.md`.
- Ejecutar Codex en modo no interactivo.
- Construir juez de PR con rubrica.
- Indexar codigo con AST y embeddings.
- Generar dataset sintetico desde arquitectura interna.

### 5.5 Curso C4 - Operating Model

Objetivo: dar al equipo directivo/tech leads un modelo de adopcion.

Modulos:

1. Flipping training.
2. Autoconsumo + tutoria.
3. Catalogo de retos.
4. Gobernanza de modelos.
5. Presupuesto de creditos.
6. Politicas de permisos.
7. Repos plantilla.
8. Medicion: adopcion, resolucion, coste, calidad.
9. Comunidad interna.
10. Roadmap trimestral.

## 6. Catalogo de ejercicios Codex

### 6.1 Basic

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CX-B01 | Mapa del repo | `repo-map.md` | si |
| CX-B02 | Prompt de 4 piezas | `task-prompt.md` | si |
| CX-B03 | Crear `AGENTS.md` | `AGENTS.md` | si |
| CX-B04 | Bug login minimo | patch + test | si |
| CX-B05 | Review de diff | `review-notes.md` | si |
| CX-B06 | Test que falla antes | test file | si |
| CX-B07 | Coste de una sesion | `coste-sesion.csv` | no |
| CX-B08 | Compactar contexto | resumen de hilo | no |
| CX-B09 | Read-only diagnosis | informe | si |
| CX-B10 | Git checkpoint | branch + diff | no |

### 6.2 Medium

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CX-M01 | `config.toml` safe | `.codex/config.toml` | si |
| CX-M02 | Perfil workshop | `.codex/config.toml` | no |
| CX-M03 | Decision de modelo | `decision-modelo.md` | si |
| CX-M04 | Debug multimodal UI | issue + patch | si |
| CX-M05 | MCP readonly docs | `mcp-inventory.md` | si |
| CX-M06 | Skill QA visual | `.agents/skills/qa-visual-codex/SKILL.md` | si |
| CX-M07 | Skill con script | skill + `scripts/validate.*` | si |
| CX-M08 | Subagente explorador | config + resumen | si |
| CX-M09 | Subagente reviewer | findings | si |
| CX-M10 | Handoff entre sesiones | `handoff.md` | no |
| CX-M11 | Registro coste | `registro-coste.md` | no |
| CX-M12 | PR review local | `/review` output | si |

### 6.3 Advanced

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CX-A01 | GitHub Action Codex | workflow yaml | si |
| CX-A02 | Prompt PR review | `.github/codex/prompts/review.md` | si |
| CX-A03 | Output schema JSON | schema + result | si |
| CX-A04 | Prompt injection audit | `risk-register.md` | si |
| CX-A05 | Batch refactor nocturno | script + logs | si |
| CX-A06 | API-first migration | batch plan | si |
| CX-A07 | Juez LLM de codigo | `eval-rubric.md` | si |
| CX-A08 | Comparativa de modelos | `model-benchmark.md` | no |
| CX-A09 | Worktree parallel | 2 worktrees | si |
| CX-A10 | Automation semanal | spec de automation | no |

### 6.4 Ultra

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CX-U01 | PR swarm local | `swarm-report.md` | si |
| CX-U02 | Swarm con roles | `architect/dev/qa` configs | si |
| CX-U03 | RAG AST index | index + query examples | si |
| CX-U04 | Synthetic Q/A dataset | `.jsonl` | si |
| CX-U05 | Conversaciones sinteticas | chat corpus | si |
| CX-U06 | Fine-tuning readiness | dataset card | no |
| CX-U07 | Enterprise cost budget | `cost-budget.md` | si |
| CX-U08 | Human gate protocol | approval checklist | si |
| CX-U09 | Plugin de equipo | `.agents/plugins/*` | si |
| CX-U10 | Capstone enterprise | PR + eval + report | si |

## 7. Microvideos CourseScript

### 7.1 Regla editorial

Cada microvideo Codex debe durar entre 90 segundos y 6 minutos. Debe explicar una accion, no un tema infinito.

Formato recomendado:

1. Hook visual: problema o error.
2. Contexto minimo.
3. Accion Codex.
4. Resultado visible.
5. Checklist.
6. Nota de coste/riesgo.

### 7.2 Escenas existentes reutilizables

| Escena | Uso Codex |
|---|---|
| `title` | abrir microvideo con promesa |
| `concept` | explicar AGENTS, sandbox, MCP, skill |
| `compare` | comparar modelos, permisos, prompts |
| `linear` | flujo paso a paso |
| `thinking` | plan mode y razonamiento |
| `coding` | cambios de codigo |
| `preview` | resultado UI o diff |
| `error` | fallo reproducido |
| `finale` | checklist final |

### 7.3 Escenas nuevas necesarias

| Escena nueva | Descripcion | Prioridad |
|---|---|---:|
| `permissions-map` | visual de read-only/workspace/full access | alta |
| `token-meter` | contador narrativo de input/cache/output | alta |
| `model-picker` | selector de modelo/esfuerzo con coste | alta |
| `agent-board` | tablero de subagentes y estados | alta |
| `mcp-handshake` | host-client-server + tool call | media |
| `skill-folder` | SKILL.md + scripts + references | media |
| `github-action-flow` | PR -> workflow -> Codex -> comentario | alta |
| `rag-index-flow` | AST chunking -> embeddings -> retrieval | media |
| `judge-panel` | jueces con rubrica y decision humana | alta |

### 7.4 Catalogo inicial de microvideos

| ID | Titulo | Curso | Escenas |
|---|---|---|---|
| V-CX-001 | Codex en cuatro superficies | C0 | title, compare, finale |
| V-CX-002 | Primer prompt serio | C0 | error, concept, finale |
| V-CX-003 | Sandbox sin miedo | C0/C1 | permissions-map, concept |
| V-CX-004 | Crear AGENTS.md | C1 | coding, preview, finale |
| V-CX-005 | Plan antes de patch | C1 | thinking, linear |
| V-CX-006 | Bug login reproducible | C1 | error, coding, preview |
| V-CX-007 | `/review` local | C1 | coding, compare, finale |
| V-CX-008 | Modelo correcto para cada tarea | C2 | model-picker, compare |
| V-CX-009 | `config.toml` de equipo | C2 | coding, concept |
| V-CX-010 | MCP readonly | C2 | mcp-handshake, preview |
| V-CX-011 | Skill QA visual | C2 | skill-folder, coding |
| V-CX-012 | Subagentes con criterio | C2 | agent-board, thinking |
| V-CX-013 | Multimodal UI debug | C2 | preview, error, coding |
| V-CX-014 | Coste por contexto | C2 | token-meter, compare |
| V-CX-015 | GitHub Action Codex | C3 | github-action-flow, coding |
| V-CX-016 | PR swarm local | C3 | agent-board, judge-panel |
| V-CX-017 | RAG con AST | C3 | rag-index-flow, concept |
| V-CX-018 | Synthetic data factory | C3 | linear, preview |
| V-CX-019 | Juez LLM calibrado | C3 | judge-panel, compare |
| V-CX-020 | Capstone enterprise | C3/C4 | title, agent-board, finale |

## 8. Assets visuales Codex

### 8.1 Assets existentes que se deben conservar

Curso 1:

- `codex-control-room.png`
- `rubber-duck-review.png`
- `context-token-reflection.png`
- memes de contexto, GPS AI y misterio de X.

Curso 2:

- `potente-codex-platform.png`
- `potente-agent-standup.png`
- `potente-mcp-tool-hub.png`
- `potente-governance-console.png`
- memes de token blender, reasoning lever, plan before patch, handoff baton.

Curso 3:

- `ultra-swarm-orchestrator.png`
- `ultra-enterprise-rag.png`
- `ultra-distillation-lab.png`
- `ultra-batch-night-run.png`
- memes de swarm chaos, RAG stale, token cost, synthetic data factory.

### 8.2 Assets nuevos recomendados

| Asset | Uso | Prioridad |
|---|---|---:|
| `codex-model-elevator.png` | elegir modelo segun peso de tarea | alta |
| `codex-context-sandwich.png` | contexto util vs relleno | media |
| `codex-sandbox-traffic-light.png` | permisos | alta |
| `codex-mcp-toolbelt.png` | MCPs como herramientas externas | media |
| `codex-skill-recipe-card.png` | skill como receta repetible | media |
| `codex-agent-war-room.png` | subagentes | alta |
| `codex-credit-fuel-gauge.png` | coste | alta |
| `codex-pr-judge-court.png` | LLM-as-judge | alta |

## 9. Plantillas y archivos que debe generar la plataforma

### 9.1 Plantillas obligatorias

```text
codex-pack/
  AGENTS.md
  .codex/
    config.toml
  .agents/
    skills/
      qa-visual-codex/
        SKILL.md
        scripts/
        references/
    plugins/
      team-codex-plugin/
        .codex-plugin/plugin.json
  .github/
    workflows/
      codex-review.yml
    codex/
      prompts/
        review.md
        migration.md
        release-notes.md
  docs/
    cost-budget.md
    risk-register.md
    handoff.md
    eval-rubric.md
    mcp-inventory.md
```

### 9.2 `AGENTS.md` minimo

Debe incluir:

- Layout del repo.
- Comandos de setup.
- Comandos de test.
- Convenciones de codigo.
- Reglas de seguridad.
- Criterio de "done".
- Rutas de docs.
- Reglas de PR.
- Como reportar dudas.
- Que no tocar.

### 9.3 `.codex/config.toml` didactico

Debe ensenar:

- `model`
- `model_reasoning_effort`
- `sandbox_mode`
- `approval_policy`
- `mcp_servers`
- `profiles`
- `features.multi_agent`
- `tools.view_image`
- `web_search`
- `tool_output_token_limit`

### 9.4 Skills Codex

Skills minimas del curso:

| Skill | Objetivo |
|---|---|
| `qa-visual-codex` | validar UI con screenshot y checklist |
| `pr-review-codex` | revisar PR segun rubrica |
| `incident-triage-codex` | analizar logs y fallos |
| `migration-plan-codex` | crear plan de migracion |
| `cost-audit-codex` | estimar gasto de una sesion |
| `rag-index-codex` | indexar codigo y consultar contexto |
| `release-notes-codex` | generar release notes verificables |
| `security-pass-codex` | revisar riesgos y secrets |

### 9.5 MCPs recomendados

Para curso:

- GitHub MCP en modo limitado.
- Filesystem/docs mock MCP.
- Browser/local preview MCP si la plataforma lo soporta.
- Sentry mock MCP.
- Jira/Linear mock MCP.
- Postgres readonly MCP.

Para empresa:

- Solo MCPs aprobados por seguridad.
- Inventario con owner, scope, permisos, secretos, coste contextual y fecha de revision.
- Preferir readonly para formacion.
- Separar MCP didactico de MCP productivo.

## 10. Gobierno de coste Codex

### 10.1 Conceptos que el alumno debe dominar

- Local messages.
- Cloud tasks.
- Code reviews.
- Credit consumption.
- Input tokens.
- Cached input tokens.
- Output tokens.
- Fast mode.
- Diferencia entre ChatGPT plan y API key.
- Efecto de imagenes en limites.
- Efecto de MCPs y `AGENTS.md` grandes en contexto.

### 10.2 Reglas didacticas

1. Tarea rutinaria: modelo pequeno o menor esfuerzo.
2. Arquitectura, debugging complejo o multi-step: modelo fuerte.
3. Cloud task: cuando se busca PR o trabajo en background.
4. Code review: usar rubrica y limites.
5. MCP: activar solo si aporta contexto real.
6. Skills: reducen repeticion y tokens humanos.
7. `AGENTS.md`: corto y accionable.
8. Compactar cuando el hilo se infla.
9. Registrar coste estimado por lab.
10. Revisar `/status` o dashboard de uso al cierre.

### 10.3 Ejercicio de coste obligatorio

`CX-M11 Registro coste`

Entregable:

```md
# Registro de coste Codex

Tarea:
Modelo:
Esfuerzo:
Superficie: app / IDE / CLI / cloud
Contexto usado:
MCP activos:
Imagenes usadas:
Numero de turnos:
Validacion ejecutada:
Coste estimado:
Que hubiera reducido coste:
Que no se debe recortar:
```

## 11. Requisitos funcionales Codex

### 11.1 Cursos

- R-CX-001. La plataforma debe listar la ruta Codex en 4 niveles: Orientation, Basic, Potente, Ultra.
- R-CX-002. Cada curso debe exponer slides, notas, ejercicios, microvideos y materiales.
- R-CX-003. Cada slide debe poder tener nota del creador.
- R-CX-004. Cada slide debe poder tener enlace a ejercicio.
- R-CX-005. Cada slide debe poder tener enlace a plantilla.
- R-CX-006. Cada curso debe incluir seccion de coste y seguridad.
- R-CX-007. Cada curso debe indicar superficie Codex usada: app, IDE, CLI, cloud.
- R-CX-008. Cada curso debe tener modo "formador" y modo "autoconsumo".
- R-CX-009. Cada curso debe incluir checkpoints de comprension.
- R-CX-010. Cada curso debe poder insertar microvideos CourseScript.

### 11.2 Ejercicios

- R-CX-011. Cada ejercicio debe tener enunciado, objetivo, prerequisitos y dificultad.
- R-CX-012. Cada ejercicio debe tener repo inicial o archivos iniciales.
- R-CX-013. Cada ejercicio debe tener solucion guiada.
- R-CX-014. Cada ejercicio debe tener prompts sugeridos.
- R-CX-015. Cada ejercicio debe tener criterios de validacion.
- R-CX-016. Cada ejercicio debe tener estimacion de coste.
- R-CX-017. Cada ejercicio debe declarar modelo recomendado.
- R-CX-018. Cada ejercicio debe declarar permisos recomendados.
- R-CX-019. Cada ejercicio debe declarar MCPs necesarios.
- R-CX-020. Cada ejercicio debe poder tener microvideo de resolucion.

### 11.3 Codex runtime

- R-CX-021. La plataforma debe generar `AGENTS.md` desde formulario.
- R-CX-022. La plataforma debe generar `.codex/config.toml` por perfil.
- R-CX-023. La plataforma debe generar skills Codex.
- R-CX-024. La plataforma debe empaquetar skills en plugins cuando aplique.
- R-CX-025. La plataforma debe generar inventario MCP.
- R-CX-026. La plataforma debe generar prompts para GitHub Action.
- R-CX-027. La plataforma debe generar workflow `codex-review.yml`.
- R-CX-028. La plataforma debe diferenciar local vs cloud tasks.
- R-CX-029. La plataforma debe explicar sandbox y approval policy.
- R-CX-030. La plataforma debe incluir warning cuando un lab pida full access.

### 11.4 Microvideos

- R-CX-031. CourseScript debe aceptar `course-script.json` por slug.
- R-CX-032. CourseScript debe permitir escenas por vendor.
- R-CX-033. CourseScript debe soportar subtitulos.
- R-CX-034. CourseScript debe soportar capitulos.
- R-CX-035. CourseScript debe soportar progreso, pausa, retroceso y fullscreen.
- R-CX-036. CourseScript debe poder incrustarse en una slide.
- R-CX-037. CourseScript debe poder incrustarse en un ejercicio.
- R-CX-038. CourseScript debe poder mostrar codigo con highlights.
- R-CX-039. CourseScript debe poder mostrar contador de tokens simulado.
- R-CX-040. CourseScript debe poder mostrar diff antes/despues.

### 11.5 Evaluacion

- R-CX-041. Cada modulo debe tener quiz practico.
- R-CX-042. Cada lab debe tener rubrica.
- R-CX-043. Los capstones deben producir artefactos revisables.
- R-CX-044. La plataforma debe registrar finalizacion de ejercicio.
- R-CX-045. La plataforma debe permitir reintentos.
- R-CX-046. La plataforma debe distinguir "visto" de "hecho".
- R-CX-047. La plataforma debe generar informe para tutorias.
- R-CX-048. La plataforma debe sugerir siguiente ejercicio por fallo.
- R-CX-049. La plataforma debe pedir reflexion de coste.
- R-CX-050. La plataforma debe pedir reflexion de seguridad.

### 11.6 Gobierno y empresa

- R-CX-051. Debe existir politica de modelos por tipo de tarea.
- R-CX-052. Debe existir politica de MCPs permitidos.
- R-CX-053. Debe existir politica de secrets.
- R-CX-054. Debe existir politica de PRs generadas por agentes.
- R-CX-055. Debe existir politica de revision humana.
- R-CX-056. Debe existir plantilla de risk register.
- R-CX-057. Debe existir plantilla de cost budget.
- R-CX-058. Debe existir plantilla de handoff.
- R-CX-059. Debe existir plantilla de eval rubric.
- R-CX-060. Debe existir proceso de actualizacion mensual por cambios de vendor.

## 12. Requisitos no funcionales

- RNF-CX-001. Todo contenido debe poder consumirse sin formador.
- RNF-CX-002. Todo contenido debe poder presentarse en workshop.
- RNF-CX-003. La web debe funcionar offline salvo docs externas.
- RNF-CX-004. Las imagenes deben estar embebidas o locales.
- RNF-CX-005. Los microvideos no deben depender de video real renderizado.
- RNF-CX-006. Las plantillas deben ser copiables.
- RNF-CX-007. La plataforma debe versionar contenido por fecha de vendor docs.
- RNF-CX-008. Debe evitarse contenido que prometa capacidades no documentadas.
- RNF-CX-009. La experiencia debe ser atractiva, pero orientada a practica.
- RNF-CX-010. Debe cargarse rapido en portatiles corporativos.
- RNF-CX-011. Debe haber modo proyector.
- RNF-CX-012. Debe haber modo pantalla completa.
- RNF-CX-013. Debe haber navegacion por teclado.
- RNF-CX-014. Debe haber buscador de ejercicios.
- RNF-CX-015. Debe haber filtros por superficie: CLI, IDE, app, cloud.

## 13. Backlog de produccion Codex

### 13.1 Prioridad 0

1. Refactor CourseScript para cargar JSON por slug.
2. Crear `course-script.schema.json`.
3. Crear 5 microvideos Codex iniciales.
4. Normalizar los 3 cursos como entidades `course.json`.
5. Crear catalogo de ejercicios Codex en `exercises.json`.
6. Vincular labs existentes a ejercicios.
7. Crear pack de plantillas Codex.
8. Crear rubrica de evaluacion.
9. Crear pagina de ruta Codex.
10. Crear vista de costes por modulo.

### 13.2 Prioridad 1

1. Crear 20 microvideos.
2. Crear 40 ejercicios.
3. Crear 8 skills.
4. Crear 1 plugin de ejemplo.
5. Crear workflow GitHub Action.
6. Crear MCP mock docs.
7. Crear MCP mock issues.
8. Crear dataset sintetico demo.
9. Crear RAG AST demo.
10. Crear swarm PR demo.

### 13.3 Prioridad 2

1. Analytics de consumo de curso.
2. Panel de tutoria.
3. Recomendador de siguiente reto.
4. Export a PDF/Markdown.
5. Certificado interno.
6. Simulador de coste.
7. Comparador de modelos.
8. Motor de quizzes.
9. Integracion con LMS.
10. Actualizacion automatica de fuentes oficiales.

## 14. Roadmap Codex

### Fase A - 2 semanas

- Consolidar los 3 cursos.
- Crear navegacion unificada.
- Refactorizar CourseScript minimo.
- Crear 10 ejercicios Basic/Medium.
- Crear 5 microvideos.

### Fase B - 4 semanas

- Crear ruta Potente completa.
- Crear 20 ejercicios.
- Crear skills de equipo.
- Crear MCP mock.
- Crear workshop de 2 horas.

### Fase C - 6 semanas

- Crear ruta Ultra completa.
- Crear GitHub Action lab.
- Crear PR swarm lab.
- Crear RAG AST lab.
- Crear LLM-as-judge lab.

### Fase D - 8 semanas

- Plataforma de tutoria.
- Dashboard de progreso.
- Coste y adoption metrics.
- Paquetes enterprise.
- Actualizacion continua.

## 15. Riesgos

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| Docs de Codex cambian rapido | alto | fecha de revision y sprint mensual |
| Coste mal explicado | alto | ejercicios con registro de coste |
| Demasiado contenido teorico | medio | todo acaba en artefacto |
| Microvideos muy costosos de producir | alto | CourseScript parametrico |
| MCPs inseguros | alto | readonly, mocks y allowlist |
| Alumnos piden "hazlo todo" sin criterio | medio | rubrica y gates humanos |
| `AGENTS.md` gigante | medio | labs de contexto minimo |
| Full access por comodidad | alto | politica de sandbox |
| Falta de actualizacion de modelos | alto | revision oficial por fecha |
| Workshops vuelven a consumir 12h | alto | autoconsumo + tutoria |

## 16. Criterios de exito

- 80% de alumnos completan C0 antes de tutorias.
- 60% completan al menos 5 ejercicios Basic.
- 40% completan al menos 3 ejercicios Potente.
- Se reduce al menos 50% el tiempo de explicacion repetida.
- Cada tutoria empieza con dudas practicas, no con setup basico.
- Cada equipo piloto termina con `AGENTS.md` propio.
- Cada equipo piloto crea al menos una skill.
- Cada equipo piloto registra coste y modelo en 3 tareas.
- Los workshops se preparan con menos de 30 minutos de esfuerzo.
- El repositorio queda listo para Copilot y Claude sin duplicar arquitectura.

## 17. Decision recomendada

Codex debe ser el primer vendor en convertirse en ruta completa porque el material local ya esta muy avanzado. La jugada buena es:

1. Consolidar los 3 cursos existentes.
2. Refactorizar CourseScript.
3. Crear 10 microvideos de alta calidad.
4. Convertir labs en ejercicios trackeables.
5. Empaquetar plantillas, skills y MCP mocks.
6. Usarlo como patron para Copilot y Claude.

Resultado esperado: una ruta Codex que no solo ensena la herramienta, sino que ensena a operar una plataforma agentica con criterio profesional.
