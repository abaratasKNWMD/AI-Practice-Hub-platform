# Auditoria estado AI Practice Hub v2

Fecha: 2026-05-07  
Base tecnica auditada: `b_cclDMm8Af2f`  
Objetivo: evaluar que tenemos hecho, que falta para convertirlo en plataforma completa de autoconsumo, cuantos videos faltan y como deberia evolucionar el sistema de videos/workshops.

## 1. Resumen ejecutivo

La plataforma ya no es una demo. Tenemos una primera version real de AI Practice Hub con tres rutas activas:

- Codex Practice Hub
- GitHub Copilot Practice
- Claude Code Practice

La base funcional esta bien encaminada:

- Dashboard principal.
- Rutas por vendor.
- Cursos por vendor.
- Ejercicios por vendor.
- Workshops por vendor.
- Materiales enlazados.
- Player CourseScript.
- Microvideos JSON dinamicos.
- Decks HTML de Codex copiados.
- PPTs fuente de Copilot copiados.
- Pack Claude real con `CLAUDE.md`, skills, agents, hooks, MCP, plugin y SDK.

Pero todavia no esta completa como "plataforma de formacion autoconsumible potente". Lo que falta no es solo contenido; falta elevar el video a pieza central, reforzar la navegacion por rutas, crear guiones largos, convertir workshops en experiencias simuladas, y hacer que cada curso tenga una narrativa audiovisual completa.

Mi opinion: lo que tenemos es una v1 muy buena de catalogo + player. La v2 deberia ser "Netflix tecnico de practica IA": rutas muy claras, un video inicial potente de 10 minutos, videos masterclass por ruta/curso, resoluciones guiadas por ejercicio, y workshops de 1 hora simulando prompts, respuestas, errores, diffs, decisiones y cierre.

## 2. Inventario actual real

### 2.1 Totales actuales

| Area | Total |
| --- | ---: |
| Vendors activos | 3 |
| Cursos | 15 |
| Ejercicios | 69 |
| Workshops | 11 |
| Materiales indexados en JSON | 108 |
| Ficheros reales bajo `public/materials` | 288 |
| Microvideos CourseScript | 33 |
| Minutos actuales de microvideo | 50 min aprox |
| Decks HTML Codex | 3 |
| PPTs Copilot | 3 |
| Decks Claude | 0 |

### 2.2 Distribucion por vendor

| Vendor | Cursos | Ejercicios | Workshops | Materiales JSON | Microvideos | Minutos video | Decks enlazados |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Codex | 5 | 20 | 3 | 29 | 10 | 15 min | 3 HTML |
| Copilot | 5 | 23 | 4 | 45 | 11 | 17 min | 3 PPTX |
| Claude | 5 | 26 | 4 | 34 | 12 | 18 min | 0 |

### 2.3 Estado por vendor

#### Codex

Lo que tenemos:

- Ruta `/tracks/codex`.
- Cursos C0-C4.
- C1, C2 y C3 enlazan a decks HTML:
  - `/decks/codex/curso-01/index.html`
  - `/decks/codex/curso-02/index.html`
  - `/decks/codex/curso-03/index.html`
- 20 ejercicios.
- 3 workshops.
- 10 microvideos.
- Materiales y labs de Codex.

Lo que falta:

- Hacer mas visibles los decks HTML desde home y desde la ruta Codex.
- Crear video inicial Codex de 10-15 min explicando "que es Codex como plataforma".
- Crear videos largos C1, C2, C3 y C4, no solo microvideos.
- Crear resoluciones por ejercicio, especialmente de los labs de bug, MCP, subagentes, swarms, RAG y evals.
- Crear workshops simulados con prompt-respuesta-diff-review.
- Mejorar jerarquia visual: C1/C2/C3 actuales son cursos grandes, deberian aparecer como "decks completos" destacados, no enterrados dentro de la ficha.

#### Copilot

Lo que tenemos:

- Ruta `/tracks/copilot`.
- Cursos CP0-CP4.
- 23 ejercicios.
- 4 workshops.
- 11 microvideos.
- 45 materiales.
- Workspace GitHub Copilot copiado.
- 3 PPTX fuente copiados.
- Pack `.github` con instructions, prompt files, custom agents, policy y coste.

Lo que falta:

- Convertir PPTX a experiencia visual navegable o al menos previsualizable.
- Crear videos masterclass por curso.
- Crear resoluciones reales de ejercicios basados en VS Code, Ask/Edit/Agent, instructions, prompts, custom agents, MCP y cloud agent.
- Simular interacciones de Copilot con prompts y respuestas en UI estilo VS Code.
- Crear workshops "retos de 1 hora" con guion completo.
- Crear material de "dudas tipicas" para evitar tutoria reactiva.

#### Claude

Lo que tenemos:

- Ruta `/tracks/claude`.
- Cursos CL0-CL4.
- 26 ejercicios.
- 4 workshops.
- 12 microvideos.
- Pack real de Claude Code:
  - `CLAUDE.md`
  - `CLAUDE.local.md.example`
  - `.claude/settings.json`
  - `.claude/rules/*`
  - `.claude/skills/*`
  - `.claude/agents/*`
  - hooks
  - `.mcp.json`
  - plugin team-review
  - docs governance
  - Agent SDK example

Lo que falta:

- Claude no tiene decks visuales grandes.
- Faltan videos largos de memoria, skills, subagentes, hooks, MCP, plugins y SDK.
- Faltan demos simuladas donde se ve Claude leyendo `CLAUDE.md`, activando una skill, usando un subagente y bloqueando un hook.
- Falta un capstone audiovisual de Agent SDK.
- Falta una capa de "operating model Claude enterprise" con decision go/no-go.

## 3. Diagnostico principal

La plataforma tiene tres capas:

1. Catalogo
2. Materiales
3. Player/video

La capa 1 ya existe. La capa 2 esta bastante avanzada. La capa 3 existe tecnicamente, pero aun no tiene suficiente peso pedagogico.

El usuario final no deberia entrar y ver solo "listas". Deberia entrar y sentir:

- "Tengo una ruta clara."
- "Tengo un video que me aterriza."
- "Tengo ejercicios para practicar."
- "Tengo resolucion cuando me atasco."
- "Tengo workshops que puedo consumir como clase."
- "Tengo materiales reales para copiar a mi repo."

Ahora mismo el hub ya apunta ahi, pero necesita una segunda iteracion centrada en narrativa, video, workshops y simulacion.

## 4. Respuesta corta: cuantos videos faltan

Depende del nivel de ambicion.

### Nivel A - V2 minima potente

Videos nuevos necesarios:

| Tipo | Cantidad | Duracion objetivo | Total aprox |
| --- | ---: | ---: | ---: |
| Video global de plataforma | 1 | 10 min | 10 min |
| Intro por vendor | 3 | 10 min | 30 min |
| Masterclass por curso | 15 | 12 min | 180 min |
| Workshop guiado por workshop | 11 | 45-60 min | 660 min |

Total nuevos: 30 videos  
Total nuevo estimado: 14 h 40 min  
Estado actual: 33 microvideos / 50 min  
Resultado: plataforma muy fuerte para autoconsumo, sin resolver cada ejercicio en video.

### Nivel B - Plataforma completa real

Incluye Nivel A mas resolucion de ejercicios.

| Tipo | Cantidad | Duracion objetivo | Total aprox |
| --- | ---: | ---: | ---: |
| Todo Nivel A | 30 | variable | 14 h 40 min |
| Resolucion por ejercicio | 69 | 4-6 min | 5 h 45 min |

Total nuevos: 99 videos  
Total nuevo estimado: 20 h 25 min  
Resultado: plataforma autoconsumible casi completa, con reduccion fuerte de dudas repetidas.

### Nivel C - Ultra academy

Igual que Nivel B, pero las masterclass por curso pasan de 12 min a 30 min.

| Tipo | Cantidad | Duracion objetivo | Total aprox |
| --- | ---: | ---: | ---: |
| Video global | 1 | 10 min | 10 min |
| Intro por vendor | 3 | 10 min | 30 min |
| Masterclass por curso | 15 | 30 min | 450 min |
| Workshops | 11 | 60 min | 660 min |
| Resoluciones de ejercicio | 69 | 5 min | 345 min |

Total nuevos: 99 videos  
Total nuevo estimado: 24 h 55 min  
Resultado: producto de formacion serio, reusable, vendible internamente y muy escalable.

Mi recomendacion: no empezar por 99 videos. Empezar por 1 video global de 10 min y 3 workshops de 1 hora, uno por vendor. Eso prueba el formato de alto valor antes de multiplicarlo.

## 5. Que hacer primero

### Prioridad 0 - Video global de 10 minutos

Crear:

- `public/courses/hub-00-ai-practice-intro-10m.json`
- Ruta destacada en home.
- CTA: "Ver como usar la plataforma".
- Script completo.
- 12-16 escenas.
- Voz rapida pero entendible.
- Cadencia alta, sin dejar pantalla muerta.

Objetivo del video:

- Explicar por que existe la plataforma.
- Explicar flipping training.
- Separar Codex, Copilot y Claude.
- Mostrar cursos, ejercicios, workshops y materiales.
- Explicar coste, modelos y permisos.
- Enseñar como consumir un reto.
- Cerrar con "elige ruta y completa tu primer ejercicio".

### Prioridad 1 - Diferenciar rutas en home

Ahora la home muestra vendors, pero podria ser mucho mas clara.

Falta:

- Comparador "cuando usar Codex / Copilot / Claude".
- Mapa por rol:
  - Developer junior
  - Developer senior
  - Tech lead
  - QA
  - Platform engineer
  - Manager de adopcion
- CTA directo:
  - "Quiero aprender Codex"
  - "Quiero activar Copilot en VS Code"
  - "Quiero operar Claude Code en repos"
- Bloque "decks Codex completos" con C1/C2/C3 visibles en la home.

### Prioridad 2 - Workshops simulados

Los workshops deberian ser la joya.

No basta con una pagina que lista retos. Deben tener:

- Guion de 1 hora.
- Prompts preparados.
- Respuestas simuladas.
- Diffs o artefactos generados.
- Momento de error.
- Correccion del prompt.
- Revision final.
- Notas para facilitador.
- Checklist de output.

### Prioridad 3 - Video catalog formal

Ahora los videos se deducen desde cursos/ejercicios/workshops. Falta un catalogo central:

- `public/content/videos.json`
- Tipo: intro, route, course, exercise, workshop, capstone.
- Vendor.
- Duracion.
- Escenas.
- Estado: planned, scripted, implemented, reviewed.
- Materiales usados.
- Ejercicios que resuelve.
- Workshop asociado.
- Voz recomendada.
- Velocidad.
- Densidad visual.

## 6. Problemas detectados

### 6.1 Video aun no es plataforma central

Existe player, pero no existe una "estrategia de video".

Falta:

- Catalogo de videos.
- Guiones versionados.
- Estado de produccion.
- Pacing por video.
- Densidad de escenas.
- Voz y velocidad por tipo.
- Revision visual por escena.
- Transcripcion editable.
- Modo presentador.

### 6.2 Microvideos actuales son demasiado cortos para conocimiento profundo

Los 33 microvideos actuales suman 50 min. Son buenos como piezas de apoyo, pero no reemplazan clase.

Uso correcto:

- Introducir conceptos.
- Preparar ejercicios.
- Servir como recordatorio.

Uso insuficiente:

- Sustituir workshops.
- Resolver ejercicios complejos.
- Explicar swarms, SDK, RAG, hooks o cloud agents en profundidad.

### 6.3 Falta experiencia de workshop

Un workshop no deberia ser solo una ficha.

Debe ser una secuencia:

1. Briefing.
2. Prompt inicial.
3. Respuesta simulada.
4. Analisis.
5. Iteracion.
6. Artefacto.
7. Verificacion.
8. Retro.
9. Entrega.

### 6.4 Faltan "resoluciones"

El alumno puede ver briefing, tareas, pistas y solucion, pero falta ver como se resuelve.

Para activar adopcion masiva, la resolucion es clave:

- "Mira como pienso."
- "Mira que prompt mando."
- "Mira que respuesta recibo."
- "Mira que rechazo."
- "Mira que acepto."
- "Mira como valido."

### 6.5 Falta progresion del usuario

No hay:

- Progreso local.
- Estado completado.
- Favoritos.
- Ultimo video visto.
- Ejercicios guardados.
- Checklist por ruta.

Esto no bloquea v2, pero si se quiere plataforma real, sera necesario.

### 6.6 Falta buscador global

Con 69 ejercicios y 108 materiales, empieza a hacer falta:

- Buscar por vendor.
- Buscar por feature: MCP, hooks, Agent, skills, RAG, tests.
- Buscar por dificultad.
- Buscar por modelo/coste.
- Buscar por material.

### 6.7 Falta QA automatizada de contenido

Ya se han usado scripts manuales de validacion, pero falta integrarlo.

Necesario:

- Validar JSON.
- Validar hrefs.
- Validar videos existentes.
- Validar que cada ejercicio tiene solucion.
- Validar que cada workshop tiene al menos un video.
- Validar que no hay materiales no servibles por ser dotfiles.
- Validar build.

## 7. Propuesta de arquitectura de video

### 7.1 Tipos de video

#### Tipo 1 - Global intro

Duracion: 10 min  
Cantidad: 1  
Funcion: explicar plataforma y forma de consumo.

#### Tipo 2 - Route intro

Duracion: 8-12 min  
Cantidad: 3  
Funcion: explicar vendor, mental model y ruta.

#### Tipo 3 - Course masterclass

Duracion: 12-30 min  
Cantidad: 15  
Funcion: sustituir una parte importante de clase.

#### Tipo 4 - Exercise resolution

Duracion: 4-6 min  
Cantidad: 69  
Funcion: resolver dudas sin tutor.

#### Tipo 5 - Workshop simulation

Duracion: 45-60 min  
Cantidad: 11  
Funcion: simular clase practica completa.

#### Tipo 6 - Capstone documentary

Duracion: 20-40 min  
Cantidad recomendada: 3  
Funcion: mostrar un caso extremo por vendor.

### 7.2 Cadencia recomendada

#### Videos de 10 minutos

- 12-16 escenas.
- Escenas de 35-55 segundos.
- Un cambio visual cada 15-25 segundos.
- Subtitulos siempre.
- Voz 1.08x o 1.12x si el TTS lo permite.
- Pausas cortas tras ideas densas.
- Nada de pantallas quietas mas de 20 segundos.

#### Videos de 30 minutos

- 28-40 escenas.
- 4 bloques de 7-8 minutos.
- Cada bloque con recap de 20 segundos.
- Una demo o artefacto cada 4 minutos.
- Resumen intermedio por capitulo.

#### Workshops de 1 hora

- 45-70 escenas.
- Ritmo menos freneticamente visual, pero con hitos claros.
- Cada 8-10 minutos debe ocurrir algo:
  - prompt nuevo
  - respuesta simulada
  - error
  - diff
  - decision
  - test
  - output

### 7.3 Escenas que faltan en CourseScript

El player actual soporta tipos suficientes para microvideos, pero los workshops necesitan escenas nuevas:

| Escena | Para que sirve |
| --- | --- |
| `prompt` | Mostrar prompt enviado al agente |
| `agentResponse` | Simular respuesta de Codex/Copilot/Claude |
| `diffReview` | Mostrar diff y comentarios |
| `terminalRun` | Mostrar test/comando/log |
| `artifact` | Mostrar fichero generado |
| `decision` | Comparar opciones y elegir |
| `checkpoint` | Pausa de workshop con tarea para alumno |
| `rubric` | Evaluar output con criterios |
| `costMeter` | Mostrar coste/modelo/contexto |
| `branchMap` | Mostrar flujo Git/PR |
| `mcpTrace` | Mostrar llamada MCP simulada |
| `voiceNote` | Nota del creador/facilitador |

Sin estas escenas, se puede hacer todo con `concept`, `compare`, `coding` y `finale`, pero quedara menos natural.

## 8. Guion propuesto para el video global de 10 minutos

Slug recomendado: `hub-00-ai-practice-intro-10m`

Duracion: 10 min  
Escenas: 15  
Objetivo: explicar la plataforma y cambiar la mentalidad de "curso" a "sistema de practica".

| Tiempo | Escena | Visual | Voz |
| --- | --- | --- | --- |
| 00:00-00:30 | Title | AI Practice Hub | "Esto no es una biblioteca de slides. Es un sistema para que el equipo practique IA sin depender de una clase semanal." |
| 00:30-01:10 | Problema | Calendario lleno, demanda de cursos | "Si cada semana explicamos Git, prompts y herramientas desde cero, perdemos las horas donde deberiamos resolver casos reales." |
| 01:10-01:50 | Flipping training | Antes vs despues | "Primero consumes material guiado. Cuando vienes a tutoria, no preguntamos que es un fork: debatimos decisiones." |
| 01:50-02:40 | Tres rutas | Codex, Copilot, Claude | "Codex para trabajo agentico profundo. Copilot para activar VS Code y GitHub. Claude para memoria, skills, hooks y extensibilidad." |
| 02:40-03:20 | Cursos | 15 cursos | "Cada ruta tiene cursos autoconsumibles con resultados, notas del creador, materiales y videos." |
| 03:20-04:00 | Ejercicios | 69 ejercicios | "El corazon no son las slides. Son retos concretos con briefing, pistas, solucion, coste y permisos." |
| 04:00-04:50 | Videos | Player CourseScript | "Los videos no son mp4 cerrados. Son escenas programables. Podemos cambiar JSON, voz, subtitulos y pantallas." |
| 04:50-05:40 | Workshops | Prompt-respuesta-diff | "Un workshop debe parecer una clase real: mando prompt, recibo respuesta, detecto problema, itero y valido." |
| 05:40-06:20 | Coste/modelos | Budget meter | "La IA potente sin conciencia de coste se convierte en ruido caro. Cada ejercicio declara modelo, permisos y coste." |
| 06:20-07:10 | Materiales | Packs reales | "Los packs no son decoracion: AGENTS.md, CLAUDE.md, instructions, MCP, hooks, skills y actions se copian a repos reales." |
| 07:10-08:00 | Como consumir | Ruta recomendada | "El alumno empieza por un video, abre un ejercicio, copia material, ejecuta, compara solucion y trae dudas buenas." |
| 08:00-08:50 | Tutoria | De dudas basicas a decisiones | "La tutoria deja de ser soporte reactivo y se convierte en revision de criterio." |
| 08:50-09:25 | Roadmap | Videos largos y workshops | "Ahora la siguiente fase es crear videos potentes y workshops de una hora por vendor." |
| 09:25-10:00 | CTA | Elegir ruta | "Elige ruta, completa el primer reto y llega a la siguiente sesion con algo que revisar." |

## 9. Workshops de 1 hora recomendados

### 9.1 Codex Workshop 1 - Login agent realista

Duracion: 60 min  
Objetivo: que una persona entienda como delegar a Codex una tarea real sin perder control.

Estructura:

1. Briefing de feature login.
2. Prompt inicial malo.
3. Respuesta simulada demasiado amplia.
4. Reescritura con objetivo, contexto, restricciones y done.
5. Plan de Codex.
6. Patch simulado.
7. Test falla.
8. Iteracion.
9. Diff review.
10. Coste/modelo/permisos.
11. Handoff final.

Escenas necesarias:

- prompt
- agentResponse
- coding
- terminalRun
- diffReview
- costMeter
- finale

### 9.2 Copilot Workshop 1 - VS Code Ask/Edit/Agent

Duracion: 60 min  
Objetivo: que el alumno sepa elegir Ask, Edit o Agent.

Estructura:

1. Problema en componente real.
2. Ask para entender.
3. Edit para cambio acotado.
4. Agent para tarea multiarchivo.
5. Comparacion de coste/riesgo.
6. Prompt files.
7. Instructions.
8. Review final.

Escenas necesarias:

- VS Code visual.
- prompt.
- inline diff.
- terminal.
- review.

### 9.3 Claude Workshop 1 - Memory to Skills

Duracion: 60 min  
Objetivo: convertir conocimiento de equipo en `CLAUDE.md`, rules, skill y subagente.

Estructura:

1. Repo sin memoria.
2. Claude pregunta demasiado.
3. Crear `CLAUDE.md`.
4. Separar rules.
5. Crear skill `summarize-changes`.
6. Crear subagente explorer.
7. Simular hook que bloquea secreto.
8. Medir contexto/coste.
9. Handoff final.

Escenas necesarias:

- memory editor.
- prompt.
- agentResponse.
- file tree.
- hook event.
- costMeter.

## 10. Scripts de workshop

Cada workshop deberia tener tres artefactos:

1. `workshop.json`
2. `script.md`
3. `assets/`

### 10.1 `workshop.json`

Debe incluir:

- id
- vendor
- title
- duration
- targetAudience
- prerequisites
- outcomes
- scenes
- prompts
- simulatedResponses
- artifacts
- checkpoints
- facilitatorNotes
- costPolicy

### 10.2 `script.md`

Debe incluir:

- Voz literal.
- Que se muestra en pantalla.
- Que hace el profesor.
- Que hace el alumno.
- Donde pausar.
- Que error se fuerza.
- Que respuesta simulada aparece.
- Criterio de exito.

### 10.3 `assets/`

Debe incluir:

- Capturas o mockups.
- Ficheros de codigo.
- Prompts.
- Diffs.
- Logs.
- Resultados de tests.
- Imagenes de reflexion o humor tecnico.

## 11. Pantallas que faltan en la app

### 11.1 Pagina `/videos`

Catalogo de todos los videos:

- Filtrar por vendor.
- Filtrar por tipo.
- Filtrar por duracion.
- Filtrar por estado.
- Ver guion.
- Ver player.
- Ver materiales asociados.

### 11.2 Pagina `/workshops`

Catalogo global de workshops:

- 1 hora.
- 2 horas.
- Autoconsumo.
- Tutoria.
- Capstone.

### 11.3 Pagina `/compare`

Comparador Codex vs Copilot vs Claude:

- Superficie.
- Mejor uso.
- Coste.
- Riesgo.
- Tipo de ejercicio.
- Ruta recomendada.

### 11.4 Pagina `/materials`

Buscador global de materiales:

- AGENTS.md
- CLAUDE.md
- copilot-instructions
- MCP
- hooks
- skills
- prompts
- GitHub Actions
- SDK

### 11.5 Pagina `/progress`

Progreso local:

- Videos vistos.
- Ejercicios completados.
- Workshops empezados.
- Rutas recomendadas.

Puede empezar con `localStorage`, sin login.

## 12. Mejoras necesarias en la home

La home deberia tener estas secciones:

1. Hero con video global de 10 min.
2. Tres rutas diferenciadas.
3. "Que ruta elijo?"
4. Decks Codex destacados.
5. Videos destacados.
6. Workshops de 1 hora.
7. Ejercicios por nivel.
8. Materiales copiables.
9. Gobierno de coste/modelo/permisos.

Especialmente importante:

- Mostrar los cursos HTML de Codex C1/C2/C3 directamente.
- No hacer que el usuario tenga que entrar en Codex, luego curso, luego deck.
- Ponerlos como "Cursos visuales completos".

## 13. Requisitos tecnicos nuevos

### 13.1 Schema de video

Crear `lib/video-schema.ts`.

Campos:

- id
- title
- vendor
- type
- durationMs
- status
- courseIds
- exerciseIds
- workshopIds
- scriptPath
- courseJsonPath
- thumbnail
- voice
- pacing
- density
- sceneCount
- reviewStatus

### 13.2 Content file

Crear:

- `public/content/videos.json`

### 13.3 Scripts

Crear:

- `public/scripts/hub/*.md`
- `public/scripts/codex/*.md`
- `public/scripts/copilot/*.md`
- `public/scripts/claude/*.md`
- `public/scripts/workshops/*.md`

### 13.4 Workshop engine

Crear:

- `public/content/workshop-runs/*.json`
- Pagina `/workshops/[id]/run`
- Componente `WorkshopRunPlayer`

Debe poder mostrar:

- Prompt enviado.
- Respuesta simulada.
- Artefacto generado.
- Decision del facilitador.
- Checkpoint.
- Coste.
- Output.

### 13.5 Scene components nuevas

Crear componentes:

- `prompt-scene.tsx`
- `agent-response-scene.tsx`
- `diff-review-scene.tsx`
- `terminal-run-scene.tsx`
- `artifact-scene.tsx`
- `checkpoint-scene.tsx`
- `cost-meter-scene.tsx`
- `rubric-scene.tsx`

### 13.6 Validacion automatizada

Crear script:

- `scripts/validate-content.mjs`

Debe validar:

- Todos los JSON parsean.
- Todos los IDs referenciados existen.
- Todos los hrefs locales sirven.
- Todos los videos tienen fichero.
- Todos los scripts referenciados existen.
- Todos los workshops tienen runbook.

### 13.7 QA visual

Crear smoke visual con Playwright o agente navegador:

- `/`
- `/tracks/codex`
- `/tracks/copilot`
- `/tracks/claude`
- `/player/hub-00-ai-practice-intro-10m`
- un workshop run
- un ejercicio con material

## 14. Requisitos de contenido por curso

Cada curso deberia tener:

- Video masterclass.
- Deck o experiencia visual.
- 3-8 ejercicios.
- Resolucion de al menos los ejercicios principales.
- Materiales copiables.
- Notas del creador.
- Prompt pack.
- Rubrica.
- Coste recomendado.
- Modelo recomendado.
- Workshop asociado si aplica.

Estado actual:

- Cursos existen.
- Ejercicios existen.
- Materiales existen.
- Notas del creador existen en paginas.
- Microvideos existen.
- Falta masterclass por curso.
- Falta resolucion video por ejercicio.
- Falta rubric sistematica por curso.
- Falta guion formal por video.

## 15. Requisitos de contenido por ejercicio

Cada ejercicio deberia tener:

- Briefing.
- Tareas.
- Pistas.
- Solucion.
- Material base.
- Video de resolucion.
- Prompt inicial.
- Prompt mejorado.
- Respuesta simulada.
- Artefacto esperado.
- Validacion.
- Coste/modelo/permisos.
- Errores tipicos.

Estado actual:

- Briefing: si.
- Tareas: si.
- Pistas: si.
- Solucion: si.
- Material base: si.
- Video: parcial, conceptual.
- Prompt inicial: no sistematico.
- Prompt mejorado: no sistematico.
- Respuesta simulada: falta.
- Artefacto esperado: parcial.
- Validacion: parcial.
- Errores tipicos: falta.

## 16. Requisitos de contenido por workshop

Cada workshop deberia tener:

- Duracion.
- Audiencia.
- Retos.
- Videos.
- Notas de facilitador.
- Outputs.
- Guion literal.
- Runbook minuto a minuto.
- Prompts.
- Respuestas simuladas.
- Assets.
- Modo alumno.
- Modo profesor.
- Checklist de cierre.

Estado actual:

- Duracion: si.
- Audiencia: si.
- Retos: si.
- Videos: si, pero cortos.
- Notas: si.
- Outputs: si.
- Guion literal: falta.
- Runbook: falta.
- Prompts y respuestas: falta.
- Modo alumno/profesor: falta.
- Checklist de cierre: parcial.

## 17. Decision sobre videos largos

Si hacemos videos de 30 minutos para todo, el coste de produccion sube mucho. Pero hay un punto intermedio muy bueno:

- Video global de 10 min.
- Route intro de 10 min por vendor.
- Course masterclass de 12 min por curso.
- Workshop de 60 min por ruta clave.
- Resoluciones de 5 min solo para ejercicios clave al principio.

Primera tanda recomendada:

| Prioridad | Video | Duracion |
| --- | --- | ---: |
| 1 | hub-00-ai-practice-intro-10m | 10 min |
| 2 | codex-workshop-login-agent-60m | 60 min |
| 3 | copilot-workshop-ask-edit-agent-60m | 60 min |
| 4 | claude-workshop-memory-skills-60m | 60 min |
| 5 | codex-route-intro-10m | 10 min |
| 6 | copilot-route-intro-10m | 10 min |
| 7 | claude-route-intro-10m | 10 min |

Con esos 7 videos, la plataforma cambiaria de sensacion inmediatamente.

## 18. Mi recomendacion de roadmap

### Sprint 1 - Video central

Objetivo:

- Crear `videos.json`.
- Crear script del video global.
- Crear CourseScript JSON de 10 min.
- Añadir hero en home.
- Añadir pagina `/videos`.

Entrega:

- 1 video de 10 min.
- 1 catalogo de videos.
- 1 sistema de estado de produccion.

### Sprint 2 - Workshop engine

Objetivo:

- Crear schema de workshop run.
- Crear componentes prompt/respuesta/diff/terminal.
- Crear primer workshop Codex de 1 hora.

Entrega:

- `codex-workshop-login-agent-60m`.
- Pagina run.
- Prompt + respuesta + diff + test + cierre.

### Sprint 3 - Rutas mas claras

Objetivo:

- Home con comparador.
- Decks Codex visibles.
- Videos destacados.
- Workshops destacados.

Entrega:

- Home mucho mas accionable.
- Ruta Codex con "Cursos HTML completos" destacados.

### Sprint 4 - Primer pack de resoluciones

Objetivo:

- 3 resoluciones por vendor.
- 9 videos de 5 min.

Entrega:

- Codex: prompt 4 piezas, AGENTS.md, bug login.
- Copilot: Ask/Edit/Agent, instructions, prompt files.
- Claude: CLAUDE.md, first skill, hooks.

### Sprint 5 - Escalar

Objetivo:

- Completar masterclass de los 15 cursos.
- Completar workshops de 1 hora.
- Completar resoluciones segun demanda.

## 19. Conclusion

Tenemos una base muy buena. Lo que falta para que sea "la plataforma" no es rehacerlo: es subir la capa audiovisual y experiencial.

La decision clave:

- No convertir esto en una web de listas.
- Convertirlo en una plataforma de practica con video como eje.

El primer movimiento deberia ser un video global de 10 minutos. Despues, un workshop Codex de 1 hora con prompts y respuestas simuladas. Ese workshop va a definir el patron para todos los demas.

Conteo final:

- Ahora hay 33 microvideos.
- Para una v2 minima potente faltan 30 videos/scripts nuevos.
- Para una plataforma completa real faltan 99 videos/scripts nuevos.
- Para una ultra academy con masterclasses de 30 min faltan tambien 99 piezas, pero con casi 25 horas nuevas de contenido.

La mejor jugada es crear primero 7 videos de alto impacto:

1. Intro global 10 min.
2. Workshop Codex 60 min.
3. Workshop Copilot 60 min.
4. Workshop Claude 60 min.
5. Intro ruta Codex 10 min.
6. Intro ruta Copilot 10 min.
7. Intro ruta Claude 10 min.

Con eso el hub dejaria de sentirse como un catalogo y empezaria a sentirse como una academia viva.
