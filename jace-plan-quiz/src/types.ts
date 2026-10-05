export type Outcome = 'beef' | 'triumph';

export interface Result {
  /** Stable slug, used in share links. Never change one once it ships. */
  id: string;
  /** The result name, as in "You are: <title>". */
  title: string;
  /** The plan itself, in one breath. */
  plan: string;
  era: string;
  year: number;
  outcome: Outcome;
  /** What actually happened in canon. */
  happened: string;
  /** What this result says about the person who got it. */
  reading: string;
  /** Out of 10, for the stamp. */
  planRating: number;
  cards: string[];
  source: { label: string; url: string };
}

export interface Answer {
  text: string;
  /** Points this answer gives each result. */
  weights: Record<string, number>;
}

export interface Question {
  prompt: string;
  answers: Answer[];
}
