import type { Effect } from './rules';

export interface Card {
  id: string;
  name: string;
  // The oracle sentence the effect comes from, quoted exactly.
  text: string;
  effect: Effect;
  custom?: boolean;
}

export const PRESET_CARDS: readonly Card[] = [
  {
    id: 'kruphix-god-of-horizons',
    name: 'Kruphix, God of Horizons',
    text: 'If you would lose unspent mana, that mana becomes colorless instead.',
    effect: { kind: 'convert', to: 'C' },
  },
  {
    id: 'horizon-stone',
    name: 'Horizon Stone',
    text: 'If you would lose unspent mana, that mana becomes colorless instead.',
    effect: { kind: 'convert', to: 'C' },
  },
  {
    id: 'omnath-locus-of-all',
    name: 'Omnath, Locus of All',
    text: 'If you would lose unspent mana, that mana becomes black instead.',
    effect: { kind: 'convert', to: 'B' },
  },
  {
    id: 'ozai-the-phoenix-king',
    name: 'Ozai, the Phoenix King',
    text: 'If you would lose unspent mana, that mana becomes red instead.',
    effect: { kind: 'convert', to: 'R' },
  },
  {
    id: 'omnath-locus-of-mana',
    name: 'Omnath, Locus of Mana',
    text: "You don't lose unspent green mana as steps and phases end.",
    effect: { kind: 'keep', colors: ['G'] },
  },
  {
    id: 'leyline-tyrant',
    name: 'Leyline Tyrant',
    text: "You don't lose unspent red mana as steps and phases end.",
    effect: { kind: 'keep', colors: ['R'] },
  },
  {
    id: 'upwelling',
    name: 'Upwelling',
    text: "Players don't lose unspent mana as steps and phases end.",
    effect: { kind: 'keep', colors: ['W', 'U', 'B', 'R', 'G', 'C'] },
  },
];
