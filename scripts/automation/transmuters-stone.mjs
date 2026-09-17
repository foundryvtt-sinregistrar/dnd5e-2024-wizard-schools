import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, findFeature, isSpellFromSchool, spellLevel } from "./utils.mjs";

const STONE_FLAG = "transmuterStone";
const STONE_EFFECT_ID = "wz24StoneEffect1";

const BENEFITS = Object.freeze({
  darkvision: { label: "Visión en la oscuridad (60 pies)", key: "system.attributes.senses.darkvision", mode: 4, value: "60" },
  speed: { label: "Velocidad +10 pies", key: "system.attributes.movement.walk", mode: 2, value: "10" },
  constitution: { label: "Competencia en salvaciones de Constitución", key: "system.abilities.con.proficient", mode: 4, value: "1" },
  acid: { label: "Resistencia al ácido", key: "system.traits.dr.value", mode: 2, value: "acid" },
  cold: { label: "Resistencia al frío", key: "system.traits.dr.value", mode: 2, value: "cold" },
  fire: { label: "Resistencia al fuego", key: "system.traits.dr.value", mode: 2, value: "fire" },
  lightning: { label: "Resistencia al relámpago", key: "system.traits.dr.value", mode: 2, value: "lightning" },
  thunder: { label: "Resistencia al trueno", key: "system.traits.dr.value", mode: 2, value: "thunder" }
});

export function stoneEffect(benefit) {
  const config = BENEFITS[benefit];
  if ( !config ) return null;
  return {
    _id: STONE_EFFECT_ID,
    name: `Piedra de Transmutador: ${config.label}`,
    img: "icons/commodities/gems/gem-fragments-turquoise.webp",
    type: "base",
    transfer: true,
    disabled: false,
    changes: [{ key: config.key, mode: config.mode, value: config.value, priority: 20 }],
    flags: { [MODULE_ID]: { stoneBenefit: benefit } }
  };
}

export function stoneItemData(creator, benefit) {
  const effect = stoneEffect(benefit);
  return {
    name: "Piedra de Transmutador",
    type: "loot",
    img: "icons/commodities/gems/gem-fragments-turquoise.webp",
    system: {
      description: { value: `<p>Piedra creada por <strong>${creator.name}</strong>.</p><p>Beneficio: ${BENEFITS[benefit].label}.</p><p>El aumento de velocidad solo se aplica mientras el portador no lleve armadura pesada.</p>`, chat: "" },
      quantity: 1,
      identifier: "transmuters-stone-item"
    },
    effects: [effect],
    flags: { [MODULE_ID]: { [STONE_FLAG]: true, creatorUuid: creator.uuid, benefit } }
  };
}

function carriedStone(actor) {
  return actor?.items?.find(item => item.getFlag?.(MODULE_ID, STONE_FLAG)) ?? null;
}

async function chooseBenefit(title) {
  const options = Object.entries(BENEFITS)
    .map(([value, config]) => `<option value="${value}">${config.label}</option>`).join("");
  return foundry.applications.api.DialogV2.wait({
    window: { title },
    content: `<form><div class="form-group"><label>Beneficio</label><select name="benefit">${options}</select></div></form>`,
    buttons: [{
      action: "choose",
      label: "Aplicar beneficio",
      default: true,
      callback: (_event, _button, dialog) => new FormData(dialog.element.querySelector("form")).get("benefit")
    }, { action: "cancel", label: "Cancelar", callback: () => null }],
    close: () => null
  });
}

async function createStone(actor) {
  const benefit = await chooseBenefit("Crear Piedra de Transmutador");
  if ( !benefit ) return;
  const previous = carriedStone(actor);
  if ( previous ) await previous.delete();
  await actor.createEmbeddedDocuments("Item", [stoneItemData(actor, benefit)]);
  ui.notifications.info(`${actor.name} ha creado una Piedra de Transmutador.`);
}

async function changeStoneBenefit(actor, stone) {
  const confirmed = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Piedra de Transmutador" },
    content: "<p>¿Quieres cambiar el beneficio de tu Piedra de Transmutador?</p>",
    yes: { label: "Cambiar beneficio" },
    no: { label: "Conservarlo" },
    rejectClose: false
  });
  if ( !confirmed ) return;
  const benefit = await chooseBenefit("Cambiar beneficio de la piedra");
  if ( !benefit ) return;
  await stone.update({
    "system.description.value": stoneItemData(actor, benefit).system.description.value,
    [`flags.${MODULE_ID}.benefit`]: benefit
  });
  const existing = stone.effects.find(effect => effect.id === STONE_EFFECT_ID);
  if ( existing ) await existing.update(stoneEffect(benefit));
  else await stone.createEmbeddedDocuments("ActiveEffect", [stoneEffect(benefit)], { keepId: true });
}

export function registerTransmutersStoneAutomation() {
  Hooks.on("dnd5e.postUseActivity", (activity, usageConfig) => {
    if ( !automationEnabled() ) return;
    const item = activity?.item;
    const actor = item?.actor;
    if ( !actor?.isOwner ) return;

    if ( item.system?.identifier === FEATURE_IDENTIFIERS.transmutersStone ) {
      void createStone(actor);
      return;
    }
    if ( !isSpellFromSchool(item, "trs") || spellLevel(item, usageConfig) < 1 ) return;
    const stone = carriedStone(actor);
    if ( stone && findFeature(actor, FEATURE_IDENTIFIERS.transmutersStone) ) void changeStoneBenefit(actor, stone);
  });
}
