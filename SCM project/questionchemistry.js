document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the chemical symbol for water?",
            options: [
                { key: "A", value: "H2" },
                { key: "B", value: "OH" },
                { key: "C", value: "H2O" },
                { key: "D", value: "O2" }
            ],
            answer: "C"
        },
        {
            question: "What is the pH value of pure water?",
            options: [
                { key: "A", value: "6" },
                { key: "B", value: "7" },
                { key: "C", value: "8" },
                { key: "D", value: "9" }
            ],
            answer: "B"
        },
        {
            question: "Which element has the atomic number 1?",
            options: [
                { key: "A", value: "Hydrogen" },
                { key: "B", value: "Helium" },
                { key: "C", value: "Oxygen" },
                { key: "D", value: "Lithium" }
            ],
            answer: "A"
        },
        {
            question: "Which acid is found in lemon?",
            options: [
                { key: "A", value: "Citric Acid" },
                { key: "B", value: "Hydrochloric Acid" },
                { key: "C", value: "Acetic Acid" },
                { key: "D", value: "Formic Acid" }
            ],
            answer: "A"
        },
        {
            question: "Which element is a liquid at room temperature?",
            options: [
                { key: "A", value: "Mercury" },
                { key: "B", value: "Copper" },
                { key: "C", value: "Iron" },
                { key: "D", value: "Silver" }
            ],
            answer: "A"
        },
        {
            question: "What is the periodic table's symbol for gold?",
            options: [
                { key: "A", value: "Ag" },
                { key: "B", value: "Au" },
                { key: "C", value: "Gd" },
                { key: "D", value: "Ga" }
            ],
            answer: "B"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: [
                { key: "A", value: "Diamond" },
                { key: "B", value: "Graphite" },
                { key: "C", value: "Quartz" },
                { key: "D", value: "Steel" }
            ],
            answer: "A"
        },
        {
            question: "Which element is essential for the formation of bones and teeth?",
            options: [
                { key: "A", value: "Iron" },
                { key: "B", value: "Calcium" },
                { key: "C", value: "Magnesium" },
                { key: "D", value: "Sodium" }
            ],
            answer: "B"
        },
        {
            question: "Which gas is known as 'laughing gas'?",
            options: [
                { key: "A", value: "Nitrous Oxide (N2O)" },
                { key: "B", value: "Methane" },
                { key: "C", value: "Carbon Dioxide" },
                { key: "D", value: "Helium" }
            ],
            answer: "A"
        },
        {
            question: "What is the pH range of acids?",
            options: [
                { key: "A", value: " 7-14" },
                { key: "B", value: "0-7" },
                { key: "C", value: "6-8" },
                { key: "D", value: "1-7" }
            ],
            answer: "B"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let timeLeft = 10;


    const questionText = document.getElementById("questionText");
    const optionList = document.getElementById("optionList");
    const questionTotal = document.getElementById("questionTotal");
    const scoreDisplay = document.getElementById("score");
    const nextBtn = document.getElementById("nextBtn");
    const timerElement = document.getElementById("timer");

   
    function shuffleQuestions() {
        return questions.sort(() => Math.random() - 0.5);
    }

    // Load Question
    function loadQuestion(index) {
        const question = questions[index];
        questionText.innerText = question.question;
        questionTotal.innerText = `${index + 1} of ${questions.length} Questions`;

        optionList.innerHTML = ""; 
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
