"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".loseAndWin");
    this.popUpMsg = document.querySelector(".popUpMsg");
    this.redoBtn = document.querySelector(".redoBtn");
    this.redoBtn.addEventListener("click", () => {
      if (this.onClick) {
        this.onClick();
        this.hide();
      }
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showMsg(txt) {
    this.popUp.classList.remove("loseAndWin_hide");
    this.popUpMsg.innerText = txt;
  }

  hide() {
    this.popUp.classList.add("loseAndWin_hide");
  }
}
