# Solucion guiada - Codex Basic Login

1. El bug esta en la comparacion directa de email.
2. El input del usuario puede llegar con mayusculas o espacios.
3. La solucion minima normaliza el email candidato antes de comparar.
4. El test protege el caso `ADA@EXAMPLE.COM`.
5. El cierre debe declarar riesgo: revisar comportamiento de emails legacy con espacios.

Comando esperado:

```bash
pnpm test -- auth/login.spec.ts
```

Handoff esperado:

```text
Objetivo: login case-insensitive.
Cambio: normalizacion trim/lowercase antes de comparar.
Archivos: src/auth/validate-login.ts, tests/auth/login.spec.ts.
Check: pnpm test -- auth/login.spec.ts.
Riesgo: confirmar politica de espacios en email.
```
