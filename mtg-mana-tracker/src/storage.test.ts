import { describe, expect, it } from 'vitest';
import { addMana, emptyPool } from './rules';
import { HISTORY_LIMIT, freshSave, newGame, parseSaved, serialize, type Saved } from './storage';

function sample(): Saved {
  const game = { ...newGame(), pool: addMana(addMana(emptyPool(), 'R', 4, 'combat'), 'G', 2), step: 5, turn: 3, active: ['ozai-the-phoenix-king', 'custom-abc'] };
  return {
    game,
    history: [newGame(), { ...newGame(), step: 4 }],
    custom: [{ id: 'custom-abc', name: 'Homebrew', text: 'Lost mana becomes blue', effect: { kind: 'convert', to: 'U' }, custom: true }],
    addDuration: 'combat',
    wake: true,
  };
}

describe('round trip', () => {
  it('restores everything that was saved', () => {
    const saved = sample();
    expect(parseSaved(serialize(saved))).toEqual(saved);
  });

  it('keeps only the most recent undo steps', () => {
    const saved = { ...freshSave(), history: Array.from({ length: HISTORY_LIMIT + 20 }, (_, turn) => ({ ...newGame(), turn: turn + 1 })) };
    const restored = parseSaved(serialize(saved));
    expect(restored.history).toHaveLength(HISTORY_LIMIT);
    expect(restored.history.at(-1)!.turn).toBe(HISTORY_LIMIT + 20);
  });
});

describe('damaged or missing saves', () => {
  it('starts fresh when nothing is saved', () => {
    expect(parseSaved(null)).toEqual(freshSave());
  });

  it('starts fresh when the save is not JSON', () => {
    expect(parseSaved('{"game": {')).toEqual(freshSave());
  });

  it('starts fresh when the save is not an object', () => {
    expect(parseSaved('[1,2,3]')).toEqual(freshSave());
    expect(parseSaved('null')).toEqual(freshSave());
  });

  it('loads a save from before undo history and duration were saved', () => {
    const old = JSON.stringify({ game: { pool: { step: { W: 1, U: 0, B: 0, R: 0, G: 0, C: 0 } }, step: 2, turn: 4, active: ['upwelling'] }, custom: [], wake: false });
    const restored = parseSaved(old);
    expect(restored.game.pool.step.W).toBe(1);
    expect(restored.game.pool.combat).toEqual(emptyPool().combat);
    expect(restored.game).toMatchObject({ step: 2, turn: 4, active: ['upwelling'] });
    expect(restored.history).toEqual([]);
    expect(restored.addDuration).toBe('step');
  });

  it('replaces bad numbers instead of keeping them', () => {
    const bad = JSON.stringify({ game: { pool: { step: { W: -2, U: 1.5, B: 'x', R: 3 } }, step: 99, turn: 0, active: [7, 'kept'] } });
    const { game } = parseSaved(bad);
    expect(game.pool.step).toEqual({ W: 0, U: 0, B: 0, R: 3, G: 0, C: 0 });
    expect(game.step).toBe(0);
    expect(game.turn).toBe(1);
    expect(game.active).toEqual(['kept']);
  });

  it('drops custom cards it cannot understand', () => {
    const raw = JSON.stringify({
      custom: [
        { id: 'a', name: 'Good', effect: { kind: 'keep', colors: ['G', 'Q'] } },
        { id: 'b', name: 'Bad color', effect: { kind: 'convert', to: 'P' } },
        { id: 'c', effect: { kind: 'convert', to: 'U' } },
        'nonsense',
      ],
    });
    const { custom } = parseSaved(raw);
    expect(custom).toEqual([{ id: 'a', name: 'Good', text: '', effect: { kind: 'keep', colors: ['G'] }, custom: true }]);
  });

  it('ignores an unknown duration', () => {
    expect(parseSaved(JSON.stringify({ addDuration: 'forever' })).addDuration).toBe('step');
  });
});
