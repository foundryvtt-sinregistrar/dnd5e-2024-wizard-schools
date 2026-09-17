import assert from "node:assert/strict";
import test from "node:test";
import {
  actorTookDamage,
  classLevel,
  concentratingOnSchool,
  creatureType,
  findFeature,
  isSingleCreatureActivity,
  isSpellFromSchool,
  spellLevel
} from "../scripts/automation/utils.mjs";
import { isValidGrimHarvestVictim } from "../scripts/automation/grim-harvest.mjs";
import { preventMaximumHpReduction } from "../scripts/automation/inured-to-undeath.mjs";
import { isMasterTransmuterActivity } from "../scripts/automation/master-transmuter.mjs";
import { findPolymorph } from "../scripts/automation/shapechanger.mjs";
import { isHypnoticGazeEffect } from "../scripts/automation/hypnotic-gaze.mjs";
import { applySummonFeatures } from "../scripts/automation/summons.mjs";
import { stoneEffect, stoneItemData } from "../scripts/automation/transmuters-stone.mjs";

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

test("Invocaciones Duraderas concede al menos 30 PG temporales", () => {
  const feature = { type: "feat", system: { identifier: "durable-summons" } };
  const caster = { items: [feature] };
  const config = {
    actor: { system: { attributes: { hp: { temp: 7 } }, details: { type: { value: "beast" } } }, items: [] },
    actorUpdates: { effects: [], items: [] }
  };
  applySummonFeatures({ item: { type: "spell", actor: caster, system: { school: "con" } } }, config);
  assert.equal(config.actorUpdates["system.attributes.hp.temp"], 30);
});

test("Siervos Muertos Vivientes aumenta PG y daño de armas", () => {
  const feature = { type: "feat", img: "thralls.webp", system: { identifier: "undead-thralls" } };
  const wizard = { type: "class", system: { identifier: "wizard", levels: 8 } };
  const caster = { items: [feature, wizard], system: { attributes: { prof: 3 } } };
  const weapon = { id: "weapon1", type: "weapon", effects: [] };
  const config = {
    actor: {
      system: { attributes: { hp: { value: 20, max: 20 } }, details: { type: { value: "undead" } } },
      items: [weapon]
    },
    actorUpdates: { effects: [], items: [] }
  };
  assert.equal(classLevel(caster, "wizard"), 8);
  applySummonFeatures({ item: { type: "spell", actor: caster, system: { school: "nec" } } }, config);
  assert.equal(config.actorUpdates["system.attributes.hp.max"], 28);
  assert.equal(config.actorUpdates["system.attributes.hp.value"], 28);
  assert.equal(config.actorUpdates.items[0].effects[0].changes[0].value, "3");
});

test("Habituado a la Muerte en Vida bloquea solo reducciones de PG máximos", () => {
  const actor = { system: { attributes: { hp: { max: 50 } } } };
  const reduction = { "system.attributes.hp.max": 35 };
  assert.equal(preventMaximumHpReduction(actor, reduction), true);
  assert.equal(Object.hasOwn(reduction, "system.attributes.hp.max"), false);

  const increase = { system: { attributes: { hp: { max: 60 } } } };
  assert.equal(preventMaximumHpReduction(actor, increase), false);
  assert.equal(increase.system.attributes.hp.max, 60);
});

test("Piedra de Transmutador crea beneficios transferibles", () => {
  const creator = { name: "Merlín", uuid: "Actor.merlin" };
  const stone = stoneItemData(creator, "fire");
  assert.equal(stone.type, "loot");
  assert.equal(stone.effects[0].transfer, true);
  assert.equal(stone.effects[0].changes[0].value, "fire");
  assert.equal(stoneEffect("constitution").changes[0].key, "system.abilities.con.proficient");
});

test("Maestro Transmutador reconoce únicamente sus cuatro actividades", () => {
  const item = { system: { identifier: "master-transmuter" } };
  assert.equal(isMasterTransmuterActivity({ id: "wz24TraPanAct001", item }), true);
  assert.equal(isMasterTransmuterActivity({ id: "otraActividad", item }), false);
});

test("Cambiar de Forma reutiliza Polymorph si ya está en el libro", () => {
  const polymorph = { type: "spell", system: { identifier: "polymorph" } };
  assert.equal(findPolymorph({ items: [polymorph] }), polymorph);
  assert.equal(findPolymorph({ items: [] }), null);
});

test("Mirada Hipnótica identifica únicamente sus efectos gestionados", () => {
  assert.equal(isHypnoticGazeEffect({ flags: { "dnd5e-2024-wizard-schools": { hypnoticGaze: true } } }), true);
  assert.equal(isHypnoticGazeEffect({ flags: {} }), false);
});
