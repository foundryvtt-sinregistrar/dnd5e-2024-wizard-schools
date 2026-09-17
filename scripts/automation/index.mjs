import { MODULE_ID } from "../../data/index.mjs";
import { registerBenignTranspositionAutomation } from "./benign-transposition.mjs";
import { AUTOMATION_SETTING } from "./constants.mjs";
import { registerFocusedConjurationAutomation } from "./focused-conjuration.mjs";
import { registerGrimHarvestAutomation } from "./grim-harvest.mjs";
import { registerInuredToUndeathAutomation } from "./inured-to-undeath.mjs";
import { registerSplitEnchantmentAutomation } from "./split-enchantment.mjs";
import { registerSummonAutomation } from "./summons.mjs";

export function registerAutomationSettings() {
  game.settings.register(MODULE_ID, AUTOMATION_SETTING, {
    name: "Automatización de rasgos complejos",
    hint: "Automatiza los rasgos compatibles de las cuatro escuelas. Puede desactivarse para resolverlos manualmente.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });
}

export function registerAutomationHooks() {
  registerBenignTranspositionAutomation();
  registerFocusedConjurationAutomation();
  registerGrimHarvestAutomation();
  registerInuredToUndeathAutomation();
  registerSplitEnchantmentAutomation();
  registerSummonAutomation();
}
