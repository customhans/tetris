let scores;
var highscoreModal = new bootstrap.Modal(document.getElementById("highscoreModal"), {});
var scoresheetModal = new bootstrap.Modal(document.getElementById("scoresheetModal"), {});

let scoresheet = document.querySelector('#scoresheetModal .modal-body');

function sortFunction(a, b) {
		if (a[0] === b[0]) {
			return 0;
		} else {
			return (a[0] > b[0]) ? -1 : 1;
		}
	}

function getDummyScores() {
	if (scoreUnit.length === 0) {
		scoreUnit.push([12920,"Time for food"]);
		scoreUnit.push([8000, "Doggoe"]);
		scoreUnit.push([500,"Johnny Newfarmer"]);
	}
}

function scoreScreen() {
	//clearBoard();
	//clearInterval(intv);
	window.removeEventListener("keydown", ctrl);
	//board.classList = "scoreboard";
	
	let i = 6; // max. amount of player scores in the list
	
	if(scoreUnit.length > i) {
		let ithPlace =
			JSON.parse(localStorage.Scores)
			.sort(sortFunction).slice(0,i)[i-1][0];
		if (points > ithPlace) {
			highscoreModal.show();
		} else {
			scoreProcessor();
			if (scoreUnit.length > i) scoreUnit.sort(sortFunction).splice(-1);
			scoresheetModal.show();
		}
	} else {
			highscoreModal.show();
		}
		scoreUnit.sort(sortFunction).splice(i)
}

function processUserInput() {
	let input = document.getElementById("playerName");
	scoreUnit.push([points, input.value]);
	scoreProcessor();
}

function scoreProcessor() {
	localStorage.setItem("Scores", JSON.stringify(scoreUnit));
	scores = JSON.parse(localStorage.Scores);
	scores = scores.sort(sortFunction);
	scoresheet.innerHTML = "";
	
	for (let i = 0; i < scores.length; i++) {
		scoresheet.innerHTML +=
			"<div class='player'>" +
				"<span class='name'>" +
					scores[i][1] +
				"</span>" +
				"<span class='score'>" +
					scores[i][0] +
				"</span>" +
			"</div>";
	}
}

function closeScorelist() {
	highscoreModal.hide();
	scoresheetModal.hide();
	setStage();
}
