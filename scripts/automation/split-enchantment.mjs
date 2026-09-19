import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, findFeature, isSingleCreatureActivity, isSpellFromSchool, spellLevel } from "./utils.mjs";

const FLAG = "splitEnchantment";

export function registerSplitEnchantmentAutomation() {
  Hooks.on("dnd5e.preUseActivity", (activity, usageConfig, _dialogConfig, messageConfig) => {
    if ( !automationEnabled() ) return;
    const spell = activity?.item;
    const actor = spell?.actor;
    if ( !actor?.isOwner || !isSpellFromSchool(spell, "enc") || spellLevel(spell, usageConfig) < 1 ) return;
    if ( !findFeature(actor, FEATURE_IDENTIFIERS.splitEnchantment) || !isSingleCreatureActivity(activity) ) return;

    activity.updateSource({ "target.affects.count": "2" });
    messageConfig.data.flags[MODULE_ID] ??= {};
    messageConfig.data.flags[MODULE_ID][FLAG] = true;
  });

  Hooks.on("dnd5e.postCreateUsageMessage", (activity, message) => {
    if ( !message?.getFlag?.(MODULE_ID, FLAG) ) return;
    const selected = message.getFlag("dnd5e", "targets")?.length ?? game.user?.targets?.size ?? 0;
    if ( selected < 2 ) {
      ui.notifications.info(`${activity.item.name}: Duplicar Encantamiento permite seleccionar un segundo objetivo válido.`);
    }
  });
}
