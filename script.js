"use strict";

import { wordsEngArr } from "./words.js";
import { wordsTrArr } from "./wordstr.js";

const squares = document.querySelectorAll(".square");
const table = document.querySelector(".table");
const keyboardEng = document.querySelector(".keyboard");
const keyboardTr = document.querySelector(".keyboard-tr");
const languageSelector = document.querySelector(".language-selector");
const warningContainer = document.querySelector(".warning-container");
const winContainer = document.querySelector(".win-container");
const keyboardLetters = document.querySelectorAll(".letters");
const english = document.querySelector(".english");
const turkish = document.querySelector(".turkish");
const multiplayer = document.querySelector(".multiplayer");
const specialTrLetters = [219, 221, 222, 186, 220, 191];
let secretWordNum;
let secretWord;
let secretWordArr;
let wordsArr;
let column = 0;
let row = 1;
let writtenWordArr = [];
let writtenWord;
let counts = {};
let lang;
let greenLetters = [];

english.addEventListener("click", function () {
  table.style.opacity = "1";
  languageSelector.style.display = "none";
  keyboardEng.style.transform = "translateX(0px)";
  squares.forEach((e) => {
    e.style.display = "block";
  });
  secretWordNum = Math.floor(Math.random() * 2298 + 1);
  secretWord = wordsEngArr[secretWordNum];
  secretWordArr = Array.from(secretWord);
  console.log(secretWord);
  wordsArr = wordsEngArr;
  lang = "eng";
});

turkish.addEventListener("click", function () {
  table.style.opacity = "1";
  languageSelector.style.display = "none";
  keyboardTr.style.transform = "translateX(0px)";
  squares.forEach((e) => {
    e.style.display = "block";
  });
  secretWordNum = Math.floor(Math.random() * 5535 + 1);
  secretWord = wordsTrArr[secretWordNum];
  secretWordArr = Array.from(secretWord);
  console.log(secretWord);
  wordsArr = wordsTrArr;
  lang = "tr";
});

const multiplayerScreen = `     <h3>Select Language</h3>      
<div class="language-selector__option">
<label for="english" >English</label>
<input type="checkbox" name="check" id="english" /></div>
<div class="language-selector__option">
<label for="turkish" >Türkçe</label>
<input type="checkbox" name="check" id="turkish" /></div>
<form>
<label for="number">Choose a number</label>
<input
  type="number"
  placeholder="word number"
  min="1"
  max="5534"
  id="number"
  class="word-form"
  required
/>
</form>
<button class="language-button random">Random</button>
<button class="language-button start">Start</button>
`;

document.body.addEventListener("click", function () {
  console.log(31);
  document.body.scrollTop = "0";
});

multiplayer.addEventListener("click", function () {
  languageSelector.innerHTML = multiplayerScreen;
  const englishID = document.getElementById("english");
  const turkishID = document.getElementById("turkish");
  const input = document.getElementById("number");
  const start = document.querySelector(".start");
  const random = document.querySelector(".random");
  languageSelector.style.height = "300px";

  englishID.addEventListener("click", function () {
    turkishID.checked = false;
    number.max = "2297";
    input.placeholder = "1-2297";
    randomButtonResetter();
  });

  turkishID.addEventListener("click", function () {
    englishID.checked = false;
    number.max = "5534";
    input.placeholder = "1-5534";
    randomButtonResetter();
  });

  function randomButtonResetter() {
    random.innerHTML = `Random`;
    random.style.color = "";
    random.style.fontSize = "";
    random.disabled = false;
    random.classList.remove("inactive");
  }

  let selectedNumber = 1;
  input.addEventListener("change", function (e) {
    selectedNumber = e.target.value;
    if (turkishID.checked && (selectedNumber > 5534 || selectedNumber < 1)) {
      input.classList.add("false");
    } else {
      input.classList.remove("false");
    }

    if (englishID.checked && (selectedNumber > 2297 || selectedNumber < 1)) {
      input.classList.add("false");
    } else {
      input.classList.remove("false");
    }
  });

  random.addEventListener("click", function () {
    if (englishID.checked) {
      selectedNumber = Math.floor(Math.random() * 2298 + 1);
      randomButtonSelectAction();
    }
    if (turkishID.checked) {
      selectedNumber = Math.floor(Math.random() * 5535 + 1);
      randomButtonSelectAction();
    }
  });

  function randomButtonSelectAction() {
    random.innerHTML = `${selectedNumber}`;
    random.style.color = "green";
    random.style.fontSize = "1.2rem";
    random.disabled = true;
    random.classList.add("inactive");
    input.placeholder = `${selectedNumber}`;
  }

  start.addEventListener("click", function () {
    document.body.scrollTop = 0;
    if (englishID.checked && selectedNumber < 2298 && selectedNumber > 0) {
      table.style.opacity = "1";
      languageSelector.style.display = "none";
      keyboardEng.style.transform = "translateX(0px)";
      squares.forEach((e) => {
        e.style.display = "block";
      });
      secretWordNum = selectedNumber;
      secretWord = wordsEngArr[secretWordNum];
      secretWordArr = Array.from(secretWord);
      console.log(secretWord);
      wordsArr = wordsEngArr;
      lang = "eng";
    }
    if (turkishID.checked && selectedNumber < 5535 && selectedNumber > 0) {
      table.style.opacity = "1";
      languageSelector.style.display = "none";
      keyboardEng.style.transform = "translateX(0px)";
      squares.forEach((e) => {
        e.style.display = "block";
      });
      secretWordNum = selectedNumber;
      secretWord = wordsTrArr[secretWordNum];
      secretWordArr = Array.from(secretWord);
      console.log(secretWord);
      wordsArr = wordsTrArr;
      lang = "tr";
    }
  });
});

window.addEventListener("keydown", function (a) {
  if (
    (a.keyCode > 64 && a.keyCode < 91) ||
    (specialTrLetters.includes(a.keyCode) && winContainer.innerHTML === "")
  ) {
    if (a.keyCode === 222 && lang === "tr") {
      typeLetter("İ");
      console.log(secretWord);
    } else {
      typeLetter(a.key);
    }
  }
});

window.addEventListener("keydown", function (a) {
  if (a.key === "Backspace" && column !== 0) {
    delKey();
  }
});

window.addEventListener("keydown", function (a) {
  if (a.key === "Enter") {
    console.log(counts);
    enterKey();
    console.log(counts);
  }
});

function checkWord() {
  writtenWordArr.forEach((x, idx) => {
    if (x === secretWordArr[idx]) {
      squares[idx + (row - 1) * 5].classList.add("green");
      counts[x] = counts[x] - 1;
    }
  });
  writtenWordArr.forEach((x, idx) => {
    if (
      secretWordArr.includes(x) &&
      !squares[idx + (row - 1) * 5].classList.contains("green") &&
      counts[x] !== 0
    ) {
      squares[idx + (row - 1) * 5].classList.add("yellow");
      counts[x] = counts[x] - 1;
    } else if (
      !counts[x] &&
      !squares[idx + (row - 1) * 5].classList.contains("green") &&
      !squares[idx + (row - 1) * 5].classList.contains("yellow")
    ) {
      squares[idx + (row - 1) * 5].classList.add("gray");
    }
  });
}

function flipSquares() {
  for (let i = 0; i < secretWord.length; i++) {
    setTimeout(() => {
      squares[i + (row - 2) * 5].classList.add("show");
    }, 300 * i);
  }
}

function squarePop(column) {
  squares[column + (row - 1) * 5].style.scale = "1.1";
  setTimeout(() => {
    squares[column + (row - 1) * 5].style.scale = "1";
  }, 30);
}

keyboardLetters.forEach((e) => {
  e.addEventListener("click", function () {
    if (e.id === "enter") {
      enterKey();
    } else if (e.id === "del") {
      delKey();
    } else if (e.id !== "del" && e.id !== "enter") {
      typeLetter(e.innerHTML);
    }
  });
});

function typeLetter(input) {
  if (column >= 0 && column <= 4 && winContainer.innerHTML === "") {
    squares[column + (row - 1) * 5].innerText = `${input.toUpperCase()}`;
    squares[column + (row - 1) * 5].style.border = "2px solid rgba(0,0,0,0.5)";
    squarePop(column);
    writtenWordArr.push(squares[column + (row - 1) * 5].innerText);
  }
  if (column < 5) {
    column++;
  }
}

function enterKey() {
  if (winContainer.innerHTML === "") {
    writtenWord = writtenWordArr.join("");
    if (wordsArr.includes(writtenWord)) {
      column = 0;
      const filteredArray = secretWordArr.filter((value) =>
        writtenWordArr.includes(value)
      );
      const nonDuplicatedArray = [...new Set(filteredArray)];
      filteredArray.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      checkWord(writtenWord);
      flipSquares();
      row++;
      writtenWordArr.forEach((e) => {
        keyboardLetters.forEach((letter) => {
          if (
            letter.innerText.includes(e) &&
            letter.id !== "enter" &&
            letter.id !== "del"
          ) {
            setTimeout(() => {
              letter.style.backgroundColor = "#444";
            }, 1500);
          }
          secretWordArr.forEach((e, idx) => {
            if (
              writtenWordArr.includes(e) &&
              letter.innerText.includes(e) &&
              letter.id !== "enter" &&
              letter.id !== "del"
            ) {
              setTimeout(() => {
                if (!greenLetters.includes(e)) {
                  letter.style.backgroundColor = "#daa520";
                }
              }, 1500);
            }
            if (
              writtenWord[idx] === e &&
              letter.innerText.includes(e) &&
              letter.id !== "enter" &&
              letter.id !== "del"
            ) {
              greenLetters.push(writtenWord[idx]);
              setTimeout(() => {
                letter.style.backgroundColor = "#008000";
              }, 1500);
            }
          });
        });
      });
      if (writtenWord === secretWord) {
        const win = document.createElement("div");
        win.classList.add("win");
        if (row === 2) {
          win.innerHTML = `<span>Genius</span>`;
        }
        if (row === 3) {
          win.innerHTML = `<span>Magnificient</span>`;
        }
        if (row === 4) {
          win.innerHTML = `<span>Impressive</span>`;
        }
        if (row === 5) {
          win.innerHTML = `<span>Splendid</span>`;
        }
        if (row === 6) {
          win.innerHTML = `<span>Great</span>`;
        }
        if (row === 7) {
          win.innerHTML = `<span>Phew</span>`;
        }
        winContainer.appendChild(win);
      }
      if (row === 7 && writtenWord !== secretWord) {
        const lose = document.createElement("div");
        lose.classList.add("win");
        lose.innerHTML = `<span>${secretWord}</span>`;
        winContainer.appendChild(lose);
      }
      writtenWord = "";
      writtenWordArr = [];
      counts = {};
    } else {
      const warning = document.createElement("div");
      warning.classList.add("warning");
      warning.innerHTML = `<span>Not in word list</span>`;
      warningContainer.appendChild(warning);
      setTimeout(() => {
        warning.remove();
      }, 2400);
      for (let i = 0; i < secretWord.length; i++) {
        if (!squares[i + (row - 1) * 5].classList.contains("animate")) {
          squares[i + (row - 1) * 5].classList.add("animate");
        }
      }
      setTimeout(() => {
        for (let i = 0; i < secretWord.length; i++) {
          squares[i + (row - 1) * 5].classList.remove("animate");
        }
      }, 400);
    }
  }
}

function delKey() {
  if (column !== 0 && winContainer.innerHTML === "") {
    squares[column - 1 + (row - 1) * 5].innerText = "";
    squares[column - 1 + (row - 1) * 5].style.border =
      "2px solid rgba(0,0,0,0.1)";
    writtenWordArr.splice(column - 1, column);
    if (column > 0) {
      column--;
    }
  }
}
