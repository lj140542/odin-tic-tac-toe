const buttons = document.getElementsByClassName('board-button');
const turnDisplay = document.getElementById('display-turn');

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
    Array.from(buttons).forEach(button => {
      button.innerHTML = ""
    });
  };
  const displayTurn = () => {
    turnDisplay.innerHTML = `${currentPlayer.getName()} turn`;
  };
  return { displayBoard, resetBoard, displayTurn };
})();

const GameBoard = (() => {
  let gameArray = [['', '', ''], ['', '', ''], ['', '', '']];
  const getGameArray = () => gameArray;
  const reset = () => {
    gameArray = [];
  };
  const turnPlayed = (buttonId) => {
    button = document.getElementById(buttonId);
    if (button.innerHTML == '') {
      button.innerHTML = currentPlayer.getSymbol();
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      DisplayController.displayTurn();
    }
  };
  return { getGameArray, reset, turnPlayed };
})();

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
let currentPlayer = player1;

Array.from(buttons).forEach(button => {
  button.addEventListener('click', e => GameBoard.turnPlayed(e.target.id))
});

DisplayController.displayTurn();
DisplayController.displayBoard();
