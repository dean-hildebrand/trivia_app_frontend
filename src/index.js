document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
  noButton().addEventListener('click', handleNoButton)
  yesButton().addEventListener('click', handleYesButton)
 })


// global variable to access question object
let questionObject


function questionView() {
  return document.getElementById("question-view")
}

function getCurrentScore() {
  return document.getElementById('current-score')
}

function getImmortalTag() {
  return document.getElementById('immortal-tag')
}

function getScoreForm() {
  return document.getElementById('score-form')
}

function toggleJumbotron() {
  return document.getElementById("jumbotron")
}

function newGameHandler() {
  return document.getElementById("start-game")
}

function getQuestionDiv(){
  return document.querySelector('.question-div')
}

function getTotalScore() {
  return document.getElementById('total-score')
}


function questionDiv() {
  return document.getElementById('button-div')
}

function streakCounter() {
  return document.getElementById('streak')
}

function getCurrentScore() {
  return document.getElementById('score')
}

function getSubmitScoreButton() {
  return document.getElementById('submit-score-button')
}

function yesButton() {
  return document.getElementById('yes')
}

function noButton() {
  return document.getElementById('no')
}



function startGame() {
  questionView().style.display = 'block'
  toggleJumbotron().style.display = "none"
  fetchQuestion()
}

function fetchQuestion() {
  // console.log('fetching a question')
  fetch('https://opentdb.com/api.php?amount=1&type=boolean')
  .then(res => res.json())
  .then(questionArray => {
    // debugger
    questionArray.results.forEach(
     questionData => renderQuestion(questionData)
    )})
}


// renders a single question
function renderQuestion(questionData) {
  // console.log('in the renderQuestion function')
  // debugger
  questionObject = questionData
  let container = document.getElementById('question-view')
  let questionP = document.getElementById('question-text')
  questionP.innerText = questionData.question
  container.appendChild(questionP)
  questionDiv().addEventListener('click', checkValue)
}

// checks to see if the user selected the correct answer
function checkValue(e) {
  let rightAnswer = questionObject.correct_answer
  // console.log(rightAnswer)
  if (rightAnswer == e.target.value){
    // change to alert once we are finished testing
  console.log("You're Right")
  addToStreak()
  addToScore()
} else {
  console.log('Sorry, thats incorrect')
  strikeChecker()
  resetStreak()
  }
  fetchQuestion()
    }


    // if the user selects the correct answer, increment the "streak" by 1
    function addToStreak() {
      let newStreak = parseInt(streakCounter().innerText) + 1
      streakCounter().innerText = newStreak
    }

    // resets the streak count if user selects the wrong answer
    function resetStreak() {
      console.log(`You got ${streakCounter().innerText} answers right in a row`)
      streakCounter().innerText = 0
    }

    function strikeChecker() {
      let strikeCounter = document.getElementById('strike-counter')
      let newStrikeCount = parseInt(strikeCounter.innerText) + 1
      strikeCounter.innerText = newStrikeCount
      if (newStrikeCount === 3){
        strikeCounter.innerText = 0
        renderScoreForm()
        gameOver()
      }}

      function renderScoreForm() {
        let title = document.createElement('h2')
        title.innerText = "Add your score"
        let name = document.createElement('input')
        name.placeholder = "add your name"
        name.name = "name"
        let score = document.createElement('h3')
        score.innerText = getCurrentScore().innerText
        score.id = 'total-score'
        let submit = document.createElement('button')
        submit.innerText = "Submit Score"
        submit.id = "submit-score-button"
        getScoreForm().append(title, name, score, submit)
        submit.addEventListener('click', submitForm)
      }

      function gameOver() {
        alert('Thats Strike 3! Game Over!')
        questionObject.innerHTML = ""
        questionView().style.display = 'none'
        toggleJumbotron().style.display = "block"
        resetStreak()
        resetScore()
      }


function addToScore() {
let newScore = parseInt(getCurrentScore().innerText) + 1
getCurrentScore().innerText = newScore
}

function resetScore() {
  // captureScore()
  console.log("score reset")
  getCurrentScore().innerText = 0
}


function submitForm(e) {
  e.preventDefault()
    console.log('in submitForm function')

    let name = e.target.parentElement.querySelector('input').value
    let score = getTotalScore().innerHTML

    fetch("http://localhost:3000/game_sessions", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({name: name, score: score })
    }).then(res => res.json())
      .then(data => console.log(data))
      e.target.parentElement.querySelector('input').value = ""
      getTotalScore().innerHTML = 0
      while (getScoreForm().firstChild) {
      getScoreForm().removeChild(getScoreForm().firstChild)
    }
      playAgain()
  }



  function tryAgain() {
    return document.getElementById('play-again')
    }

    function playAgain() {
      tryAgain().style.display = 'block'
    }

    function handleYesButton(e){
      e.preventDefault()
      debugger
      startGame()
    }

    function handleNoButton(e){
    e.preventDefault()
    location.reload()
    }
