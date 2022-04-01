const app = {
	settings: {
		gameOn: false,
		showGhostPiece: false,
		showGrid: false,
		showPreview: false,
		soundOn: false,
		speed: 1500, 
		startingSpeed: 1500,
	},
	grid: {
		boardCells: undefined,
		cellLength: 30,
		cols: 10,
		rows: 20,
	},
	score: {
		droughtCounter: 0,
		points: 0,
		rowClears: 0,
		rowsCleared: undefined,
		scoreUnit: undefined,
		tetrisCount: 0,
		totalLines: 0,
	},
	status: {
        level: 0,
		levelName: undefined,
		levelNames: ['Nobody','Aldi Ostrich','Housemouse','Couchqueen','Garnel Marnel','Tomato Thief','Local Hero','Here could be your advertisment','Selfless Hero','Boulder Queen','Ogh-Monster','Boaty McBoatface','Surfclub Member','Ogh-a-monne','Bruder Bauchi', 'Senior Pickle Inspector','Pickle Intern','Untouched','Gato','Jonas Neubauer','Lobby','Jens Lehmann','Catlike reflexes','No more funny level names','Maxed out.... not!'],
		intv: undefined,
		nextPiece: undefined,
		paused: false,
		pieceMoveable: true,
		piece: undefined,
		variant: 0,
	}
}