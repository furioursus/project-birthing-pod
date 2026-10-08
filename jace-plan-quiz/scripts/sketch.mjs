// Turns a piece of official Magic art into a pencil underdrawing for the
// blueprint: edge lines only, traced to SVG in Jace's pencil colour.
//
//   node scripts/sketch.mjs <source image> <out.svg> --title "Card name" --artist "Name" [--year 2012] [--source URL]
//     [--width 1100] [--detail 1.1] [--gain 9] [--speckle 40]
//
// Source art must come from Wizards (story articles, wallpapers), not Scryfall,
// whose image terms forbid altering their images. Every output carries its
// source and artist in <metadata> and in a comment, and the page credits the
// artist next to it. See the project AGENTS.md.

import { writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import potrace from 'potrace';
import sharp from 'sharp';

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    artist: { type: 'string' },
    year: { type: 'string', default: '' },
    source: { type: 'string', default: '' },
    width: { type: 'string', default: '1100' },
    detail: { type: 'string', default: '1.1' },
    gain: { type: 'string', default: '9' },
    speckle: { type: 'string', default: '40' },
    color: { type: 'string', default: '#9de2ff' },
    // Pixels to trim off the bottom of the source, for art that has its credit
    // strip baked in. Put the credit back as text next to the drawing instead.
    'crop-bottom': { type: 'string', default: '0' },
  },
});

const [input, output] = positionals;
if (!input || !output || !opts.title || !opts.artist) {
  console.error('Usage: node scripts/sketch.mjs <source> <out.svg> --title "Card" --artist "Artist" [--year 2012]');
  process.exit(1);
}

const width = Number(opts.width);
const detail = Number(opts.detail);
const gain = Number(opts.gain);

// Difference of Gaussians: a pixel is a line where it's darker than its
// surroundings. The fine blur keeps contours, the wide one is the local average.
const source = sharp(input);
const { width: sw, height: sh } = await source.metadata();
const cropBottom = Number(opts['crop-bottom']);
const base = sharp(input)
  .extract({ left: 0, top: 0, width: sw, height: sh - cropBottom })
  .resize({ width, withoutEnlargement: true })
  .greyscale();
const [fine, wide] = await Promise.all([
  base.clone().blur(detail).raw().toBuffer({ resolveWithObject: true }),
  base.clone().blur(detail * 3.2).raw().toBuffer({ resolveWithObject: true }),
]);
const { width: w, height: h } = fine.info;
const ink = Buffer.alloc(w * h);
for (let i = 0; i < ink.length; i++) {
  const line = Math.max(0, wide.data[i] - fine.data[i]) * gain;
  ink[i] = 255 - Math.min(255, line);
}
const linework = await sharp(ink, { raw: { width: w, height: h, channels: 1 } }).png().toBuffer();

const traced = await new Promise((resolve, reject) =>
  potrace.trace(
    linework,
    { threshold: 170, turdSize: Number(opts.speckle), optTolerance: 0.4, color: opts.color, background: 'transparent' },
    (error, svg) => (error ? reject(error) : resolve(svg)),
  ),
);

// Coordinates to one decimal place: invisible at page scale, about a third smaller.
const compact = traced.replace(/(\d+\.\d)\d+/g, '$1');

const credit = `${opts.title}, art by ${opts.artist}, © ${opts.year ? `${opts.year} ` : ''}Wizards of the Coast LLC`;
const svg = compact
  .replace(/<svg[^>]*>/, (tag) =>
    tag
      .replace(/ width="[^"]*"/, '')
      .replace(/ height="[^"]*"/, '')
      .replace(/ viewBox="[^"]*"/, '')
      .replace('<svg', `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax meet"`),
  )
  .replace(
    /(<svg[^>]*>)/,
    `$1\n<!-- Pencil underdrawing after ${credit}. Unofficial Fan Content under the Wizards Fan Content Policy. Made with scripts/sketch.mjs. -->\n<metadata>${credit}. Derived line art made with scripts/sketch.mjs (difference of Gaussians, traced with potrace)${opts.source ? `. Source: ${opts.source}` : ''}.</metadata>`,
  );

await writeFile(output, svg);
console.log(`${output}: ${w}×${h}, ${(Buffer.byteLength(svg) / 1024).toFixed(0)} KB`);
