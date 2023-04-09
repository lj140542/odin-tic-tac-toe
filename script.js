const buttons = document.getElementsByClassName('board-button');
const turnDisplay = document.getElementById('display-turn');

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { name, symbol, getName, getSymbol };
};

const DisplayController = (() => {
  const displayBoard = () => {
    let board = GameBoard.getGameArray();
    board.forEach(function (cell, index) {
      buttons[index].innerHTML = cell;
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
  const turnPlayed = (buttonId) => {
    button = document.getElementById(buttonId);
    if (button.innerHTML == '') {
      button.innerHTML = currentPlayer.getSymbol();
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      displayTurn();
    }
  };
  return { displayBoard, resetBoard, displayTurn, turnPlayed };
})();

const GameBoard = (() => {
  let GameArray = ['', '', '', '', '', '', '', '', ''];
  const getGameArray = () => GameArray;
  const reset = () => {
    GameArray = [];
  };
  return { getGameArray, reset };
})();

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
let currentPlayer = player1;

Array.from(buttons).forEach(button => {
  button.addEventListener('click', e => DisplayController.turnPlayed(e.target.id))
});

DisplayController.displayTurn();
DisplayController.displayBoard();
