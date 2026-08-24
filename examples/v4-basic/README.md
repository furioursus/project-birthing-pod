# v4-basic example

Minimal example showing this plugin loaded straight into a Tailwind v4
CSS-first config via `@plugin`, with no `padding` option — the breakout
utilities pull edge-to-edge with the viewport at each breakpoint but don't
know about the container's own `1rem` padding (see the main README for how
to pass `padding` explicitly if you want that accounted for).

To build it:

```sh
npm i -D @tailwindcss/cli
npx @tailwindcss/cli -i examples/v4-basic/input.css -o examples/v4-basic/output.css
```

Then open `index.html` in a browser.
