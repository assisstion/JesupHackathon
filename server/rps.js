

export class RPS {
  constructor(p0, p1) {
    this.p0.rock = false;
    this.p0.paper = false;
    this.p0.scissors = false;
    this.p0.win = false;
    this.p0.hasUpdated = false;

    this.p1.rock = false;
    this.p1.paper = false;
    this.p1.scissors = false;
    this.p1.win = false;
    this.p1.hasUpdated = false;
  }

  //Player One actions
  //
  randomThrowOne() {
    rngesus = Math.random();
    if (rngesus <= 0.33) {
      this.p0.rock = true;
      this.p0.paper = false;
      this.p0.scissors = false;
    } else if (rngesus > 0.33 && rngesus <= 0.66) {
      this.p0.rock = false;
      this.p0.paper = true;
      this.p0.scissors = false;
    } else if (rngesus > 0.66) {
      this.p0.rock = false;
      this.p0.paper = false;
      this.p0.scissors = true;
    }
  }
  //
  setThrowOne(throwNumber) {
    if (throwNumber == 1) {
      this.p0.rock = true;
      this.p0.paper = false;
      this.p0.scissors = false;
    } else if (throwNumber == 2) {
      this.p0.rock = false;
      this.p0.paper = true;
      this.p0.scissors = false;
    } else if (throwNumber == 3) {
      this.p0.rock = false;
      this.p0.paper = false;
      this.p0.scissors = true;
    } else {
      this.randomThrowOne();
    }
  }

  //Player Two actions
  //
  randomThrowTwo() {
    rngesus = Math.random();
    if (rngesus <= 0.33) {
      this.p1.rock = true;
      this.p1.paper = false;
      this.p1.scissors = false;
    } else if (rngesus > 0.33 && rngesus <= 0.66) {
      this.p1.rock = false;
      this.p1.paper = true;
      this.p1.scissors = false;
    } else if (rngesus > 0.66) {
      this.p1.rock = false;
      this.p1.paper = false;
      this.p1.scissors = true;
    }
  }
  //
  setThrowTwo(throwNumber) {
    if (throwNumber == 1) {
      this.p1.rock = true;
      this.p1.paper = false;
      this.p1.scissors = false;
    } else if (throwNumber == 2) {
      this.p1.rock = false;
      this.p1.paper = true;
      this.p1.scissors = false;
    } else if (throwNumber == 3) {
      this.p1.rock = false;
      this.p1.paper = false;
      this.p1.scissors = true;
    } else {
      this.randomThrowTwo();
    }
  }


  //Initiate combat
  //
  play() {
    if (this.p0.rock == true) {
      if (this.p1.rock == true) {
        this.p0.win = false;
        this.p1.win = false;
      } else if (this.p1.paper == true) {
        this.p0.win = false;
        this.p1.win = true;
      } else if (this.p1.scissors == true) {
        this.p0.win = true;
        this.p1.win = false;
      }
    }

    if (this.p0.paper == true) {
      if (this.p1.rock == true) {
        this.p0.win = true;
        this.p1.win = false;
      } else if (this.p1.paper == true) {
        this.p0.win = false;
        this.p1.win = false;
      } else if (this.p1.scissors == true) {
        this.p0.win = false;
        this.p1.win = true;
      }
    }

    if (this.p0.scissors == true) {
      if (this.p1.rock == true) {
        this.p0.win = false;
        this.p1.win = true;
      } else if (this.p1.paper == true) {
        this.p0.win = true;
        this.p1.win = false;
      } else if (this.p1.scissors == true) {
        this.p0.win = false;
        this.p1.win = false;
      }
    }
    checkForWinner();
  }

  //Check for winner and (not implemented) exit game
  //
  // checkForWinner() {
  //   if (this.p0.win == true) {
  //     console.log('Player One wins!');
  //     console.log('Player Two loses!');
  //   }
  //   if (this.p1.win == true) {
  //     console.log('Player Two wins!');
  //     console.log('Player One loses!');
  //   }
  // }

  start() {
    this.p0.hasUpdated == false;
    this.p0.hasUpdated == false;
  }


  update(player, data) {
    let move = data.move;
    if (player == 0) {
      setThrowOne(move);
      this.p0.hasUpdated == true;
      sendServer(move);
    }
    if (player == 1) {
      setThrowTwo(move);
      this.p1.hasUpdated == true;
      sendServer(move);
    }
    if(this.p0.hasUpdated && this.p1.hasUpdated){
      play();
      let winner;
      let loser;
      if(this.p0.win){
        winner = 0;
        loser = 1;
      }
      else{
        winner = 1;
        loser = 0;
      }
      server.sendClient(winner, {
        message: 'win'
      });
      server.sendClient(loser, {
        message: 'lose'
      });
    }
  }


















}
