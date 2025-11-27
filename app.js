var users = [];

function signup() {
    var username = document.getElementById("signupUsername").value.trim();
    var password = document.getElementById("signupPassword").value.trim();

    if (username === "" || password === "") {
        swal("Oops!", "Please enter both username and password.", "error");
        return;
    }

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            swal("Oops!", "Username already exists!", "error");
            return;
        }
    }

    users.push({ username: username, password: password });
    swal({
        title: "Account Created!",
        text: "Sign up successful!",
        icon: "success",
        button: {
            text: "Okay",
            className: "signUpBtn"
        }
    });

    document.getElementById("signupPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

function goToLogin() {
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

function login() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            found = true;
            break;
        }
    }

    if (found) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("quizPage").style.display = "block";
        loadQuestion();
    } else {
        swal("Error!", "Invalid credentials!", "error");
    }
}

function logout() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}

var quizQues = {
    questions: [
        { question: "Which language is used for web apps?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript" },
        { question: "What does HTML stand for?", options: ["Hyper Trainer Markup Language", "Hyper Text Markup Language", "High Text Markup Language", "None"], answer: "Hyper Text Markup Language" },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets", "None"], answer: "Cascading Style Sheets" },
        { question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<head>", "<header>"], answer: "<h1>" },
        { question: "Which tag is used to insert a line break in HTML?", options: ["<br>", "<lb>", "<break>", "<hr>"], answer: "<br>" },
        { question: "How do you create an unordered list in HTML?", options: ["<ul>", "<ol>", "<list>", "<li>"], answer: "<ul>" },
        { question: "Which attribute is used to add inline CSS styles?", options: ["class", "style", "css", "id"], answer: "style" },
        { question: "Which CSS property is used to change text color?", options: ["color", "text-color", "font-color", "background-color"], answer: "color" },
        { question: "Which CSS property changes element background color?", options: ["background-color", "color", "bgcolor", "background"], answer: "background-color" },
        { question: "How do you refer an external stylesheet in HTML?", options: ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<css src="style.css">', '<script href="style.css">'], answer: '<link rel="stylesheet" href="style.css">' },
        { question: "Which HTML element is used to define the body of a document?", options: ["<body>", "<html>", "<head>", "<page>"], answer: "<body>" },
        { question: "Which CSS selector targets all elements with class 'container'?", options: [".container", "#container", "container", "*container"], answer: ".container" },
        { question: "How do you make text bold in HTML using a semantic tag?", options: ["<b>", "<strong>", "<bold>", "<em>"], answer: "<strong>" },
        { question: "Which tag inserts a horizontal line in HTML?", options: ["<hr>", "<line>", "<br>", "<hl>"], answer: "<hr>" },
        { question: "Which HTML tag is used to insert an image?", options: ["<img>", "<image>", "<src>", "<picture>"], answer: "<img>" },
        { question: "In CSS, which property sets the space between the content and the border?", options: ["margin", "padding", "border-spacing", "spacing"], answer: "padding" },
        { question: "Which property changes spacing outside an element?", options: ["padding", "margin", "spacing", "border"], answer: "margin" },
        { question: "Which HTML tag defines an ordered (numbered) list?", options: ["<ol>", "<ul>", "<list>", "<dl>"], answer: "<ol>" },
        { question: "Which tag is used to make text italic in HTML?", options: ["<i>", "<italic>", "<em>", "<italics>"], answer: "<em>" },
        { question: "How do you comment in CSS?", options: ["/* comment */", "// comment", "<!-- comment -->", "# comment"], answer: "/* comment */" }
    ]
};

var currentQuestion = 0;
var userAnswers = [];

function loadQuestion() {
    var q = quizQues.questions[currentQuestion];
    document.getElementById("questionText").innerText = q.question;

    var optionsDiv = document.getElementById("optionsContainer");
    optionsDiv.innerHTML = "";

    for (var i = 0; i < q.options.length; i++) {
        var btn = document.createElement("button");
        btn.className = "btn mb-2 option-btn";
        btn.innerText = q.options[i];
        btn.setAttribute("onclick", "selectOption('" + q.options[i] + "')");
        optionsDiv.appendChild(btn);
    }

    document.getElementById("prevBtn").disabled = (currentQuestion === 0);
    document.getElementById("nextBtn").disabled = !userAnswers[currentQuestion];
    document.getElementById("nextBtn").innerText = (currentQuestion === quizQues.questions.length - 1) ? "Finish" : "Next";
}

function selectOption(option) {
    userAnswers[currentQuestion] = option;
    document.getElementById("nextBtn").disabled = false;
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (!userAnswers[currentQuestion]) return;

    if (currentQuestion < quizQues.questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        var score = 0;
        for (var i = 0; i < quizQues.questions.length; i++) {
            if (userAnswers[i] === quizQues.questions[i].answer) score++;
        }
        swal({
            title: "Quiz Finished!",
            text: "Your score: " + score + "/" + quizQues.questions.length,
            icon: "success",
            button: {
                text: "Okay",
                className: "signUpBtn"
            }
        });
        document.getElementById("quizPage").style.display = "none";
        document.getElementById("loginPage").style.display = "block";
    }
}
