# Prompts de rescate - Copilot Error to PR

## Si Agent se va de scope

```text
Para. No toques checkout, pricing ni UI.
Solo src/cart/total.ts y tests/cart/total.spec.ts.
Devuelve diff pequeno y razon.
```

## Si propone cambiar el schema

```text
No cambies el contrato publico.
Propone una solucion compatible con items legacy.
```

## Si no hay test

```text
Antes de cerrar, crea un test que falle antes del patch y pase despues.
```
