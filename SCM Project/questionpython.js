document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is the correct extension for Python files?",
            options: [
                { key: "A", value: "python" },
                { key: "B", value: ".pyt" },
                { key: "C", value: ".py" },
                { key: "D", value: ".px" }
            ],
            answer: "C"
        },
        {
            question: " How do you print a message in Python?",
            options: [
                { key: "A", value: 'echo ("Hello, World")' },
                { key: "B", value: 'print("Hello, World")' },
                { key: "C", value: 'write("Hello, World")' },
                { key: "D", value: 'printf("Hello, World")' }
            ],
            answer: "B"
        },
        {
            question: "Which of the following is used to create a comment in Python?",
            options: [
                { key: "A", value: "#" },
                { key: "B", value: "//" },
                { key: "C", value: "*" },
                { key: "D", value: "<!-- -->" }
            ],
            answer: "A"
        },
        {
            question: "Which data type is used to store True or False values?",
            options: [
                { key: "A", value: "bool" },
                { key: "B", value: "int" },
                { key: "C", value: "str" },
                { key: "D", value: "float" }
            ],
            answer: "A"
        },
        {
            question: "How do you take input from the user in Python?",
            options: [
                { key: "A", value: "input()" },
                { key: "B", value: "scan()" },
                { key: "C", value: "cin()" },
                { key: "D", value: "read()" }
            ],
            answer: "A"
        },
        {
            question: " What is the correct way to declare a list in Python?",
            options: [
                { key: "A", value: "list = {1, 2, 3}" },
                { key: "B", value: "list = [1, 2, 3]" },
                { key: "C", value: "list = (1, 2, 3)" },
                { key: "D", value: "list = <1, 2, 3>" }
            ],
            answer: "B"
        },
        {
            question: " Which function is used to find the length of a list in Python?",
            options: [
                { key: "A", value: "len()" },
                { key: "B", value: "count()" },
                { key: "C", value: "size()" },
                { key: "D", value: "length()" }
            ],
            answer: "A"
        },
        {
            question: "Which operator is used for exponentiation in Python?",
            options: [
                { key: "A", value: "^" },
                { key: "B", value: "**" },
                { key: "C", value: "*" },
                { key: "D", value: "%" }
            ],
            answer: "B"
        },
        {
            question: " What is the result of 10 % 2?",
            options: [
                { key: "A", value: "0" },
                { key: "B", value: "1" },
                { key: "C", value: "2" },
                { key: "D", value: "3" }
            ],
            answer: "A"
        },
        {
            question: "What does the len() function return when used on a string?",
            options: [
                { key: "A", value: "Size of memory allocated for the string" },
                { key: "B", value: " Number of characters in the string" },
                { key: "C", value: "The index of the last character" },
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