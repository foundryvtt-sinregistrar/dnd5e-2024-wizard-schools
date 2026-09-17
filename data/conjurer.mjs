import {
  CONTENT_VERSION,
  FOLDER_IDS,
  MODULE_ID,
  PACK_COLLECTION,
  applyPresentation,
  featureBase,
  utilityActivity
} from "./common.mjs";

const IDS = Object.freeze({
  subclass: "wz24Conjurer0001",
  savant: "wz24ConjSava0001",
  minor: "wz24MinorConj001",
  benign: "wz24BenignTrn001",
  focused: "wz24FocusConj001",
  durable: "wz24DurableSum01",
  adv3: "wz24CnjAdvLvl003",
  adv6: "wz24CnjAdvLvl006",
  adv10: "wz24CnjAdvLvl010",
  adv14: "wz24CnjAdvLvl014",
  actMinor: "wz24CnjMinorAct1",
  actBenign: "wz24CnjBeniAct01"
});

const uuid = id => `Compendium.${PACK_COLLECTION}.Item.${id}`;

const savant = featureBase({
  id: IDS.savant,
  name: "Experto en Conjuración",
  level: 3,
  identifier: "conjuration-savant",
  description: `<p>Elige dos conjuros de mago de la escuela de <strong>Conjuración</strong> de nivel 2 o inferior y añádelos a tu libro de conjuros sin coste.</p><p>Además, siempre que consigas un nuevo nivel de espacios de conjuro de esta clase, puedes añadir un conjuro de mago de la escuela de Conjuración a tu libro de conjuros sin coste. El conjuro elegido debe ser de un nivel para el que tengas espacios de conjuro.</p><section class="secret"><p><strong>Nota de Foundry.</strong> Igual que el rasgo oficial Experto en Evocación de 2024, la selección de estos conjuros se gestiona manualmente desde el libro de conjuros.</p></section>`
});

const minor = featureBase({
  id: IDS.minor,
  name: "Conjuración Menor",
  level: 3,
  identifier: "minor-conjuration",
  description: `<p>Como acción, puedes conjurar un objeto inanimado en tu mano o en el suelo, en un espacio desocupado que puedas ver a 10 pies o menos de ti. El objeto no puede medir más de 3 pies en cualquiera de sus lados ni pesar más de 10 libras y debe tener la forma de un objeto no mágico que hayas visto antes.</p><p>El objeto es claramente mágico: emite luz tenue en un radio de 5 pies y desaparece tras 1 hora, cuando vuelves a usar este rasgo o si causa o recibe cualquier cantidad de daño.</p><section class="secret"><p><strong>Adaptación 2024.</strong> El rasgo de 2014 se obtiene aquí a nivel 3 para ajustarse a la progresión de subclases del Mago 2024.</p></section>`,
  activities: {
    [IDS.actMinor]: utilityActivity({ id: IDS.actMinor, activation: "action", rangeUnits: "ft", rangeSpecial: "10 pies; objeto en tu mano o en un espacio desocupado visible", targetType: "self", targetSpecial: "Crea un objeto inanimado no mágico que hayas visto" })
  }
});

const benign = featureBase({
  id: IDS.benign,
  name: "Trasposición Benigna",
  level: 6,
  identifier: "benign-transposition",
  description: `<p>Como acción, puedes teletransportarte hasta 30 pies a un espacio desocupado que puedas ver. Alternativamente, puedes elegir un espacio dentro del alcance ocupado por una criatura Pequeña o Mediana. Si la criatura es voluntaria, ambos os teletransportáis e intercambiáis vuestras posiciones.</p><p>Una vez utilizado este rasgo, debes finalizar un descanso largo o lanzar un conjuro de Conjuración de nivel 1 o superior para poder volver a usarlo.</p><section class="secret"><p><strong>Automatización.</strong> El uso se recupera al finalizar un descanso largo y también al lanzar un conjuro de Conjuración de nivel 1 o superior.</p></section>`,
  uses: { max: "1", spent: 0, recovery: [{ period: "lr", type: "recoverAll" }] },
  activities: {
    [IDS.actBenign]: utilityActivity({ id: IDS.actBenign, activation: "action", rangeUnits: "ft", rangeSpecial: "30 pies", targetType: "self", targetSpecial: "Teletranspórtate; opcionalmente intercambia posición con una criatura voluntaria Pequeña o Mediana", consumeItemUse: true })
  }
});

const focused = featureBase({
  id: IDS.focused,
  name: "Conjuración Concentrada",
  level: 10,
  identifier: "focused-conjuration",
  description: `<p>Recibir daño no te hace perder la concentración en tus conjuros de Conjuración.</p><section class="secret"><p><strong>Automatización.</strong> Foundry omite la prueba de concentración causada por daño solo cuando estás concentrado en un conjuro de Conjuración. Otras causas de pérdida de concentración no cambian.</p></section>`
});

const durable = featureBase({
  id: IDS.durable,
  name: "Invocaciones Duraderas",
  level: 14,
  identifier: "durable-summons",
  description: `<p>Cualquier criatura que invoques o crees con un conjuro de Conjuración posee 30 puntos de golpe temporales.</p><section class="secret"><p><strong>Nota de Foundry.</strong> Aplica 30 PG temporales a la criatura invocada o creada cuando corresponda. Esta primera versión no modifica automáticamente actores o tokens generados por conjuros de invocación.</p></section>`
});

const subclass = {
  _id: IDS.subclass,
  name: "Conjurador",
  type: "subclass",
  system: {
    description: {
      value: `<blockquote><p>Crea objetos, invoca criaturas y domina el transporte mágico.</p></blockquote><p>Como conjurador, prefieres los conjuros que crean objetos y criaturas a partir de la nada. Puedes invocar nieblas, convocar criaturas para que combatan por ti y, a medida que aumenta tu dominio de la magia, emplear conjuros de transporte para teletransportarte grandes distancias e incluso viajar a otros planos de existencia.</p><section class="secret"><p><strong>Adaptación.</strong> Esta subclase traslada la Escuela de Conjuración del Manual del Jugador de 2014 a la progresión de subclases del Mago 2024 (niveles 3, 6, 10 y 14). Experto en Conjuración usa el patrón del rasgo Experto en Evocación de 2024.</p></section>`,
      chat: ""
    },
    source: {
      custom: "Adaptación PHB 2014 → reglas de Mago 2024",
      rules: "2024",
      revision: 1,
      license: "",
      book: ""
    },
    identifier: "conjurer",
    classIdentifier: "wizard",
    advancement: [
      {
        _id: IDS.adv3,
        type: "ItemGrant",
        configuration: {
          items: [
            { uuid: uuid(IDS.savant), optional: false },
            { uuid: uuid(IDS.minor), optional: false }
          ],
          optional: false,
          spell: null
        },
        value: {},
        level: 3,
        title: "Rasgos de subclase"
      },
      {
        _id: IDS.adv6,
        type: "ItemGrant",
        configuration: { items: [{ uuid: uuid(IDS.benign), optional: false }], optional: false, spell: null },
        value: {},
        level: 6,
        title: "Rasgos de subclase"
      },
      {
        _id: IDS.adv10,
        type: "ItemGrant",
        configuration: { items: [{ uuid: uuid(IDS.focused), optional: false }], optional: false, spell: null },
        value: {},
        level: 10,
        title: "Rasgos de subclase"
      },
      {
        _id: IDS.adv14,
        type: "ItemGrant",
        configuration: { items: [{ uuid: uuid(IDS.durable), optional: false }], optional: false, spell: null },
        value: {},
        level: 14,
        title: "Rasgos de subclase"
      }
    ],
    spellcasting: { progression: "none", ability: "", preparation: { formula: "" } }
  },
  effects: [],
  flags: { [MODULE_ID]: { managed: true, contentVersion: CONTENT_VERSION } },
  ownership: { default: 0 }
};

export const CONJURER_ITEMS = applyPresentation(
  [savant, minor, benign, focused, durable, subclass],
  FOLDER_IDS.conjurer,
  {
    [IDS.savant]: "icons/sundries/documents/blueprint-recipe-magic.webp",
    [IDS.minor]: "icons/commodities/gems/gem-fragments-turquoise.webp",
    [IDS.benign]: "icons/skills/movement/ball-spinning-blue.webp",
    [IDS.focused]: "icons/magic/defensive/shield-barrier-glowing-triangle-blue.webp",
    [IDS.durable]: "icons/creatures/magical/spirit-mischief-fire-ice-blue.webp",
    [IDS.subclass]: `modules/${MODULE_ID}/assets/icons/subclasses/conjurer.webp`
  }
);
export const CONJURER_IDS = IDS;
