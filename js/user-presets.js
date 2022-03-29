let tvBtn = document.getElementById('soundOnOff');
let tpPrev = document.getElementById('preview');
let tpPrevBtn = document.getElementById('previewBtn');
let tgpBtn = document.getElementById('ghostPieceBtn');
let tgBtn = document.getElementById('toggleGridBtn');
let gridRef = document.querySelector(".con-tainer");

function toggleVolume() {
	if (soundOn) {
		soundOn = false;
		tvBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
	} else {
		soundOn = true;
		tvBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	}
	saveSoundSettings();
}

function togglePreview() {
	if (showPreview) {
		showPreview = false;
		tpPrev.style.opacity = 0;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
	} else {
		showPreview = true;
		tpPrev.style.opacity = 0.5;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye"></i>';
	}
	savePreviewSettings();
}

function toggleGhostPiece() {
	if (showGhostPiece) {
		showGhostPiece = false;
		drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/no-ghost.png)"
	} else {
		showGhostPiece = true;
		drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/ghost.png)"
	}
	saveGhostPieceSettings();
}

function toggleGrid() {
	if (showGrid) {
		showGrid = false;
		tgBtn.style.backgroundImage = "url(./media/no-grid.png)";
		gridRef.classList.remove("grid");
	} else {
		showGrid = true;
		tgBtn.style.backgroundImage = "url(./media/grid.png)";
		gridRef.classList.add("grid");
	}
	saveGridSettings();
}

function saveSoundSettings() {
	localStorage.setItem("soundState", soundOn);
}


function savePreviewSettings() {
		localStorage.setItem("previewState", showPreview);
}

function saveGhostPieceSettings() {
		localStorage.setItem("ghostPieceState", showGhostPiece);
}

function saveGridSettings() {
		localStorage.setItem("gridState", showGrid);
}



function getUserPresets() {
	// Sound
	soundOn = (localStorage.soundState === "true");
	if (soundOn) tvBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	else tvBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

	// Preview
	showPreview = (localStorage.previewState === "true");
	if (showPreview) {
		tpPrev.style.opacity = 0.5;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye"></i>';
	} else {
		tpPrev.style.opacity = 0;
		tpPrevBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
	}
	

	// Ghost Piece
	showGhostPiece = (localStorage.ghostPieceState === "true");
	if (showGhostPiece) {
		//drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/ghost.png)"
	} else {
		//drawPiece();
		tgpBtn.style.backgroundImage = "url(./media/no-ghost.png)"
	}

	// Grid
	showGrid = (localStorage.gridState === "true");
	if (showGrid) {
		//drawPiece();
		tgBtn.style.backgroundImage = "url(./media/grid.png)";
		gridRef.classList.add("grid");
	} else {
		//drawPiece();
		tgBtn.style.backgroundImage = "url(./media/no-grid.png)";
		gridRef.classList.remove("grid");
	}
}
