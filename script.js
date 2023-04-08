const buttons = document.getElementsByTagName('button');

const Player = (name) => {
  const getName = () => name;
};

const DisplayController = (() => {
  const display = () => {
    let board = GameBoard.getGameArray();
    board.forEach(function (cell, index) {
      buttons[index].innerHTML = cell;
    });
  };
  const reset = () => {
    Array.from(buttons).forEach(button => {
      button.innerHTML = ""
    });
  };
  return { display, reset };
})();

const GameBoard = (() => {
  let GameArray = ['', '', '', '', 'X', '', '', '', ''];
  const getGameArray = () => GameArray;
  const reset = () => {
    GameArray = [];
  };
  return { getGameArray, reset };
})();

DisplayController.display();
