# Notas técnicas

## Modelo de subclase

El Item `Conjurador` usa:

```text
type = subclass
system.source.rules = 2024
system.identifier = conjurer
system.classIdentifier = wizard
system.spellcasting.progression = none
```

Su `system.advancement` contiene cuatro `ItemGrant` en niveles 3, 6, 10 y 14.

## IDs estables

Los IDs de los seis Items y de los Advancement/Activities están fijados en `data/conjurer.mjs`. No deben regenerarse entre versiones una vez que el contenido se haya usado en personajes.

## Compendio de prueba

El módulo crea un compendio de mundo porque las bases de compendio de Foundry v11+ son carpetas LevelDB. Para una release pública final, crea un compendio propio del módulo con Foundry Module Maker, exporta estos Items manteniendo los IDs y reemplaza los UUID `Compendium.world...` por los UUID del compendio del módulo.
