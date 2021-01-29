// Elements
const btnMusic = document.querySelector('.btn--music');
const btnRule = document.querySelector('.btn--rule');
const btnCollect = document.querySelector('.btn--collect');
const btnNew = document.querySelector('.btn--new');
const btnSummon = document.querySelector('.btn--summon');
const btnCredit = document.querySelector('.btn--credit');
const btnCloseCredit = document.getElementById('close--credit');
const btnCloseRule = document.getElementById('close--rule');

const cardEl = document.querySelector('.card');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const img0El = document.getElementById('img--0');
const img1El = document.getElementById('img--1');

const modalCredit = document.querySelector('.credit--pointer');
const modalRule = document.querySelector('.rule--pointer');

// Music autoplay, on/off
let music1 = new Audio('sounds/musicKH.mp3');
music1.play();

//Btn Music
btnMusic.addEventListener('click', function () {
  sfxSelect();
  if (music1.paused) {
    music1.currentTime = 0;
    music1.play();
  } else {
    music1.pause();
  }
});

// Open and Close modal credit
const openModalCredit = function (e) {
  e.preventDefault();
  modalCredit.classList.remove('hidden');
};

const closeModalCredit = function (e) {
  e.preventDefault();
  modalCredit.classList.add('hidden');
};

const openModalRule = function (e) {
  e.preventDefault();
  modalRule.classList.remove('hidden');
};

const closeModalRule = function (e) {
  e.preventDefault();
  modalRule.classList.add('hidden');
};

// Function for calling by events
const sfxSelect = function () {
  let sfx1 = new Audio('sounds/selectKH.mp3');
  sfx1.currentTime = 0.3;
  sfx1.play();
};

const sfxMove = function () {
  let sfx2 = new Audio('sounds/moveKH.mp3');
  sfx2.currentTime = 0.2;
  sfx2.play();
};

const sfxGet = function () {
  let sfx3 = new Audio('sounds/getKH.mp3');
  sfx3.currentTime = 0.4;
  sfx3.play();
};

const sfxCancel = function () {
  let sfx4 = new Audio('sounds/cancelKH.mp3');
  sfx4.currentTime = 0.2;
  sfx4.play();
};

const sfxWin = function () {
  let sfx5 = new Audio('sounds/winKH.mp3');
  sfx5.play();
};

// Starting condition
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
cardEl.src = `./Images/0.png`;

const newGame = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  name0El.textContent = 'PLAYER 1';
  name1El.textContent = 'PLAYER 2';
  current0El.textContent = 0;
  current1El.textContent = 0;
  cardEl.src = `./Images/0.png`;
  cardEl.classList.remove('hidden');
  img0El.classList.remove('img--win');
  img1El.classList.remove('img--win');
  player0El.classList.remove('turn');
  player1El.classList.remove('turn');
  player0El.classList.add('turn');
};
newGame();

// Function condition to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0El.classList.toggle('turn');
  player1El.classList.toggle('turn');
};

// Summon Card function
btnSummon.addEventListener('click', function () {
  if (playing) {
    // Random card pull
    const card = Math.trunc(Math.random() * 10) + 1;

    // Display card based on random
    if (activePlayer === 0) {
      cardEl.src = `./Images/A${card}.png`;
    } else {
      cardEl.src = `./Images/B${card}.png`;
    }

    // Check not rolled 1 or 10
    if (card !== 1 && card !== 10) {
      // Add point card to current score
      currentScore += card;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      sfxSelect();
    } else {
      // switch active player
      switchPlayer();
      sfxCancel();
    }
  }
});

// Collect Button
btnCollect.addEventListener('click', function () {
  if (playing) {
    // add from current score to total score
    score[activePlayer] += currentScore;
    // set the UI
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    sfxGet();

    // check if player score greater than win condition (200) point
    if (score[activePlayer] >= 200) {
      playing = false;
      cardEl.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
      document.getElementById(`img--${activePlayer}`).classList.add('img--win');
      sfxWin();
    } else {
      switchPlayer();
    }
  }
});

// Btn Music Select
btnMusic.addEventListener('click', sfxSelect);

// Btn Restart
btnNew.addEventListener('click', sfxSelect);
btnNew.addEventListener('click', newGame);

// Btn Rule
btnRule.addEventListener('click', sfxSelect);
btnRule.addEventListener('click', openModalRule);
btnCloseRule.addEventListener('click', sfxCancel);
btnCloseRule.addEventListener('click', closeModalRule);

// Btn Vredit
btnCredit.addEventListener('click', sfxSelect);
btnCredit.addEventListener('click', openModalCredit);
btnCloseCredit.addEventListener('click', sfxCancel);
btnCloseCredit.addEventListener('click', closeModalCredit);

// Btn Hover Sound DOM
btnMusic.addEventListener('mouseover', sfxMove);
btnRule.addEventListener('mouseover', sfxMove);
btnCollect.addEventListener('mouseover', sfxMove);
btnNew.addEventListener('mouseover', sfxMove);
btnSummon.addEventListener('mouseover', sfxMove);
btnCredit.addEventListener('mouseover', sfxMove);
