# Feedback loops

Objetivo: convertir demanda reactiva en backlog reutilizable.

## Fuentes

- Dudas de tutoria.
- Preguntas repetidas en workshops.
- Fallos de ejercicios.
- Confusion sobre coste/modelos/permisos.
- Feedback visual de decks o videos.
- Feedback post-ejercicio desde la ficha del reto.
- Feedback post-workshop desde la ficha de la sesion.

## Clasificacion

| Tipo de duda | Destino |
| --- | --- |
| Setup o concepto basico | Material autoconsumible |
| Paso visual dificil | Microvideo |
| Practica repetible | Ejercicio |
| Decision de equipo | Workshop |
| Caso real ambiguo | Tutoria |

## Flujo semanal

1. Recoger dudas con vendor, curso, ejercicio y minuto del video.
2. Agrupar dudas repetidas.
3. Decidir destino del contenido.
4. Crear issue de contenido.
5. Publicar cambio en siguiente version.
6. Medir si la duda baja en tutorias.

## Captura en la plataforma

- Los ejercicios guardan feedback local en `ai-practice-hub.feedback.v1`.
- Los workshops guardan feedback local en el mismo registro.
- Cada envio crea tambien un evento `feedback_submitted` en `ai-practice-hub.usage-events.v1`.
- El panel de instructor debe revisar estos registros al cierre de cada cohorte y convertirlos en issues de contenido.

## Campos recomendados

```json
{
  "date": "2026-05-08",
  "vendor": "codex",
  "source": "tutoria",
  "courseOrWorkshop": "cx-workshop-60m-first-task-to-pr",
  "question": "Cuando subo modelo?",
  "classification": "microvideo",
  "action": "crear escena comparativa de modelo/coste",
  "owner": "AI Practice Hub"
}
```
