var questions = [
    {
        question: "Which event is used when a user clicks a button?",
        options: ["onpress", "onclick", "onhover", "onchange"],
        answer: "onclick"
    },
    {
        question: "What does this.style refer to?",
        options: ["External CSS file", "The clicked element", "Parent element", "HTML document"],
        answer: "The clicked element"
    },
    {
        question: "Which property is used to change CSS using JavaScript?",
        options: ["css", "design", "style", "class"],
        answer: "style"
    },
    {
        question: "How to change the text of an HTML element?",
        options: ["innerHTML", "HTMLtext", "getHTML", "printText"],
        answer: "innerHTML"
    },
    {
        question: "Which method selects an element by ID?",
        options: ["getElementById()", "getId()", "queryID()", "findId()"],
        answer: "getElementById()"
    },
    {
        question: "How to get the first child of an element?",
        options: ["element.firstChild", "element.child[0]", "element.children", "element.startChild"],
        answer: "element.firstChild"
    },
    {
        question: "Which event is used when a value changes in an input field?",
        options: ["onclick", "onhover", "onchange", "onsubmit"],
        answer: "onchange"
    },
    {
        question: "Which function swaps images?",
        options: ["imageChange()", "swapImage()", "this.src = other.src", "exchangeImage()"],
        answer: "this.src = other.src"
    },
    {
        question: "How to declare a variable in JavaScript?",
        options: ["var", "variable", "let var", "make"],
        answer: "var"
    },
    {
        question: "Which operator checks both value and type?",
        options: ["==", "===", "!=", "="],
        answer: "==="
    },
    {
        question: "Which loop runs a block of code again and again?",
        options: ["if statement", "function", "for loop", "event"],
        answer: "for loop"
    },
    {
        question: "How to write a function in JavaScript?",
        options: ["function myFunc()", "make function()", "create myFunc()", "method myFunc()"],
        answer: "function myFunc()"
    },
    {
        question: "Which array method adds an item at the end?",
        options: ["push()", "pop()", "shift()", "addLast()"],
        answer: "push()"
    },
    {
        question: "Which method adds a new element at the beginning of an array?",
        options: ["push()", "prepend()", "unshift()", "startAdd()"],
        answer: "unshift()"
    }
];
var index = 0;
var score = 0;

function showQuestion() {
    document.getElementById("question").innerText = questions[index].question;

    var optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    for (var i = 0; i < questions[index].options.length; i++) {
        optionsDiv.innerHTML += `<button onclick="checkAnswer(this, '${questions[index].options[i]}')">${questions[index].options[i]}</button>`;
    }
     document.querySelector('.prevbtn').disabled = index === 0;
    document.querySelector('.nextbtn').disabled = index === questions.length - 1;

}

function checkAnswer(btn, userAns) {
    var correct = questions[index].answer; 

    if (userAns === correct) {
        score++;
        btn.style.backgroundColor = "green";
    } else {
        btn.style.backgroundColor = "red";
    }

    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function prevQuestion() {
    if (index > 0) {
        index--;
        showQuestion();
    }
}

function nextQuestion() {
    index++;

    if (index < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question").innerText = "Quiz Completed!";
    document.getElementById("options").innerHTML = `
        <h3 style="text-align:center; color:#5a189a;">Your Score: ${score} / ${questions.length}</h3>
        <button onclick="restartQuiz()" style="display:block; margin:20px auto; padding:10px 20px; border:none; border-radius:10px; background-color:#5a189a; color:#fff; cursor:pointer;">Restart Quiz</button>
    `;
    document.querySelector('.prevbtn').disabled = true;
    document.querySelector('.nextbtn').disabled = true;
}

function restartQuiz() {
    index = 0;
    score = 0;
    showQuestion();
}

showQuestion();