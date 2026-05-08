# Prompts potentes para Codex

Estos prompts están pensados para usuarios que ya saben pedir trabajo básico. Úsalos para dirigir a Codex como plataforma: modelo, contexto, tools, permisos, coste y evidencia.

## 1. Selección de modelo y reasoning antes de trabajar

```text
Antes de empezar, clasifica esta tarea.

Tarea:
<describe la tarea>

Necesito que decidas:
- modelo sugerido;
- reasoning sugerido;
- permisos/sandbox adecuados;
- herramientas necesarias;
- contexto mínimo suficiente;
- criterio de done;
- riesgo de coste: bajo, medio o alto.

Restricciones:
- No edites todavía.
- No llames herramientas externas salvo lectura local segura.
- Si falta información para elegir modelo o permisos, pregunta primero.

Done when:
- Devuelves una tabla corta con decisión, motivo y riesgo.
```

## 2. Debug multimodal de UI

```text
Objetivo: corregir una diferencia visual usando captura + código.

Contexto:
- Captura esperada: <adjuntar o describir>.
- Captura actual: <adjuntar o describir>.
- Ruta de la pantalla/componente: <ruta>.
- Estilos relevantes: <ruta>.

Instrucciones:
- Observa primero la diferencia visual concreta.
- Propón hipótesis antes de tocar código.
- Cambia solo lo necesario.
- Verifica con captura, inspección visual o prueba de layout.

Done when:
- Explicas causa probable.
- El diff es acotado.
- Hay evidencia visual o una razón clara si no se pudo generar.
```

## 3. MCP read-only con evidencia

```text
Objetivo: usar una fuente externa mediante MCP sin perder trazabilidad.

Contexto:
- MCP disponible: <nombre>.
- Tools permitidas: <lista>.
- Pregunta/tarea: <objetivo>.

Restricciones:
- Usa solo herramientas read-only.
- Cita qué consultaste y cómo influyó.
- No pegues respuestas gigantes en el hilo principal; resume.

Done when:
- Indicas tool usada, input, resultado útil y decisión tomada.
- Señalas incertidumbres que requieren revisión humana.
```

## 4. Subagentes con ownership

```text
Usa subagentes en paralelo para revisar esta rama.

Divide el trabajo así:
- Agente arquitectura: impacto, contratos, acoplamiento.
- Agente QA: tests, edge cases, reproducción.
- Agente seguridad: secretos, auth, permisos, dependencias.

Reglas:
- Cada agente debe trabajar en read-only salvo que yo autorice cambios.
- Cada agente devuelve solo hallazgos con evidencia y rutas.
- No mezcles hallazgos repetidos; deduplica antes del resumen final.

Done when:
- Resumen final por severidad.
- Tabla con owner, evidencia y decisión: approve, changes requested o manual check.
- Nota de coste/contexto: qué disparó tokens y cómo reducirlo.
```

## 5. Crear una skill de equipo

```text
Objetivo: convertir este workflow repetido en una skill de Codex.

Workflow repetido:
<describe el patrón>

Necesito:
- nombre y descripción de la skill;
- cuándo debe activarse y cuándo no;
- pasos imperativos;
- inputs necesarios;
- outputs esperados;
- criterios de verificación;
- recursos o scripts opcionales.

Restricciones:
- La skill debe cubrir una sola tarea.
- No metas reglas genéricas de todo el equipo.
- Si requiere herramientas, decláralas como dependencia conceptual.

Done when:
- Devuelves un SKILL.md listo para revisar.
- Señalas qué parte debería ir en AGENTS.md en vez de la skill.
```

## 6. Auditoría de coste y contexto

```text
Audita esta sesión de Codex.

Contexto:
- Tarea original: <objetivo>.
- Herramientas usadas: <lista>.
- Imágenes/logs/docs incluidos: <lista>.
- Resultado final: <qué se consiguió>.

Analiza:
- contexto útil;
- contexto que sobró;
- herramientas repetidas o caras;
- si el modelo/reasoning fue adecuado;
- si convenía dividir, compactar o delegar.

Done when:
- Devuelves 3 mejoras concretas para la siguiente sesión.
- Clasificas coste cualitativo: bajo, medio o alto.
- Indicas qué debería documentarse en AGENTS.md, skill o plantilla.
```
