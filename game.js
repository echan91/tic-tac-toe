const rl = require('readline-sync');

class TicTacToe {
  constructor() {
    this.player = 'x';
    this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.moves = 0;
  }
  printBoard() {
    console.log(`${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`);
    console.log(`${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`);
    console.log(`${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`);
  }

  convertToColRow(place) {
    return {
      col: Math.floor((place-1) / 3),
      row: (place-1) % 3
    };
  }

  threePlacesEqual(a, b, c) {
    return a === b && a === c;
  }

  checkColWinner(col) {
    return this.threePlacesEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
  }

  checkRowWinner(row) {
    return this.threePlacesEqual(this.board[row][1], this.board[row][2], this.board[row][3]);
  }

  checkDiagnalWinner() {
    return this.threePlacesEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.threePlacesEqual(this.board[0][2], this.board[1][1], this.board[2][0])
  }

  checkWinner(col, row) {
    return this.checkColWinner(col) || this.checkRowWinner(row) || this.checkDiagnalWinner();
  }

  checkDraw() {
    return this.moves === 9;
  }
  validMove(move) {
    const {col, row} = this.convertToColRow(move);
    if (move === undefined) {
      return false;
    }
    return typeof this.board[row][col] === 'number';
  }
  makeMove() {
    let move;
    while (!this.validMove(move)){
      move = rl.question('Please input a valid space between 1-9');
    }
    this.moves++;
    return this.convertToColRow(move);
  }
  switchPlayers() {
    this.player = this.player === 'x' ? 'o' : 'x';
  }
  placePiece(col, row) {
    this.board[row][col] = this.player;
  }
  playGame() {
    this.printBoard();
    const {col, row} = this.makeMove();
    this.placePiece(col, row);
    if (this.checkWinner(col, row)) {
      this.printBoard();
      return console.log(`${this.player} has won the game!`)
    } else if (this.checkDraw()) {
      this.printBoard();
      return console.log(`Tie game!`)
    } else {
      this.switchPlayers();
      this.playGame();
    }
  }
}

const game = new TicTacToe();
game.playGame();
