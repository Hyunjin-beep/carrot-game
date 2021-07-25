"use strict";

import * as sound from "./sound.js";
const extra_size = 100;

export default class Character {
  constructor() {
    this.character = document.querySelector(".characters");
    this.characterWidth = this.character.getBoundingClientRect().width;
    this.characterHeight = this.character.getBoundingClientRect().height;
    this.onClick = this.onClick.bind(this);
    this.character.addEventListener("click", this.onClick);

    this.count = document.querySelector(".count");
  }

  setClickListener(onFieldClick) {
    this.onFieldClick = onFieldClick;
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
    if (target.className === "bug") {
      sound.playBug();
      this.onFieldClick && this.onFieldClick("bug");
    } else if (target.className === "carrot") {
      sound.playCarrot();
      target.remove();
      const carrot = document.querySelectorAll(".carrot");
      const initialCarrot = carrot.length;
      console.log(`${initialCarrot} in field`);
      this.onFieldClick && this.onFieldClick("carrot");
    }
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
