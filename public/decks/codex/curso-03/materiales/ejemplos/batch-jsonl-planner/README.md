# Batch JSONL planner

Genera un archivo JSONL para Batch API sin enviar nada a OpenAI. Sirve para explicar `custom_id`, piloto pequeno, salida estructurada y control de coste.

## Ejecutar

```bash
npm test
npm run build
```

Resultado: `out/refactor.batch.jsonl`.

## Conexion real

Cuando el JSONL este validado, se puede subir como archivo y crear un Batch contra `/v1/responses`. Antes de hacerlo, ejecuta un piloto pequeno y revisa presupuesto, permisos y rollback.
