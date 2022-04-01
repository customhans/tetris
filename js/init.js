let board = document.getElementById('board'), clear, pauseBtn, previewCells;

window.onload = function () {
	let gmSelect = document.getElementById("gmSelect").onchange = initGameMode;
	app.score.scoreUnit = JSON.parse(localStorage.getItem("Scores")) || [];
	getDummyScores();
	document.addEventListener('visibilitychange', function () {
		if(app.settings.gameOn) pauseHandler();
	});
	config();
	startScreen();
	pauseBtn = document.getElementById('pause');
}

function config() {
	// gameOn = false;
	// speed = startingSpeed = 1500;
	getUserPresets();
	gmNormal(); // default game mode "normal"
}

function startScreen() {
	createPreviewArea();
	board.style.width = app.grid.cols * app.grid.cellLength + 'px';
	board.style.height = app.grid.rows * app.grid.cellLength + 'px';
	levelName = document.getElementById('levelName');
	window.addEventListener('keydown', setStage);
}


function setStage() {
	document.getElementById('startscreen').style.display = "none";
	if (app.status.intv) clearInterval(app.status.intv);
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
	app.status.level = app.score.totalLines = app.score.points = app.score.droughtCounter = app.score.tetrisCount = app.score.rowClears = 0;
	document.getElementById("level").textContent = 0;
	document.getElementById("lines").textContent = 0;
	document.getElementById("points").textContent = 0;
	document.getElementById("drought").style.color = "white";
	document.getElementById("drought").style.fontSize = "initial";
}


function fillCells() {
	for (let i = 0; i < app.grid.cols * app.grid.rows; i++) {
		//board.innerHTML += '<div>' + i + '</div>';
		board.innerHTML += '<div></div>';
	}
}

function indexCells() {
	app.grid.boardCells = Array.from(document.querySelectorAll('#board > div'));
}

function startGame() {
	app.settings.gameOn = true;
	updateLevel();
	initSounds();
	newPiece();
	startTimer();
	initGravity();
	window.addEventListener('keydown', ctrl, false);
}
