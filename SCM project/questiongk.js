document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Which planet is known as the Red Planet?",
            options: [
                { key: "A", value: "Earth" },
                { key: "B", value: "Venus" },
                { key: "C", value: "Mars" },
                { key: "D", value: "Jupiter" }
            ],
            answer: "C"
        },
        {
            question: "What is the capital of India?",
            options: [
                { key: "A", value: "Uttar Pradesh" },
                { key: "B", value: "New Delhi" },
                { key: "C", value: "Maharashtra" },
                { key: "D", value: "Mumbai" }
            ],
            answer: "B"
        },
        {
            question: "What is the capital of Japan?",
            options: [
                { key: "A", value: "Tokyo" },
                { key: "B", value: "India" },
                { key: "C", value: "America" },
                { key: "D", value: "Australia" }
            ],
            answer: "A"
        },
        {
            question: "Who is known as the Father of the Indian Constitution?",
            options: [
                { key: "A", value: "Dr. B.R. Ambedkar" },
                { key: "B", value: "Mahatama Gandhi" },
                { key: "C", value: "Sardar Patel" },
                { key: "D", value: "Jawaharlal Nehru" }
            ],
            answer: "A"
        },
        {
            question: "Who wrote the famous play 'Romeo and Juliet'?",
            options: [
                { key: "A", value: "William Shakespeare " },
                { key: "B", value: "Charles Dickens" },
                { key: "C", value: "Mark Twain" },
                { key: "D", value: " Leo Tolstoy" }
            ],
            answer: "A"
        },
        {
            question: "What is the largest ocean in the world?",
            options: [
                { key: "A", value: "Atlantic Ocean" },
                { key: "B", value: "Pacific Ocean" },
                { key: "C", value: "Indian Ocean" },
                { key: "D", value: " Arctic Ocean" }
            ],
            answer: "B"
        },
        {
            question: "How many continents are there in the world?",
            options: [
                { key: "A", value: "7" },
                { key: "B", value: "6" },
                { key: "C", value: "5" },
                { key: "D", value: "4" }
            ],
            answer: "A"
        },
        {
            question: "What is the largest desert in the world?",
            options: [
                { key: "A", value: " Gobi" },
                { key: "B", value: "Sahara" },
                { key: "C", value: "Kalahari" },
                { key: "D", value: "Antarctica" }
            ],
            answer: "B"
        },
        {
            question: "Who is known as the Missile Man of India?",
            options: [
                { key: "A", value: " Dr. A.P.J. Abdul Kalam" },
                { key: "B", value: "Homi Bhabha" },
                { key: "C", value: " Satish Dhawan" },
                { key: "D", value: "Vikram Sarabhai" }
            ],
            answer: "A"
        },
        {
            question: "How many bones are there in the adult human body?",
            options: [
                { key: "A", value: "200" },
                { key: "B", value: "206" },
                { key: "C", value: "208" },
                { key: "D", value: "300" }
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