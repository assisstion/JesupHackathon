var board = [];
var playerTurn = 1;
const X_IMG = "img/x.png";
const O_IMG = "img/o.png";
const BOX_IMG = "img/box.img";

for (var i = 0; i < 19; i++) {
	board[i] = [];
	for (var j = 0; j < 19; j++) {
		board[i][j] = 0;
	}
}

function gomokuClick(x, y ,id) {
	var button = document.getElementById(id);
	if (board[x][y] == 0) {
		if (playerTurn == 1) {
			button.src = X_IMG;
			playerTurn = 2;
		} else {
			button.src = O_IMG;
			playerTurn = 1;
		}
		board[x][y] = playerTurn;
		if (gomokuCheckWin(x, y, playerTurn)) {
			alert("Player " + playerTurn + " Wins!");
		}
	}
}

function gomokuCheckWin(x, y, player){
	// horizontal
	var isCounting = false;
	var count = 0;
	for (var i = 0; i < 19; i++) {
		if (board[i][y] == player) {
			if (isCounting) {
				count++;
				if (count == 5) {
					return true;
				}
			} else {
				isCounting = true;
				count++;
			}
		} else {
			isCounting = false;
			count = 0;
		}
	}

	// vertical
	var isCounting = false;
	var count = 0;
	for (var i = 0; i < 19; i++) {
		if (board[x][i] == player) {
			if (isCounting) {
				count++;
				if (count == 5) {
					return true;
				}
			} else {
				isCounting = true;
				count++;
			}
		} else {
			isCounting = false;
			count = 0;
		}
	}

	// diagonal up-right
	var isCounting = false;
	var count = 0;

	// find starting place of diagonal
	var currentX = x;
	var currentY = y;
	while(true) {
		if (currentX == 0 || currentY == 18) {
			break;
		}
		currentX--;
		currentY++;
	}

	for (var i = 0; i < 19; i++) {
		if (board[currentX + i][currentY - i] == player) {
			if (isCounting) {
				count++;
				if (count == 5) {
					return true;
				}
			} else {
				isCounting = true;
				count++;
			}
		} else {
			isCounting = false;
			count = 0;
		}
	}

	// diagonal up-left
	var isCounting = false;
	var count = 0;

	// find starting place of diagonal
	var currentX = x;
	var currentY = y;
	while(true) {
		if (currentX == 18 || currentY == 18) {
			break;
		}
		currentX++;
		currentY++;
	}

	for (var i = 0; i < 19; i++) {
		if (board[currentX - i][currentY - i] == player) {
			if (isCounting) {
				count++;
				if (count == 5) {
					return true;
				}
			} else {
				isCounting = true;
				count++;
			}
		} else {
			isCounting = false;
			count = 0;
		}
	}

	return false;
}

// server stuff
function isFirstPlayerturn(){
	if(playerTurn == 1){
		return true;
	}
	else{
		alert("It's not your turn!");
		return false;
	}
}

function isSecondPlayerturn(){
	if(!isFirstPlayerturn()){
		return true;
	}
	else{
		alert("It's not your turn!");
		return false;
	}
}
