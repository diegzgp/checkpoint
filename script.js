// Trivia question bank: each question has 4 options and the index of the correct one
const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctIndex: 1
    },
    {
        question: "What is the closest star to Earth?",
        options: ["Proxima Centauri", "The Sun", "Sirius", "Betelgeuse"],
        correctIndex: 1
    },
    {
        question: "What galaxy is Earth located in?",
        options: ["Andromeda", "Triangulum", "Milky Way", "Whirlpool"],
        correctIndex: 2
    },
    {
        question: "Which planet has the most moons in our solar system?",
        options: ["Earth", "Mars", "Saturn", "Neptune"],
        correctIndex: 2
    },
    {
        question: "What do astronomers call a collapsed star with gravity so strong that not even light can escape?",
        options: ["Neutron star", "Black hole", "Supernova", "Pulsar"],
        correctIndex: 1
    },
    {
        question: "Which spacecraft carried the first humans to the Moon?",
        options: ["Apollo 11", "Sputnik 1", "Voyager 1", "Columbia"],
        correctIndex: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Uranus", "Jupiter", "Neptune"],
        correctIndex: 2
    },
    {
        question: "What force keeps planets in orbit around the Sun?",
        options: ["Magnetism", "Friction", "Gravity", "Inertia"],
        correctIndex: 2
    }
];

// Game state
const STARTING_LIVES = 3;
let currentQuestionIndex = 0;
let score = 0;
let lives = STARTING_LIVES;

// Select all elements the game needs to update
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCounter = document.getElementById("question-counter");
const livesDisplay = document.getElementById("lives-display");
const scoreDisplay = document.getElementById("score-display");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");
const endTitle = document.getElementById("end-title");
const finalScoreText = document.getElementById("final-score-text");

// Start button: switch from the briefing screen to the game screen
startBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    lives = STARTING_LIVES;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    endScreen.classList.add("hidden");
    loadQuestion();
});

// Restart button: go back to the briefing screen (Start Mission resets state)
restartBtn.addEventListener("click", () => {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

// Next button: end the mission if out of lives, otherwise advance the question
// (or show the win screen once every question has been answered)
nextBtn.addEventListener("click", () => {
    if (lives <= 0) {
        showEndScreen(false);
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndScreen(true);
    }
});

// Renders the current question and its answer buttons
function loadQuestion() {
    const current = questions[currentQuestionIndex];

    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    livesDisplay.textContent = `Lives: ${"♥ ".repeat(lives).trim() || "none"}`;
    scoreDisplay.textContent = `Score: ${score}`;
    questionText.textContent = current.question;

    feedbackText.classList.add("hidden");
    feedbackText.textContent = "";
    nextBtn.classList.add("hidden");

    // Clear previous answer buttons and build new ones for this question
    optionsContainer.innerHTML = "";
    current.options.forEach((optionLabel, index) => {
        const optionButton = document.createElement("button");
        optionButton.className = "option-btn";
        optionButton.textContent = optionLabel;
        optionButton.addEventListener("click", () => handleAnswer(optionButton, index));
        optionsContainer.appendChild(optionButton);
    });
}

// Handles a player's answer: gives visible feedback and updates the score
function handleAnswer(selectedButton, selectedIndex) {
    const current = questions[currentQuestionIndex];
    const allOptionButtons = optionsContainer.querySelectorAll(".option-btn");

    // Lock in the answer by disabling every option button
    allOptionButtons.forEach((btn) => (btn.disabled = true));

    if (selectedIndex === current.correctIndex) {
        selectedButton.classList.add("correct");
        feedbackText.textContent = "Correct!";
        feedbackText.classList.remove("incorrect-text");
        feedbackText.classList.add("correct-text");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        allOptionButtons[current.correctIndex].classList.add("correct");
        lives--;
        feedbackText.textContent = lives > 0
            ? "Not quite. The correct answer is highlighted."
            : "Not quite, and that was your last life.";
        feedbackText.classList.remove("correct-text");
        feedbackText.classList.add("incorrect-text");
    }

    feedbackText.classList.remove("hidden");
    livesDisplay.textContent = `Lives: ${"♥ ".repeat(lives).trim() || "none"}`;
    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.classList.remove("hidden");
    nextBtn.textContent = lives <= 0 ? "See Results" : "Next Question";
}

// Shows the end screen: a win (Mission Success) if every question was
// answered with a life remaining, or a loss (Mission Failed) otherwise
function showEndScreen(won) {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");

    endTitle.classList.remove("success", "failure");
    if (won) {
        endTitle.textContent = "Mission Success";
        endTitle.classList.add("success");
        finalScoreText.textContent =
            `You completed the mission with ${score} out of ${questions.length} correct and ${lives} life${lives === 1 ? "" : "s"} to spare.`;
    } else {
        endTitle.textContent = "Mission Failed";
        endTitle.classList.add("failure");
        finalScoreText.textContent =
            `You ran out of lives on question ${currentQuestionIndex + 1} of ${questions.length}, with a score of ${score}.`;
    }
}
