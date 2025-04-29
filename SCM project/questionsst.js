document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Who was the first President of the United States?",
            options: [
                { key: "A", value: "Abraham Lincoln" },
                { key: "B", value: "George Washington" },
                { key: "C", value: "Thomas Jefferson" },
                { key: "D", value: "John Adams" }
            ],
            answer: "B"
        },
        {
            question: "What year did India gain independence?",
            options: [
                { key: "A", value: "1945" },
                { key: "B", value: "1946" },
                { key: "C", value: "1947" },
                { key: "D", value: "1948" }
            ],
            answer: "C"
        },
        {
            question: "Which is the largest continent by area?",
            options: [
                { key: "A", value: "Africa" },
                { key: "B", value: "Asia" },
                { key: "C", value: "Europe" },
                { key: "D", value: "North America" }
            ],
            answer: "B"
        },
        {
            question: "What is the capital of India?",
            options: [
                { key: "A", value: "Mumbai" },
                { key: "B", value: "Delhi" },
                { key: "C", value: "Kolkata" },
                { key: "D", value: "Chennai" }
            ],
            answer: "B"
        },
        {
            question: "Who is known as the 'Father of the Indian Constitution'?",
            options: [
                { key: "A", value: "Mahatma Gandhi" },
                { key: "B", value: "Dr. B.R. Ambedkar" },
                { key: "C", value: "Jawaharlal Nehru" },
                { key: "D", value: "Sardar Vallabhbhai Patel" }
            ],
            answer: "B"
        },
        {
            question: "Which is the smallest continent in the world?",
            options: [
                { key: "A", value: "Europe" },
                { key: "B", value: "Australia" },
                { key: "C", value: "Antarctica" },
                { key: "D", value: "South America" }
            ],
            answer: "B"
        },
        {
            question: "Which is the longest river in the world?",
            options: [
                { key: "A", value: "Amazon" },
                { key: "B", value: "Nile" },
                { key: "C", value: "Yangtze" },
                { key: "D", value: "Ganges" }
            ],
            answer: "B"
        },
        {
            question: "What is the primary function of the legislature?",
            options: [
                { key: "A", value: "To make laws" },
                { key: "B", value: "To interpret laws" },
                { key: "C", value: "To enforce laws" },
                { key: "D", value: "To amend laws" }
            ],
            answer: "A"
        },
        {
            question: "What is the study of Economics mainly about?",
            options: [
                { key: "A", value: "Money and resources" },
                { key: "B", value: "Laws and regulations" },
                { key: "C", value: "Weather and climate" },
                { key: "D", value: "Rocks and minerals" }
            ],
            answer: "A"
        },
        {
            question: "What is a democracy?",
            options: [
                { key: "A", value: "Rule by kings" },
                { key: "B", value: "Rule by wealthy people" },
                { key: "C", value: "Rule by the people" },
                { key: "D", value: "Rule by officials" }
            ],
            answer: "C"
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
