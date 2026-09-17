import {
  FOLDER_IDS,
  MODULE_ID,
  PACK_COLLECTION,
  applyPresentation,
  featureBase,
  itemGrant,
  subclassBase,
  utilityActivity
} from "./common.mjs";

const IDS = Object.freeze({
  subclass: "wz24Transmuter01",
  savant: "wz24TraSavant001",
  alchemy: "wz24TraAlchemy01",
  stone: "wz24TraStone0001",
  shape: "wz24TraShape0001",
  master: "wz24TraMaster001",
  adv3: "wz24TraAdv003001",
  adv6: "wz24TraAdv006001",
  adv10: "wz24TraAdv010001",
  adv14: "wz24TraAdv014001",
  actAlchemy: "wz24TraAlcAct001",
  actStone: "wz24TraStnAct001",
  actShape: "wz24TraShpAct001",
  actMajor: "wz24TraMajAct001",
  actPanacea: "wz24TraPanAct001",
  actLife: "wz24TraLifAct001",
  actYouth: "wz24TraYouAct001"
});

const uuid = id => `Compendium.${PACK_COLLECTION}.Item.${id}`;

const savant = featureBase({
  id: IDS.savant,
  name: "Experto en Transmutación",
  level: 3,
  identifier: "transmutation-savant",
  description: `<p>Elige dos conjuros de mago de la escuela de <strong>Transmutación</strong> de nivel 2 o inferior y añádelos a tu libro de conjuros sin coste.</p><p>Además, siempre que consigas un nuevo nivel de espacios de conjuro de esta clase, puedes añadir un conjuro de mago de Transmutación a tu libro de conjuros sin coste. Debe ser de un nivel para el que tengas espacios de conjuro.</p><section class="secret"><p><strong>Adaptación 2024.</strong> Usa el patrón moderno de los rasgos Experto de las escuelas oficiales.</p></section>`
});

const alchemy = featureBase({
  id: IDS.alchemy,
  name: "Alquimia Menor",
  level: 3,
  identifier: "minor-alchemy",
  description: `<p>Puedes alterar temporalmente un objeto no mágico hecho por completo de madera, piedra no preciosa, hierro, cobre o plata, transformándolo por entero en cualquiera de esos materiales.</p><p>Por cada 10 minutos de trabajo transformas hasta 1 pie cúbico. El objeto recupera su material original tras 1 hora o cuando pierdes la concentración, como si estuvieras concentrándote en un conjuro.</p><section class="secret"><p><strong>Adaptación 2024.</strong> Se obtiene a nivel 3 para ajustarse a la progresión moderna de subclases.</p><p><strong>Automatización.</strong> La actividad inicia una concentración nativa de una hora; la transformación concreta del objeto se describe narrativamente.</p></section>`,
  activities: {
    [IDS.actAlchemy]: utilityActivity({
      id: IDS.actAlchemy,
      activation: "minute",
      activationValue: 10,
      rangeUnits: "touch",
      rangeSpecial: "Toque; 10 minutos por pie cúbico",
      targetType: "object",
      targetSpecial: "Objeto no mágico de madera, piedra no preciosa, hierro, cobre o plata",
      durationConcentration: true,
      durationValue: "1",
      durationUnits: "hour",
      name: "Alquimia Menor"
    })
  }
});

const stone = featureBase({
  id: IDS.stone,
  name: "Piedra de Transmutador",
  level: 6,
  identifier: "transmuters-stone",
  description: `<p>Tras 8 horas de trabajo creas una piedra que almacena magia de Transmutación. Puedes llevarla tú o entregarla a otra criatura. Mientras la posea, el portador obtiene uno de estos beneficios, elegido al crear la piedra:</p><ul><li>Visión en la oscuridad hasta 60 pies.</li><li>Un aumento de 10 pies a su velocidad mientras no esté cargada.</li><li>Competencia en salvaciones de Constitución.</li><li>Resistencia a ácido, frío, fuego, relámpago o trueno, elegido al crear la piedra.</li></ul><p>Cuando lances un conjuro de Transmutación de nivel 1 o superior, puedes cambiar el beneficio de la piedra si la llevas contigo. Si creas una nueva piedra, la anterior deja de existir.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La creación se registra con la actividad. El beneficio elegido debe aplicarse manualmente al portador, ya que la piedra puede cambiar de dueño y de propiedad durante la aventura.</p></section>`,
  activities: {
    [IDS.actStone]: utilityActivity({
      id: IDS.actStone,
      activation: "hour",
      activationValue: 8,
      rangeUnits: "self",
      rangeSpecial: "8 horas de trabajo",
      targetType: "self",
      targetSpecial: "Crea una única Piedra de Transmutador",
      name: "Crear Piedra de Transmutador"
    })
  }
});

const shape = featureBase({
  id: IDS.shape,
  name: "Cambiar de Forma",
  level: 10,
  identifier: "shapechanger",
  description: `<p>Añade <strong>Polimorfar</strong> a tu libro de conjuros si todavía no lo tienes.</p><p>Puedes lanzar Polimorfar sin gastar un espacio de conjuro, pero solo sobre ti mismo y para adoptar la forma de una bestia de valor de desafío 1 o inferior. Una vez que lo lances de esta manera, no puedes volver a hacerlo hasta que finalices un descanso corto o largo. Puedes seguir lanzando Polimorfar normalmente usando espacios de conjuro.</p><section class="secret"><p><strong>Adaptación 2024.</strong> Usa las reglas actuales del conjuro Polimorfar 2024; por tanto, la forma funciona conforme a la versión 2024 del conjuro, no conforme a su texto de 2014.</p><p><strong>Nota de Foundry.</strong> La actividad consume el uso del rasgo. Lanza Polimorfar manualmente sin gastar espacio y aplícalo solo sobre el propio mago.</p></section>`,
  uses: { max: "1", spent: 0, recovery: [{ period: "sr", type: "recoverAll" }] },
  activities: {
    [IDS.actShape]: utilityActivity({
      id: IDS.actShape,
      activation: "action",
      rangeUnits: "self",
      targetType: "self",
      targetSpecial: "Solo tú; bestia de VD 1 o inferior",
      consumeItemUse: true,
      name: "Polimorfar sin espacio"
    })
  }
});

const master = featureBase({
  id: IDS.master,
  name: "Maestro Transmutador",
  level: 14,
  identifier: "master-transmuter",
  description: `<p>Como acción, puedes consumir toda la magia almacenada en tu Piedra de Transmutador para producir uno de los efectos siguientes. La piedra queda destruida y no puedes fabricar otra hasta que finalices un descanso largo.</p><p><strong>Transformación Mayor.</strong> Transforma un objeto no mágico que quepa en un cubo de 5 pies en otro objeto no mágico de tamaño parecido y masa igual o inferior. Debes manipularlo durante 10 minutos.</p><p><strong>Panacea.</strong> Una criatura que toques queda libre de maldiciones, enfermedades y venenos y recupera todos sus puntos de golpe.</p><p><strong>Devolver la Vida.</strong> Puedes lanzar Alzar a los muertos sobre una criatura que toques con la piedra sin gastar espacio de conjuro y sin necesitar tener ese conjuro en tu libro.</p><p><strong>Devolver la juventud.</strong> La edad aparente de una criatura voluntaria que toques se reduce en 3d10 años, hasta un mínimo de 13. Esto no aumenta su esperanza de vida.</p><section class="secret"><p><strong>Nota de Foundry.</strong> Las cuatro actividades consumen el mismo uso del rasgo, que se recupera tras descanso largo. El resultado concreto se aplica manualmente; para Devolver la Vida, resuelve Alzar a los muertos sin gastar espacio.</p></section>`,
  uses: { max: "1", spent: 0, recovery: [{ period: "lr", type: "recoverAll" }] },
  activities: {
    [IDS.actMajor]: utilityActivity({ id: IDS.actMajor, activation: "action", rangeUnits: "touch", targetType: "object", targetSpecial: "Objeto no mágico de hasta un cubo de 5 pies", consumeItemUse: true, name: "Transformación Mayor" }),
    [IDS.actPanacea]: utilityActivity({ id: IDS.actPanacea, activation: "action", rangeUnits: "touch", targetType: "creature", targetSpecial: "Una criatura que toques", consumeItemUse: true, name: "Panacea" }),
    [IDS.actLife]: utilityActivity({ id: IDS.actLife, activation: "action", rangeUnits: "touch", targetType: "creature", targetSpecial: "Criatura válida para Alzar a los muertos", consumeItemUse: true, name: "Devolver la Vida" }),
    [IDS.actYouth]: utilityActivity({ id: IDS.actYouth, activation: "action", rangeUnits: "touch", targetType: "creature", targetSpecial: "Criatura voluntaria", consumeItemUse: true, name: "Devolver la juventud" })
  }
});

const subclass = subclassBase({
  id: IDS.subclass,
  name: "Transmutador",
  identifier: "transmuter",
  description: `<blockquote><p>Altera la materia, la forma y las propiedades de la realidad.</p></blockquote><p>Los transmutadores estudian la magia que modifica energía y materia. Para ellos el mundo es mutable: una sustancia puede convertirse en otra, el cuerpo puede adoptar nuevas formas y una pequeña piedra puede almacenar poderes extraordinarios.</p><section class="secret"><p><strong>Adaptación.</strong> Traslada la Escuela de Transmutación de 2014 a la progresión del Mago 2024: niveles 3, 6, 10 y 14.</p></section>`,
  advancements: [
    itemGrant({ id: IDS.adv3, level: 3, items: [uuid(IDS.savant), uuid(IDS.alchemy)] }),
    itemGrant({ id: IDS.adv6, level: 6, items: [uuid(IDS.stone)] }),
    itemGrant({ id: IDS.adv10, level: 10, items: [uuid(IDS.shape)] }),
    itemGrant({ id: IDS.adv14, level: 14, items: [uuid(IDS.master)] })
  ]
});

export const TRANSMUTER_ITEMS = applyPresentation(
  [savant, alchemy, stone, shape, master, subclass],
  FOLDER_IDS.transmuter,
  {
    [IDS.savant]: "icons/magic/symbols/elements-air-earth-fire-water.webp",
    [IDS.alchemy]: "icons/tools/laboratory/mortar-liquid-pink.webp",
    [IDS.stone]: "icons/commodities/gems/gem-fragments-turquoise.webp",
    [IDS.shape]: "icons/magic/control/silhouette-grow-shrink-tan.webp",
    [IDS.master]: "icons/magic/earth/strike-body-stone-crumble.webp",
    [IDS.subclass]: `modules/${MODULE_ID}/assets/icons/subclasses/transmuter.webp`
  }
);
export const TRANSMUTER_IDS = IDS;
