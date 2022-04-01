function initSounds() {
	document.getElementById('soundOnOff').style.display = "block";
	lineclearS	=	new Audio('media/sounds/lineclear.wav');
	clickS			=	new Audio('media/sounds/click.wav');
	gameoverS		=	new Audio('media/sounds/gameover.wav');
	harddropS		=	new Audio('media/sounds/harddrop.wav');
	levelupS		=	new Audio('media/sounds/levelUp.wav');
	tetrisS			=	new Audio('media/sounds/winning.wav');
}

function playSound(type) {
	if (app.settings.soundOn && app.settings.gameOn) {
		type.pause();
		type.currentTime = 0;
		type.play();
	}
}

function pauseHandler() {
	if (!app.status.paused) pauseGame();
	else resumeGame();
}

function pauseGame() {
	app.status.paused = true;
	clearInterval(app.status.intv);
	pauseBtn.innerHTML = "<i class='fas fa-play'></i>";
	stopTimer();
	window.removeEventListener("keydown", ctrl);
}

function resumeGame() {
	app.status.paused = false;
	initGravity();
	pauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
	startTimer();
	window.addEventListener("keydown", ctrl);
}

function deleteDesc() {
	document.getElementById("desc").style.display = "none";
}
