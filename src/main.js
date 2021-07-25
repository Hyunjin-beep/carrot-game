"use strict";

import PopUp from "./popUp.js";
import Game from "./game.js";

//when the start button is clicked, the images will be showed.

const gameFinishPopUp = new PopUp();
gameFinishPopUp.setClickListener(() => {
  game.gameStart();
});

const game = new Game();
game.setGameReasonListener((reason) => {
  switch (reason) {
    case "cancel":
      gameFinishPopUp.showMsg("REPLAY ❓");
      break;

    case "lose":
      gameFinishPopUp.showMsg("YOU LOST ☢");
      break;

    case "win":
      gameFinishPopUp.showMsg("YOU WON ❤");
      break;

    default:
      throw new Error("not valid reason");
  }
});
