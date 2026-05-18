# Produccion final 2000 - direccion de voz y review humana

Fecha: 2026-05-18T16:34:39.916Z

## Aplicado

- Version de audio: `audio-prod-v2-2026-05-18`.
- Cursos procesados: 44.
- Escenas con perfil de produccion: 961.
- Subtitulos finales: 7017.
- Entradas MP3 finales: 7017.
- Audios faltantes: 0.
- Desbordes audio/subtitulo: 0.
- Subtitulos largos: 0.
- Repeticiones exactas de fabrica: 0.
- Media breaks en video: 107.
- Assets reales de deck dentro de video: 73.
- Auditoria de excelencia: 1992/2000.
- Perfiles de voz activos: 8.
- Voces reales activas: 1.
- Voz de produccion: `es-ES-AlvaroNeural`.
- Voces fuera de Espana: 0.
- Abreviaturas tipo `10m` en texto narrativo: 0.
- Puntos suspensivos/cortes: 0.
- Auditoria narrativa docente: 100/100.

## Voces

- Todos los perfiles usan `es-ES-AlvaroNeural`.
- Se mantiene variacion por rate/energia/enfasis, pero no por acento.
- La decision es intencionada: priorizar claridad y espanol de Espana frente a variedad de voces.

## Review humana

Queda preparado el protocolo para alumnos reales. No se marca como ejecutado porque requiere personas reales fuera del repositorio.

Este es el unico descuento mantenido en la auditoria 2000: no se inventa feedback humano. El protocolo queda listo para ejecutar con 9 personas, tres roles y tres vendors.

## QA final

- `audio:qa`: pass=true, 7017 subtitulos, 7017 audios, 0 missing, 0 overflow.
- `qa:player`: pass, 8 videos largos.
- `release:smoke`: pass, 41 checks.
- `qa:visual`: pass, 10 screenshots.
- `audit-videos-100`: pass, 44 videos, 961 escenas, 0 visual issues.
- `audit:narrative`: pass, 44 videos, score docente 100/100.
- `build`: pass.
- `lint`: pass con 3 warnings heredados.

Archivos:

- `public/content/operations/audio-production-routing.json`
- `public/content/operations/audio-packaging-policy.json`
- `public/content/operations/human-review-sample-plan.json`
- `public/audio/courses/audio-release-manifest.json`
