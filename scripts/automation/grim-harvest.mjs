import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import {
  automationEnabled,
  creatureType,
  currentTurnKey,
  findFeature,
  postAutomationMessage,
  spellLevel
} from "./utils.mjs";

const DAMAGE_CONTEXT = "grimHarvestDamage";
const claimedActivations = new Set();

function sourceMessage(options) {
  const origin = options?.origin ?? options?.originatingMessage;
  if ( typeof origin === "string" ) return globalThis.fromUuidSync?.(origin) ?? null;
  return origin ?? null;
}

function sourceSpell(message) {
  return message?.getAssociatedItem?.() ?? null;
}

export function isValidGrimHarvestVictim(actor) {
  return !["construct", "undead"].includes(creatureType(actor));
}

async function applyGrimHarvest(target, options) {
  const context = options?.[MODULE_ID]?.[DAMAGE_CONTEXT];
  if ( !context || Number(target.system?.attributes?.hp?.value) > 0 || !isValidGrimHarvestVictim(target) ) return;

  const message = sourceMessage(options);
  const spell = sourceSpell(message);
  const caster = spell?.actor;
  if ( spell?.type !== "spell" || !caster?.isOwner ) return;

  const level = spellLevel(spell, { scaling: message?.system?.scaling });
  if ( level < 1 ) return;
  const feature = findFeature(caster, FEATURE_IDENTIFIERS.grimHarvest);
  if ( !feature ) return;

  const turnKey = currentTurnKey(message?.id ?? message?.uuid ?? spell.uuid);
  const claimKey = `${caster.uuid}:${turnKey}`;
  if ( claimedActivations.has(claimKey) || caster.getFlag(MODULE_ID, "grimHarvestTurn") === turnKey ) return;
  claimedActivations.add(claimKey);

  try {
    await caster.setFlag(MODULE_ID, "grimHarvestTurn", turnKey);
    const multiplier = spell.system?.school === "nec" ? 3 : 2;
    const healing = level * multiplier;
    const before = Number(caster.system?.attributes?.hp?.value ?? 0);
    await caster.applyDamage(-healing, { [MODULE_ID]: { grimHarvestHealing: true } });
    const recovered = Math.max(0, Number(caster.system?.attributes?.hp?.value ?? before) - before);
    await postAutomationMessage(caster, feature.name,
      `<strong>${spell.name}</strong> activa el rasgo: recuperas ${recovered} PG (${healing} posibles).`);
  } catch (error) {
    console.error(`${MODULE_ID} | error al aplicar Cosecha Siniestra`, error);
    ui.notifications.error("No se pudo aplicar automáticamente Cosecha Siniestra.");
  }
}

export function registerGrimHarvestAutomation() {
  Hooks.on("dnd5e.preApplyDamage", (actor, amount, updates, options) => {
    if ( !automationEnabled() || amount <= 0 || options?.[MODULE_ID]?.grimHarvestHealing ) return;
    const previousHp = Number(actor.system?.attributes?.hp?.value ?? 0);
    const resultingHp = Number(updates?.["system.attributes.hp.value"] ?? previousHp);
    if ( previousHp <= 0 || resultingHp > 0 || !sourceMessage(options) ) return;
    options[MODULE_ID] ??= {};
    options[MODULE_ID][DAMAGE_CONTEXT] = true;
  });

  Hooks.on("dnd5e.applyDamage", (actor, _amount, options) => {
    if ( !automationEnabled() ) return;
    void applyGrimHarvest(actor, options);
  });
}
