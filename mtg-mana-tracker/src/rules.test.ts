import { describe, expect, it } from 'vitest';
import { PRESET_CARDS } from './cards';
import {
  STEPS,
  addMana,
  conversionTargets,
  convertPool,
  emptyPool,
  endStep,
  spendMana,
  totalMana,
  totals,
  transition,
  wouldLose,
  type Effect,
} from './rules';

const stepIndex = (id: string) => STEPS.findIndex((s) => s.id === id);
const effectOf = (id: string): Effect => PRESET_CARDS.find((c) => c.id === id)!.effect;
const NEXT_STEP = { combatEnds: false, turnEnds: false };

describe('adding and spending', () => {
  it('adds mana to the chosen duration', () => {
    let pool = addMana(emptyPool(), 'R', 2);
    pool = addMana(pool, 'R', 3, 'combat');
    expect(pool.step.R).toBe(2);
    expect(pool.combat.R).toBe(3);
    expect(totals(pool).R).toBe(5);
    expect(totalMana(pool)).toBe(5);
  });

  it('spends the mana that empties soonest first', () => {
    let pool = addMana(emptyPool(), 'G', 1, 'turn');
    pool = addMana(pool, 'G', 1, 'combat');
    pool = addMana(pool, 'G', 1);
    pool = spendMana(pool, 'G', 2);
    expect(pool.step.G).toBe(0);
    expect(pool.combat.G).toBe(0);
    expect(pool.turn.G).toBe(1);
  });

  it('never spends below zero', () => {
    const pool = spendMana(addMana(emptyPool(), 'U'), 'U', 5);
    expect(totals(pool).U).toBe(0);
  });

  it('does not mutate the pool it was given', () => {
    const pool = emptyPool();
    addMana(pool, 'W');
    expect(pool.step.W).toBe(0);
  });
});

describe('transition', () => {
  it('ends only the step between ordinary steps', () => {
    expect(transition(stepIndex('upkeep'), stepIndex('draw'))).toEqual(NEXT_STEP);
  });

  it('ends combat when leaving the combat phase', () => {
    expect(transition(stepIndex('end-combat'), stepIndex('main2'))).toEqual({
      combatEnds: true,
      turnEnds: false,
    });
  });

  it('does not end combat between combat steps', () => {
    expect(transition(stepIndex('attackers'), stepIndex('blockers')).combatEnds).toBe(false);
  });

  it('ends combat when jumping past it', () => {
    expect(transition(stepIndex('main1'), stepIndex('end')).combatEnds).toBe(true);
  });

  it('does not end combat when jumping around it', () => {
    expect(transition(stepIndex('untap'), stepIndex('main1')).combatEnds).toBe(false);
  });

  it('ends the turn when wrapping from cleanup', () => {
    expect(transition(stepIndex('cleanup'), stepIndex('untap'))).toEqual({
      combatEnds: false,
      turnEnds: true,
    });
  });

  it('ends the turn when jumping backwards into the next turn', () => {
    expect(transition(stepIndex('main2'), stepIndex('upkeep')).turnEnds).toBe(true);
  });
});

describe('endStep with no effects', () => {
  it('loses step mana and keeps held mana that has not expired', () => {
    let pool = addMana(emptyPool(), 'R', 2);
    pool = addMana(pool, 'R', 1, 'combat');
    pool = addMana(pool, 'B', 1, 'turn');
    const result = endStep(pool, NEXT_STEP, []);
    expect(result.lost.R).toBe(2);
    expect(totals(result.pool)).toMatchObject({ R: 1, B: 1 });
    expect(result.converted).toBeNull();
  });

  it('loses combat mana when combat ends', () => {
    const pool = addMana(emptyPool(), 'R', 4, 'combat');
    const result = endStep(pool, { combatEnds: true, turnEnds: false }, []);
    expect(totalMana(result.pool)).toBe(0);
    expect(result.lost.R).toBe(4);
  });

  it('loses everything when the turn ends', () => {
    let pool = addMana(emptyPool(), 'W', 1, 'turn');
    pool = addMana(pool, 'U', 1, 'combat');
    const result = endStep(pool, { combatEnds: false, turnEnds: true }, []);
    expect(totalMana(result.pool)).toBe(0);
  });
});

describe('keep effects', () => {
  it('Omnath, Locus of Mana keeps green and loses the rest', () => {
    let pool = addMana(emptyPool(), 'G', 3);
    pool = addMana(pool, 'U', 2);
    const result = endStep(pool, NEXT_STEP, [effectOf('omnath-locus-of-mana')]);
    expect(totals(result.pool)).toMatchObject({ G: 3, U: 0 });
    expect(result.kept.G).toBe(3);
    expect(result.lost.U).toBe(2);
  });

  it('kept mana outlives the duration it was added with', () => {
    const pool = addMana(emptyPool(), 'R', 2, 'combat');
    const result = endStep(pool, { combatEnds: true, turnEnds: false }, [effectOf('leyline-tyrant')]);
    expect(result.pool.step.R).toBe(2);
    expect(result.pool.combat.R).toBe(0);
  });

  it('Upwelling keeps every color, even across turns', () => {
    let pool = addMana(emptyPool(), 'W');
    pool = addMana(pool, 'C', 2);
    const result = endStep(pool, { combatEnds: true, turnEnds: true }, [effectOf('upwelling')]);
    expect(totalMana(result.pool)).toBe(3);
  });
});

describe('convert effects', () => {
  it('Kruphix turns lost mana colorless', () => {
    let pool = addMana(emptyPool(), 'U', 2);
    pool = addMana(pool, 'G', 1);
    const result = endStep(pool, NEXT_STEP, [effectOf('kruphix-god-of-horizons')], 'C');
    expect(totals(result.pool)).toMatchObject({ U: 0, G: 0, C: 3 });
    expect(result.converted).toMatchObject({ to: 'C', amount: 3, from: { U: 2, G: 1 } });
    expect(Object.values(result.lost).every((n) => n === 0)).toBe(true);
  });

  it('Ozai turns lost mana red, including expiring combat mana', () => {
    let pool = addMana(emptyPool(), 'W', 1);
    pool = addMana(pool, 'R', 4, 'combat');
    const result = endStep(pool, { combatEnds: true, turnEnds: false }, [effectOf('ozai-the-phoenix-king')], 'R');
    expect(result.pool.step.R).toBe(5);
    expect(result.pool.combat.R).toBe(0);
  });

  it('leaves held mana that has not expired alone', () => {
    let pool = addMana(emptyPool(), 'G', 1);
    pool = addMana(pool, 'W', 2, 'turn');
    const result = endStep(pool, NEXT_STEP, [effectOf('omnath-locus-of-all')], 'B');
    expect(result.pool.step.B).toBe(1);
    expect(result.pool.turn.W).toBe(2);
  });

  it('keep effects apply before conversion', () => {
    let pool = addMana(emptyPool(), 'G', 2);
    pool = addMana(pool, 'U', 1);
    const effects = [effectOf('omnath-locus-of-mana'), effectOf('kruphix-god-of-horizons')];
    const result = endStep(pool, NEXT_STEP, effects, 'C');
    expect(totals(result.pool)).toMatchObject({ G: 2, U: 0, C: 1 });
  });

  it('reports no conversion when nothing was lost', () => {
    const result = endStep(emptyPool(), NEXT_STEP, [effectOf('horizon-stone')], 'C');
    expect(result.converted).toBeNull();
  });

  it('lists each distinct conversion color once', () => {
    const effects = [
      effectOf('kruphix-god-of-horizons'),
      effectOf('horizon-stone'),
      effectOf('ozai-the-phoenix-king'),
      effectOf('upwelling'),
    ];
    expect(conversionTargets(effects)).toEqual(['C', 'R']);
  });
});

describe('wouldLose', () => {
  it('counts only expiring, unprotected mana', () => {
    let pool = addMana(emptyPool(), 'G', 2);
    pool = addMana(pool, 'B', 1);
    pool = addMana(pool, 'W', 3, 'turn');
    const lose = wouldLose(pool, NEXT_STEP, [effectOf('omnath-locus-of-mana')]);
    expect(lose).toMatchObject({ G: 0, B: 1, W: 0 });
  });
});

describe('convertPool', () => {
  it('turns the whole pool into one color and keeps durations', () => {
    let pool = addMana(emptyPool(), 'W', 1);
    pool = addMana(pool, 'U', 2, 'combat');
    const next = convertPool(pool, 'R');
    expect(next.step.R).toBe(1);
    expect(next.combat.R).toBe(2);
    expect(totals(next)).toMatchObject({ W: 0, U: 0, R: 3 });
  });
});
