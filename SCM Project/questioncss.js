document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What does CSS stand for?",
            options: [
                { key: "A", value: "Computer Style Sheets" },
                { key: "B", value: "Creative Style Sheets" },
                { key: "C", value: "Cascading Style Sheets" },
                { key: "D", value: "Colorful Style Sheets" }
            ],
            answer: "C"
        },
        {
            question: "Which CSS property is used to change the font size of text ?",
            options: [
                { key: "A", value: "text-size" },
                { key: "B", value: "font-size" },
                { key: "C", value: "text-font" },
                { key: "D", value: "text-size" }
            ],
            answer: "B"
        },
        {
            question: "Which property is used to add space between HTML elements in CSS ?",
            options: [
                { key: "A", value: "Margin" },
                { key: "B", value: "Padding" },
                { key: "C", value: "Border-spacing" },
                { key: "D", value: "Spacing" }
            ],
            answer: "A"
        },
        {
            question: "Which CSS property is used to change the background color of an element ?",
            options: [
                { key: "A", value: "background-color" },
                { key: "B", value: "color" },
                { key: "C", value: "bgcolor" },
                { key: "D", value: "background-image" }
            ],
            answer: "A"
        },
        {
            question: "Which of the following CSS properties is used to change the font of text ?",
            options: [
                { key: "A", value: "font-family" },
                { key: "B", value: "text-font" },
                { key: "C", value: "font-style" },
                { key: "D", value: "font-type" }
            ],
            answer: "A"
        },
        {
            question: "Which CSS property controls the space between the content and the border of an element ?",
            options: [
                { key: "A", value: "Margin" },
                { key: "B", value: "Padding" },
                { key: "C", value: "Border-spacing" },
                { key: "D", value: "Border" }
            ],
            answer: "B"
        },
        {
            question: "Which HTML tag is used to include CSS in an HTML document ?",
            options: [
                { key: "A", value: "style" },
                { key: "B", value: "css" },
                { key: "C", value: "link" },
                { key: "D", value: "script" }
            ],
            answer: "A"
        },
        {
            question: "Which of the following CSS properties is used to change the text color ?",
            options: [
                { key: "A", value: "text-color" },
                { key: "B", value: "color" },
                { key: "C", value: "font-color" },
                { key: "D", value: "background-color" }
            ],
            answer: "B"
        },
        {
            question: "Which of the following selectors selects all elements on a page ?",
            options: [
                { key: "A", value: "*" },
                { key: "B", value: "body" },
                { key: "C", value: "all" },
                { key: "D", value: "div" }
            ],
            answer: "A"
        },
        {
            question: "Which property is used to set the height of an element in CSS ?",
            options: [
                { key: "A", value: "weight" },
                { key: "B", value: "height" },
                { key: "C", value: "size" },
                { key: "D", value: "width" }
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