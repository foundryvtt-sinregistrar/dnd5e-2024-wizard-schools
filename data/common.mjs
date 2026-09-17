export const MODULE_ID = "dnd5e-2024-wizard-schools";
export const CONTENT_VERSION = "1.14.3-presentation.1";
export const PACK_NAME = "classes24";
export const PACK_LABEL = "D&D 2024 - Escuelas de Mago";
export const PACK_COLLECTION = `${MODULE_ID}.${PACK_NAME}`;

export const FOLDER_IDS = Object.freeze({
  conjurer: "wz24FolderConj01",
  enchanter: "wz24FolderEnch01",
  necromancer: "wz24FolderNecr01",
  transmuter: "wz24FolderTran01"
});

export const CONTENT_FOLDERS = Object.freeze([
  { _id: FOLDER_IDS.conjurer, name: "Conjurador", color: "#2386c8", sort: 100000 },
  { _id: FOLDER_IDS.enchanter, name: "Encantador", color: "#b13ca4", sort: 200000 },
  { _id: FOLDER_IDS.necromancer, name: "Nigromante", color: "#29926f", sort: 300000 },
  { _id: FOLDER_IDS.transmuter, name: "Transmutador", color: "#c78226", sort: 400000 }
]);

export function applyPresentation(items, folder, images) {
  return Object.freeze(items.map(item => ({
    ...item,
    img: images[item._id],
    folder
  })));
}

export function featureBase({ id, name, level, identifier, description, uses, activities = {}, effects = [] }) {
  return {
    _id: id,
    name,
    type: "feat",
    system: {
      description: { value: description, chat: "" },
      source: {
        custom: "Adaptación PHB 2014 → reglas de Mago 2024",
        rules: "2024",
        revision: 1,
        license: "",
        book: ""
      },
      uses: uses ?? { max: "", spent: 0, recovery: [] },
      type: { value: "class", subtype: "" },
      prerequisites: { level, repeatable: false },
      properties: [],
      requirements: "",
      activities,
      enchant: {},
      identifier
    },
    effects,
    flags: {
      dnd5e: { riders: { activity: [], effect: [] } },
      [MODULE_ID]: { managed: true, contentVersion: CONTENT_VERSION }
    },
    ownership: { default: 0 }
  };
}

export function utilityActivity({
  id,
  activation = "action",
  activationValue = null,
  activationCondition = "",
  rangeUnits = "self",
  rangeSpecial = "",
  targetType = "self",
  targetSpecial = "",
  consumeItemUse = false,
  name = ""
}) {
  return {
    type: "utility",
    _id: id,
    activation: { type: activation, value: activationValue, condition: activationCondition, override: false },
    consumption: {
      targets: consumeItemUse ? [{ type: "itemUses", target: "", value: "1", scaling: { mode: "", formula: "" } }] : [],
      scaling: { allowed: false, max: "" },
      spellSlot: true
    },
    description: { chatFlavor: "" },
    duration: { concentration: false, value: "", units: "", special: "", override: false },
    effects: [],
    range: { units: rangeUnits, special: rangeSpecial, override: false },
    target: {
      template: { count: "", contiguous: false, type: "", size: "", width: "", height: "", units: "" },
      affects: { count: "", type: targetType, choice: false, special: targetSpecial },
      prompt: true,
      override: false
    },
    roll: { formula: "", name: "", prompt: false, visible: false },
    uses: { spent: 0, recovery: [] },
    sort: 0,
    name
  };
}

export function saveActivity({
  id,
  ability,
  activation = "action",
  activationValue = null,
  activationCondition = "",
  rangeUnits = "ft",
  rangeSpecial = "",
  targetType = "creature",
  targetSpecial = "",
  consumeItemUse = false,
  name = ""
}) {
  return {
    type: "save",
    _id: id,
    activation: { type: activation, value: activationValue, condition: activationCondition, override: false },
    consumption: {
      targets: consumeItemUse ? [{ type: "itemUses", target: "", value: "1", scaling: { mode: "", formula: "" } }] : [],
      scaling: { allowed: false, max: "" },
      spellSlot: true
    },
    description: { chatFlavor: "" },
    duration: { units: "inst", concentration: false, override: false },
    effects: [],
    range: { units: rangeUnits, special: rangeSpecial, override: false },
    target: {
      prompt: true,
      template: { contiguous: false, units: "ft", type: "" },
      affects: { choice: false, count: "1", type: targetType, special: targetSpecial },
      override: false
    },
    damage: { onSave: "none", parts: [] },
    save: { ability, dc: { calculation: "spellcasting", formula: "" } },
    uses: { spent: 0, recovery: [] },
    sort: 0,
    name
  };
}

export function subclassBase({ id, name, identifier, description, advancements }) {
  return {
    _id: id,
    name,
    type: "subclass",
    system: {
      description: { value: description, chat: "" },
      source: {
        custom: "Adaptación PHB 2014 → reglas de Mago 2024",
        rules: "2024",
        revision: 1,
        license: "",
        book: ""
      },
      identifier,
      classIdentifier: "wizard",
      advancement: advancements,
      spellcasting: { progression: "none", ability: "", preparation: { formula: "" } }
    },
    effects: [],
    flags: { [MODULE_ID]: { managed: true, contentVersion: CONTENT_VERSION } },
    ownership: { default: 0 }
  };
}

export function itemGrant({ id, level, items, title = "Rasgos de subclase" }) {
  return {
    _id: id,
    type: "ItemGrant",
    configuration: {
      items: items.map(uuid => ({ uuid, optional: false })),
      optional: false,
      spell: null
    },
    value: {},
    level,
    title
  };
}

export function transferableEffect({ id, name, changes = [], description = "", statuses = [] }) {
  return {
    _id: id,
    name,
    type: "base",
    system: {},
    changes,
    disabled: false,
    duration: {
      startTime: null,
      seconds: null,
      combat: null,
      rounds: null,
      turns: null,
      startRound: null,
      startTurn: null
    },
    description,
    origin: null,
    tint: "#ffffff",
    transfer: true,
    statuses,
    sort: 0,
    flags: {}
  };
}
