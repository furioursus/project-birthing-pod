import { registerSW } from 'virtual:pwa-register';
import { PRESET_CARDS, type Card } from './cards';
import {
  COLORS,
  COLOR_NAMES,
  DURATIONS,
  DURATION_LABELS,
  STEPS,
  addMana,
  conversionTargets,
  convertPool,
  emptyPool,
  endStep,
  keptColors,
  spendMana,
  totalMana,
  totals,
  transition,
  wouldLose,
  type Color,
  type Duration,
  type Effect,
  type Pool,
  type Transition,
} from './rules';
import './style.css';

registerSW({ immediate: true });

interface Game {
  pool: Pool;
  step: number;
  turn: number;
  active: string[];
}

interface Saved {
  game: Game;
  custom: Card[];
  wake: boolean;
}

const STORAGE_KEY = 'mtg-mana-tracker:v1';
const HISTORY_LIMIT = 100;

function newGame(): Game {
  return { pool: emptyPool(), step: 0, turn: 1, active: [] };
}

function load(): Saved {
  const fallback: Saved = { game: newGame(), custom: [], wake: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<Saved>;
    return { ...fallback, ...saved, game: { ...fallback.game, ...saved.game } };
  } catch {
    return fallback;
  }
}

const saved = load();
let game = saved.game;
let custom = saved.custom;
let wake = saved.wake;
let addDuration: Duration = 'step';
let history: Game[] = [];

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ game, custom, wake } satisfies Saved));
  } catch {
    // Storage can be unavailable in private windows; the app still works for this session.
  }
}

function commit(next: Game) {
  history.push(game);
  if (history.length > HISTORY_LIMIT) history.shift();
  game = next;
  persist();
  render();
}

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const allCards = () => [...PRESET_CARDS, ...custom];
const activeCards = () => allCards().filter((card) => game.active.includes(card.id));
const activeEffects = (): Effect[] => activeCards().map((card) => card.effect);

function pip(color: Color, extra = '') {
  return `<span class="pip ${extra}" data-c="${color}" aria-hidden="true">${color}</span>`;
}

function describeEffect(effect: Effect): string {
  if (effect.kind === 'convert') return `Lost mana becomes ${COLOR_NAMES[effect.to].toLowerCase()}`;
  if (effect.colors.length === COLORS.length) return 'No mana is lost';
  return `${effect.colors.map((c) => COLOR_NAMES[c]).join(', ')} mana stays`;
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

// ---------- Rendering ----------

function renderSteps() {
  const nav = $('steps');
  nav.innerHTML = STEPS.map(
    (step, i) => `<button class="step${step.combat ? ' combat' : ''}${i === game.step ? ' current' : ''}"
      data-action="jump" data-step="${i}" ${i === game.step ? 'aria-current="step"' : ''}>${step.label}</button>`,
  ).join('');
  nav.querySelector('.current')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  $('turn').textContent = `Turn ${game.turn}`;
  const next = (game.step + 1) % STEPS.length;
  $('next').textContent = `${next === 0 ? 'Next turn' : STEPS[next].label} →`;
}

function renderPool() {
  const sum = totals(game.pool);
  $('pool').innerHTML = COLORS.map((color) => {
    const held = DURATIONS.filter((d) => d !== 'step' && game.pool[d][color] > 0)
      .map((d) => `${game.pool[d][color]} till ${d === 'combat' ? 'combat ends' : 'end of turn'}`)
      .join(' · ');
    return `<div class="tile" data-c="${color}">
      <button class="add" data-action="add" data-color="${color}" aria-label="Add ${COLOR_NAMES[color]} mana, ${sum[color]} in pool">
        ${pip(color, 'big')}
        <span class="count${sum[color] === 0 ? ' zero' : ''}">${sum[color]}</span>
        <span class="held">${held}</span>
      </button>
      <button class="spend" data-action="spend" data-color="${color}" aria-label="Spend ${COLOR_NAMES[color]} mana" ${sum[color] === 0 ? 'disabled' : ''}>−</button>
    </div>`;
  }).join('');
  const total = totalMana(game.pool);
  $('total').textContent = `${total} unspent mana`;
}

function renderDuration() {
  const fieldset = $('duration');
  fieldset.innerHTML =
    '<legend>New mana lasts</legend>' +
    DURATIONS.map(
      (d) => `<label class="seg${d === addDuration ? ' on' : ''}">
        <input type="radio" name="duration" value="${d}" ${d === addDuration ? 'checked' : ''} />
        ${DURATION_LABELS[d].replace('Until end of ', '')}
      </label>`,
    ).join('');
  fieldset.classList.toggle('held', addDuration !== 'step');
}

function renderEffects() {
  const cards = activeCards();
  $('active-cards').innerHTML = cards.length
    ? cards
        .map(
          (card) => `<li class="chip">
            <span>${escapeHtml(card.name)}</span>
            <button class="chip-x" data-action="toggle-card" data-card="${card.id}" aria-label="Remove ${escapeHtml(card.name)}">×</button>
          </li>`,
        )
        .join('')
    : '<li class="empty">None. Mana empties as each step ends.</li>';

  const effects = activeEffects();
  const kept = keptColors(effects);
  const targets = conversionTargets(effects);
  const parts: string[] = [];
  if (kept.size === COLORS.length) parts.push('No mana is lost.');
  else {
    if (kept.size) parts.push(`${[...kept].map((c) => COLOR_NAMES[c]).join(', ')} stays.`);
    if (targets.length === 1) parts.push(`Everything else becomes ${COLOR_NAMES[targets[0]].toLowerCase()}.`);
    if (targets.length > 1) parts.push(`Everything else becomes your choice of ${targets.map((c) => COLOR_NAMES[c].toLowerCase()).join(' or ')}.`);
  }
  $('summary').textContent = parts.join(' ');
}

function renderCardList() {
  $('card-list').innerHTML = allCards()
    .map(
      (card) => `<li>
        <label class="card-row">
          <input type="checkbox" data-action="toggle-card" data-card="${card.id}" ${game.active.includes(card.id) ? 'checked' : ''} />
          <span class="card-text">
            <strong>${escapeHtml(card.name)}</strong>
            <span>${card.custom ? describeEffect(card.effect) : `“${escapeHtml(card.text)}”`}</span>
          </span>
        </label>
        ${card.custom ? `<button type="button" class="btn small" data-action="delete-card" data-card="${card.id}" aria-label="Delete ${escapeHtml(card.name)}">Delete</button>` : ''}
      </li>`,
    )
    .join('');
}

function renderCustomColors() {
  const form = $<HTMLFormElement>('custom-form');
  const kind = new FormData(form).get('kind');
  const type = kind === 'keep' ? 'checkbox' : 'radio';
  $('custom-colors').innerHTML = COLORS.map(
    (color, i) => `<label class="pick" title="${COLOR_NAMES[color]}">
      <input type="${type}" name="color" value="${color}" ${type === 'radio' && i === 0 ? 'checked' : ''} />
      ${pip(color)}<span class="sr">${COLOR_NAMES[color]}</span>
    </label>`,
  ).join('');
}

function render() {
  renderSteps();
  renderPool();
  renderDuration();
  renderEffects();
  $<HTMLButtonElement>('undo').disabled = history.length === 0;
}

// ---------- Toast ----------

let toastTimer = 0;
function toast(message: string) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('show'), 2600);
}

function summarize(result: ReturnType<typeof endStep>): string {
  const lost = COLORS.filter((c) => result.lost[c]).map((c) => `${result.lost[c]}${c}`);
  const kept = COLORS.filter((c) => result.kept[c]).map((c) => `${result.kept[c]}${c}`);
  const parts: string[] = [];
  if (result.converted) {
    const { to, amount, from } = result.converted;
    const changed = amount - from[to];
    if (changed > 0) parts.push(`${changed} became ${COLOR_NAMES[to].toLowerCase()}`);
    if (from[to] > 0) parts.push(`kept ${from[to]}${to}`);
  }
  if (kept.length) parts.push(`kept ${kept.join(' ')}`);
  if (lost.length) parts.push(`lost ${lost.join(' ')}`);
  return parts.join(' · ');
}

// ---------- Emptying ----------

function chooseConversion(targets: Color[]): Promise<Color | null> {
  const dialog = $<HTMLDialogElement>('choose-dialog');
  const cards = activeCards();
  $('choice-list').innerHTML = targets
    .map((color) => {
      const names = cards
        .filter((card) => card.effect.kind === 'convert' && card.effect.to === color)
        .map((card) => escapeHtml(card.name))
        .join(', ');
      return `<button class="btn choice" value="${color}">${pip(color)} <span>Becomes ${COLOR_NAMES[color].toLowerCase()}<small>${names}</small></span></button>`;
    })
    .join('');
  dialog.returnValue = '';
  dialog.showModal();
  return new Promise((resolve) => {
    dialog.addEventListener(
      'close',
      () => resolve((COLORS as readonly string[]).includes(dialog.returnValue) ? (dialog.returnValue as Color) : null),
      { once: true },
    );
  });
}

async function empty(t: Transition, nextStep: number) {
  const effects = activeEffects();
  const targets = conversionTargets(effects);
  const losing = Object.values(wouldLose(game.pool, t, effects)).some((n) => n > 0);

  let convertTo: Color | null = targets[0] ?? null;
  if (losing && targets.length > 1) {
    convertTo = await chooseConversion(targets);
    if (!convertTo) return;
  }

  const result = endStep(game.pool, t, effects, convertTo);
  const message = summarize(result);
  if (nextStep === game.step && !message) {
    toast('Nothing to empty');
    return;
  }
  if (nextStep !== game.step) addDuration = 'step';
  commit({ ...game, pool: result.pool, step: nextStep, turn: game.turn + (t.turnEnds ? 1 : 0) });
  if (message) toast(message);
}

// ---------- Screen wake lock ----------

let wakeLock: WakeLockSentinel | null = null;
async function syncWakeLock() {
  try {
    if (wake && document.visibilityState === 'visible' && !wakeLock && 'wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => (wakeLock = null));
    } else if (!wake && wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  } catch {
    // The browser can refuse a wake lock (low battery, unsupported); nothing to do.
  }
}

// ---------- Events ----------

document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-action]');
  if (!target) return;
  const color = target.dataset.color as Color | undefined;

  switch (target.dataset.action) {
    case 'add':
      commit({ ...game, pool: addMana(game.pool, color!, 1, addDuration) });
      navigator.vibrate?.(8);
      break;
    case 'spend':
      commit({ ...game, pool: spendMana(game.pool, color!) });
      break;
    case 'empty':
      void empty({ combatEnds: false, turnEnds: false }, game.step);
      break;
    case 'next': {
      const to = (game.step + 1) % STEPS.length;
      void empty(transition(game.step, to), to);
      break;
    }
    case 'jump': {
      const to = Number(target.dataset.step);
      if (to !== game.step) void empty(transition(game.step, to), to);
      break;
    }
    case 'undo': {
      const previous = history.pop();
      if (previous) {
        game = previous;
        persist();
        render();
        renderCardList();
      }
      break;
    }
    case 'toggle-card': {
      const id = target.dataset.card!;
      const active = game.active.includes(id) ? game.active.filter((a) => a !== id) : [...game.active, id];
      commit({ ...game, active });
      renderCardList();
      break;
    }
    case 'delete-card': {
      const id = target.dataset.card!;
      custom = custom.filter((card) => card.id !== id);
      commit({ ...game, active: game.active.filter((a) => a !== id) });
      renderCardList();
      break;
    }
    case 'open-cards':
      renderCardList();
      renderCustomColors();
      $<HTMLDialogElement>('cards-dialog').showModal();
      break;
    case 'open-more':
      $<HTMLInputElement>('wake').checked = wake;
      $<HTMLDialogElement>('more-dialog').showModal();
      break;
    case 'convert':
      commit({ ...game, pool: convertPool(game.pool, color!) });
      toast(`Pool is now all ${COLOR_NAMES[color!].toLowerCase()}`);
      break;
    case 'clear':
      if (totalMana(game.pool) > 0) {
        commit({ ...game, pool: emptyPool() });
        toast('Pool cleared');
      }
      break;
    case 'new-game':
      commit(newGame());
      toast('New game. Undo to go back.');
      break;
  }
});

$('duration').addEventListener('change', (event) => {
  addDuration = (event.target as HTMLInputElement).value as Duration;
  renderDuration();
});

$('custom-form').addEventListener('change', (event) => {
  if ((event.target as HTMLInputElement).name === 'kind') renderCustomColors();
});

$('custom-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const colors = data.getAll('color') as Color[];
  if (!name || colors.length === 0) {
    toast('Give the card a name and pick at least one color');
    return;
  }
  const effect: Effect = data.get('kind') === 'keep' ? { kind: 'keep', colors } : { kind: 'convert', to: colors[0] };
  const card: Card = { id: `custom-${Date.now().toString(36)}`, name, text: describeEffect(effect), effect, custom: true };
  custom = [...custom, card];
  commit({ ...game, active: [...game.active, card.id] });
  form.reset();
  renderCustomColors();
  renderCardList();
});

$('wake').addEventListener('change', (event) => {
  wake = (event.target as HTMLInputElement).checked;
  persist();
  void syncWakeLock();
});

document.addEventListener('visibilitychange', () => void syncWakeLock());

$('convert-picks').innerHTML = COLORS.map(
  (color) => `<button class="pick" value="convert" data-action="convert" data-color="${color}" aria-label="Convert pool to ${COLOR_NAMES[color]}">${pip(color)}</button>`,
).join('');

render();
void syncWakeLock();
