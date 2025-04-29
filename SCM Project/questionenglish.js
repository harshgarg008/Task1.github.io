document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Which of the following is a color?",
            options: [
                { key: "A", value: "Apple" },
                { key: "B", value: "Jump" },
                { key: "C", value: "Red" },
                { key: "D", value: "Walk" }
            ],
            answer: "C"
        },
        {
            question: "Which is an animal?",
            options: [
                { key: "A", value: "Book" },
                { key: "B", value: "Dog" },
                { key: "C", value: "Table" },
                { key: "D", value: "Mat" }
            ],
            answer: "B"
        },
        {
            question: "The cat is _____ the mat?",
            options: [
                { key: "A", value: "on" },
                { key: "B", value: "in" },
                { key: "C", value: "inside" },
                { key: "D", value: "under" }
            ],
            answer: "A"
        },
        {
            question: "Which of these is a fruit?",
            options: [
                { key: "A", value: "Banana" },
                { key: "B", value: "Carrot" },
                { key: "C", value: "Potato" },
                { key: "D", value: "Tomato" }
            ],
            answer: "A"
        },
        {
            question: "What is the opposite of 'up'?",
            options: [
                { key: "A", value: "Down" },
                { key: "B", value: "Left" },
                { key: "C", value: "Right" },
                { key: "D", value: "None of these" }
            ],
            answer: "A"
        },
        {
            question: "Which one is a shape?",
            options: [
                { key: "A", value: "Run" },
                { key: "B", value: "Circle" },
                { key: "C", value: "Sleep" },
                { key: "D", value: "Walk" }
            ],
            answer: "B"
        },
        {
            question: "Which word is a number?",
            options: [
                { key: "A", value: "Three" },
                { key: "B", value: "Tall" },
                { key: "C", value: "Soft" },
                { key: "D", value: "Short" }
            ],
            answer: "A"
        },
        {
            question: "What is the opposite of 'hot'?",
            options: [
                { key: "A", value: "Big" },
                { key: "B", value: "Cold" },
                { key: "C", value: "Loud" },
                { key: "D", value: "None of these" }
            ],
            answer: "B"
        },
        {
            question: "What animal says 'meow'?",
            options: [
                { key: "A", value: "Cat" },
                { key: "B", value: "Dog" },
                { key: "C", value: "Cow" },
                { key: "D", value: "All of the above" }
            ],
            answer: "A"
        },
        {
            question: "Which one is a form of transportation?",
            options: [
                { key: "A", value: "Chair" },
                { key: "B", value: "Car" },
                { key: "C", value: "Tree" },
                { key: "D", value: "None of these" }
            ],
            answer: "B"
        }
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