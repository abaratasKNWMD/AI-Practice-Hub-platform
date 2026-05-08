# Demo simulada

## Escena: prompt explorer

Prompt:

```text
Actua como explorer. Lee solo lo necesario para localizar validacion de login, tests relacionados y puntos de riesgo. No edites archivos. Devuelve rutas, hipotesis y siguiente pregunta.
```

Respuesta simulada:

```text
Rutas relevantes:
- src/auth/validate-login.ts
- tests/auth/login.spec.ts

Hipotesis:
- La validacion comprueba credenciales pero no estado active=false.

Riesgo:
- Cambiar la firma publica puede romper consumidores.

Siguiente paso:
- Confirmar contrato esperado para usuarios inactivos y agregar test de regresion.
```

## Escena: patch

Respuesta simulada:

```diff
+ if (user.active === false) {
+   return { ok: false, reason: 'inactive-user' }
+ }
```

## Escena: PR body

```md
## Contexto
El login aceptaba usuarios inactivos.

## Cambio
Se rechaza `active=false` con reason `inactive-user`.

## Pruebas
`pnpm test -- login.spec.ts`

## Riesgo
Bajo. No cambia UI ni firma publica.
```
