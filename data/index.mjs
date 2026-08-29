export { MODULE_ID, CONTENT_VERSION, PACK_NAME, PACK_LABEL, PACK_COLLECTION } from "./common.mjs";
import { CONJURER_ITEMS } from "./conjurer.mjs";
import { ENCHANTER_ITEMS } from "./enchanter.mjs";
import { NECROMANCER_ITEMS } from "./necromancer.mjs";
import { TRANSMUTER_ITEMS } from "./transmuter.mjs";

export const CONTENT_ITEMS = Object.freeze([
  ...CONJURER_ITEMS,
  ...ENCHANTER_ITEMS,
  ...NECROMANCER_ITEMS,
  ...TRANSMUTER_ITEMS
]);
