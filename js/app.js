const app = {
	settings: {
		gameOn: false,
		speed: 1500, 
		startingSpeed: 1500,
		showGrid: false,
		showPreview: false,
		soundOn: false,
		showGhostPiece: false
	},
	grid: {
		cols: 10,
		rows: 20,
		cellLength: 30,
		boardCells: null,
	},
	score: {
		totalLines: 0,
		tetrisCount: 0,
		rowClears: 0,
		points: 0,
		droughtCounter: 0,
		rowsCleared: null,
		scoreUnit: null,
	},
	status: {
		paused: false,
		level: 0,
		levelNames: ['Nobody','Aldi Ostrich','Housemouse','Couchqueen','Garnel Marnel','Tomato Thief','Local Hero','Here could be your advertisment','Selfless Hero','Boulder Queen','Ogh-Monster','Boaty McBoatface','Surfclub Member','Ogh-a-monne','Bruder Bauchi', 'Senior Pickle Inspector','Pickle Intern','Untouched','Gato','Jonas Neubauer','Lobby','Jens Lehmann','Catlike reflexes','No more funny level names','Maxed out.... not!'],
		levelName,
		pieceMoveable: true,
		piece: null,
		nextPiece: null,
		intv: null,
		variant: 0,
	}
}