let tvBtn = document.getElementById('soundOnOff');
let tpPrev = document.getElementById('preview');
let tpPrevBtn = document.getElementById('previewBtn');
let tgpBtn = document.getElementById('ghostPieceBtn');
let tgBtn = document.getElementById('toggleGridBtn');
let gridRef = document.querySelector(".con-tainer");

function toggleVolume() {
	if (app.settings.soundOn) {
		app.settings.soundOn = false;
		tvBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
	} else {
		app.settings.soundOn = true;
		tvBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	}
	saveSoundSettings();
}

function togglePreview() {
	if (app.settings.showPreview) {
		app.settings.showPreview = false;
		tpPrev.style.opacity = 0;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
	} else {
		app.settings.showPreview = true;
		tpPrev.style.opacity = 0.5;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye"></i>';
	}
	savePreviewSettings();
}

function toggleGhostPiece() {
	if (app.settings.showGhostPiece) {
		app.settings.showGhostPiece = false;
		drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/no-ghost.png)"
	} else {
		app.settings.showGhostPiece = true;
		drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/ghost.png)"
	}
	saveGhostPieceSettings();
}

function toggleGrid() {
	if (app.settings.showGrid) {
		app.settings.showGrid = false;
		tgBtn.style.backgroundImage = "url(./media/no-grid.png)";
		gridRef.classList.remove("grid");
	} else {
		app.settings.showGrid = true;
		tgBtn.style.backgroundImage = "url(./media/grid.png)";
		gridRef.classList.add("grid");
	}
	saveGridSettings();
}

function saveSoundSettings() {
	localStorage.setItem("soundState", app.settings.soundOn);
}


function savePreviewSettings() {
		localStorage.setItem("previewState", app.settings.showPreview);
}

function saveGhostPieceSettings() {
		localStorage.setItem("ghostPieceState", app.settings.showGhostPiece);
}

function saveGridSettings() {
		localStorage.setItem("gridState", app.settings.showGrid);
}



function getUserPresets() {
	// Sound
	app.settings.soundOn = (localStorage.soundState === "true");
	if (app.settings.soundOn) tvBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	else tvBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

	// Preview
	app.settings.showPreview = (localStorage.previewState === "true");
	if (app.settings.showPreview) {
		tpPrev.style.opacity = 0.5;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye"></i>';
	} else {
		tpPrev.style.opacity = 0;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
	}
	

	// Ghost Piece
	app.settings.showGhostPiece = (localStorage.ghostPieceState === "true");
	if (app.settings.showGhostPiece) {
		//drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/ghost.png)"
	} else {
		//drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/no-ghost.png)"
	}

	// Grid
	app.settings.showGrid = (localStorage.gridState === "true");
	if (app.settings.showGrid) {
		//drawPiece();
		tgBtn.style.backgroundImage = "url(./media/grid.png)";
		gridRef.classList.add("grid");
	} else {
		//drawPiece();
		tgBtn.style.backgroundImage = "url(./media/no-grid.png)";
		gridRef.classList.remove("grid");
	}
}
