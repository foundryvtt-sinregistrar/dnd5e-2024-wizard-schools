import { ClassicLevel } from "classic-level";
import { fileURLToPath } from "node:url";
import { CONTENT_ITEMS, PACK_COLLECTION } from "../../data/index.mjs";

const expectedPrefix = `Compendium.${PACK_COLLECTION}.Item.`;
const ids = new Set(CONTENT_ITEMS.map(item => item._id));
const errors = [];

if ( CONTENT_ITEMS.length !== 24 ) errors.push(`Se esperaban 24 Items y hay ${CONTENT_ITEMS.length}.`);
if ( ids.size !== CONTENT_ITEMS.length ) errors.push("Hay IDs de Item duplicados.");

for ( const item of CONTENT_ITEMS ) {
  if ( !/^[A-Za-z0-9]{16}$/.test(item._id) ) errors.push(`${item.name}: _id no válido (${item._id}).`);
  if ( !["feat", "subclass"].includes(item.type) ) errors.push(`${item.name}: tipo inesperado (${item.type}).`);

  for ( const advancement of item.system?.advancement ?? [] ) {
    if ( advancement.type !== "ItemGrant" ) continue;
    for ( const granted of advancement.configuration?.items ?? [] ) {
      if ( !granted.uuid.startsWith(expectedPrefix) ) errors.push(`${item.name}: UUID externo o legado (${granted.uuid}).`);
      const targetId = granted.uuid.slice(expectedPrefix.length);
      if ( !ids.has(targetId) ) errors.push(`${item.name}: ItemGrant apunta a un ID inexistente (${targetId}).`);
    }
  }
}

const packPath = fileURLToPath(new URL("../../packs/classes24", import.meta.url));
const db = new ClassicLevel(packPath, { valueEncoding: "json", readOnly: true });
const packedIds = new Set();
for await (const [key] of db.iterator({ gte: "!items!", lt: "!items!~" })) {
  packedIds.add(String(key).slice("!items!".length));
}
await db.close();

if ( packedIds.size !== 24 ) errors.push(`El pack contiene ${packedIds.size} Items, no 24.`);
for ( const id of ids ) if ( !packedIds.has(id) ) errors.push(`Falta ${id} en el pack.`);
for ( const id of packedIds ) if ( !ids.has(id) ) errors.push(`El pack contiene un Item inesperado: ${id}.`);

if ( errors.length ) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Validación correcta: 24 Items, IDs únicos, ItemGrant resueltos y pack sincronizado.");
}
