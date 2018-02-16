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

	//Check if the case exists

	//horizontal right
	if (x + 5 < 19) {
		var win = true;
		for(var i = 0; i < 5; i++) {
			if (board[x + i][y] != player) {
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//horizontal left
	if (x - 5 > -1){
		var win = true;
		for (var i = 0; i < 5; i++) {
			if (board[x - i][y] != player) {
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//vertical up
	if (y - 5 > -1){
		var win = true;
		for (var i = 0; i < 5; i++){
			if (board[x][y - i] != player){
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//vertical down
	if (y + 5 < 19) {
		var win = true;
		for (var i = 0; i < 5; i++){
			if (board[x][y + i] != player){
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//diag top right
	if (x + 5 < 19 && y - 5 > -1 ) {
		var win = true;
		for (var i = 0; i < 5; i++) {
			if (board[x+i][y-i] != player) {
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//diag top left
	if (x - 5 > -1 && y - 5 > -1) {
		var win = true;
		for (var i = 0; i < 5; i++) {
			if (board[x - i][y - i] != player){
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//diag bottom right
	if (x + 5 < 19 && y + 5 < 19) {
		var win = true;
		for (var i = 0; i < 5; i++) {
			if (board[x+i][y+i] != player) {
				win = false;
			}
		}
	}
	if (win) {
		return true;
	}
	//diag bottom left
	if (x - 5 > -1 && y + 5 < 19) {
		var win = true;
		for (var i = 0; i < 5; i++) {
			if (board[x-i][y+i] != player) {
				win=false;
			}
		}
	}
	if (win) {
		return true;
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
