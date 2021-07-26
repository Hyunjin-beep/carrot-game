"use strict";

import PopUp from "./popUp.js";
import Game, { Reason } from "./game.js";

//when the start button is clicked, the images will be showed.

const gameFinishPopUp = new PopUp();
gameFinishPopUp.setClickListener(() => {
  game.gameStart();
});

const game = new Game();
game.setGameReasonListener((reason) => {
  switch (reason) {
    case Reason.replay:
      gameFinishPopUp.showMsg("REPLAY ❓");
      break;

    case Reason.lose:
      gameFinishPopUp.showMsg("YOU LOST ☢");
      break;

    case Reason.win:
      gameFinishPopUp.showMsg("YOU WON ❤");
      break;

    default:
      throw new Error("not valid reason");
  }
});
