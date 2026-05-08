# Metricas de uso

Objetivo: saber si la plataforma reduce horas de explicacion repetida y aumenta practica real.

## Eventos minimos

| Evento | Descripcion |
| --- | --- |
| `video_start` | Alumno abre un video o workshop simulado. |
| `video_complete` | Alumno llega al final o marca completado. |
| `exercise_open` | Alumno abre un ejercicio. |
| `exercise_complete` | Alumno entrega evidencia. |
| `workshop_pack_open` | Instructor abre pack. |
| `feedback_submitted` | Alumno o instructor registra duda. |
| `exercise_pack_open` | Alumno abre materiales autoconsumibles del reto. |
| `self_assessment_open` | Alumno abre autoevaluacion. |
| `instructor_mode_open` | Instructor abre guia de revision o bloqueo. |
| `self_assessment_complete` | Alumno completa autoevaluacion. |
| `instructor_review_saved` | Instructor guarda revision o bloqueo. |
| `tutoring_question_created` | Duda que llega a tutoria. |

## Metricas de adopcion

- Ratio videos vistos / alumnos.
- Ratio ejercicios completados / alumnos.
- Dudas repetidas por semana.
- Tiempo de tutoria dedicado a setup.
- Coste estimado por ejercicio.
- PRs asistidos con evidencia.

## Metricas de calidad

- Porcentaje de ejercicios con test.
- Porcentaje de workshops con output revisable.
- Incidencias visuales por deck.
- Rutas con 404 en smoke test.
- Feedback resuelto por sprint.
- Packs abiertos por ejercicio y vendor.
- Tiempo entre ejercicio abierto y feedback enviado.

## Interpretacion

- Si suben videos y bajan dudas de setup, el flipping training funciona.
- Si suben videos pero no ejercicios, falta activacion practica.
- Si suben ejercicios pero no outputs revisables, falta rubrica.
- Si suben dudas avanzadas, la tutoria esta trabajando donde debe.
