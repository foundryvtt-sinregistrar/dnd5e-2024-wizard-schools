import { MODULE_ID } from "../../data/index.mjs";
import { AUTOMATION_SETTING } from "./constants.mjs";

export function automationEnabled() {
  return game.settings.get(MODULE_ID, AUTOMATION_SETTING);
}

export function findFeature(actor, identifier) {
  return actor?.items?.find(item => item.type === "feat" && item.system?.identifier === identifier) ?? null;
}

export function spellLevel(item, usageConfig = {}) {
  const baseLevel = Number(item?.system?.level) || 0;
  if ( Number.isFinite(Number(usageConfig.scaling)) ) return baseLevel + Number(usageConfig.scaling);
  const scaledLevel = Number(usageConfig?.scaling?.value ?? usageConfig?.spell?.level);
  return Number.isFinite(scaledLevel) ? Math.max(baseLevel, scaledLevel) : baseLevel;
}

export function isSpellFromSchool(item, school) {
  return item?.type === "spell" && item.system?.school === school;
}

export function actorTookDamage(actor, changes) {
  const previous = actor?.system?.attributes?.hp;
  if ( !previous ) return false;
  const hpValue = changes?.system?.attributes?.hp?.value ?? changes?.["system.attributes.hp.value"];
  const tempValue = changes?.system?.attributes?.hp?.temp ?? changes?.["system.attributes.hp.temp"];
  const hpReduced = Number.isFinite(Number(hpValue)) && Number(hpValue) < Number(previous.value);
  const tempReduced = Number.isFinite(Number(tempValue)) && Number(tempValue) < Number(previous.temp ?? 0);
  return hpReduced || tempReduced;
}

export function concentratingOnSchool(actor, school) {
  return Array.from(actor?.concentration?.items ?? []).some(item => isSpellFromSchool(item, school));
}

export async function postAutomationMessage(actor, title, body) {
  if ( !globalThis.ChatMessage?.implementation ) return;
  await ChatMessage.implementation.create({
    speaker: ChatMessage.implementation.getSpeaker({ actor }),
    content: `<section class="dnd5e chat-card"><header class="card-header flexrow"><h3>${title}</h3></header><div class="card-content"><p>${body}</p></div></section>`
  });
}
