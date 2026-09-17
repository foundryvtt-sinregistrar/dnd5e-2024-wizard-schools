import {
  CONTENT_VERSION,
  FOLDER_IDS,
  MODULE_ID,
  PACK_COLLECTION,
  applyPresentation,
  featureBase,
  itemGrant,
  saveActivity,
  subclassBase
} from "./common.mjs";

const IDS = Object.freeze({
  subclass: "wz24Enchanter001",
  savant: "wz24EncSavant001",
  hypnotic: "wz24EncHypnot001",
  instinctive: "wz24EncInstin001",
  split: "wz24EncTwinEn001",
  memories: "wz24EncMemory001",
  adv3: "wz24EncAdv003001",
  adv6: "wz24EncAdv006001",
  adv10: "wz24EncAdv010001",
  adv14: "wz24EncAdv014001",
  actHypnotic: "wz24EncHypAct001",
  actInstinct: "wz24EncInsAct001",
  actMemories: "wz24EncMemAct001"
});

const uuid = id => `Compendium.${PACK_COLLECTION}.Item.${id}`;

const savant = featureBase({
  id: IDS.savant,
  name: "Experto en Encantamiento",
  level: 3,
  identifier: "enchantment-savant",
  description: `<p>Elige dos conjuros de mago de la escuela de <strong>Encantamiento</strong> de nivel 2 o inferior y añádelos a tu libro de conjuros sin coste.</p><p>Además, siempre que consigas un nuevo nivel de espacios de conjuro de esta clase, puedes añadir un conjuro de mago de Encantamiento a tu libro de conjuros sin coste. Debe ser de un nivel para el que tengas espacios de conjuro.</p><section class="secret"><p><strong>Adaptación 2024.</strong> Sustituye el antiguo descuento al copiar conjuros por el patrón de Experto usado por las escuelas oficiales del Mago 2024.</p></section>`
});

const hypnotic = featureBase({
  id: IDS.hypnotic,
  name: "Mirada Hipnótica",
  level: 3,
  identifier: "hypnotic-gaze",
  description: `<p>Como acción, elige una criatura que puedas ver a 5 pies o menos de ti. Si puede verte u oírte, debe superar una salvación de Sabiduría contra la CD de tus conjuros de mago. Si falla, queda hechizada por ti hasta el final de tu siguiente turno; mientras dure, está incapacitada, su velocidad es 0 y resulta evidente que está bajo tu influencia.</p><p>En tus turnos posteriores puedes usar tu acción para mantener el efecto hasta el final de tu siguiente turno. El efecto termina si te alejas a más de 5 pies, si la criatura deja de verte u oírte o si recibe daño.</p><p>Cuando el efecto termina, o si supera la salvación inicial, no puedes volver a usar este rasgo contra esa criatura hasta que finalices un descanso largo.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La actividad realiza la salvación. La duración, la inmunidad individual tras terminar y los estados Hechizado/Incapacitado se controlan manualmente.</p></section>`,
  activities: {
    [IDS.actHypnotic]: saveActivity({
      id: IDS.actHypnotic,
      ability: "wis",
      activation: "action",
      rangeUnits: "ft",
      rangeSpecial: "5 pies",
      targetType: "creature",
      targetSpecial: "Una criatura que pueda verte u oírte",
      name: "Mirada Hipnótica"
    })
  }
});

const instinctive = featureBase({
  id: IDS.instinctive,
  name: "Encantamiento Instintivo",
  level: 6,
  identifier: "instinctive-charm",
  description: `<p>Cuando una criatura que puedas ver a 30 pies o menos haga una tirada de ataque contra ti, puedes usar tu reacción para intentar redirigirla. Debe existir otra criatura dentro del alcance del ataque.</p><p>El atacante realiza una salvación de Sabiduría contra la CD de tus conjuros de mago. Si falla, debe elegir como objetivo a la criatura más cercana a él, sin contaros ni a ti ni al atacante. Si hay varias a la misma distancia, el atacante elige. Si supera la salvación, no puedes volver a usar este rasgo sobre ese atacante hasta que finalices un descanso largo.</p><p>Debes decidir usar el rasgo antes de saber si el ataque impacta. Una criatura inmune a ser hechizada no se ve afectada.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La actividad resuelve la salvación; el cambio de objetivo y la inmunidad individual se aplican manualmente.</p></section>`,
  activities: {
    [IDS.actInstinct]: saveActivity({
      id: IDS.actInstinct,
      ability: "wis",
      activation: "reaction",
      activationCondition: "Cuando una criatura visible a 30 pies o menos te tenga como objetivo de una tirada de ataque, antes de saber si impacta",
      rangeUnits: "ft",
      rangeSpecial: "30 pies",
      targetType: "creature",
      targetSpecial: "El atacante",
      name: "Encantamiento Instintivo"
    })
  }
});

const split = featureBase({
  id: IDS.split,
  name: "Duplicar Encantamiento",
  level: 10,
  identifier: "split-enchantment",
  description: `<p>Cuando lanzas un conjuro de Encantamiento de nivel 1 o superior que tenga como objetivo a una sola criatura, puedes hacer que el conjuro también tenga como objetivo a una segunda criatura válida.</p><section class="secret"><p><strong>Nota de Foundry.</strong> Añade manualmente el segundo objetivo al resolver el conjuro; esta modificación depende del objetivo original de cada conjuro.</p></section>`
});

const memories = featureBase({
  id: IDS.memories,
  name: "Modificar Recuerdos",
  level: 14,
  identifier: "alter-memories",
  description: `<p>Cuando lanzas un conjuro de Encantamiento para hechizar a una o más criaturas, puedes hacer que una de ellas no sea consciente de que ha sido hechizada.</p><p>Además, una vez antes de que termine ese conjuro, puedes usar tu acción para intentar que esa criatura olvide parte del tiempo pasado bajo el efecto. Debe hacer una salvación de Inteligencia contra la CD de tus conjuros de mago. Si falla, olvida hasta 1 + tu modificador por Carisma horas, con un mínimo de 1 hora. Puedes elegir un periodo menor, pero nunca superior a la duración del conjuro de Encantamiento.</p><section class="secret"><p><strong>Nota de Foundry.</strong> La actividad permite realizar la salvación de Inteligencia; la edición narrativa de los recuerdos queda en manos del DM.</p></section>`,
  activities: {
    [IDS.actMemories]: saveActivity({
      id: IDS.actMemories,
      ability: "int",
      activation: "action",
      activationCondition: "Una vez antes de que termine un conjuro de Encantamiento con el que hayas hechizado al objetivo",
      rangeUnits: "spec",
      rangeSpecial: "La criatura afectada por tu conjuro de Encantamiento",
      targetType: "creature",
      targetSpecial: "Una criatura hechizada por tu conjuro",
      name: "Olvidar el tiempo hechizado"
    })
  }
});

const subclass = subclassBase({
  id: IDS.subclass,
  name: "Encantador",
  identifier: "enchanter",
  description: `<blockquote><p>Embelesa, pacifica y domina voluntades.</p></blockquote><p>Los encantadores perfeccionan la magia que influye sobre pensamientos y emociones. Algunos la emplean para apaciguar conflictos; otros la usan para imponer su voluntad. Su especialidad es alterar la conducta de otras criaturas y volver contra ellas sus propias decisiones.</p><section class="secret"><p><strong>Adaptación.</strong> Traslada la Escuela de Encantamiento de 2014 a la progresión del Mago 2024: niveles 3, 6, 10 y 14.</p></section>`,
  advancements: [
    itemGrant({ id: IDS.adv3, level: 3, items: [uuid(IDS.savant), uuid(IDS.hypnotic)] }),
    itemGrant({ id: IDS.adv6, level: 6, items: [uuid(IDS.instinctive)] }),
    itemGrant({ id: IDS.adv10, level: 10, items: [uuid(IDS.split)] }),
    itemGrant({ id: IDS.adv14, level: 14, items: [uuid(IDS.memories)] })
  ]
});

export const ENCHANTER_ITEMS = applyPresentation(
  [savant, hypnotic, instinctive, split, memories, subclass],
  FOLDER_IDS.enchanter,
  {
    [IDS.savant]: "icons/magic/control/hypnosis-mesmerism-swirl.webp",
    [IDS.hypnotic]: "icons/magic/control/hypnosis-mesmerism-eye.webp",
    [IDS.instinctive]: "icons/magic/control/control-influence-crown-gold.webp",
    [IDS.split]: "icons/magic/control/debuff-chains-orb-movement-blue.webp",
    [IDS.memories]: "icons/sundries/documents/document-letter-blue.webp",
    [IDS.subclass]: `modules/${MODULE_ID}/assets/icons/subclasses/enchanter.webp`
  }
);
export const ENCHANTER_IDS = IDS;
