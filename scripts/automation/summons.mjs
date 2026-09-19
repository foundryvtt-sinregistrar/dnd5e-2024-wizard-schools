import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, classLevel, creatureType, findFeature, isSpellFromSchool } from "./utils.mjs";

const THRALL_DAMAGE_EFFECT_ID = "wz24ThrallDmg01";

export function isEligibleSummon(activity, featureIdentifier, school) {
  const spell = activity?.item;
  return isSpellFromSchool(spell, school) && Boolean(findFeature(spell.actor, featureIdentifier));
}

function addItemEffect(actorUpdates, item, effect) {
  const update = actorUpdates.items.find(entry => entry._id === item.id);
  if ( update ) {
    update.effects ??= item.effects.map(existing => existing.toObject());
    if ( !update.effects.some(existing => existing._id === effect._id) ) update.effects.push(effect);
  } else {
    actorUpdates.items.push({
      _id: item.id,
      effects: [...item.effects.map(existing => existing.toObject()), effect]
    });
  }
}

function applyDurableSummons(activity, config) {
  if ( !isEligibleSummon(activity, FEATURE_IDENTIFIERS.durableSummons, "con") ) return;
  const current = Number(config.actor.system?.attributes?.hp?.temp ?? 0);
  config.actorUpdates["system.attributes.hp.temp"] = Math.max(current, 30);
}

function applyUndeadThralls(activity, config) {
  if ( creatureType(config.actor) !== "undead" ) return;
  if ( !isEligibleSummon(activity, FEATURE_IDENTIFIERS.undeadThralls, "nec") ) return;

  const caster = activity.item.actor;
  const wizardLevel = classLevel(caster, "wizard");
  const proficiency = Number(caster.system?.attributes?.prof ?? 0);
  if ( wizardLevel > 0 ) {
    const hp = config.actor.system?.attributes?.hp;
    config.actorUpdates["system.attributes.hp.max"] = Number(hp?.max ?? 0) + wizardLevel;
    config.actorUpdates["system.attributes.hp.value"] = Number(hp?.value ?? 0) + wizardLevel;
  }
  if ( proficiency <= 0 ) return;

  const effect = {
    _id: THRALL_DAMAGE_EFFECT_ID,
    name: "Siervos Muertos Vivientes: daño",
    img: findFeature(caster, FEATURE_IDENTIFIERS.undeadThralls)?.img,
    type: "enchantment",
    transfer: false,
    disabled: false,
    changes: [{ key: "system.damage.bonus", mode: 2, value: String(proficiency), priority: 20 }],
    flags: { "dnd5e-2024-wizard-schools": { undeadThralls: true } }
  };
  for ( const item of config.actor.items.filter(item => item.type === "weapon") ) {
    addItemEffect(config.actorUpdates, item, effect);
  }
}

export function applySummonFeatures(activity, config) {
  config.actorUpdates ??= { effects: [], items: [] };
  config.actorUpdates.items ??= [];
  applyDurableSummons(activity, config);
  applyUndeadThralls(activity, config);
}

export function registerSummonAutomation() {
  Hooks.on("dnd5e.preSummonToken", (activity, _profile, config) => {
    if ( automationEnabled() ) applySummonFeatures(activity, config);
  });
}
