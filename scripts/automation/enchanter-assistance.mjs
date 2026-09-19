import { FEATURE_IDENTIFIERS } from "./constants.mjs";
import { automationEnabled, postAutomationMessage } from "./utils.mjs";

export function alterMemoriesHours(actor) {
  return Math.max(1, 1 + Number(actor?.system?.abilities?.cha?.mod ?? 0));
}

export function nearestCandidates(origin, candidates, excludedUuids, distance) {
  const eligible = candidates.filter(token => token?.actor && !excludedUuids.has(token.actor.uuid));
  if ( !eligible.length ) return [];
  const measured = eligible.map(token => ({ token, distance: distance(origin, token) }))
    .filter(entry => Number.isFinite(entry.distance));
  const minimum = Math.min(...measured.map(entry => entry.distance));
  return measured.filter(entry => entry.distance === minimum).map(entry => entry.token);
}

function selectedToken() {
  return Array.from(game.user?.targets ?? [])[0] ?? null;
}

function tokenDistance(first, second) {
  return canvas.grid.measurePath([first.center, second.center]).distance;
}

async function assistInstinctiveCharm(activity) {
  const caster = activity.item.actor;
  const attacker = selectedToken();
  const casterToken = caster.token?.object ?? caster.getActiveTokens?.()[0];
  if ( !attacker || !casterToken || !canvas?.ready ) {
    ui.notifications.warn("Encantamiento Instintivo: selecciona como objetivo al atacante para calcular la redirección.");
    return;
  }
  const nearest = nearestCandidates(attacker, canvas.tokens.placeables,
    new Set([attacker.actor.uuid, caster.uuid]), tokenDistance);
  const names = nearest.map(token => token.name).join(", ") || "ninguna criatura disponible";
  await postAutomationMessage(caster, "Encantamiento Instintivo",
    `Si el atacante falla la salvación, la criatura más cercana propuesta es: <strong>${names}</strong>. Verifica alcance del ataque, empates e inmunidad a Hechizado.`);
}

async function assistAlterMemories(activity) {
  const caster = activity.item.actor;
  const target = selectedToken()?.actor;
  const targetText = target ? `<strong>${target.name}</strong>` : "el objetivo";
  await postAutomationMessage(caster, "Modificar Recuerdos",
    `Si ${targetText} falla la salvación, puede olvidar hasta <strong>${alterMemoriesHours(caster)} horas</strong>, sin superar la duración del conjuro de Encantamiento.`);
}

export function registerEnchanterAssistance() {
  Hooks.on("dnd5e.postUseActivity", activity => {
    if ( !automationEnabled() || !activity?.item?.actor?.isOwner ) return;
    const identifier = activity.item.system?.identifier;
    if ( identifier === FEATURE_IDENTIFIERS.instinctiveCharm ) void assistInstinctiveCharm(activity);
    else if ( identifier === FEATURE_IDENTIFIERS.alterMemories ) void assistAlterMemories(activity);
  });
}
