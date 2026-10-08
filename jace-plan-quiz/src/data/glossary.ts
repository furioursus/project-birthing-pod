// One-line explainers for people who don't play Magic. A result's "Who's who"
// lists every entry whose pattern appears in that result's "What happened".
// Same rule as the results: canon only, no jokes in the definitions.

export interface GlossaryEntry {
  term: string;
  match: RegExp;
  definition: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'Planeswalker',
    match: /planeswalk/i,
    definition: 'Someone with a spark: the rare ability to travel between planes, the worlds of the Multiverse. Jace is one.',
  },
  { term: 'Vryn', match: /\bVryn\b/, definition: 'Jace’s home plane.' },
  { term: 'Ravnica', match: /\bRavnica\b/, definition: 'A plane that is one enormous city, run by ten rival guilds.' },
  { term: 'Zendikar', match: /\bZendikar\b/, definition: 'A wild, dangerous plane covered in floating stone hedrons.' },
  { term: 'Innistrad', match: /\bInnistrad\b/, definition: 'A gothic horror plane of vampires, werewolves and ghouls.' },
  { term: 'Amonkhet', match: /\bAmonkhet\b/, definition: 'A desert plane that Nicol Bolas remade into a death cult in his honour.' },
  { term: 'Ixalan', match: /\bIxalan\b/, definition: 'A plane of dinosaurs, pirates and vampire conquistadors.' },
  { term: 'Duskmourn', match: /\bDuskmourn\b/, definition: 'A plane that is one endless haunted house.' },
  {
    term: 'Nicol Bolas',
    match: /\bBolas\b/,
    definition: 'An ancient, scheming elder dragon planeswalker, and the story’s longtime villain.',
  },
  { term: 'Ugin', match: /\bUgin\b/, definition: 'The Spirit Dragon: an ancient dragon planeswalker and Nicol Bolas’s brother and rival.' },
  { term: 'Liliana Vess', match: /\bLiliana\b/, definition: 'A necromancer planeswalker with a long history of dark bargains.' },
  { term: 'Tezzeret', match: /\bTezzeret\b/, definition: 'An artificer planeswalker who ran the Infinite Consortium.' },
  { term: 'Infinite Consortium', match: /Infinite Consortium/, definition: 'A criminal organization that operated across many planes.' },
  { term: 'Gideon', match: /\bGideon\b/, definition: 'Gideon Jura, a nearly invulnerable soldier planeswalker and the Gatewatch’s leader.' },
  { term: 'Chandra', match: /\bChandra\b/, definition: 'Chandra Nalaar, a hot-tempered pyromancer planeswalker.' },
  { term: 'Nissa', match: /\bNissa\b/, definition: 'Nissa Revane, an elf planeswalker who can speak with the land itself.' },
  { term: 'Gatewatch', match: /\bGatewatch\b/, definition: 'A team of planeswalkers, Jace included, sworn to protect the Multiverse.' },
  { term: 'Vraska', match: /\bVraska\b/, definition: 'A gorgon assassin planeswalker, and later Jace’s partner.' },
  { term: 'Tamiyo', match: /\bTamiyo\b/, definition: 'A moonfolk scholar planeswalker who records the stories of the planes.' },
  { term: 'Sorin', match: /\bSorin\b/, definition: 'Sorin Markov, an ancient vampire planeswalker from Innistrad.' },
  { term: 'Nahiri', match: /\bNahiri\b/, definition: 'A kor stoneforger planeswalker with a centuries-old grudge against Sorin.' },
  { term: 'Sarkhan Vol', match: /\bSarkhan\b/, definition: 'A dragon-obsessed shaman planeswalker.' },
  { term: 'Ob Nixilis', match: /\bOb Nixilis\b/, definition: 'A demon planeswalker.' },
  { term: 'Elspeth', match: /\bElspeth\b/, definition: 'Elspeth Tirel, a knight planeswalker.' },
  { term: 'Oko', match: /\bOko\b/, definition: 'A shapeshifting fae trickster planeswalker.' },
  { term: 'Ashiok', match: /\bAshiok\b/, definition: 'A planeswalker who spins people’s nightmares into reality.' },
  {
    term: 'Eldrazi',
    match: /\bEldrazi\b/,
    definition: 'Colossal, alien beings from outside the Multiverse that devour whole planes.',
  },
  { term: 'Emrakul, Ulamog and Kozilek', match: /\b(Emrakul|Ulamog|Kozilek)\b/, definition: 'The three Eldrazi titans.' },
  { term: 'Eye of Ugin', match: /Eye of Ugin/, definition: 'The sealed chamber on Zendikar that kept the Eldrazi titans imprisoned.' },
  { term: 'Hedrons', match: /\bhedron/i, definition: 'Carved stone prisms on Zendikar, built long ago to bind the Eldrazi.' },
  {
    term: 'Living Guildpact',
    match: /Living Guildpact|Guildpact/,
    definition: 'Ravnica’s magical law in the form of a person, with the final word on any dispute between the guilds.',
  },
  { term: 'Immortal Sun', match: /Immortal Sun/, definition: 'An artifact that stops planeswalkers from leaving the plane it sits on.' },
  { term: 'War of the Spark', match: /War of the Spark/, definition: 'Nicol Bolas’s invasion of Ravnica.' },
  {
    term: 'Phyrexia',
    match: /Phyrexi/,
    definition: 'A plane of biomechanical horrors who convert living beings into more of themselves.',
  },
  { term: 'Compleated', match: /\bcompleat/i, definition: 'Converted into a Phyrexian.' },
  { term: 'Elesh Norn', match: /\bNorn\b/, definition: 'The ruler of New Phyrexia.' },
  { term: 'The Sylex', match: /\bSylex\b/, definition: 'An ancient artifact powerful enough to destroy a whole plane.' },
  {
    term: 'Realmbreaker',
    match: /Realmbreaker/,
    definition: 'A Phyrexian tree whose roots pierced into other planes, the bridge for the Phyrexian invasion.',
  },
  { term: 'Omenpaths', match: /Omenpath/, definition: 'Natural doorways between planes that opened after the Phyrexian invasion.' },
  { term: 'Spark', match: /(?<!War of the )\bspark\b/i, definition: 'The ability that makes someone a planeswalker.' },
];

export function glossaryFor(text: string): GlossaryEntry[] {
  return glossary.filter((entry) => entry.match.test(text));
}
