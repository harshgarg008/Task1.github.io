document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                { key: "A", value: "Hyper Type Multi Language" },
                { key: "B", value: "Hyper Text Multiple Language" },
                { key: "C", value: "Hyper Text Markup Language" },
                { key: "D", value: "Home Text Multi Language" }
            ],
            answer: "C"
        },
        {
            question: "Which of the following is the correct HTML tag for inserting a line break?",
            options: [
                { key: "A", value: "break" },
                { key: "B", value: "br" },
                { key: "C", value: "lb" },
                { key: "D", value: "line" }
            ],
            answer: "B"
        },
        {
            question: "What is the correct HTML element for the largest heading?",
            options: [
                { key: "A", value: "h1" },
                { key: "B", value: "heading" },
                { key: "C", value: "h6" },
                { key: "D", value: "head" }
            ],
            answer: "A"
        },
        {
            question: "Which tag is used to define an unordered list?",
            options: [
                { key: "A", value: "ul" },
                { key: "B", value: "ol" },
                { key: "C", value: "li" },
                { key: "D", value: "list" }
            ],
            answer: "A"
        },
        {
            question: "Which of the following HTML tags is used to define a paragraph?",
            options: [
                { key: "A", value: "p" },
                { key: "B", value: "para" },
                { key: "C", value: "text" },
                { key: "D", value: "pr" }
            ],
            answer: "A"
        },
        {
            question: "Which tag is used to define an HTML form?",
            options: [
                { key: "A", value: "input" },
                { key: "B", value: "form" },
                { key: "C", value: "field" },
                { key: "D", value: "button" }
            ],
            answer: "B"
        },
        {
            question: "Which tag is used to insert an image in HTML?",
            options: [
                { key: "A", value: "img" },
                { key: "B", value: "image" },
                { key: "C", value: "pic" },
                { key: "D", value: "src" }
            ],
            answer: "A"
        },
        {
            question: "Which of the following is used to define a list item in HTML?",
            options: [
                { key: "A", value: "list" },
                { key: "B", value: "li" },
                { key: "C", value: "item" },
                { key: "D", value: "ul" }
            ],
            answer: "B"
        },
        {
            question: "What does the <title> tag do in HTML?",
            options: [
                { key: "A", value: "It defines the title of the webpage displayed on the browser tab" },
                { key: "B", value: "It adds a title to an image" },
                { key: "C", value: "It defines the title of the header" },
                { key: "D", value: "It creates a clickable title for navigation" }
            ],
            answer: "A"
        },
        {
            question: "Which tag is used to define an ordered list?",
            options: [
                { key: "A", value: "ul" },
                { key: "B", value: "ol" },
                { key: "C", value: "li" },
                { key: "D", value: "list" }
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






