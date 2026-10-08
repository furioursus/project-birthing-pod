---
name: Jace Plan Quiz
description: A cyanotype blueprint of Jace Beleren's mind palace, surveyed, misread and redlined.
colors:
  sheet: "#0f3b78"
  sheet-deep: "#0a2b5a"
  ink: "#f2f7ff"
  ink-soft: "#c2d6f2"
  line: "#e6effc"
  line-dim: "rgb(230 239 252 / 0.5)"
  pencil: "#9de2ff"
  redline: "#ff8b7b"
  gold: "#ffd56e"
  grid-major: "rgb(255 255 255 / 0.085)"
  grid-minor: "rgb(255 255 255 / 0.04)"
  vignette: "rgb(4 22 54 / 0.5)"
typography:
  display:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.9rem, 8.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.7rem, 8vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  title:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.1rem, 5.6vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1
  section:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.02em"
  room:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  zone:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
  small:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
  button:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.07em"
  stamp:
    fontFamily: "'Big Shoulders Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.7rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.08em"
  hand:
    fontFamily: "'Architects Daughter', cursive"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
  hand-plan:
    fontFamily: "'Architects Daughter', cursive"
    fontSize: "clamp(1.25rem, 3.2vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  sm: "2px"
  stamp: "3px"
  bubble: "50%"
spacing:
  wall: "2px"
  zone: "16px"
  zone-compact: "6px"
  stack: "0.75rem"
  block: "1.5rem"
  section: "2.5rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.4rem 0.7rem"
    height: "3rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.4rem 0.7rem"
    height: "3rem"
  button-door:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet-deep}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.75rem 0.95rem"
    height: "3.5rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    padding: "0.5rem 0"
    height: "2.75rem"
  answer:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.1rem"
    height: "4rem"
  answer-hover:
    backgroundColor: "{colors.sheet-deep}"
    textColor: "{colors.ink}"
  answer-picked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet-deep}"
  answer-bubble:
    rounded: "{rounded.bubble}"
    size: "2.3rem"
  room:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.room}"
    padding: "0.9rem 1rem 1rem"
    height: "8rem"
  stamp-beef:
    textColor: "{colors.redline}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "0.4rem 0.85rem 0.3rem"
  stamp-triumph:
    textColor: "{colors.gold}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "0.4rem 0.85rem 0.3rem"
  title-block:
    textColor: "{colors.ink}"
    padding: "1rem 1.1rem 1.1rem"
    width: "21rem"
  intent:
    textColor: "{colors.pencil}"
    typography: "{typography.hand-plan}"
    padding: "1.5rem 1.25rem 1.15rem"
  survey-cell:
    backgroundColor: "{colors.sheet}"
    height: "2rem"
  survey-cell-done:
    backgroundColor: "{colors.sheet-deep}"
    height: "2rem"
  scale-bar:
    height: "0.95rem"
  scale-segment-beef:
    backgroundColor: "{colors.redline}"
  scale-segment-triumph:
    backgroundColor: "{colors.gold}"
  evidence-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.4rem 0.75rem"
---

# Design System: Jace Plan Quiz

## Overview

**Creative North Star: "The Mind-Palace Blueprint"**

Jace's plans are literal plans. Every surface is one drawing sheet: a drenched cyanotype blue ground with a faint white grid, a double-ruled frame with zone markers, and white single-weight linework that draws the mind palace as a floor plan. The draftsman is confident, and the drawing is wrong. Corrections arrive in a red pencil, Jace's own asides arrive in a pale-cyan pencil, and the rare plan that worked gets a gold stamp. The joke lives in the drafting conventions, so the sheet has to read as a real drawing first. The title block, the sheet numbers A-01 to A-14, "Checked by: Nobody" and "Not to scale" all carry it.

Density is a drawing's density: tight labelled cells, hairline dividers and generous open sheet around the main figure. Nothing floats. Every element sits in a ruled cell, a room or the title block, and the walls between cells are the line colour showing through a 2px gap. The world is flat and unlit. Depth comes from line weight, hatching and one darker blue for wells.

Motion is drafting. Linework and pencil notes draw on from left to right with one exponential ease-out. The only element that performs beyond drawing-on is the illusion: Jace stamps a wrong plan APPROVED, strikes it, clouds it in red and dissolves it before the real sheet is drawn.

**Key Characteristics:**
- One cyanotype sheet per screen, framed by a double rule with zone markers A–F and 1–4.
- White linework at two weights: a full 1.5px rule for structure and a half-opacity 1px rule for subdivision.
- Two pencils: pale cyan for Jace's voice and redline red for corrections. Gold appears only for a plan that worked.
- Diagonal hatching marks surveyed, chosen or hovered space.
- Condensed drafting capitals for anything a draftsman would letter, and a hyperlegible face for anything you read.
- Flat: no shadows at rest, and depth only through line, hatch and the deeper sheet blue.
- Motion draws linework on. Only the illusion sequence does more.

## Colors

A single drenched blue-mana ground, three whites ranked by importance, and three coloured pencils with fixed meanings.

### Primary
- **Cyanotype Sheet** (#0f3b78): the ground of every surface, every room and every answer at rest. The blue-mana scheme is a binding brand commitment, so this colour is never swapped or lightened. It is also the `theme-color`, and the favicon tile uses it.
- **Deep Sheet** (#0a2b5a): the darker well. It fills completed survey cells, sits under hatching on a hovered answer, colours text on filled ink buttons and picked answers, and tracks the scrollbar. The body vignette darkens the sheet's edges towards it.

### Secondary
- **Jace's Pencil** (#9de2ff): pale-cyan graphite for everything Jace says in his own hand: margin notes, the plan in the result's intent box, "Reading you…", "Yours.", key hints. The same colour is the interaction pencil: the dashed focus outline, the current survey cell, the text selection, link underlines, hover underlines and the who's-who disclosure marker.

### Tertiary
- **Redline** (#ff8b7b): the correction pencil. It covers the strike through "brilliant" and the pencilled "poorly thought-out", the revision cloud, the REV 1 triangle and its note, the "Beefed it" status and stamp, and filled scale segments on a beefed plan.
- **Approval Gold** (#ffd56e): reserved for the two plans that actually worked. It covers their status text, stamp and filled scale segments, and nothing else.

### Neutral
- **Ink** (#f2f7ff): primary text and the fill of the one primary action per view (the door button, Share, Find your own plan, Take the quiz) and of a picked answer.
- **Soft Ink** (#c2d6f2): secondary text. It covers ledes, metadata, captions, field labels, zone markers, glossary definitions, the struck word and the door-swing arc.
- **Line** (#e6effc): the 1.5px structural rule. It covers the sheet frame, button and answer borders, the title-block border, the scale-bar border, the index table border and header rule. It also shows through the 2px gaps between floor-plan rooms and survey cells, so the walls read as line.
- **Dim Line** (rgb(230 239 252 / 0.5)): the 1px subdivision rule. It covers the inner frame, zone dividers, header and footer rules, title-block cell dividers, scale ticks, table row dividers, the intent box, evidence-chip borders and the quiet-link underline.

### Measured contrast on the sheet

| Token | Ratio on Cyanotype Sheet |
|---|---|
| ink | 10.18 |
| ink-soft | 7.40 |
| pencil | 7.70 |
| redline | 4.82 |
| gold | 7.82 |
| line | 9.45 |
| line-dim | ≈3.3 |

Every text token clears WCAG AA (4.5:1) on the plain sheet, and Dim Line clears the 3:1 non-text floor. Hatching lightens the ground under its stripes. On a stripe, Redline drops to about 2.85:1 and Soft Ink to about 4.39:1, so hatch only belongs under Ink, Pencil or Gold text, or under large type.

### Named Rules
**The Two Pencils Rule.** Only two coloured pencils write on the sheet. Pale cyan is Jace speaking or the reader's cursor. Red is a correction or a failure. Neither one sets body copy, and neither one decorates.

**The Gold Is Earned Rule.** Gold appears only where a plan actually worked: its stamp, its status and its scale segments. It is never an accent, a highlight or a hover.

**The One Fill Rule.** Solid Ink fill is reserved for the single primary action in view and for the answer just picked. Everything else is line on sheet.

## Typography

**Display Font:** Big Shoulders Variable (with Arial Narrow, sans-serif), the variable cut with the optical-size axis
**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif)
**Label/Mono Font:** Architects Daughter (with cursive), for hand lettering only

**Character:** Big Shoulders is the draftsman's lettering: condensed, upright capitals that letter the titles, field labels, buttons, sheet numbers and stamps. Atkinson Hyperlegible Next carries every sentence of canon and every reading, because people arriving from a shared link have to read it cold. Architects Daughter is Jace's own hand, and it only ever speaks for him.

### Hierarchy
The ramp has thirteen steps, each a CSS custom property (`--fs-*`) in `src/style.css`. Every font size in the stylesheet uses one of them. The only exceptions are the struck correction (0.42em, relative to the headline) and the revision triangle's numeral (SVG user units). A role may reuse another step's size in its own face.

- **Display** (800, clamp(2.9rem, 8.4vw, 6rem), 0.92, uppercase): the landing headline in the entrance hall, carrying the struck word and its pencilled correction.
- **Headline** (800, clamp(2.7rem, 8vw, 5.5rem), 0.92, uppercase): result titles, the illusion's fake title, and the page titles of the sheet index and the missing page.
- **Title** (700, clamp(2.1rem, 5.6vw, 3.4rem), 1, sentence case, max 24ch): the question prompt, and "Reading you…" in the pencil hand.
- **Stamp** (800, 1.7rem, 1, 0.08em, uppercase): the status stamp, at the Lede size below 60rem.
- **Section** (700, 1.6rem, 1.1, 0.02em, uppercase): result-body section headings and the scale-bar value.
- **Room** (700, 1.35rem, 1.05, balanced wrap): plan names in rooms and in the sheet index, plus the door button at 800. The illusion's pencil notes use this size in the hand.
- **Hand plan** (400, clamp(1.25rem, 3.2vw, 1.5rem), 1.4): the plan as Jace wrote it, in the intent box.
- **Lede** (400, 1.2rem, 1.6, Soft Ink): ledes. Below 40rem, sheet-index plan names, the door button and the stamp step down to this size.
- **Body** (400, 1.0625rem, 1.6, pretty wrap): all reading text, answers included. Measures are capped at 65ch in result sections, 60ch for ledes (46ch in the hall) and 62ch for general notes.
- **UI** (1.05rem): buttons (700, 0.07em, uppercase), the who's-who summary and terms, result meta, index sheet numbers and years, and pencil notes in the hand.
- **Small** (400, 0.875rem, 1.55): the footer, room meta, title-block meta, evidence chips, the index status and meta line, the survey sheet number, the key hint and the stamp gloss.
- **Label** (700, 0.78rem, 1.2, 0.14em, uppercase, Soft Ink): title-block field labels, drawing-info terms, room numbers, table column heads, the intent box label, general-notes heading, title-block meta terms and scale ticks.
- **Zone** (600, 0.625rem, 0.05em): zone markers only, the smallest lettering on the sheet.

Numerals in the sheet index are tabular. Headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.

### Named Rules
**The Three Hands Rule.** Big Shoulders letters, Atkinson reads, and Architects Daughter is Jace: his asides, and his plan as he wrote it. What happened, the reading and the glossary definitions are never set in the pencil hand, and Jace's asides are never set in Atkinson.

**The Drafting Caps Rule.** Uppercase belongs to Big Shoulders lettering: titles, labels, buttons, stamps. Atkinson is never set in capitals, and the pencil hand never is either.

## Layout

The page is one framed drawing. The body leaves a 10px margin (6px under 40rem) around a `.sheet` frame that fills at least the viewport height. The frame is a 1.5px Line border with an inner 1px Dim Line rule inset by the zone width (16px, or 6px under 40rem). Zone markers A–F run along the top and bottom bands, and 1–4 run down the sides. Inside the frame, a header strip (wordmark and Sheet index link) and a footer (legal notice and drawing-info block) are separated from the content by Dim Line rules.

Content sits in `main`, which is capped at 78rem and centred, with a fluid gutter of clamp(1rem, 4vw, 2.5rem), tightened to 0.875rem below 40rem. The ground behind everything is a two-level grid: major lines every 120px at 8.5% white and minor lines every 24px at 4% white, under a radial vignette that darkens the edges.

**Floor plan (landing).** The floor plan is a grid whose background is Line, with a 2px gap and 3px padding. Rooms are painted in Sheet, so the walls are the line showing through. At 60rem and above it has six columns with rows of at least 8.5rem. The entrance hall spans columns 2–5 and rows 1–3, the first six rooms flank it, and four of the remaining rooms are double-width. Below 60rem it has two columns, the hall goes full width at the top with the door button in the first viewport, and the rooms follow in pairs.

**Question.** Content is capped at 64rem. At 60rem and above it is two columns: answers and controls in a 44rem column, and the pencil margin note in the right margin, rotated -4°. Below that it is one column with the margin note right-aligned above the answers at -2°.

**Result.** At 60rem and above the result is two columns: the head and body in a fluid column, and a 21rem title block that sticks at 1.5rem from the top. Below 60rem the title block's first row pairs Status and Plan rating side by side (1fr and 1.1fr), so Share stays above the fold, and the remaining cells run full width.

**Sheet index.** A full-width table. Under 40rem the Story and Year columns hide and their content moves into a small meta line under each plan name.

**Breakpoints in use:** 30rem (action buttons go full width), 40rem (compact frame, index collapse), 60rem (multi-column layouts; the matching max-width queries use 59.99rem). Hover styles sit behind `(hover: hover)`, and the keyboard hint only appears with `(hover: hover) and (pointer: fine)`.

**Rhythm.** Stacks of controls use a 0.75rem gap. Action rows start 2.5rem below content. Result sections open with 2.25rem above their heading, and the intent box and title block keep 2rem and 2.5rem below.

## Elevation & Depth

The system is flat. A blueprint has no light source, so no element casts a shadow at rest and surfaces never stack. Depth is drawn with four devices instead:
- line weight: a full 1.5px rule for an object's edge and a 1px half-opacity rule for its subdivisions
- the 45° hatch for surveyed or selected space
- Deep Sheet as a recessed well
- the body vignette that darkens the edges of the drawing

### Named Rules
**The Flat Sheet Rule.** Nothing floats above the drawing. If something needs emphasis, give it a heavier line, hatch it or fill it with Ink. Never lift it.

**The Hatch Rule.** The hatch (`repeating-linear-gradient(-45deg, rgb(230 239 252 / 0.13) 0 1.5px, transparent 1.5px 9px)`) marks surveyed space. It covers completed survey cells, the reader's own room, and hovered rooms, answers and evidence chips. At 13% it keeps Redline status text above 3:1 even where a stripe passes behind it. It is a state, never a texture, so it never appears at rest on something unremarkable.

## Shapes

The form language is square-cornered drafting. Controls take a barely softened 2px corner (buttons, answers, evidence chips), the stamp takes 3px, and the only circle is the grid bubble that numbers each answer. Rooms, title-block cells, the survey strip, the scale bar and tables are hard-cornered rectangles.

Strokes follow drafting conventions:
- 1.5px Line: object edges.
- 1px Dim Line: subdivisions.
- 2px Line gaps: walls between rooms and survey cells.
- Door swings: drawn at a 1.2px stroke at half opacity, with a solid arc on rooms and a 3 4 dashed arc on the front door.
- Redline strokes: 2px with round joins for the revision triangle, and 2.5px for the revision cloud.
- Strike bars: 0.07–0.075em high.
- Inline SVG icons (wordmark, back arrow): 1.5px round-capped strokes in `currentColor`.

The stamp uses a 4px double border, rotated -5°.

## Components

### Buttons
Lettered, bordered and quiet until they matter.
- **Shape:** drafting corner (2px), 1.5px Line border, minimum height 3rem.
- **Primary:** filled Ink with Deep Sheet lettering in Button type, padded 0.75rem 1.4rem 0.7rem. There is one per view: the door, Share your shame, Find your own plan or Take the quiz. On hover it fills with Line and gains a 1.5px Line outline offset 3px, with no shadow.
- **Ghost:** transparent with a Line border and Ink lettering. Hover washes it with 10% line. This variant covers Retake, Every plan, the secondary Share this plan and Sheet index.
- **Door (landing only):** the primary button at 800, 1.3rem and 3.5rem tall, with a door-swing SVG beside it: a Soft Ink jamb line and a dashed quarter-arc at a 1.5 stroke.
- **Quiet:** an underlined text link in Soft Ink with a Dim Line underline, at least 2.75rem tall. Hover turns it Ink with a Pencil underline. Back ("Rethink the last one", with an inline arrow) and "Skip the illusion" use it.
- **Hover / Focus / Active:** colour changes take 160ms on the shared ease. Pressing nudges the button down 1px. Focus is the global dashed Pencil outline.

### Chips
- **Style:** evidence card links (Scryfall) are inline Ink text in a 1px Dim Line box with a 2px corner, padded 0.4rem 0.75rem.
- **State:** on hover the border turns Pencil and the chip hatches.

### Cards / Containers
- **Corner Style:** square, except buttons and chips.
- **Background:** Sheet. Containers are drawn, not filled.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** an object gets a 1.5px Line edge and its internal cells get 1px Dim Line dividers.
- **Internal Padding:** about 1rem 1.1rem in title-block cells (0.85rem 0.9rem below 60rem), and 0.9rem 1rem in rooms.

### Navigation
- **Sheet head:** the wordmark is a pencil-coloured diamond-and-eye SVG followed by "Jace Plan Quiz" in Big Shoulders at 800, uppercase, 0.08em. On the right is a single Sheet index link at weight 700 with a Dim Line underline that turns Pencil on hover. Both targets are at least 2.75rem tall, and the header sits above a Dim Line rule.
- **Drawing info (footer):** a ruled definition list (Project, Drawn by, Checked by, Scale). It is two by two on small screens and a single four-cell row at 60rem and above, with Label-type terms and Ink values.

### Sheet frame and zone markers
The page's outer drawing frame. It is a 1.5px Line border with an inner Dim Line rule inset by `--zone`. Six letter zones run along the top and bottom bands and four number zones along each side, divided by Dim Line ticks, lettered at 10px and hidden from assistive tech. Under 40rem the band narrows to 6px and the letters drop out, leaving only the ticks.

### Title block (result)
The verdict panel, an `aside` labelled "Verdict" with a 1.5px Line border and stacked cells divided by Dim Line. It has four cells:
- Status: label, stamp and a pencil gloss.
- Plan rating: the scale bar.
- Actions: the primary and ghost buttons.
- A three-column meta strip: Drawn by, Checked by, and Sheet A-nn of A-14.

At 60rem and above it sticks beside the result. Below 60rem Status and Plan rating share the top row.

### Floor-plan rooms
Every plan is a room, linked to its result. A room is a Sheet cell inside the line-coloured floor plan, padded 0.9rem 1rem, at least 8rem tall. It shows a sheet number (Label), the plan name (Room type) and, pushed to the bottom, the year plus the status in Redline or Gold. Each room has a door cut into its top wall, drawn as a 2px Sheet gap with a 1.8rem door-swing arc. On hover the room hatches and its title gets a Pencil underline. Focus draws the dashed outline inside the walls (offset -6px). The reader's last result is permanently hatched and carries a pencilled "Yours.".

### Survey strip
Quiz progress drawn as a strip of ten cells in the same wall construction as the floor plan: a Line ground with 2px gaps, 2rem tall. Done cells are Deep Sheet with hatching, and the current cell has a 2px inset Pencil outline. A Label-type sheet number, "Sheet 03 / 10", sits to the right. The whole strip is one `role="img"` with an "Question n of 10" label.

### Answer buttons with grid bubbles
Full-width bordered rows: a 1.5px Line border with a 2px corner, at least 4rem tall, in Body type at 1.08rem/1.4. Each answer is keyed by a grid bubble, a 2.3rem circle with a 1.5px `currentColor` ring around a Big Shoulders numeral 1–4, as on a drawing's grid lines. Hover sinks the row to Deep Sheet with hatching. Picking fills it with Ink and turns the text and bubble Deep Sheet, then holds the pick for 220ms before advancing.

### Stamp
A rubber stamp in Stamp type, lettered in the outcome colour (Redline for "Beefed it", Gold for "It actually worked"). It has a 4px double border, a 3px corner and a -5° rotation, with a pencil gloss beneath. In the illusion the same stamp reads "Approved" in the fake plan's outcome colour.

### Scale bar
The plan rating as a drawing's scale bar. It is ten segments in a 1.5px Line box 0.95rem tall, with Dim Line ticks between segments and 0, 5 and 10 tick labels below. The filled segments take the outcome colour, and the value "n / 10" is set below in 800 Big Shoulders. A zero rating adds a pencil note, "Off the bottom of the scale.". The bar is one `role="img"` labelled with the rating.

### Revision cloud and strike
The correction vocabulary of the illusion:
- **Strike:** a Redline bar 0.07em high at 55% height. It runs through each wrapped line separately (`box-decoration-break: clone`) and draws from left to right by growing its background size.
- **Revision cloud:** a scalloped SVG path generated around the measured title and stamp. It is a 2.5px Redline stroke with round joins, drawn on through `pathLength=1` and the stroke dash offset.
- **Revision triangle:** after the illusion, the real result title carries a small Redline triangle with a "1" in it, with a pencilled note in Redline: "Rev 1: removed an illusion (…). Sorry. Habit.".
- **Landing headline:** "brilliant" is set in Soft Ink with a Redline bar at -5°. "poorly thought-out" is pencilled above it in Redline Architects Daughter at 0.42em, raised and turned -4°.

### Pencil notes
Jace's marginalia, in Architects Daughter and Pencil. Uses include the question margin notes, the general-notes aside, "Yours.", "← yours", the stamp gloss, the key hint and "Reading you…". Notes may rotate slightly (-1° to -4°) as hand lettering does. Purely decorative notes are hidden from assistive tech. The plan inside the result's intent box is the one pencil passage that carries content. That box has a 1px Dim Line border, and its "The plan" label is notched into the top edge on a Sheet backing.

### Who's-who disclosure
A `details` block that explains lore terms for non-players, ruled above and below in Dim Line and capped at 65ch:
- **Summary:** Big Shoulders at 700, 1.05rem, uppercase and 0.06em, with a Pencil disclosure marker, at least 2.75rem tall.
- **Entries:** uppercase Big Shoulders terms with Soft Ink Atkinson definitions.
- **Default state:** open for visitors from a shared link and closed for the person who just took the quiz.

### Sheet index table
Every plan in publication order. The table has a 1.5px Line border and a 1.5px Line header rule, with Dim Line rules between rows. Columns are Sheet, Plan, Story, Year and Status:
- **Sheet and Year:** set in Big Shoulders at 600, 0.06em, without wrapping.
- **Plan:** a row header whose link is set in Big Shoulders at 700, 1.3rem.
- **Story:** set in Soft Ink.
- **Status:** uppercase Big Shoulders at 700 in the outcome colour.

The reader's own row carries a pencilled "← yours". It is not hatched, so its Redline status keeps full contrast.

### Focus, keyboard and reduced motion
- **Focus:** every focusable element gets a 2px dashed Pencil outline offset 4px, or inset 6px on rooms.
- **Headings as focus targets:** headings that receive focus programmatically on navigation (`tabindex=-1`) show no ring. The first paint never moves focus.
- **Keyboard:** keys 1–4 pick answers (`aria-keyshortcuts`), Escape skips the illusion, and the Skip button takes focus when the illusion starts.
- **Screen readers:** a polite status region announces "Reading your mind." and the share result. The illusion stage is `aria-hidden`, and the real result title is prefixed "Your plan:" for screen readers.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, every CSS animation and transition is removed. The script also skips the reading beat and the whole illusion, landing directly on the real result, and it drops the 220ms pick dwell.

### Motion grammar
- **Easing:** one curve, `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out).
- **State changes:** 160ms for colour and background.
- **Pencil and title write-on:** a left-to-right `clip-path` wipe, 700ms for notes and 800ms for the title.
- **Survey fill:** 900ms.
- **Strike:** 450ms, starting 800ms after the cloud begins.
- **Cloud draw-on:** 1000ms.
- **Reading beat:** 1300ms.
- **Illusion timeline:**
  - The fake title draws on.
  - At 650ms the APPROVED stamp lands, fading in over 180ms and settling from 1.6× scale over 450ms, and Jace's smug note writes on.
  - At 1900ms the cloud, strike and redline note draw on.
  - At 3700ms the stage dissolves, fading to 0 opacity with a 6px blur over 450ms.
  - At 4200ms the real sheet is drawn.

**The Draw-On Rule.** Linework, strikes and pencil notes arrive by being drawn, from left to right on the shared ease. Only the illusion's stamp and dissolve are allowed to perform beyond that.

## Do's and Don'ts

### Do:
- **Do** keep every surface on the Cyanotype Sheet (#0f3b78) inside the double-ruled frame. The blue-mana ground is binding.
- **Do** build containers from line: a 1.5px Line edge, 1px Dim Line subdivisions, and 2px Line gaps for walls.
- **Do** reserve Redline for corrections and failed plans, Gold for plans that worked, and Pencil for Jace's voice and the focus ring.
- **Do** letter titles, labels, buttons and stamps in uppercase Big Shoulders, and set every sentence of canon in Atkinson Hyperlegible Next at 65ch or narrower.
- **Do** use the hatch to mark surveyed, selected or hovered space, with Ink, Pencil or Gold text over it.
- **Do** draw motion on from left to right with `cubic-bezier(0.16, 1, 0.3, 1)`, and remove it entirely under reduced motion.
- **Do** keep buttons, navigation links and disclosure summaries at least 2.75rem tall, and give every focusable element the dashed Pencil outline.
- **Do** keep a single Ink-filled primary action per view.

### Don't:
- **Don't** add drop shadows, glows or lifted cards. Depth is line weight, hatch and Deep Sheet.
- **Don't** round corners beyond the 2px drafting corner, except the grid bubble and the 3px stamp.
- **Don't** set narration of what happened, readings or glossary definitions in the pencil hand. Only Jace's asides and his own plan are pencilled. Don't set Atkinson in capitals either.
- **Don't** use Gold as a general accent or highlight. It means "it actually worked".
- **Don't** set Redline or Soft Ink text over hatch at body size. A stripe takes Redline to about 2.85:1.
- **Don't** fill a container with colour to make it stand out. Draw it, hatch it, or make it the one Ink-filled action.
- **Don't** add new hues to the sheet. New meaning goes into an existing pencil or into line weight.
