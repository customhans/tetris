let cols = 10;
let rows = 20;
let cellLength = 30;
let board = document.getElementById('board'), boardCells, clear, droughtCounter, gameOn, gameover, intv, level, levelName, nextPiece, paused, piece, pieceMoveable, points, pauseBtn, previewCells, rowsCleared, rowClears, scoreUnit, showGhostPiece, showGrid, showPreview, soundOn, speed, startingSpeed, success, tetrisCount, totalLines = 0, v = 0;

window.onload = function () {
	let gmSelect = document.getElementById("gmSelect").onchange = initGameMode;
	scoreUnit = JSON.parse(localStorage.getItem("Scores")) || [];
	getDummyScores();
	document.addEventListener('visibilitychange', function () {
		if(gameOn) pauseHandler();
	});
	config();
	startScreen();
	pauseBtn = document.getElementById('pause');
}

function config() {
	gameOn = false;
	speed = startingSpeed = 1500;
	getUserPresets();
	gmNormal(); // default game mode "normal"
}

function startScreen() {
	createPreviewArea();
	board.style.width = cols * cellLength + 'px';
	board.style.height = rows * cellLength + 'px';
	levelName = document.getElementById('levelName');
	window.addEventListener('keydown', setStage);
}


function setStage() {
	document.getElementById('startscreen').style.display = "none";
	if (intv) clearInterval(intv);
	clearTimer();
	window.removeEventListener("keydown", setStage);
	levelName.textContent = "";
	document.getElementById("sidebar-right").style.opacity = 1;
	document.getElementById('previewBtn').style.display = "block";
	document.getElementById('ghostPieceBtn').style.display = "block";
	document.getElementById('toggleGridBtn').style.display = "block";
	board.classList = "playing";
	board.innerHTML = "";
	fillCells();
	indexCells();
	resetAchievments();
	startGame();
	pauseBtn.style.display = "block";
}

function resetAchievments() {
	level = totalLines = points = droughtCounter = tetrisCount = rowClears = 0;
	document.getElementById("level").textContent = 0;
	document.getElementById("lines").textContent = 0;
	document.getElementById("points").textContent = 0;
	document.getElementById("drought").style.color = "white";
	document.getElementById("drought").style.fontSize = "initial";
}


function fillCells() {
	for (let i = 0; i < cols * rows; i++) {
		//board.innerHTML += '<div>' + i + '</div>';
		board.innerHTML += '<div></div>';
	}
}

function indexCells() {
	boardCells = Array.from(document.querySelectorAll('#board > div'));
	for (let i = 0; i < cols * rows; i++) {
		//boardCells[i].innerText = i;
	}
}

function startGame() {
	gameOn = true;
	updateLevel();
	initSounds();
	newPiece();
	startTimer();
	initGravity();
	window.addEventListener('keydown', ctrl, false);
}
