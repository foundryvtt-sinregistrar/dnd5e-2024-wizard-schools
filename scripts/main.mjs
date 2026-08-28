import {
  MODULE_ID,
  CONTENT_VERSION,
  PACK_NAME,
  PACK_LABEL,
  PACK_COLLECTION,
  CONTENT_ITEMS
} from "../data/index.mjs";

const SETTING_CONTENT_VERSION = "installedContentVersion";

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, SETTING_CONTENT_VERSION, {
    name: "Versión interna del contenido instalado",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });
});

Hooks.once("ready", async () => {
  if ( game.system?.id !== "dnd5e" ) return;
  if ( !game.user?.isGM ) return;

  try {
    const result = await provisionContent();
    await game.settings.set(MODULE_ID, SETTING_CONTENT_VERSION, CONTENT_VERSION);

    if ( result.created || result.updated || result.createdPack ) {
      ui.notifications.info(game.i18n.localize("DND5E2024WIZSCHOOLS.contentInstalled"));
      console.log(`${MODULE_ID} | contenido sincronizado`, result);
    }
  } catch (error) {
    console.error(`${MODULE_ID} | error al instalar el contenido`, error);
    ui.notifications.error(game.i18n.localize("DND5E2024WIZSCHOOLS.contentError"));
  }
});

async function provisionContent() {
  const { pack, createdPack } = await getOrCreateWorldPack();

  // Los compendios de mundo deben estar desbloqueados para poder escribir.
  if ( pack.locked ) await pack.configure({ locked: false });

  let created = 0;
  let updated = 0;
  const toCreate = [];

  for ( const source of CONTENT_ITEMS ) {
    const existing = await pack.getDocument(source._id).catch(() => null);

    if ( !existing ) {
      toCreate.push(foundry.utils.deepClone(source));
      continue;
    }

    const existingVersion = existing.getFlag(MODULE_ID, "contentVersion");
    if ( existingVersion === CONTENT_VERSION ) continue;

    if ( existing.type !== source.type ) {
      await existing.delete();
      toCreate.push(foundry.utils.deepClone(source));
      continue;
    }

    const update = foundry.utils.deepClone(source);
    delete update._id;
    delete update.type;
    delete update.ownership;
    delete update.folder;
    delete update.sort;
    await existing.update(update);
    updated++;
  }

  if ( toCreate.length ) {
    await pack.documentClass.createDocuments(toCreate, {
      pack: pack.collection,
      keepId: true
    });
    created = toCreate.length;
  }

  await pack.getIndex({ fields: ["name", "type", "system.identifier", "system.classIdentifier"] });
  return { createdPack, created, updated, collection: pack.collection };
}

async function getOrCreateWorldPack() {
  let pack = game.packs.get(PACK_COLLECTION);
  if ( pack ) return { pack, createdPack: false };

  const CompendiumClass = globalThis.CompendiumCollection ?? foundry?.documents?.collections?.CompendiumCollection;
  if ( !CompendiumClass?.createCompendium ) {
    throw new Error("La API CompendiumCollection.createCompendium no está disponible.");
  }

  pack = await CompendiumClass.createCompendium({
    name: PACK_NAME,
    label: PACK_LABEL,
    type: "Item",
    package: "world",
    system: "dnd5e"
  });

  if ( !pack ) throw new Error(`No se pudo crear el compendio ${PACK_COLLECTION}.`);
  return { pack, createdPack: true };
}
