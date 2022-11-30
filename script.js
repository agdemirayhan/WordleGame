"use strict";

import { words } from "./words.js";

const wordsArr = words.toUpperCase().split(" ");
const squares = document.querySelectorAll(".square");
const warningContainer = document.querySelector(".warning-container");
const winContainer = document.querySelector(".win-container");
const keyboardLetters = document.querySelectorAll(".letters");

let column = 0;
let row = 1;
const secretWordNum = Math.floor(Math.random() * 2298 + 1);
const secretWord = wordsArr[secretWordNum];
const secretWordArr = Array.from(secretWord);
let writtenWordArr = [];
let writtenWord;
let counts = {};

window.addEventListener("keydown", function (a) {
  if (a.keyCode > 64 && a.keyCode < 91 && winContainer.innerHTML === "") {
    typeLetter(a.key);
  }
});

window.addEventListener("keydown", function (a) {
  if (a.key === "Backspace" && column !== 0) {
    delKey();
  }
});

window.addEventListener("keydown", function (a) {
  if (a.key === "Enter") {
    enterKey();
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
        lose.innerHTML = `<span>Study</span>`;
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
