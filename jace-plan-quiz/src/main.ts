import './style.css';
import { questions } from './data/questions';
import { results } from './data/results';
import { score } from './quiz';
import type { Result } from './types';

const app = document.querySelector<HTMLElement>('#app')!;

type Child = Node | string | null | undefined | false;

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | ((event: Event) => void)> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === 'function') el.addEventListener(key.replace(/^on/, ''), value);
    else el.setAttribute(key, value);
  }
  for (const child of children) {
    if (child) el.append(child);
  }
  return el;
}

function show(...children: Child[]) {
  app.replaceChildren(...children.filter((c): c is Node | string => Boolean(c)));
  window.scrollTo({ top: 0 });
  app.querySelector<HTMLElement>('[data-focus]')?.focus({ preventScroll: true });
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

const resultsById = new Map(results.map((r) => [r.id, r]));
const beefCount = results.filter((r) => r.outcome === 'beef').length;

// Quiz state. Picks are original answer indexes; order is the shuffled display order.
let picks: number[] = [];
let orders: number[][] = [];
let fromQuiz = false;

function startQuiz() {
  if (location.hash === '#/quiz') beginQuiz();
  else location.hash = '#/quiz';
}

function beginQuiz() {
  picks = [];
  orders = questions.map((q) => shuffled(q.answers.map((_, i) => i)));
  fromQuiz = false;
  renderQuestion();
}

function renderIntro() {
  show(
    h(
      'section',
      { class: 'intro' },
      h('p', { class: 'kicker' }, 'A personality quiz for the overconfident'),
      h('h1', { class: 'title' }, 'Which ', h('em', {}, 'poorly thought-out'), ' Jace Beleren plan are you?'),
      h(
        'p',
        { class: 'lede' },
        `Jace Beleren is the most powerful telepath in the Multiverse, a master strategist, and a man who has lost his memory more than once. Answer ${questions.length} questions and find out which of his ${beefCount} documented blunders lives in your heart. Or, if you're very lucky, one of the times it actually worked.`,
      ),
      h('button', { class: 'btn btn-primary', onclick: startQuiz, 'data-focus': '' }, 'Formulate a plan'),
      h('a', { class: 'link-quiet', href: '#/plans' }, 'or just browse the case files'),
    ),
  );
}

function renderQuestion() {
  const index = picks.length;
  const question = questions[index];
  if (!question) return finish();

  const order = orders[index]!;
  const choose = (answerIndex: number) => {
    picks.push(answerIndex);
    renderQuestion();
  };

  const progress = h(
    'ol',
    { class: 'progress', 'aria-label': `Question ${index + 1} of ${questions.length}` },
    ...questions.map((_, i) =>
      h('li', { class: i < index ? 'done' : i === index ? 'current' : '', 'aria-hidden': 'true' }),
    ),
  );

  show(
    h(
      'section',
      { class: 'question' },
      progress,
      h('p', { class: 'kicker' }, `Question ${index + 1} of ${questions.length}`),
      h('h2', { class: 'prompt', tabindex: '-1', 'data-focus': '' }, question.prompt),
      h(
        'div',
        { class: 'answers' },
        ...order.map((answerIndex, position) =>
          h(
            'button',
            { class: 'answer', onclick: () => choose(answerIndex) },
            h('span', { class: 'answer-key', 'aria-hidden': 'true' }, String(position + 1)),
            h('span', {}, question.answers[answerIndex]!.text),
          ),
        ),
      ),
      index > 0 &&
        h(
          'button',
          {
            class: 'link-quiet back',
            onclick: () => {
              picks.pop();
              renderQuestion();
            },
          },
          '← Rethink the last one',
        ),
    ),
  );
}

function finish() {
  const result = score(questions, results, picks);
  fromQuiz = true;
  location.hash = `#/plan/${result.id}`;
}

function rating(result: Result) {
  return h(
    'div',
    { class: 'rating' },
    h('span', { class: 'label' }, 'Plan rating'),
    h(
      'span',
      { class: 'hedrons', role: 'img', 'aria-label': `${result.planRating} out of 10` },
      ...Array.from({ length: 10 }, (_, i) => h('span', { class: i < result.planRating ? 'on' : '' })),
    ),
  );
}

async function share(result: Result, button: HTMLButtonElement) {
  const url = `${location.origin}${location.pathname}#/plan/${result.id}`;
  const text = `I got "${result.title}" on Which Poorly Thought-Out Jace Beleren Plan Are You?`;
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Which Jace plan are you?', text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    button.textContent = 'Link copied';
  } catch (error) {
    if ((error as Error).name !== 'AbortError') button.textContent = 'Copy failed. Use the address bar';
  }
}

function renderResult(result: Result) {
  const mine = fromQuiz;
  fromQuiz = false;
  const shareButton = h(
    'button',
    { class: mine ? 'btn btn-primary' : 'btn' },
    mine ? 'Share your shame' : 'Share this plan',
  );
  shareButton.addEventListener('click', () => share(result, shareButton));

  show(
    h(
      'article',
      { class: `result ${result.outcome}` },
      h('p', { class: 'kicker' }, mine ? 'Your plan is…' : 'Case file'),
      h('h1', { class: 'title', tabindex: '-1', 'data-focus': '' }, result.title),
      h('p', { class: 'meta' }, `${result.era} · ${result.year}`),
      h(
        'div',
        { class: 'stamp', 'aria-label': 'Plan status' },
        result.outcome === 'beef' ? 'Beefed it' : 'It actually worked',
      ),
      h('blockquote', { class: 'plan' }, h('span', { class: 'label' }, 'The plan'), h('p', {}, result.plan)),
      rating(result),
      h('section', {}, h('h2', {}, 'What happened'), h('p', {}, result.happened)),
      h('section', {}, h('h2', {}, mine ? 'What this says about you' : 'If this is you'), h('p', {}, result.reading)),
      h(
        'section',
        { class: 'evidence' },
        h('h2', {}, 'Evidence'),
        h(
          'ul',
          { class: 'cards' },
          ...result.cards.map((name) =>
            h('li', {}, h('a', { href: `https://scryfall.com/search?q=${encodeURIComponent(`!"${name}"`)}` }, name)),
          ),
        ),
        h('p', {}, h('a', { class: 'source', href: result.source.url }, `Read it: ${result.source.label}`)),
      ),
      h(
        'div',
        { class: 'actions' },
        mine ? shareButton : h('button', { class: 'btn btn-primary', onclick: startQuiz }, 'Find your own plan'),
        mine && h('button', { class: 'btn', onclick: startQuiz }, 'Retake the quiz'),
        h('a', { class: 'btn', href: '#/plans' }, 'Every plan'),
        !mine && shareButton,
      ),
    ),
  );
}

function renderPlans() {
  const years = results.map((r) => r.year);
  const card = (r: Result) =>
    h(
      'li',
      { class: `plan-card ${r.outcome}` },
      h(
        'a',
        { href: `#/plan/${r.id}` },
        h('span', { class: 'plan-card-meta' }, `${r.year} · ${r.outcome === 'beef' ? 'Beefed it' : 'Worked'}`),
        h('span', { class: 'plan-card-title' }, r.title),
      ),
    );

  show(
    h(
      'section',
      { class: 'plans' },
      h('p', { class: 'kicker' }, 'The case files'),
      h('h1', { class: 'title', tabindex: '-1', 'data-focus': '' }, 'Every Jace plan, in order'),
      h(
        'p',
        { class: 'lede' },
        `${results.length} plans across ${Math.max(...years) - Math.min(...years)} years of Magic story. Spoilers, obviously.`,
      ),
      h('ol', { class: 'plan-list' }, ...[...results].sort((a, b) => a.year - b.year).map(card)),
      h('div', { class: 'actions' }, h('button', { class: 'btn btn-primary', onclick: startQuiz }, 'Take the quiz')),
    ),
  );
}

function route() {
  const [, page, id] = location.hash.split('/');
  if (page === 'plan' && id && resultsById.has(id)) return renderResult(resultsById.get(id)!);
  if (page === 'plans') return renderPlans();
  if (page === 'quiz') return beginQuiz();
  renderIntro();
}

window.addEventListener('hashchange', route);
window.addEventListener('keydown', (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const n = Number(event.key);
  if (!Number.isInteger(n) || n < 1) return;
  const buttons = app.querySelectorAll<HTMLButtonElement>('.answer');
  buttons[n - 1]?.click();
});
route();
