document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the state of an object that is not moving?",
            options: [
                { key: "A", value: "Motion" },
                { key: "B", value: "Velocity" },
                { key: "C", value: "Rest" },
                { key: "D", value: "Acceleration" }
            ],
            answer: "C"
        },
        {
            question: "What is the main source of light on Earth? ",
            options: [
                { key: "A", value: "Moon" },
                { key: "B", value: "Sun" },
                { key: "C", value: "Fire" },
                { key: "D", value: "Stars" }
            ],
            answer: "B"
        },
        {
            question: "Which state of matter has a fixed shape?",
            options: [
                { key: "A", value: "Solid" },
                { key: "B", value: "Liquid" },
                { key: "C", value: "Gas" },
                { key: "D", value: "Plasma" }
            ],
            answer: "A"
        },
        {
            question: " What device is used to measure temperature?",
            options: [
                { key: "A", value: " Thermometer" },
                { key: "B", value: "Ruler" },
                { key: "C", value: "Scale" },
                { key: "D", value: "Stopwatch" }
            ],
            answer: "A"
        },
        {
            question: "What is attracted to a magnet?",
            options: [
                { key: "A", value: "Iron" },
                { key: "B", value: "Plastic" },
                { key: "C", value: "Wood" },
                { key: "D", value: "Paper" }
            ],
            answer: "A"
        },
        {
            question: "What is the unit of force in the SI system?",
            options: [
                { key: "A", value: "Watt" },
                { key: "B", value: "Newton" },
                { key: "C", value: "Joule" },
                { key: "D", value: "Pascal" }
            ],
            answer: "B"
        },
        {
            question: "What is the formula for speed ?",
            options: [
                { key: "A", value: "Distance ÷ Time" },
                { key: "B", value: "Distance x Time" },
                { key: "C", value: "Velocity x Time" },
                { key: "D", value: "Time ÷ Distance" }
            ],
            answer: "A"
        },
        {
            question: "What is the unit of electric current?",
            options: [
                { key: "A", value: "Volt" },
                { key: "B", value: "Ampere" },
                { key: "C", value: "Watt" },
                { key: "D", value: "Ohm" }
            ],
            answer: "B"
        },
        {
            question: "According to Ohm’s Law, what is the formula for voltage ?",
            options: [
                { key: "A", value: "V = I R" },
                { key: "B", value: "V = I + R" },
                { key: "C", value: "V = I / R" },
                { key: "D", value: "None of these" }
            ],
            answer: "A"
        },
        {
            question: "What does a moving object have?",
            options: [
                { key: "A", value: "Force" },
                { key: "B", value: "Energy" },
                { key: "C", value: "Friction" },
                { key: "D", value: "Stillness" }
            ],
            answer: "B"
        },
        // Add more questions up to 10
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let timeLeft = 10;

    // Elements
    const questionText = document.getElementById("questionText");
    const optionList = document.getElementById("optionList");
    const questionTotal = document.getElementById("questionTotal");
    const scoreDisplay = document.getElementById("score");
    const nextBtn = document.getElementById("nextBtn");
    const timerElement = document.getElementById("timer");

    // Shuffle questions
    function shuffleQuestions() {
        return questions.sort(() => Math.random() - 0.5);
    }

    // Load Question
    function loadQuestion(index) {
        const question = questions[index];
        questionText.innerText = question.question;
        questionTotal.innerText = `${index + 1} of ${questions.length} Questions`;

        optionList.innerHTML = ""; // Clear previous options
        question.options.forEach(option => {
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("option");
            optionDiv.innerHTML = `<span>${option.key}. ${option.value}</span>`;
            optionDiv.addEventListener("click", () => selectOption(option.key));
            optionList.appendChild(optionDiv);
        });

        // Reset timer
        resetTimer();
    }

    // Reset Timer
    function resetTimer() {
        timeLeft = 10; // Reset timer to 10 seconds
        timerElement.innerText = timeLeft;
        
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Stop the timer
                moveToNextQuestion(); // Move to next question after time is up
            }
        }, 1000);
    }

    // Handle option selection
    function selectOption(selectedKey) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        
        // Clear any previous styling
        Array.from(optionList.children).forEach(option => option.classList.remove("correct", "incorrect"));

        const selectedOption = Array.from(optionList.children).find(option => option.innerText.startsWith(selectedKey));
        if (selectedKey === correctAnswer) {
            selectedOption.classList.add("correct");
            score++;
            scoreDisplay.innerText = `Score: ${score} / ${questions.length}`;
        } else {
            selectedOption.classList.add("incorrect");
            const correctOption = Array.from(optionList.children).find(option => option.innerText.startsWith(correctAnswer));
            correctOption.classList.add("correct");
        }

        Array.from(optionList.children).forEach(option => option.style.pointerEvents = "none");

        setTimeout(() => {
            moveToNextQuestion();
        }, 1500);
    }

    // Move to the next question
    function moveToNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        } else {
            showFinalScore();
        }
    }

    // Show final score in popup
    function showFinalScore() {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Quiz Completed!</h2>
                <p>Your score is ${score} / ${questions.length}</p>
                <button onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    // Restart quiz
    function restartQuiz() {
        // Shuffle questions
        questions = shuffleQuestions();
        currentQuestionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `Score: ${score} / ${questions.length}`;
        loadQuestion(currentQuestionIndex);
    }

    nextBtn.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    loadQuestion(currentQuestionIndex);
});