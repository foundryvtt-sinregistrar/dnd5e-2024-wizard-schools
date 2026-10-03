import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { CONTENT_FOLDERS, CONTENT_ITEMS } from "../../data/index.mjs";

const argument = process.argv.indexOf("--translation");
if (argument < 0 || !process.argv[argument + 1]) throw new Error("Usage: node validate-localizations.mjs --translation <file>");
const translation = JSON.parse(await readFile(resolve(process.argv[argument + 1]), "utf8"));
const errors = [];

for (const folder of CONTENT_FOLDERS) if (!translation.folders?.[folder.name]) errors.push(`Missing folder translation: ${folder.name}`);
for (const item of CONTENT_ITEMS) {
  const entry = translation.entries?.[item._id];
  if (!entry) { errors.push(`Missing item translation: ${item._id}`); continue; }
  if (!entry.name || !entry.description) errors.push(`Missing visible text: ${item._id}`);
  for (const id of Object.keys(item.system?.activities ?? {})) if (!entry.activities?.[id]) errors.push(`Missing activity ${id} in ${item._id}`);
  for (const effect of item.effects ?? []) if (!entry.effects?.[effect._id]) errors.push(`Missing effect ${effect._id} in ${item._id}`);
  for (const advancement of item.system?.advancement ?? []) if (!entry.advancement?.[advancement._id]) errors.push(`Missing advancement ${advancement._id} in ${item._id}`);
}
for (const id of Object.keys(translation.entries ?? {})) if (!CONTENT_ITEMS.some(item => item._id === id)) errors.push(`Orphan translation: ${id}`);
if (errors.length) throw new Error(errors.join("\n"));
console.log(`Localization coverage valid: ${CONTENT_ITEMS.length} items, ${CONTENT_FOLDERS.length} folders.`);
