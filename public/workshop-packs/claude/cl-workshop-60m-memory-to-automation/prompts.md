# Prompts Claude

## Triage de contexto

```text
Clasifica estas instrucciones como CLAUDE.md, rule por carpeta, skill, subagente o eliminar. Justifica cada decision en una linea.
```

## Auditoria de memoria

```text
Audita este CLAUDE.md. Separa memoria estable, contenido que debe moverse a skill y contenido que debe eliminarse. Prioriza brevedad operativa.
```

## Crear skill

```text
Crea una skill fix-tests con When to use, Inputs, Workflow, Stop conditions y Output. Debe evitar ediciones sin diagnostico.
```

## Crear subagente

```text
Define un subagente explorer readonly. Debe leer codigo, no editar, y devolver rutas, hipotesis, riesgos y pregunta siguiente.
```

## Eval de review

```text
Evalua este diff con schema JSON: severity, finding, evidence, recommendation. No devuelvas texto fuera del JSON.
```
