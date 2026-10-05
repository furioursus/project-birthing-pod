import type { Question } from '../types';

// Weights point at result ids in results.ts. Each beef is the main pick (3)
// for about three answers. Triumphs only score on the few answers where you
// act like a team player, so they stay rare.
export const questions: Question[] = [
  {
    prompt: 'A friend texts you “we need to talk.” What’s your move?',
    answers: [
      {
        text: 'Figure out what’s wrong before they say it, and start fixing it before they ask.',
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
        text: 'Reply “omw,” then get sidetracked by something way more interesting.',
        weights: { 'solve-the-mystery-lose-to-the-answer': 3, 'accidentally-the-government': 1 },
      },
    ],
  },
  {
    prompt: 'Your romantic history is best described as:',
    answers: [
      {
        text: 'I’m drawn to people with secrets. I find out what the secrets are later.',
        weights: { 'dating-the-double-agent': 3, 'just-five-more-minutes': 1 },
      },
      {
        text: 'We got off to a rough start. A really rough start. Now we’re inseparable.',
        weights: { 'just-five-more-minutes': 2, 'hand-bolas-the-doomsday-device': 1 },
      },
      {
        text: 'I’d move heaven and earth for them, whether or not they asked me to.',
        weights: { 'fix-everything-personally': 3, 'become-the-final-boss': 1 },
      },
      {
        text: 'Honestly? A lot of it is a blur.',
        weights: { 'out-think-the-sphinx': 3, 'i-expected-as-much': 1 },
      },
    ],
  },
  {
    prompt: 'Group project. Which role do you end up in?',
    answers: [
      {
        text: 'I point out everything wrong with the plan, get outvoted, and help anyway.',
        weights: { 'i-expected-as-much': 3, 'solve-the-mystery-lose-to-the-answer': 1 },
      },
      {
        text: 'I end up in charge by accident, then quietly hand it off and vanish.',
        weights: { 'accidentally-the-government': 3 },
      },
      {
        text: 'I keep everyone talking and make sure each person knows their part.',
        weights: { 'the-telepathic-switchboard': 3, 'the-hedron-math-worked': 1 },
      },
      {
        text: 'I redo the whole thing alone overnight, my way, whether they like it or not.',
        weights: { 'become-the-final-boss': 3, 'fix-everything-personally': 1 },
      },
    ],
  },
  {
    prompt: 'Your ideal weekend?',
    answers: [
      {
        text: 'Somewhere remote with no signal, where nobody knows who I am.',
        weights: { 'hand-bolas-the-doomsday-device': 3 },
      },
      {
        text: 'Deep in a rabbit hole I fell into at 2 a.m. on Friday.',
        weights: { 'solve-the-mystery-lose-to-the-answer': 3 },
      },
      {
        text: 'Something slightly illegal with people I met yesterday.',
        weights: { 'rob-the-vault-lose-the-kid': 3 },
      },
      {
        text: 'Revisiting a place that reminds me of someone.',
        weights: { 'just-five-more-minutes': 3 },
      },
    ],
  },
  {
    prompt: 'Someone hands you something far too powerful to be safe. You:',
    answers: [
      {
        text: 'Use it right away to fix everything. Somebody has to.',
        weights: { 'fix-everything-personally': 3, 'become-the-final-boss': 1 },
      },
      {
        text: 'Hand it to the last person who should have it. It’s part of a long game.',
        weights: { 'hand-bolas-the-doomsday-device': 3 },
      },
      {
        text: 'Read the manual twice and check the math with someone who knows more than me.',
        weights: { 'the-hedron-math-worked': 3, 'follow-chandra-into-the-eye': 1 },
      },
      {
        text: 'Mess with it in the middle of an argument. It’s probably fine.',
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
        text: 'Take on everyone else’s problems until I can’t tell where theirs end and mine begin.',
        weights: { 'emergency-body-swap': 3, 'accidentally-the-government': 1 },
      },
      {
        text: 'Handle it fine until a nostalgic memory derails me completely.',
        weights: { 'just-five-more-minutes': 3 },
      },
      {
        text: 'Reorganize the whole system around how I think things should work.',
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
        text: 'Someone who acts first and asks questions never.',
        weights: { 'follow-chandra-into-the-eye': 3, 'the-hedron-math-worked': 1 },
      },
      {
        text: 'A tiny chaotic gremlin I would die for.',
        weights: { 'rob-the-vault-lose-the-kid': 3 },
      },
      {
        text: 'Someone with a scary past who I’m sure has changed.',
        weights: { 'just-five-more-minutes': 2, 'rob-the-vault-lose-the-kid': 1 },
      },
      {
        text: 'Everyone. All of them. On the same page, at the same time.',
        weights: { 'the-telepathic-switchboard': 2, 'accidentally-the-government': 2 },
      },
    ],
  },
  {
    prompt: 'It’s 3 a.m. and you can’t sleep. What are you doing?',
    answers: [
      {
        text: 'Connecting dots nobody asked me to connect.',
        weights: { 'solve-the-mystery-lose-to-the-answer': 3 },
      },
      {
        text: 'Mentally redesigning how the world should work, in great detail.',
        weights: { 'become-the-final-boss': 3 },
      },
      {
        text: 'Replaying an argument with an old teacher that I’m still sure I won.',
        weights: { 'out-think-the-sphinx': 3 },
      },
      {
        text: 'Wishing I could go back and make one bad thing never have happened.',
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
