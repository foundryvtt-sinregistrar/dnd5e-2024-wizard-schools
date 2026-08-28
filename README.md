# D&D5e 2024 - Escuelas de Mago

Módulo de prueba para **Foundry VTT 14.363** + **dnd5e 5.2.x**.

Esta primera versión implementa únicamente **Conjurador**, adaptando la Escuela de Conjuración del PHB 2014 a la estructura de subclases del Mago 2024.

## Contenido

| Nivel | Rasgo |
|---:|---|
| 3 | Experto en Conjuración |
| 3 | Conjuración Menor |
| 6 | Trasposición Benigna |
| 10 | Conjuración Concentrada |
| 14 | Invocaciones Duraderas |

La subclase usa `system.classIdentifier = wizard`, `system.source.rules = 2024` y `ItemGrant` en niveles **3 / 6 / 10 / 14**, siguiendo la estructura técnica del Evocador 2024 de dnd5e 5.2.x.

## Cómo instala el contenido esta versión de prueba

Este ZIP no contiene una base LevelDB precompilada. Al activar el módulo, el **GM** crea automáticamente un compendio de mundo:

```text
D&D 2024 - Escuelas de Mago
```

Su colección interna es:

```text
world.dnd5e-2024-wizard-schools
```

El módulo instala o actualiza en él el Item `subclass` **Conjurador** y sus cinco Items `feat`, manteniendo IDs fijos para que los `ItemGrant` sean estables.

Esta estrategia permite probar la estructura real de dnd5e 5.2.x sin necesitar compilar una base LevelDB fuera de Foundry. Cuando la estructura quede validada se puede convertir el compendio de mundo en un compendio propio del módulo mediante el **Module Maker** de Foundry.

## Instalación

1. Descomprime el ZIP.
2. Copia la carpeta `dnd5e-2024-wizard-schools` dentro de:

```text
C:\docker\foundryvtt\foundryvtt-14.363-B\data\Data\modules\
```

3. Reinicia Foundry.
4. Entra al mundo como GM.
5. Activa **D&D5e 2024 - Escuelas de Mago**.
6. El módulo creará/actualizará el compendio automáticamente.

## Prueba recomendada

1. Crea un personaje nuevo.
2. Añade la clase **Mago 2024**.
3. Sube a nivel 3.
4. En el paso de selección de subclase, abre el navegador de subclases.
5. Busca **Conjurador**.
6. Selecciónalo y comprueba que obtienes:
   - Experto en Conjuración.
   - Conjuración Menor.
7. Sube a nivel 6, 10 y 14 y comprueba los `ItemGrant` restantes.

Si el navegador de subclases ya estaba abierto antes de activar/instalar el módulo, ciérralo y vuelve a abrirlo para que regenere su índice.

## Automatización incluida

- **Experto en Conjuración:** descriptivo, igual que el patrón oficial de Experto en Evocación 2024.
- **Conjuración Menor:** incluye una actividad de utilidad de acción.
- **Trasposición Benigna:** incluye 1 uso, recuperación en descanso largo y actividad de utilidad que consume el uso.
- **Conjuración Concentrada:** descriptivo; la condición depende de que el conjuro concentrado sea de Conjuración.
- **Invocaciones Duraderas:** descriptivo; los 30 PG temporales se aplican manualmente a la criatura invocada/creada.

### Limitación de Trasposición Benigna

El rasgo también se recarga cuando lanzas un conjuro de Conjuración de nivel 1 o superior. Esta versión no intercepta el lanzamiento de conjuros; cuando ocurra, restaura manualmente el uso de Trasposición Benigna. El descanso largo sí se gestiona de forma automática.

## Desinstalación

Desactivar el módulo **no borra automáticamente el compendio de mundo**, para evitar pérdida accidental de datos. Si quieres eliminarlo por completo:

1. desactiva el módulo;
2. elimina manualmente el compendio `D&D 2024 - Escuelas de Mago` desde Foundry;
3. elimina la carpeta del módulo.

## Próximo paso

Cuando Conjurador esté validado en tu instalación:

- Encantador
- Nigromante
- Transmutador

pueden añadirse siguiendo exactamente el mismo patrón.
