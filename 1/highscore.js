<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Quiz Application</title>
    <style>
        /* Basic styling */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f0f0f0;
        }
        .container {
            width: 90%;
            max-width: 600px;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        h1, h2 {
            margin-bottom: 15px;
            text-align: center;
        }
        input, button {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
        }
        button:disabled {
            background-color: #ccc;
        }
        .hidden {
            display: none;
        }
        .question-box {
            margin: 20px 0;
        }
        .crud-form {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Login Screen -->
        <div id="login-screen">
            <h1>Quiz Login</h1>
            <input type="text" id="username" placeholder="Enter Username" />
            <input type="password" id="password" placeholder="Enter Password" />
            <button onclick="login()">Login</button>
            <p id="login-error" style="color: red;"></p>
        </div>

        <!-- Quiz Screen -->
        <div id="quiz-screen" class="hidden">
            <h1>Quiz</h1>
            <div id="question-box" class="question-box"></div>
            <button id="next-btn" onclick="nextQuestion()" disabled>Next</button>
            <h2 id="score" class="hidden"></h2>
            <button id="restart-btn" class="hidden" onclick="restartQuiz()">Restart Quiz</button>
        </div>

        <!-- CRUD Screen -->
        <div id="crud-screen" class="hidden">
            <h1>Manage Questions</h1>
            <div id="question-list"></div>
            <div class="crud-form">
                <input type="text" id="new-question" placeholder="New Question" />
                <input type="text" id="new-choices" placeholder="Choices (comma-separated)" />
                <input type="number" id="new-correct" placeholder="Correct Choice Index" />
                <button onclick="addQuestion()">Add Question</button>
            </div>
        </div>
    </div>

    <script>
        // Sample questions
        let questions = [
            { question: "What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Transfer Machine Learning", "Home Tool Markup Language"], correct: 0 },
            { question: "Which CSS property controls text color?", choices: ["font-color", "text-color", "color"], correct: 2 },
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let loggedInUser = null;

        function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Simple validation
            if (username === "admin" && password === "1234") {
                loggedInUser = "admin";
                document.getElementById("login-screen").classList.add("hidden");
                document.getElementById("crud-screen").classList.remove("hidden");
                loadQuestions();
            } else if (username === "user" && password === "1234") {
                loggedInUser = "user";
                document.getElementById("login-screen").classList.add("hidden");
                document.getElementById("quiz-screen").classList.remove("hidden");
                loadQuestion();
            } else {
                document.getElementById("login-error").textContent = "Invalid credentials!";
            }
        }

        // Quiz Functions
        function loadQuestion() {
            const questionBox = document.getElementById("question-box");
            if (currentQuestionIndex < questions.length) {
                const question = questions[currentQuestionIndex];
                questionBox.innerHTML = `<h2>${question.question}</h2>`;
                question.choices.forEach((choice, index) => {
                    questionBox.innerHTML += `<button onclick="selectAnswer(${index})">${choice}</button>`;
                });
                document.getElementById("next-btn").disabled = true;
            } else {
                document.getElementById("question-box").classList.add("hidden");
                document.getElementById("score").classList.remove("hidden");
                document.getElementById("score").textContent = `Final Score: ${score}/${questions.length}`;
                document.getElementById("restart-btn").classList.remove("hidden");
                document.getElementById("next-btn").classList.add("hidden");
            }
        }

        function selectAnswer(index) {
            const question = questions[currentQuestionIndex];
            if (index === question.correct) {
                score++;
            }
            document.getElementById("next-btn").disabled = false;
        }

        function nextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById("score").classList.add("hidden");
            document.getElementById("restart-btn").classList.add("hidden");
            document.getElementById("question-box").classList.remove("hidden");
            document.getElementById("next-btn").classList.remove("hidden");
            loadQuestion();
        }

        // CRUD Functions
        function loadQuestions() {
            const questionList = document.getElementById("question-list");
            questionList.innerHTML = "";
            questions.forEach((q, index) => {
                questionList.innerHTML += `
                    <div>
                        <p><strong>${q.question}</strong> - Choices: ${q.choices.join(", ")} (Correct: ${q.correct})</p>
                        <button onclick="deleteQuestion(${index})">Delete</button>
                    </div>
                `;
            });
        }

        function addQuestion() {
            const newQuestion = document.getElementById("new-question").value;
            const newChoices = document.getElementById("new-choices").value.split(",");
            const newCorrect = parseInt(document.getElementById("new-correct").value);

            if (newQuestion && newChoices.length > 0 && !isNaN(newCorrect)) {
                questions.push({ question: newQuestion, choices: newChoices, correct: newCorrect });
                loadQuestions();
                alert("Question added successfully!");
            } else {
                alert("Invalid input!");
            }
        }

        function deleteQuestion(index) {
            questions.splice(index, 1);
            loadQuestions();
        }
    </script>
</body>
</html>
