document.addEventListener("DOMContentLoaded", ()=> {
  console.log('connected')
  getAllScores()
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

function getHighScoresDiv(){
  return document.getElementById("high-scores")
}

function startGame() {
  questionView().style.display = 'block'
  toggleJumbotron().style.display = "none"
  fetchQuestion()
}

function newGameHandler() {
  return document.getElementById("start-game")
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

function getQuestionDiv(){
  return document.querySelector('.question-div')
}

function getTotalScore() {
  return document.getElementById('total-score')
}

// renders a single question
function renderQuestion(questionData) {
  // console.log('in the renderQuestion function')
  questionObject = questionData
  let container = document.getElementById('question-view')
  let questionP = document.getElementById('question-text')
  questionP.innerText = questionData.question
  container.appendChild(questionP)
  questionDiv().addEventListener('click', checkValue)
}


function questionDiv() {
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
  // debugger
  addToStreak()
  addToScore()


} else {
  console.log('Sorry, thats incorrect')
  strikeChecker()
  resetStreak()
  }
  fetchQuestion()
    }



function getCurrentScore() {
  return document.getElementById('score')
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
//
// function captureScore() {
//
// }


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
      strikeCounter.innerHTML = 0
      renderScoreForm()
      gameOver()
  }}

  function gameOver() {
    // debugger
    alert('Thats Strike 3! Game Over!')
    questionObject.innerHTML = ""
    questionView().style.display = 'none'
    toggleJumbotron().style.display = "block"
    resetStreak()
    resetScore()
    getScoreForm().style.display = "block"
  }

  function renderScoreForm() {
    
    let title = document.createElement('h2')
    title.innerText = "Add your score"
    let name = document.createElement('input')
    name.placeholder = "add your name"
    name.name = "name"
    let score = document.createElement('h3')
    score.innerText = getCurrentScore().innerHTML
    score.id = 'total-score'
    let submit = document.createElement('button')
    submit.innerText = "Submit Score"
    submit.id = "submit-score-button"
    getScoreForm().append(title, name, score, submit)

    submit.addEventListener('click', submitForm)
    
  }

function getSubmitScoreButton() {
  return document.getElementById('submit-score-button')

}

function submitForm(e) {
  
    console.log('in submitForm function')
    // debugger
    
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
    getScoreForm().style.display = "none"
    playAgain()
    

  }

  function playAgain() {
    if(window.confirm("Would you like to play again?")) {
      startGame()
    } else {
      window.reset()
    }
  }

  function getAllScores() {
    fetch('http://localhost:3000/game_sessions')
    .then(resp => resp.json())
    .then(sessionArray => sessionArray.forEach(session => 
      sessionScores(session)))
  }

  function sessionScores(session) {
    console.log(session)
    let sessionContainer = document.getElementById('score-list')
    let sessionName = document.createElement('li')
    sessionName.class = 'session-name'
    sessionName.innerText = session.name + " - " + session.score + " points!"
    let sessionScore = document.createElement('span')
    sessionScore.class = 'session-score'
    sessionScore.innerText = session.score
    // let mergedSession = {name: sessionName, score: sessionScore
    sessionContainer.appendChild(sessionName)
  }





  

  
