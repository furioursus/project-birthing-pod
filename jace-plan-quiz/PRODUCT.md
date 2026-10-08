# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Takers:** Magic: The Gathering lore fans who know who Jace Beleren is. They take the quiz for a laugh and post their result to Bluesky or Discord.
- **Click-throughs:** their friends, many of them non-players, who arrive from a shared result link. They may never have heard of Jace. The result has to land for them without lore homework.

## Product Purpose

The quiz is a joke personality test, "Which poorly thought-out Jace Beleren plan are you?" Ten questions match the taker to one of fourteen canon moments where Jace had a plan. Twelve are plans that went badly ("Beefed it") and two are rare ones that worked.

Success is split evenly between two things:
- People post their result.
- People laugh and then read the real story behind it.

## Positioning

Every result is a real, sourced moment from official Magic story. The joke is that the most powerful telepath in the Multiverse keeps out-thinking himself. A generic personality quiz can't claim that, and neither can a fan quiz that invents its outcomes.

## Operating Context

- Usually taken on a phone, from a social feed, often in one sitting but sometimes interrupted.
- The result is shared as a link or a screenshot.
- Recipients open it cold, from a link preview, and may jump straight to a single result without taking the quiz.
- The plans index lets anyone browse every result.

## Capabilities and Constraints

- Vite and vanilla TypeScript, with no UI framework (project `AGENTS.md`). Deploys to Netlify from `netlify.toml`.
- Content lives in `src/data/`: 10 questions with 4 answers each, and 14 results.
- Scoring lives in `src/quiz.ts` and is covered by Vitest. Every result must stay reachable by some set of answers.
- Result ids are stable share slugs and never change once shipped.
- Results get real per-result URLs (`/plan/<id>`) with per-result link previews and share images generated at build time. Old `#/plan/<id>` links must keep working.

## Brand Commitments

- **Name:** Jace Plan Quiz.
- **Color:** the blue-mana color scheme is binding.
- **Voice:**
  - Dry and affectionate.
  - Jokes go in the framing (button labels, headings, the "reading"), never in the facts.
  - Existing phrases include "Formulate a plan", "Rethink the last one", "Share your shame", "Beefed it" and "It actually worked".
- **Concept:** mind-reading is the chosen experience concept.
  - Jace "reads" the taker as they answer.
  - He confidently presents a wrong result as an illusion, which then dissolves into the real one.
  - The fake-out is framing only. The result it lands on is always the scored, canon one.

## Evidence on Hand

- **Canon content:** 14 results in `src/data/results.ts`. Each has:
  - The plan.
  - The era and year.
  - What happened in canon.
  - A personal reading.
  - A 0–10 plan rating.
  - Real card names, which link to Scryfall.
  - A source link to the official story.
- **No card art or official imagery** may be bundled. Card names and story facts belong to Wizards of the Coast.
- **No invented lore.** Never fabricate story events, quotes or card names.
- **No invented engagement claims.** There are no testimonials or share counts, and none should be made up.

## Product Principles

1. Canon is sacred, framing is a playground.
2. The result is the product. It has to work as a screenshot, as a link preview and as a story.
3. Land the joke for a non-player without dumbing it down for a fan.
4. Jace's telepathy is the interaction, not just the subject.

## Accessibility & Inclusion

- Fully keyboard operable, with visible focus.
- Respect `prefers-reduced-motion`. The illusion fake-out is skipped, not just shortened, when reduced motion is on.
- Text contrast WCAG AA, and non-text UI at least 3:1.
- Screen readers get the real result without wading through the illusion.
