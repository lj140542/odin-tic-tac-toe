const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { name, symbol, getName, getSymbol };
};

const DisplayController = (() => {
  const displayBoard = () => {
    let buttonIndex = 0;
    let board = GameBoard.getGameArray();
    board.forEach(function (row) {
      row.forEach(function (col) {
        buttons[buttonIndex].innerHTML = col;
        buttonIndex++;
      })
    });
  };
  const resetBoard = () => {
    buttons.forEach(button => {
      button.innerHTML = ""
    });
  };
  const displayTurn = () => {
    turnDisplay.innerHTML = `${currentPlayer.getName()} turn`;
  };
  const displayVictory = (winningArray) => {
    turnDisplay.innerHTML = `${currentPlayer.getName()} wins !`;
    console.log(winningArray);
    buttons.forEach(button => {
      console.log(`id:${button.id} | index:${winningArray.indexOf(button.id)}`);
      if (winningArray.indexOf(button.id) == -1) {
        button.classList.toggle('shrink');
      }
    });
  };
  return { displayBoard, displayTurn, displayVictory };
})();

const GameBoard = (() => {
  let gameArray = [['', '', ''], ['', '', ''], ['', '', '']];
  const getGameArray = () => gameArray;
  const reset = () => {
    gameArray = [];
  };
  const turnPlayed = (buttonId) => {
    let button = document.getElementById(buttonId);
    let row = button.dataset.row - 1;
    let col = button.dataset.col - 1;
    let winningArray = [];

    if (gameArray[row][col] == '') {
      gameArray[row][col] = currentPlayer.getSymbol();
      DisplayController.displayBoard();
      winningArray = checkVictory();
      if (winningArray.length == 0) {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        DisplayController.displayTurn();
      }
      else { DisplayController.displayVictory(winningArray); }
    }
  };
  const checkVictory = () => {
    // .. returns the ids of the buttons that represents the win
    let symbol = currentPlayer.getSymbol();

    // check for the rows 
    if (gameArray[0][0] == symbol &&
      gameArray[0][1] == symbol &&
      gameArray[0][2] == symbol) { return ['1', '2', '3']; } // .. 1st row
    if (gameArray[1][0] == symbol &&
      gameArray[1][1] == symbol &&
      gameArray[1][2] == symbol) { return ['4', '5', '6']; } // .. 2nd row
    if (gameArray[2][0] == symbol &&
      gameArray[2][1] == symbol &&
      gameArray[2][2] == symbol) { return ['7', '8', '9']; } // .. 3rd row
    // check for the cols
    if (gameArray[0][0] == symbol &&
      gameArray[1][0] == symbol &&
      gameArray[2][0] == symbol) { return ['1', '4', '7']; } // .. 1st col
    if (gameArray[0][1] == symbol &&
      gameArray[1][1] == symbol &&
      gameArray[2][1] == symbol) { return ['2', '5', '8']; } // .. 2nd col
    if (gameArray[0][2] == symbol &&
      gameArray[1][2] == symbol &&
      gameArray[2][2] == symbol) { return ['3', '6', '9']; } // .. 3rd col
    // check for the diagonals
    if (gameArray[0][0] == symbol &&
      gameArray[1][1] == symbol &&
      gameArray[2][2] == symbol) { return ['1', '5', '9']; } // .. 1st diagonal
    if (gameArray[0][2] == symbol &&
      gameArray[1][1] == symbol &&
      gameArray[2][0] == symbol) { return ['3', '5', '7']; } // .. 2nd diagonal

    return [];
  };
  return { getGameArray, turnPlayed };
})();

const buttons = Array.from(document.getElementsByClassName('board-button'));
const turnDisplay = document.getElementById('display-turn');
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
let currentPlayer = player1;

buttons.forEach(button => {
  button.addEventListener('click', e => GameBoard.turnPlayed(e.target.id))
});

DisplayController.displayTurn();
DisplayController.displayBoard();
