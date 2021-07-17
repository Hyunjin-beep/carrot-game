//when the start button is clicked, the images will be showed.
const startBtn = document.querySelector(".startBtn");
const character = document.querySelector(".characters");
// const bug = document.querySelector(".bug");
// const carrot = document.querySelector(".carrot");

const characterWidth = character.offsetWidth;
const characterHeight = character.offsetHeight;

console.log(characterWidth, characterHeight);

function generateBugImage() {
  for (var i = 0; i < 5; i++) {
    const bugImg = document.createElement("img");
    bugImg.setAttribute("class", "bug");
    bugImg.src = `img/bug.png`;
    character.appendChild(bugImg);

    const randomTopForBug = getRandomNumber(0, characterHeight - 50);
    const randomLeftForBug = getRandomNumber(0, characterWidth - 30);
    bugImg.style.transform = `translate(${randomLeftForBug}px, ${randomTopForBug}px)`;
  }
}

function generateCarrotImage() {
  for (var i = 0; i < 5; i++) {
    const carrotImg = document.createElement("img");
    carrotImg.setAttribute("class", "carrot");
    carrotImg.src = `img/carrot.png`;
    character.appendChild(carrotImg);

    const randomTopForCarrot = getRandomNumber(0, characterHeight - 50);
    const randomLeftForCarrot = getRandomNumber(0, characterWidth - 30);
    carrotImg.style.transform = `translate(${randomLeftForCarrot}px, ${randomTopForCarrot}px)`;
  }
}

startBtn.addEventListener("click", (event) => {
  generateBugImage();
  generateCarrotImage();
});

function getRandomNumber(min, max) {
  const randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
}
