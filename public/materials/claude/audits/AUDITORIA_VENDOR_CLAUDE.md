# Auditoria Vendor - Claude Code Practice Hub

Fecha de referencia: 2026-05-07  
Objetivo: definir una ruta practica y profundamente personalizada para Claude Code y Claude Agent SDK, con foco en `CLAUDE.md`, memoria, skills, subagentes, hooks, MCP, plugins, GitHub Actions, coste por contexto/modelo y patrones de trabajo agentico.

## 0. Resumen ejecutivo

Claude debe ser la ruta de ingenieria agentica "de oficio": menos centrada en GitHub como producto y mas centrada en construir un entorno de trabajo con memoria, instrucciones, herramientas, subagentes, hooks y plugins.

La ruta Claude no debe parecer una copia de Codex ni de Copilot. Debe girar alrededor de estas piezas:

- `CLAUDE.md` como memoria/instrucciones de proyecto.
- Auto memory para aprendizajes locales.
- `.claude/settings.json` para permisos, entorno y herramientas.
- `.claude/skills/*/SKILL.md` para workflows.
- `.claude/agents/*.md` para subagentes especializados.
- `.mcp.json` para MCPs compartidos por proyecto.
- Hooks para control determinista del loop.
- Plugins para distribuir skills, agents, hooks y MCP servers.
- Claude Agent SDK para programar agentes en Python/TypeScript.
- GitHub Actions para ejecutar Claude Code en CI/CD.
- Gestion de coste con modelo, contexto, MCPs, subagentes y compactacion.

La plataforma debe crear una ruta Claude desde uso personal hasta sistema enterprise, con laboratorios que generen archivos reales y que se puedan comparar con Codex y Copilot sin mezclarlos.

## 1. Fuentes oficiales revisadas

Fuentes Anthropic/Claude revisadas:

- Claude Code Features Overview: https://code.claude.com/docs/en/features-overview
- Claude Code Settings: https://code.claude.com/docs/en/settings
- Claude Code Memory: https://code.claude.com/docs/en/memory
- Claude Code Skills: https://code.claude.com/docs/en/slash-commands
- Claude Code Subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code Hooks: https://code.claude.com/docs/en/hooks
- Claude Code MCP: https://code.claude.com/docs/en/mcp
- Claude Code Plugins: https://code.claude.com/docs/en/plugins
- Claude Code Plugins Reference: https://code.claude.com/docs/en/plugins-reference
- Claude Code Costs: https://code.claude.com/docs/en/costs
- Claude Code GitHub Actions: https://docs.claude.com/en/docs/claude-code/github-actions
- Claude Agent SDK Overview: https://code.claude.com/docs/en/agent-sdk/overview
- Claude Agent SDK Skills: https://code.claude.com/docs/en/agent-sdk/skills

Lectura aplicada:

- La documentacion de Claude separa claramente `CLAUDE.md`, skills, subagents, agent teams, MCP, hooks y plugins.
- `CLAUDE.md` se carga como contexto al inicio y consume tokens; debe ser corto, especifico y mantenible.
- Auto memory complementa `CLAUDE.md`, pero no sustituye instrucciones de equipo.
- Skills cargan bajo demanda y son mejores que meter procedimientos largos en `CLAUDE.md`.
- Subagents pueden tener prompts, herramientas, permisos, modelos, MCPs, hooks, skills, memoria, esfuerzo, aislamiento y max turns.
- Hooks ejecutan scripts/eventos deterministicos en puntos del loop: `PreToolUse`, `PostToolUse`, `SubagentStart`, `SubagentStop`, `Stop`, etc.
- MCP se configura en scope local, project o user; `.mcp.json` es la opcion compartible por equipo.
- Plugins empaquetan skills, agents, hooks, MCP servers y otros componentes.
- La guia de costes recomienda elegir modelo con criterio, reservar modelos caros para tareas complejas, reducir contexto y revisar overhead de MCP.
- Claude Agent SDK permite crear agentes programaticos con las mismas capacidades base de Claude Code.

## 2. Posicionamiento Claude

### 2.1 Promesa

"Aprende a construir un entorno Claude Code que recuerda, delega, valida y automatiza sin convertir cada tarea en un prompt gigante."

### 2.2 Diferencia frente a Copilot

Copilot se debe vender como integracion VS Code/GitHub para adopcion masiva. Claude se debe vender como:

- Entorno agentico configurable.
- Memoria e instrucciones como arquitectura.
- Hooks deterministas para enforcement.
- Subagentes muy expresivos.
- Plugins como paquete de distribucion.
- Agent SDK para construir productos/agentes propios.

### 2.3 Diferencia frente a Codex

Codex comparte conceptos como skills, MCP y subagentes, pero Claude debe ensenarse con su propia estructura:

- `CLAUDE.md` en vez de `AGENTS.md` como memoria principal.
- `.claude/skills` en vez de `.agents/skills`.
- `.claude/agents` para subagentes.
- `.mcp.json` como archivo de proyecto MCP.
- Hooks como elemento troncal y no accesorio.
- Agent SDK como salida API/programatica.

## 3. Rutas Claude

| Ruta | Nombre | Duracion | Resultado |
|---|---|---:|---|
| CL0 | Claude Code Orientation | 60 min | Primer uso con memoria y permisos |
| CL1 | Claude Basic | 3 h | `CLAUDE.md`, prompts, edits, tests |
| CL2 | Claude Operator | 5 h | skills, subagents, MCP, cost control |
| CL3 | Claude Advanced Automation | 6 h | hooks, plugins, GitHub Actions |
| CL4 | Claude Agent SDK Enterprise | 6 h | agentes programaticos, evaluacion y gobierno |

## 4. Curso CL0 - Orientation

Objetivo: explicar que Claude Code no es solo chat, sino un entorno que se adapta al proyecto.

Pantallas:

1. Que es Claude Code.
2. CLI y superficies.
3. Primer proyecto.
4. `CLAUDE.md` vs prompt suelto.
5. Auto memory.
6. Permisos y settings.
7. Modelo y coste.
8. Primer edit.
9. Primer test.
10. Primer cierre con resumen.

Ejercicios:

- CL0-E01. Abrir repo y pedir mapa.
- CL0-E02. Crear `CLAUDE.md` minimo.
- CL0-E03. Preguntar `/memory`.
- CL0-E04. Ejecutar una tarea de solo lectura.
- CL0-E05. Crear checklist de done.

Microvideos:

- `cl-orientation-01-claude-md`
- `cl-orientation-02-memory-vs-instructions`
- `cl-orientation-03-cost-context`

## 5. Curso CL1 - Claude Basic

Objetivo: que el alumno use Claude para tareas reales sin contaminar contexto ni depender de prompts enormes.

Contenido:

1. Prompt operativo.
2. `CLAUDE.md` efectivo.
3. Instrucciones cortas y verificables.
4. Reglas por directorio.
5. Edicion de codigo.
6. Tests.
7. Refactors acotados.
8. `/compact` y contexto.
9. `/model` basico.
10. Handoff humano.

Plantillas:

```text
claude-basic-pack/
  CLAUDE.md
  CLAUDE.local.md
  .claude/
    settings.json
    rules/
      frontend.md
      backend.md
      tests.md
  docs/
    done-checklist.md
    handoff.md
```

Notas del creador:

- Explicar que `CLAUDE.md` consume contexto, asi que debe tener reglas utiles, no literatura.
- Mostrar una instruccion vaga y una verificable.
- Repetir que auto memory es local y no sustituye normas de equipo.

## 6. Curso CL2 - Claude Operator

Objetivo: pasar de usar Claude a operar Claude.

Contenido:

1. Skills: cuando crear una.
2. `SKILL.md` y frontmatter.
3. Dynamic context injection.
4. Skills automaticas vs invocadas.
5. Subagents.
6. Modelos por subagente.
7. MCP local/project/user.
8. `.mcp.json` compartido.
9. `/context` y overhead.
10. Coste y seleccion de modelo.

Ejercicios:

- CL2-E01. Crear skill `summarize-changes`.
- CL2-E02. Crear skill `fix-tests`.
- CL2-E03. Crear skill con referencias.
- CL2-E04. Crear subagent `explorer`.
- CL2-E05. Crear subagent `qa-reviewer`.
- CL2-E06. Subagent con modelo barato para tarea simple.
- CL2-E07. Configurar MCP local.
- CL2-E08. Configurar `.mcp.json` project.
- CL2-E09. Comparar MCP vs CLI directa.
- CL2-E10. Auditar contexto con `/context`.

## 7. Curso CL3 - Claude Advanced Automation

Objetivo: usar hooks, plugins y GitHub Actions para automatizar flujos.

Contenido:

1. Por que hooks: determinismo.
2. Eventos principales.
3. `PreToolUse` para bloquear.
4. `PostToolUse` para validar.
5. `SubagentStart` para inyectar contexto.
6. `SubagentStop` para recoger salida.
7. `Stop` para exigir pruebas.
8. Plugins.
9. Plugin con skill + agent + hook + MCP.
10. Claude Code GitHub Actions.

Ejercicios:

- CL3-E01. Hook que bloquea lectura de `.env`.
- CL3-E02. Hook que ejecuta lint tras editar.
- CL3-E03. Stop hook que bloquea cierre si faltan tests.
- CL3-E04. SubagentStart que inyecta reglas de seguridad.
- CL3-E05. SubagentStop que resume findings.
- CL3-E06. Crear plugin `team-review`.
- CL3-E07. Plugin con MCP bundled.
- CL3-E08. GitHub Action con Claude Code.
- CL3-E09. PR comment trigger.
- CL3-E10. Cost report de workflow.

## 8. Curso CL4 - Claude Agent SDK Enterprise

Objetivo: ensenar a construir agentes y automatizaciones productivas con Claude Agent SDK.

Contenido:

1. Agent SDK vs Claude Code CLI.
2. Instalacion Python/TypeScript.
3. API key.
4. Agente que lee repo.
5. Agente que ejecuta comandos.
6. Agente que edita codigo.
7. Skills en SDK.
8. MCP en SDK.
9. Plugins programaticos.
10. Evaluacion y trazabilidad.
11. Seguridad y terminos de uso.
12. Producto interno: "review bot" o "migration bot".

Ejercicios:

- CL4-E01. Agente SDK lista archivos.
- CL4-E02. Agente SDK genera plan.
- CL4-E03. Agente SDK revisa diff.
- CL4-E04. Agente SDK usa skill.
- CL4-E05. Agente SDK usa MCP mock.
- CL4-E06. Agente SDK genera JSON estructurado.
- CL4-E07. Agente SDK con limites de herramientas.
- CL4-E08. Agente SDK con evaluacion.
- CL4-E09. Integrar en CI.
- CL4-E10. Capstone: reviewer interno.

## 9. Catalogo de ejercicios Claude

### 9.1 Basic

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CL-B01 | Crear `CLAUDE.md` | `CLAUDE.md` | si |
| CL-B02 | Regla verificable | update `CLAUDE.md` | si |
| CL-B03 | `CLAUDE.local.md` | local notes | no |
| CL-B04 | Reglas por carpeta | `.claude/rules/*.md` | si |
| CL-B05 | Bugfix con test | patch + test | si |
| CL-B06 | Refactor pequeno | patch | no |
| CL-B07 | Handoff | `handoff.md` | no |
| CL-B08 | Compactar contexto | resumen | si |
| CL-B09 | Seleccion de modelo | `model-decision.md` | si |
| CL-B10 | Auto memory audit | memory notes | si |

### 9.2 Operator

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CL-O01 | Skill basica | `.claude/skills/summarize-changes/SKILL.md` | si |
| CL-O02 | Skill con script | skill + script | si |
| CL-O03 | Skill con referencias | skill + refs | no |
| CL-O04 | Skill con dynamic context | `!git diff` style | si |
| CL-O05 | Subagent explorer | `.claude/agents/explorer.md` | si |
| CL-O06 | Subagent QA | `.claude/agents/qa.md` | si |
| CL-O07 | Subagent modelo barato | agent config | si |
| CL-O08 | MCP local | `~/.claude.json` entry | no |
| CL-O09 | MCP project | `.mcp.json` | si |
| CL-O10 | MCP allow/deny | settings | si |
| CL-O11 | `/context` audit | context report | si |
| CL-O12 | Cost audit | cost report | si |

### 9.3 Advanced Automation

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CL-A01 | Hook `PreToolUse` | hook config | si |
| CL-A02 | Hook `PostToolUse` | hook config | si |
| CL-A03 | Hook `Stop` | hook config | si |
| CL-A04 | Hook `SubagentStart` | hook config | si |
| CL-A05 | Hook `SubagentStop` | hook config | si |
| CL-A06 | Plugin con skill | plugin folder | si |
| CL-A07 | Plugin con MCP | plugin `.mcp.json` | si |
| CL-A08 | Plugin con agent | plugin agent | no |
| CL-A09 | GitHub Action | workflow | si |
| CL-A10 | PR automation | PR + comment | si |
| CL-A11 | Hook security gate | blocked action | si |
| CL-A12 | Hook test gate | test evidence | si |

### 9.4 Agent SDK

| ID | Ejercicio | Artefacto | Microvideo |
|---|---|---|---|
| CL-S01 | SDK setup TS | script | si |
| CL-S02 | SDK setup Python | script | si |
| CL-S03 | Agent reads repo | output | si |
| CL-S04 | Agent edits code | patch | si |
| CL-S05 | Agent uses skill | result | si |
| CL-S06 | Agent uses MCP | result | si |
| CL-S07 | Agent JSON output | schema/result | no |
| CL-S08 | Eval harness | eval report | si |
| CL-S09 | CI agent | workflow | si |
| CL-S10 | Capstone reviewer | mini product | si |

## 10. Microvideos CourseScript Claude

### 10.1 Escenas existentes reutilizables

| Escena | Uso Claude |
|---|---|
| `title` | entrada por modulo |
| `concept` | memoria, skill, hooks |
| `compare` | `CLAUDE.md` vs skill vs MCP |
| `linear` | setup paso a paso |
| `thinking` | plan y subagentes |
| `coding` | editar config/skills/hooks |
| `preview` | output y resultados |
| `error` | hook bloqueando o test fallando |
| `finale` | checklist |

### 10.2 Escenas nuevas necesarias

| Escena | Descripcion |
|---|---|
| `claude-memory-stack` | `CLAUDE.md`, local, rules, auto memory |
| `context-window-gauge` | contexto consumido |
| `slash-command-bar` | `/memory`, `/context`, `/model`, `/mcp` |
| `subagent-tree` | agentes y contextos aislados |
| `hook-event-timeline` | eventos del loop |
| `mcp-scope-ladder` | local/project/user/plugin/connectors |
| `plugin-package-view` | skills/agents/hooks/MCP dentro de plugin |
| `sdk-agent-loop` | script -> agent -> tools -> result |

### 10.3 Catalogo inicial

| ID | Titulo | Curso | Escenas |
|---|---|---|---|
| V-CL-001 | `CLAUDE.md` sin inflar contexto | CL0/CL1 | claude-memory-stack, context-window-gauge |
| V-CL-002 | Auto memory vs instrucciones | CL0/CL1 | compare, claude-memory-stack |
| V-CL-003 | Reglas por carpeta | CL1 | linear, coding |
| V-CL-004 | `/context` para gastar menos | CL1/CL2 | context-window-gauge, slash-command-bar |
| V-CL-005 | Crear primera skill | CL2 | coding, preview |
| V-CL-006 | Skill con contexto dinamico | CL2 | coding, preview |
| V-CL-007 | Subagent explorer | CL2 | subagent-tree, thinking |
| V-CL-008 | MCP project con `.mcp.json` | CL2 | mcp-scope-ladder, coding |
| V-CL-009 | `PreToolUse` bloqueando secrets | CL3 | hook-event-timeline, error |
| V-CL-010 | Stop hook exige tests | CL3 | hook-event-timeline, preview |
| V-CL-011 | Plugin con skill y MCP | CL3 | plugin-package-view, coding |
| V-CL-012 | Claude Code en GitHub Actions | CL3 | linear, preview |
| V-CL-013 | Agent SDK primer agente | CL4 | sdk-agent-loop, coding |
| V-CL-014 | SDK + skill + MCP | CL4 | sdk-agent-loop, mcp-scope-ladder |
| V-CL-015 | Coste: Sonnet, Opus, Haiku | CL2/CL4 | context-window-gauge, compare |

## 11. Assets visuales Claude

### 11.1 Assets primarios

| Asset | Uso |
|---|---|
| `claude-memory-library.png` | memoria e instrucciones |
| `claude-context-backpack.png` | coste/contexto |
| `claude-skill-recipe-book.png` | skills |
| `claude-subagent-office.png` | subagentes |
| `claude-hook-control-panel.png` | hooks |
| `claude-mcp-train-station.png` | scopes MCP |
| `claude-plugin-box.png` | plugins |
| `claude-sdk-factory.png` | Agent SDK |

### 11.2 Imagenes de reflexion/humor

- "CLAUDE.md gigante como maleta imposible de cerrar".
- "Hook de seguridad como portero que no deja pasar `.env`".
- "Subagentes en salas separadas para no ensuciar el contexto".
- "MCP project scope como caja compartida del equipo".
- "Opus con bata de arquitecto, Sonnet con casco de obra, Haiku con patinete para tareas pequenas".

## 12. Plantillas Claude

### 12.1 Estructura objetivo

```text
claude-pack/
  CLAUDE.md
  CLAUDE.local.md.example
  .claude/
    settings.json
    rules/
      frontend.md
      backend.md
      tests.md
      security.md
    skills/
      summarize-changes/
        SKILL.md
      fix-tests/
        SKILL.md
        scripts/
      release-notes/
        SKILL.md
        references/
    agents/
      explorer.md
      qa-reviewer.md
      security-reviewer.md
      docs-writer.md
    hooks/
      hooks.json
      scripts/
        block-secrets.js
        run-lint.js
        require-tests.js
  .mcp.json
  plugins/
    team-review-plugin/
      plugin.json
      skills/
      agents/
      hooks/
      .mcp.json
  docs/
    cost-policy.md
    context-policy.md
    memory-policy.md
    handoff.md
```

### 12.2 `CLAUDE.md` minimo

Debe incluir:

- Project overview.
- Stack y comandos.
- Reglas verificables.
- Testing policy.
- Security policy.
- Directorios importantes.
- Convenciones de PR.
- Criterio de done.
- Enlaces a docs.
- Que no hacer.

No debe incluir:

- Procedimientos largos repetibles que deberian ser skills.
- Documentacion completa de arquitectura si puede enlazarse.
- Listas enormes de endpoints.
- Reglas contradictorias.
- Comentarios vagos tipo "haz buen codigo".

### 12.3 `.claude/settings.json`

Debe ensenar:

- Permisos deny para secrets.
- Variables de entorno permitidas.
- Configuracion de herramientas.
- Hooks.
- MCP allow/deny.
- Configuracion por proyecto.

### 12.4 Skills minimas

| Skill | Uso |
|---|---|
| `summarize-changes` | resumir diff y riesgos |
| `fix-tests` | diagnosticar y arreglar tests |
| `release-notes` | generar notas de release |
| `security-pass` | revisar riesgos |
| `migration-plan` | planificar migracion |
| `incident-triage` | leer logs y proponer hipotesis |
| `api-contract-review` | validar contratos |
| `docs-sync` | actualizar docs |

### 12.5 Subagents minimos

| Subagent | Modelo sugerido | Uso |
|---|---|---|
| `explorer` | Sonnet/Haiku segun tarea | leer mucho y resumir |
| `qa-reviewer` | Sonnet | revisar tests y edge cases |
| `security-reviewer` | Sonnet/Opus si alto riesgo | riesgos y secrets |
| `architect` | Opus para decisiones complejas | arquitectura |
| `docs-writer` | Haiku/Sonnet | docs |
| `migration-planner` | Sonnet/Opus | migraciones |

## 13. MCP Claude

### 13.1 Scopes

La formacion debe explicar:

- Local scope: privado del proyecto en maquina.
- Project scope: `.mcp.json`, compartible por version control.
- User scope: disponible en todos los proyectos del usuario.
- Plugin-provided servers.
- Connectors.
- Precedencia cuando hay duplicados.

### 13.2 Reglas de seguridad MCP

- Usar project scope solo para servidores que el equipo aprueba.
- No commitear secretos.
- Usar variables de entorno.
- Preferir HTTP para remotos cuando aplique.
- Tratar stdio servers como ejecucion local con riesgo.
- Documentar owner, permisos y herramientas expuestas.
- Desactivar MCPs no usados.
- Revisar overhead de contexto.

### 13.3 MCPs para curso

| MCP | Scope | Uso |
|---|---|---|
| docs mock | project | docs internas |
| github mock | project | issues/PRs |
| postgres mock | local/project readonly | consultas |
| sentry mock | local | incidentes |
| filesystem labs | local | archivos |
| browser mock | local | UI |

## 14. Hooks Claude

### 14.1 Eventos que debe cubrir el curso

- `SessionStart`
- `UserPromptSubmit`
- `PreToolUse`
- `PermissionRequest`
- `PostToolUse`
- `PostToolUseFailure`
- `PostToolBatch`
- `Notification`
- `SubagentStart`
- `SubagentStop`
- `Stop`
- `PreCompact`
- `PostCompact`
- `FileChanged`
- `ConfigChange`

### 14.2 Labs de hooks

| Hook | Practica |
|---|---|
| `PreToolUse` | bloquear `.env` y `secrets/**` |
| `PostToolUse` | ejecutar lint despues de editar |
| `Stop` | no dejar terminar sin tests si hubo cambios |
| `SubagentStart` | inyectar contexto de seguridad |
| `SubagentStop` | guardar resumen de findings |
| `PreCompact` | guardar decisiones antes de compactar |
| `ConfigChange` | avisar de cambio de settings |
| `FileChanged` | regenerar docs auxiliares |

### 14.3 Regla pedagogica

Un hook no es un prompt. Es un control determinista. Debe usarse cuando la accion debe pasar siempre, aunque el modelo "se olvide".

## 15. Plugins Claude

### 15.1 Objetivo del modulo

Ensenar a empaquetar capacidades para equipo:

- Skills.
- Agents.
- Hooks.
- MCP servers.
- Configuracion.
- Assets/references.

### 15.2 Plugin de ejemplo

```text
team-review-plugin/
  plugin.json
  skills/
    review-pr/
      SKILL.md
    summarize-risk/
      SKILL.md
  agents/
    qa-reviewer.md
    security-reviewer.md
  hooks/
    hooks.json
    scripts/
      require-tests.js
  .mcp.json
  references/
    review-rubric.md
```

### 15.3 Ejercicio capstone plugin

El alumno debe entregar:

- Plugin instalado.
- Skill invocable.
- Subagent visible.
- Hook funcionando.
- MCP readonly conectado.
- Rubrica de review.
- Cost report.

## 16. Coste Claude

### 16.1 Conceptos que debe dominar el alumno

- Token consumption.
- Context window.
- Coste por modelo.
- Sonnet para la mayoria de tareas.
- Opus para arquitectura compleja.
- Haiku para subagentes simples.
- MCP overhead.
- `CLAUDE.md` consume contexto.
- Skills cargan bajo demanda.
- `/context` como herramienta de diagnostico.
- `/model` para cambiar modelo.
- Compactacion.
- Multiples instancias/agentes aumentan coste.

### 16.2 Ejercicio obligatorio

`CL-O12 Cost audit`

Entregable:

```md
# Claude Cost Audit

Tarea:
Modelo principal:
Subagentes:
Modelo por subagente:
CLAUDE.md lineas:
Rules cargadas:
MCP activos:
Comandos ejecutados:
Contexto antes/despues:
Uso de compact:
Decision de coste:
Que se puede mover a skill:
Que se puede quitar de CLAUDE.md:
```

### 16.3 Reglas didacticas

1. No meter procedimientos largos en `CLAUDE.md`.
2. Convertir procedimientos repetibles en skills.
3. Usar Haiku/Sonnet para subagentes simples si la tarea lo permite.
4. Reservar Opus para decisiones de alta complejidad.
5. Preferir CLI directa si MCP agrega demasiado overhead.
6. Desactivar MCPs no usados.
7. Usar `/context` al inicio y al final de labs largos.
8. Compactar con instrucciones claras.
9. Evitar multiples agentes si el trabajo no es paralelizable.
10. Registrar coste estimado en capstones.

## 17. Agent SDK

### 17.1 Contenido minimo

- Instalacion TS/Python.
- API key.
- Primer agente.
- Opciones de herramientas.
- Skills.
- MCP.
- Plugins programaticos.
- Diferencia SDK vs CLI.
- Autonomia y seguridad.
- Trazabilidad.
- Evaluacion.

### 17.2 Producto demo

Crear `claude-review-agent`:

```text
claude-review-agent/
  src/
    index.ts
    prompts/
      review.ts
    evals/
      rubric.ts
  skills/
    review-pr/
      SKILL.md
  fixtures/
    good-diff.patch
    risky-diff.patch
  reports/
    sample-review.json
```

Debe:

- Leer un diff.
- Aplicar rubrica.
- Emitir JSON.
- Identificar riesgos.
- Proponer tests.
- Registrar coste estimado.

## 18. Requisitos funcionales Claude

### 18.1 Cursos

- R-CL-001. La plataforma debe tener ruta Claude independiente.
- R-CL-002. La ruta debe comenzar con `CLAUDE.md` y memoria.
- R-CL-003. Cada curso debe incluir ejercicios con archivos reales.
- R-CL-004. Cada curso debe incluir microvideos.
- R-CL-005. Cada curso debe explicar coste/contexto.
- R-CL-006. Cada curso debe tener notas del creador.
- R-CL-007. Cada curso debe diferenciar CLI, hooks, plugins y SDK.
- R-CL-008. Cada curso debe incluir seguridad.
- R-CL-009. Cada modulo debe terminar con artefacto.
- R-CL-010. Cada curso debe tener modo autoconsumo.

### 18.2 Memoria e instrucciones

- R-CL-011. Generar `CLAUDE.md`.
- R-CL-012. Generar `CLAUDE.local.md.example`.
- R-CL-013. Generar `.claude/rules/*.md`.
- R-CL-014. Explicar auto memory.
- R-CL-015. Incluir auditoria de memoria.
- R-CL-016. Incluir limite recomendado de lineas.
- R-CL-017. Detectar reglas vagas.
- R-CL-018. Detectar reglas contradictorias.
- R-CL-019. Sugerir conversion a skill.
- R-CL-020. Crear handoff.

### 18.3 Skills y subagents

- R-CL-021. Generar `.claude/skills/*/SKILL.md`.
- R-CL-022. Generar skills con references.
- R-CL-023. Generar skills con scripts.
- R-CL-024. Generar subagents en `.claude/agents`.
- R-CL-025. Permitir modelo por subagent.
- R-CL-026. Permitir permisos por subagent.
- R-CL-027. Permitir MCPs por subagent.
- R-CL-028. Permitir max turns.
- R-CL-029. Explicar aislamiento.
- R-CL-030. Crear labs de agent teams.

### 18.4 MCP

- R-CL-031. Generar `.mcp.json`.
- R-CL-032. Explicar local/project/user scopes.
- R-CL-033. Explicar precedencia.
- R-CL-034. Explicar env expansion.
- R-CL-035. Incluir MCP readonly docs.
- R-CL-036. Incluir MCP DB mock.
- R-CL-037. Incluir allowlist.
- R-CL-038. Incluir denylist.
- R-CL-039. Incluir audit de MCP overhead.
- R-CL-040. Incluir seguridad stdio.

### 18.5 Hooks y plugins

- R-CL-041. Generar hooks config.
- R-CL-042. Generar scripts de hook.
- R-CL-043. Incluir `PreToolUse` lab.
- R-CL-044. Incluir `PostToolUse` lab.
- R-CL-045. Incluir `Stop` lab.
- R-CL-046. Incluir `SubagentStart` lab.
- R-CL-047. Incluir `SubagentStop` lab.
- R-CL-048. Generar plugin de ejemplo.
- R-CL-049. Plugin debe incluir skill.
- R-CL-050. Plugin debe incluir agent.
- R-CL-051. Plugin debe incluir hook.
- R-CL-052. Plugin debe incluir MCP.

### 18.6 SDK y CI/CD

- R-CL-053. Crear lab Claude Agent SDK TS.
- R-CL-054. Crear lab Claude Agent SDK Python.
- R-CL-055. Crear agente SDK con tools.
- R-CL-056. Crear agente SDK con skills.
- R-CL-057. Crear agente SDK con MCP.
- R-CL-058. Crear eval harness.
- R-CL-059. Crear GitHub Action lab.
- R-CL-060. Crear capstone reviewer interno.

## 19. Requisitos no funcionales

- RNF-CL-001. La ruta debe ser consumible sin formador.
- RNF-CL-002. La ruta debe evitar copiar docs oficiales largas.
- RNF-CL-003. Las plantillas deben estar versionadas.
- RNF-CL-004. Los labs no deben exponer secrets.
- RNF-CL-005. Los MCPs de curso deben ser mock o readonly.
- RNF-CL-006. Hooks de curso deben ser seguros y reversibles.
- RNF-CL-007. Los microvideos deben tener subtitulos.
- RNF-CL-008. Los microvideos deben ser parametrizables por JSON.
- RNF-CL-009. La plataforma debe indicar fecha de revision de docs.
- RNF-CL-010. Debe haber modo proyector.
- RNF-CL-011. Debe haber modo autoconsumo.
- RNF-CL-012. Debe haber checklist de coste.
- RNF-CL-013. Debe haber checklist de memoria.
- RNF-CL-014. Debe haber checklist de seguridad.
- RNF-CL-015. Debe haber comparativa con Codex/Copilot sin mezclar instrucciones.

## 20. Backlog Claude

### 20.1 Prioridad 0

1. Crear ruta CL0/CL1.
2. Crear pack `CLAUDE.md`.
3. Crear 5 microvideos.
4. Crear labs de memoria.
5. Crear labs de skills.
6. Crear labs de subagents.
7. Crear cost audit.
8. Crear assets basicos.
9. Crear metadata de ejercicios.
10. Crear workshop inicial.

### 20.2 Prioridad 1

1. Crear `.mcp.json` labs.
2. Crear hooks labs.
3. Crear plugin demo.
4. Crear GitHub Action demo.
5. Crear 15 microvideos.
6. Crear agent team lab.
7. Crear security gate lab.
8. Crear context dashboard simulado.
9. Crear capstone CL3.
10. Crear guia de tutorias.

### 20.3 Prioridad 2

1. Crear Agent SDK course.
2. Crear TS SDK examples.
3. Crear Python SDK examples.
4. Crear eval harness.
5. Crear reviewer interno.
6. Crear plugin enterprise.
7. Crear MCP enterprise mock.
8. Crear dashboard de coste.
9. Crear benchmark Sonnet/Opus/Haiku.
10. Crear integracion LMS.

## 21. Roadmap Claude

### Fase A - 2 semanas

- CL0 + CL1.
- Pack de memoria.
- 5 ejercicios.
- 3 microvideos.
- Primer workshop.

### Fase B - 4 semanas

- CL2.
- Skills y subagents.
- MCP project.
- Cost audit.
- 10 microvideos.

### Fase C - 6 semanas

- CL3.
- Hooks.
- Plugins.
- GitHub Actions.
- Capstone automation.

### Fase D - 8 semanas

- CL4.
- Agent SDK.
- Eval harness.
- Producto interno demo.
- Governance enterprise.

## 22. Riesgos

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| `CLAUDE.md` demasiado largo | alto | lab de poda y skills |
| Hooks bloquean de mas | medio | modo demo y scripts reversibles |
| MCP stdio inseguro | alto | mock/readonly y warnings |
| Subagentes disparan coste | alto | modelo por subagent y cost audit |
| Alumnos confunden memory con reglas | medio | microvideo especifico |
| Plugins parecen demasiado avanzados | medio | plugin minimo incremental |
| SDK se vuelve curso de API generica | medio | producto demo concreto |
| Docs cambian rapido | alto | fecha y revision mensual |
| Comparacion con Codex confunde | medio | rutas y plantillas separadas |
| Falta de entorno Claude en empresa | alto | demos mock y modo lectura |

## 23. Criterios de exito

- 80% crea `CLAUDE.md` util y corto.
- 60% completa un lab de skill.
- 50% completa un lab de subagent.
- 40% completa un lab MCP project.
- 30% completa un hook.
- 25% crea plugin minimo.
- 20% completa Agent SDK lab.
- Todos los capstones incluyen cost audit.
- Todos los equipos piloto tienen memory policy.
- Las tutorias se centran en arquitectura de workflows, no en setup.

## 24. Decision recomendada

Claude debe lanzarse como ruta avanzada y de especializacion, no como primer curso masivo. La estrategia:

1. Crear CL0/CL1 para que todos entiendan `CLAUDE.md`, memoria y coste.
2. Hacer CL2 como curso fuerte de skills/subagents/MCP.
3. Reservar CL3/CL4 para perfiles avanzados, plataforma interna y equipos que quieran automatizacion seria.
4. Reutilizar CourseScript para microvideos muy visuales de hooks, memoria y subagentes.
5. Mantener plantillas separadas de Codex y Copilot para no mezclar convenciones.

Resultado esperado: Claude se convierte en el curso para equipos que quieren pasar de "usar IA" a "disenar un entorno agentico gobernado".
