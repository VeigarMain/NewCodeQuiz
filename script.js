var questions = [
    {
        question: "What Yordle is the Tiny Master of Evil?",
        choices: ["Lulu", "Veigar", "Teemo", "Ziggs"],
        answer: "Veigar"
    },
    {
        question: "What type of champion is Veigar?",
        choices: [" Control Mage", "Assassin", "Support", "Caster"],
        answer: " Control Mage"
    },
    {
        question: "How much Ability Power does Veigar gain when he Q's a cannon minion?",
        choices: ["0", "2", "3", "1"],
        answer: "2"
    },
    {
        question: "What other league of legends champion stacks minions in order to gain more damage?",
        choices: ["Nasus", "Katarina", "Ashe", "Kassadin"],
        answer: "Nasus"
    },
    {
        question: "The most powerful virtual character to ever be created is?(This is a gimmie)",
        choices: ["Tyler1", "Poggers", "Ahri", "Veigar"],
        answer: "Veigar"
    },

];
var curQuestion = -1;
var score = 0;
var timeRemaining = 0;
var timer;
function start() {
    //console.log("hello!")
    timeRemaining = 300;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;
    timer = setInterval(function() {
        timeRemaining--;
        document.getElementById("timeRemaining").innerHTML = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    next();
}
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game Over!</h2>
    <h3>"You got "" amount of questions right!"</h3>
    <input type="text" id="name" placeholder="First name">
    <button onclick="setScore()">Set score!</button>`;
    document.getElementById("quizBody").innerHTML =quizContent;
}
//Store scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}
function  getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'ss? highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>
    <button onclick="cleaerScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;      
}
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");
    resetGame();
    
}
function resetGame() {
    clearInterval(timer);
    score = 0;
    curQuestion = -1;
    timeRemaining = 0;
    timer = null;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;
    var quizContent = `
    <h1>
    League Of Legends Code Quiz!
    </h1>
    <h3>
    Click to Play!
    </h3>
    <button onclick="start()">Start!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;           
}
function incorrect() {
  timeRemaining -= 15;
    next();
}
function correct() {
    score += 10;
    next();
    
}
function next() {
    curQuestion++;
    if (curQuestion > questions.length - 1) {
        endGame();
        return;
    }
    var quizContent = "<h2>" + questions[curQuestion].question + "</h2>"
    for (var buttonLoop = 0; buttonLoop < questions[curQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[curQuestion].choices[buttonLoop]);
        if (questions[curQuestion].choices[buttonLoop] == questions[curQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        }
        else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quizBody").innerHTML = quizContent;  
}

//   COuldnt get this code to work, so started fresh...
// timer.addEventListener("click", function () {
//     // checking for 0, will alert times up!
//     if (holdInterval === 0) {
//         holdInterval = setInterval(function () {
//             secondsLeft--;
//             currentTime.textContent = "Time: " + secondsLeft;

//             if (secondsLeft <= 0) {
//                 clearInterval(holdInterval);
//                 allDone();
//                 currentTime.textContent = "Time's up!";
//             }
//         }, 1000);
//     }
//     render(questionIndex);
// });


// function render(questionIndex) {
//     // Clears existing data 
//     questionsDiv.innerHTML = "";
//     ulCreate.innerHTML = "";
    
//     for (var i = 0; i < questions.length; i++) {
//         // appends a title
//         var userQuestion = questions[questionIndex].title;
//         var userChoices = questions[questionIndex].choices;
//         questionsDiv.textContent = userQuestion;
//     }
    
//     userChoices.forEach(function (newItem) {
//         var listItem = document.createElement("li");
//         listItem.textContent = newItem;
//         questionsDiv.appendChild(ulCreate);
//         ulCreate.appendChild(listItem);
//         listItem.addEventListener("click", (compare));
//     })
// }