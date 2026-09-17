import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { actorFromOrigin, automationEnabled, findFeature } from "./utils.mjs";

const IMMUNITIES_FLAG = "hypnoticGazeImmunities";

function selectedTarget() {
  return Array.from(game.user?.targets ?? [])[0]?.actor ?? null;
}

export function isHypnoticGazeEffect(effect) {
  return effect?.getFlag?.(MODULE_ID, "hypnoticGaze") === true
    || effect?.flags?.[MODULE_ID]?.hypnoticGaze === true;
}

async function recordImmunity(effect) {
  const caster = actorFromOrigin(effect.origin);
  const target = effect.parent;
  if ( !caster?.isOwner || !target?.uuid ) return;
  const immunities = new Set(caster.getFlag(MODULE_ID, IMMUNITIES_FLAG) ?? []);
  immunities.add(target.uuid);
  await caster.setFlag(MODULE_ID, IMMUNITIES_FLAG, Array.from(immunities));
}

export function registerHypnoticGazeAutomation() {
  Hooks.on("dnd5e.preUseActivity", activity => {
    if ( !automationEnabled() || activity?.item?.system?.identifier !== FEATURE_IDENTIFIERS.hypnoticGaze ) return;
    const target = selectedTarget();
    const immunities = activity.item.actor?.getFlag(MODULE_ID, IMMUNITIES_FLAG) ?? [];
    if ( target && immunities.includes(target.uuid) ) {
      ui.notifications.warn(`${target.name} es inmune a la Mirada Hipnótica de este mago hasta su próximo descanso largo.`);
      return false;
    }
  });

  Hooks.on("dnd5e.damageActor", actor => {
    if ( !automationEnabled() || !actor?.isOwner ) return;
    const effects = actor.effects.filter(isHypnoticGazeEffect);
    if ( effects.length ) void actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(effect => effect.id));
  });

  Hooks.on("deleteActiveEffect", effect => {
    if ( automationEnabled() && isHypnoticGazeEffect(effect) ) void recordImmunity(effect);
  });

  Hooks.on("dnd5e.restCompleted", (actor, _result, config) => {
    if ( !automationEnabled() || config?.type !== "long" || !actor?.isOwner ) return;
    if ( findFeature(actor, FEATURE_IDENTIFIERS.hypnoticGaze) && actor.getFlag(MODULE_ID, IMMUNITIES_FLAG)?.length ) {
      void actor.unsetFlag(MODULE_ID, IMMUNITIES_FLAG);
    }
  });
}
