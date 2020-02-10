document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
fetchQuestion()
answerButton().addEventListener('click', checkValue)
})

// global variable to access question object
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

// renders a single question
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
}

function streakCounter() {
return document.getElementById('streak')
}

// checks to see if the user selected the correct answer
function checkValue(e) {
  // debugger
  let rightAnswer = questionObject.correct_answer
  // console.log(rightAnswer)
  if (rightAnswer == e.target.value){
    // change to alert once we are finished testing
  console.log("You're Right")
  addToStreak()
} else {
  console.log('Sorry, thats incorrect')
  strikeChecker()
  resetStreak()
  }

  let questionP = document.getElementById('question-text')
  questionP.innerHTML = ""
  fetchQuestion()
}


// if the user selects the correct answer, increment the "streak" by 1
  function addToStreak() {
    let newStreak = parseInt(streakCounter().innerText) + 1
    streakCounter().innerText = newStreak
  }

  // resets the streak count if user selects the wrong answer
  function resetStreak(e) {
    
    console.log(`You got ${streakCounter().innerText} answers right in a row`)
    streakCounter().innerText = 0
  }

  function strikeChecker() {
    let strikeCounter = document.getElementById('strike-counter')
    let newStrikeCount = parseInt(strikeCounter.innerText) + 1
    strikeCounter.innerText = newStrikeCount
    if (newStrikeCount === 3){
      strikeCounter.innerHTML = 0
    gameOver()
  }}

  function gameOver() {
    alert('Thats Strike 3! Game Over!')
    questionObject.innerHTML = ""
    resetStreak()
  }
    
    


