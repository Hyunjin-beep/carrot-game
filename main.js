//when the start button is clicked, the images will be showed.
const startBtn = document.querySelector(".startBtn");
const startBtnImg = document.querySelector(".fas");
const character = document.querySelector(".characters");
const count = document.querySelector(".count");

const characterWidth = character.clientWidth;
const characterHeight = character.clientHeight;

function generateBugImage() {
  const imgNumForBug = Math.floor(Math.random() * (10 - 1) + 1);

  for (var i = 0; i < imgNumForBug; i++) {
    const bugImg = document.createElement("img");
    bugImg.setAttribute("class", "bug");
    bugImg.src = `img/bug.png`;
    character.appendChild(bugImg);

    const randomTopForBug = getRandomNumber(0, characterHeight - 50);
    const randomLeftForBug = getRandomNumber(0, characterWidth - 50);
    bugImg.style.transform = `translate(${randomLeftForBug}px, ${randomTopForBug}px)`;
  }
}

function generateCarrotImage() {
  const imgNumForCarrot = Math.floor(Math.random() * (10 - 1) + 1);
  for (var i = 0; i < imgNumForCarrot; i++) {
    const carrotImg = document.createElement("img");
    carrotImg.setAttribute("class", "carrot");
    carrotImg.src = `img/carrot.png`;
    character.appendChild(carrotImg);

    const randomTopForCarrot = getRandomNumber(0, characterHeight - 50);
    const randomLeftForCarrot = getRandomNumber(0, characterWidth - 50);
    carrotImg.style.transform = `translate(${randomLeftForCarrot}px, ${randomTopForCarrot}px)`;
  }
  count.innerText = `${imgNumForCarrot}`;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function init() {
  startBtn.addEventListener("click", (event) => {
    generateBugImage();
    generateCarrotImage();
    startBtnImg.className = "fas fa-square";
  });
}

init();
