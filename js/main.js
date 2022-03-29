const levelNames = ['Nobody','Aldi Ostrich','Housemouse','Couchqueen','Garnel Marnel','Tomato Thief','Local Hero','Here could be your advertisment','Selfless Hero','Boulder Queen','Ogh-Monster','Boaty McBoatface','Surfclub Member','Ogh-a-monne','Bruder Bauchi', 'Senior Pickle Inspector','Pickle Intern','Untouched','Gato','Jonas Neubauer','Lobby','Jens Lehmann','Catlike reflexes','No more funny level names','Maxed out.... not!'];


function newPiece() {
	if (overlap) {
		setTimeout(gameOver, 1);
		return;
	};

	let randNr;
	v = 0;
	pieceMoveable = true;

	if (nextPiece) {
		piece = JSON.parse(JSON.stringify(nextPiece));
	} else {
		randNr = Math.floor(Math.random() * PIECES.length);
		piece = JSON.parse(JSON.stringify(PIECES[randNr]));
	}

	updateDroughtCounter();

	randNr = Math.floor(Math.random() * PIECES.length);
	nextPiece = JSON.parse(JSON.stringify(PIECES[randNr]));

	drawPreviewPiece();
	drawPiece();
	if (overlap) newPiece();
}

function updateDroughtCounter() {
	let droughtDisplay = document.getElementById("drought");

	if (piece.type !== "i-piece") {
		droughtCounter++;
		if (droughtCounter > 20) {
			droughtDisplay.style.color = "orange";
		}
		if (droughtCounter > 30) {
			droughtDisplay.style.color = "red";
			droughtDisplay.style.fontSize = "2em";
			droughtDisplay.style.marginTop = "0.25em";
		}
		if (droughtCounter > 50) {
			droughtDisplay.style.color = "black";
			droughtDisplay.style.fontSize = "5em";
		}
		
	} else {
		droughtDisplay.style.color = "white";
		droughtDisplay.style.fontSize = "initial";
		droughtDisplay.style.marginTop = "0.5em";
		droughtCounter = 0;
	}

	droughtDisplay.textContent = droughtCounter;
}

function gameOver() {
	pieceMoveable = false;
	gameoverS.play();
	gameOn = false;
	stopTimer();
	clearInterval(intv);
	overlap = false;
	scoreScreen();
}

function initGravity() {
	if (overlap) return;
	clearInterval(intv);
	intv = setInterval(function () {
		if (isFree('down')) {
			move('down');
			drawPiece();
		} else {
			freezePiece();
		};
	}, speed);
}

function drawPiece() {
	clearBoard();
	for (let i in piece.geo[0]) {
		boardCells[piece.geo[v][i]].classList.add("p");
		boardCells[piece.geo[v][i]].classList.add(piece.type);
	}
	checkForOverlap();
	if (showGhostPiece) drawGhostPiece();

}

function drawPreviewPiece() {
	clearPreview();
	for (let i in nextPiece.geo[0]) {
		previewCells[nextPiece.geo[v][i]].classList.add("p");
		previewCells[nextPiece.geo[v][i]].classList.add(nextPiece.type);
	}
}

function checkForOverlap() {
	for (let i in piece.geo[0]) {
		if (boardCells[piece.geo[v][i]].classList.contains("p") &&
			boardCells[piece.geo[v][i]].classList.contains("occ")) {
			overlap = true;
		}
	}
}

function freezePiece() {
	pieceMoveable = false;
	setOccClasses();
	checkForFullRows();
	clearInterval(intv);
	newPiece();
	initGravity();
}

function setOccClasses() {
	for (let i in piece.geo[v]) {
		boardCells[piece.geo[v][i]].classList = "occ";
		boardCells[piece.geo[v][i]].classList.add(piece.type + '-ded');
	}
}

function addFirstRow() {
	for (let i = 0; i < cols; i++) {
		board.insertBefore(document.createElement("div"), board.firstChild);
	}
}

function checkForFullRows() {
	rowsCleared = 0;
	for (let i = 0; i < rows; i++) {
		if (boardCells.slice(cols * i, (cols * i) + cols)
			.every(x => x.classList.contains("occ"))) {
			rowsCleared++;

			for (let j = cols-1; j >= 0; j--) {
				boardCells[(i * cols) + j].classList.add('special');
				board.removeChild(board.childNodes[(i * cols) + j]);
			}

			updateLines();

			addFirstRow();
			indexCells();
		}
	}
	calculatePoints();
	updatePoints();
	//console.log('rows cleared: ' + rowsCleared);
}

function drawGhostPiece() {
	let ghostPiece = JSON.parse(JSON.stringify(piece));
	let arr = [];
	for (let i in piece.geo[v]) {
		let counter = 0;
		let r = cols;

		while (
			piece.geo[v][i] + r <= (cols*rows-cols + Number(String(piece.geo[v][i]).slice(-1))) &&
			!boardCells[piece.geo[v][i] + r].classList.contains("occ")
		) {
			counter++;
			r += cols;
		}
		arr.push(counter);
	}
	let dist = Math.min(...arr);

	ghostPiece.geo[v] = ghostPiece.geo[v].map(x => x += (dist * cols))

	//clearPreview();
	for (let i in ghostPiece.geo[0]) {
		boardCells[ghostPiece.geo[v][i]].classList.add("shadow-p");
		boardCells[ghostPiece.geo[v][i]].classList.add(ghostPiece.type);
	}
}

// POINTS & STUFF

function calculatePoints() {
	if (rowsCleared) {
		if (rowsCleared < 4) playSound(lineclearS);
		if (rowsCleared === 4) {
			playSound(tetrisS);
			tetrisCount++;
		}
		updateTRT();
		points += rowsCleared * rowsCleared * 10;
	}
}

function updatePoints() {
	document.getElementById('points').textContent = points;
	if (points >= (level + 1) * 300) {
		levelUp();
		playSound(levelupS);
		initGravity();
	}
}

function calcSpeed() {
	if (level < 14) speed = startingSpeed - level * 100;
	if (level > 14) speed -= 5;
}

function updateLevel() {
	document.getElementById('level').textContent = level;
	levelName.textContent = levelNames[level];
	calcSpeed();
}

function updateLines() {
	totalLines++;
	document.getElementById('lines').textContent = totalLines;
}

function updateTRT() {
	rowClears++;
	let trt = Math.floor((tetrisCount * 100) / rowClears);
	document.getElementById('trt').textContent = trt + "%";
}

function levelUp() {
	level++;
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
	for (let i in boardCells) {
		boardCells[i].classList.remove("p");
		boardCells[i].classList.remove("i-piece");
		boardCells[i].classList.remove("j-piece");
		boardCells[i].classList.remove("t-piece");
		boardCells[i].classList.remove("l-piece");
		boardCells[i].classList.remove("o-piece");
		boardCells[i].classList.remove("z-piece");
		boardCells[i].classList.remove("s-piece");
		boardCells[i].classList.remove("x-piece");
		boardCells[i].classList.remove("y-piece");
		boardCells[i].classList.remove("one-piece");
		boardCells[i].classList.remove("corner-piece");
		boardCells[i].classList.remove("shadow-p");
	}
}
