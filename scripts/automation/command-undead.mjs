import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { actorFromOrigin, automationEnabled, creatureType } from "./utils.mjs";

function selectedTarget() {
  return Array.from(game.user?.targets ?? [])[0]?.actor ?? null;
}

export function isCommandUndeadEffect(effect) {
  return effect?.getFlag?.(MODULE_ID, "commandUndead") === true
    || effect?.flags?.[MODULE_ID]?.commandUndead === true;
}

function controlledActors() {
  const actors = new Map(Array.from(game.actors ?? []).map(actor => [actor.uuid, actor]));
  for ( const token of canvas?.scene?.tokens ?? [] ) if ( token.actor ) actors.set(token.actor.uuid, token.actor);
  return actors.values();
}

async function enforceSingleControlledTarget(effect) {
  const caster = actorFromOrigin(effect.origin);
  if ( !caster?.isOwner ) return;
  const deletions = [];
  for ( const actor of controlledActors() ) {
    for ( const existing of actor.effects.filter(isCommandUndeadEffect) ) {
      if ( existing.uuid === effect.uuid ) continue;
      if ( actorFromOrigin(existing.origin)?.uuid === caster.uuid ) deletions.push(existing.delete());
    }
  }
  await Promise.all(deletions);
}

export function registerCommandUndeadAutomation() {
  Hooks.on("dnd5e.preUseActivity", activity => {
    if ( !automationEnabled() || activity?.item?.system?.identifier !== FEATURE_IDENTIFIERS.commandUndead ) return;
    const target = selectedTarget();
    if ( !target ) return;
    if ( creatureType(target) !== "undead" ) {
      ui.notifications.warn("Controlar Muertos Vivientes solo puede afectar a un muerto viviente.");
      return false;
    }
    const intelligence = Number(target.system?.abilities?.int?.value ?? 0);
    if ( intelligence >= 12 ) ui.notifications.info(`${target.name} tiene ventaja y, si falla, repite la salvación cada hora.`);
    else if ( intelligence >= 8 ) ui.notifications.info(`${target.name} tiene ventaja en esta salvación.`);
  });

  Hooks.on("createActiveEffect", effect => {
    if ( automationEnabled() && isCommandUndeadEffect(effect) ) void enforceSingleControlledTarget(effect);
  });
}
