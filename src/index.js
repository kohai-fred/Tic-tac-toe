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

const activeToggle = () => {
	if (player1.classList.contains("active")) {
		player1.classList.remove("active");
	} else {
		player1.classList.add("active");
	}

	if (player2.classList.contains("active")) {
		player2.classList.remove("active");
	} else {
		player2.classList.add("active");
	}
};

const createCross = (target) => {
	const cross = document.createElement("i");
	cross.classList.add("fas", "fa-times");
	target.insertAdjacentElement("afterbegin", cross);
};
const createCircle = (target) => {
	const circle = document.createElement("i");
	circle.classList.add("far", "fa-circle");
	target.insertAdjacentElement("afterbegin", circle);
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

const check = (a, b, c) => {
	if (
		arraySquareId[a] == arraySquareId[b] &&
		arraySquareId[b] == arraySquareId[c]
	) {
		createModal(arraySquareId[a] + " WIN !!!");
		if (arraySquareId[a] == player1.firstElementChild.textContent) {
			nbWinsP1++;
			nbParts++;
			displayCounters();
			console.log(nbWinsP1);
		}
		if (arraySquareId[a] == player2.firstElementChild.textContent) {
			nbWinsP2++;
			nbParts++;
			displayCounters();
			console.log(arraySquareId[a]);
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
				createCross(target);
			}
			if (player2.classList.contains("active")) {
				createCircle(target);
			}
		}

		for (let i = 0; i < arraySquareId.length; i++) {
			if (arraySquareId[i] == target.id) {
				if (player1.classList.contains("active")) {
					arraySquareId[i] = player1.firstElementChild.textContent;
				}
				if (player2.classList.contains("active")) {
					arraySquareId[i] = player2.firstElementChild.textContent;
				}
			}
		}

		check(0, 1, 2);
		check(3, 4, 5);
		check(6, 7, 8);
		check(0, 3, 6);
		check(1, 4, 7);
		check(2, 5, 8);
		check(0, 4, 8);
		check(2, 4, 6);

		nullMatch++;
		if (nullMatch == 9) {
			createModal("Match null...");
			nbParts++;
			displayCounters();
		}

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
		// modal.remove();
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
