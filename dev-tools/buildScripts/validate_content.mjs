import { ClassicLevel } from "classic-level";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { CONTENT_FOLDERS, CONTENT_ITEMS, MODULE_ID, PACK_COLLECTION } from "../../data/index.mjs";

const expectedPrefix = `Compendium.${PACK_COLLECTION}.Item.`;
const ids = new Set(CONTENT_ITEMS.map(item => item._id));
const folderIds = new Set(CONTENT_FOLDERS.map(folder => folder._id));
const errors = [];

if ( CONTENT_ITEMS.length !== 24 ) errors.push(`Se esperaban 24 Items y hay ${CONTENT_ITEMS.length}.`);
if ( ids.size !== CONTENT_ITEMS.length ) errors.push("Hay IDs de Item duplicados.");
if ( CONTENT_FOLDERS.length !== 4 ) errors.push(`Se esperaban 4 carpetas y hay ${CONTENT_FOLDERS.length}.`);
if ( folderIds.size !== CONTENT_FOLDERS.length ) errors.push("Hay IDs de carpeta duplicados.");

for ( const item of CONTENT_ITEMS ) {
  if ( !/^[A-Za-z0-9]{16}$/.test(item._id) ) errors.push(`${item.name}: _id no válido (${item._id}).`);
  if ( !["feat", "subclass"].includes(item.type) ) errors.push(`${item.name}: tipo inesperado (${item.type}).`);
  if ( !item.img ) errors.push(`${item.name}: no tiene imagen.`);
  if ( !folderIds.has(item.folder) ) errors.push(`${item.name}: carpeta inexistente (${item.folder}).`);

  if ( item.img?.startsWith(`modules/${MODULE_ID}/`) ) {
    const relativePath = item.img.slice(`modules/${MODULE_ID}/`.length);
    const localPath = fileURLToPath(new URL(`../../${relativePath}`, import.meta.url));
    await access(localPath).catch(() => errors.push(`${item.name}: no existe la imagen local ${item.img}.`));
  }

  for ( const advancement of item.system?.advancement ?? [] ) {
    if ( advancement.type !== "ItemGrant" ) continue;
    for ( const granted of advancement.configuration?.items ?? [] ) {
      if ( !granted.uuid.startsWith(expectedPrefix) ) errors.push(`${item.name}: UUID externo o legado (${granted.uuid}).`);
      const targetId = granted.uuid.slice(expectedPrefix.length);
      if ( !ids.has(targetId) ) errors.push(`${item.name}: ItemGrant apunta a un ID inexistente (${targetId}).`);
    }
  }
}

const minorAlchemy = CONTENT_ITEMS.find(item => item.system?.identifier === "minor-alchemy");
const minorAlchemyActivity = Object.values(minorAlchemy?.system?.activities ?? {})[0];
if ( !minorAlchemyActivity?.duration?.concentration
  || minorAlchemyActivity.duration.value !== "1"
  || minorAlchemyActivity.duration.units !== "hour" ) {
  errors.push("Alquimia Menor no está configurada como concentración de una hora.");
}

const packPath = fileURLToPath(new URL("../../packs/classes24", import.meta.url));
const db = new ClassicLevel(packPath, { valueEncoding: "json", readOnly: true });
const packedIds = new Set();
const packedItems = new Map();
const packedFolderIds = new Set();
for await (const [key, value] of db.iterator({ gte: "!items!", lt: "!items!~" })) {
  const id = String(key).slice("!items!".length);
  packedIds.add(id);
  packedItems.set(id, value);
}
for await (const [key] of db.iterator({ gte: "!folders!", lt: "!folders!~" })) {
  packedFolderIds.add(String(key).slice("!folders!".length));
}
await db.close();

if ( packedIds.size !== 24 ) errors.push(`El pack contiene ${packedIds.size} Items, no 24.`);
for ( const id of ids ) if ( !packedIds.has(id) ) errors.push(`Falta ${id} en el pack.`);
for ( const id of packedIds ) if ( !ids.has(id) ) errors.push(`El pack contiene un Item inesperado: ${id}.`);
for ( const [id, item] of packedItems ) {
  if ( !item.img ) errors.push(`El Item empaquetado ${id} no tiene imagen.`);
  if ( !folderIds.has(item.folder) ) errors.push(`El Item empaquetado ${id} no está en una carpeta válida.`);
}
if ( packedFolderIds.size !== 4 ) errors.push(`El pack contiene ${packedFolderIds.size} carpetas, no 4.`);
for ( const id of folderIds ) if ( !packedFolderIds.has(id) ) errors.push(`Falta la carpeta ${id} en el pack.`);
for ( const id of packedFolderIds ) if ( !folderIds.has(id) ) errors.push(`El pack contiene una carpeta inesperada: ${id}.`);

if ( errors.length ) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Validación correcta: 24 Items con imagen, 4 carpetas, ItemGrant resueltos y pack sincronizado.");
}
