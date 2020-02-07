document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
fetchQuestion()
answerButton().addEventListener('click', checkValue)
})

let questionObject

function fetchQuestion() {
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


function answerButton() {
  return document.getElementById('button-div')
  let questionP = document.getElementById('question-text')
  questionP.innerHTML = ""
  fetchQuestion()
}

function checkValue(e) {
  // e.target
  let rightAnswer = questionObject.correct_answer
  console.log(rightAnswer)
  if (rightAnswer == e.target.value){
  console.log('correct')
} else {
  console.log('incorrect')
  }
}

  //take in result of true/false button selection

//compare result to correct answer

  //if result and answer is true, answer is correct
