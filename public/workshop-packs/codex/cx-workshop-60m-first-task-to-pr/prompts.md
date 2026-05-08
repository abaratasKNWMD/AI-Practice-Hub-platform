# Prompts Codex

## Briefing de 4 piezas

```text
Problema: el login acepta usuarios inactivos.
Restricciones: no tocar UI, no usar red, no cambiar firma publica.
Aceptacion: active=false debe rechazarse; active=true debe seguir funcionando.
Evidencia: test de regresion y PR body.
```

## Explorer readonly

```text
Actua como explorer. Lee solo lo necesario para localizar validacion de login, tests relacionados y puntos de riesgo. No edites archivos. Devuelve rutas, hipotesis y siguiente pregunta.
```

## Plan antes del patch

```text
Propone un plan de maximo 5 pasos antes de editar. Debe incluir archivos, test objetivo y criterio de parada.
```

## Patch minimo

```text
Aplica el cambio minimo para rechazar usuarios inactive=false. Agrega prueba de regresion. No modifiques UI ni contratos publicos salvo que sea imprescindible.
```

## Rescate

```text
No edites mas. Explica por que falla el test, que hipotesis tienes y que informacion minima necesitas para continuar.
```
