document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What does SEO stand for in digital marketing?",
            options: [
                { key: "A", value: "Search Engine Optimization" },
                { key: "B", value: "Social Engine Optimization" },
                { key: "C", value: "Search Engine Operation" },
                { key: "D", value: "Social Engagement Optimization" }
            ],
            answer: "A"
        },
        {
            question: "Which platform is primarily used for professional networking?",
            options: [
                { key: "A", value: "Facebook" },
                { key: "B", value: "LinkedIn" },
                { key: "C", value: "Instagram" },
                { key: "D", value: "Snapchat" }
            ],
            answer: "B"
        },
        {
            question: "What does PPC stand for in digital marketing?",
            options: [
                { key: "A", value: "Pay Per Click" },
                { key: "B", value: "Pay Per Conversion" },
                { key: "C", value: "Page Performance Calculation" },
                { key: "D", value: "Pay Per Cost" }
            ],
            answer: "A"
        },
        {
            question: "Which metric is used to measure the click-through rate (CTR)?",
            options: [
                { key: "A", value: "Clicks divided by impressions" },
                { key: "B", value: "Impressions divided by clicks" },
                { key: "C", value: "Clicks multiplied by conversions" },
                { key: "D", value: "Cost divided by impressions" }
            ],
            answer: "A"
        },
        {
            question: "What is the purpose of A/B testing in digital marketing?",
            options: [
                { key: "A", value: "To compare two versions of a campaign" },
                { key: "B", value: "To track customer purchases" },
                { key: "C", value: "To measure website speed" },
                { key: "D", value: "To analyze SEO keywords" }
            ],
            answer: "A"
        },
        {
            question: "Which is an example of a content marketing strategy?",
            options: [
                { key: "A", value: "Publishing blog posts" },
                { key: "B", value: "Running paid ads" },
                { key: "C", value: "Sending SMS notifications" },
                { key: "D", value: "Optimizing server response time" }
            ],
            answer: "A"
        },
        {
            question: "What is a common goal of social media marketing?",
            options: [
                { key: "A", value: "Increase brand awareness" },
                { key: "B", value: "Improve page load times" },
                { key: "C", value: "Reduce product costs" },
                { key: "D", value: "Enhance software development" }
            ],
            answer: "A"
        },
        {
            question: "What does the term 'bounce rate' refer to?",
            options: [
                { key: "A", value: "Percentage of visitors leaving a website after viewing one page" },
                { key: "B", value: "Number of clicks on an advertisement" },
                { key: "C", value: "Total time spent on a website" },
                { key: "D", value: "Number of pages viewed per visit" }
            ],
            answer: "A"
        },
        {
            question: "Which platform is best for sharing visual content like images and videos?",
            options: [
                { key: "A", value: "Instagram" },
                { key: "B", value: "Twitter" },
                { key: "C", value: "LinkedIn" },
                { key: "D", value: "Pinterest" }
            ],
            answer: "A"
        },
        {
            question: "Which of the following is a key benefit of email marketing?",
            options: [
                { key: "A", value: "Direct communication with target customers" },
                { key: "B", value: "Improved website speed" },
                { key: "C", value: "Lower server costs" },
                { key: "D", value: "Enhanced SEO ranking" }
            ],
            answer: "A"
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
