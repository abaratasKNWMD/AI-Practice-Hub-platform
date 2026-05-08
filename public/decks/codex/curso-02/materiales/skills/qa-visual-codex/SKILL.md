---
name: qa-visual-codex
description: Usa esta skill para validar cambios visuales en interfaces web con captura, rutas de componentes, CSS y evidencia final. No usar para refactors generales ni cambios de producto.
---

# QA visual con Codex

## Inputs necesarios

- Ruta o URL de la pantalla.
- Captura actual o descripción visual concreta.
- Captura esperada, mockup o criterio de aceptación.
- Rutas probables de componente y estilos.

## Workflow

1. Identifica la diferencia visual concreta antes de editar.
2. Lista 2-3 hipótesis de causa.
3. Revisa solo archivos relacionados.
4. Propón cambio mínimo.
5. Edita CSS/componente de forma acotada.
6. Verifica con captura, inspección visual o prueba de layout.
7. Resume:
   - causa;
   - archivos tocados;
   - evidencia;
   - riesgo residual.

## Reglas

- No rehagas el diseño entero.
- No cambies textos ni flujos salvo que el bug sea de contenido.
- No uses screenshots irrelevantes.
- Si no puedes verificar visualmente, dilo y ofrece el comando o viewport necesario.

## Done

La tarea termina cuando hay un diff pequeño y una evidencia visual o técnica de que el problema quedó resuelto.
