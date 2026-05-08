# Risk register Codex Ultra

| Riesgo | Senal | Mitigacion | Owner |
| --- | --- | --- | --- |
| Swarm sin ownership | Dos agentes editan la misma ruta | Write scopes separados y handoff obligatorio | Tech lead |
| Coste invisible | Batch o evals sin piloto | Run pequeno, presupuesto y stop condition | Platform |
| RAG inseguro | Resultados saltan ACL | Filtrado antes de retrieval y logs de consulta | Security |
| Dataset contaminado | Secretos o PII en ejemplos | Scrubber, revision y dataset card | Data owner |
| Juez demasiado permisivo | Aprueba sin evidencia | Evals contra decisiones humanas | QA |
| Fine-tuning prematuro | No hay baseline ni eval | RAG primero, eval despues, training al final | AI lead |
| Tool con side effect ambiguo | Comentarios o cambios duplicados | Idempotency key y approval humano | DevEx |
