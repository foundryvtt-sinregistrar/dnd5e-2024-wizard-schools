# D&D5e 2024 - Escuelas de Mago

![Foundry v14](https://img.shields.io/badge/Foundry-v14-green)
![dnd5e 5.2.x](https://img.shields.io/badge/dnd5e-5.2.x-blue)
[![Latest Release](https://img.shields.io/github/v/release/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools?label=release)](https://github.com/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/releases/latest)
[![Downloads Latest Release](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/latest/total?label=descargas%20%C3%BAltima%20release)](https://github.com/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/releases/latest)
[![Downloads Total](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/total?label=descargas%20totales)](https://github.com/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/releases)

### Este módulo no está afiliado a Wizards of the Coast.

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
- Se automatiza únicamente lo que dnd5e 5.2 puede representar de forma segura. Los comportamientos condicionados complejos incluyen instrucciones de automatización o asistencia en la descripción.

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

El compendio organiza el contenido en cuatro carpetas —Conjurador, Encantador, Nigromante y Transmutador— y utiliza un icono diferente para cada subclase y rasgo.

## Prueba recomendada

Crea un personaje nuevo y añade la clase **Mago 2024**.

- A nivel 3, abre el selector de subclase.
- Comprueba que aparecen `Conjurador`, `Encantador`, `Nigromante` y `Transmutador`.
- Selecciona una y verifica que recibe sus dos rasgos de nivel 3.
- Sube a 6, 10 y 14 y comprueba los `ItemGrant`.

Si las subclases no aparecen en el selector, abre el navegador de compendios de D&D5e, entra en la configuración de **Fuentes** y verifica que el compendio del módulo no esté excluido.

## Actualización desde 1.14.1

La versión 1.14.2 sustituye el antiguo compendio de mundo por `dnd5e-2024-wizard-schools.classes24`. Al entrar como GM, el módulo detecta el compendio legado y ofrece eliminarlo para que las subclases no aparezcan duplicadas. Los rasgos ya concedidos a personajes no se eliminan.

## Automatización

El ajuste de mundo **Automatización de rasgos complejos** permite desactivar todos los hooks y volver a una resolución manual. Está activado por defecto y no requiere Midi-QOL, DAE ni SocketLib.

### Conjurador

- Conjuración Menor: actividad de utilidad y resolución narrativa del objeto.
- Trasposición Benigna: recupera su uso al lanzar Conjuración de nivel 1 o superior.
- Conjuración Concentrada: omite la prueba causada por daño solo para conjuros de Conjuración.
- Invocaciones Duraderas: concede 30 PG temporales a criaturas creadas por actividades de invocación de Conjuración.

### Encantador

- Mirada Hipnótica: efecto Hechizado/Incapacitado, velocidad 0, fin por daño e inmunidad por objetivo hasta descanso largo.
- Encantamiento Instintivo: resuelve la salvación y propone los objetivos más cercanos para la redirección.
- Duplicar Encantamiento: amplía temporalmente a dos objetivos los conjuros compatibles.
- Modificar Recuerdos: calcula las horas máximas según Carisma.

### Nigromante

- Cosecha Siniestra: detecta muertes producidas al aplicar daño desde un conjuro, cura y limita el beneficio a una vez por turno.
- Siervos Muertos Vivientes: aplica PG adicionales y competencia al daño de las armas de muertos vivientes invocados por Nigromancia.
- Habituado a la Muerte en Vida: resistencia necrótica y bloqueo de reducciones directas de PG máximos.
- Controlar Muertos Vivientes: valida el objetivo, avisa de sus ventajas/repeticiones y mantiene un único control por nigromante.

### Transmutador

- Alquimia Menor: concentración nativa durante una hora.
- Piedra de Transmutador: crea un objeto transferible, sustituye la piedra anterior y gestiona su beneficio.
- Cambiar de Forma: añade Polimorfar 2024 si falta y lo lanza sobre el mago sin gastar espacio.
- Maestro Transmutador: exige y destruye la piedra; automatiza Panacea y Devolver la juventud y asiste las otras opciones.

### Límites deliberados

- Las decisiones narrativas, la percepción, los alcances variables y las inmunidades no representadas por dnd5e se validan manualmente.
- Los efectos de salvaciones fallidas se aplican desde los botones nativos del mensaje de actividad.
- La criatura adicional de Animar a los muertos y la forma de bestia de VD 1 o inferior se seleccionan manualmente.

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
│  ├─ main.mjs
│  └─ automation/
├─ packs/
│  └─ classes24/
├─ assets/
│  └─ icons/subclasses/
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
