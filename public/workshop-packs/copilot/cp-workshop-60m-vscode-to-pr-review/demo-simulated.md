# Demo simulada

## Ask

```text
Explica donde se calcula el total del carrito, que supuestos hace el codigo y que test minimo cubriria items sin price. No edites.
```

Respuesta simulada:

```text
El calculo vive en src/cart/total.ts. El codigo asume que price siempre existe. El test minimo debe incluir un item sin price y comprobar que no rompe checkout.
```

## Edit

```text
Ignora items sin price, conserva currency EUR y agrega test de regresion. No cambies UI.
```

Diff esperado:

```diff
+ if (!item.price) return sum
```

## PR review

```json
{
  "severity": "minor",
  "finding": "El test cubre item sin price, pero conviene anadir descripcion de negocio.",
  "recommendation": "Merge si el comando de test queda verde."
}
```
