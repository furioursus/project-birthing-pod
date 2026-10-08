import { describe, expect, it } from 'vitest';
import { questions } from './data/questions';
import { results } from './data/results';
import { illusionFor, pickResult, score, tally } from './quiz';

const ids = results.map((r) => r.id);

/**
 * How many of all possible answer combinations land on each result. Walks
 * every combination depth-first, keeping a running score per result.
 */
function distribution(): Map<string, number> {
  const weights = questions.map((q) => q.answers.map((a) => ids.map((id) => a.weights[id] ?? 0)));
  const counts = new Map(ids.map((id) => [id, 0]));
  const running = new Array<number>(ids.length).fill(0);

  const walk = (depth: number) => {
    if (depth === weights.length) {
      // Same rule as pickResult: highest score, ties to the earlier result.
      let best = 0;
      for (let i = 1; i < running.length; i++) if (running[i]! > running[best]!) best = i;
      counts.set(ids[best]!, counts.get(ids[best]!)! + 1);
      return;
    }
    for (const answer of weights[depth]!) {
      for (let i = 0; i < answer.length; i++) running[i]! += answer[i]!;
      walk(depth + 1);
      for (let i = 0; i < answer.length; i++) running[i]! -= answer[i]!;
    }
  };
  walk(0);
  return counts;
}

describe('scoring', () => {
  it('adds up the weights of the picked answers', () => {
    const scores = tally(
      questions,
      questions.map(() => 0),
    );
    const expected = new Map<string, number>();
    for (const q of questions) {
      for (const [id, points] of Object.entries(q.answers[0]!.weights)) {
        expected.set(id, (expected.get(id) ?? 0) + points);
      }
    }
    expect(scores).toEqual(expected);
  });

  it('breaks ties in favour of the earlier result', () => {
    const [first, second] = results;
    const tied = new Map([
      [first!.id, 3],
      [second!.id, 3],
    ]);
    expect(pickResult(results, tied)).toBe(first);
    expect(pickResult([second!, first!], tied)).toBe(second);
  });

  it('fakes the best-scoring result with the opposite outcome', () => {
    const beef = results.find((r) => r.outcome === 'beef')!;
    const triumphs = results.filter((r) => r.outcome === 'triumph');
    const scores = new Map([
      [beef.id, 30],
      [triumphs[1]!.id, 5],
    ]);
    expect(illusionFor(results, scores, beef)).toBe(triumphs[1]);
    expect(illusionFor(results, new Map(), triumphs[0]!).outcome).toBe('beef');
  });

  it('rejects answers that do not exist', () => {
    expect(() => score(questions, results, [99])).toThrow();
  });
});

describe('quiz content', () => {
  it('has unique result ids that are safe in a URL', () => {
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it('only weights results that exist', () => {
    for (const q of questions) {
      for (const a of q.answers) {
        for (const id of Object.keys(a.weights)) expect(ids, `${q.prompt} → ${a.text}`).toContain(id);
      }
    }
  });

  it('gives every result a source, cards and a sane rating', () => {
    for (const r of results) {
      expect(r.source.url, r.id).toMatch(/^https:\/\//);
      expect(r.cards.length, r.id).toBeGreaterThan(0);
      expect(r.planRating, r.id).toBeGreaterThanOrEqual(0);
      expect(r.planRating, r.id).toBeLessThanOrEqual(10);
    }
  });

  it('lists every beef before the triumphs, so ties never award a triumph', () => {
    const firstTriumph = results.findIndex((r) => r.outcome === 'triumph');
    expect(firstTriumph).toBeGreaterThan(0);
    expect(results.slice(firstTriumph).every((r) => r.outcome === 'triumph')).toBe(true);
  });
});

describe('result spread across every possible set of answers', () => {
  const counts = distribution();
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const share = (id: string) => counts.get(id)! / total;

  it.each(ids)('%s is reachable', (id) => {
    expect(counts.get(id)).toBeGreaterThan(0);
  });

  it('keeps triumphs rare', () => {
    const triumphs = results.filter((r) => r.outcome === 'triumph');
    const triumphShare = triumphs.reduce((sum, r) => sum + share(r.id), 0);
    expect(triumphShare).toBeLessThan(0.12);
  });

  it('does not let any one result dominate', () => {
    for (const id of ids) expect(share(id), id).toBeLessThan(0.2);
  });
});

describe('glossary', () => {
  it('explains at least one term on every result', async () => {
    const { glossaryFor } = await import('./data/glossary');
    for (const r of results) expect(glossaryFor(r.happened).length, r.id).toBeGreaterThan(0);
  });
});
