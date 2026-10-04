// Turns the app state into something that can be saved on the device, and
// back again. Parsing never trusts what it reads: anything missing or
// malformed falls back to a fresh value, so a bad save can't break the app.

import type { Card } from './cards';
import { COLORS, DURATIONS, STEPS, emptyPool, type Color, type Duration, type Effect, type Pool } from './rules';

export interface Game {
  pool: Pool;
  step: number;
  turn: number;
  active: string[];
}

export interface Saved {
  game: Game;
  history: Game[];
  custom: Card[];
  addDuration: Duration;
  wake: boolean;
}

export const STORAGE_KEY = 'mtg-mana-tracker:v1';
export const HISTORY_LIMIT = 100;

export function newGame(): Game {
  return { pool: emptyPool(), step: 0, turn: 1, active: [] };
}

export function freshSave(): Saved {
  return { game: newGame(), history: [], custom: [], addDuration: 'step', wake: false };
}

type Unknown = Record<string, unknown>;

const isObject = (value: unknown): value is Unknown =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isColor = (value: unknown): value is Color => (COLORS as readonly unknown[]).includes(value);

function count(value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max ? value : null;
}

function parsePool(value: unknown): Pool {
  const pool = emptyPool();
  if (!isObject(value)) return pool;
  for (const duration of DURATIONS) {
    const bucket = value[duration];
    if (!isObject(bucket)) continue;
    for (const color of COLORS) pool[duration][color] = count(bucket[color]) ?? 0;
  }
  return pool;
}

function parseGame(value: unknown): Game | null {
  if (!isObject(value)) return null;
  return {
    pool: parsePool(value.pool),
    step: count(value.step, 0, STEPS.length - 1) ?? 0,
    turn: count(value.turn, 1) ?? 1,
    active: Array.isArray(value.active) ? value.active.filter((id): id is string => typeof id === 'string') : [],
  };
}

function parseEffect(value: unknown): Effect | null {
  if (!isObject(value)) return null;
  if (value.kind === 'convert' && isColor(value.to)) return { kind: 'convert', to: value.to };
  if (value.kind === 'keep' && Array.isArray(value.colors)) {
    const colors = COLORS.filter((c) => (value.colors as unknown[]).includes(c));
    if (colors.length) return { kind: 'keep', colors };
  }
  return null;
}

function parseCard(value: unknown): Card | null {
  if (!isObject(value)) return null;
  const effect = parseEffect(value.effect);
  if (typeof value.id !== 'string' || typeof value.name !== 'string' || !effect) return null;
  return { id: value.id, name: value.name, text: typeof value.text === 'string' ? value.text : '', effect, custom: true };
}

export function parseSaved(raw: string | null): Saved {
  const fresh = freshSave();
  if (!raw) return fresh;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return fresh;
  }
  if (!isObject(data)) return fresh;

  const history = Array.isArray(data.history)
    ? data.history.map(parseGame).filter((g): g is Game => g !== null).slice(-HISTORY_LIMIT)
    : [];
  return {
    game: parseGame(data.game) ?? fresh.game,
    history,
    custom: Array.isArray(data.custom) ? data.custom.map(parseCard).filter((c): c is Card => c !== null) : [],
    addDuration: (DURATIONS as readonly unknown[]).includes(data.addDuration) ? (data.addDuration as Duration) : 'step',
    wake: data.wake === true,
  };
}

export function serialize(saved: Saved): string {
  return JSON.stringify({ ...saved, history: saved.history.slice(-HISTORY_LIMIT) });
}
