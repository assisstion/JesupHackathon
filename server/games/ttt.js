const server = require('../server.js');

module.exports = {
  getInstance: function(){
    return new TTT();
  },
  getInfo: function(){
    let data = {
      playerCount: 2
    };
    return data;
  }
}

class TTT {
  constructor() {
    this.board = [];
    this.playerTurn = 1;
    this.gameOver = false;

    for (var i = 0; i < 3; i ++) {
    	this.board[i] = [0,0,0];
    }
  }

  start(roomId, playerCount, initData) {
    this.roomId = roomId;
  }

  update(player, data) {
    if(this.gameOver){
      return;
    }
    if(this.playerTurn == player + 1){
      let x = data.x;
      let y = data.y;
      this.tryClick(x, y);
    }
  }

  tryClick(x, y) {
  	if (this.board[x][y] == 0) {
  		if (this.playerTurn == 1) {
        server.sendClient(this.roomId, this.otherPlayer(this.playerTurn) - 1, {
          message: 'ximg',
          'x': x,
          'y': y
        });
        server.sendClient(this.roomId, this.playerTurn - 1, {
          message: 'ximg',
          'x': x,
          'y': y
        });
  			this.playerTurn = 2;
  		} else {
        server.sendClient(this.roomId, this.otherPlayer(this.playerTurn) - 1, {
          message: 'oimg',
          'x': x,
          'y': y
        });
        server.sendClient(this.roomId, this.playerTurn - 1, {
          message: 'oimg',
          'x': x,
          'y': y
        });
  			this.playerTurn = 1;
  		}
  		this.board[x][y] = this.playerTurn;
  		if (this.tttCheckWin(x, y, this.playerTurn)) {
        let loser = this.playerTurn;
        let winner = this.otherPlayer(this.playerTurn);
        server.sendClient(this.roomId, winner - 1, {
          message: 'win'
        });
        server.sendClient(this.roomId, loser - 1, {
          message: 'lose'
        });
        this.gameOver = true;
  		}
  	}
  }

  tttCheckWin(x, y, player) {
  	// check row
  	var win = true;
  	for (var i = 0; i < 3; i++) {
  		if (this.board[i][y] != player) {
  			win = false;
  		}
  	}
  	if (win) {
  		return true;
  	}

  	// check column
  	var win = true;
  	for (var j = 0; j < 3; j++) {
  		if (this.board[x][j] != player) {
  			win = false;
  		}
  	}
  	if (win) {
  		return true;
  	}

  	// check diagonals
  	if (this.board[0][0] == player && this.board[1][1] == player && this.board[2][2] == player) {
  		return true;
  	}
  	if (this.board[2][0] == player && this.board[1][1] == player && this.board[0][2] == player) {
  		return true;
  	}

  	return false;
  }

  otherPlayer(i){
    if(i == 1){
      return 2;
    }
    else{
      return 1;
    }
  }
}
