// Selecting the necessary elements from the HTML
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");

// Event listeners for the start button, exit button, and continue button
startBtn.addEventListener("click", () => {
    alert("Quiz is going to start!");
    infoBox.classList.add("activeInfo");
});
exitBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
});

continueBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
});

// Variables to keep track of the question count, question number, and user score
let queCount = 0;
let queNum = 1;
let userScore = 0;

// Event listeners for the restart button and quit button in the result box
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.addEventListener("click", () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    queCount = 0;
    queNum = 1;
    userScore = 0;
    showQuestions(queCount);
    queCounter(queNum);
});

quitQuiz.addEventListener("click", () => {
    window.location.reload();
});

// Event listener for the next button
const nextBtn = document.querySelector("footer .next_btn");
const bottomQuesCounter = document.querySelector("footer .total_que");

nextBtn.addEventListener("click", () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNum++;
        showQuestions(queCount);
        queCounter(queNum);
        nextBtn.classList.remove("show");
    } else {
        showResult();
    }
});

// Function to display the questions and options
function showQuestions(index) {
    const queText = document.querySelector(".que_text");
    let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let optionTag = "";
    for (let i = 0; i < questions[index].options.length; i++) {
        optionTag += `<div class="option"><span>${questions[index].options[i]}</span></div>`;
    }
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const options = optionList.querySelectorAll(".option");
    options.forEach((option) => {
        option.addEventListener("click", () => {
            optionSelected(option);
        });
    });
}

// Function to handle the user's selected option
function optionSelected(answer) {
    const userAns = answer.textContent;
    const correctAns = questions[queCount].answer;
    const allOptions = optionList.children.length;
    if (userAns === correctAns) {
        userScore++;
        answer.classList.add("correct");
        answer.innerHTML += '<div class="icon tick"><i class="fas fa-check"></i></div>';
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.innerHTML += '<div class="icon cross"><i class="fas fa-times"></i></div>';
        console.log("Wrong Answer");
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAns) {
                optionList.children[i].classList.add("correct");
                optionList.children[i].innerHTML += '<div class="icon tick"><i class="fas fa-check"></i></div>';
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

// Function to display the result
function showResult() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score_text");
    let scoreTag = "";
    if (userScore > 3) {
        scoreTag = `<span>and congrats! , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    } else if (userScore > 1) {
        scoreTag = `<span>and nice , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    } else {
        scoreTag = `<span>and sorry , You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    }
    scoreText.innerHTML = scoreTag;
}

// Function to update the question counter
function queCounter(index) {
    let totalQueCountTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
    bottomQuesCounter.innerHTML = totalQueCountTag;
}
// Function to display an alert
function showAlert(message) {
    alert(message);
}
// Add poppers animation
const poppers = resultBox.querySelectorAll(".icon");
poppers.forEach((popper, index) => {
    setTimeout(() => {
        popper.classList.add("pop");
    }, index * 100);
});
