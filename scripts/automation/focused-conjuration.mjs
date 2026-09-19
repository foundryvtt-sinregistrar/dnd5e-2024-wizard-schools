import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { actorTookDamage, automationEnabled, concentratingOnSchool, findFeature } from "./utils.mjs";

export function registerFocusedConjurationAutomation() {
  Hooks.on("preUpdateActor", (actor, changes, options) => {
    if ( !automationEnabled() || !actor?.isOwner ) return;
    if ( !findFeature(actor, FEATURE_IDENTIFIERS.focusedConjuration) ) return;
    if ( !actorTookDamage(actor, changes) || !concentratingOnSchool(actor, "con") ) return;

    options.dnd5e ??= {};
    options.dnd5e.concentrationCheck = false;
  });
}
