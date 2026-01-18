const quizData = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "all of the above"],
    correctAns: 3,
  },
  {
    question: "What is the correct way to write a comment in JavaScript?",
    options: [
      "<!-- comment -->",
      "// comment",
      "/* comment */",
      "Both B and C",
    ],
    correctAns: 3,
  },
  {
    question: "What does console.log() do?",
    options: [
      "Shows output in the browser",
      "Prints a message to the cons",
      "Logs errors only",
      "None",
    ],
    correctAns: 1,
  },
  {
    question: "Which symbol is used for strict equality?",
    options: ["=", "==", "===", "!="],
    correctAns: 2,
  },
  {
    question: "What will console.log(typeof 'Hello'); output?",
    options: ["string", "text", "char", "word"],
    correctAns: 0,
  },
];

const timerElem = document.querySelector("#timer");
const questionElem = document.querySelector("#question");
const optionElem = document.querySelector("#options");
const nextbtnElem = document.querySelector("#next-btn");
const resultElem = document.querySelector("#result");

// randomizing the questions order
const question = [...quizData].sort(() => Math.random() - 0.5);

// now I have to create a function that runs after the html loads
let currentElement = 0;
let score = 0;
let timer;
let timeLeft;
function quizLoad() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countDown, 1000);
  const q = question[currentElement];
  questionElem.textContent = `Q${currentElement + 1}. ${q.question}`;
  optionElem.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("optionsbtn");

    btn.addEventListener("click", () => selectAnswer(index, true));

    btn.textContent = option;
    optionElem.appendChild(btn);
  });

  nextbtnElem.style.display = "none";
}

function countDown() {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    selectAnswer(question[currentElement]?.correctAns, false);
  }
}

function updateTimer() {
  timerElem.textContent = `⏱️${timeLeft}`;
}

//function to select answers
function selectAnswer(index, shouldScore) {
  clearInterval(timer);
  const q = question[currentElement];
  const allOptionBtns = document.querySelectorAll(".optionsbtn");
  allOptionBtns.forEach((btn) => (btn.disabled = true));

  if (index === q.correctAns) {
    shouldScore && score++;
    allOptionBtns[index].classList.add("correct");
  } else {
    allOptionBtns[index].classList.add("wrong");
    allOptionBtns[q.correctAns].classList.add("correct");
  }
  nextbtnElem.style.display = "Inline-block";
}

// logic to jump from one question to next question

nextbtnElem.addEventListener("click", () => {
  currentElement++;
  if (currentElement < question.length) {
    quizLoad();
  } else {
    nextbtnElem.style.display = "none";
    showResult();
  }
});

function showResult() {
  let highscore = localStorage.getItem("QuizHighScore");

  let isNew = score > highscore;
  if (isNew) {
    localStorage.setItem("QuizHighScore", score);
  }
  resultElem.innerHTML = `
  <h2>congra! you have finished your quiz</h2>
  <p>you have got ${score} out of  ${question.length}</p>
  <P>highest score is : ${Math.max(score, highscore)}</P>
  <button onclick="location.reload()">Restart Quiz</button>
  `;
}

quizLoad();
