function newPiece() {
	if (overlap) {
		setTimeout(gameOver, 1);
		return;
	};

	let randNr;
	app.status.variant = 0;
	app.status.pieceMoveable = true;

	if (app.status.nextPiece) {
		app.status.piece = JSON.parse(JSON.stringify(app.status.nextPiece));
	} else {
		randNr = Math.floor(Math.random() * PIECES.length);
		app.status.piece = JSON.parse(JSON.stringify(PIECES[randNr]));
	}

	updateDroughtCounter();

	randNr = Math.floor(Math.random() * PIECES.length);
	app.status.nextPiece = JSON.parse(JSON.stringify(PIECES[randNr]));

	drawPreviewPiece();
	drawPiece();
	if (overlap) newPiece();
}

function updateDroughtCounter() {
	let droughtDisplay = document.getElementById("drought");

	if (app.status.piece.type !== "i-piece") {
		app.score.droughtCounter++;
		if (app.score.droughtCounter > 20) {
			droughtDisplay.style.color = "orange";
		}
		if (app.score.droughtCounter > 30) {
			droughtDisplay.style.color = "red";
			droughtDisplay.style.fontSize = "2em";
			droughtDisplay.style.marginTop = "0.25em";
		}
		if (app.score.droughtCounter > 50) {
			droughtDisplay.style.color = "black";
			droughtDisplay.style.fontSize = "5em";
		}
		
	} else {
		droughtDisplay.style.color = "white";
		droughtDisplay.style.fontSize = "initial";
		droughtDisplay.style.marginTop = "0.5em";
		app.score.droughtCounter = 0;
	}

	droughtDisplay.textContent = app.score.droughtCounter;
}

function gameOver() {
	app.status.pieceMoveable = false;
	gameoverS.play();
	app.settings.gameOn = false;
	stopTimer();
	clearInterval(app.status.intv);
	overlap = false;
	scoreScreen();
}

function initGravity() {
	if (overlap) return;
	clearInterval(app.status.intv);
	app.status.intv = setInterval(function () {
		if (isFree('down')) {
			move('down');
			drawPiece();
		} else {
			freezePiece();
		};
	}, app.settings.speed);
}

function drawPiece() {
	clearBoard();
	for (let i in app.status.piece.geo[0]) {
		app.grid.boardCells[app.status.piece.geo[app.status.variant][i]].classList.add("p");
		app.grid.boardCells[app.status.piece.geo[app.status.variant][i]].classList.add(app.status.piece.type);
	}
	checkForOverlap();
	if (app.settings.showGhostPiece) drawGhostPiece();

}

function drawPreviewPiece() {
	clearPreview();
	for (let i in app.status.nextPiece.geo[0]) {
		previewCells[app.status.nextPiece.geo[app.status.variant][i]].classList.add("p");
		previewCells[app.status.nextPiece.geo[app.status.variant][i]].classList.add(app.status.nextPiece.type);
	}
}

function checkForOverlap() {
	for (let i in app.status.piece.geo[0]) {
		if (app.grid.boardCells[app.status.piece.geo[app.status.variant][i]].classList.contains("p") &&
			app.grid.boardCells[app.status.piece.geo[app.status.variant][i]].classList.contains("occ")) {
			overlap = true;
		}
	}
}

function freezePiece() {
	app.status.pieceMoveable = false;
	setOccClasses();
	checkForFullRows();
	clearInterval(app.status.intv);
	newPiece();
	initGravity();
}

function setOccClasses() {
	for (let i in app.status.piece.geo[app.status.variant]) {
		app.grid.boardCells[app.status.piece.geo[app.status.variant][i]].classList = "occ";
		app.grid.boardCells[app.status.piece.geo[app.status.variant][i]].classList.add(app.status.piece.type + '-ded');
	}
}

function addFirstRow() {
	for (let i = 0; i < app.grid.cols; i++) {
		board.insertBefore(document.createElement("div"), board.firstChild);
	}
}

function checkForFullRows() {
	app.score.rowsCleared = 0;
	for (let i = 0; i < app.grid.rows; i++) {
		if (app.grid.boardCells.slice(app.grid.cols * i, (app.grid.cols * i) + app.grid.cols)
			.every(x => x.classList.contains("occ"))) {
			app.score.rowsCleared++;

			for (let j = app.grid.cols - 1; j >= 0; j--) {
				app.grid.boardCells[(i * app.grid.cols) + j].classList.add('special');
				board.removeChild(board.childNodes[(i * app.grid.cols) + j]);
			}

			updateLines();

			addFirstRow();
			indexCells();
		}
	}
	calculatePoints();
	updatePoints();
}

function drawGhostPiece() {
	let ghostPiece = JSON.parse(JSON.stringify(app.status.piece));
	let arr = [];
	for (let i in app.status.piece.geo[app.status.variant]) {
		let counter = 0;
		let r = app.grid.cols;

		while (
			app.status.piece.geo[app.status.variant][i] + r <= (app.grid.cols * app.grid.rows - app.grid.cols + Number(String(app.status.piece.geo[app.status.variant][i]).slice(-1))) &&
			!app.grid.boardCells[app.status.piece.geo[app.status.variant][i] + r].classList.contains("occ")
		) {
			counter++;
			r += app.grid.cols;
		}
		arr.push(counter);
	}
	let dist = Math.min(...arr);

	ghostPiece.geo[app.status.variant] = ghostPiece.geo[app.status.variant].map(x => x += (dist * app.grid.cols))

	//clearPreview();
	for (let i in ghostPiece.geo[0]) {
		app.grid.boardCells[ghostPiece.geo[app.status.variant][i]].classList.add("shadow-p");
		app.grid.boardCells[ghostPiece.geo[app.status.variant][i]].classList.add(ghostPiece.type);
	}
}

// POINTS & STUFF

function calculatePoints() {
	if (app.score.rowsCleared) {
		if (app.score.rowsCleared < 4) playSound(lineclearS);
		if (app.score.rowsCleared === 4) {
			playSound(tetrisS);
			app.score.tetrisCount++;
		}
		updateTRT();
		app.score.points += app.score.rowsCleared * app.score.rowsCleared * 10;
	}
}

function updatePoints() {
	document.getElementById('points').textContent = app.score.points;
	if (app.score.points >= (app.status.level + 1) * 300) {
		levelUp();
		playSound(levelupS);
		initGravity();
	}
}

function calcSpeed() {
	if (level < 14) app.settings.speed = app.settings.startingSpeed - app.status.level * 100;
	if (app.status.level > 14) app.settings.speed -= 5;
}

function updateLevel() {
	document.getElementById('level').textContent = app.status.level;
	levelName.textContent = app.status.levelNames[app.status.level];
	calcSpeed();
}

function updateLines() {
	app.score.totalLines++;
	document.getElementById('lines').textContent = app.score.totalLines;
}

function updateTRT() {
	app.score.rowClears++;
	let trt = Math.floor((app.score.tetrisCount * 100) / app.score.rowClears);
	document.getElementById('trt').textContent = trt + "%";
}

function levelUp() {
	app.status.level++;
	updateLevel();
	initGravity();
}


// MISC
function clearPreview() {
	for (let i in previewCells) {
		previewCells[i].classList.remove("p");
		previewCells[i].classList.remove("i-piece");
		previewCells[i].classList.remove("j-piece");
		previewCells[i].classList.remove("t-piece");
		previewCells[i].classList.remove("l-piece");
		previewCells[i].classList.remove("o-piece");
		previewCells[i].classList.remove("z-piece");
		previewCells[i].classList.remove("s-piece");
		previewCells[i].classList.remove("x-piece");
		previewCells[i].classList.remove("y-piece");
		previewCells[i].classList.remove("one-piece");
		previewCells[i].classList.remove("corner-piece");
	}
}

function clearBoard() {
	for (let i in app.grid.boardCells) {
		app.grid.boardCells[i].classList.remove("p");
		app.grid.boardCells[i].classList.remove("i-piece");
		app.grid.boardCells[i].classList.remove("j-piece");
		app.grid.boardCells[i].classList.remove("t-piece");
		app.grid.boardCells[i].classList.remove("l-piece");
		app.grid.boardCells[i].classList.remove("o-piece");
		app.grid.boardCells[i].classList.remove("z-piece");
		app.grid.boardCells[i].classList.remove("s-piece");
		app.grid.boardCells[i].classList.remove("x-piece");
		app.grid.boardCells[i].classList.remove("y-piece");
		app.grid.boardCells[i].classList.remove("one-piece");
		app.grid.boardCells[i].classList.remove("corner-piece");
		app.grid.boardCells[i].classList.remove("shadow-p");
	}
}
