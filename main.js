let question = document.querySelector("#question");
let myForm = document.querySelector("#answerForm");

let questionFor100 = [];
let questionFor200 = [];
let questionFor300 = [];
let questionFor400 = [];
let questionFor500 = [];

let scoreCount = 0;
let answer = "";
let value = 0;
let myQuestions = [];
let length = 0;

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
function gridClicked(val) {
  value = val;
  if (val === 100) {
    myQuestions = questionFor100;
  } else if (val === 200) {
    myQuestions = questionFor200;
  } else if (val === 300) {
    myQuestions = questionFor300;
  } else if (val === 400) {
    myQuestions = questionFor400;
  } else if (val === 500) {
    myQuestions = questionFor500;
  }

  let randomIndex = Math.floor(Math.random() * (2009 - 1 + 1) + 1);

  //// get a question and answer & set var answer to a////
  for (const item of myQuestions) {
    let selectedItem = item[randomIndex];
    let q = selectedItem.question;
    let a = selectedItem.answer;
    answer = a;

    for (const item of myQuestions) {
      let randomIndex = Math.floor(Math.random() * (2009 - 1 + 1) + 1);
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

let input3 = document.querySelector("#input3");
let label3 = document.querySelector("#label3");

let input4 = document.querySelector("#input4");
let label4 = document.querySelector("#label4");

////build form///
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

  if (input1.checked) {
    if (input1.value === answer) {
      alert(`you got it right you earn $${value}`);
      scoreCount = scoreCount + value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
    } else if (input1.value !== answer) {
      alert(`wrong answer penalty of $${value}`);
      scoreCount = scoreCount - value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
    }
  } else if (input2.checked) {
    if (input2.value === answer) {
      alert(`you got it right you earn $${value}`);
      scoreCount = scoreCount + value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
    } else if (input2.value !== answer) {
      alert(`wrong answer penalty of $${value}`);
      scoreCount = scoreCount - value;
      let score = document.querySelector("#score");
      score.innerText = scoreCount;
    }
  }

  ////zero out////
  formQuestion.innerText = "";
  input1.value = "";
  label1.innerText = "";

  input2.value = "";
  label2.innerText = "";

  input3.value = "";
  label3.innerText = "";

  input4.value = "";
  label4.innerText = "";

  answer = "";
  value = 0;
  myQuestions = [];
  length = 0;
  input1.checked = true;
});
