# Demo simulada

## Router de casos

Prompt:

```text
Tengo tres necesidades: arreglar bug pequeno, activar 50 devs con IA y crear hook anti secretos. Recomienda vendor, curso, workshop y primer ejercicio. Incluye coste, permisos y riesgo.
```

Respuesta simulada:

```json
[
  {
    "case": "bug pequeno",
    "vendor": "Codex o Copilot",
    "why": "patch + test con baja friccion",
    "permission": "workspace acotado",
    "risk": "medio"
  },
  {
    "case": "activacion 50 devs",
    "vendor": "Copilot",
    "why": "flujo natural VS Code/GitHub",
    "permission": "local + PR review",
    "risk": "bajo"
  },
  {
    "case": "hook anti secretos",
    "vendor": "Claude",
    "why": "skills, hooks y rollout interno",
    "permission": "repo config",
    "risk": "alto"
  }
]
```
