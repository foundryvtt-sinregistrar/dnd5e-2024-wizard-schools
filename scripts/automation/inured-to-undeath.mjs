import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, findFeature } from "./utils.mjs";

export function preventMaximumHpReduction(actor, changes) {
  const current = Number(actor?.system?.attributes?.hp?.max);
  if ( !Number.isFinite(current) ) return false;

  const nestedHp = changes?.system?.attributes?.hp;
  const proposed = nestedHp?.max ?? changes?.["system.attributes.hp.max"];
  if ( !Number.isFinite(Number(proposed)) || Number(proposed) >= current ) return false;

  if ( nestedHp && Object.hasOwn(nestedHp, "max") ) delete nestedHp.max;
  delete changes["system.attributes.hp.max"];
  return true;
}

export function registerInuredToUndeathAutomation() {
  Hooks.on("preUpdateActor", (actor, changes) => {
    if ( !automationEnabled() || !actor?.isOwner ) return;
    if ( !findFeature(actor, FEATURE_IDENTIFIERS.inuredToUndeath) ) return;
    if ( preventMaximumHpReduction(actor, changes) ) {
      ui.notifications.info(`${actor.name}: Habituado a la Muerte en Vida impide reducir sus PG máximos.`);
    }
  });
}
