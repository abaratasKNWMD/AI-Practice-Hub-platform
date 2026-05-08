# Prompts Copilot

## Ask diagnostico

```text
Explica donde se calcula el total del carrito, que supuestos hace el codigo y que test minimo cubriria items sin price. No edites.
```

## Edit localizado

```text
En la funcion seleccionada, ignora items sin price y conserva el comportamiento de items validos. Agrega test de regresion. No cambies UI ni APIs.
```

## Agent con carriles

```text
Objetivo: cerrar el bug de total con item sin price.
Puedes tocar: src/cart/total.ts y tests/cart/total.spec.ts.
No puedes tocar: UI, snapshots, package.json.
Comando: pnpm test -- total.spec.ts.
Para si necesitas tocar mas de 2 archivos.
```

## Review

```text
Revisa este diff con rubrica: correctness, tests, scope, maintainability y security. Devuelve findings accionables con severidad.
```
