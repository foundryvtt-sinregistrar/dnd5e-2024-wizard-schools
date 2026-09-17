import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { ClassicLevel } from "classic-level";
import { CONTENT_FOLDERS, CONTENT_ITEMS } from "../../data/index.mjs";

const packPath = fileURLToPath(new URL("../../packs/classes24", import.meta.url));
await rm(packPath, { recursive: true, force: true });

const db = new ClassicLevel(packPath, { valueEncoding: "json" });
const operations = [];
const stats = {
  compendiumSource: null,
  duplicateSource: null,
  coreVersion: "14.363",
  systemId: "dnd5e",
  systemVersion: "5.2.0",
  createdTime: Date.UTC(2026, 8, 21),
  modifiedTime: Date.UTC(2026, 8, 21),
  lastModifiedBy: null,
  exportSource: null
};

for ( const source of CONTENT_FOLDERS ) {
  const folder = {
    ...structuredClone(source),
    type: "Item",
    folder: null,
    description: "",
    sorting: "m",
    flags: {},
    _stats: structuredClone(stats)
  };
  operations.push({ type: "put", key: `!folders!${folder._id}`, value: folder });
}

for ( const source of CONTENT_ITEMS ) {
  const item = structuredClone(source);
  const effects = item.effects ?? [];
  item.effects = effects.map(effect => effect._id);
  item.folder ??= null;
  item.sort ??= 0;
  item._stats = structuredClone(stats);

  operations.push({ type: "put", key: `!items!${item._id}`, value: item });
  for ( const effect of effects ) {
    const embedded = structuredClone(effect);
    embedded.folder ??= null;
    embedded._stats = structuredClone(item._stats);
    operations.push({
      type: "put",
      key: `!items.effects!${item._id}.${embedded._id}`,
      value: embedded
    });
  }
}

await db.batch(operations);
await db.close();
console.log(`Pack generado: ${CONTENT_ITEMS.length} Items en ${CONTENT_FOLDERS.length} carpetas en ${packPath}`);
