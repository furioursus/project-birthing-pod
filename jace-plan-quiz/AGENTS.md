# jace-plan-quiz

- Static site built with Vite and vanilla TypeScript. No UI framework; keep it that way unless the quiz outgrows plain DOM code.
- Quiz content (questions, answers, results) lives in `src/data/`. Scoring lives in `src/quiz.ts` and is covered by Vitest (`npm test`).
- Every result must stay reachable: the tests check that some set of answers produces each one. Run them after changing weights.
- Lore must be accurate to official Magic story canon, with a source link per result. Jokes go in the framing, not in the facts.
- Card names and story facts belong to Wizards of the Coast. Keep the Fan Content Policy notice in the footer, and don't bundle card art.
