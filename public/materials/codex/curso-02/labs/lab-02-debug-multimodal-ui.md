# Lab 02: debug multimodal de UI

## Objetivo

Usar una captura o mockup como contexto visual sin convertirla en gasto inútil.

## Material

- `../prompts-potentes.md`
- `../ejemplos/ui-debug/`

## Pasos

1. Abre `../ejemplos/ui-debug/index.html`.
2. Observa que hay un problema visual deliberado en móvil: la barra de acciones puede tapar contenido.
3. Pide a Codex que use captura + rutas relevantes.
4. Pide cambio mínimo en CSS.
5. Verifica con captura o inspección.

## Prompt mínimo

```text
Objetivo: corregir el layout móvil de ejemplos/ui-debug.

Contexto:
- Captura actual: <adjunta o describe>.
- Revisa index.html y styles.css.
- El problema es que las acciones fijas pueden tapar el panel de contenido.

Restricciones:
- No cambies el contenido.
- No rehagas todo el diseño.

Done when:
- El contenido queda accesible en móvil.
- Hay explicación de causa y captura/verificación.
```
