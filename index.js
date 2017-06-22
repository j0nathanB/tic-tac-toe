const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const winningMoves = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]];

let init = true;
let turn = true;
let player_1;
let player_2;
let winner;  

function Player(piece) {
  this.piece = piece;
  this.moves = [];
}

function Board () {
  this.board = new Array(9);

  this.place = (inputPos, player) => {
    let internalPos = inputPos - 1;
    //for printing board at game start
    if (!player) {
      player = inputPos;
    }

    this.board.splice(internalPos, 1, player);
  }

  this.clean = () => {
    for(let i = 0; i < this.board.length; i++){
      this.board.splice(i, 1, ' ');
    }
  }

  this.print = () => {
    //print placeholders
    for(let i = 0; i < this.board.length; i++) {
      if (init) {
        this.board[i] = i + 1
      } else if (this.board[i] !== 'X' && this.board[i] !== 'O') {
        this.board[i] = " ";
      }
    }
      console.log(`   |   |   `);
      console.log(` ${this.board[0]} | ${this.board[1]} | ${this.board[2]} `)
      console.log(`___|___|___`);
      console.log(`   |   |   `);
      console.log(` ${this.board[3]} | ${this.board[4]} | ${this.board[5]} `)
      console.log(`___|___|___`);
      console.log(`   |   |   `);
      console.log(` ${this.board[6]} | ${this.board[7]} | ${this.board[8]} `)
      console.log(`   |   |   `);      
  }
}

let gameBoard = new Board();

const gameStart = () => {
  gameBoard.print();

  player_1 = new Player('X'); 
  player_2 = new Player('O');
  init = false;

  gameBoard.clean();
}

const onPlayerTurn = () => {
  let player;
  let place;
  
  turn ? player = player_1 : player = player_2;
  
  if(!winner){
    rl.question('\nPick a square: ', (input) => {
      place = Number.parseInt(input);
      
      if (place) {
        if(gameBoard.board[place - 1] === ' ') {
          player.moves.push(place);
          gameBoard.place(place, player.piece);
          gameBoard.print();      
          turn = !turn;
        } else if (gameBoard.board[place - 1].length === 1) {
          console.log('> Invalid move. Please try again.')
          //gameBoard.print();    
        }

        if (player.moves.length >= 3 && isWinner(player)) {
          winner = player.piece;
          console.log(`\n${winner} wins the game!`)
          rl.close();
        }

        if (player.moves.length > 4) {
          rl.close();
          console.log(`Tie game!`)
        }      
      } else {
        console.log('> Invalid input. Please enter a number (1-9).')
      }

       onPlayerTurn();
    });
  }
}

const isWinner = (player) => {
  let result = false;

  winningMoves.forEach(    
    winningSet => { 
      let check = () => {
        return winningSet.every( 
          move => player.moves.includes(move)
        )
      }

      if(check()) {
        result = true;
      }
    }
  )
  return result;
}

gameStart();
onPlayerTurn();






