//when the start button is clicked, the images will be showed.
const extra_size = 100;
const startBtn = document.querySelector(".startBtn");
const startBtnImg = document.querySelector(".fas");
const character = document.querySelector(".characters");
const count = document.querySelector(".count");
const timer = document.querySelector(".timer");

let timer_start;
let started = false; //default
let seconds = 10;

const characterWidth = character.getBoundingClientRect().width;
const characterHeight = character.getBoundingClientRect().height;

startBtn.addEventListener("click", (event) => {
  if (started) {
    // true
    gameStop();
  } else {
    // false
    gameStart();
  }
  started = !started;
  // 게임이 진행 중인지 아닌지 알려줌.
  // 동일한 버튼을 눌렀을 때, 게임의 상태를 알지 못하면 작동이 안됨.
  // started가 true 즉 게임이 실행되면 중지 함수, false라면 시작 함수
});

function gameStart() {
  init();
  startBtnImg.className = "fas fa-square";
  startCountdown();
}

function gameStop() {
  console.log("stop");
}

function init() {
  //게임을 새로 시작할 때마다, 필드는 비게 되어서 캐릭터들이 재배치
  character.innerHTML = "";
  createItem("bug", "img/bug.png");
  createItem("carrot", "img/carrot.png");
  showTimerAndCount();
}

function showTimerAndCount() {
  timer.style.visibility = "visible";
  count.style.visibility = "visible";
}

function createItem(className, imgPath) {
  const imgNum = Math.floor(Math.random() * (10 - 1) + 1);

  for (let i = 0; i < imgNum; i++) {
    const img = document.createElement("img");
    img.setAttribute("class", className);
    img.src = `${imgPath}`;
    img.style.position = "absolute";
    character.appendChild(img);

    const randomTop = getRandomNumber(0, characterHeight - extra_size);
    const randomLeft = getRandomNumber(0, characterWidth - extra_size);
    img.style.transform = `translate(${randomLeft}px, ${randomTop}px)`;
  }

  if (className === "carrot") {
    count.innerText = `${imgNum}`;
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function startCountdown() {
  timer.innerHTML = `00:${seconds < 10 ? `0${seconds}` : seconds}`;
  timer_start = setInterval(second_start, 1000);

  function second_start() {
    if (seconds <= 0) {
      clearInterval(timer_start);
      return;
    }
    --seconds;
    timer.innerHTML = `00:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}
