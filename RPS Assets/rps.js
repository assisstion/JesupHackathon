

export class RPS {
  constructor(player1, player2) {
    this.player1.rock = false;
    this.player1.paper = false;
    this.player1.scissors = false;
    this.player1.win = false;

    this.player2.rock = false;
    this.player2.paper = false;
    this.player2.scissors = false;
    this.player2.win = false;
  }

  //Player One actions
  //
  randomThrowOne() {
    rngesus = Math.random();
    if (rngesus <= 0.33) {
      this.player1.rock = true;
      this.player1.paper = false;
      this.player1.scissors = false;
    } else if (rngesus > 0.33 && rngesus <= 0.66) {
      this.player1.rock = false;
      this.player1.paper = true;
      this.player1.scissors = false;
    } else if (rngesus > 0.66) {
      this.player1.rock = false;
      this.player1.paper = false;
      this.player1.scissors = true;
    }
  }
  //
  setThrowOne(throwNumber) {
    if (throwNumber == 1) {
      this.player1.rock = true;
      this.player1.paper = false;
      this.player1.scissors = false;
    } else if (throwNumber == 2) {
      this.player1.rock = false;
      this.player1.paper = true;
      this.player1.scissors = false;
    } else if (throwNumber == 3) {
      this.player1.rock = false;
      this.player1.paper = false;
      this.player1.scissors = true;
    } else {
      this.randomThrowOne();
    }
  }

  //Player Two actions
  //
  randomThrowTwo() {
    rngesus = Math.random();
    if (rngesus <= 0.33) {
      this.player2.rock = true;
      this.player2.paper = false;
      this.player2.scissors = false;
    } else if (rngesus > 0.33 && rngesus <= 0.66) {
      this.player2.rock = false;
      this.player2.paper = true;
      this.player2.scissors = false;
    } else if (rngesus > 0.66) {
      this.player2.rock = false;
      this.player2.paper = false;
      this.player2.scissors = true;
    }
  }
  //
  setThrowTwo(throwNumber) {
    if (throwNumber == 1) {
      this.player2.rock = true;
      this.player2.paper = false;
      this.player2.scissors = false;
    } else if (throwNumber == 2) {
      this.player2.rock = false;
      this.player2.paper = true;
      this.player2.scissors = false;
    } else if (throwNumber == 3) {
      this.player2.rock = false;
      this.player2.paper = false;
      this.player2.scissors = true;
    } else {
      this.randomThrowTwo();
    }
  }


  //Initiate combat
  //
  play() {
    if (this.player1.rock == true) {
      if (this.player2.rock == true) {
        this.player1.win = false;
        this.player2.win = false;
      } else if (this.player2.paper == true) {
        this.player1.win = false;
        this.player2.win = true;
      } else if (this.player2.scissors == true) {
        this.player1.win = true;
        this.player2.win = false;
      }
    }

    if (this.player1.paper == true) {
      if (this.player2.rock == true) {
        this.player1.win = true;
        this.player2.win = false;
      } else if (this.player2.paper == true) {
        this.player1.win = false;
        this.player2.win = false;
      } else if (this.player2.scissors == true) {
        this.player1.win = false;
        this.player2.win = true;
      }
    }

    if (this.player1.scissors == true) {
      if (this.player2.rock == true) {
        this.player1.win = false;
        this.player2.win = true;
      } else if (this.player2.paper == true) {
        this.player1.win = true;
        this.player2.win = false;
      } else if (this.player2.scissors == true) {
        this.player1.win = false;
        this.player2.win = false;
      }
    }
    checkForWinner();
  }

  //Check for winner and (not implemented) exit game
  //
  checkForWinner() {
    if (this.player1.win == true) {
      console.log('Player One wins!');
      console.log('Player Two loses!');
    }
    if (this.player2.win == true) {
      console.log('Player Two wins!');
      console.log('Player One loses!');
    }
  }

















}
