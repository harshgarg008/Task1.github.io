document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Which country has won the most FIFA World Cup titles?",
            options: [
                { key: "A", value: "Germany" },
                { key: "B", value: "Italy" },
                { key: "C", value: "Brazil" },
                { key: "D", value: "Argentina" }
            ],
            answer: "C"
        },
        {
            question: "How many players are there in a standard soccer team on the field?",
            options: [
                { key: "A", value: "10" },
                { key: "B", value: "11" },
                { key: "C", value: "12" },
                { key: "D", value: "9" }
            ],
            answer: "B"
        },
        {
            question: "What is the national sport of Japan?",
            options: [
                { key: "A", value: "Baseball" },
                { key: "B", value: "Sumo Wrestling" },
                { key: "C", value: "Karate" },
                { key: "D", value: "Judo" }
            ],
            answer: "B"
        },
        {
            question: "Which tennis tournament is played on a grass surface?",
            options: [
                { key: "A", value: "Australian Open" },
                { key: "B", value: "French Open" },
                { key: "C", value: "Wimbledon" },
                { key: "D", value: "US Open" }
            ],
            answer: "C"
        },
        {
            question: "How long is an Olympic swimming pool?",
            options: [
                { key: "A", value: "25 meters" },
                { key: "B", value: "50 meters" },
                { key: "C", value: "100 meters" },
                { key: "D", value: "75 meters" }
            ],
            answer: "B"
        },
        {
            question: "Who is known as the 'Fastest Man Alive' in athletics?",
            options: [
                { key: "A", value: "Carl Lewis" },
                { key: "B", value: "Usain Bolt" },
                { key: "C", value: "Justin Gatlin" },
                { key: "D", value: "Yohan Blake" }
            ],
            answer: "B"
        },
        {
            question: "Which sport uses the term 'birdie'?",
            options: [
                { key: "A", value: "Tennis" },
                { key: "B", value: "Badminton" },
                { key: "C", value: "Golf" },
                { key: "D", value: "Cricket" }
            ],
            answer: "B"
        },
        {
            question: "How many points is a touchdown worth in American football?",
            options: [
                { key: "A", value: "3" },
                { key: "B", value: "6" },
                { key: "C", value: "7" },
                { key: "D", value: "5" }
            ],
            answer: "B"
        },
        {
            question: "Which sport is known as 'the gentleman's game'?",
            options: [
                { key: "A", value: "Tennis" },
                { key: "B", value: "Golf" },
                { key: "C", value: "Cricket" },
                { key: "D", value: "Rugby" }
            ],
            answer: "C"
        },
        {
            question: "What is the maximum score possible in a single frame of bowling?",
            options: [
                { key: "A", value: "200" },
                { key: "B", value: "300" },
                { key: "C", value: "250" },
                { key: "D", value: "350" }
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