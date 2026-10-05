import type { Question, Result } from './types';

/** Adds up every picked answer's weights. `picks[i]` is the answer index for question i. */
export function tally(questions: Question[], picks: number[]): Map<string, number> {
  const scores = new Map<string, number>();
  picks.forEach((pick, i) => {
    const answer = questions[i]?.answers[pick];
    if (!answer) throw new Error(`No answer ${pick} for question ${i}`);
    for (const [id, points] of Object.entries(answer.weights)) {
      scores.set(id, (scores.get(id) ?? 0) + points);
    }
  });
  return scores;
}

/**
 * The highest-scoring result. Ties go to whichever result comes first in
 * `results`, so ordering beefs before triumphs keeps triumphs rare.
 */
export function pickResult(results: Result[], scores: Map<string, number>): Result {
  let best = results[0];
  if (!best) throw new Error('No results to pick from');
  let bestScore = scores.get(best.id) ?? 0;
  for (const result of results.slice(1)) {
    const score = scores.get(result.id) ?? 0;
    if (score > bestScore) {
      best = result;
      bestScore = score;
    }
  }
  return best;
}

export function score(questions: Question[], results: Result[], picks: number[]): Result {
  return pickResult(results, tally(questions, picks));
}
