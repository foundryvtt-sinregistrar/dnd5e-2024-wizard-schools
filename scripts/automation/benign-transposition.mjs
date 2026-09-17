import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, findFeature, isSpellFromSchool, postAutomationMessage, spellLevel } from "./utils.mjs";

export function registerBenignTranspositionAutomation() {
  Hooks.on("dnd5e.postUseActivity", async (activity, usageConfig) => {
    if ( !automationEnabled() ) return;
    const spell = activity?.item;
    const actor = spell?.actor;
    if ( !actor?.isOwner || !isSpellFromSchool(spell, "con") || spellLevel(spell, usageConfig) < 1 ) return;

    const feature = findFeature(actor, FEATURE_IDENTIFIERS.benignTransposition);
    if ( !feature || Number(feature.system?.uses?.spent ?? 0) < 1 ) return;

    await feature.update({ "system.uses.spent": 0 });
    await postAutomationMessage(actor, feature.name,
      `El lanzamiento de <strong>${spell.name}</strong> ha recuperado el uso de este rasgo.`);
  });
}
