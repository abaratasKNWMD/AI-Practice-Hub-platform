# Prompts de rescate - Codex Basic Login

## Si Codex quiere tocar demasiado

```text
Para. Reduce el scope.
Solo puedes tocar src/auth/validate-login.ts y tests/auth/login.spec.ts.
Devuelve un plan de 2 pasos y espera confirmacion.
```

## Si pide permisos peligrosos

```text
Explica por que necesitas ese permiso.
Indica alternativa read-only o test cercano.
No ejecutes comandos con red ni leas .env.
```

## Si el test falla por fixture

```text
No sigas parcheando a ciegas.
Resume el fallo, fixture implicada y dos opciones de correccion.
Espera decision humana.
```
