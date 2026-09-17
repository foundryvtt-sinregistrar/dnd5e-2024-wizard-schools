import assert from "node:assert/strict";
import test from "node:test";
import {
  actorTookDamage,
  concentratingOnSchool,
  creatureType,
  findFeature,
  isSingleCreatureActivity,
  isSpellFromSchool,
  spellLevel
} from "../scripts/automation/utils.mjs";
import { isValidGrimHarvestVictim } from "../scripts/automation/grim-harvest.mjs";

test("identifica rasgos por identifier y no por nombre traducido", () => {
  const feature = { type: "feat", system: { identifier: "benign-transposition" } };
  const actor = { items: [{ type: "feat", system: { identifier: "otro" } }, feature] };
  assert.equal(findFeature(actor, "benign-transposition"), feature);
});

test("identifica la escuela y el nivel efectivo de un conjuro", () => {
  const spell = { type: "spell", system: { school: "con", level: 2 } };
  assert.equal(isSpellFromSchool(spell, "con"), true);
  assert.equal(spellLevel(spell, { scaling: { value: 5 } }), 5);
  assert.equal(spellLevel(spell, { scaling: 3 }), 5);
  assert.equal(spellLevel(spell), 2);
});

test("detecta daño en PG o PG temporales", () => {
  const actor = { system: { attributes: { hp: { value: 20, temp: 5 } } } };
  assert.equal(actorTookDamage(actor, { system: { attributes: { hp: { value: 17 } } } }), true);
  assert.equal(actorTookDamage(actor, { system: { attributes: { hp: { temp: 2 } } } }), true);
  assert.equal(actorTookDamage(actor, { "system.attributes.hp.value": 19 }), true);
  assert.equal(actorTookDamage(actor, { system: { attributes: { hp: { value: 20 } } } }), false);
});

test("comprueba la escuela del conjuro mantenido", () => {
  const actor = { concentration: { items: new Set([{ type: "spell", system: { school: "con" } }]) } };
  assert.equal(concentratingOnSchool(actor, "con"), true);
  assert.equal(concentratingOnSchool(actor, "nec"), false);
});

test("Cosecha Siniestra excluye autómatas y muertos vivientes", () => {
  assert.equal(creatureType({ system: { details: { type: { value: "undead" } } } }), "undead");
  assert.equal(isValidGrimHarvestVictim({ system: { details: { type: { value: "construct" } } } }), false);
  assert.equal(isValidGrimHarvestVictim({ system: { details: { type: { value: "humanoid" } } } }), true);
});

test("Duplicar Encantamiento solo acepta actividades de una criatura", () => {
  const single = { target: { template: { type: "" }, affects: { count: "1", type: "creature" } } };
  const area = { target: { template: { type: "sphere" }, affects: { count: "1", type: "creature" } } };
  const multiple = { target: { template: { type: "" }, affects: { count: "3", type: "creature" } } };
  assert.equal(isSingleCreatureActivity(single), true);
  assert.equal(isSingleCreatureActivity(area), false);
  assert.equal(isSingleCreatureActivity(multiple), false);
});
