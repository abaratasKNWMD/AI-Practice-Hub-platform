# Auditor de sesion Codex

Ejemplo ejecutable para hablar de coste cualitativo en Codex sin convertir la clase en una hoja de precios.

El objetivo no es calcular euros reales. El objetivo es que el equipo aprenda a mirar una sesion y preguntarse:

- que contexto ayudo de verdad;
- que herramientas evitaron trabajo manual;
- que logs o imagenes se podrian haber resumido;
- que parte del workflow merece convertirse en plantilla, skill o AGENTS.md.

## Ejecutar auditoria

```bash
npm run audit
```

Salida esperada con la sesion de ejemplo:

```text
{
  "totals": {
    "inputTokens": 4600,
    "outputTokens": 1800,
    "toolCalls": 9,
    "images": 2,
    "largeLogs": 1
  },
  "level": "alto",
  "recommendations": [
    "Filtrar logs antes de pegarlos o pedir a Codex que busque el fragmento relevante.",
    "Agrupar capturas y señalar qué debe observar el modelo.",
    "Revisar si hubo herramientas repetidas o exploración sin plan."
  ]
}
```

## Ejecutar tests

```bash
npm test
```

## Qué mide

El script no calcula precio real. Clasifica presión de contexto a partir de:

- tokens de entrada y salida;
- número de llamadas a herramientas;
- imágenes usadas;
- logs largos;
- subagentes sin handoff.

## Uso en directo

1. Abre `sessions/sample-session.json`.
2. Cambia `inputTokens`, `toolCalls`, `imagesUsed` o `longLogs`.
3. Ejecuta `npm run audit`.
4. Pregunta al grupo que accion tomarian antes de relanzar Codex.

La conversacion importante no es "Codex es caro" sino "Codex debe recibir contexto con intencion". Mas contexto puede ahorrar horas; contexto sin forma puede quemar presupuesto y hacer peores respuestas.
