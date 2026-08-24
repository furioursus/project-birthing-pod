const plugin = require('tailwindcss/plugin');

/**
 * tailwind-container-break-out-v4
 *
 * A fork of https://github.com/LucidNinja/tailwind-container-break-out,
 * updated to work with Tailwind CSS v4's stricter plugin-selector rules
 * (see upstream issue #8, "Support Tailwind v4").
 *
 * WHAT CHANGED FROM THE ORIGINAL
 * -------------------------------
 * Tailwind v3's `addComponents`/`addUtilities` accepted objects shaped like:
 *
 *   { '@media (min-width: 40rem)': { '.mx-break-out': { ... } } }
 *
 * i.e. an at-rule as the *top-level* key, with class selectors nested inside.
 * Tailwind v4's plugin compatibility layer validates that every top-level key
 * passed to addComponents/addUtilities is a class selector, and rejects the
 * at-rule-first shape with:
 *
 *   "... defines an invalid utility selector. Utilities must be a single
 *   class name and start with a lowercase letter, eg. `.scrollbar-none`."
 *
 * The fix is to flip the nesting so each utility class is the top-level key,
 * with the `@media` blocks nested *inside* it as CSS-in-JS properties. That
 * shape is valid under both Tailwind v3 and v4, so this plugin works as a
 * drop-in replacement for either major version.
 *
 * WHAT ELSE CHANGED
 * ------------------
 * Tailwind v4 no longer resolves `theme('container.padding')` /
 * `theme('container.screens')` when your theme is configured CSS-first (via
 * `@theme` in your CSS instead of a `tailwind.config.js`) — v4 dropped the
 * `container.*` theme config keys entirely, so there's nothing there to
 * read. This plugin now accepts explicit `screens`/`padding` options (same
 * shape as Tailwind v3's `theme.container.padding`) via `plugin.withOptions`,
 * and only falls back to `theme('container.screens')`/`theme('container.padding')`
 * when you haven't passed one explicitly (useful if you're still using a
 * `tailwind.config.js` via `@config`, where those keys still work).
 */

function normalizeScreens(screens, root = true) {
  if (Array.isArray(screens)) {
    return screens.map(screen => {
      if (root && Array.isArray(screen)) {
        throw new Error('The tuple syntax is not supported for `screens`.');
      }

      if (typeof screen === 'string') {
        return { name: screen.toString(), values: [{ min: screen, max: undefined }] };
      }

      let [name, options] = screen;
      name = name.toString();

      if (typeof options === 'string') {
        return { name, values: [{ min: options, max: undefined }] };
      }

      if (Array.isArray(options)) {
        return { name, values: options.map(option => resolveValue(option)) };
      }

      return { name, values: [resolveValue(options)] };
    });
  }

  return normalizeScreens(Object.entries(screens ?? {}), false);
}

function resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw } = {}) {
  return { min, max, raw };
}

function extractMinWidths(breakpoints = []) {
  return breakpoints
    .flatMap(breakpoint => breakpoint.values.map(breakpoint => breakpoint.min))
    .filter(v => v !== undefined);
}

function mapMinWidthsToPadding(minWidths, screens, paddings) {
  if (typeof paddings === 'undefined') {
    return [];
  }

  if (!(typeof paddings === 'object' && paddings !== null)) {
    return [
      {
        screen: 'DEFAULT',
        minWidth: 0,
        padding: paddings
      }
    ];
  }

  let mapping = [];

  if (paddings.DEFAULT) {
    mapping.push({
      screen: 'DEFAULT',
      minWidth: 0,
      padding: paddings.DEFAULT
    });
  }

  let lastNonNullPadding = null;

  for (let minWidth of minWidths) {
    for (let screen of screens) {
      for (let { min } of screen.values) {
        if (min === minWidth) {
          const paddingForScreenName = paddings[screen.name];
          if (paddingForScreenName !== undefined) {
            mapping.push({ minWidth, padding: paddingForScreenName });
            lastNonNullPadding = paddingForScreenName;
          } else if (lastNonNullPadding !== null) {
            mapping.push({ minWidth, padding: lastNonNullPadding });
          }
        }
      }
    }
  }

  return mapping;
}

/**
 * Builds one CSS-in-JS declaration object for a single utility class, with
 * the base (mobile-first, `minWidth === 0`) rules at the top level and each
 * larger breakpoint nested underneath as `@media (min-width: ...)`. This is
 * the shape Tailwind v4 requires (class selector as the top-level key).
 */
function buildDeclaration(minWidths, generator) {
  const sortedMinWidths = Array.from(new Set(minWidths)).sort((a, z) => parseInt(a) - parseInt(z));

  const declaration = { ...generator(0) };

  for (const minWidth of sortedMinWidths) {
    declaration[`@media (min-width: ${minWidth})`] = { ...generator(minWidth) };
  }

  return declaration;
}

module.exports = plugin.withOptions(function (options = {}) {
  return function ({ addComponents, addBase, theme }) {
    const screens = normalizeScreens(options.screens ?? theme('container.screens', theme('screens')));
    const minWidths = extractMinWidths(screens);
    const paddings = mapMinWidthsToPadding(minWidths, screens, options.padding ?? theme('container.padding'));

    // TODO - account for non-centered containers.
    const generateMarginFor = (minWidth, xAxis) => {
      let paddingConfig;
      if (paddings.length === 1) {
        paddingConfig = paddings[0];
      } else {
        paddingConfig = paddings.find(padding => `${padding.minWidth}` === `${minWidth}`);
      }

      // If the minWidth is zero (screen size is more than zero), there's no need to do complex calc.
      if (minWidth === 0) {
        if (!paddingConfig) {
          return {};
        }
        if (xAxis === 'x') {
          return {
            marginLeft: `-${paddingConfig.padding}`,
            marginRight: `-${paddingConfig.padding}`
          };
        }
        if (xAxis === 'r') {
          return {
            marginRight: `-${paddingConfig.padding}`
          };
        }
        if (xAxis === 'l') {
          return {
            marginLeft: `-${paddingConfig.padding}`
          };
        }
      }

      // If there is a minWidth, but there's no padding config, just do calc but don't worry about the padding.
      if (!paddingConfig) {
        if (xAxis === 'x') {
          return {
            marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`,
            marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`
          };
        }
        if (xAxis === 'r') {
          return {
            marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`
          };
        }
        if (xAxis === 'l') {
          return {
            marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 )`
          };
        }
      }

      // If there is a padding config and there is a minWidth, do complex calc.
      if (xAxis === 'x') {
        return {
          marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`,
          marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
        };
      }
      if (xAxis === 'r') {
        return {
          marginRight: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
        };
      }
      if (xAxis === 'l') {
        return {
          marginLeft: `calc((-100vw + var(--twcb-scrollbar-width)) / 2 + ${minWidth} / 2 - ${paddingConfig.padding} )`
        };
      }
    };

    const generatePaddingFor = (minWidth, xAxis) => {
      let paddingConfig;
      if (paddings.length === 1) {
        paddingConfig = paddings[0];
      } else {
        paddingConfig = paddings.find(padding => `${padding.minWidth}` === `${minWidth}`);
      }

      if (minWidth === 0) {
        if (!paddingConfig) {
          return {};
        }
        if (xAxis === 'x') {
          return {
            paddingLeft: `${paddingConfig.padding}`,
            paddingRight: `${paddingConfig.padding}`
          };
        }
        if (xAxis === 'r') {
          return {
            paddingRight: `${paddingConfig.padding}`
          };
        }
        if (xAxis === 'l') {
          return {
            paddingLeft: `${paddingConfig.padding}`
          };
        }
      }

      if (!paddingConfig) {
        if (xAxis === 'x') {
          return {
            paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`,
            paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`
          };
        }
        if (xAxis === 'r') {
          return {
            paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`
          };
        }
        if (xAxis === 'l') {
          return {
            paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 )`
          };
        }
      }

      if (xAxis === 'x') {
        return {
          paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`,
          paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
        };
      }
      if (xAxis === 'r') {
        return {
          paddingRight: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
        };
      }
      if (xAxis === 'l') {
        return {
          paddingLeft: `calc((100vw - var(--twcb-scrollbar-width)) / 2 - ${minWidth} / 2 + ${paddingConfig.padding} )`
        };
      }
    };

    addBase({
      ':root': {
        '--twcb-scrollbar-width': '0px'
      }
    });

    addComponents({
      '.mx-break-out': buildDeclaration(minWidths, minWidth => generateMarginFor(minWidth, 'x')),
      '.ml-break-out': buildDeclaration(minWidths, minWidth => generateMarginFor(minWidth, 'l')),
      '.mr-break-out': buildDeclaration(minWidths, minWidth => generateMarginFor(minWidth, 'r')),
      '.px-break-out': buildDeclaration(minWidths, minWidth => generatePaddingFor(minWidth, 'x')),
      '.pl-break-out': buildDeclaration(minWidths, minWidth => generatePaddingFor(minWidth, 'l')),
      '.pr-break-out': buildDeclaration(minWidths, minWidth => generatePaddingFor(minWidth, 'r'))
    });
  };
});
