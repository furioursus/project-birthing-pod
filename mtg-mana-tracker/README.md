# mtg-mana-tracker

An installable, offline-first progressive web app for tracking the mana you add to your pool during a game of Magic: The Gathering. Tap a color to add mana, spend it as you cast, and step through the turn: the pool empties as each step ends, unless a card on the battlefield says otherwise. Toggle cards such as Kruphix, God of Horizons, Omnath, Locus of All, or Ozai, the Phoenix King to turn unspent mana into a single color instead of losing it, or cards such as Upwelling and Omnath, Locus of Mana to keep it.

## Using it

- **Add mana:** tap a color. Tap **−** under it to spend one.
- **Move through the turn:** **Next step** empties the pool and advances the step bar. Tap any step in the bar to jump straight to it; skipping past combat or into the next turn empties everything that would have expired along the way.
- **Empty pool:** empties without changing step, for extra steps like first-strike damage or if you don't track steps.
- **New mana lasts:** switch to *Combat* or *Turn* before adding mana from effects like firebending ("This mana lasts until end of combat") or Grand Warlord Radha. It switches back to *Step* when the step changes.
- **On the battlefield:** toggle the cards in play that change what happens to unspent mana. Mana a "keep" card protects stays. Everything else becomes the conversion color if a conversion card is out. If more than one conversion card is out, the app asks which replacement applies, as the rules let you choose.
- **Add your own:** any other card that keeps or converts mana can be added from the card list.
- **More (⋮):** convert the whole pool to one color, clear it while ignoring cards, keep the screen awake, or start a new game.
- **Undo** reverses the last change, up to the last 100.

### Saved on your device

Everything is saved on the device after every change: the pool, the step and turn, the cards on the battlefield, your custom cards, the undo history, and your settings. Refreshing, closing the tab, or restarting the phone picks up exactly where you left off. Nothing is sent anywhere.

The app asks the browser to keep this data instead of clearing it to free space. Installing the app to your home screen is the most reliable way to keep it, because Safari can clear data for sites that haven't been visited in a while unless they're installed. On iPhone, the installed app and Safari keep separate data, so a game started in one won't show up in the other.

Built-in cards: Kruphix, God of Horizons; Horizon Stone; Omnath, Locus of All; Ozai, the Phoenix King; Omnath, Locus of Mana; Leyline Tyrant; Upwelling.

## Development

```sh
npm ci
npm run dev     # local dev server
npm run check   # typecheck, tests, production build
npm run preview # serve the production build, including the service worker
```

The rules live in `src/rules.ts` and are covered by `src/rules.test.ts`. Saving and loading live in `src/storage.ts`, covered by `src/storage.test.ts`. The PWA icons in `public/` were rendered from the same SVG as `public/favicon.svg` using headless Chromium.

## Deploying

The app is live at <https://mtg-mana-tracker.netlify.app>. The `mtg-mana-tracker` Netlify site is linked to the `project-birthing-pod` repository with its base directory set to this folder, and everything else comes from `netlify.toml`. Netlify skips builds for commits that don't change this folder. Every pull request that does change it gets its own deploy preview link, and merges to `main` go to production. Because the site is linked, the workspace's Netlify workflow only runs the tests and leaves deploying to Netlify.
