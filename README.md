# D&D5e 2024 - Escuelas de Mago

Módulo para **Foundry VTT 14.363** y **dnd5e 5.2.x** que añade las cuatro especializaciones de Mago del PHB 2014 que no aparecen como subclases en el PHB 2024.

## Subclases incluidas

| Subclase | Nivel 3 | Nivel 6 | Nivel 10 | Nivel 14 |
|---|---|---|---|---|
| Conjurador | Experto en Conjuración + Conjuración Menor | Trasposición Benigna | Conjuración Concentrada | Invocaciones Duraderas |
| Encantador | Experto en Encantamiento + Mirada Hipnótica | Encantamiento Instintivo | Duplicar Encantamiento | Modificar Recuerdos |
| Nigromante | Experto en Nigromancia + Cosecha Siniestra | Siervos Muertos Vivientes | Habituado a la Muerte en Vida | Controlar Muertos Vivientes |
| Transmutador | Experto en Transmutación + Alquimia Menor | Piedra de Transmutador | Cambiar de Forma | Maestro Transmutador |

## Criterio de adaptación

- La progresión original 2014 se mueve a **3 / 6 / 10 / 14**, igual que las subclases del Mago 2024.
- Los antiguos rasgos `Experto en X` se sustituyen por el patrón 2024: dos conjuros gratuitos de la escuela a nivel 3 y uno adicional cuando se obtiene acceso a un nuevo nivel de espacios de conjuro.
- El resto de rasgos conserva su mecánica de 2014 salvo cuando depende de un conjuro cuya versión 2024 ha cambiado. En ese caso se usa el conjuro actual de 2024.
- Se automatiza únicamente lo que dnd5e 5.2 puede representar de forma segura. Los comportamientos condicionados complejos incluyen una **Nota de Foundry** en la descripción.

## Instalación

1. Descomprime el ZIP.
2. Copia la carpeta `dnd5e-2024-wizard-schools` dentro de:

```text
C:\docker\foundryvtt\foundryvtt-14.363-B\data\Data\modules\
```

3. Reinicia Foundry VTT.
4. Activa **D&D5e 2024 - Escuelas de Mago** en el mundo.
5. El módulo registra automáticamente su compendio nativo:

```text
D&D 2024 - Escuelas de Mago
```

## Prueba recomendada

Crea un personaje nuevo y añade la clase **Mago 2024**.

- A nivel 3, abre el selector de subclase.
- Comprueba que aparecen `Conjurador`, `Encantador`, `Nigromante` y `Transmutador`.
- Selecciona una y verifica que recibe sus dos rasgos de nivel 3.
- Sube a 6, 10 y 14 y comprueba los `ItemGrant`.

Si las subclases no aparecen en el selector, abre el navegador de compendios de D&D5e, entra en la configuración de **Fuentes** y verifica que el compendio del módulo no esté excluido.

## Actualización desde 1.14.1

La versión 1.15.0 sustituye el antiguo compendio de mundo por `dnd5e-2024-wizard-schools.classes24`. Al entrar como GM, el módulo detecta el compendio legado y ofrece eliminarlo para que las subclases no aparezcan duplicadas. Los rasgos ya concedidos a personajes no se eliminan.

## Automatización

### Conjurador

- Conjuración Menor: actividad de utilidad.
- Trasposición Benigna: 1 uso, descanso largo y actividad; la recarga al lanzar un conjuro de Conjuración se hace manualmente.
- Conjuración Concentrada e Invocaciones Duraderas: descriptivas para evitar alterar conjuros/criaturas incorrectos.

### Encantador

- Mirada Hipnótica: salvación de Sabiduría con CD de conjuros.
- Encantamiento Instintivo: reacción + salvación de Sabiduría.
- Modificar Recuerdos: salvación de Inteligencia.
- La inmunidad individual y la redirección de objetivos se controlan manualmente.

### Nigromante

- Habituado a la Muerte en Vida: resistencia necrótica automática.
- Controlar Muertos Vivientes: actividad de salvación de Carisma.
- Cosecha Siniestra y Siervos Muertos Vivientes se dejan parcialmente manuales por depender del conjuro/actor que haya provocado el efecto.

### Transmutador

- Alquimia Menor y Piedra de Transmutador: actividades de utilidad.
- Cambiar de Forma: 1 uso recuperable en descanso corto/largo; el lanzamiento gratuito de Polimorfar se realiza manualmente.
- Maestro Transmutador: cuatro actividades que consumen un único uso recuperable en descanso largo.

## Estructura

```text
dnd5e-2024-wizard-schools/
├─ module.json
├─ README.md
├─ CHANGELOG.md
├─ TECHNICAL.md
├─ LICENSE
├─ lang/
│  └─ es.json
├─ scripts/
│  └─ main.mjs
├─ packs/
│  └─ classes24/
└─ data/
   ├─ common.mjs
   ├─ conjurer.mjs
   ├─ enchanter.mjs
   ├─ necromancer.mjs
   ├─ transmuter.mjs
   └─ index.mjs
```

## Nota de contenido

Este módulo es una adaptación para uso local de reglas procedentes de los manuales proporcionados por el usuario. No modifica los compendios oficiales del sistema D&D5e.
