function createPreviewArea() {
	let cols = 10;
	let rows = 4;
	let preview = document.getElementById("preview");
	preview.style.width = cols * 30 + 'px';
	preview.style.height = rows * 30 + 'px';
	
	fillCells();
	indexCells();
	
	function fillCells() {
		for (let i = 0; i < cols * rows; i++) {
			//board.innerHTML += '<div>' + i + '</div>';
			preview.innerHTML += '<div></div>';
		}
	}

	function indexCells() {
		previewCells = Array.from(document.querySelectorAll('#preview > div'));
		for (let i = 0; i < cols * rows; i++) {
			//boardCells[i].innerText = i;
		}
	}
}
