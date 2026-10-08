import '@fontsource-variable/big-shoulders/opsz.css';
import '@fontsource-variable/atkinson-hyperlegible-next';
import '@fontsource/architects-daughter';
import './style.css';
import { questions } from './data/questions';
import { glossaryFor } from './data/glossary';
import { results } from './data/results';
import { illusionFor, pickResult, tally } from './quiz';
import type { Result } from './types';

const app = document.querySelector<HTMLElement>('#app')!;
const status = document.querySelector<HTMLElement>('#status')!;

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

/** Parses a decorative SVG snippet. Everything made here is hidden from assistive tech. */
function svg(markup: string): SVGSVGElement {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const el = template.content.firstElementChild as SVGSVGElement;
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  return el;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function announce(text: string) {
  status.textContent = '';
  requestAnimationFrame(() => (status.textContent = text));
}

// Timers for the reading beat and the illusion; any navigation cancels them.
let timers: number[] = [];
let skipIllusion: (() => void) | null = null;

function cancelTimers() {
  timers.forEach((t) => clearTimeout(t));
  timers = [];
  skipIllusion = null;
}

function later(ms: number, fn: () => void) {
  timers.push(window.setTimeout(fn, ms));
}

let firstRender = true;

function show(title: string | null, ...children: Child[]) {
  cancelTimers();
  app.replaceChildren(...children.filter((c): c is Node | string => Boolean(c)));
  document.title = title ? `${title} · Jace Plan Quiz` : 'Which Jace Plan Are You? · Jace Plan Quiz';
  window.scrollTo({ top: 0 });
  // Moving focus on the first paint would put a ring on the page before anyone has done anything.
  if (!firstRender) app.querySelector<HTMLElement>('[data-focus], h1')?.focus({ preventScroll: true });
  firstRender = false;
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

// Sheet numbers follow publication order, the same order as the sheet index.
const inPublicationOrder = [...results].sort((a, b) => a.year - b.year);
const sheetNumbers = new Map(inPublicationOrder.map((r, i) => [r.id, `A-${String(i + 1).padStart(2, '0')}`]));
const sheetOf = (r: Result) => sheetNumbers.get(r.id)!;
const lastSheet = `A-${String(results.length).padStart(2, '0')}`;
const outcomeLabel = (r: Result) => (r.outcome === 'beef' ? 'Beefed it' : 'It actually worked');

const LAST_RESULT_KEY = 'jace-plan-quiz:last';

function rememberResult(id: string) {
  try {
    sessionStorage.setItem(LAST_RESULT_KEY, id);
  } catch {
    // Private windows can refuse storage; the index just won't mark your plan.
  }
}

function lastResult(): string | null {
  try {
    return sessionStorage.getItem(LAST_RESULT_KEY);
  } catch {
    return null;
  }
}

// Routing. Quiz progress lives in history state, so refresh keeps your place
// and Back steps to the previous question.

interface QuizState {
  picks: number[];
  /** The shuffled display order of each question's answers. */
  orders: number[][];
}

interface ResultState {
  mine: boolean;
  /** Id of the result Jace shows first, before he corrects himself. */
  reveal?: string;
  /** Id of the illusion he already corrected, for the revision note. */
  revisedFrom?: string;
}

interface HistoryState {
  quiz?: QuizState;
  result?: ResultState;
}

function go(path: string, state: HistoryState | null = null) {
  history.pushState(state, '', path);
  route();
}

function route() {
  const [page, arg, extra] = location.pathname.split('/').filter(Boolean);
  const state = (history.state ?? {}) as HistoryState;
  if (!page) return renderIntro();
  if (page === 'plans' && !arg) return renderPlans();
  if (page === 'quiz' && !extra) return resumeQuiz(state.quiz, Number(arg ?? 1));
  if (page === 'plan' && arg && !extra) {
    const result = resultsById.get(arg);
    if (result) return renderResult(result, state.result);
  }
  renderMissing();
}

function newQuiz(): QuizState {
  return { picks: [], orders: questions.map((q) => shuffled(q.answers.map((_, i) => i))) };
}

function startQuiz() {
  go('/quiz/1', { quiz: newQuiz() });
}

function resumeQuiz(saved: QuizState | undefined, step: number) {
  const valid =
    saved &&
    saved.orders.length === questions.length &&
    saved.picks.length === step - 1 &&
    step >= 1 &&
    step <= questions.length;
  if (valid) return renderQuestion(saved);
  // A fresh visit to a mid-quiz URL has no answers to resume, so start over.
  const fresh = newQuiz();
  history.replaceState({ quiz: fresh }, '', '/quiz/1');
  renderQuestion(fresh);
}

// Landing: the floor plan of Jace's mind.

const DOOR_ARC = `<svg viewBox="0 0 48 48"><path d="M2 2 V46" /><path d="M2 46 A44 44 0 0 0 46 2" stroke-dasharray="3 4" /></svg>`;

function renderIntro() {
  const yours = lastResult();
  const rooms = inPublicationOrder.map((r, i) =>
    h(
      'a',
      // Rooms past the first six fill the bottom two rows of the plan; some are double-width.
      {
        class: `room ${r.outcome}${[6, 9, 11, 12].includes(i) ? ' wide' : ''}${r.id === yours ? ' yours' : ''}`,
        href: `/plan/${r.id}`,
      },
      h('span', { class: 'room-no' }, sheetOf(r)),
      h('span', { class: 'room-title' }, r.title),
      r.id === yours && h('span', { class: 'pencil yours-note' }, 'Yours.'),
      h('span', { class: 'room-meta' }, `${r.year} · `, h('span', { class: 'room-status' }, outcomeLabel(r))),
    ),
  );

  show(
    null,
    h(
      'section',
      { class: 'landing' },
      h(
        'div',
        { class: 'floorplan' },
        h(
          'div',
          { class: 'hall' },
          // Jace's own portrait, as the pencil underdrawing the plan was drafted over.
          h('img', {
            class: 'underdrawing',
            src: '/art/jace-architect-of-thought.svg',
            alt: '',
            width: '1080',
            height: '1397',
            decoding: 'async',
          }),
          h(
            'h1',
            {
              class: 'headline',
              tabindex: '-1',
              'aria-label': 'Which poorly thought-out Jace Beleren plan are you?',
            },
            'Which ',
            h('del', { class: 'struck' }, 'brilliant'),
            ' ',
            h('ins', { class: 'correction' }, 'poorly thought-out'),
            ' Jace Beleren plan are you?',
          ),
          h('p', { class: 'lede' }, 'Ten questions. Jace reads your mind. He gets it wrong first.'),
          h(
            'div',
            { class: 'door' },
            h('button', { class: 'btn btn-door', type: 'button', onclick: startQuiz }, 'Formulate a plan'),
            svg(DOOR_ARC),
          ),
          h(
            'p',
            { class: 'art-credit' },
            'Underdrawing after ',
            h('cite', {}, 'Jace, Architect of Thought'),
            '. Art by Jaime Jones, © 2024 Wizards of the Coast LLC.',
          ),
        ),
        ...rooms,
      ),
      h(
        'div',
        { class: 'general-notes' },
        h('h2', {}, 'General notes'),
        h(
          'p',
          {},
          `Jace Beleren is the most powerful telepath in the Multiverse, a master strategist, and a man who has lost his memory more than once. Answer ${questions.length} questions and find out which of his ${beefCount} documented blunders lives in your heart. Or, if you're very lucky, one of the times it actually worked.`,
        ),
        h('p', { class: 'pencil plan-note', 'aria-hidden': 'true' }, 'Every room is one of his plans. Go on in.'),
      ),
    ),
  );
}

// Questions: a survey of your mind, one sheet per question.

const MARGIN_NOTES = [
  'Subject chose quickly. Suspicious.',
  'Noted. Filed under “concerning.”',
  'Already knew that. Obviously.',
  'Hm.',
  'Adding a contingency.',
  'Cross-referencing with fourteen prior disasters.',
  'Interesting. Don’t tell Gideon.',
  'This changes nothing. (It changes everything.)',
  'Plan still on track. Probably.',
  'I see you. Well, your surface thoughts.',
];

function survey(step: number, total: number, done: number) {
  return h(
    'div',
    { class: 'survey', role: 'img', 'aria-label': `Question ${step} of ${total}` },
    h(
      'ol',
      { 'aria-hidden': 'true' },
      ...Array.from({ length: total }, (_, i) => h('li', { class: i < done ? 'done' : i === done ? 'current' : '' })),
    ),
    h('span', { class: 'sheet-no', 'aria-hidden': 'true' }, `Sheet ${String(step).padStart(2, '0')} / ${total}`),
  );
}

function renderQuestion(state: QuizState) {
  const index = state.picks.length;
  const question = questions[index]!;
  const order = state.orders[index]!;
  let locked = false;

  const choose = (answerIndex: number, button: HTMLButtonElement) => {
    if (locked) return;
    locked = true;
    button.classList.add('picked');
    const picks = [...state.picks, answerIndex];
    later(reducedMotion() ? 0 : 220, () => {
      if (picks.length < questions.length) go(`/quiz/${picks.length + 1}`, { quiz: { picks, orders: state.orders } });
      else finish(picks);
    });
  };

  const previous = state.picks[index - 1];
  const note = index > 0 && previous !== undefined ? MARGIN_NOTES[(index - 1 + previous) % MARGIN_NOTES.length] : null;

  show(
    `Question ${index + 1}`,
    h(
      'section',
      { class: 'question' },
      survey(index + 1, questions.length, index),
      h('h1', { class: 'prompt', tabindex: '-1' }, question.prompt),
      note && h('p', { class: 'pencil margin-note', 'aria-hidden': 'true' }, note),
      h(
        'div',
        { class: 'answers' },
        ...order.map((answerIndex, position) => {
          const button = h(
            'button',
            { class: 'answer', type: 'button', 'aria-keyshortcuts': String(position + 1) },
            h('span', { class: 'bubble', 'aria-hidden': 'true' }, String(position + 1)),
            h('span', {}, question.answers[answerIndex]!.text),
          );
          button.addEventListener('click', () => choose(answerIndex, button));
          return button;
        }),
      ),
      h(
        'div',
        { class: 'question-foot' },
        index > 0 &&
          h(
            'button',
            { class: 'btn-quiet back', type: 'button', onclick: () => history.back() },
            svg('<svg class="arrow" viewBox="0 0 20 12"><path d="M19 6H2M7 1L2 6l5 5" /></svg>'),
            'Rethink the last one',
          ),
        h('p', { class: 'key-hint pencil', 'aria-hidden': 'true' }, 'Keys 1–4 answer.'),
      ),
    ),
  );
}

function finish(picks: number[]) {
  const scores = tally(questions, picks);
  const real = pickResult(results, scores);
  const fake = illusionFor(results, scores, real);
  rememberResult(real.id);

  if (reducedMotion()) return go(`/plan/${real.id}`, { result: { mine: true } });

  // The reading beat stays on the last question's URL; Back from the result returns here.
  show(
    'Reading your mind',
    h(
      'section',
      { class: 'reading' },
      survey(questions.length, questions.length, questions.length),
      h('h1', { class: 'pencil reading-title', tabindex: '-1' }, 'Reading you…'),
    ),
  );
  announce('Reading your mind.');
  later(1300, () => go(`/plan/${real.id}`, { result: { mine: true, reveal: fake.id } }));
}

// Results.

function renderResult(result: Result, state: ResultState | undefined) {
  const fake = state?.reveal ? resultsById.get(state.reveal) : undefined;
  if (fake && !reducedMotion()) return playIllusion(result, fake);
  renderSheet(result, state?.mine ?? false, state?.revisedFrom ? resultsById.get(state.revisedFrom) : undefined);
}

/** A revision cloud: scalloped arcs around a w×h box, bulging outward. */
function cloudPath(w: number, h: number): string {
  const nx = Math.max(3, Math.round(w / 34));
  const ny = Math.max(2, Math.round(h / 34));
  const dx = w / nx;
  const dy = h / ny;
  const bulgeX = Math.min(dx / 2, 13);
  const bulgeY = Math.min(dy / 2, 13);
  let d = 'M0 0';
  for (let i = 0; i < nx; i++) d += ` a${dx / 2} ${bulgeX} 0 0 1 ${dx} 0`;
  for (let i = 0; i < ny; i++) d += ` a${bulgeY} ${dy / 2} 0 0 1 0 ${dy}`;
  for (let i = 0; i < nx; i++) d += ` a${dx / 2} ${bulgeX} 0 0 1 ${-dx} 0`;
  for (let i = 0; i < ny; i++) d += ` a${bulgeY} ${dy / 2} 0 0 1 0 ${-dy}`;
  return `${d} Z`;
}

function playIllusion(real: Result, fake: Result) {
  const wrap = h(
    'div',
    { class: 'illusion-wrap' },
    h('p', { class: 'illusion-title' }, h('span', { class: 'strike' }, fake.title)),
    h('p', { class: 'stamp' }, 'Approved'),
  );
  const stage = h(
    'div',
    { class: `illusion-stage ${fake.outcome}`, 'aria-hidden': 'true' },
    wrap,
    h('p', { class: 'pencil illusion-note' }, 'Obviously. I knew before you did.'),
    h('p', { class: 'pencil redline-note' }, 'Rev 1: that was an illusion. Sorry. Habit.'),
  );
  const section = h('section', { class: 'illusion' }, stage);

  const complete = () => {
    history.replaceState({ result: { mine: true, revisedFrom: fake.id } }, '', location.pathname);
    renderSheet(real, true, fake);
  };

  section.append(h('button', { class: 'btn-quiet skip', type: 'button', 'data-focus': '', onclick: complete }, 'Skip the illusion'));
  show('Reading your mind', section);
  skipIllusion = complete;

  requestAnimationFrame(() => {
    const { width, height } = wrap.getBoundingClientRect();
    // The cloud sits a clear margin outside the title and stamp, then bulges outward.
    const clear = window.innerWidth < 640 ? 8 : 18;
    const pad = clear + 16;
    const cloud = svg(
      `<svg class="cloud" viewBox="${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}" style="inset:${-pad}px;width:${width + pad * 2}px;height:${height + pad * 2}px"><path transform="translate(${-clear} ${-clear})" d="${cloudPath(width + clear * 2, height + clear * 2)}" pathLength="1" /></svg>`,
    );
    wrap.append(cloud);
    requestAnimationFrame(() => section.classList.add('step-1'));
  });
  later(650, () => section.classList.add('step-2'));
  later(1900, () => section.classList.add('step-3'));
  later(3700, () => section.classList.add('step-4'));
  later(4200, complete);
}

function scaleBar(result: Result) {
  return h(
    'div',
    { class: 'scale-wrap' },
    h(
      'div',
      { class: 'scale', role: 'img', 'aria-label': `Plan rating: ${result.planRating} out of 10` },
      ...Array.from({ length: 10 }, (_, i) => h('span', { class: i < result.planRating ? 'on' : '' })),
    ),
    h('div', { class: 'scale-ticks', 'aria-hidden': 'true' }, h('span', {}, '0'), h('span', {}, '5'), h('span', {}, '10')),
    h(
      'p',
      { class: 'scale-value', 'aria-hidden': 'true' },
      `${result.planRating} / 10`,
      result.planRating === 0 && h('span', { class: 'pencil scale-note' }, 'Off the bottom of the scale.'),
    ),
  );
}

function whosWho(result: Result, open: boolean) {
  const entries = glossaryFor(`${result.plan} ${result.happened}`);
  if (entries.length === 0) return null;
  return h(
    'details',
    // People arriving from a shared link are the likeliest non-players, so it starts open for them.
    open ? { class: 'whos-who', open: '' } : { class: 'whos-who' },
    h('summary', {}, 'Who’s who? Explained for ', h('span', { class: 'nowrap' }, 'non-players')),
    h(
      'dl',
      {},
      ...entries.map((entry) => h('div', {}, h('dt', {}, entry.term), h('dd', {}, entry.definition))),
    ),
  );
}

async function share(result: Result, button: HTMLButtonElement) {
  const url = `${location.origin}/plan/${result.id}`;
  const text = `I got "${result.title}" on Which Poorly Thought-Out Jace Beleren Plan Are You?`;
  const label = button.textContent;
  const flash = (message: string) => {
    button.textContent = message;
    announce(message);
    later(2500, () => (button.textContent = label));
  };
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Which Jace plan are you?', text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    flash('Link copied');
  } catch (error) {
    if ((error as Error).name !== 'AbortError') flash('Copy failed. Use the address bar');
  }
}

function renderSheet(result: Result, mine: boolean, revisedFrom: Result | undefined) {
  const shareButton = h(
    'button',
    { class: mine ? 'btn btn-primary' : 'btn', type: 'button' },
    mine ? 'Share your shame' : 'Share this plan',
  );
  shareButton.addEventListener('click', () => share(result, shareButton));

  const actions = mine
    ? [shareButton, h('button', { class: 'btn', type: 'button', onclick: startQuiz }, 'Retake the quiz')]
    : [h('button', { class: 'btn btn-primary', type: 'button', onclick: startQuiz }, 'Find your own plan'), shareButton];

  show(
    result.title,
    h(
      'article',
      { class: `result ${result.outcome}` },
      h(
        'header',
        { class: 'result-head' },
        h(
          'h1',
          { class: 'result-title', tabindex: '-1' },
          mine && h('span', { class: 'sr-only' }, 'Your plan: '),
          result.title,
          revisedFrom && svg('<svg class="rev-tri" viewBox="0 0 24 22"><path d="M12 1 L23 21 H1 Z" /><text x="12" y="17.5">1</text></svg>'),
        ),
        result.titleNote && h('p', { class: 'title-note' }, result.titleNote),
        revisedFrom &&
          h('p', { class: 'pencil rev-note' }, `Rev 1: removed an illusion (“${revisedFrom.title}”). Sorry. Habit.`),
        h('p', { class: 'meta' }, `${result.era} · ${result.year} · Sheet ${sheetOf(result)}`),
        h(
          'div',
          { class: 'intent' },
          h('h2', { class: 'intent-label' }, 'The plan'),
          h('p', { class: 'pencil' }, result.plan),
        ),
      ),
      h(
        'aside',
        { class: 'title-block', 'aria-label': 'Verdict' },
        h(
          'div',
          { class: 'tb-cell' },
          h('h2', { class: 'tb-label' }, 'Status'),
          h('p', { class: 'stamp' }, outcomeLabel(result)),
          h('p', { class: 'pencil stamp-gloss' }, result.outcome === 'beef' ? '(He blew it.)' : '(Rare. Savour it.)'),
        ),
        h('div', { class: 'tb-cell' }, h('h2', { class: 'tb-label' }, 'Plan rating'), scaleBar(result)),
        h('div', { class: 'tb-cell tb-actions' }, ...actions),
        h(
          'dl',
          { class: 'tb-cell tb-meta' },
          h('div', {}, h('dt', {}, 'Drawn by'), h('dd', {}, 'J. Beleren')),
          h('div', {}, h('dt', {}, 'Checked by'), h('dd', {}, 'Nobody')),
          h('div', {}, h('dt', {}, 'Sheet'), h('dd', {}, `${sheetOf(result)} of ${lastSheet}`)),
        ),
      ),
      h(
        'div',
        { class: 'result-body' },
        h('section', {}, h('h2', {}, 'What happened'), h('p', {}, result.happened), whosWho(result, !mine)),
        h('section', {}, h('h2', {}, mine ? 'What this says about you' : 'If this is you'), h('p', {}, result.reading)),
        h(
          'section',
          { class: 'evidence' },
          h('h2', {}, 'Evidence'),
          h('p', { class: 'caption' }, 'Cards from this moment, on Scryfall:'),
          h(
            'ul',
            { class: 'cards' },
            ...result.cards.map((name) =>
              h('li', {}, h('a', { href: `https://scryfall.com/search?q=${encodeURIComponent(`!"${name}"`)}` }, name)),
            ),
          ),
          h('p', {}, h('a', { class: 'source', href: result.source.url }, `Read the story: ${result.source.label}`)),
        ),
        h('p', {}, h('a', { class: 'btn btn-wide', href: '/plans' }, 'Every plan')),
      ),
    ),
  );
}

// The sheet index: every plan, in publication order.

function renderPlans() {
  const years = results.map((r) => r.year);
  const yours = lastResult();
  const row = (r: Result) =>
    h(
      'tr',
      { class: `${r.outcome}${r.id === yours ? ' yours' : ''}` },
      h('td', { class: 'col-sheet' }, sheetOf(r)),
      h(
        'th',
        { scope: 'row', class: 'col-plan' },
        h('a', { href: `/plan/${r.id}` }, r.title),
        r.id === yours && h('span', { class: 'pencil yours-note' }, ' ← yours'),
        h('span', { class: 'index-meta' }, `${r.era} · ${r.year}`),
      ),
      h('td', { class: 'col-era' }, r.era),
      h('td', { class: 'col-year' }, String(r.year)),
      h('td', { class: 'col-status' }, outcomeLabel(r)),
    );

  show(
    'Sheet index',
    h(
      'section',
      { class: 'plans' },
      h('h1', { class: 'page-title', tabindex: '-1' }, 'Sheet index'),
      h(
        'p',
        { class: 'lede' },
        `Every Jace plan, in publication order: ${results.length} plans across ${Math.max(...years) - Math.min(...years)} years of Magic story. Spoilers, obviously.`,
      ),
      h(
        'table',
        { class: 'index' },
        h(
          'thead',
          {},
          h(
            'tr',
            {},
            h('th', { scope: 'col', class: 'col-sheet' }, 'Sheet'),
            h('th', { scope: 'col', class: 'col-plan' }, 'Plan'),
            h('th', { scope: 'col', class: 'col-era' }, 'Story'),
            h('th', { scope: 'col', class: 'col-year' }, 'Year'),
            h('th', { scope: 'col', class: 'col-status' }, 'Status'),
          ),
        ),
        h('tbody', {}, ...inPublicationOrder.map(row)),
      ),
      h('div', { class: 'actions' }, h('button', { class: 'btn btn-primary', type: 'button', onclick: startQuiz }, 'Take the quiz')),
    ),
  );
}

function renderMissing() {
  show(
    'No such case file',
    h(
      'section',
      { class: 'missing' },
      h('h1', { class: 'page-title', tabindex: '-1' }, 'No such case file'),
      h('p', { class: 'lede' }, 'Jace has no plan filed at this address. A first, honestly.'),
      h(
        'div',
        { class: 'actions' },
        h('button', { class: 'btn btn-primary', type: 'button', onclick: startQuiz }, 'Take the quiz'),
        h('a', { class: 'btn', href: '/plans' }, 'Sheet index'),
      ),
    ),
  );
}

// Old share links used hash routes (#/plan/<id>); move them to real paths.
const legacy = location.hash.match(/^#\/(plan\/[a-z0-9-]+|plans|quiz)$/);
if (legacy) history.replaceState(null, '', `/${legacy[1]}`);

document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest('a');
  if (!link || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  event.preventDefault();
  if (url.pathname !== location.pathname) go(url.pathname);
});

window.addEventListener('popstate', route);

window.addEventListener('keydown', (event) => {
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === 'Escape' && skipIllusion) return skipIllusion();
  const n = Number(event.key);
  if (!Number.isInteger(n) || n < 1) return;
  if ((event.target as Element).closest('input, textarea, select, [contenteditable]')) return;
  app.querySelectorAll<HTMLButtonElement>('.answer')[n - 1]?.click();
});

route();
