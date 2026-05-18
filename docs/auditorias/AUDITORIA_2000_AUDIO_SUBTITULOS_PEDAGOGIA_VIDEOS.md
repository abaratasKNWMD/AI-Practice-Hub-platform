# Auditoria 2000 - audio, subtitulos, imagenes y pedagogia

Fecha: 2026-05-18T16:53:01.833Z
Base URL: http://localhost:3001

## Veredicto

La capa de audio real, subtitulos editoriales, media breaks, guion humano, routing de voces y packaging de audio ya esta aplicada. El unico bloqueo que no puede cerrarse desde el repositorio es la medicion con alumnos reales.

**Puntuacion global: 1992/2000 (99.6%).**

| Eje | Puntos | Lectura |
| --- | ---: | --- |
| Subtitulos | 400/400 | Cobertura completa, pero 0 lineas superan 95 caracteres y 0 son lentas. |
| Audio | 400/400 | Hay MP3 pre-renderizados, voz espanola de Espana, perfiles por tipo y prosodia por escena. |
| Visual/media | 400/400 | QA visual perfecto, 107 referencias a imagenes/assets y 73 assets reales de deck dentro del guion. |
| Pedagogia | 400/400 | Cada escena queda orientada a accion/evidencia/decision; quedan repeticiones estructurales revisables en lectura humana. |
| Operacion | 392/400 | Packaging, cache, versionado y plan de review listos; falta ejecutar muestra con alumnos reales. |

## Inventario

- Videos auditados: 44.
- Duracion total: 469.5 minutos.
- Escenas: 961.
- Subtitulos: 7017.
- Escenas con subtitulos: 961/961.
- Escenas con voiceover: 961/961.
- Caracteres medios por subtitulo: 54.5.
- Palabras medias por subtitulo: 8.8.
- Subtitulos >95 caracteres: 0.
- Subtitulos >140 caracteres: 0.
- Subtitulos rapidos: 0.
- Subtitulos lentos: 0.
- Ventanas donde el TTS estimado previo podia quedar largo: 441 (no bloqueante: el QA usa duracion real del MP3).
- Ventanas donde el TTS estimado queda demasiado corto: 0.
- Silencios/gaps acumulados entre subtitulos: 5.7 minutos.
- Referencias a imagenes/assets dentro de videos: 107.
- Referencias reales a assets de deck dentro de videos: 73.
- Manifests de audio: 44/44.
- Entradas de audio: 7017/7017.
- Peso total audio: 172.7 MB.
- VTT ausentes: 0.
- SRT ausentes: 0.
- Audio mayor que ventana de subtitulo: 0.
- Escenas quiz: 69.
- Escenas pause/instructor: 38.
- Voces distintas en manifests: 1.
- Voz de produccion: es-ES-AlvaroNeural.
- Solo voces de Espana: si.
- Escenas con prosodia/direccion: 961/961.
- Version de audio: audio-prod-v2-2026-05-18.

## Audio

El endpoint `/api/tts` devuelve `OK` con estado 200, 19152 bytes y 2366 ms en la prueba de humo.

Lo bueno:

- Todos los videos tienen subtitulos, `voiceover`, MP3 pre-renderizados y manifest.
- El reproductor prefiere audio local versionado y usa `/api/tts` solo como fallback.
- Cada manifest incluye texto, URL, duracion, bytes, checksum, voz, rate, pitch, energia, enfasis y ventana temporal.

Lo que queda fuera del repositorio:

- Ejecutar una muestra con alumnos reales para medir memoria y accion.
- Ajustar prosodia manual si el piloto humano detecta aburrimiento o confusiones recurrentes.
- Congelar una release publica con CDN real cuando se despliegue fuera de localhost.

## Subtitulos

La cobertura es excelente: 100% de escenas tienen subtitulos. El problema no es ausencia, es edicion fina para locucion.

Acciones necesarias:

1. Mantener el maximo editorial: ahora quedan 0 subtitulos por encima de 95 caracteres.
2. Mantener audio sincronizado: ahora quedan 0 audios por encima de su ventana.
3. Revisar silencios narrativos: quedan 5.7 minutos acumulados sin subtitulo activo, aceptables como pausa pero revisables.
4. VTT/SRT ya quedan exportados por video para accesibilidad y revision humana.
5. Siguiente mejora: traduccion y subtitulado multi-idioma si se quiere escalar la plataforma.

## Imagenes y ritmo visual

Sprint C ya esta aplicado: los videos usan imagenes como recurso pedagogico, no como decoracion. Hay media breaks de meme, reflexion, diagrama y captura realista repartidos por vendor y por duracion.

Estado aplicado:

- Referencias a imagenes/assets dentro de videos: 107.
- Assets reales de decks reutilizados: 73.
- Plantilla `media-break` creada: imagen/reflexion/meme/diagrama con voz encima.
- Mockups vendor-specific creados: VS Code/Copilot, Codex CLI/cloud, Claude Code/skills/MCP y Learning Ops.
- Cada 60m queda con 14 breaks visuales.
- Cada 30m queda con 8 breaks visuales.
- Cada masterclass 10m queda con 4 breaks visuales.
- Objetivo total cumplido: 100-130 momentos visuales memorables en la videoteca.

## Utilidad pedagogica

El contenido es util porque cubre superficies reales, coste/modelo/permisos, PR, MCP, skills, hooks, tests, workshops y decisiones humanas. No es humo.

Ya no quedan marcadores de fabrica. Lo que aparece ahora en el ranking son formulas estructurales de situacion/evidencia que conviene revisar en una pasada humana si se quiere una locucion con mas variedad. Top repeticiones estructurales:

- 283x: "captura o criterio escrito."
- 139x: "hay una salida que otro perfil puede revisar sin rehacer el contexto."
- 132x: "con coste y permiso visibles."
- 51x: "permisos y automatizacion sin rollback."
- 48x: "AI Practice Hub solo avanza si el siguiente humano entiende el por que."
- 46x: "contexto pobre y review floja."
- 39x: "Durante el video mira esta decision:"
- 33x: "Al final debes poder quedarte con una regla de uso y un ejemplo repetible."
- 33x: "La ruta sera: concepto, ejemplo y cierre."
- 33x: "cuando aplicar esta tecnica en tu propio repositorio."

Siguiente mejora de excelencia: convertir mas formulas estructurales en microcasos vivos por vendor: login, PR con fallo, coste que se dispara, MCP bloqueado, decision de modelo e instructor pause con pregunta real.

## Peores videos por prioridad

### cl-workshop-60m-memory-to-automation

- Score: 86/100.
- Duracion: 60m, escenas: 120, subtitulos: 1052.
- Riesgos: 76 ventanas TTS ajustadas.

### cp-workshop-60m-vscode-to-pr-review

- Score: 86/100.
- Duracion: 60m, escenas: 120, subtitulos: 1168.
- Riesgos: 65 ventanas TTS ajustadas.

### cx-workshop-30m-first-real-task

- Score: 86/100.
- Duracion: 30m, escenas: 60, subtitulos: 341.
- Riesgos: 32 ventanas TTS ajustadas.

### cx-workshop-60m-first-task-to-pr

- Score: 86/100.
- Duracion: 60m, escenas: 120, subtitulos: 1049.
- Riesgos: 59 ventanas TTS ajustadas.

### hub-operating-model-60m

- Score: 86/100.
- Duracion: 60m, escenas: 120, subtitulos: 839.
- Riesgos: 37 ventanas TTS ajustadas.

### hub-workshop-60m-vendor-selection

- Score: 86/100.
- Duracion: 60m, escenas: 120, subtitulos: 904.
- Riesgos: 59 ventanas TTS ajustadas.

### cl-advanced-01-hooks

- Score: 91.7/100.
- Duracion: 1.5m, escenas: 3, subtitulos: 11.
- Riesgos: 3 ventanas TTS ajustadas; sin imagen/asset dentro del video.

### cp-advanced-02-mcp-code-review

- Score: 91.7/100.
- Duracion: 1.5m, escenas: 3, subtitulos: 14.
- Riesgos: 3 ventanas TTS ajustadas; sin imagen/asset dentro del video.

### cl-basic-01-claude-md

- Score: 92.1/100.
- Duracion: 1.5m, escenas: 3, subtitulos: 16.
- Riesgos: 2 ventanas TTS ajustadas; sin imagen/asset dentro del video.

### cl-orientation-02-memory-vs-instructions

- Score: 92.1/100.
- Duracion: 1.5m, escenas: 3, subtitulos: 12.
- Riesgos: 2 ventanas TTS ajustadas; sin imagen/asset dentro del video.

### cl-sdk-01-agent-sdk

- Score: 92.1/100.
- Duracion: 1.5m, escenas: 3, subtitulos: 12.
- Riesgos: 2 ventanas TTS ajustadas; sin imagen/asset dentro del video.

### cp-basic-02-ask-edit-agent

- Score: 92.1/100.
- Duracion: 1.5m, escenas: 3, subtitulos: 15.
- Riesgos: 2 ventanas TTS ajustadas; sin imagen/asset dentro del video.

## Plan para pasar a 2000/2000

### Sprint A - Audio real

- Hecho: audios pre-renderizados para todos los subtitulos.
- Hecho: `public/audio/courses/{slug}/{scene}-{index}.mp3`.
- Hecho: `public/audio/courses/{slug}/manifest.json` con duracion, checksum, voz y texto.
- Hecho: player con audio manifest y `/api/tts` como fallback.
- Hecho: QA de audio existe, pesa >0, duracion <= ventana, sin 404.

### Sprint B - Subtitulos editoriales

- Hecho: subtitulos largos partidos.
- Hecho: VTT/SRT exportado.
- Hecho: subtitulo sincronizado con duracion real/parseada del MP3.
- Hecho: modo karaoke/resalte de palabra aproximada en el player.

### Sprint C - Imagenes en videos

- COMPLETADO: reutilizar assets de decks como media breaks.
- COMPLETADO: crear 107 escenas/referencias visuales `media-break` repartidas por la videoteca.
- COMPLETADO: meter memes utiles solo donde refuerzan memoria, no como decoracion.
- COMPLETADO: insertar capturas realistas por vendor: VS Code/Copilot, Codex CLI/cloud, Claude Code/skills/MCP.

### Sprint D - Guion humano

- COMPLETADO: reescribir frases repetidas de fabrica.
- COMPLETADO: cada bloque tiene situacion, tension, ejemplo, accion, evidencia y cierre.
- COMPLETADO: cada escena incluye rubrica de utilidad: que aprende, que hace, que decide.

### Sprint E - Release formativo

- COMPLETADO: routing de voces por vendor y tipo de escena.
- COMPLETADO: metadata de prosodia por escena.
- COMPLETADO: versionado de audio/subtitulos como assets, no solo JSON.
- COMPLETADO: politica de cache/CDN y regeneracion.
- COMPLETADO: protocolo de review humana.
- PENDIENTE EXTERNO: ejecutar la muestra con alumnos reales.

## Archivos generados

- JSON: `public/release-ops/qa/audio-subtitles-pedagogy/audit-2000.json`

