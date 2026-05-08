# Prompts operativos para Codex

Usa estos prompts como punto de partida. La parte importante no es copiar exactamente el texto, sino conservar la estructura: objetivo, contexto, restricciones y done when.

## 1. Onboarding de repo sin editar

```text
Objetivo: entiende este repositorio sin editar archivos.

Contexto:
- Estoy en la raiz del repo.
- Quiero una vision para poder trabajar con Codex con menos riesgo.

Tareas:
- Identifica stack, estructura, comandos disponibles y rutas criticas.
- Localiza donde se configuran tests, lint, build y variables de entorno.
- Señala riesgos: areas sensibles, codigo legacy, secretos, migraciones o integraciones externas.

Restricciones:
- No modifiques archivos.
- No instales dependencias.
- Si algo no se puede saber, dilo como incertidumbre.

Done when:
- Devuelves un mapa breve del repo.
- Recomiendas los 3 primeros comandos de verificacion.
- Propones que deberia ir en AGENTS.md.
```

## 2. Bug minimo verificable

```text
Objetivo: arreglar el fallo descrito con el cambio minimo.

Contexto:
- Error observado: <pegar error corto>.
- Archivos sospechosos: <rutas>.
- Test o comportamiento esperado: <criterio>.

Restricciones:
- No hagas refactor amplio.
- No cambies API publica salvo que sea imprescindible.
- No ocultes errores con catch genericos.

Proceso:
- Primero intenta reproducir o explicar como reproducir.
- Despues propone plan breve.
- Implementa el minimo cambio.
- Ejecuta tests relevantes.

Done when:
- Hay diff pequeño.
- Hay evidencia de test/build o una razon concreta si no se pudo ejecutar.
- El resumen final incluye archivos tocados, riesgo residual y siguiente paso.
```

## 3. Review tecnico de cambios

```text
Objetivo: revisa los cambios como si fueran una PR.

Contexto:
- Base: <rama o commit base>.
- Enfoque: correctness, regresiones, seguridad, tests y mantenibilidad.

Restricciones:
- Prioriza bugs reales sobre gustos de estilo.
- Cita archivo y linea cuando puedas.
- No propongas refactors no relacionados.

Done when:
- Lista hallazgos ordenados por severidad.
- Incluye preguntas abiertas si bloquean la decision.
- Termina con una decision: approve, changes requested o needs manual check.
```

## 4. Crear o mejorar AGENTS.md

```text
Objetivo: crear un AGENTS.md practico para este repo.

Contexto:
- Revisa README, package files, config de tests/lint/build y estructura.
- Usa solo reglas que puedas justificar mirando el repo.

Restricciones:
- Mantenerlo corto.
- No inventar comandos.
- Separar reglas globales de reglas por subdirectorio si aplica.

Done when:
- AGENTS.md incluye mapa, comandos, convenciones, restricciones y definicion de done.
- Incluye una seccion "cuando actualizar este archivo".
- Señala dudas que el equipo debe confirmar.
```

## 5. Control de coste y contexto

```text
Objetivo: reducir gasto de tokens sin perder calidad.

Contexto:
- Esta conversacion ya incluye <logs/docs/screenshots>.
- La tarea real es <objetivo concreto>.

Instrucciones:
- Resume que contexto es realmente necesario.
- Indica que partes puedo quitar o compactar.
- Propone si conviene seguir en este hilo, compactar, abrir hilo nuevo o dividir en subtask.

Done when:
- Tengo una version corta del prompt.
- Tengo una lista de contexto que NO debo pegar.
- Tengo un criterio para subir o bajar modelo/razonamiento.
```

## 6. Cierre de sesion

```text
Antes de cerrar, dame:
- Que cambiaste y por que.
- Archivos tocados.
- Comandos ejecutados y resultado.
- Riesgos o casos no cubiertos.
- Que deberia documentarse en AGENTS.md, README o una skill.
- Estimacion cualitativa de coste: bajo, medio o alto, y que lo disparo.
```
