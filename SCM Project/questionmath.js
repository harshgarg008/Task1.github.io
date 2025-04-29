document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is 5 + 3?",
            options: [
                { key: "A", value: "11" },
                { key: "B", value: "10" },
                { key: "C", value: "8" },
                { key: "D", value: "9" }
            ],
            answer: "C"
        },
        {
            question: "What is 10 - 4? ",
            options: [
                { key: "A", value: "5" },
                { key: "B", value: "6" },
                { key: "C", value: "2" },
                { key: "D", value: "1" }
            ],
            answer: "B"
        },
        {
            question: "What is 3 x 4?",
            options: [
                { key: "A", value: "12" },
                { key: "B", value: "10" },
                { key: "C", value: "22" },
                { key: "D", value: "15" }
            ],
            answer: "A"
        },
        {
            question: " What is 20 ÷ 5?",
            options: [
                { key: "A", value: "4" },
                { key: "B", value: "2" },
                { key: "C", value: "10" },
                { key: "D", value: "7" }
            ],
            answer: "A"
        },
        {
            question: "How many sides does a triangle have?",
            options: [
                { key: "A", value: "3" },
                { key: "B", value: "4" },
                { key: "C", value: "5" },
                { key: "D", value: "9" }
            ],
            answer: "A"
        },
        {
            question: "What is 2 + 3 x 2?",
            options: [
                { key: "A", value: "7" },
                { key: "B", value: "8" },
                { key: "C", value: "9" },
                { key: "D", value: "10" }
            ],
            answer: "B"
        },
        {
            question: "What is the sum of all angles in a triangle ?",
            options: [
                { key: "A", value: "180°" },
                { key: "B", value: "90°" },
                { key: "C", value: "360°" },
                { key: "D", value: "270°" }
            ],
            answer: "A"
        },
        {
            question: "Which of the following is an odd number ?",
            options: [
                { key: "A", value: "2" },
                { key: "B", value: "7" },
                { key: "C", value: "8" },
                { key: "D", value: "10" }
            ],
            answer: "B"
        },
        {
            question: "If 2x = 16,what is x ?",
            options: [
                { key: "A", value: "8" },
                { key: "B", value: "7" },
                { key: "C", value: "4" },
                { key: "D", value: "6" }
            ],
            answer: "A"
        },
        {
            question: "How many meters are in 1 kilometer ?",
            options: [
                { key: "A", value: "2000" },
                { key: "B", value: "1000" },
                { key: "C", value: "500" },
                { key: "D", value: "10000" }
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