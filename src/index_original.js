import "./index.scss";
const playersContent = document.querySelector(".players-content");
const squares = document.querySelectorAll(".square");
const gameContentElem = document.querySelector(".game-content");
const btnReload = document.querySelector(".btn-reload");
const content = document.querySelector(".content");
const selectElem = document.querySelector("select");
// const playersContentCount = document.querySelector(".players-content-count");

// console.log(selectElem.options[0]);

/* For compare results */
let arraySquaresId = [];
let elem;
let case1 = 0;
let case2 = 1;
let case3 = 2;
let case4 = 3;
let case5 = 4;
let case6 = 5;
let case7 = 6;
let case8 = 7;
let case9 = 8;
let nullMatch = 0;
let caseOrdi;

let cross;
let circle;

let modal;

let nbParts = 0;
let nbWinsP1 = 0;
let nbWinsP2 = 0;

const createCross = (target) => {
	cross = document.createElement("i");
	cross.classList.add("fas", "fa-times");
	target.insertAdjacentElement("afterbegin", cross);

	target.classList.remove("cursor");
	target.firstChild.classList.add("player1");
	activeTogglePlayer();
	return cross;
};
const createCircle = (target) => {
	circle = document.createElement("i");
	circle.classList.add("far", "fa-circle");
	target.insertAdjacentElement("afterbegin", circle);
	target.classList.remove("cursor");
	target.firstChild.classList.add("player2");
	activeTogglePlayer();
	return circle;
};
const createCircleOrdi = (elem) => {
	circle = document.createElement("i");
	circle.classList.add("far", "fa-circle");
	elem.insertAdjacentElement("afterbegin", circle);
	elem.classList.remove("cursor");
	activeTogglePlayer();
	return circle;
};

const createModal = (content) => {
	modal = document.createElement("div");
	modal.classList.add("modal");
	modal.append(content);
	gameContentElem.insertAdjacentElement("afterbegin", modal);
};

const activeTogglePlayer = () => {
	if (playersContent.children["player1"].classList.contains("active")) {
		playersContent.children["player1"].classList.remove("active");
	} else {
		playersContent.children["player1"].classList.add("active");
	}

	if (playersContent.children["player2"].classList.contains("active")) {
		playersContent.children["player2"].classList.remove("active");
	} else {
		playersContent.children["player2"].classList.add("active");
	}
};

// For change opponent
const opponentTogglePlayer = () => {
	playersContent.children["player2"].firstElementChild.textContent =
		selectElem.value;
};

const checkCaseOrdi = (elem, caseOrdi) => {
	//   elem = gameContentElem.children[caseOrdi - 1];
	switch (caseOrdi) {
		case case1:
			createCircleOrdi(elem);
			break;
		case case2:
			createCircleOrdi(elem);
			break;
		case case3:
			createCircleOrdi(elem);
			break;
		case case4:
			createCircleOrdi(elem);
			break;
		case case5:
			createCircleOrdi(elem);
			break;
		case case6:
			createCircleOrdi(elem);
			break;
		case case7:
			createCircleOrdi(elem);
			break;
		case case8:
			createCircleOrdi(elem);
			break;
		case case9:
			createCircleOrdi(elem);
			break;
	}
	elem.firstElementChild.classList.add("player2");
	arraySquaresId[caseOrdi] = "player2";
	console.log(elem);
};

const displayCounters = () => {
	playersContent.children[1].textContent = nbParts;
	playersContent.firstElementChild.lastElementChild.textContent = nbWinsP1;
	playersContent.lastElementChild.lastElementChild.textContent = nbWinsP2;
};

squares.forEach((square) => {
	/* Create array for compare results */
	arraySquaresId.push(square.id);

	// For change opponent
	selectElem.addEventListener("change", () => {
		opponentTogglePlayer();
		reloadGame();
		nbParts = 0;
		nbWinsP1 = 0;
		nbWinsP2 = 0;
		displayCounters();
	});

	if (!square.hasChildNodes()) {
		square.classList.add("cursor");
		square.addEventListener("click", (event) => {
			const target = event.target;
			//   console.log(target.id);
			/* Add cross and circle in the game */
			if (
				playersContent.children["player1"].classList.contains("active") &&
				target.classList.contains("cursor")
			) {
				createCross(target);
				// target.insertAdjacentElement("afterbegin", cross);

				// target.classList.remove("cursor");
				// activeTogglePlayer();
				console.log(arraySquaresId);
				if (selectElem.value == selectElem.options[0].value) {
					caseOrdi = Math.floor(Math.random() * 9);
					elem = gameContentElem.children[caseOrdi];

					if (elem.children.length > 0) {
						caseOrdi = Math.floor(Math.random() * 9);
					}
					if (elem != target && elem.children.length == 0) {
						checkCaseOrdi(elem, caseOrdi);
					}
					console.table(
						case1,
						case2,
						case3,
						case4,
						case5,
						case6,
						case7,
						case8,
						case9,
						arraySquaresId
					);
					console.log(elem);
				}
			}

			if (
				playersContent.children["player2"].classList.contains("active") &&
				target.classList.contains("cursor") &&
				selectElem.value != selectElem.options[0].value
			) {
				createCircle(target);
				// target.insertAdjacentElement("afterbegin", circle);
				// target.classList.remove("cursor");
				// activeTogglePlayer();
				// if (selectElem.value == selectElem.options[0].value) {
				//   caseOrdi = Math.floor(Math.random() * 10);
				//   console.log(caseOrdi);
				// }
			}

			/* For compare results */
			const check = () => {
				// if (target.firstChild.classList.contains("fa-times")) {
				//   target.firstChild.classList.add("player1");
				// }
				// if (target.firstChild.classList.contains("fa-circle")) {
				//   target.firstChild.classList.add("player2");
				// }
				for (let i = 0; i < arraySquaresId.length; i++) {
					if (arraySquaresId[i] == target.id) {
						arraySquaresId[i] = target.firstChild.className;
					}
					if (arraySquaresId[i] == elem.id) {
						arraySquaresId[i] = elem.firstChild.className;
					}
				}
				/* for (target.firstChild.className in arraySquaresId == 3) {
          console.log(arraySquaresId[target.firstChild.className]);
        } */
				console.log(arraySquaresId);

				if (arraySquaresId[0] == target.id) {
					case1 = target.firstChild.className;
					// console.log(case1);
				}
				if (arraySquaresId[1] == target.id) {
					case2 = target.firstChild.className;
					// console.log(case2);
				}
				if (arraySquaresId[2] == target.id) {
					case3 = target.firstChild.className;
					// console.log(case3);
				}
				if (arraySquaresId[3] == target.id) {
					case4 = target.firstChild.className;
					// console.log(arraySquaresId[3], target.id);
				}
				if (arraySquaresId[4] == target.id) {
					case5 = target.firstChild.className;
					// console.log(case5);
				}
				if (arraySquaresId[5] == target.id) {
					case6 = target.firstChild.className;
					// console.log(case6);
				}
				if (arraySquaresId[6] == target.id) {
					case7 = target.firstChild.className;
					// console.log(case7);
				}
				if (arraySquaresId[7] == target.id) {
					case8 = target.firstChild.className;
					// console.log(case8);
				}
				if (arraySquaresId[8] == target.id) {
					case9 = target.firstChild.className;
					// console.log(case9);
				}
				if (
					// (case1 == case2 && case2 == case3) ||
					// (case4 == case5 && case5 == case6) ||
					// (case7 == case8 && case8 == case9) ||
					// (case1 == case4 && case4 == case7) ||
					// (case2 == case5 && case5 == case8) ||
					// (case3 == case6 && case6 == case9) ||
					// (case1 == case5 && case5 == case9) ||
					// (case3 == case5 && case5 == case7)
					(arraySquaresId[0] == arraySquaresId[1] &&
						arraySquaresId[1] == arraySquaresId[2]) ||
					(arraySquaresId[3] == arraySquaresId[4] &&
						arraySquaresId[4] == arraySquaresId[5]) ||
					(arraySquaresId[6] == arraySquaresId[7] &&
						arraySquaresId[7] == arraySquaresId[8]) ||
					(arraySquaresId[0] == arraySquaresId[3] &&
						arraySquaresId[3] == arraySquaresId[6]) ||
					(arraySquaresId[1] == arraySquaresId[4] &&
						arraySquaresId[4] == arraySquaresId[7]) ||
					(arraySquaresId[2] == arraySquaresId[5] &&
						arraySquaresId[5] == arraySquaresId[8]) ||
					(arraySquaresId[0] == arraySquaresId[4] &&
						arraySquaresId[4] == arraySquaresId[8]) ||
					(arraySquaresId[2] == arraySquaresId[4] &&
						arraySquaresId[4] == arraySquaresId[6])
				) {
					if (target.firstChild.classList.contains("player1")) {
						createModal(
							playersContent.firstElementChild.firstElementChild.textContent +
								" Win !"
						);
						nbParts++;
						nbWinsP1++;
						// console.log(nbParts);
						displayCounters();
					}
					if (target.firstChild.classList.contains("player2")) {
						createModal(
							playersContent.lastElementChild.firstElementChild.textContent +
								" Win !"
						);
						nbParts++;
						nbWinsP2++;
						displayCounters();
					}
				}
				/* Count number click on square for condition of null match */
				nullMatch++;
				if (nullMatch == 9) {
					createModal("Match null...");
					nbParts++;
					displayCounters();
				}
			};
			check();
		});
	}

	/* For clear game */
	const reloadGame = () => {
		if (!square.hasChildNodes()) {
			const toTrash = document.createElement("span");
			square.insertAdjacentElement("afterbegin", toTrash);
		}

		/* case1 = 1;
    case2 = 2;
    case3 = 3;
    case4 = 4;
    case5 = 5;
    case6 = 6;
    case7 = 7;
    case8 = 8;
		case9 = 9; */
		arraySquaresId.push(square.id);
		nullMatch = 0;

		square.firstChild.remove();
		square.classList.add("cursor");

		if (!playersContent.children["player1"].classList.contains("active")) {
			activeTogglePlayer();
		}
		if (gameContentElem.firstElementChild.classList.contains("modal")) {
			modal.remove();
		}
	};
	btnReload.addEventListener("click", reloadGame);
	content.addEventListener("click", (event) => {
		event.stopPropagation();
		if (gameContentElem.firstElementChild.classList.contains("modal")) {
			modal.addEventListener("click", reloadGame);
		}
	});
});
