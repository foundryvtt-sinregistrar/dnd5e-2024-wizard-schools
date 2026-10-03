/* Canonical presentation text. IDs and mechanical fields stay in the school definitions. */
export const ENGLISH_FOLDERS = Object.freeze({
  wz24FolderConj01: "Conjurer",
  wz24FolderEnch01: "Enchanter",
  wz24FolderNecr01: "Necromancer",
  wz24FolderTran01: "Transmuter"
});

const note = "<section class=\"secret\"><p><strong>Foundry automation.</strong> "
  + "Use the activity and review narrative conditions that Foundry cannot determine.</p></section>";

export const ENGLISH_ENTRIES = Object.freeze({
  wz24ConjSava0001: ["Conjuration Savant", "<p>Choose two Wizard spells of 2nd level or lower from the <strong>Conjuration</strong> school and add them to your spellbook at no cost. Whenever you gain access to a new Wizard spell-slot level, add one Conjuration Wizard spell of a level for which you have slots to your spellbook at no cost.</p>" + note],
  wz24MinorConj001: ["Minor Conjuration", "<p>As an action, conjure an inanimate object in your hand or on the ground in an unoccupied space you can see within 10 feet. It can be no larger than 3 feet on a side, weigh no more than 10 pounds, and must be a nonmagical object you have seen. It sheds dim light for 5 feet and disappears after 1 hour, when you use this feature again, or when it deals or takes damage.</p>" + note],
  wz24BenignTrn001: ["Benign Transposition", "<p>As an action, teleport up to 30 feet to an unoccupied space you can see. Alternatively, choose a space in range occupied by a willing Small or Medium creature; you and that creature teleport and swap places. Once used, this feature returns after a Long Rest or when you cast a Conjuration spell of 1st level or higher.</p>" + note],
  wz24FocusConj001: ["Focused Conjuration", "<p>Taking damage does not cause you to lose concentration on Conjuration spells.</p>" + note],
  wz24DurableSum01: ["Durable Summons", "<p>Any creature you summon or create with a Conjuration spell has 30 Temporary Hit Points.</p>" + note],
  wz24Conjurer0001: ["Conjurer", "<blockquote><p>Create objects, summon creatures, and master magical transportation.</p></blockquote><p>This subclass adapts the 2014 School of Conjuration to 2024 Wizard subclass levels: 3, 6, 10, and 14.</p>" + note],
  wz24EncSavant001: ["Enchantment Savant", "<p>Choose two Wizard spells of 2nd level or lower from the <strong>Enchantment</strong> school and add them to your spellbook at no cost. Whenever you gain access to a new Wizard spell-slot level, add one eligible Enchantment Wizard spell to your spellbook at no cost.</p>" + note],
  wz24EncHypnot001: ["Hypnotic Gaze", "<p>As an action, choose one creature within 5 feet that can see or hear you. It makes a Wisdom save against your Wizard spell save DC. On a failure, it is Charmed and Incapacitated, its speed is 0, and it remains so until the end of your next turn. You can use later actions to maintain the effect. It ends if you move more than 5 feet away, the creature cannot see or hear you, or it takes damage. A creature that succeeds, or when the effect ends, is immune to this feature from you until your next Long Rest.</p>" + note],
  wz24EncInstin001: ["Instinctive Charm", "<p>When a creature you can see within 30 feet makes an attack roll against you, you can use your Reaction before knowing whether it hits. The attacker makes a Wisdom save against your Wizard spell save DC. On a failure, it must target the nearest other eligible creature. A creature immune to being Charmed is unaffected; a creature that succeeds is immune until your next Long Rest.</p>" + note],
  wz24EncTwinEn001: ["Split Enchantment", "<p>When you cast an Enchantment spell of 1st level or higher that targets only one creature, you can make it target a second eligible creature.</p>" + note],
  wz24EncMemory001: ["Alter Memories", "<p>When you cast an Enchantment spell that Charms one or more creatures, one of them can remain unaware that it was Charmed. Before the spell ends, you can use an action to make that creature attempt an Intelligence save against your Wizard spell save DC. On a failure, it forgets up to 1 + your Charisma modifier hours (minimum 1 hour), never exceeding the spell's duration.</p>" + note],
  wz24Enchanter001: ["Enchanter", "<blockquote><p>Beguile, pacify, and command minds.</p></blockquote><p>This subclass adapts the 2014 School of Enchantment to 2024 Wizard subclass levels: 3, 6, 10, and 14.</p>" + note],
  wz24NecSavant001: ["Necromancy Savant", "<p>Choose two Wizard spells of 2nd level or lower from the <strong>Necromancy</strong> school and add them to your spellbook at no cost. Whenever you gain access to a new Wizard spell-slot level, add one eligible Necromancy Wizard spell to your spellbook at no cost.</p>" + note],
  wz24NecHarvest01: ["Grim Harvest", "<p>Once per turn when you kill one or more creatures with a spell of 1st level or higher, regain Hit Points equal to twice the spell's level, or three times its level if it is a Necromancy spell. You gain no benefit for killing Constructs or Undead.</p>" + note],
  wz24NecThrall001: ["Undead Thralls", "<p>Add <strong>Animate Dead</strong> to your spellbook if it is not already there. When you cast it, you can target one additional corpse or pile of bones. Each Undead you create with a Necromancy spell gains maximum Hit Points equal to your Wizard level and adds your Proficiency Bonus to its weapon damage rolls.</p>" + note],
  wz24NecInured001: ["Inured to Undeath", "<p>You have Resistance to Necrotic damage, and your Hit Point maximum cannot be reduced.</p>" + note],
  wz24NecContrl001: ["Command Undead", "<p>As an action, choose one Undead you can see within 60 feet. It makes a Charisma save against your Wizard spell save DC. On a failure it becomes friendly and obeys you until you use this feature again. On a success, you cannot use this feature on it again. An Undead with Intelligence 8 or higher has Advantage; with Intelligence 12 or higher it repeats a failed save at the end of each hour.</p>" + note],
  wz24Necromanc001: ["Necromancer", "<blockquote><p>Manipulate the forces of life, death, and undeath.</p></blockquote><p>This subclass adapts the 2014 School of Necromancy to 2024 Wizard subclass levels: 3, 6, 10, and 14.</p>" + note],
  wz24TraSavant001: ["Transmutation Savant", "<p>Choose two Wizard spells of 2nd level or lower from the <strong>Transmutation</strong> school and add them to your spellbook at no cost. Whenever you gain access to a new Wizard spell-slot level, add one eligible Transmutation Wizard spell to your spellbook at no cost.</p>" + note],
  wz24TraAlchemy01: ["Minor Alchemy", "<p>You can temporarily alter one nonmagical object made entirely of wood, nonprecious stone, iron, copper, or silver into another of those materials. Each 10 minutes of work affects up to 1 cubic foot. The object returns to its original material after 1 hour or when you lose concentration, as if concentrating on a spell.</p>" + note],
  wz24TraStone0001: ["Transmuter's Stone", "<p>After 8 hours of work, create a stone that stores Transmutation magic. Its bearer gains one chosen benefit: darkvision 60 feet, +10 feet Speed while unarmored, Constitution saving throw proficiency, or Resistance to acid, cold, fire, lightning, or thunder. You can change the benefit when you cast a Transmutation spell of 1st level or higher while carrying it. Creating another stone destroys the old one.</p>" + note],
  wz24TraShape0001: ["Shapechanger", "<p>Add <strong>Polymorph</strong> to your spellbook if it is not already there. You can cast it without a spell slot, only on yourself, to become a Beast of Challenge Rating 1 or lower. Once you do so, you cannot do so again until you finish a Short or Long Rest.</p>" + note],
  wz24TraMaster001: ["Master Transmuter", "<p>As an action, consume your Transmuter's Stone for one effect: Major Transformation; Panacea, which cures curses, diseases, and poisons and restores all Hit Points; Restore Life, allowing Raise Dead without a slot; or Restore Youth, reducing a willing creature's apparent age by 3d10 years to a minimum of 13. The stone is destroyed and cannot be remade until a Long Rest.</p>" + note],
  wz24Transmuter01: ["Transmuter", "<blockquote><p>Alter matter, form, and the properties of reality.</p></blockquote><p>This subclass adapts the 2014 School of Transmutation to 2024 Wizard subclass levels: 3, 6, 10, and 14.</p>" + note]
});

const ACTIVITY_NAMES = Object.freeze({
  wz24CnjMinorAct1: "Minor Conjuration", wz24CnjBeniAct01: "Benign Transposition",
  wz24EncHypAct001: "Hypnotic Gaze", wz24EncInsAct001: "Instinctive Charm", wz24EncMemAct001: "Forget Charmed Time",
  wz24NecCtlAct001: "Command Undead",
  wz24TraAlcAct001: "Minor Alchemy", wz24TraStnAct001: "Create Transmuter's Stone", wz24TraShpAct001: "Slotless Polymorph",
  wz24TraMajAct001: "Major Transformation", wz24TraPanAct001: "Panacea", wz24TraLifAct001: "Restore Life", wz24TraYouAct001: "Restore Youth"
});

const ACTIVITY_TEXT = Object.freeze({
  wz24CnjMinorAct1: { range: { special: "10 feet; in your hand or a visible unoccupied space" }, target: { affects: { special: "A nonmagical inanimate object you have seen" } } },
  wz24CnjBeniAct01: { range: { special: "30 feet" }, target: { affects: { special: "Teleport; optionally swap places with a willing Small or Medium creature" } } },
  wz24EncHypAct001: { range: { special: "5 feet" }, target: { affects: { special: "One creature that can see or hear you" } } },
  wz24EncInsAct001: { activation: { condition: "When a visible creature within 30 feet targets you with an attack roll, before knowing whether it hits" }, range: { special: "30 feet" }, target: { affects: { special: "The attacker" } } },
  wz24EncMemAct001: { activation: { condition: "Once before an Enchantment spell that Charmed the target ends" }, range: { special: "The creature affected by your Enchantment spell" }, target: { affects: { special: "One creature Charmed by your spell" } } },
  wz24NecCtlAct001: { range: { special: "60 feet" }, target: { affects: { special: "One visible Undead" } } },
  wz24TraAlcAct001: { range: { special: "Touch; 10 minutes per cubic foot" }, target: { affects: { special: "A nonmagical object of wood, nonprecious stone, iron, copper, or silver" } } },
  wz24TraStnAct001: { range: { special: "8 hours of work" }, target: { affects: { special: "Create one Transmuter's Stone" } } },
  wz24TraShpAct001: { target: { affects: { special: "Only you; Beast CR 1 or lower" } } },
  wz24TraMajAct001: { target: { affects: { special: "A nonmagical object up to a 5-foot cube" } } },
  wz24TraPanAct001: { target: { affects: { special: "One creature you touch" } } },
  wz24TraLifAct001: { target: { affects: { special: "A creature eligible for Raise Dead" } } },
  wz24TraYouAct001: { target: { affects: { special: "One willing creature" } } }
});

const EFFECT_NAMES = Object.freeze({
  wz24HypnoEffect1: "Hypnotic Gaze", wz24NecResist001: "Necrotic Resistance", wz24ControlEff01: "Controlled by Master Necromancer"
});

export function applyEnglishPresentation(items) {
  return Object.freeze(items.map(item => {
    const [name, description] = ENGLISH_ENTRIES[item._id] ?? [];
    const activities = Object.fromEntries(Object.entries(item.system?.activities ?? {}).map(([id, activity]) => {
      const patch = ACTIVITY_TEXT[id] ?? {};
      return [id, { ...activity, ...patch, activation: { ...activity.activation, ...patch.activation }, range: { ...activity.range, ...patch.range }, target: { ...activity.target, ...patch.target, affects: { ...activity.target?.affects, ...patch.target?.affects } }, name: ACTIVITY_NAMES[id] ?? activity.name }];
    }));
    const system = { ...item.system, description: { ...item.system.description, value: description ?? item.system.description.value }, source: { ...item.system.source, custom: "PHB 2014 adaptation for 2024 Wizard rules" }, activities };
    if (Array.isArray(item.system.advancement)) system.advancement = item.system.advancement.map(advancement => ({ ...advancement, title: "Subclass Features" }));
    return {
      ...item,
      name: name ?? item.name,
      effects: item.effects?.map(effect => ({ ...effect, name: EFFECT_NAMES[effect._id] ?? effect.name })) ?? [],
      system
    };
  }));
}
