# Notas técnicas

## Objetivo

- Foundry VTT 14.363
- dnd5e 5.2.x
- Reglas de clase: 2024

## Arquitectura

El módulo crea un compendio de mundo de Items y sincroniza en él 24 documentos administrados por el módulo:

- 4 Items `subclass`.
- 20 Items `feat`.

Las subclases tienen `system.classIdentifier = "wizard"`, por lo que el navegador de subclases de dnd5e puede encontrarlas al resolver el Advancement de subclase del Mago 2024.

Cada subclase usa `ItemGrant` en 3 / 6 / 10 / 14.

## IDs

Todos los `_id` del contenido son propios, estables, alfanuméricos y de 16 caracteres. Los IDs del Conjurador de 1.14.0 se conservan para que una actualización no rompa los UUID ya existentes.

## Sincronización

`CONTENT_VERSION` controla cuándo actualizar documentos administrados existentes. El instalador:

1. crea el compendio de mundo si no existe;
2. crea Items que falten conservando sus IDs;
3. actualiza Items administrados cuya versión interna haya cambiado;
4. no modifica documentos ajenos al módulo.

## Decisiones de automatización

No se añaden hooks globales para modificar lanzamientos de conjuros o criaturas invocadas. Esta versión prioriza compatibilidad y evita efectos colaterales. Cuando una regla no puede expresarse de forma segura mediante Activities/Active Effects, se conserva como descripción y Nota de Foundry.
