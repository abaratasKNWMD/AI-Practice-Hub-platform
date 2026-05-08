# Ejemplo login: bug de refresco de sesion

Mini proyecto para el Lab 02.

## Ejecutar

```bash
npm test
```

El test inicial falla a proposito. El objetivo es pedir a Codex que:

1. Reproduzca el fallo.
2. Explique la causa raiz.
3. Aplique el cambio minimo.
4. Ejecute tests.
5. Resuma evidencia y riesgo.

## Pista para el facilitador

`expiresAt` se guarda en segundos Unix, pero `Date.now()` devuelve milisegundos. La solucion no deberia cambiar la API publica.
