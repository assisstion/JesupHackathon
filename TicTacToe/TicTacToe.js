board = [];//board state
playerTurn = 1; //keeps track of player playerTurn
//add in which player is which symbol

const X_IMG = "img/x.png";
const O_IMG = "img/o.png";
const BOX_IMG = "img/box.img";

for (var i = 0; i < 3; i ++) {
	board[i] = [0,0,0];
}

function tttClick(x, y, id) {
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
		if (tttCheckWin(x, y, playerTurn)) {
			alert("Player " + playerTurn + " Wins!");
		}
	}
}

function tttCheckWin(x, y, player) {
	// check row
	var win = true;
	for (var i = 0; i < 3; i++) {
		if (board[i][y] != player) {
			win = false;
		}
	}
	if (win) {
		return true;
	}

	// check column
	var win = true;
	for (var j = 0; j < 3; j++) {
		if (board[x][j] != player) {
			win = false;
		}
	}
	if (win) {
		return true;
	}

	// check diagonals
	if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
		return true;
	}
	if (board[2][0] == player && board[1][1] == player && board[0][2] == player) {
		return true;
	}

	return false;
}

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
