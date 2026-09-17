import {
  FOLDER_IDS,
  MODULE_ID,
  PACK_COLLECTION,
  applyPresentation,
  featureBase,
  itemGrant,
  saveActivity,
  subclassBase,
  transferableEffect
} from "./common.mjs";

const IDS = Object.freeze({
  subclass: "wz24Necromanc001",
  savant: "wz24NecSavant001",
  harvest: "wz24NecHarvest01",
  thralls: "wz24NecThrall001",
  inured: "wz24NecInured001",
  control: "wz24NecContrl001",
  adv3: "wz24NecAdv003001",
  adv6: "wz24NecAdv006001",
  adv10: "wz24NecAdv010001",
  adv14: "wz24NecAdv014001",
  effectNecrotic: "wz24NecResist001",
  actControl: "wz24NecCtlAct001"
});

const uuid = id => `Compendium.${PACK_COLLECTION}.Item.${id}`;

const savant = featureBase({
  id: IDS.savant,
  name: "Experto en Nigromancia",
  level: 3,
  identifier: "necromancy-savant",
  description: `<p>Elige dos conjuros de mago de la escuela de <strong>Nigromancia</strong> de nivel 2 o inferior y añádelos a tu libro de conjuros sin coste.</p><p>Además, siempre que consigas un nuevo nivel de espacios de conjuro de esta clase, puedes añadir un conjuro de mago de Nigromancia a tu libro de conjuros sin coste. Debe ser de un nivel para el que tengas espacios de conjuro.</p><section class="secret"><p><strong>Adaptación 2024.</strong> Usa el patrón moderno de los rasgos Experto de las escuelas oficiales.</p></section>`
});

const harvest = featureBase({
  id: IDS.harvest,
  name: "Cosecha Siniestra",
  level: 3,
  identifier: "grim-harvest",
  description: `<p>Una vez por turno, cuando mates al menos a una criatura con un conjuro de nivel 1 o superior, recuperas puntos de golpe iguales al doble del nivel del conjuro. Si el conjuro pertenece a la escuela de Nigromancia, recuperas tres veces su nivel.</p><p>No obtienes este beneficio al matar autómatas ni muertos vivientes.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La cantidad depende del nivel y escuela del conjuro que haya causado la muerte, por lo que la curación se aplica manualmente.</p></section>`
});

const thralls = featureBase({
  id: IDS.thralls,
  name: "Siervos Muertos Vivientes",
  level: 6,
  identifier: "undead-thralls",
  description: `<p>Añade <strong>Animar a los muertos</strong> a tu libro de conjuros si todavía no lo tienes.</p><p>Cuando lanzas Animar a los muertos, puedes elegir como objetivo un cadáver o una pila de huesos adicional, creando un zombi o esqueleto adicional según corresponda.</p><p>Además, cada muerto viviente que crees mediante un conjuro de Nigromancia obtiene estos beneficios:</p><ul><li>Sus puntos de golpe máximos aumentan en una cantidad igual a tu nivel de mago.</li><li>Suma tu bonificador por competencia a sus tiradas de daño con armas.</li></ul><section class="secret"><p><strong>Adaptación 2024.</strong> El conjuro Animar a los muertos de 2024 ya incrementa en dos criaturas por cada nivel de espacio por encima de 3; este rasgo mantiene además su criatura adicional propia. Añade el conjuro al libro manualmente para evitar duplicar o sustituir una copia ya existente.</p><p><strong>Nota de Foundry.</strong> Los bonificadores de PG y daño deben aplicarse a los actores invocados. No se automatizan en esta versión para no modificar criaturas que procedan de otras fuentes.</p></section>`
});

const inured = featureBase({
  id: IDS.inured,
  name: "Habituado a la Muerte en Vida",
  level: 10,
  identifier: "inured-to-undeath",
  description: `<p>Obtienes resistencia al daño necrótico y tus puntos de golpe máximos no pueden ser reducidos.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La resistencia necrótica se aplica automáticamente mediante un Active Effect. La inmunidad a la reducción de PG máximos se mantiene como regla descriptiva porque no existe una modificación genérica segura para todos los efectos que puedan reducirlos.</p></section>`,
  effects: [
    transferableEffect({
      id: IDS.effectNecrotic,
      name: "Resistencia necrótica",
      changes: [{ key: "system.traits.dr.value", mode: 2, value: "necrotic", priority: null }]
    })
  ]
});

const control = featureBase({
  id: IDS.control,
  name: "Controlar Muertos Vivientes",
  level: 14,
  identifier: "command-undead",
  description: `<p>Como acción, elige un muerto viviente que puedas ver a 60 pies o menos. Debe hacer una salvación de Carisma contra la CD de tus conjuros de mago. Si la supera, no puedes volver a usar este rasgo sobre esa criatura. Si falla, se vuelve amistosa hacia ti y obedece tus órdenes hasta que vuelvas a usar este rasgo.</p><p>Si el objetivo tiene Inteligencia 8 o superior, tiene ventaja en la salvación. Si tiene Inteligencia 12 o superior y falla, puede repetir la salvación al final de cada hora hasta tener éxito y liberarse.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La actividad resuelve la salvación inicial. La ventaja por Inteligencia, el control prolongado y las repeticiones horarias se gestionan manualmente.</p></section>`,
  activities: {
    [IDS.actControl]: saveActivity({
      id: IDS.actControl,
      ability: "cha",
      activation: "action",
      rangeUnits: "ft",
      rangeSpecial: "60 pies",
      targetType: "creature",
      targetSpecial: "Un muerto viviente visible",
      name: "Controlar Muerto Viviente"
    })
  }
});

const subclass = subclassBase({
  id: IDS.subclass,
  name: "Nigromante",
  identifier: "necromancer",
  description: `<blockquote><p>Manipula las fuerzas de la vida, la muerte y la muerte en vida.</p></blockquote><p>Los nigromantes estudian la energía que anima a los seres vivos y aprenden a extraerla, conservarla y usarla para crear o dominar muertos vivientes. Aunque muchas culturas consideran estas prácticas tabú, la tradición no determina por sí sola la moral de quien la estudia.</p><section class="secret"><p><strong>Adaptación.</strong> Traslada la Escuela de Nigromancia de 2014 a la progresión del Mago 2024: niveles 3, 6, 10 y 14.</p></section>`,
  advancements: [
    itemGrant({ id: IDS.adv3, level: 3, items: [uuid(IDS.savant), uuid(IDS.harvest)] }),
    itemGrant({ id: IDS.adv6, level: 6, items: [uuid(IDS.thralls)] }),
    itemGrant({ id: IDS.adv10, level: 10, items: [uuid(IDS.inured)] }),
    itemGrant({ id: IDS.adv14, level: 14, items: [uuid(IDS.control)] })
  ]
});

export const NECROMANCER_ITEMS = applyPresentation(
  [savant, harvest, thralls, inured, control, subclass],
  FOLDER_IDS.necromancer,
  {
    [IDS.savant]: "icons/magic/death/skull-trio-badge-purple.webp",
    [IDS.harvest]: "icons/magic/death/skeleton-skull-soul-blue.webp",
    [IDS.thralls]: "icons/magic/death/undead-skeleton-rags-fire-green.webp",
    [IDS.inured]: "icons/magic/death/skull-flames-white-blue.webp",
    [IDS.control]: "icons/magic/death/hand-dirt-undead-zombie.webp",
    [IDS.subclass]: `modules/${MODULE_ID}/assets/icons/subclasses/necromancer.webp`
  }
);
export const NECROMANCER_IDS = IDS;
