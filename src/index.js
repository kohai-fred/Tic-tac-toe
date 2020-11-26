import "./index.scss";

const selectPlayer = document.querySelector("select");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const gameContent = document.querySelector(".game-content");
const playersContent = document.querySelector(".players-content");
const squares = document.querySelectorAll(".square");
const btnReload = document.querySelector(".btn-reload");
const content = document.querySelector(".content");

let arraySquareId = [];
let modal;
let nbParts = 0;
let nbWinsP1 = 0;
let nbWinsP2 = 0;
let nullMatch = 0;
let ordiRand;
let targetOrdi;

const activeToggle = () => {
  player1.classList.contains("active")
    ? player1.classList.remove("active")
    : player1.classList.add("active");

  player2.classList.contains("active")
    ? player2.classList.remove("active")
    : player2.classList.add("active");
};

const createCross = (target) => {
  const cross = document.createElement("i");
  cross.classList.add("fas", "fa-times");
  target.insertAdjacentElement("afterbegin", cross);
};
const createCircle = (target, targetOrdi) => {
  const circle = document.createElement("i");
  circle.classList.add("far", "fa-circle");
  target
    ? target.insertAdjacentElement("afterbegin", circle)
    : targetOrdi.insertAdjacentElement("afterbegin", circle);
};
const createModal = (content) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.append(content);
  gameContent.insertAdjacentElement("afterbegin", modal);
};

const displayCounters = () => {
  playersContent.children[1].textContent = nbParts;
  playersContent.firstElementChild.lastElementChild.textContent = nbWinsP1;
  playersContent.lastElementChild.lastElementChild.textContent = nbWinsP2;
};
const randomNum = () => {
  ordiRand = Math.floor(Math.random() * 9);
  targetOrdi = gameContent.children[ordiRand];
};

// check the possibilities of winning
const checkToWin = (a, b, c) => {
  if (
    arraySquareId[a] == arraySquareId[b] &&
    arraySquareId[b] == arraySquareId[c]
  ) {
    if (!gameContent.firstElementChild.classList.contains("modal")) {
      createModal(arraySquareId[a] + " WIN !!!");
    }
    if (arraySquareId[a] == player1.firstElementChild.textContent) {
      nbWinsP1++;
      nbParts++;
      displayCounters();
    }
    if (arraySquareId[a] == player2.firstElementChild.textContent) {
      nbWinsP2++;
      nbParts++;
      displayCounters();
    }
  }
};
const checkPossibility = () => {
  nullMatch++;
  checkToWin(0, 1, 2);
  checkToWin(3, 4, 5);
  checkToWin(6, 7, 8);
  checkToWin(0, 3, 6);
  checkToWin(1, 4, 7);
  checkToWin(2, 5, 8);
  checkToWin(0, 4, 8);
  checkToWin(2, 4, 6);
};

const iaTurn = (target) => {
  while (
    !targetOrdi.classList.contains("cursor") ||
    target.id == targetOrdi.id
  ) {
    randomNum();

    if (
      targetOrdi.classList.contains("cursor") &&
      target.id !== targetOrdi.id
    ) {
      arraySquareId[ordiRand] = player2.firstElementChild.textContent;
      break;
    }
  }
  insertArraySquare(target, targetOrdi);
  createCircle(targetOrdi);
  activeToggle();
  targetOrdi.classList.remove("cursor");
  checkPossibility();
};
const insertArraySquare = (target, targetOrdi) => {
  for (let i = 0; i < arraySquareId.length; i++) {
    if (selectPlayer.value !== selectPlayer[0].value) {
      if (arraySquareId[i] == target.id) {
        if (player1.classList.contains("active")) {
          arraySquareId[i] = player1.firstElementChild.textContent;
        }
        if (player2.classList.contains("active")) {
          arraySquareId[i] = player2.firstElementChild.textContent;
        }
      }
    }

    if (selectPlayer.value == selectPlayer[0].value) {
      if (arraySquareId[i] == target.id) {
        arraySquareId[i] = player1.firstElementChild.textContent;
      }
      if (arraySquareId[i] == targetOrdi.id) {
        arraySquareId[i] = player2.firstElementChild.textContent;
      }
    }
  }
};

squares.forEach((square) => {
  arraySquareId.push(square.id);

  square.classList.add("cursor");
  square.addEventListener("click", (event) => {
    let target = event.target;

    if (target.classList.contains("cursor")) {
      if (player1.classList.contains("active")) {
        insertArraySquare(target, square);
        createCross(target);
        checkPossibility();
      }

      // For IA
      if (selectPlayer.value == selectPlayer[0].value) {
        randomNum();
      }

      // For 2eme human player
      if (player2.classList.contains("active")) {
        insertArraySquare(target, square);
        createCircle(target);
        checkPossibility();
      }

      // launch the AI ​​tour
      if (
        selectPlayer.value == selectPlayer[0].value &&
        !gameContent.firstElementChild.classList.contains("modal")
      ) {
        setTimeout(function () {
          iaTurn(target, targetOrdi);
        }, 300);
      }
      // if nobody win...
      if (!gameContent.firstElementChild.classList.contains("modal")) {
        if (nullMatch == 9) {
          createModal("Match null...");
          nbParts++;
          displayCounters();
        }
      }
    }

    // Toggle active player
    if (square.classList.contains("cursor")) {
      activeToggle();
    }
    target.classList.remove("cursor");
  });

  //For reload game
  const reload = () => {
    if (!square.hasChildNodes()) {
      const toTrash = document.createElement("span");
      square.insertAdjacentElement("afterbegin", toTrash);
    }
    if (!player1.classList.contains("active")) {
      activeToggle();
    }
    if (gameContent.firstElementChild.classList.contains("modal")) {
      modal.remove();
    }

    square.firstChild.remove();
    square.classList.add("cursor");
    nullMatch = 0;

    arraySquareId = [];
    squares.forEach((square) => {
      arraySquareId.push(square.id);
    });
  };
  btnReload.addEventListener("click", reload);

  content.addEventListener("click", (event) => {
    event.stopPropagation();
    if (gameContent.firstElementChild.classList.contains("modal")) {
      modal.addEventListener("click", reload);
    }
  });

  // For change opponent
  selectPlayer.addEventListener("change", () => {
    player2.firstElementChild.textContent = selectPlayer.value;
    reload();
    nbParts = 0;
    nbWinsP1 = 0;
    nbWinsP2 = 0;
    displayCounters();
  });
});
