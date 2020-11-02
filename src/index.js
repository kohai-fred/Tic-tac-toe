import "./index.scss";
const players = document.querySelector(".player");
const squares = document.querySelectorAll(".square");
const gameElem = document.querySelector(".game");
const btnReload = document.querySelector(".btn-reload");
const body = document.querySelector(".container");

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

let cross;
let circle;

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

const activeTogglePlayer = () => {
	if (players.children["player1"].classList.contains("active")) {
		players.children["player1"].classList.remove("active");
	} else {
		players.children["player1"].classList.add("active");
	}

	if (players.children["player2"].classList.contains("active")) {
		players.children["player2"].classList.remove("active");
	} else {
		players.children["player2"].classList.add("active");
	}
};

// body.addEventListener("click", activeTogglePlayer);

squares.forEach((square) => {
	/* Create array for compare results */
	arraySquaresId.push(square.id);

	if (!square.hasChildNodes()) {
		square.classList.add("cursor");
		square.addEventListener("click", (event) => {
			const target = event.target;
			/* Add cross and circle in the game */
			if (
				players.children["player1"].classList.contains("active") &&
				target.classList.contains("cursor")
			) {
				createCross();
				target.insertAdjacentElement("afterbegin", cross);

				target.classList.remove("cursor");
				activeTogglePlayer();
			}

			if (
				players.children["player2"].classList.contains("active") &&
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
						alert("Player 1 win");
					} else if (target.firstChild.classList.contains("player2")) {
						alert("Player 2 win");
					} else {
						console.log("Match NUL");
					}
				}
				console.log(
					case1,
					case2,
					case3,
					case4,
					case5,
					case6,
					case7,
					case8,
					case9
				);
			};
			check();
		});
	}

	/* For clear game */
	const reloadGame = () => {
		if (square.hasChildNodes()) {
			square.firstChild.remove();
			square.classList.add("cursor");

			case1 = 1;
			case2 = 2;
			case3 = 3;
			case4 = 4;
			case5 = 5;
			case6 = 6;
			case7 = 7;
			case8 = 8;
			case9 = 9;
		}
		if (!players.children["player1"].classList.contains("active")) {
			activeTogglePlayer();
		}
	};
	btnReload.addEventListener("click", reloadGame);
});
