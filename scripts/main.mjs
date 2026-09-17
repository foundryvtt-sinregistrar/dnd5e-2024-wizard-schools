import { MODULE_ID } from "../data/index.mjs";

const LEGACY_PACK_COLLECTION = "world.dnd5e-2024-wizard-schools";
const LEGACY_MIGRATION_SETTING = "legacyPackMigration";

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, LEGACY_MIGRATION_SETTING, {
    name: "Estado de la migración del compendio legado",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });
});

Hooks.once("ready", async () => {
  if ( game.system?.id !== "dnd5e" || !game.user?.isGM ) return;
  if ( game.settings.get(MODULE_ID, LEGACY_MIGRATION_SETTING) === "removed" ) return;

  const legacyPack = game.packs.get(LEGACY_PACK_COLLECTION);
  if ( !legacyPack ) {
    await game.settings.set(MODULE_ID, LEGACY_MIGRATION_SETTING, "not-found");
    return;
  }

  const confirmed = await foundry.applications.api.DialogV2.confirm({
    window: { title: "D&D5e 2024 - Escuelas de Mago" },
    content: `<p>Se ha detectado el compendio de mundo antiguo <strong>${legacyPack.title}</strong>.</p>
      <p>La versión 1.14.2 ya incluye el compendio nativo del módulo. Para evitar subclases duplicadas, elimina el compendio antiguo.</p>
      <p>Esta operación solo elimina el compendio legado; no modifica personajes ni el nuevo compendio.</p>`,
    yes: { label: "Eliminar compendio antiguo" },
    no: { label: "Conservar por ahora" },
    rejectClose: false
  });

  if ( !confirmed ) {
    await game.settings.set(MODULE_ID, LEGACY_MIGRATION_SETTING, "deferred");
    ui.notifications.warn("El compendio antiguo sigue activo y puede mostrar subclases duplicadas.");
    return;
  }

  try {
    await legacyPack.deleteCompendium();
    await game.settings.set(MODULE_ID, LEGACY_MIGRATION_SETTING, "removed");
    ui.notifications.info("Compendio antiguo eliminado. El módulo usa ahora su pack nativo.");
  } catch (error) {
    console.error(`${MODULE_ID} | no se pudo eliminar el compendio legado`, error);
    ui.notifications.error("No se pudo eliminar el compendio antiguo. Elimínalo manualmente para evitar duplicados.");
  }
});
