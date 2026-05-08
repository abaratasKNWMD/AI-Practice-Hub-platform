# Prompts - Copilot Error to PR

## Ask

```text
@workspace Explica este error sin editar archivos.

Falla calculateTotal en src/cart/total.ts.
El stack indica item.price is undefined.

Devuelve:
1. causa probable
2. archivo candidato
3. test minimo
4. que no deberia cambiar
```

## Edit

```text
Aplica el cambio minimo en calculateTotal.
No cambies el contrato publico de CartItem.
Añade un test para item legacy sin price.
```

## PR

```text
Prepara descripcion de PR con cambio, evidencia, riesgos y uso de Copilot.
```
