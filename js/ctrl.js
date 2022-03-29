window.addEventListener('keydown', ctrl, false);

let overlap = false;

var ctrl = function() {
	if(pieceMoveable) {

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
			if (isFree('left'))		move('left');
			break;

		case "ArrowRight":
			if (isFree('right'))	move('right');
			break;

		case " ":
			dropIt();
			playSound(harddropS);
			break;
	}
		console.log(v);
	checkForOverlap();
	drawPiece();

	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
	}
}


function rotate(direction) {
	if(direction === "clockwise") v < 3 ? v++ : v = 0;
	if(direction === "counterclockwise") v > 0 ? v-- : v = 3;
}

function move(dir) {
	for (let i in piece.geo) {
		for (let j in piece.geo[i]) {
			if (dir == 'down')  piece.geo[i][j] += cols;
			if (dir == 'left')  piece.geo[i][j] -=  1;
			if (dir == 'right') piece.geo[i][j] +=  1;
		}
	}
}

function isFree(where) {
	if (where == 'left')  return boardEdge('left')  || fullCell('left')  ? false : true;
	if (where == 'right') return boardEdge('right') || fullCell('right') ? false : true;
	if (where == 'down')  return boardEdge('down')  || fullCell('down')  ? false : true;
}

function boardEdge(where) {
	if (where == 'left')  return piece.geo[v].some(x => x % 10 == 0);
	if (where == 'right') return piece.geo[v].some(x => (x + 1) % cols == 0);
	if (where == 'down')  return piece.geo[v].some(x => x >= cols * (rows - 1));
}

function fullCell(where) {
	for (let i in piece.geo[v]) {
		if (where == 'left')  if (boardCells[piece.geo[v][i] -  1].classList.contains("occ")) return true;
		if (where == 'right') if (boardCells[piece.geo[v][i] +  1].classList.contains("occ")) return true;
		if (where == 'down')  if (boardCells[piece.geo[v][i] + 10].classList.contains("occ")) return true;
	}
}

function rotationCheck1() {
	let v2 = v;
	if (v2 == 3) v2 = -1;
	for (let i = 0; i < piece.geo[v].length; i++) {
		if (boardCells[piece.geo[v2+1][i]].classList.contains("occ")) return false;
	}
	return true;
}

function rotationCheck2() {
	let v2 = v;
	if (v2 == 3) v2 = -1;
	return	piece.geo[v2+1].some(x => (x+1) % 10 == 0) &&
					piece.geo[v2+1].some(x => (x) % 10 == 0) ? false : true;
}

function dropIt() {
	while(isFree('down')) {
		for (let i in piece.geo) {
			for (let j in piece.geo[i]) {
				piece.geo[i][j] += cols;
			}
		}
	}
	freezePiece();
}
