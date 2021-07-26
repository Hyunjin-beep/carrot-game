"use strict";

import Character from "./character.js";
import * as sound from "./sound.js";

export default class Game {
  constructor() {
    this.startBtn = document.querySelector(".startBtn");
    this.startBtnImg = document.querySelector(".fas");

    this.startBtn.addEventListener("click", () => {
      if (this.started) {
        // true
        this.gameStop(this.replay);
      } else {
        // false
        this.gameStart();
      }
      // 게임이 진행 중인지 아닌지 알려줌.
      // 동일한 버튼을 눌렀을 때, 게임의 상태를 알지 못하면 작동이 안됨.
      // started가 true 즉 게임이 실행되면 중지 함수, false라면 시작 함수
    });

    this.gameCharacter = new Character();
    this.gameCharacter.setClickListener((event) => {
      this.onCharacterClick(event);
    });

    this.count = document.querySelector(".count");
    this.timer = document.querySelector(".timer");

    this.replay = "cancel";
    this.lose = "lose";
    this.win = "win";

    this.timer_start;
    this.started = false; //default
    this.seconds = 10;
  }

  setGameReasonListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onCharacterClick(item) {
    if (!this.started) {
      return;
    }
    if (item === "bug") {
      this.gameStop(this.lose);
    } else if (item === "carrot") {
      const carrot = document.querySelectorAll(".carrot");
      const initialCarrot = carrot.length;
      this.updateScore(initialCarrot);
    }
  }

  gameStart() {
    this.started = true;
    this.initGame();
    this.showStartBtn();
    this.startBtnImg.className = "fas fa-square";
    this.startCountdown();
    sound.playBg();
  }

  gameStop(txt) {
    this.started = false;
    this.stopCountdown();
    this.hideStartBtn();
    this.onGameStop && this.onGameStop(`${txt}`);
    sound.playAlert();
    sound.stopBg();
  }

  initGame() {
    //게임을 새로 시작할 때마다, 필드는 비게 되어서 캐릭터들이 재배치
    this.showTimerAndCount();
    this.gameCharacter.init();
  }

  showTimerAndCount() {
    this.timer.style.visibility = "visible";
    this.count.style.visibility = "visible";
  }

  showStartBtn() {
    this.startBtn.style.visibility = "visible";
  }

  hideStartBtn() {
    this.startBtn.style.visibility = "hidden";
  }

  startCountdown() {
    let leftTime = this.seconds;
    this.timer.innerHTML = `00:${leftTime < 10 ? `0${leftTime}` : leftTime}`;
    this.timer_start = setInterval(() => {
      if (leftTime == 0) {
        clearInterval(this.timer_start);
        this.gameStop(this.lose);
        sound.playBug();
        return;
      }
      --leftTime;
      this.timer.innerHTML = `00:${leftTime < 10 ? `0${leftTime}` : leftTime}`;
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.timer_start);
  }

  updateScore(initialCarrot) {
    let leftCarrot = initialCarrot;
    --leftCarrot;

    this.count.innerText = leftCarrot + 1;

    if (leftCarrot === -1) {
      sound.playWin();
      this.gameStop(this.win);
      return;
    }
  }
}
