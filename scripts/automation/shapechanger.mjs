import { MODULE_ID } from "../../data/index.mjs";
import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled } from "./utils.mjs";

export function findPolymorph(actor) {
  return actor?.items?.find(item => item.type === "spell" && item.system?.identifier === "polymorph") ?? null;
}

async function importPolymorph(actor) {
  const pack = game.packs.get("dnd5e.spells24");
  if ( !pack ) throw new Error("No está disponible el compendio dnd5e.spells24.");
  const index = await pack.getIndex({ fields: ["system.identifier"] });
  const entry = index.find(item => item.system?.identifier === "polymorph" || item.name === "Polymorph");
  if ( !entry ) throw new Error("No se ha encontrado Polymorph en dnd5e.spells24.");
  const source = await pack.getDocument(entry._id);
  const data = source.toObject();
  delete data._id;
  data.flags ??= {};
  data.flags[MODULE_ID] = { importedByShapechanger: true };
  const [created] = await actor.createEmbeddedDocuments("Item", [data]);
  return created;
}

async function useShapechanger(featureActivity) {
  const actor = featureActivity.item.actor;
  try {
    const spell = findPolymorph(actor) ?? await importPolymorph(actor);
    const cast = spell.system.activities?.contents?.[0];
    if ( !cast ) throw new Error("Polymorph no contiene una actividad utilizable.");

    const previousTargets = Array.from(game.user.targets ?? []).map(token => token.id);
    const selfToken = actor.token?.object ?? actor.getActiveTokens?.()[0];
    if ( selfToken ) game.user.updateTokenTargets([selfToken.id]);
    ui.notifications.info("Cambiar de Forma: elige una forma de bestia de VD 1 o inferior.");
    try {
      await cast.use({ consume: { action: false, resources: false, spellSlot: false } });
    } finally {
      if ( selfToken ) game.user.updateTokenTargets(previousTargets);
    }
  } catch (error) {
    console.error(`${MODULE_ID} | no se pudo lanzar Polymorph mediante Cambiar de Forma`, error);
    ui.notifications.error(`Cambiar de Forma no pudo iniciar Polymorph: ${error.message}`);
  }
}

export function registerShapechangerAutomation() {
  Hooks.on("dnd5e.postUseActivity", activity => {
    if ( !automationEnabled() || activity?.item?.system?.identifier !== FEATURE_IDENTIFIERS.shapechanger ) return;
    if ( activity.item.actor?.isOwner ) void useShapechanger(activity);
  });
}
