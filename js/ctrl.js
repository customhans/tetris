window.addEventListener('keydown', ctrl, false);

let overlap = false;

var ctrl = function() {
	if(app.status.pieceMoveable) {

			if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}

	switch (event.key) {
			
		case "ArrowDown":
			if (isFree('down')) move('down');
			else freezePiece();
			break;

		case "ArrowUp":
			if (rotationCheck1() && rotationCheck2()) rotate("clockwise");
			playSound(clickS);
			break;

		case "Meta":
		case "c":
			if (rotationCheck1() && rotationCheck2()) rotate("counterclockwise");
			playSound(clickS);
			break;

		case "ArrowLeft":
			if (isFree('left')) move('left');
			break;

		case "ArrowRight":
			if (isFree('right')) move('right');
			break;

		case " ":
			dropIt();
			playSound(harddropS);
			break;
	}
	checkForOverlap();
	drawPiece();

	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
	}
}


function rotate(direction) {
	if(direction === "clockwise") app.status.variant < 3 ? app.status.variant++ : app.status.variant = 0;
	if(direction === "counterclockwise") app.status.variant > 0 ? app.status.variant-- : app.status.variant = 3;
}

function move(dir) {
	for (let i in app.status.piece.geo) {
		for (let j in app.status.piece.geo[i]) {
			if (dir == 'down')  app.status.piece.geo[i][j] += app.grid.cols;
			if (dir == 'left')  app.status.piece.geo[i][j] -=  1;
			if (dir == 'right') app.status.piece.geo[i][j] +=  1;
		}
	}
}

function isFree(where) {
	if (where == 'left')  return boardEdge('left')  || fullCell('left')  ? false : true;
	if (where == 'right') return boardEdge('right') || fullCell('right') ? false : true;
	if (where == 'down')  return boardEdge('down')  || fullCell('down')  ? false : true;
}

function boardEdge(where) {
	if (where == 'left')  return app.status.piece.geo[app.status.variant].some(x => x % 10 == 0);
	if (where == 'right') return app.status.piece.geo[app.status.variant].some(x => (x + 1) % app.grid.cols == 0);
	if (where == 'down')  return app.status.piece.geo[app.status.variant].some(x => x >= app.grid.cols * (app.grid.rows - 1));
}

function fullCell(where) {
	for (let i in app.status.piece.geo[app.status.variant]) {
		if (where == 'left')  if (app.grid.boardCells[app.status.piece.geo[app.status.variant][i] -  1].classList.contains("occ")) return true;
		if (where == 'right') if (app.grid.boardCells[app.status.piece.geo[app.status.variant][i] +  1].classList.contains("occ")) return true;
		if (where == 'down')  if (app.grid.boardCells[app.status.piece.geo[app.status.variant][i] + 10].classList.contains("occ")) return true;
	}
}

function rotationCheck1() {
	let v2 = app.status.variant;
	if (v2 == 3) v2 = -1;
	for (let i = 0; i < app.status.piece.geo[app.status.variant].length; i++) {
		if (app.grid.boardCells[app.status.piece.geo[v2 + 1][i]].classList.contains("occ")) return false;
	}
	return true;
}

function rotationCheck2() {
	let v2 = app.status.variant;
	if (v2 == 3) v2 = -1;
	return	app.status.piece.geo[v2 + 1].some(x => (x+1) % 10 == 0) &&
					app.status.piece.geo[v2 + 1].some(x => (x) % 10 == 0) ? false : true;
}

function dropIt() {
	while(isFree('down')) {
		for (let i in app.status.piece.geo) {
			for (let j in app.status.piece.geo[i]) {
				app.status.piece.geo[i][j] += app.grid.cols;
			}
		}
	}
	freezePiece();
}
