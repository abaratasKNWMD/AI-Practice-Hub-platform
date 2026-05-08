# Auditoria Vendor - GitHub Copilot Practice Hub

Fecha de referencia: 2026-05-07  
Objetivo: definir una ruta practica, autoconsumible y vendor-specific para GitHub Copilot, apoyada en VS Code, GitHub, Copilot cloud agent, custom instructions, prompt files, custom agents, MCP, skills, hooks, code review y control de premium requests.

## 0. Resumen ejecutivo

Copilot debe ser la ruta de activacion masiva. Es el vendor que mas encaja con la demanda actual de formacion porque muchas personas ya lo tienen en VS Code o GitHub, pero lo usan como autocompletado o chat suelto. La plataforma debe convertir ese uso basico en una disciplina:

- Inline suggestions para velocidad.
- Chat en Ask/Edit/Agent para control.
- Agent mode para cambios multiarchivo.
- Copilot cloud agent para delegar tareas en GitHub.
- Code review para revisar PRs y cambios locales.
- Custom instructions para consistencia de equipo.
- Prompt files para workflows repetibles.
- Custom agents para roles.
- MCP para conectar herramientas.
- Hooks y skills para automatizacion y dominio.
- Premium requests para conciencia de coste.

El repo local ya incluye un workspace de GitHub Copilot con 35 ejercicios Markdown y 30 soluciones. La recomendacion es no tirarlo: se debe convertir en el nucleo de la ruta Copilot Basic/Medium, anadiendo una capa avanzada con cloud agent, custom agents, MCP, code review, hooks, skills y premium requests.

## 1. Fuentes oficiales revisadas

Fuentes GitHub y VS Code consultadas:

- GitHub Copilot in VS Code: https://code.visualstudio.com/docs/copilot/overview
- VS Code Custom Instructions: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- VS Code Prompt Files: https://code.visualstudio.com/docs/copilot/customization/prompt-files
- VS Code Custom Agents: https://code.visualstudio.com/docs/copilot/customization/custom-agents
- VS Code Customization Concepts: https://code.visualstudio.com/docs/copilot/concepts/customization
- GitHub Copilot Cloud Agent: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
- MCP and GitHub Copilot cloud agent: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/mcp-and-cloud-agent
- Using Model Context Protocol in your IDE: https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide
- GitHub Copilot Code Review: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review
- GitHub Copilot Requests and Premium Requests: https://docs.github.com/en/copilot/concepts/billing/copilot-requests
- Custom Agents Configuration: https://docs.github.com/en/copilot/reference/custom-agents-configuration

Lectura aplicada:

- VS Code presenta Copilot como agentes que pueden planificar, escribir codigo y verificar resultados en el proyecto.
- VS Code permite agentes integrados, agentes de terceros y custom agents propios.
- Las instrucciones persistentes pueden vivir en `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` y tambien `AGENTS.md` cuando se trabaja con multiples agentes.
- Los prompt files usan extension `.prompt.md` y pueden vivir en `.github/prompts`.
- Los custom agents usan `.agent.md` y VS Code los detecta en `.github/agents`.
- Copilot cloud agent puede personalizarse con instructions, MCP servers, custom agents, hooks y skills.
- MCP extiende Copilot con herramientas y contexto externo; en cloud agent los repos pueden configurar servidores MCP.
- Copilot code review usa instrucciones de repo y path-specific, con limite relevante en revision de PR.
- Premium requests dependen de feature y modelo; los modelos incluidos y multiplicadores pueden cambiar.

## 2. Ingenieria inversa local

### 2.1 Workspace actual Copilot

Directorio: `workspace-github-copilot-main`

Inventario:

- 35 ejercicios Markdown.
- 30 archivos de soluciones.
- Plantillas:
  - `templates/exercise.template.md`
  - `templates/prompt.template.md`
- Config:
  - `CONF-custom-commands.md`
  - `CONF-manage-multiple-github-accounts.md`
- Offdocs:
  - `commit-style.md`
  - `code-style.md`
- Ejercicios por familias:
  - setup
  - completions
  - shortcuts
  - comments to code
  - chat
  - inline chat
  - explain
  - refactoring
  - code fixes
  - CLI
  - smart actions
  - code review
  - tests
  - docs
  - instructions
  - custom agents
  - prompts
  - MCP GitHub
  - ask Gordon/Postgres
  - skills/orquestador

Hallazgo: el workspace esta muy bien como base de ejercicios, pero ahora mismo no es una plataforma autoconsumible. Necesita:

- Navegacion por nivel.
- Microvideos de contexto y resolucion.
- Soluciones ocultables.
- Plantillas vendor-specific actuales.
- Tracking de progreso.
- Scoring/rubricas.
- Actualizacion a las capacidades mas recientes de Copilot.

### 2.2 Material PPTX existente

Archivos:

- `knm-github-copilot-2-core.v1.2.pptx`
- `knm-github-copilot-3-feature-basic.v1.2.pptx`
- `knm-github-copilot-4-feature-advance-phase-1.v1.2.pptx`
- `-01knm-ai-context-1-core.v1.1.pptx`
- `-02knm-ai-assisted-development-1-core.v1.1.pptx`
- `-03knm-ai-code-assistant-1-core.v1.1.pptx`

Uso recomendado:

- No convertirlos tal cual en la experiencia nueva.
- Usarlos como contenido fuente para microlecciones.
- Extraer conceptos basicos: GitHub, PRs, review, test, prompts, instrucciones.
- Evitar que las sesiones vuelvan a gastar tiempo en Git basico; eso debe ir a Ruta 0 de autoconsumo.

## 3. Posicionamiento Copilot

### 3.1 Promesa

"De usar Copilot como autocompletado a trabajar con agentes integrados en VS Code y GitHub."

### 3.2 Diferencia frente a Codex

Copilot se debe ensenar como:

- Herramienta pegada al flujo GitHub/VS Code.
- Excelente para adopcion masiva.
- Muy fuerte en completions, chat, edit, agent mode, PR review y cloud agent.
- Natural para equipos que ya viven en GitHub.
- Ideal para cursos practicos con retos pequenos y repetibles.

Codex se ensena como plataforma agentica independiente y profunda. Copilot se ensena como capa integrada de productividad de desarrollo.

### 3.3 Diferencia frente a Claude

Claude Code se debe ensenar como entorno agentico con `CLAUDE.md`, memoria, hooks, subagents y plugins. Copilot debe centrarse en:

- VS Code como interfaz principal.
- GitHub como superficie de delegacion.
- Custom instructions y prompt files en `.github`.
- Code review en PR.
- Premium requests y modelos en Copilot.

## 4. Rutas Copilot

| Ruta | Nombre | Duracion | Resultado |
|---|---|---:|---|
| CP0 | Git/GitHub Survival para IA | 90 min | Llegar sin bloquear tutoria |
| CP1 | Copilot Basic | 3 h | Completions, chat, explain, fixes |
| CP2 | Copilot Medium | 4 h | Tests, refactors, docs, instructions, prompts |
| CP3 | Copilot Advanced | 5 h | Agent mode, custom agents, MCP, code review |
| CP4 | Copilot Cloud Agent Enterprise | 4 h | Delegacion GitHub, PRs, hooks, skills, governance |

## 5. Curso CP0 - Git/GitHub Survival para IA

Objetivo: que nadie consuma 2 horas preguntando que es un fork, una rama o un PR.

Pantallas:

1. Repo, clone, branch, commit, push.
2. Fork vs branch.
3. Pull request.
4. Review.
5. Conflictos basicos.
6. Actions y checks.
7. Como leer un diff.
8. Como revertir una idea sin destruir trabajo.
9. Como preparar un issue para un agente.
10. Como pedir ayuda sin bloquearse.

Ejercicios:

- CP0-E01. Crear rama.
- CP0-E02. Hacer commit pequeno.
- CP0-E03. Abrir PR simulado.
- CP0-E04. Leer diff y escribir comentario.
- CP0-E05. Resolver conflicto trivial.
- CP0-E06. Crear issue apto para agente.

Microvideos:

- `cp-git-01-fork-vs-branch`
- `cp-git-02-pr-as-contract`
- `cp-git-03-diff-reading`

## 6. Curso CP1 - Copilot Basic

Objetivo: usar Copilot con control diario.

Contenido:

1. Setup en VS Code.
2. Inline completions.
3. Shortcuts productivos.
4. Comentario a codigo.
5. Copilot Chat: preguntar bien.
6. Explain: entender codigo legacy.
7. Inline Chat/Edit.
8. Fix: transformar error en patch.
9. Tests basicos.
10. Documentacion basica.

Ejercicios reutilizables del workspace:

- `00-01-copilot-setup.md`
- `00-02-copilot-cli-setup.md`
- `exerc-01-01-code-completion.md`
- `exerc-01-02-shortcuts.md`
- `exerc-01-03-comment-to-code.md`
- `exerc-01-04-comment-to-code-advance.md`
- `exerc-02-01-copilot-chat.md`
- `exerc-02-02-copilot-chat-inline.md`
- `exerc-02-03-copilot-chat-explain.md`
- `exerc-02-04-copilot-chat-code-fixes.md`

Slides nuevas necesarias:

- "Copilot no lee tu mente: lee tu contexto".
- "Autocompletado no es agente".
- "Ask, Edit, Agent: tres velocidades".
- "El error pegado sin contexto cuesta caro".
- "El diff manda".

Notas del creador:

- Mostrar un ejemplo donde el comentario genera codigo mediocre y otro donde genera codigo muy bueno.
- Explicar que Copilot es muy productivo si el archivo actual esta bien nombrado y el contexto cercano ayuda.
- Insistir en revisar sugerencias y no aceptar todo por velocidad.

## 7. Curso CP2 - Copilot Medium

Objetivo: convertir Copilot en una herramienta de flujo de equipo.

Contenido:

1. Refactoring con Copilot.
2. Test generation.
3. Test cases.
4. Documentation generation.
5. Custom instructions.
6. Path-specific instructions.
7. Prompt files.
8. Reusable workflows.
9. Commit/PR descriptions.
10. Code review local.

Ejercicios reutilizables:

- `exerc-02-03-copilot-chat-refactoring.md`
- `best-practices-test.md`
- `exerc-06-01-unit-test.md`
- `exerc-06-02-test-cases.md`
- `exerc-07-01-generate-general-documentation.md`
- `exerc-07-02-generate-code-documentation.md`
- `best-practices-instructions.md`
- `exerc-02-01-instructions.md`
- `exerc-02-03-prompts.md`

Plantillas nuevas:

```text
.github/
  copilot-instructions.md
  instructions/
    frontend.instructions.md
    backend.instructions.md
    tests.instructions.md
  prompts/
    review.prompt.md
    generate-tests.prompt.md
    refactor-service.prompt.md
    prepare-pr.prompt.md
```

Notas del creador:

- Explicar que `.github/copilot-instructions.md` es para reglas siempre activas.
- Explicar que `.instructions.md` debe ser especifico por path o tarea.
- Explicar que `.prompt.md` es para invocar cuando toca, no para cargar siempre.
- Mostrar un prompt file que pide tests y otro que prepara PR.

## 8. Curso CP3 - Copilot Advanced

Objetivo: usar agent mode, custom agents, MCP y code review como sistema.

Contenido:

1. Agent mode: cuando si y cuando no.
2. Herramientas disponibles en VS Code.
3. Custom agents `.agent.md`.
4. Handoffs entre agentes.
5. Tool lists y limites.
6. MCP en IDE.
7. GitHub MCP Server.
8. Code review en VS Code y GitHub.
9. Instructions para review.
10. Premium requests y modelos.

Plantillas:

```text
.github/
  agents/
    planner.agent.md
    implementer.agent.md
    reviewer.agent.md
    security.agent.md
  prompts/
    plan.prompt.md
    fix-tests.prompt.md
    security-review.prompt.md
  instructions/
    review.instructions.md
```

Ejercicios:

- CP3-E01. Crear custom agent planner read-only.
- CP3-E02. Crear custom agent implementer con herramientas de edicion.
- CP3-E03. Crear reviewer agent con instrucciones de PR.
- CP3-E04. Usar prompt file con agent especifico.
- CP3-E05. Conectar GitHub MCP Server en IDE.
- CP3-E06. Ejecutar code review sobre cambios locales.
- CP3-E07. Configurar instrucciones path-specific para review.
- CP3-E08. Medir consumo de premium requests por modelo.
- CP3-E09. Resolver bug multiarchivo con agent mode.
- CP3-E10. Crear handoff planner -> implementer -> reviewer.

## 9. Curso CP4 - Copilot Cloud Agent Enterprise

Objetivo: delegar tareas a Copilot en GitHub de forma gobernada.

Contenido:

1. Que es Copilot cloud agent.
2. Como se habilita por plan/politica.
3. Tareas desde issues, PRs, panel de agentes o IDE.
4. Custom instructions para cloud agent.
5. MCP para cloud agent.
6. Custom agents en GitHub.
7. Hooks.
8. Skills.
9. Code review automatico.
10. Coste: Actions minutes + premium requests.
11. Seguridad: permisos, repos, secrets, datos.
12. Operating model de equipo.

Ejercicios:

- CP4-E01. Preparar issue delegable.
- CP4-E02. Asignar tarea a Copilot cloud agent en repo demo.
- CP4-E03. Revisar PR creado por agente.
- CP4-E04. Configurar custom instructions para cloud.
- CP4-E05. Configurar MCP server readonly de docs.
- CP4-E06. Crear custom agent cloud compatible.
- CP4-E07. Crear hook de validacion.
- CP4-E08. Activar code review con instrucciones.
- CP4-E09. Analizar premium requests.
- CP4-E10. Crear politica de adopcion enterprise.

## 10. Catalogo de ejercicios Copilot

### 10.1 Basic

| ID | Ejercicio | Fuente | Artefacto |
|---|---|---|---|
| CP-B01 | Setup VS Code | existente | checklist |
| CP-B02 | Setup CLI | existente | checklist |
| CP-B03 | Completion | existente | codigo |
| CP-B04 | Shortcuts | existente | atajos |
| CP-B05 | Comment to code | existente | funcion |
| CP-B06 | Comment to code advanced | existente | modulo |
| CP-B07 | Chat basics | existente | respuesta |
| CP-B08 | Inline chat | existente | patch |
| CP-B09 | Explain legacy | existente | explicacion |
| CP-B10 | Code fixes | existente | patch |
| CP-B11 | Smart actions | existente | accion VS Code |
| CP-B12 | Primer diff revisado | nuevo | review notes |

### 10.2 Medium

| ID | Ejercicio | Fuente | Artefacto |
|---|---|---|---|
| CP-M01 | Refactor con Copilot | existente | patch |
| CP-M02 | Unit tests | existente | tests |
| CP-M03 | Test cases | existente | matrix |
| CP-M04 | General docs | existente | README |
| CP-M05 | Code docs | existente | docstrings |
| CP-M06 | Repo instructions | existente + nuevo | `.github/copilot-instructions.md` |
| CP-M07 | Path instructions | nuevo | `.github/instructions/*.instructions.md` |
| CP-M08 | Prompt file review | existente + nuevo | `.github/prompts/review.prompt.md` |
| CP-M09 | Prompt file tests | nuevo | `.github/prompts/generate-tests.prompt.md` |
| CP-M10 | PR description | nuevo | prompt + output |
| CP-M11 | Commit message rules | nuevo | settings/instructions |
| CP-M12 | Code review local | existente + nuevo | suggestions |

### 10.3 Advanced

| ID | Ejercicio | Fuente | Artefacto |
|---|---|---|---|
| CP-A01 | Custom planner agent | existente + nuevo | `.github/agents/planner.agent.md` |
| CP-A02 | Custom implementer agent | nuevo | `.github/agents/implementer.agent.md` |
| CP-A03 | Custom reviewer agent | nuevo | `.github/agents/reviewer.agent.md` |
| CP-A04 | Handoff flow | nuevo | agents + prompt |
| CP-A05 | MCP GitHub | existente | MCP config |
| CP-A06 | MCP docs server | nuevo | MCP config |
| CP-A07 | MCP toolsets | nuevo | allowed tools |
| CP-A08 | Agent mode bugfix | nuevo | patch |
| CP-A09 | Premium request budget | nuevo | cost log |
| CP-A10 | Multi-model comparison | nuevo | comparison report |
| CP-A11 | Code review instructions | existente + nuevo | review policy |
| CP-A12 | Security reviewer agent | nuevo | findings |

### 10.4 Cloud/Enterprise

| ID | Ejercicio | Fuente | Artefacto |
|---|---|---|---|
| CP-C01 | Issue delegable | nuevo | issue template |
| CP-C02 | Cloud PR task | nuevo | PR |
| CP-C03 | Review PR generado | nuevo | review |
| CP-C04 | Cloud instructions | nuevo | `.github/copilot-instructions.md` |
| CP-C05 | Cloud MCP config | nuevo | repo MCP JSON |
| CP-C06 | Custom cloud agent | nuevo | `.github/agents/*.agent.md` |
| CP-C07 | Hook de validacion | nuevo | hook config |
| CP-C08 | Skill de dominio | nuevo | skill |
| CP-C09 | Actions minutes + requests | nuevo | cost report |
| CP-C10 | Governance pack | nuevo | policy docs |

## 11. Microvideos CourseScript Copilot

### 11.1 Escenas existentes reutilizables

| Escena | Uso Copilot |
|---|---|
| `title` | abrir modulo |
| `concept` | explicar instructions, prompts, agents |
| `compare` | Ask vs Edit vs Agent |
| `linear` | flujo paso a paso |
| `coding` | cambios en VS Code |
| `preview` | resultado y diff |
| `error` | error/test fallido |
| `finale` | checklist |

### 11.2 Escenas nuevas necesarias

| Escena | Descripcion |
|---|---|
| `vscode-agent-panel` | panel de chat/agents de VS Code |
| `inline-completion` | ghost text y aceptacion |
| `ask-edit-agent-switcher` | selector de modos |
| `github-pr-flow` | issue -> agent -> PR -> review |
| `premium-request-meter` | contador de requests por modelo |
| `customization-tree` | `.github` instructions/prompts/agents |
| `mcp-tool-picker` | seleccion de herramientas MCP |
| `code-review-comment` | sugerencia de Copilot review |

### 11.3 Catalogo inicial

| ID | Titulo | Curso | Escenas |
|---|---|---|---|
| V-CP-001 | Inline completion bien usada | CP1 | inline-completion, coding |
| V-CP-002 | Ask, Edit y Agent | CP1 | ask-edit-agent-switcher, compare |
| V-CP-003 | Explain codigo legacy | CP1 | coding, concept |
| V-CP-004 | De error a fix | CP1 | error, coding, preview |
| V-CP-005 | Tests con Copilot | CP2 | coding, preview |
| V-CP-006 | `.github/copilot-instructions.md` | CP2 | customization-tree, concept |
| V-CP-007 | Prompt files reutilizables | CP2 | customization-tree, coding |
| V-CP-008 | Code review local | CP2/CP3 | code-review-comment, preview |
| V-CP-009 | Custom planner agent | CP3 | vscode-agent-panel, coding |
| V-CP-010 | MCP en VS Code | CP3 | mcp-tool-picker, preview |
| V-CP-011 | Premium requests sin sustos | CP3 | premium-request-meter, compare |
| V-CP-012 | Cloud agent desde issue | CP4 | github-pr-flow, preview |
| V-CP-013 | PR generado por agente | CP4 | github-pr-flow, code-review-comment |
| V-CP-014 | Hooks y skills en cloud | CP4 | concept, linear |
| V-CP-015 | Governance Copilot | CP4 | compare, finale |

## 12. Assets visuales Copilot

### 12.1 Assets primarios

| Asset | Uso |
|---|---|
| `copilot-vscode-control-room.png` | mapa de VS Code con chat, editor, terminal |
| `copilot-ask-edit-agent-traffic.png` | elegir modo correcto |
| `copilot-ghost-text-race.png` | autocompletion con humor |
| `copilot-github-pr-assembly-line.png` | cloud agent y PR |
| `copilot-premium-request-wallet.png` | coste |
| `copilot-customization-toolbox.png` | instructions/prompts/agents |
| `copilot-mcp-switchboard.png` | herramientas externas |
| `copilot-review-magnifier.png` | code review |

### 12.2 Imagenes de reflexion/humor

- "El desarrollador aceptando ghost text a 200 km/h y el test mirando desde lejos".
- "Un PR con demasiadas instrucciones pegadas como post-its".
- "El agente cloud haciendo la mudanza mientras el developer esta en cafe".
- "Premium requests como monedas en una recreativa".
- "Custom agent planner con casco, implementer con teclado, reviewer con lupa".

## 13. Plantillas Copilot

### 13.1 Estructura objetivo

```text
copilot-pack/
  .github/
    copilot-instructions.md
    instructions/
      frontend.instructions.md
      backend.instructions.md
      tests.instructions.md
      review.instructions.md
    prompts/
      generate-tests.prompt.md
      refactor-service.prompt.md
      review.prompt.md
      prepare-pr.prompt.md
      explain-legacy.prompt.md
    agents/
      planner.agent.md
      implementer.agent.md
      reviewer.agent.md
      security.agent.md
  AGENTS.md
  docs/
    copilot-cost-policy.md
    copilot-review-policy.md
    copilot-agent-operating-model.md
    mcp-inventory.md
```

### 13.2 `.github/copilot-instructions.md`

Debe incluir:

- Stack.
- Comandos de test.
- Convenciones de estilo.
- Librerias preferidas.
- Reglas de seguridad.
- Reglas de PR.
- Formato de respuesta.
- Criterio de done.

### 13.3 Path instructions

Uso recomendado:

- `frontend.instructions.md`: componentes, accesibilidad, estilos.
- `backend.instructions.md`: contratos, errores, observabilidad.
- `tests.instructions.md`: naming, mocks, unit vs integration.
- `review.instructions.md`: foco de code review.

### 13.4 Prompt files

Prompt files minimos:

| Prompt file | Uso |
|---|---|
| `generate-tests.prompt.md` | generar tests con contexto |
| `refactor-service.prompt.md` | refactor controlado |
| `review.prompt.md` | revisar cambios |
| `prepare-pr.prompt.md` | descripcion PR |
| `explain-legacy.prompt.md` | explicar codigo viejo |
| `fix-ci.prompt.md` | investigar CI |
| `security-review.prompt.md` | revisar seguridad |
| `docs-update.prompt.md` | actualizar docs |

### 13.5 Custom agents

Agentes minimos:

| Agent | Herramientas | Objetivo |
|---|---|---|
| `planner.agent.md` | read/search | plan sin editar |
| `implementer.agent.md` | edit/test | implementar |
| `reviewer.agent.md` | diff/review | revisar |
| `security.agent.md` | read/search/MCP security | riesgos |
| `docs.agent.md` | read/edit docs | documentacion |
| `tester.agent.md` | tests/terminal | pruebas |

## 14. MCP Copilot

### 14.1 MCP en IDE

Practicas:

- Conectar GitHub MCP Server.
- Usar toolsets para limitar capacidades.
- Configurar servidor docs mock.
- Comparar MCP vs pegar contexto manualmente.
- Explicar que MCP agrega herramientas y contexto, y tambien superficie de riesgo.

### 14.2 MCP en cloud agent

Practicas:

- Repositorio con config MCP.
- Variables/secrets con prefijo seguro cuando aplique.
- Config readonly.
- Ejercicio de tool allowlist.
- Ejercicio de "no activar todos los servidores".

### 14.3 MCPs recomendados para formacion

| MCP | Modo | Por que |
|---|---|---|
| GitHub | readonly primero | issues, PRs, repo |
| Docs mock | readonly | contexto interno |
| Postgres mock | readonly | consultas controladas |
| Sentry mock | readonly | incidentes |
| Jira/Linear mock | readonly | issues de negocio |
| Browser/local | controlado | UI tests |

## 15. Coste y premium requests

### 15.1 Conceptos que debe explicar el curso

- Que es una request.
- Que es una premium request.
- Model multipliers.
- Modelos incluidos segun plan.
- Auto model selection.
- Copilot cloud agent usa premium requests y GitHub Actions minutes.
- Los contadores y modelos estan sujetos a cambio.
- No todos los prompts cuestan igual si cambia el modelo o la feature.

### 15.2 Ejercicio obligatorio

`CP-A09 Premium request budget`

Entregable:

```md
# Copilot Premium Request Log

Feature usada:
Superficie: VS Code / GitHub / CLI / Cloud agent
Modelo:
Auto model selection: si/no
Tipo de tarea:
Numero de prompts:
Resultado:
Requests estimadas:
Hubiera podido usar modelo incluido:
Riesgo de sobrecoste:
Decision para equipo:
```

### 15.3 Reglas didacticas

1. Usar modelos incluidos para tareas rutinarias cuando sea suficiente.
2. Usar modelo premium solo si aporta calidad.
3. No lanzar agent mode sin acotar objetivo.
4. No delegar cloud agent con issue ambiguo.
5. Usar prompt files para reducir repeticion.
6. Usar instructions cortas.
7. Revisar modelos disponibles porque cambian.
8. Medir cloud agent como coste GitHub + Copilot.

## 16. Code review Copilot

### 16.1 Contenido obligatorio

- Review de cambios no commiteados en VS Code.
- Review en GitHub PR.
- Suggested changes.
- Feedback thumbs up/down.
- Repo-wide instructions.
- Path-specific instructions.
- Limitaciones de instrucciones en code review.
- Re-review.
- Automatic reviews.

### 16.2 Ejercicios

- CP-R01. Review local de bug.
- CP-R02. Review de PR con instrucciones en espanol.
- CP-R03. Review con checklist de seguridad.
- CP-R04. Review path-specific frontend.
- CP-R05. Comparar review sin y con instructions.
- CP-R06. Aplicar suggested change y validar test.

### 16.3 Plantilla review

```md
# Copilot Review Instructions

When reviewing code:
- Prioritize correctness, security, accessibility, performance, and maintainability.
- Prefer concrete file/line findings.
- Do not comment on style unless it affects readability or team conventions.
- Check tests for meaningful assertions.
- Check that generated code does not hide failures.
- Respond in Spanish for training repositories.
```

## 17. Requisitos funcionales Copilot

### 17.1 Cursos

- R-CP-001. La plataforma debe tener una ruta Copilot separada de Codex y Claude.
- R-CP-002. La ruta debe comenzar con Git/GitHub Survival.
- R-CP-003. Los cursos deben mapear ejercicios existentes del workspace.
- R-CP-004. Cada curso debe indicar superficie: VS Code, GitHub, CLI, cloud.
- R-CP-005. Cada curso debe incluir slides, notas, ejercicios y microvideos.
- R-CP-006. Cada modulo debe tener una practica verificable.
- R-CP-007. Cada modulo debe tener prompt inicial y prompt mejorado.
- R-CP-008. Cada modulo debe explicar riesgos de aceptar sugerencias.
- R-CP-009. Cada modulo avanzado debe explicar premium requests.
- R-CP-010. Cada curso debe poder ejecutarse en modo autoconsumo.

### 17.2 Ejercicios

- R-CP-011. Importar los 35 ejercicios Markdown existentes.
- R-CP-012. Clasificarlos por nivel y habilidad.
- R-CP-013. Asociar cada ejercicio a solucion existente si aplica.
- R-CP-014. Crear metadatos para cada ejercicio.
- R-CP-015. Crear microvideo para los ejercicios troncales.
- R-CP-016. Crear checklists de validacion.
- R-CP-017. Crear rubrica para code review.
- R-CP-018. Crear plantilla de coste.
- R-CP-019. Crear modo "ver pista".
- R-CP-020. Crear modo "ver solucion".

### 17.3 Customization

- R-CP-021. Generar `.github/copilot-instructions.md`.
- R-CP-022. Generar `.github/instructions/*.instructions.md`.
- R-CP-023. Generar `.github/prompts/*.prompt.md`.
- R-CP-024. Generar `.github/agents/*.agent.md`.
- R-CP-025. Generar `AGENTS.md` compatible con multiples agentes.
- R-CP-026. Validar longitud y claridad de instrucciones.
- R-CP-027. Separar instrucciones siempre activas de prompts invocables.
- R-CP-028. Incluir ejemplos de handoff entre agents.
- R-CP-029. Incluir diagnostico de customizations cargadas.
- R-CP-030. Incluir convenciones de nombre.

### 17.4 MCP y cloud

- R-CP-031. Incluir lab de GitHub MCP Server.
- R-CP-032. Incluir lab de MCP docs mock.
- R-CP-033. Incluir lab de toolsets/allowlist.
- R-CP-034. Incluir lab de cloud agent desde issue.
- R-CP-035. Incluir lab de PR generado por agent.
- R-CP-036. Incluir lab de code review automatico.
- R-CP-037. Incluir lab de hooks.
- R-CP-038. Incluir lab de skills.
- R-CP-039. Incluir politicas enterprise.
- R-CP-040. Incluir coste GitHub Actions + premium requests.

### 17.5 Video

- R-CP-041. CourseScript debe soportar UI tipo VS Code.
- R-CP-042. Debe soportar ghost text simulado.
- R-CP-043. Debe soportar panel de chat simulado.
- R-CP-044. Debe soportar cambio Ask/Edit/Agent.
- R-CP-045. Debe soportar PR flow.
- R-CP-046. Debe soportar review comments.
- R-CP-047. Debe soportar premium request meter.
- R-CP-048. Debe soportar tree `.github`.
- R-CP-049. Debe soportar MCP tool picker.
- R-CP-050. Debe incrustarse en ejercicios.

### 17.6 Gobierno

- R-CP-051. Definir politica de modelos.
- R-CP-052. Definir politica de premium requests.
- R-CP-053. Definir politica de cloud agent.
- R-CP-054. Definir politica de MCPs.
- R-CP-055. Definir politica de PRs generadas por IA.
- R-CP-056. Definir politica de code review.
- R-CP-057. Definir proceso de actualizacion mensual.
- R-CP-058. Definir pack de onboarding.
- R-CP-059. Definir pack de tutorias.
- R-CP-060. Definir metricas de adopcion.

## 18. Requisitos no funcionales

- RNF-CP-001. La ruta debe funcionar para perfiles no expertos en IA.
- RNF-CP-002. La ruta debe evitar explicar Git en sesiones avanzadas.
- RNF-CP-003. Los ejercicios deben poder completarse en 10-25 minutos.
- RNF-CP-004. Los microvideos deben durar 2-6 minutos.
- RNF-CP-005. Los assets deben recordar VS Code/GitHub sin depender de screenshots privados.
- RNF-CP-006. Los prompts deben ser copiables.
- RNF-CP-007. El contenido debe incluir fecha de revision oficial.
- RNF-CP-008. El contenido debe avisar cuando una feature dependa de plan/politica.
- RNF-CP-009. Las plantillas no deben exponer secrets.
- RNF-CP-010. La navegacion debe permitir filtrar por skill.
- RNF-CP-011. La plataforma debe distinguir local agent y cloud agent.
- RNF-CP-012. La plataforma debe ser rapida para workshops.
- RNF-CP-013. La plataforma debe tener modo proyector.
- RNF-CP-014. La plataforma debe tener modo autoconsumo.
- RNF-CP-015. La plataforma debe soportar actualizaciones de ejercicios.

## 19. Backlog Copilot

### 19.1 Prioridad 0

1. Importar workspace de ejercicios.
2. Crear metadata por ejercicio.
3. Crear vista Basic/Medium/Advanced.
4. Crear plantillas `.github`.
5. Crear 6 microvideos.
6. Crear pack Git/GitHub Survival.
7. Crear solucion navegable.
8. Crear checklist de setup.
9. Crear matriz de premium requests.
10. Crear primer workshop de 10 retos.

### 19.2 Prioridad 1

1. Crear custom agents.
2. Crear prompt files.
3. Crear path-specific instructions.
4. Crear lab MCP.
5. Crear lab code review.
6. Crear lab cloud agent.
7. Crear assets visuales.
8. Crear quizzes.
9. Crear dashboard de progreso.
10. Crear guia de tutoria.

### 19.3 Prioridad 2

1. Integrar GitHub API si se permite.
2. Medir completitud de retos.
3. Crear simulador de PR.
4. Crear simulador de premium requests.
5. Crear generador de custom instructions.
6. Crear generador de prompt files.
7. Crear generador de custom agents.
8. Crear version enterprise.
9. Crear calendario de tutorias.
10. Crear informes por equipo.

## 20. Roadmap Copilot

### Fase A - MVP 2 semanas

- Convertir ejercicios actuales en plataforma.
- Crear CP0 + CP1.
- Crear 5 microvideos.
- Crear pack `.github`.

### Fase B - Practice 4 semanas

- Completar CP2.
- Crear prompt files y instructions.
- Crear code review labs.
- Crear workshop de 10 retos.

### Fase C - Advanced 6 semanas

- Completar CP3.
- Crear custom agents.
- Crear MCP labs.
- Crear premium request training.

### Fase D - Enterprise 8 semanas

- Completar CP4.
- Crear cloud agent labs.
- Crear governance pack.
- Crear tutorias recurrentes.

## 21. Riesgos

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| Copilot cambia UI/planes | alto | revision mensual docs |
| Alumnos usan solo autocomplete | medio | retos agent mode |
| Exceso de teoria Git | alto | CP0 autoconsumible |
| Custom instructions demasiado largas | medio | laboratorio de poda |
| Premium requests mal entendidas | alto | log de coste |
| Cloud agent no habilitado en empresa | alto | simulador y alternativa local |
| MCP mal configurado | alto | readonly + mocks |
| PRs generadas sin revision humana | alto | review policy |
| Code review ruidoso | medio | instrucciones y rubrica |
| Workspace viejo queda desactualizado | medio | metadata + fuentes oficiales |

## 22. Criterios de exito

- 80% completa CP0 antes del workshop.
- 70% completa al menos 8 ejercicios Basic.
- 50% crea `.github/copilot-instructions.md`.
- 40% crea un prompt file.
- 30% crea un custom agent.
- 25% completa un ejercicio MCP.
- 25% ejecuta code review con instrucciones.
- Se reduce el tiempo de setup repetitivo en tutorias.
- Se crea un workshop mensual de 10 retos.
- Cada equipo piloto sale con pack `.github` reutilizable.

## 23. Decision recomendada

Copilot debe ser la ruta de activacion masiva y workshops recurrentes. La jugada correcta:

1. Convertir `workspace-github-copilot-main` en plataforma de ejercicios.
2. Crear una ruta CP0 para quitar ruido de Git/GitHub.
3. Reorganizar los 35 ejercicios por nivel.
4. Anadir custom instructions, prompt files, custom agents, MCP, code review y cloud agent.
5. Crear microvideos CourseScript para los conceptos de alto bloqueo.
6. Usar el formato "10 retos autoconsumibles + tutoria" como producto principal.

Resultado esperado: Copilot deja de ser un curso teorico de 12 horas y se convierte en una fabrica practica de activacion de equipos.
