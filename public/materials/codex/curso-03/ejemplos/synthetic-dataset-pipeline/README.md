# Synthetic dataset pipeline

Genera un dataset JSONL de onboarding con evidencia obligatoria. No llama a ningun modelo: simula la forma del dataset y valida reglas de calidad.

## Ejecutar

```bash
npm test
npm run build
```

Resultado: `out/onboarding.jsonl`.

## Uso con Codex

Abre el JSONL y pide a Codex que lo revise como data steward antes de usarlo en RAG, evals o fine-tuning.
