let question = document.querySelector("#question");
let myForm = document.querySelector("#answerForm");

let questionFor100 = [];
let questionFor200 = [];
let questionFor300 = [];
let questionFor400 = [];
let questionFor500 = [];

let scoreCount = 0; // prize Money
let answer = "";
let value = 0;
let myQuestions = [];
let length = 0;
let buttonCount = 0;
let playCardCount = 0;

////get all my info and push data to appropriate groups based on $$$ VALUE////
async function readJeopardyData() {
  let rawJeopardyData = await fetch("jeopardy.json");
  let data = await rawJeopardyData.json();
  // _groupBy(array, what to group our data by);
  let groupedData = _.groupBy(data, "value");
  questionFor100.push(groupedData.$100);
  questionFor200.push(groupedData.$200);
  questionFor300.push(groupedData.$300);
  questionFor400.push(groupedData.$400);
  questionFor500.push(groupedData.$500);
}
readJeopardyData();

////create question and answer + decoy////
/// button is passed by a obj reference using the this key word
///
function gridClicked(button, val) {
  buttonCount++;

  button.disabled = true;
  button.style.color = "red";

  let max = 0;
  value = val;

  if (val === 100) {
    myQuestions = questionFor100;
    max = 2008;
  } else if (val === 200) {
    myQuestions = questionFor200;
    max = 6889;
  } else if (val === 300) {
    myQuestions = questionFor300;
    max = 1946;
  } else if (val === 400) {
    myQuestions = questionFor400;
    max = 9609;
  } else if (val === 500) {
    myQuestions = questionFor500;
    max = 1995;
  }

  let randomIndex = Math.floor(Math.random() * (max - 1 + 1) + 1);

  //// get a question and answer & set var answer to a////
  for (const item of myQuestions) {
    let selectedItem = item[randomIndex];
    let q = selectedItem.question;
    let a = selectedItem.answer;
    answer = a;

    for (const item of myQuestions) {
      let randomIndex = Math.floor(Math.random() * (max - 1 + 1) + 1);
      let selectedItem = item[randomIndex];
      let d1 = selectedItem.answer;
      questionRender(q, a, d1);
    }
  }
}

let form = document.querySelector("#answerForm");
let formQuestion = document.querySelector("#question");

let input1 = document.querySelector("#input1");
let label1 = document.querySelector("#label1");

let input2 = document.querySelector("#input2");
let label2 = document.querySelector("#label2");

////build form UI///
function questionRender(q, a, d1) {
  formQuestion.innerText = q;

  let cheat = document.querySelector("#cheatCode");
  cheat.innerText = a;

  let quest = [];
  quest.push(a, d1);

  let random1 = Math.floor(Math.random() * quest.length);
  let random2 = Math.floor(Math.random() * quest.length);

  if (random1 === random2 || random2 === random1) {
    questionRender(q, a, d1);
  } else {
    input1.value = quest[random1];
    label1.innerText = quest[random1];

    input2.value = quest[random2];
    label2.innerText = quest[random2];
  }
}

////check my answers /////
myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let cheat = document.querySelector("#cheatCode");
  cheat.innerText = "";

  if (input1.checked) {
    if (input1.value === answer) {
      alert(`you got it right you earn $${value}`);
      scoreCount = scoreCount + value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
      gameOver(buttonCount);
    } else if (input1.value !== answer) {
      alert(`wrong answer penalty of $${value}`);
      scoreCount = scoreCount - value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
      gameOver(buttonCount);
    }
  } else if (input2.checked) {
    if (input2.value === answer) {
      alert(`you got it right you earn $${value}`);
      scoreCount = scoreCount + value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
      gameOver(buttonCount);
    } else if (input2.value !== answer) {
      alert(`wrong answer penalty of $${value}`);
      scoreCount = scoreCount - value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
      gameOver(buttonCount);
    }
  }

  ////zero out////
  formQuestion.innerText = "";

  input1.value = "";
  label1.innerText = "";

  input2.value = "";
  label2.innerText = "";

  answer = "";
  value = 0;
  myQuestions = [];
  length = 0;
  input1.checked = true;
  gameOver(buttonCount);
});

/// this function ends game when the last submit is entered and buttonsCount is @ 25///
/// the submit but will be converted and a new event is added that when clicked will reset the window obj and refresh page;
function gameOver(buttonCount) {
  let buttonsClicked = buttonCount;

  if (buttonsClicked === 25) {
    let yourScoreMessage = document.querySelector("#yourScore");
    yourScoreMessage.innerText = "";

    let finalMessage = document.querySelector("#gameOver");
    finalMessage.innerText = `Game Over Your final score is ${scoreCount}`;

    input1.value = "12345";
    label1.innerText = "Thanks for playing";

    input2.value = "12345";
    label2.innerText = "Play again";

   let submitBut = document.querySelector("#submitBut");
   submitBut.type = "button"
   submitBut.value = "reset"
   submitBut.addEventListener("click", function(){
    window.location.reload()
   })

  }
}


 

