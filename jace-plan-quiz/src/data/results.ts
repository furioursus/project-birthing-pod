import type { Result } from '../types';

// Beefs first, in story order, then triumphs. Ties go to the earlier entry,
// so triumphs must stay at the end (the tests check this).
export const results: Result[] = [
  {
    id: 'out-think-the-sphinx',
    title: 'Out-Think the Sphinx',
    plan: 'Your mentor has been messing with your head. Challenge him to a telepathic duel. Inside your own head. What could go wrong?',
    era: 'Magic Origins',
    year: 2015,
    outcome: 'beef',
    happened:
      'Teenage Jace was apprenticed to the sphinx Alhammarret on Vryn. He found out Alhammarret had been feeding intelligence to both sides of Vryn’s war and wiping Jace’s memory of his own spark igniting. Jace picked a fight and destroyed the sphinx’s mind. He won, but lost much of his own memory doing it, and planeswalked to Ravnica without knowing who his family was or where he came from.',
    reading:
      'You are right, and you will make sure everyone knows it, whatever it costs. You go straight for the person in charge when something’s off. You usually win. You do not always remember what you won.',
    planRating: 4,
    cards: ["Jace, Vryn's Prodigy", 'Alhammarret, High Arbiter'],
    source: {
      label: 'Jace’s Origin: Absent Minds',
      url: 'https://magic.wizards.com/en/news/feature/jaces-origin-absent-minds-2015-06-24',
    },
  },
  {
    id: 'emergency-body-swap',
    title: 'The Emergency Body Swap',
    plan: 'Your friend is in danger. Carry his mind off-plane inside your own head, then park it in the body of someone nobody will miss.',
    era: 'Agents of Artifice',
    year: 2009,
    outcome: 'beef',
    happened:
      'When the Infinite Consortium came for Jace and his friend Kallist Rhoka on Ravnica, Jace tried to tuck Kallist’s mind into his own to take him along. The spell was much harder than he expected. Their minds tangled and swapped, and the two of them spent months each believing he was the other. When an assassin killed the body Kallist’s mind was in, the magic snapped, Jace landed back in his own body, and Kallist was gone.',
    reading:
      'You would do anything for your friends, including several things they would never agree to if you asked. Your help is enormous, creative and deeply invasive. Ask before you rescue someone.',
    planRating: 2,
    cards: ['Jace Beleren'],
    source: { label: 'Kallist Rhoka (MTG Wiki)', url: 'https://mtg.wiki/page/Kallist_Rhoka' },
  },
  {
    id: 'dating-the-double-agent',
    title: 'Dating the Double Agent',
    plan: 'Fall for the mysterious necromancer, take down your evil boss, and live happily ever after.',
    era: 'Agents of Artifice',
    year: 2009,
    outcome: 'beef',
    happened:
      'Jace fell for Liliana Vess while trying to get out from under Tezzeret’s Infinite Consortium. Liliana was secretly telling the Consortium where he was hiding, and was working for Nicol Bolas the whole time. Jace beat Tezzeret and wiped his mind, which brought the Consortium down and handed it to Bolas, exactly as Liliana intended.',
    reading:
      'You see a red flag and think “that’s interesting.” You are loyal, romantic and very easy to aim. Someday, ask your new crush who they work for.',
    planRating: 3,
    cards: ['Liliana Vess', 'Tezzeret the Seeker', 'Jace Beleren'],
    source: { label: 'Agents of Artifice (MTG Wiki)', url: 'https://mtg.wiki/page/Agents_of_Artifice' },
  },
  {
    id: 'follow-chandra-into-the-eye',
    title: 'Follow Chandra Into the Eye',
    plan: 'Track a hotheaded pyromancer into an ancient, sealed chamber and settle things there.',
    era: 'Rise of the Eldrazi',
    year: 2010,
    outcome: 'beef',
    happened:
      'Nicol Bolas set it up so Jace, Chandra and Sarkhan Vol all met at the Eye of Ugin on Zendikar. The three of them fought right there in the chamber, and Chandra’s fire broke the wards holding the Eldrazi titans. Zendikar was overrun. Jace wasn’t the main culprit, but he was absolutely in the room.',
    reading:
      'You get pulled into other people’s drama and you go willingly. You’d rather be in the fight than miss it, and you rarely ask whose idea the fight was. Learn to recognize a setup.',
    planRating: 3,
    cards: ['Eye of Ugin', 'Jace, the Mind Sculptor', 'Sarkhan the Mad'],
    source: { label: 'Release of the Eldrazi (MTG Wiki)', url: 'https://mtg.wiki/page/Release_of_the_Eldrazi' },
  },
  {
    id: 'accidentally-the-government',
    title: 'Accidentally Become the Government',
    plan: 'The maze race is chaos. Telepathically link every runner so they stop killing each other.',
    era: 'Dragon’s Maze',
    year: 2013,
    outcome: 'beef',
    happened:
      'During the race through Ravnica’s Implicit Maze, Jace linked the minds of every guild’s runner. That counted as solving it, and the ancient magic of the Guildpact made him its living embodiment: the Living Guildpact, the final word on law for an entire plane. Then he spent most of the next several years on other planes while his steward, Lavinia, kept the office running.',
    reading:
      'You volunteer for things. You are good at things. You then leave the things with a very capable friend and go somewhere more interesting. Lavinia deserves a raise, and so does whoever is covering for you right now.',
    planRating: 5,
    cards: ['Jace, the Living Guildpact', 'Jace, Architect of Thought', 'Lavinia of the Tenth'],
    source: { label: 'Lavinia (MTG Wiki)', url: 'https://mtg.wiki/page/Lavinia' },
  },
  {
    id: 'solve-the-mystery-lose-to-the-answer',
    title: 'Solve the Mystery, Lose to the Answer',
    plan: 'Something is driving Innistrad mad. Read the clues, follow Tamiyo’s notes, and work out who’s behind it.',
    era: 'Shadows over Innistrad',
    year: 2016,
    outcome: 'beef',
    happened:
      'Jace went to Innistrad looking for Sorin and ended up investigating the spreading madness with Tamiyo’s journal. The answer turned out to be Emrakul, the last Eldrazi titan, lured there by Nahiri. The Gatewatch had no way to beat it. Tamiyo, Jace and Nissa sealed Emrakul inside the moon, but only because Emrakul let them.',
    reading:
      'You love a mystery more than you love what happens after you solve it. Your corkboard is beautiful. Your follow-through plan is “and then we win, somehow.”',
    planRating: 4,
    cards: ['Jace, Unraveler of Secrets', "Tamiyo's Journal", 'Emrakul, the Promised End'],
    source: {
      label: 'Magic Story: The Promised End',
      url: 'https://magic.wizards.com/en/news/magic-story/promised-end-2016-07-27',
    },
  },
  {
    id: 'i-expected-as-much',
    title: '“I Expected as Much”',
    plan: 'Ask Gideon what the plan is. Hear that there isn’t one. Attack Nicol Bolas on his home turf anyway.',
    era: 'Hour of Devastation',
    year: 2017,
    outcome: 'beef',
    happened:
      'On Amonkhet, Jace pressed Gideon for an actual plan and warned against taking on Bolas unprepared. Then he went along with it anyway. The Gatewatch was crushed. When Bolas seized Jace’s mind, a failsafe Ugin had hidden there wiped Jace’s memory and flung him to Ixalan. Bolas’s parting words became flavor text.',
    reading:
      'You know it’s a bad idea. You said so, out loud, with reasons. Then you went along with it because everyone else was going. You’re the smartest person in the group chat, and you lose every vote.',
    planRating: 1,
    cards: ["Jace's Defeat"],
    source: {
      label: 'Magic Story: Hour of Devastation',
      url: 'https://magic.wizards.com/en/news/magic-story/hour-devastation-2017-07-26',
    },
  },
  {
    id: 'hand-bolas-the-doomsday-device',
    title: 'Hand Bolas the Doomsday Device (On Purpose)',
    plan: 'Let the villain have the artifact. Lock away your girlfriend’s memories of you so she can betray him later. Trust the plan.',
    era: 'Rivals of Ixalan',
    year: 2018,
    outcome: 'beef',
    happened:
      'Stranded and amnesiac on Ixalan, Jace teamed up with Vraska. He sentenced the sphinx Azor to stay on Useless Island forever, then agreed to let the Immortal Sun go to Bolas so Vraska could keep her cover. At her request, he sealed away her memories of him. Bolas used the Immortal Sun to trap planeswalkers on Ravnica for the War of the Spark, and Vraska, still playing her part, petrified the guildmaster Isperia.',
    reading:
      'You love a five-step plan where step four is “and then trust me.” Your schemes are elegant. Your schemes also leave the villain holding the doomsday device.',
    planRating: 2,
    cards: ['Jace, Cunning Castaway', 'Vraska, Relic Seeker', 'The Immortal Sun', 'Azor, the Lawbringer'],
    source: {
      label: 'Magic Story: Sabotage',
      url: 'https://magic.wizards.com/en/news/magic-story/sabotage-2018-01-31',
    },
  },
  {
    id: 'just-five-more-minutes',
    title: 'Just Five More Minutes With Vraska',
    plan: 'Lead a strike team into the heart of New Phyrexia with a doomsday bomb. Don’t get sentimental.',
    era: 'Phyrexia: All Will Be One',
    year: 2023,
    outcome: 'beef',
    happened:
      'Jace assembled the strike team that invaded New Phyrexia to destroy the Realmbreaker with the Sylex. Norn saw them coming. Jace found Vraska already compleated and stayed with her, reliving old memories, until she compleated him too. Elspeth stabbed him with her Halo-infused sword and took the Sylex, and Jace’s body got up and walked off to join Elesh Norn.',
    reading:
      'You can hold it together right up until someone you love is involved. Then the mission is over and you’re making a scrapbook. Leave the reunion before you get compleated.',
    planRating: 1,
    cards: ['Jace, the Perfected Mind', "Vraska, Betrayal's Sting"],
    source: {
      label: 'Phyrexia: All Will Be One, Episode 3: Inconceivable Losses',
      url: 'https://magic.wizards.com/en/news/magic-story/assault-on-new-phyrexia-or-episode-3-inconceivable-losses',
    },
  },
  {
    id: 'rob-the-vault-lose-the-kid',
    title: 'Rob the Vault, Lose the Kid',
    plan: 'Disguise yourself as Ashiok, hire Oko, promise him a cut, rob the vault, cut him out of the cut.',
    era: 'Outlaws of Thunder Junction',
    year: 2024,
    outcome: 'beef',
    happened:
      'Disguised as Ashiok, Jace hired Oko to get the key to a vault on Thunder Junction. At the vault he dropped the disguise, Vraska tried to petrify Oko, and the pair walked out with the prize: Loot, a small creature who can see Omenpaths. The heist went great. Then, on the road, Loot wandered through a door into Duskmourn, and it took a whole dragonstorm and some mind control for Jace to get him back.',
    reading:
      'You can pull off the heist. The aftercare is where it falls apart. You adopt a little guy and immediately lose track of him. You’re a chaotic parent and a terrible business partner, and people love you anyway.',
    planRating: 5,
    cards: ['Jace Reawakened', 'Oko, the Ringleader', 'Vraska, the Silencer', 'Loot, the Pathfinder'],
    source: {
      label: 'Outlaws of Thunder Junction, Episode 6',
      url: 'https://magic.wizards.com/en/news/magic-story/episode-6-the-ballad-of-thieves-and-thunderslingers',
    },
  },
  {
    id: 'fix-everything-personally',
    title: 'Fix Everything, Personally',
    plan: 'Grab the Spirit-Gem off Ugin’s head and rewrite the Multiverse so the Phyrexian invasion never happened.',
    era: 'Tarkir: Dragonstorm',
    year: 2025,
    outcome: 'beef',
    happened:
      'In the Meditation Realm, Jace left an illusion of himself behind, teleported onto Ugin and seized the Spirit-Gem between his horns, meaning to remake reality so the invasion, and Vraska’s pain, had never happened. Vraska begged him to stop. He couldn’t hold the power: reality shattered around him and he came apart. With Ugin’s grip broken, Nicol Bolas, who only Ugin and Jace knew was alive, got loose.',
    reading:
      'You can’t stand a problem you didn’t personally fix. You’d rewrite reality before admitting some things can’t be undone. Your heart is in the right place. Your hands are on an elder dragon’s forehead gem.',
    planRating: 1,
    cards: ['Ugin, Eye of the Storms'],
    source: {
      label: 'Tarkir: Dragonstorm, Episode 6: How Wretched Love',
      url: 'https://magic.wizards.com/en/news/magic-story/tarkir-dragonstorm-episode-6-how-wretched-love',
    },
  },
  {
    id: 'become-the-final-boss',
    title: 'Become the Final Boss',
    plan: 'Build a better Multiverse from scratch. Then write it over the real one, for everyone’s own good.',
    era: 'Reality Fracture',
    year: 2026,
    outcome: 'beef',
    happened:
      'Pieced back together, Jace built the Echoverse: his idea of a perfect reality, with his own blind spots built in. The fragment of him called the Theorist took over, stripped out his compassion, and tried to overlay the Echoverse onto the real Multiverse, going through his old friends to do it. To stop it, Vraska drove an Ochran dagger into his heart, and Jace died as himself. His spark passed to Tam.',
    reading:
      'You have a vision and you are certain it’s better. You might even be right about some of it. But once “for your own good” becomes your whole personality, someone who loves you has to stop you. Please let people say no.',
    planRating: 0,
    cards: ['The Theorist, Jace Beleren', "Vraska's Final Mercy", 'Tam, the Possibility'],
    source: {
      label: 'Reality Fracture, Episode 9: Unafraid',
      url: 'https://magic.wizards.com/en/news/magic-story/reality-fracture-episode-9-unafraid',
    },
  },
  {
    id: 'the-hedron-math-worked',
    title: 'The Hedron Math Worked',
    plan: 'Work out the hedron network’s pattern, bind both Eldrazi titans to Zendikar, and let the pyromancer handle the rest.',
    era: 'Oath of the Gatewatch',
    year: 2016,
    outcome: 'triumph',
    happened:
      'Jace decoded the hedron network at the Eye of Ugin and designed a leyline pattern to pin down the titans. The first attempt fell apart when Ob Nixilis interfered and Kozilek showed up. The second worked: Nissa bound Ulamog and Kozilek to Zendikar through Jace’s pattern, and Chandra burned them both to ash. The Gatewatch was born on that battlefield.',
    reading:
      'Rare result! You’re the nerd who did the reading, and this time the group listened. You know your role, you trust your team, and you let the fire mage take the final shot. Enjoy it. It may not happen again.',
    planRating: 9,
    cards: ['Oath of Jace', 'Ulamog, the Ceaseless Hunger', 'Kozilek, the Great Distortion'],
    source: {
      label: 'Destruction of Ulamog and Kozilek (MTG Wiki)',
      url: 'https://mtg.wiki/page/Destruction_of_Ulamog_and_Kozilek',
    },
  },
  {
    id: 'the-telepathic-switchboard',
    title: 'The Telepathic Switchboard',
    plan: 'Bolas has trapped every planeswalker on Ravnica. Get them all in one mind and one room, and make a plan together.',
    era: 'War of the Spark',
    year: 2019,
    outcome: 'triumph',
    happened:
      'When Tezzeret’s Planar Bridge cost Jace his Living Guildpact powers, Jace still sent a telepathic call that pulled the scattered planeswalkers into a retreat, then gathered planeswalkers and guildmasters to plan together. The coalition held, the guilds made Niv-Mizzet the new Living Guildpact, and Bolas fell. (Footnote: Jace also faked Bolas’s death with an illusion so Ugin could keep him prisoner. Hold that thought until 2025.)',
    reading:
      'Rare result! You’re the group chat admin the Multiverse needs. You don’t have to be the strongest person in the room; you make sure everyone’s in the room. Just don’t keep any secrets you’ll have to deal with later.',
    planRating: 8,
    cards: ['Jace, Wielder of Mysteries', "Jace's Triumph"],
    source: {
      label: 'War of the Spark: Ravnica, Ashes',
      url: 'https://magic.wizards.com/en/news/magic-story/war-spark-ravnica-ashes-2019-06-12',
    },
  },
];
