import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, postAutomationMessage } from "./utils.mjs";
import { carriedStone } from "./transmuters-stone.mjs";

const ACTIVITIES = Object.freeze({
  major: "wz24TraMajAct001",
  panacea: "wz24TraPanAct001",
  life: "wz24TraLifAct001",
  youth: "wz24TraYouAct001"
});

export function isMasterTransmuterActivity(activity) {
  return activity?.item?.system?.identifier === FEATURE_IDENTIFIERS.masterTransmuter
    && Object.values(ACTIVITIES).includes(activity.id);
}

function targetedActor() {
  const token = game.user?.targets?.first?.() ?? Array.from(game.user?.targets ?? [])[0];
  return token?.actor ?? null;
}

async function applyPanacea(caster, target) {
  if ( !target?.isOwner ) {
    ui.notifications.warn("Panacea: selecciona un objetivo que puedas modificar.");
    return;
  }
  const hp = target.system?.attributes?.hp;
  const healing = Math.max(0, Number(hp?.max ?? 0) - Number(hp?.value ?? 0));
  if ( healing ) await target.applyDamage(-healing, { [MODULE_ID]: { masterTransmuterHealing: true } });
  const poisoned = target.effects.filter(effect => effect.statuses?.has?.("poisoned"));
  if ( poisoned.length ) await target.deleteEmbeddedDocuments("ActiveEffect", poisoned.map(effect => effect.id));
  await postAutomationMessage(caster, "Maestro Transmutador: Panacea",
    `${target.name} recupera todos sus PG y queda libre del estado Envenenado. Revisa manualmente maldiciones, enfermedades y otros venenos.`);
}

async function applyMasterTransmuter(activity) {
  const caster = activity.item.actor;
  const stone = carriedStone(caster);
  if ( !stone ) return;
  await stone.delete();

  if ( activity.id === ACTIVITIES.panacea ) {
    await applyPanacea(caster, targetedActor());
  } else if ( activity.id === ACTIVITIES.youth ) {
    const roll = await new Roll("3d10").evaluate();
    await roll.toMessage({
      speaker: ChatMessage.implementation.getSpeaker({ actor: caster }),
      flavor: "Maestro Transmutador: años de juventud recuperados (mínimo aparente de 13 años)"
    });
  } else {
    const instruction = activity.id === ACTIVITIES.life
      ? "La piedra se ha consumido. Resuelve Alzar a los muertos sin espacio ni componente de conjuro."
      : "La piedra se ha consumido. Describe la transformación del objeto tras 10 minutos de trabajo.";
    await postAutomationMessage(caster, `Maestro Transmutador: ${activity.name}`, instruction);
  }
}

export function registerMasterTransmuterAutomation() {
  Hooks.on("dnd5e.preUseActivity", activity => {
    if ( !automationEnabled() || !isMasterTransmuterActivity(activity) ) return;
    const actor = activity.item.actor;
    if ( carriedStone(actor) ) return;
    ui.notifications.warn("Necesitas llevar tu Piedra de Transmutador para usar este rasgo.");
    return false;
  });

  Hooks.on("dnd5e.postUseActivity", activity => {
    if ( automationEnabled() && isMasterTransmuterActivity(activity) ) void applyMasterTransmuter(activity);
  });
}
