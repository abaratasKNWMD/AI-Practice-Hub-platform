# Solucion guiada - Copilot Error to PR

1. Ask debe identificar que `item.price` puede ser undefined.
2. Edit aplica optional chaining y valor por defecto `0`.
3. El test cubre un item legacy sin price.
4. Agent puede preparar PR summary, pero no debe ampliar scope.

PR esperada:

```markdown
## Cambio
calculateTotal tolera items legacy sin price.

## Evidencia
pnpm test -- total.spec.ts

## Riesgo
Confirmar si item sin price debe ignorarse o bloquearse aguas arriba.
```
