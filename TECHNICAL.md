# Notas técnicas

## Objetivo

- Foundry VTT 14.363
- dnd5e 5.2.x
- Reglas de clase: 2024

## Arquitectura

El módulo distribuye un compendio nativo de Items, `dnd5e-2024-wizard-schools.classes24`, con 24 documentos:

- 4 Items `subclass`.
- 20 Items `feat`.

Los documentos se distribuyen en cuatro carpetas internas, una por escuela. Cada subclase usa un icono WebP propio incluido en el módulo; los rasgos emplean iconos temáticos del catálogo estándar de Foundry.

Las subclases tienen `system.classIdentifier = "wizard"`, por lo que el navegador de subclases de dnd5e puede encontrarlas al resolver el Advancement de subclase del Mago 2024.

Cada subclase usa `ItemGrant` en 3 / 6 / 10 / 14.

## IDs

Todos los `_id` del contenido son propios, estables, alfanuméricos y de 16 caracteres. Los IDs del Conjurador de 1.14.0 se conservan para que una actualización no rompa los UUID ya existentes.

## Generación y validación

Los ficheros de `data/` son la fuente canónica. El pack LevelDB se genera y valida con:

```text
npm install
npm run build:pack
npm run validate
```

El validador comprueba cantidad, unicidad y formato de IDs, destinos de `ItemGrant`, UUID nativos, actividades, efectos vinculados, imágenes, carpetas y correspondencia entre los datos fuente y el pack. Las utilidades de automatización tienen además pruebas con `npm test`.

## Migración desde 1.14.1

El script de arranque ya no crea ni sincroniza contenido. Solo detecta `world.dnd5e-2024-wizard-schools` y pide confirmación al GM para eliminar el compendio legado, evitando resultados duplicados sin borrar datos silenciosamente.

## Arquitectura de automatización

Los módulos de `scripts/automation/` se registran desde `setup` y se pueden desactivar con un ajuste de mundo. Identifican rasgos mediante `system.identifier`, nunca mediante nombres traducidos, y limitan los cambios al actor que posee el rasgo.

Se usan hooks documentados por dnd5e 5.2 para actividades, daño, descansos e invocaciones. Los estados persistentes se representan mediante Active Effects o flags del módulo. No se requieren Midi-QOL, DAE ni SocketLib.

La automatización no decide resultados narrativos, no modifica compendios oficiales y no fuerza objetivos cuando Foundry no proporciona un flujo seguro entre clientes. En esos casos publica una instrucción asistida y mantiene disponible la resolución manual.
