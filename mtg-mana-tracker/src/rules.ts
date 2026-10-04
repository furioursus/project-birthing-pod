// Pure game rules for the mana pool. Nothing in this file touches the DOM.

export const COLORS = ['W', 'U', 'B', 'R', 'G', 'C'] as const;
export type Color = (typeof COLORS)[number];

export const COLOR_NAMES: Record<Color, string> = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
  C: 'Colorless',
};

// How long a piece of mana survives before it is checked for emptying.
// Most mana is "step"; firebending and similar cards add mana that lasts
// until end of combat or end of turn.
export const DURATIONS = ['step', 'combat', 'turn'] as const;
export type Duration = (typeof DURATIONS)[number];

export const DURATION_LABELS: Record<Duration, string> = {
  step: 'Until end of step',
  combat: 'Until end of combat',
  turn: 'Until end of turn',
};

export type ColorCounts = Record<Color, number>;
export type Pool = Record<Duration, ColorCounts>;

export interface Step {
  id: string;
  label: string;
  combat: boolean;
}

export const STEPS: readonly Step[] = [
  { id: 'untap', label: 'Untap', combat: false },
  { id: 'upkeep', label: 'Upkeep', combat: false },
  { id: 'draw', label: 'Draw', combat: false },
  { id: 'main1', label: 'Main 1', combat: false },
  { id: 'begin-combat', label: 'Begin combat', combat: true },
  { id: 'attackers', label: 'Attackers', combat: true },
  { id: 'blockers', label: 'Blockers', combat: true },
  { id: 'damage', label: 'Damage', combat: true },
  { id: 'end-combat', label: 'End combat', combat: true },
  { id: 'main2', label: 'Main 2', combat: false },
  { id: 'end', label: 'End', combat: false },
  { id: 'cleanup', label: 'Cleanup', combat: false },
];

// What a card does to mana that would otherwise be lost.
export type Effect =
  | { kind: 'keep'; colors: Color[] }
  | { kind: 'convert'; to: Color };

export function emptyCounts(): ColorCounts {
  return { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };
}

export function emptyPool(): Pool {
  return { step: emptyCounts(), combat: emptyCounts(), turn: emptyCounts() };
}

function clonePool(pool: Pool): Pool {
  return { step: { ...pool.step }, combat: { ...pool.combat }, turn: { ...pool.turn } };
}

export function addMana(pool: Pool, color: Color, amount = 1, duration: Duration = 'step'): Pool {
  const next = clonePool(pool);
  next[duration][color] += amount;
  return next;
}

// Spends the mana that would empty soonest first, so held mana is saved for later.
export function spendMana(pool: Pool, color: Color, amount = 1): Pool {
  const next = clonePool(pool);
  let left = amount;
  for (const duration of DURATIONS) {
    const used = Math.min(left, next[duration][color]);
    next[duration][color] -= used;
    left -= used;
  }
  return next;
}

export function totals(pool: Pool): ColorCounts {
  const sum = emptyCounts();
  for (const duration of DURATIONS) {
    for (const color of COLORS) sum[color] += pool[duration][color];
  }
  return sum;
}

export function totalMana(pool: Pool): number {
  const sum = totals(pool);
  return COLORS.reduce((n, color) => n + sum[color], 0);
}

export interface Transition {
  combatEnds: boolean;
  turnEnds: boolean;
}

// Describes moving from one step to another, wrapping into the next turn when
// `to` is at or before `from`. Jumping several steps at once is one transition.
export function transition(from: number, to: number): Transition {
  const last = STEPS.length - 1;
  let combatEnds = false;
  let turnEnds = false;
  let at = from;
  do {
    const next = at === last ? 0 : at + 1;
    if (STEPS[at].combat && !STEPS[next].combat) combatEnds = true;
    if (at === last) turnEnds = true;
    at = next;
  } while (at !== to);
  return { combatEnds, turnEnds };
}

// Expiring means "would be lost". Mana that lasts until end of turn also
// outlives combat, so a turn ending expires every bucket.
export function expiringDurations(t: Transition): Duration[] {
  const out: Duration[] = ['step'];
  if (t.combatEnds || t.turnEnds) out.push('combat');
  if (t.turnEnds) out.push('turn');
  return out;
}

export function keptColors(effects: Effect[]): Set<Color> {
  const kept = new Set<Color>();
  for (const effect of effects) {
    if (effect.kind === 'keep') effect.colors.forEach((c) => kept.add(c));
  }
  return kept;
}

// Distinct colors that active conversion effects could turn lost mana into.
// When there is more than one, the player chooses which replacement applies.
export function conversionTargets(effects: Effect[]): Color[] {
  const targets: Color[] = [];
  for (const effect of effects) {
    if (effect.kind === 'convert' && !targets.includes(effect.to)) targets.push(effect.to);
  }
  return targets;
}

// How much mana would be lost at this transition, after "keep" effects.
export function wouldLose(pool: Pool, t: Transition, effects: Effect[]): ColorCounts {
  const kept = keptColors(effects);
  const out = emptyCounts();
  for (const duration of expiringDurations(t)) {
    for (const color of COLORS) {
      if (!kept.has(color)) out[color] += pool[duration][color];
    }
  }
  return out;
}

export interface EmptyResult {
  pool: Pool;
  kept: ColorCounts;
  lost: ColorCounts;
  // `from` holds the colors the converted mana had before it changed.
  converted: { to: Color; amount: number; from: ColorCounts } | null;
}

// Empties the pool as steps and phases end.
// - Mana of a color a "keep" effect protects is not lost; it stays as plain
//   pool mana that is checked again at the next step.
// - Any other expiring mana becomes `convertTo` if a conversion effect
//   applies, or is lost otherwise.
export function endStep(
  pool: Pool,
  t: Transition,
  effects: Effect[],
  convertTo: Color | null = null,
): EmptyResult {
  const next = clonePool(pool);
  const keep = keptColors(effects);
  const kept = emptyCounts();
  const lost = emptyCounts();

  for (const duration of expiringDurations(t)) {
    for (const color of COLORS) {
      const amount = next[duration][color];
      if (amount === 0) continue;
      next[duration][color] = 0;
      if (keep.has(color)) kept[color] += amount;
      else lost[color] += amount;
    }
  }

  for (const color of COLORS) next.step[color] += kept[color];

  let converted: EmptyResult['converted'] = null;
  if (convertTo) {
    const amount = COLORS.reduce((n, color) => n + lost[color], 0);
    if (amount > 0) {
      next.step[convertTo] += amount;
      converted = { to: convertTo, amount, from: lost };
    }
    return { pool: next, kept, lost: emptyCounts(), converted };
  }

  return { pool: next, kept, lost, converted };
}

// Turns every mana in the pool into one color, keeping how long it lasts.
export function convertPool(pool: Pool, to: Color): Pool {
  const next = emptyPool();
  for (const duration of DURATIONS) {
    for (const color of COLORS) next[duration][to] += pool[duration][color];
  }
  return next;
}
