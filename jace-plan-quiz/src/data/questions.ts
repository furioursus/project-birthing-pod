import type { Question } from '../types';

// Weights point at result ids in results.ts. Each beef is the main pick (3)
// for about three answers. Triumphs only score on the few answers where you
// act like a team player, so they stay rare.
export const questions: Question[] = [
  {
    prompt: 'A friend texts you “we need to talk.” What’s your move?',
    answers: [
      {
        text: 'Read their mind. Well, read the room. Same thing.',
        weights: { 'emergency-body-swap': 3 },
      },
      {
        text: 'Show up immediately, no questions asked, ready to fight whoever.',
        weights: { 'follow-chandra-into-the-eye': 3, 'i-expected-as-much': 1 },
      },
      {
        text: 'Draft a fourteen-step contingency plan before replying.',
        weights: { 'hand-bolas-the-doomsday-device': 3, 'the-hedron-math-worked': 1 },
      },
      {
        text: 'Reply “omw,” then get distracted by an unrelated mystery for three days.',
        weights: { 'solve-the-mystery-lose-to-the-answer': 3, 'accidentally-the-government': 1 },
      },
    ],
  },
  {
    prompt: 'Your romantic history is best described as:',
    answers: [
      {
        text: 'They were clearly working for someone else. I found that intriguing.',
        weights: { 'dating-the-double-agent': 3, 'just-five-more-minutes': 1 },
      },
      {
        text: 'They once threatened my friends to get what they wanted. Now we’re adorable.',
        weights: { 'just-five-more-minutes': 2, 'hand-bolas-the-doomsday-device': 1 },
      },
      {
        text: 'I’d do anything for them. Including rewriting reality. Normal stuff.',
        weights: { 'fix-everything-personally': 3, 'become-the-final-boss': 1 },
      },
      {
        text: 'What romantic history? I’ve forgotten most of my life.',
        weights: { 'out-think-the-sphinx': 3, 'i-expected-as-much': 1 },
      },
    ],
  },
  {
    prompt: 'Group project. Which role do you end up in?',
    answers: [
      {
        text: 'I make the plan. I explain the plan. Nobody follows the plan, including me.',
        weights: { 'i-expected-as-much': 3, 'solve-the-mystery-lose-to-the-answer': 1 },
      },
      {
        text: 'I accidentally become project lead, then move to another country.',
        weights: { 'accidentally-the-government': 3 },
      },
      {
        text: 'I run the group chat and make sure everyone knows their part.',
        weights: { 'the-telepathic-switchboard': 3, 'the-hedron-math-worked': 1 },
      },
      {
        text: 'I redo the whole thing alone overnight, my way, whether they like it or not.',
        weights: { 'become-the-final-boss': 3, 'fix-everything-personally': 1 },
      },
    ],
  },
  {
    prompt: 'Pick a getaway.',
    answers: [
      {
        text: 'A deserted island. I’ll figure out who I am when I get there.',
        weights: { 'hand-bolas-the-doomsday-device': 3 },
      },
      {
        text: 'A gothic village with a creepy unsolved mystery.',
        weights: { 'solve-the-mystery-lose-to-the-answer': 3 },
      },
      {
        text: 'A desert heist with a shady guy I hired yesterday.',
        weights: { 'rob-the-vault-lose-the-kid': 3 },
      },
      {
        text: 'Wherever my ex is. Just to talk. One more time.',
        weights: { 'just-five-more-minutes': 3 },
      },
    ],
  },
  {
    prompt: 'Someone hands you an artifact of unimaginable power. You:',
    answers: [
      {
        text: 'Use it immediately to fix everything wrong with the world.',
        weights: { 'fix-everything-personally': 3, 'become-the-final-boss': 1 },
      },
      {
        text: 'Give it to the villain. On purpose. I have a plan.',
        weights: { 'hand-bolas-the-doomsday-device': 3 },
      },
      {
        text: 'Study it with a nerdy old dragon and do the math first.',
        weights: { 'the-hedron-math-worked': 3, 'follow-chandra-into-the-eye': 1 },
      },
      {
        text: 'Poke it while arguing with two other people. What’s the worst that could happen?',
        weights: { 'follow-chandra-into-the-eye': 3 },
      },
    ],
  },
  {
    prompt: 'How do you handle responsibility?',
    answers: [
      {
        text: 'Accept it graciously, then leave a very capable assistant to handle it forever.',
        weights: { 'accidentally-the-government': 3, 'rob-the-vault-lose-the-kid': 1 },
      },
      {
        text: 'Take on my friends’ problems, even if it costs me my sense of self.',
        weights: { 'emergency-body-swap': 3, 'accidentally-the-government': 1 },
      },
      {
        text: 'Handle it fine until a nostalgic memory derails me completely.',
        weights: { 'just-five-more-minutes': 3 },
      },
      {
        text: 'Design a new world where it isn’t my problem.',
        weights: { 'become-the-final-boss': 3 },
      },
    ],
  },
  {
    prompt: 'Your biggest flaw?',
    answers: [
      {
        text: 'I trust the wrong people.',
        weights: { 'dating-the-double-agent': 3, 'just-five-more-minutes': 1 },
      },
      {
        text: 'I go along with the plan even when I know it’s bad.',
        weights: { 'i-expected-as-much': 3 },
      },
      {
        text: 'I assume I’m the smartest one in the room.',
        weights: { 'out-think-the-sphinx': 3, 'fix-everything-personally': 1 },
      },
      {
        text: 'I get a little invasive when I’m trying to help.',
        weights: { 'emergency-body-swap': 3, 'hand-bolas-the-doomsday-device': 1 },
      },
    ],
  },
  {
    prompt: 'Pick a sidekick.',
    answers: [
      {
        text: 'A pyromancer with no impulse control.',
        weights: { 'follow-chandra-into-the-eye': 3, 'the-hedron-math-worked': 1 },
      },
      {
        text: 'A tiny guy who can see doorways to other worlds.',
        weights: { 'rob-the-vault-lose-the-kid': 3 },
      },
      {
        text: 'A gorgon who has, admittedly, threatened me before.',
        weights: { 'just-five-more-minutes': 2, 'rob-the-vault-lose-the-kid': 1 },
      },
      {
        text: 'Everyone I’ve ever met, linked telepathically.',
        weights: { 'the-telepathic-switchboard': 2, 'accidentally-the-government': 2 },
      },
    ],
  },
  {
    prompt: 'It’s 3 a.m. and you can’t sleep. What are you doing?',
    answers: [
      {
        text: 'Reading someone else’s journal and pinning red string to a corkboard.',
        weights: { 'solve-the-mystery-lose-to-the-answer': 3 },
      },
      {
        text: 'Building a better version of reality in my head, room by room.',
        weights: { 'become-the-final-boss': 3 },
      },
      {
        text: 'Replaying that one fight with my old mentor.',
        weights: { 'out-think-the-sphinx': 3 },
      },
      {
        text: 'Plotting how to undo the worst thing that ever happened to someone I love.',
        weights: { 'fix-everything-personally': 3, 'dating-the-double-agent': 1 },
      },
    ],
  },
  {
    prompt: 'Last one. Pick a motto.',
    answers: [
      {
        text: '“I had concerns, but sure.”',
        weights: { 'i-expected-as-much': 3 },
      },
      {
        text: '“Trust me, I’ve got this.”',
        weights: { 'dating-the-double-agent': 3, 'emergency-body-swap': 1 },
      },
      {
        text: '“Everybody stick to the plan.”',
        weights: { 'the-telepathic-switchboard': 3, 'the-hedron-math-worked': 3 },
      },
      {
        text: '“Finders keepers.”',
        weights: { 'rob-the-vault-lose-the-kid': 3, 'dating-the-double-agent': 1 },
      },
    ],
  },
];
