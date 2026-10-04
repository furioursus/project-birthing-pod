# Agent instructions: mtg-mana-tracker

- Stack: Vite, TypeScript, no UI framework, `vite-plugin-pwa` for the manifest and service worker, Vitest for tests.
- Keep game rules in `src/rules.ts` as pure functions with no DOM access, and cover every rule change with a test in `src/rules.test.ts`. The UI in `src/main.ts` only renders state and calls into the rules.
- Saving and loading live in `src/storage.ts`. Everything the player would expect to survive a refresh goes into `Saved`. Parsing must accept any input, including older saves and garbage, without throwing; cover new fields with a test in `src/storage.test.ts`.
- Card presets live in `src/cards.ts`. Copy oracle text exactly from a trusted source such as Scryfall; never paraphrase a card from memory.
- Mana colors are always the six keys `W U B R G C`, in that order.
- Before committing, run `npm run check` (typecheck, tests, build) and make sure it passes.
