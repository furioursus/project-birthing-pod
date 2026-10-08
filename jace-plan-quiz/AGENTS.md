# jace-plan-quiz

- Static site built with Vite and vanilla TypeScript. No UI framework; keep it that way unless the quiz outgrows plain DOM code.
- Quiz content (questions, answers, results) lives in `src/data/`. Scoring lives in `src/quiz.ts` and is covered by Vitest (`npm test`).
- Every result must stay reachable: the tests check that some set of answers produces each one. Run them after changing weights.
- Lore must be accurate to official Magic story canon, with a source link per result. Jokes go in the framing, not in the facts.
- Card names and story facts belong to Wizards of the Coast. Keep the Fan Content Policy notice in the footer.
- Never ship an original painting or card image. The one allowed use of official art is a pencil underdrawing:
  - Build it with `scripts/sketch.mjs` from art Wizards hosts itself, such as `media.wizards.com`. Never use Scryfall images, because Scryfall's terms forbid altering them.
  - Keep the source file in the gitignored `art-src/`.
  - Commit only the SVG in `public/art/`, with the source URL in its metadata.
  - Show the artist and the © Wizards notice as visible text beside the drawing.
- Routes are real paths: `/`, `/quiz/<n>`, `/plan/<id>` and `/plans`. Quiz progress lives in `history.state`, so refresh and Back work. Old `#/plan/<id>` links redirect on load.
- `npm run build` runs `scripts/prerender.mjs` after Vite. It writes `dist/plan/<id>/index.html` with per-result link-preview tags, plus a 1200×630 share image per result in `dist/og/`. Result ids are share URLs, so never rename one.
- Design context lives in `PRODUCT.md`, `DESIGN.md` and `.impeccable/`. The visual world is a cyanotype blueprint in blue mana. Keep new UI inside it.
- `src/data/glossary.ts` explains lore terms for non-players. Same canon rule as the results: no jokes in definitions.
