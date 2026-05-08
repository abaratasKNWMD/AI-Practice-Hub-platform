# VideoBlueprint v2 - beats operativos

VideoBlueprint v2 permite editar videos largos desde JSON sin escribir 48 escenas manuales.

## Objetivo

- 30 minutos: 24 escenas generadas.
- 60 minutos: 48 escenas generadas.
- Cada escena larga puede dividirse en beats.
- Si un blueprint antiguo no declara beats, el generador crea beats automaticos.

## Campos soportados

Cada escena puede declarar:

```json
{
  "id": "plan-before-patch",
  "name": "Plan antes del patch",
  "kind": "thinking",
  "durationSec": 300,
  "screen": {
    "title": "Plan de 5 lineas",
    "content": {
      "plan": ["confirmar contrato", "agregar test", "patch minimo"]
    }
  },
  "voiceover": ["Narracion principal"],
  "action": {
    "type": "human-decision",
    "label": "Validar plan",
    "detail": "El instructor pide al alumno aceptar o recortar alcance."
  },
  "beats": [
    {
      "id": "prompt",
      "label": "Prompt typed",
      "kind": "prompt",
      "durationSec": 75,
      "voiceover": ["Escribimos el prompt con objetivo, contexto, restricciones y done when."]
    },
    {
      "id": "response",
      "label": "Respuesta simulada",
      "kind": "streaming",
      "durationSec": 75
    },
    {
      "id": "decision",
      "label": "Decision humana",
      "kind": "decision",
      "durationSec": 75
    },
    {
      "id": "cost",
      "label": "Coste y permisos",
      "kind": "cost",
      "durationSec": 75
    }
  ]
}
```

## Pantallas operativas

El player soporta:

- `prompt`: prompt escrito.
- `streaming`: respuesta simulada por chunks.
- `diff`: diff viewer.
- `terminal`: salida de comandos.
- `pr-review`: revision de PR.
- `cost`: coste, modelo, tokens y permiso.
- `decision`: decision humana.
- `pause`: pausa de instructor.
- `quiz`: checkpoint.
- `branch`: timeline issue-branch-PR.
- `risk`: riesgos y permisos.

## Generacion automatica

Si el blueprint no declara beats:

- Videos de 60m: cada escena se divide en 4 beats.
- Workshops de 30m: cada escena se divide en 2 beats.
- Masterclasses y microvideos no se expanden automaticamente.

Esto permite que los 60m pasen de 12 a 48 escenas y los 30m de 12 a 24 escenas sin reescribir todo.

## Criterio de calidad

Un video largo premium debe tener:

- 36-48 escenas para 60m.
- 18-24 escenas para 30m.
- Prompts y respuestas simuladas.
- Diff, terminal o PR review cuando haya practica.
- Coste/modelo/permisos al menos una vez por bloque.
- Pausas de instructor y checkpoints.
- Cierre con entregable y rubrica.
