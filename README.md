# Cosmic Trivia

## Project Option
Simple Browser Game

## Project Description
Cosmic Trivia is a space-knowledge trivia game. The player reads a mission
briefing, starts the mission, and answers a series of multiple-choice
questions about astronomy and spaceflight. Every answer gives instant visual
feedback, and the player has three lives — three wrong answers ends the
mission early. Answering every question with at least one life remaining
completes the mission successfully.

## Theme Interpretation
The game frames trivia as a "space mission": the player is a cadet being
tested on space knowledge before launch. The visual design uses a dark,
star-filled background, a violet/blue gradient palette, and mission-themed
language ("Mission Briefing," "Start Mission," "Mission Success/Failed")
instead of generic quiz wording.

## Intended User or Player
Casual players with a general interest in space and astronomy — for example,
classmates, students in an intro astronomy or STEM class, or anyone who
enjoys short knowledge-check games. No prior astronomy expertise is assumed;
questions cover common, well-known space facts.

## User or Player Goal
Answer all 8 trivia questions correctly (or at least well enough to keep a
life in reserve) to complete the mission. The player's short-term goal each
round is to pick the correct answer before running out of lives.

## Main Features
- Mission Briefing screen with instructions and a Start Mission button
- 8-question trivia bank covering planets, stars, spacecraft, and physics
- Multiple-choice answers with instant color-coded feedback (correct/incorrect)
- Lives system (3 lives) with a heart-based HUD display
- Live score tracking, shown throughout the game
- Distinct Mission Success and Mission Failed end states
- Play Again / restart flow
- Responsive layout for mobile-width screens
- Footer with build credits

## JavaScript Features
- **Element selection**: all screens, buttons, and HUD text are selected via
  `document.getElementById` in [script.js](script.js).
- **Event listeners**: `click` listeners on the Start, Next, Restart, and
  dynamically-created answer buttons drive every state change.
- **Variables**: `currentQuestionIndex`, `score`, and `lives` track game
  state across the whole session.
- **Conditional logic**: answer correctness, remaining lives, and question
  progress are all checked with `if`/`else` to decide what happens next.
- **Functions**: `loadQuestion()`, `handleAnswer()`, and `showEndScreen()`
  encapsulate the three core game systems — question rendering, answer
  scoring/lives, and win/lose resolution.
- **Visible interface changes**: answer buttons turn green/red, the HUD
  updates lives and score in real time, and the end screen swaps between a
  green "Mission Success" and a red "Mission Failed" state.
- Feedback text and the HUD use `aria-live="polite"` so score/life changes
  are announced to screen reader users, not just shown visually.

## Responsive Design
The layout uses a single centered container (`max-width: 720px`) with
relative padding so it stays readable at any width. A media query at
`max-width: 560px` switches the two-column answer grid to a single column,
stacks the HUD vertically, shrinks the heading size, and reduces panel
padding so buttons and text stay comfortably tappable on phone-sized
screens without horizontal overflow.

## User Testing
**Developer/code-level walkthrough (self-conducted):** Before finalizing,
I manually walked through every interaction path in the code and in-browser:
starting a mission, answering correctly and incorrectly, running out of
lives mid-game, completing all 8 questions, and restarting. This surfaced
several real issues, which are listed in Revisions below.

**Self/playtest summary:** One area that could be improved is making the
three-life system more noticeable. A player may begin the game without
fully reading the instructions and become confused when the mission ends
after three incorrect answers. The feedback could also include a short
explanation of why an answer is correct instead of only displaying
"Correct" or highlighting the answer. During my own testing, I sometimes
moved to the next question quickly without spending much time reading the
feedback. The layout worked on smaller screens, but the spacing, text
size, and answer buttons could be improved to make the mobile version more
comfortable. Overall, the main interactions worked, but the game would
benefit from clearer progress information, stronger feedback, and more
polished responsive design.

## Revisions

| Planned Revision | Type of Revision | Reason for Revision | Priority | Status |
|---|---|---|---|---|
| Make the three-life rule more noticeable by placing it in a highlighted message above the Start Mission button. | Usability and clarity | Some players may skip the instructions and not understand why the game ends after three incorrect answers. | High | ✅ Done |
| Add a short explanation or space fact after each answer is revealed. | Interaction and feedback | Makes the game more educational and gives the player more useful feedback than just "Correct"/"Incorrect". | High | ✅ Done |
| Add symbols or text labels (check mark / X) instead of depending only on green and red colors. | Accessibility and feedback | Players with color-vision difficulties may not clearly understand color-only feedback. | High | ✅ Done |
| Increase button size, reduce unnecessary spacing, and make answer buttons full width on smaller screens. | Responsive design | Makes the game easier to read and interact with on phones. | High | ✅ Done |
| Add a progress bar showing how far the player is through the eight questions. | Usability and clarity | The question counter works, but a visual progress bar would make progress easier to understand at a glance. | Medium | Planned (see Future Improvements) |
| Improve the final results screen by showing the final score, remaining lives, and a message based on performance. | Interaction and feedback | A more detailed results screen makes finishing the game feel more rewarding and complete. | Medium | ✅ Partially done — the Mission Success/Failed screen already reports score and remaining lives; a more varied performance-based message is still planned |

Beyond the table above, two earlier structural revisions were also made
based on a full code-level walkthrough:
- **Added a lives/health system and distinct win vs. lose states.** The
  original prototype always ended on a single "Mission Complete" screen
  with no real win/lose distinction.
- **Added `aria-live` regions and a footer/credits section** so score,
  lives, and feedback updates are announced to screen reader users, not
  just shown visually.

## Technologies Used
- HTML
- CSS
- JavaScript
- GitHub Pages

## Credits
All HTML, CSS, JavaScript, and trivia question content in this project are
original work written for this course. No external images, icons, fonts,
sound effects, or code libraries were used.

## Future Improvements
- A visual progress bar showing how far the player is through the 8
  questions, alongside the existing question counter.
- A more varied, performance-based message on the results screen (e.g.
  different tone/text for a narrow win vs. a perfect run).
- A larger, categorized question bank (e.g. planets, missions, physics) with
  randomized question order so replays feel different.
- A timer per question to add difficulty and urgency.
- A persistent high-score display using `localStorage`.
- Sound effects/animations for correct and incorrect answers.
