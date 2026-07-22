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
let currentQuestionIndex = 0;
let score = 0;

// Select all elements the game needs to update
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");
const finalScoreText = document.getElementById("final-score-text");

// Start button: switch from the briefing screen to the game screen
startBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    endScreen.classList.add("hidden");
    loadQuestion();
});

// Restart button: reset state and go back to the briefing screen
restartBtn.addEventListener("click", () => {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

// Next button: advance to the next question, or show the end screen if finished
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
});

// Renders the current question and its answer buttons
function loadQuestion() {
    const current = questions[currentQuestionIndex];

    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
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
        feedbackText.textContent = "Not quite. The correct answer is highlighted.";
        feedbackText.classList.remove("correct-text");
        feedbackText.classList.add("incorrect-text");
    }

    feedbackText.classList.remove("hidden");
    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.classList.remove("hidden");
}

// Shows the final score once all questions have been answered
function showEndScreen() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScoreText.textContent = `You scored ${score} out of ${questions.length}.`;
}
