"use strict";

const bug_audio = new Audio("./sound/bug_pull.mp3");
const extra_size = 100;

export default class Character {
  constructor() {
    this.character = document.querySelector(".characters");
    this.characterWidth = this.character.getBoundingClientRect().width;
    this.characterHeight = this.character.getBoundingClientRect().height;
    this.character.addEventListener("click", this.onClick);
    this.count = document.querySelector(".count");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.character.innerHTML = "";
    this.createItem("bug", "img/bug.png");
    this.createItem("carrot", "img/carrot.png");
  }

  createItem(className, imgPath) {
    const imgNum = Math.floor(Math.random() * (10 - 1) + 1);

    for (let i = 0; i < imgNum; i++) {
      const img = document.createElement("img");

      img.setAttribute("class", className);
      img.setAttribute("src", imgPath);
      img.style.position = "absolute";
      this.character.appendChild(img);

      const randomTop = getRandomNumber(0, this.characterHeight - extra_size);
      const randomLeft = getRandomNumber(0, this.characterWidth - extra_size);
      // when using transform in here, i cannot use transition in css
      // img.style.transform = `translate(${randomLeft}px, ${randomTop}px)`;
      img.style.top = `${randomTop}px`;
      img.style.left = `${randomLeft}px`;
    }

    if (className === "carrot") {
      this.count.innerText = `${imgNum}`;
    }
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".bug")) {
      playSound(bug_audio);
      console.log("bug");
      this.onItemClick && this.onItemClick("bug");
    } else if (target.matches(".carrot")) {
      console.log("carrot");
      this.onItemClick && this.onItemClick("carrot");
    }
  }
}

function playSound(sound) {
  sound.play();
  sound.currentTime = 0;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
