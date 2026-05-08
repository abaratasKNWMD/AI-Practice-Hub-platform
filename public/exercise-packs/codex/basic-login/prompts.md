# Prompts - Codex Basic Login

## Prompt inicial

```text
Necesito diagnosticar un bug de login.

Lee solo src/auth y tests/auth.
No edites archivos.

Devuelve:
1. mapa del flujo
2. archivos candidatos
3. hipotesis principal
4. plan de maximo 3 pasos
5. check barato para validar

Si necesitas mas contexto, pidelo antes de leer carpetas completas.
```

## Prompt de patch

```text
Aplica solo el plan aprobado.
No refactorices autenticacion completa.
No cambies API publica.

Cierra con:
- archivos tocados
- resumen del diff
- comando de test
- resultado
- riesgo restante
```
