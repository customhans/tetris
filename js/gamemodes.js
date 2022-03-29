let gmIcon = document.getElementById("gmIcon");
let gmName = document.getElementById("gmName");
let gameMode;

function initGameMode() {
	gameMode = gmSelect.value;
	gmName.textContent = gameMode;
	if (gameMode === "normal") {
		rows = 20;
		gmNormal();
		document.body.classList = "noselect";
		gmIcon.style.backgroundImage = "url()";
	}

	if (gameMode === "bazillus") {
		rows = 20;
		gmBazillus();
		document.body.classList = "noselect";
		gmIcon.style.backgroundImage = "url(/media/bazillus.png)";
	}
	
	if (gameMode === "tenTten") {
		rows = 10;
		document.body.classList.add("tenTten");
	}
	stopTimer();
	clearTimer();
	startScreen();
	setStage();
}


function gmNormal() {
	gameMode = "normal";
	gmIcon.src = "";
	getStandardPieces();
}
