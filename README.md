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

**Classmate testing:** [Fill in — summarize what your two classmates
actually said when they played the published GitHub Pages link. Note
anything they got confused by, liked, or ran into as a bug.]

## Revisions
1. **Added a lives/health system and distinct win vs. lose states.** The
   original prototype always ended on a single "Mission Complete" screen
   showing a score, with no real win/lose distinction. Added a 3-life
   system so a poor run now ends in a clearly different "Mission Failed"
   screen (red), while finishing all questions with a life left shows
   "Mission Success" (green).
2. **Added visible focus states for keyboard users.** Buttons previously
   relied on the browser's default focus outline, which wasn't guaranteed
   to be visible against the dark theme. Added an explicit high-contrast
   `:focus-visible` outline on all buttons.
3. **Added `aria-live` regions and a footer/credits section.** Score,
   lives, and feedback text updates were visual-only, so screen reader
   users wouldn't know the game state changed. Marked the HUD and feedback
   text as `aria-live="polite"`, marked the decorative starfield as
   `aria-hidden`, and added a footer crediting the build and confirming no
   external assets were used.
4. [Fill in — add any additional revision made in response to classmate
   feedback, e.g. wording changes, difficulty adjustments, layout fixes.]

## Technologies Used
- HTML
- CSS
- JavaScript
- GitHub Pages

## Credits
All HTML, CSS, JavaScript, and trivia question content in this project are
original work written for this course. No external images, icons, fonts,
sound effects, or code libraries were used. System UI fonts (Segoe UI /
Arial) are used via the CSS `font-family` fallback stack, not a bundled
font file. Development assistance (planning, code generation, and this
README) was provided by Claude (Anthropic).

## Future Improvements
- A larger, categorized question bank (e.g. planets, missions, physics) with
  randomized question order so replays feel different.
- A timer per question to add difficulty and urgency.
- A persistent high-score display using `localStorage`.
- Sound effects/animations for correct and incorrect answers.
