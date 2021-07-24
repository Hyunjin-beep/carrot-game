"use strict";

import PopUp from "./popUp.js";
import Character from "./character.js";

//when the start button is clicked, the images will be showed.
const extra_size = 100;
const startBtn = document.querySelector(".startBtn");
const startBtnImg = document.querySelector(".fas");

const count = document.querySelector(".count");
const timer = document.querySelector(".timer");

const replay = "REPLAY ❓";
const lose = "YOU LOST ☢";
const win = "YOU WON ❤";

const bg_audio = new Audio("./sound/bg.mp3");
const carrot_audio = new Audio("./sound/carrot_pull.mp3");
const bug_audio = new Audio("./sound/bug_pull.mp3");
const win_audio = new Audio("./sound/game_win.mp3");
const lose_audio = new Audio("./sound/alert.wav");

let timer_start;
let started = false; //default
let seconds = 10;

const gameFinishPopUp = new PopUp();
gameFinishPopUp.setClickListener(gameStart);

const gameCharacter = new Character();
gameCharacter.setClickListener(onCharacterClick);

startBtn.addEventListener("click", (event) => {
  if (started) {
    // true
    gameStop(replay);
  } else {
    // false
    gameStart();
  }
  // 게임이 진행 중인지 아닌지 알려줌.
  // 동일한 버튼을 눌렀을 때, 게임의 상태를 알지 못하면 작동이 안됨.
  // started가 true 즉 게임이 실행되면 중지 함수, false라면 시작 함수
});

function onCharacterClick(item) {
  if (!started) {
    return;
  }
  if (item === "bug") {
    gameStop(lose);
  } else if (item === "carrot") {
    // updateScore(event);
  }
}

function gameStart() {
  started = true;
  initGame();
  showStartBtn();
  startBtnImg.className = "fas fa-square";
  startCountdown();
  playSound(bg_audio);
}

function gameStop(txt) {
  started = false;
  stopCountdown();
  hideStartBtn();
  gameFinishPopUp.showMsg(txt);
  stopSound(bg_audio);
}

function initGame() {
  //게임을 새로 시작할 때마다, 필드는 비게 되어서 캐릭터들이 재배치
  showTimerAndCount();
  gameCharacter.init();
}

function showTimerAndCount() {
  timer.style.visibility = "visible";
  count.style.visibility = "visible";
}

function showStartBtn() {
  startBtn.style.visibility = "visible";
}

function hideStartBtn() {
  startBtn.style.visibility = "hidden";
}

function startCountdown() {
  let leftTime = seconds;
  timer.innerHTML = `00:${leftTime < 10 ? `0${leftTime}` : leftTime}`;
  timer_start = setInterval(second_start, 1000);

  function second_start() {
    if (leftTime == 0) {
      gameStop(lose);
      playSound(lose_audio);
      clearInterval(timer_start);
      return;
    }
    --leftTime;
    timer.innerHTML = `00:${leftTime < 10 ? `0${leftTime}` : leftTime}`;
  }
}

function stopCountdown() {
  clearInterval(timer_start);
}

function updateScore(event) {
  const carrot = document.querySelectorAll(".carrot");
  const clickedCarrot = event.target;
  const initialCarrot = carrot.length;

  let leftCarrot = initialCarrot;
  clickedCarrot.remove();
  playSound(carrot_audio);
  --leftCarrot;

  count.innerText = leftCarrot;

  if (leftCarrot === 0) {
    playSound(win_audio);
    gameStop(win);
    return;
  }
}

function playSound(sound) {
  sound.play();
  sound.currentTime = 0;
}

function stopSound(sound) {
  sound.pause();
}
