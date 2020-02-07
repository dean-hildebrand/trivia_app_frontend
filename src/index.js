document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
fetchQuestions()
})


function fetchQuestions() {
  fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean')
  .then(res => res.json())
  .then(questionArray => {
    questionArray.results.forEach(
     question => renderQuestions(question)
   )}
  )
}

function renderQuestions(question) {
  console.log(question)
}
