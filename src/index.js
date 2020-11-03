import "./index.scss";
const playersContent = document.querySelector(".players-content");
const squares = document.querySelectorAll(".square");
const gameContentElem = document.querySelector(".game-content");
const btnReload = document.querySelector(".btn-reload");
const content = document.querySelector(".content");
// const playersContentCount = document.querySelector(".players-content-count");

console.log(playersContent.children[1]);

/* For compare results */
let arraySquaresId = [];
let case1 = 1;
let case2 = 2;
let case3 = 3;
let case4 = 4;
let case5 = 5;
let case6 = 6;
let case7 = 7;
let case8 = 8;
let case9 = 9;
let nullMatch = 0;

let cross;
let circle;

let modal;

let nbParts = 0;
let nbWinsP1 = 0;
let nbWinsP2 = 0;

const createCross = () => {
	cross = document.createElement("i");
	cross.classList.add("fas", "fa-times");
	return cross;
};
const createCircle = () => {
	circle = document.createElement("i");
	circle.classList.add("far", "fa-circle");
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

const displayCounters = () => {
	playersContent.children[1].textContent = nbParts;
	playersContent.firstElementChild.lastElementChild.textContent = nbWinsP1;
	playersContent.lastElementChild.lastElementChild.textContent = nbWinsP2;
};

squares.forEach((square) => {
	/* Create array for compare results */
	arraySquaresId.push(square.id);

	if (!square.hasChildNodes()) {
		square.classList.add("cursor");
		square.addEventListener("click", (event) => {
			const target = event.target;
			/* Add cross and circle in the game */
			if (
				playersContent.children["player1"].classList.contains("active") &&
				target.classList.contains("cursor")
			) {
				createCross();
				target.insertAdjacentElement("afterbegin", cross);

				target.classList.remove("cursor");
				activeTogglePlayer();
			}

			if (
				playersContent.children["player2"].classList.contains("active") &&
				target.classList.contains("cursor")
			) {
				createCircle();
				target.insertAdjacentElement("afterbegin", circle);
				target.classList.remove("cursor");
				activeTogglePlayer();
			}

			/* For compare results */
			const check = () => {
				if (target.firstChild.classList.contains("fa-times")) {
					target.firstChild.classList.add("player1");
				}
				if (target.firstChild.classList.contains("fa-circle")) {
					target.firstChild.classList.add("player2");
				}
				if (arraySquaresId[0] == target.id) {
					case1 = target.firstChild.className;
					console.log(case1);
				}
				if (arraySquaresId[1] == target.id) {
					case2 = target.firstChild.className;
					console.log(case2);
				}
				if (arraySquaresId[2] == target.id) {
					case3 = target.firstChild.className;
					console.log(case3);
				}
				if (arraySquaresId[3] == target.id) {
					case4 = target.firstChild.className;
					console.log(arraySquaresId[3], target.id);
				}
				if (arraySquaresId[4] == target.id) {
					case5 = target.firstChild.className;
					console.log(case5);
				}
				if (arraySquaresId[5] == target.id) {
					case6 = target.firstChild.className;
					console.log(case6);
				}
				if (arraySquaresId[6] == target.id) {
					case7 = target.firstChild.className;
					console.log(case7);
				}
				if (arraySquaresId[7] == target.id) {
					case8 = target.firstChild.className;
					console.log(case8);
				}
				if (arraySquaresId[8] == target.id) {
					case9 = target.firstChild.className;
					console.log(case9);
				}
				if (
					(case1 == case2 && case2 == case3) ||
					(case4 == case5 && case5 == case6) ||
					(case7 == case8 && case8 == case9) ||
					(case1 == case4 && case4 == case7) ||
					(case2 == case5 && case5 == case8) ||
					(case3 == case6 && case6 == case9) ||
					(case1 == case5 && case5 == case9) ||
					(case3 == case5 && case5 == case7)
				) {
					if (target.firstChild.classList.contains("player1")) {
						createModal(
							playersContent.firstElementChild.firstElementChild.textContent +
								" Win !"
						);
						nbParts++;
						nbWinsP1++;
						console.log(nbParts);
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

		case1 = 1;
		case2 = 2;
		case3 = 3;
		case4 = 4;
		case5 = 5;
		case6 = 6;
		case7 = 7;
		case8 = 8;
		case9 = 9;
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
