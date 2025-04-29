document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Who is known as the 'King of Pop'?",
            options: [
                { key: "A", value: "Elvis Presley" },
                { key: "B", value: "Michael Jackson" },
                { key: "C", value: "Freddie Mercury" },
                { key: "D", value: "Prince" }
            ],
            answer: "B"
        },
        {
            question: "Which musical instrument has 88 keys?",
            options: [
                { key: "A", value: "Piano" },
                { key: "B", value: "Guitar" },
                { key: "C", value: "Violin" },
                { key: "D", value: "Saxophone" }
            ],
            answer: "A"
        },
        {
            question: "Which famous composer became deaf later in life but continued to compose music?",
            options: [
                { key: "A", value: "Wolfgang Amadeus Mozart" },
                { key: "B", value: "Ludwig van Beethoven" },
                { key: "C", value: "Johann Sebastian Bach" },
                { key: "D", value: "Franz Schubert" }
            ],
            answer: "B"
        },
        {
            question: "What is the term for a musical piece written for four performers?",
            options: [
                { key: "A", value: "Duet" },
                { key: "B", value: "Quartet" },
                { key: "C", value: "Trio" },
                { key: "D", value: "Ensemble" }
            ],
            answer: "B"
        },
        {
            question: "Which of these is a string instrument?",
            options: [
                { key: "A", value: "Flute" },
                { key: "B", value: "Cello" },
                { key: "C", value: "Trumpet" },
                { key: "D", value: "Drum" }
            ],
            answer: "B"
        },
        {
            question: "What is the highest female singing voice called?",
            options: [
                { key: "A", value: "Alto" },
                { key: "B", value: "Soprano" },
                { key: "C", value: "Mezzo-soprano" },
                { key: "D", value: "Contralto" }
            ],
            answer: "B"
        },
        {
            question: "Which musical genre originated in Jamaica?",
            options: [
                { key: "A", value: "Reggae" },
                { key: "B", value: "Jazz" },
                { key: "C", value: "Blues" },
                { key: "D", value: "Rock" }
            ],
            answer: "A"
        },
        {
            question: "What is the term for a fast tempo in music?",
            options: [
                { key: "A", value: "Largo" },
                { key: "B", value: "Allegro" },
                { key: "C", value: "Adagio" },
                { key: "D", value: "Andante" }
            ],
            answer: "B"
        },
        {
            question: "Who composed the famous symphony *The Four Seasons*?",
            options: [
                { key: "A", value: "Johann Sebastian Bach" },
                { key: "B", value: "Antonio Vivaldi" },
                { key: "C", value: "Franz Schubert" },
                { key: "D", value: "Wolfgang Amadeus Mozart" }
            ],
            answer: "B"
        },
        {
            question: "Which band is famous for the album *Abbey Road*?",
            options: [
                { key: "A", value: "The Rolling Stones" },
                { key: "B", value: "The Beatles" },
                { key: "C", value: "Pink Floyd" },
                { key: "D", value: "Queen" }
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