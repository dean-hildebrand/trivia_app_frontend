document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
fetchQuestions()
getNextButton().addEventListener('click', nextQuestion)
})


function fetchQuestions() {
  fetch('https://opentdb.com/api.php?amount=1&type=boolean')
  .then(res => res.json())
  .then(questionArray => {
    // debugger
    questionArray.results.forEach(
     questionData => renderQuestion(questionData)
   )}
  )
}

function getQuestionDiv(){
  return document.querySelector('.question-div')
}

function renderQuestion(questionData) {
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

}
