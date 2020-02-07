document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
fetchQuestions()
getFalseButton().addEventListener('click', checkValue)
getTrueButton().addEventListener('click', checkValue)
getNextButton().addEventListener('click', nextQuestion)
})

let questionObject

function fetchQuestions() {
  fetch('https://opentdb.com/api.php?amount=1&type=boolean')
  .then(res => res.json())
  .then(questionArray => {
    // debugger
    questionArray.results.forEach(
     questionData => renderQuestion(questionData)

    )})
  
}

function getQuestionDiv(){
  return document.querySelector('.question-div')
}

function renderQuestion(questionData) {
  questionObject = questionData
  let btnDiv = document.getElementById('button-div')
  let container = document.getElementById('question-view')
  let questionP = document.getElementById('question-text')
  questionP.innerText = questionData.question
  container.appendChild(questionP)
  
}



function getFalseButton(){
  return document.getElementById('false')
}

function getTrueButton() {
  return document.getElementById('true')
}

function getNextButton() {
  return document.getElementById('next')
}

function nextQuestion() {
  let questionP = document.getElementById('question-text')
  questionP.innerHTML = ""
  fetchQuestions()
  checkValue()
}

function checkValue() {
  let rightAnswer = questionObject.correct_answer
  console.log(rightAnswer)
  //take in result of true/false button selection
  if (getFalseButton().value !== rightAnswer)  {
  console.log('incorrect')
  } else if 
  (getTrueButton().value === rightAnswer) {
  console.log("correct")
} else {
  return "incorrect"
}
}//compare result to correct answer

  //if result and answer is true, answer is correct



