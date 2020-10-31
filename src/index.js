import "./index.scss";
const players = document.querySelector(".player");
const squares = document.querySelectorAll(".square");
const gameElem = document.querySelector(".game");
const btnReload = document.querySelector(".btn-reload");
const body = document.querySelector(".container");

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

const activePlayer = () => {
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

// body.addEventListener("click", activePlayer);

squares.forEach((square) => {
	// console.log(square.childNodes);

	if (!square.hasChildNodes()) {
		square.classList.add("cursor");
		square.addEventListener("click", (event) => {
			const target = event.target;

			if (
				players.children["player1"].classList.contains("active") &&
				target.classList.contains("cursor")
			) {
				createCross();
				target.insertAdjacentElement("afterbegin", cross);

				target.classList.remove("cursor");
				activePlayer();
			}

			if (
				players.children["player2"].classList.contains("active") &&
				target.classList.contains("cursor")
			) {
				createCircle();
				target.insertAdjacentElement("afterbegin", circle);
				target.classList.remove("cursor");
				activePlayer();
			}
		});
	}
	const reloadGame = () => {
		if (square.hasChildNodes()) {
			console.log(square.firstChild);
			square.firstChild.remove();
			square.classList.add("cursor");
		}
	};
	btnReload.addEventListener("click", reloadGame);
});
