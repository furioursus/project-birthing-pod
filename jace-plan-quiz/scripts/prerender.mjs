// Runs after `vite build`. Writes a page per result (and the sheet index) with
// its own link-preview tags, plus a 1200×630 blueprint share image for each,
// so a shared /plan/<id> link unfurls as that plan rather than the generic quiz.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { results } from '../src/data/results.ts';

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

// Netlify sets URL (production) and DEPLOY_PRIME_URL (previews) during builds.
const site = (
  process.env.SITE_URL ??
  (process.env.CONTEXT === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL) ??
  process.env.URL ??
  'https://jace-plan-quiz.netlify.app'
).replace(/\/$/, '');

const C = {
  sheet: '#0f3b78',
  deep: '#0a2b5a',
  ink: '#f2f7ff',
  soft: '#c2d6f2',
  line: '#e6effc',
  dim: 'rgba(230,239,252,0.5)',
  pencil: '#9de2ff',
  redline: '#ff8b7b',
  gold: '#ffd56e',
};

const font = (pkg, file) => readFile(join(dirname(require.resolve(`${pkg}/package.json`)), 'files', file));
const fonts = [
  { name: 'Big Shoulders', weight: 700, data: await font('@fontsource/big-shoulders-display', 'big-shoulders-display-latin-700-normal.woff') },
  { name: 'Big Shoulders', weight: 800, data: await font('@fontsource/big-shoulders-display', 'big-shoulders-display-latin-800-normal.woff') },
  { name: 'Architects Daughter', weight: 400, data: await font('@fontsource/architects-daughter', 'architects-daughter-latin-400-normal.woff') },
  {
    name: 'Atkinson',
    weight: 400,
    data: await font('@fontsource/atkinson-hyperlegible-next', 'atkinson-hyperlegible-next-latin-400-normal.woff'),
  },
];

/** A satori node. Any element with more than one child has to be a flex box. */
const el = (type, style, ...children) => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.flat().filter((c) => c !== false && c != null) },
});

const W = 1200;
const H = 630;

const gridSvg = (() => {
  let lines = '';
  for (let x = 0; x <= W; x += 24) {
    const o = x % 120 === 0 ? 0.09 : 0.045;
    lines += `<path d="M${x} 0V${H}" stroke="white" stroke-opacity="${o}"/>`;
  }
  for (let y = 0; y <= H; y += 24) {
    const o = y % 120 === 0 ? 0.09 : 0.045;
    lines += `<path d="M0 ${y}H${W}" stroke="white" stroke-opacity="${o}"/>`;
  }
  return `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${lines}</svg>`).toString('base64')}`;
})();

function sheet(...children) {
  return el(
    'div',
    { width: W, height: H, position: 'relative', backgroundColor: C.sheet, color: C.ink, fontFamily: 'Atkinson' },
    el('img', { position: 'absolute', left: 0, top: 0, width: W, height: H }),
    el('div', { position: 'absolute', left: 16, top: 16, right: 16, bottom: 16, border: `2px solid ${C.line}` }),
    el('div', { position: 'absolute', left: 24, top: 24, right: 24, bottom: 24, border: `1px solid ${C.dim}` }),
    el('div', { position: 'absolute', left: 64, top: 56, right: 64, bottom: 56, flexDirection: 'column' }, ...children),
  );
}

// satori reads the grid from the img's src, which el() can't set through style.
function withGrid(tree) {
  tree.props.children[0].props.src = gridSvg;
  return tree;
}

const label = (text, extra = {}) =>
  el('div', { fontFamily: 'Big Shoulders', fontWeight: 700, fontSize: 22, letterSpacing: 3, color: C.soft, ...extra }, text);

function stamp(text, color) {
  return el(
    'div',
    { border: `3px solid ${color}`, padding: 4, borderRadius: 4, transform: 'rotate(-5deg)', alignSelf: 'flex-start' },
    el(
      'div',
      {
        border: `2px solid ${color}`,
        borderRadius: 2,
        padding: '8px 16px 4px',
        fontFamily: 'Big Shoulders',
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: 3,
        color,
      },
      text.toUpperCase(),
    ),
  );
}

function resultCard(r, sheetNo) {
  const color = r.outcome === 'beef' ? C.redline : C.gold;
  const titleSize = r.title.length > 34 ? 82 : r.title.length > 22 ? 96 : 112;
  const plan = r.plan.length > 150 ? `${r.plan.slice(0, 147).replace(/\s+\S*$/, '')}…` : r.plan;
  return withGrid(
    sheet(
      el(
        'div',
        { justifyContent: 'space-between', alignItems: 'center' },
        label('JACE PLAN QUIZ'),
        label(`SHEET ${sheetNo} · ${r.year}`),
      ),
      el(
        'div',
        { flex: 1, marginTop: 28, gap: 48 },
        el(
          'div',
          { flex: 1, flexDirection: 'column', justifyContent: 'center' },
          el(
            'div',
            { fontFamily: 'Big Shoulders', fontWeight: 800, fontSize: titleSize, lineHeight: 0.92, color: C.ink },
            // Keep the last two words together so a title never ends on a lone word.
            r.title.toUpperCase().replace(/ (\S+)$/, '\u00a0$1'),
          ),
          el('div', { marginTop: 24, fontFamily: 'Architects Daughter', fontSize: 30, lineHeight: 1.3, color: C.pencil }, plan),
        ),
        el(
          'div',
          { width: 300, flexDirection: 'column', justifyContent: 'center', gap: 28, paddingLeft: 32, borderLeft: `1px solid ${C.dim}` },
          stamp(r.outcome === 'beef' ? 'Beefed it' : 'It actually worked', color),
          el(
            'div',
            { flexDirection: 'column', gap: 10 },
            label('PLAN RATING', { fontSize: 18 }),
            el(
              'div',
              { border: `2px solid ${C.line}`, height: 22 },
              ...Array.from({ length: 10 }, (_, i) =>
                el('div', {
                  flex: 1,
                  backgroundColor: i < r.planRating ? color : 'transparent',
                  borderLeft: i === 0 ? 'none' : `1px solid ${C.dim}`,
                }),
              ),
            ),
            el('div', { fontFamily: 'Big Shoulders', fontWeight: 800, fontSize: 40 }, `${r.planRating} / 10`),
          ),
        ),
      ),
      el(
        'div',
        { marginTop: 20, fontSize: 22, color: C.soft },
        'Which poorly thought-out Jace Beleren plan are you?',
      ),
    ),
  );
}

function homeCard() {
  const big = { fontFamily: 'Big Shoulders', fontWeight: 800, fontSize: 104, lineHeight: 0.92 };
  return withGrid(
    sheet(
      el('div', { justifyContent: 'space-between' }, label('JACE PLAN QUIZ'), label('14 PLANS · 10 QUESTIONS')),
      el(
        'div',
        { flex: 1, flexDirection: 'column', justifyContent: 'center' },
        el(
          'div',
          { alignItems: 'flex-end', gap: 28 },
          el('div', big, 'WHICH'),
          el(
            'div',
            { position: 'relative', color: C.soft, ...big },
            'BRILLIANT',
            el('div', {
              position: 'absolute',
              left: -6,
              right: -6,
              top: 46,
              height: 8,
              backgroundColor: C.redline,
              transform: 'rotate(-5deg)',
            }),
          ),
        ),
        el(
          'div',
          { fontFamily: 'Architects Daughter', fontSize: 48, color: C.redline, transform: 'rotate(-3deg)', margin: '10px 0 6px 8px' },
          'poorly thought-out',
        ),
        el('div', big, 'JACE BELEREN PLAN ARE YOU?'),
      ),
      el('div', { fontFamily: 'Architects Daughter', fontSize: 26, color: C.pencil }, 'Ten questions. Jace reads your mind. He gets it wrong first.'),
    ),
  );
}

async function png(tree, file) {
  const svg = await satori(tree, { width: W, height: H, fonts });
  const out = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
  await writeFile(file, out);
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = await readFile(join(dist, 'index.html'), 'utf8');

function page({ title, description, path, image }) {
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${site}${path}" />`,
    `<meta property="og:image" content="${site}${image}" />`,
    `<meta property="og:image:width" content="${W}" />`,
    `<meta property="og:image:height" content="${H}" />`,
    `<meta name="twitter:image" content="${site}${image}" />`,
    `<link rel="canonical" href="${site}${path}" />`,
  ].join('\n    ');
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/<meta\s+property="og:title"[\s\S]*?\/>/, '')
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, '')
    .replace('</head>', `    ${tags}\n  </head>`);
}

async function writePage(path, html) {
  const dir = join(dist, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

await mkdir(join(dist, 'og'), { recursive: true });

const homeDescription =
  'Answer ten questions. Get matched to a moment in Magic story where Jace had a plan. It went great. (It did not go great.)';
await png(homeCard(), join(dist, 'og', 'home.png'));
await writeFile(
  join(dist, 'index.html'),
  page({ title: 'Which poorly thought-out Jace Beleren plan are you?', description: homeDescription, path: '/', image: '/og/home.png' }),
);
await writePage(
  'plans',
  page({ title: 'Sheet index · Jace Plan Quiz', description: 'Every Jace Beleren plan, in publication order. Spoilers, obviously.', path: '/plans', image: '/og/home.png' }),
);

const inPublicationOrder = [...results].sort((a, b) => a.year - b.year);
for (const [i, r] of inPublicationOrder.entries()) {
  const sheetNo = `A-${String(i + 1).padStart(2, '0')}`;
  await png(resultCard(r, sheetNo), join(dist, 'og', `${r.id}.png`));
  await writePage(
    join('plan', r.id),
    page({
      title: `${r.title} · Which Jace plan are you?`,
      description: `${r.outcome === 'beef' ? 'Beefed it' : 'It actually worked'}. The plan: ${r.plan}`,
      path: `/plan/${r.id}`,
      image: `/og/${r.id}.png`,
    }),
  );
}

console.log(`Prerendered ${results.length} plan pages and ${results.length + 1} share images for ${site}`);
