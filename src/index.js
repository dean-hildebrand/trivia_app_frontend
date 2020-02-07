document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
fetchQuestions()
})


function fetchQuestions() {
  fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean')
  .then(res => res.json())
  .then(questionArray => {
    questionArray.results.forEach(
     questionData => renderQuestions(questionData)
   )}
  )
}

function getQuestionDiv(){
  return document.querySelector('.question-div')
}

function renderQuestions(questionData) {
  let container = document.getElementById('question-view')
  let questionP = document.createElement('p')
  questionP.innerText = questionData.question

  container.appendChild(getQuestionDiv)

 getQuestionDiv.appendChild(questionP)
}

function getFalseButton(){
  return document.getElementById('false')
}

function getTrueButton() {
  return document.getElementById('true')
}
  
