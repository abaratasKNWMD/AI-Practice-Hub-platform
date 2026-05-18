# Auditoria certified de contenido vendor y videos

Fecha de auditoria: 2026-05-18  
Repositorio auditado: `AI_PRACTICE_HUB_UPLOAD_V4`  
Rama auditada: `v2`  
Alcance: cursos, videos CourseScript, subtitulos, guiones, materiales y alineacion vendor para Codex/OpenAI, GitHub Copilot/Microsoft y Claude/Anthropic.

## 0. Veredicto ejecutivo

La plataforma es un starting point fuerte para una academia interna de IA aplicada. No debe presentarse todavia como contenido certificado por Microsoft, OpenAI o Anthropic, ni como reproduccion oficial de sus cursos.

El contenido tiene logica pedagogica real: workflow, evidencia, coste, permisos, modelo, revision y practica. Tambien tiene base en documentacion oficial y auditorias previas. Pero el microguion de muchos videos fue generado mediante scripts, no escrito manualmente escena por escena por un instructor senior. Eso se nota en repeticiones estructurales y en frases demasiado genericas.

Veredicto duro:

- **Producto formativo interno v2:** aprobado.
- **Piloto con alumnos reales:** aprobado con observacion.
- **Material "vendor-certified style":** no aprobado aun.
- **Uso comercial como curso oficial de vendor:** no aprobado.
- **Base para llegar a certified-grade:** muy buena.

Score recomendado:

| Dimension | Score | Lectura |
|---|---:|---|
| Cobertura tecnica | 86/100 | Cubre las piezas importantes de cada ecosistema. |
| Fidelidad vendor | 74/100 | Conceptos alineados, pero falta trazabilidad claim -> fuente. |
| Narrativa docente | 78/100 | Hay estructura de clase, pero falta voz humana experta en muchas transiciones. |
| Practicidad | 82/100 | Buenos retos y artefactos, con demos simuladas utiles. |
| Certificabilidad | 58/100 | Falta matriz oficial, revision SME y control de claims. |
| Riesgo de desactualizacion | alto | Los vendors cambian rapido. Necesita freshness gate. |

Score global para academia interna: **80/100**.  
Score global como contenido certified/vendor-grade: **63/100**.

## 1. Como se genero realmente el contenido

Respuesta directa: los subtitulos y guiones no son una grabacion transcrita ni un guion humano escrito linea a linea. Son una mezcla de:

1. Auditorias vendor previas.
2. Materiales locales existentes.
3. Blueprints de video en JSON.
4. Generadores CourseScript.
5. Scripts de expansion de escenas.
6. Remaster narrativo posterior.
7. Export de subtitulos.
8. TTS pre-renderizado.

Archivos clave:

- `public/video-blueprints/*.json`: base de los workshops largos.
- `scripts/build-video-blueprints.mjs`: convierte blueprints en CourseScript y expande escenas en beats.
- `scripts/rebuild-masterclass-videos.mjs`: genera masterclasses de 10 minutos desde listas de topics.
- `scripts/normalize-microvideos.mjs`: normaliza microvideos cortos.
- `scripts/remaster-teacher-narrative.mjs`: anade contrato docente, normaliza pronunciacion y abre cada video con objetivo.
- `scripts/finalize-production-excellence.mjs`: reescribe frases genericas de situacion, tension, accion, evidencia y decision.
- `scripts/editorialize-subtitles.mjs`: parte y exporta subtitulos.
- `scripts/generate-audio-manifests.mjs`: genera manifests y audios.

Conclusion: el contenido esta pensado a nivel macro, pero generado a nivel micro. Hay criterio en la arquitectura del curso; no hay autoria manual completa de cada subtitulo.

## 2. Inventario auditado

| Vendor | Videos | Escenas | Subtitulos | Duracion aprox. |
|---|---:|---:|---:|---:|
| Claude | 15 | 240 | 1739 | 124 min |
| Copilot | 14 | 237 | 1861 | 122 min |
| Codex | 13 | 244 | 1674 | 120 min |
| Hub transversal | 2 | 240 | 1743 | 120 min |
| **Total** | **44** | **961** | **7017** | **486 min** |

Los audios estan generados y enlazados desde `public/audio/courses/**/manifest.json`. Los subtitulos fuente viven dentro de `public/courses/*.json`; los exportados viven en `public/subtitles/courses/*.vtt` y `.srt`.

## 3. Fuentes oficiales contrastadas

### 3.1 OpenAI / Codex

Fuentes revisadas:

- https://developers.openai.com/codex/quickstart
- https://developers.openai.com/codex/concepts/customization
- https://developers.openai.com/api/docs/guides/code-generation#use-codex
- https://developers.openai.com/codex/config-reference

Hechos oficiales relevantes:

- Codex existe como app, extension IDE, CLI y cloud.
- Codex usa `AGENTS.md` como guidance persistente.
- Codex tiene layers de customization: `AGENTS.md`, memories, skills, MCP y subagents.
- MCP conecta Codex con herramientas externas.
- Las skills empaquetan workflows reutilizables.
- Los subagentes sirven para delegar trabajo especializado.
- Codex puede trabajar con tareas cloud y PRs.
- La documentacion actual recomienda modelos GPT-5 family para tareas de coding agent.

### 3.2 GitHub Copilot / Microsoft

Fuentes revisadas:

- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- https://docs.github.com/en/copilot/reference/custom-instructions-support
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/mcp-and-cloud-agent
- https://docs.github.com/en/copilot/concepts/prompting/response-customization
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills

Hechos oficiales relevantes:

- Copilot soporta instrucciones personalizadas por repositorio en `.github/copilot-instructions.md`.
- Copilot soporta instrucciones path-specific en `.github/instructions/**/*.instructions.md`.
- El soporte de `AGENTS.md`, `CLAUDE.md` o `GEMINI.md` depende de entorno y feature.
- Copilot cloud agent puede usar MCP configurado a nivel de repo.
- MCP en Copilot cloud agent esta orientado a tools y tiene limitaciones.
- Skills y custom agents existen en el ecosistema Copilot, pero su disponibilidad depende de feature, plan, CLI/cloud/IDE y estado preview.
- Copilot code review usa instrucciones de repo y path-specific.

### 3.3 Claude / Anthropic

Fuentes revisadas:

- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/slash-commands
- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/sub-agents

Hechos oficiales relevantes:

- `CLAUDE.md` contiene instrucciones y contexto que Claude carga al inicio.
- `.claude/settings.json` configura permisos, entorno, hooks y comportamiento.
- Skills viven en `.claude/skills/<skill-name>/SKILL.md`, `~/.claude/skills`, o plugins.
- Skills se cargan bajo demanda y pueden invocarse con `/skill-name`.
- Hooks existen en eventos de lifecycle y pueden bloquear/permitir acciones.
- MCP conecta herramientas externas y puede exponer tools/prompts.
- Subagents se configuran como markdown con frontmatter y pueden especializar tareas.

## 4. Alineacion por vendor

### 4.1 Codex

Lo que esta bien:

- La ruta ensena Codex como sistema operativo de repo, no como chat.
- Aparecen `AGENTS.md`, modelo, permisos, coste, MCP, skills, subagentes, PR y CI.
- Los workshops Codex tienen escenarios plausibles: bug login, plan readonly, patch minimo, test, review y PR.
- El mensaje de "no avanzar sin evidencia" es correcto y util.

Riesgos:

- No hay una matriz por escena que diga: "esta afirmacion viene de esta pagina oficial".
- Algunas frases como "modelo rapido" o "modelo fuerte" son pedagogicas, pero no estan atadas a un modelo oficial concreto ni a fecha de revision.
- Los flows de swarms/PR swarm son extrapolacion avanzada; deben marcarse como patron de arquitectura, no como feature oficial cerrada.
- Falta diferenciar con claridad Codex app, Codex CLI, IDE extension, cloud task y API/SDK cuando el alumno necesita pasos exactos.

Veredicto Codex:

- **Aprobado como ruta interna avanzada.**
- **No aprobado como curso oficial OpenAI/Codex sin matriz de fuentes y revision SME.**

Score Codex certified readiness: **68/100**.

### 4.2 Copilot

Lo que esta bien:

- La ruta distingue Ask, Edit, Agent, inline suggestions y PR review.
- Se cubren instrucciones de repositorio, prompt files, custom agents, MCP, cloud agent, premium requests y review.
- El flujo de "issue -> Ask -> Edit -> test -> PR review" tiene mucho sentido para adopcion masiva.
- Los ejercicios de Copilot parecen buenos para activar a usuarios que ya conocen VS Code pero no tienen criterio.

Riesgos:

- Copilot es el vendor con mas condiciones por entorno: VS Code, GitHub.com, cloud agent, CLI, planes, policies y previews.
- El curso debe marcar explicitamente cuando una feature depende de plan, organizacion o preview.
- "Skills", "custom agents" y "MCP" no deben explicarse como si estuvieran siempre disponibles igual en todos los entornos.
- Falta una tabla visible de soporte: GitHub.com vs VS Code vs Copilot CLI vs cloud agent.
- Falta una slide de "Copilot no es un unico producto: es una familia de superficies con disponibilidad distinta".

Veredicto Copilot:

- **Aprobado como ruta de activacion interna.**
- **Necesita hardening de disponibilidad/planes antes de venderse como ruta corporativa robusta.**

Score Copilot certified readiness: **66/100**.

### 4.3 Claude

Lo que esta bien:

- La ruta Claude no copia Codex ni Copilot: gira alrededor de memoria, skills, hooks, MCP, subagentes y settings.
- `CLAUDE.md`, `.claude/settings.json`, `.claude/skills`, hooks y MCP estan bien posicionados.
- La idea de separar memoria, skill, subagente, hook y MCP es exactamente la decision formativa correcta.
- La narrativa de Claude tiene mejor identidad que la de Copilot: "convertir criterio repetido en sistema".

Riesgos:

- Algunos materiales locales mencionan piezas que deben validarse con docs actuales antes de impartir, especialmente paths y nomenclatura que cambian.
- Hooks es un tema potente pero peligroso: hay que ensenar eventos, exit codes, JSON output y permisos con mas precision.
- MCP debe explicar diferencias entre tools, resources y prompts segun contexto; no basta con "MCP readonly".
- Falta una practica mas real de `.claude/settings.json` con allow/ask/deny y ejemplo de bloqueo.
- Falta dejar claro que skills cargan contexto y siguen teniendo coste una vez invocadas.

Veredicto Claude:

- **Aprobado como ruta avanzada de ingenieria agentica.**
- **Necesita precision de referencia en hooks/settings/skills para nivel certified.**

Score Claude certified readiness: **70/100**.

## 5. Auditoria de guion y subtitulos

Hallazgo principal: hay una tension entre volumen y autoria.

Lo bueno:

- Todos los videos abren con objetivo docente.
- Los subtitulos ya no tienen problemas graves de pronunciacion como `10m`.
- Hay estructura: situacion, tension, accion, evidencia y decision.
- Hay mucha conciencia de coste, permisos, modelo y evidencia.

Lo flojo:

- Aproximadamente un tercio de los subtitulos largos usan patrones muy similares: "Situacion minuto", "Evidencia minuto", "Decision minuto".
- Esa estructura ayuda a generar consistencia, pero puede sonar mecanica si se ve mucho seguido.
- Los subtitulos no siempre contienen conocimiento vendor especifico; a veces contienen criterio transversal repetido.
- El guion todavia no siempre suena como un profesor senior contando experiencia real, sino como una rubrica bien generada.

Riesgo docente:

El alumno puede entender la regla general, pero no recordar que comandos exactos, ficheros exactos o pantallas exactas debe tocar en el producto real.

## 6. Auditoria de realidad de las demos

Los videos son simulados. Eso es correcto si se etiqueta asi.

No son:

- grabaciones reales de VS Code;
- grabaciones reales de Copilot cloud agent;
- grabaciones reales de Codex cloud;
- grabaciones reales de Claude Code;
- transcripciones de sesiones reales;
- cursos oficiales de los vendors.

Si son:

- demos pedagogicas generadas;
- escenarios plausibles;
- pantallas CourseScript;
- mockups de producto;
- workflows de entrenamiento;
- material de activacion interna.

Riesgo:

Si el alumno cree que esta viendo una reproduccion exacta de la UI vendor, puede frustrarse cuando la pantalla real cambie. Hay que etiquetar cada video como "demo simulada" y cada pantalla como "mock operativo".

## 7. Gaps para certified-grade

Bloqueantes antes de llamar esto "certified style":

1. Matriz claim -> fuente oficial.
2. Revision SME por vendor.
3. Etiquetas de disponibilidad por feature.
4. Fecha de revision oficial por curso y por video.
5. Separacion entre feature oficial, preview, patron recomendado y opinion pedagogica.
6. Capturas reales o mockups validados contra UI actual.
7. Ejercicios ejecutados contra repos reales o starters robustos.
8. Rubricas con soluciones esperadas y diffs comparables.
9. Control de claims sobre modelos, precios, premium requests, planes y permisos.
10. Una pasada humana de guion para quitar mecanica repetitiva.

## 8. Requisitos nuevos que deberian implementarse

### 8.1 Metadata por escena

Cada escena deberia tener:

```json
{
  "claimType": "official | inferred | pedagogical | simulated",
  "vendorSurface": "codex-cli | codex-cloud | vscode-copilot | github-pr-review | claude-code",
  "officialSources": [
    {
      "title": "Codex Customization",
      "url": "https://developers.openai.com/codex/concepts/customization",
      "checkedAt": "2026-05-18"
    }
  ],
  "availability": {
    "plan": "unknown | business | enterprise | pro | all",
    "status": "ga | preview | beta | inferred",
    "environment": ["VS Code", "GitHub.com", "CLI", "Cloud"]
  },
  "certificationRisk": "low | medium | high"
}
```

### 8.2 Glosario canonico

Crear un glosario por vendor:

- Termino oficial.
- Termino usado en el curso.
- Definicion corta.
- Fuente.
- Fecha de revision.
- Riesgo de desactualizacion.

### 8.3 Control de guion

Cada video largo debe tener un guion humano maestro:

- Promesa.
- Caso real.
- Por que importa.
- Pantalla exacta.
- Frase docente.
- Error tipico.
- Ejercicio inmediato.
- Cierre.

Luego el generador puede producir escenas, pero no inventar la intencion.

### 8.4 Etiqueta visible de simulacion

Cada player deberia mostrar:

> Demo simulada. Las pantallas representan un flujo pedagogico. Consulta la documentacion oficial para disponibilidad, planes y UI actual.

### 8.5 Checklist SME

Por cada vendor:

- 1 SME de producto.
- 1 instructor.
- 1 alumno real.
- 1 tech lead.

Cada uno revisa:

- precision;
- utilidad;
- ritmo;
- ausencia de claims falsos;
- ejercicios ejecutables;
- decision "cuando usar / cuando no usar".

## 9. Decision editorial

La pregunta "se han hecho con generador o los has pensado" tiene esta respuesta honesta:

- **Pensados:** la arquitectura, la ruta, los temas, los escenarios principales, la conciencia de coste/permisos/evidencia y la diferenciacion de vendors.
- **Generados:** muchas escenas, beats, subtitulos, frases operativas, transiciones y audios.
- **Remasterizados:** apertura docente, pronunciacion, voz, subtitulos, audio, media breaks y QA.
- **No certificados:** claims por vendor, disponibilidad actual, UI exacta, precios/modelos/planes y validez legal/comercial.

El material no es humo. Tiene criterio. Pero todavia es "generated curriculum with editorial direction", no "vendor-certified curriculum".

## 10. Plan recomendado para llevarlo a 90+ certified-readiness

### Sprint 1 - Source traceability

- Anadir metadata `officialSources` a cada curso y cada video.
- Marcar cada escena como official/inferred/pedagogical/simulated.
- Crear `content-claims.json`.
- Bloquear build si una escena de tipo official no tiene fuente.

### Sprint 2 - SME pass

- Revisar 1 video largo por vendor.
- Revisar 1 masterclass por vendor.
- Revisar 5 microvideos por vendor.
- Corregir claims, nombres, paths y disponibilidad.

### Sprint 3 - Human script pass

- Reescribir manualmente los 8 videos largos.
- Mantener CourseScript como formato, pero no aceptar texto de fabrica.
- Reducir repeticion "Situacion/Evidencia/Decision".
- Incluir anecdotas y errores reales de instructor.

### Sprint 4 - Real UI grounding

- Capturas reales o mockups exactos de:
  - Codex app / CLI / cloud task.
  - VS Code Copilot Ask/Edit/Agent.
  - GitHub PR review / Copilot cloud agent.
  - Claude Code terminal / skills / hooks / MCP.

### Sprint 5 - Certification pack

- Glosario vendor.
- Matriz de soporte por plan/entorno.
- Disclaimer legal.
- Rubrica de evaluacion.
- Examen o badge interno.
- Versionado trimestral.

## 11. Conclusion

El sistema actual es una base potente, pero el contenido no debe venderse como "real oficial" todavia. Es un curso generado con direccion pedagogica, apoyado en fuentes oficiales, con escenarios plausibles y buena arquitectura. Para que sea un starting point serio para Microsoft/GitHub Copilot, OpenAI/Codex y Anthropic/Claude necesita una capa de certificacion editorial: trazabilidad, revision SME, etiquetas de disponibilidad y reescritura humana de los videos principales.

Mi recomendacion: conservar la plataforma, no tirarla. Pero crear una fase `v3-certified-content` cuyo objetivo no sea mas escenas ni mas audio, sino **menos contenido generico y mas verdad verificable por vendor**.

