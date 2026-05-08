# Lab 02: Bug minimo con tests

## Objetivo

Practicar el bucle: reproducir, planificar, cambiar lo minimo, ejecutar tests y resumir evidencia.

## Proyecto de ejemplo

Usa `../ejemplo-login/`.

El proyecto contiene una funcion de sesion con un bug intencional: mezcla segundos y milisegundos al decidir si una sesion debe refrescarse.

## Pasos

1. Abre Codex en `materiales/ejemplo-login/`.
2. Ejecuta o pide ejecutar `npm test`.
3. Pide a Codex que explique el fallo antes de tocar codigo.
4. Pide el fix minimo.
5. Vuelve a ejecutar tests.
6. Pide resumen final con archivos tocados y riesgo residual.

## Prompt sugerido

```text
Objetivo: arreglar el bug de refresco de sesion con el cambio minimo.

Contexto:
- Proyecto: materiales/ejemplo-login.
- Ejecuta npm test para reproducir.
- La sesion usa expiresAt como Unix timestamp en segundos.

Restricciones:
- No cambies la API publica.
- No añadas dependencias.
- No reescribas el modulo entero.

Done when:
- Los tests pasan.
- Explicas la causa raiz.
- Resumes el diff y el riesgo residual.
```

## Variante para usuarios avanzados

Pide a Codex que añada un test para el caso exacto del limite de 30 segundos antes de expirar, pero solo despues de haber corregido el bug principal.
