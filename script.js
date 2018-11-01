// document.getElementById("overlay").style.display = "block";

const cards = document.querySelectorAll(".card");

let hasFlipped = false;
let boardLock = false;
let card1, card2;
let score = 0;
let correct = 0;
let seconds = 0;

var timer;

// Add CSS class for transition effect for each clicked card; checks match after second card is flipped
function seeCard() {
  if (boardLock) return;
  if (this === card1) return;
  this.classList.toggle("flipped");

  if (!hasFlipped) {
    hasFlipped = true;
    card1 = this;
    return;
  }
  card2 = this;

  isMatch();
}

// What game does if second flipped card is a match
function isMatch() {
  if (card1.dataset.icon === card2.dataset.icon) {
    removeCardFlip();
    score++;
    correct++;
    document.getElementById("score").textContent = score + " Moves";
    starCheckInformation();
    isDone();
  } else {
    flipOverCards();
    score++;
    document.getElementById("score").textContent = score + " Moves";
    starCheckInformation();
  }
}

// If cards match, remove click feature
function removeCardFlip() {
  card1.removeEventListener("click", seeCard);
  card2.removeEventListener("click", seeCard);

  reset();
}

// If cards do not match, flip both cards back over after a set amount of time
function flipOverCards() {
  boardLock = true;
  setTimeout(() => {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");

    reset();
  }, 800);
}

// Reset variables for game logic
function reset() {
  hasFlipped = false;
  boardLock = false;
  card1 = null;
  card2 = null;
}

function time() {
  seconds++;
  // document.getElementById("timer").textContent = seconds;
  document.getElementsByClassName("timer")[0].textContent =
    seconds + " Seconds";
  document.getElementsByClassName("timer")[1].textContent =
    score + 1 + " moves in " + seconds + " seconds";
}

// Check win condition
function isDone() {
  if (correct === 8) {
    gameOver();
    clearInterval(timer);
  }
}

// Show overlay upon game completion
function gameOver() {
  document.getElementById("overlay").style.display = "block";
  starCheckOverlay();
}

// Check how many stars earned and display
function starCheckOverlay() {
  if (score > 30) {
    document.getElementById("star1o").classList.add("fas");
    document.getElementById("star2o").classList.add("far");
    document.getElementById("star3o").classList.add("far");
  } else if (score > 18 && score < 30) {
    document.getElementById("star1o").classList.add("fas");
    document.getElementById("star2o").classList.add("fas");
    document.getElementById("star3o").classList.add("far");
  } else {
    document.getElementById("star1o").classList.add("fas");
    document.getElementById("star2o").classList.add("fas");
    document.getElementById("star3o").classList.add("fas");
  }
}

// Live star updates on board
function starCheckInformation() {
  if (score > 30) {
    document.getElementById("star2i").classList.remove("fas");
    document.getElementById("star2i").classList.add("far");

    document.getElementById("star3i").classList.remove("fas");
    document.getElementById("star3i").classList.add("far");
  } else if (score > 18 && score < 30) {
    document.getElementById("star3i").classList.remove("fas");
    document.getElementById("star3i").classList.add("far");
  } else {
    return;
  }
}

// Restart game on Overlay click or Reset icon
function restartGame() {
  document.getElementById("overlay").style.display = "none";
  location.reload();
}

// Shuffles cards at the start of every game
(function randomize() {
  cards.forEach(card => {
    let randomPlace = Math.floor(Math.random() * 16);
    card.style.order = randomPlace;
  });
})();

// Timer starts when user clicks board
function firstClick() {
  timer = setInterval(time, 1000);
  document.removeEventListener("click", firstClick);
}

cards.forEach(card => card.addEventListener("click", seeCard));
document.getElementById("reset").addEventListener("click", restartGame);
document.addEventListener("click", firstClick);
