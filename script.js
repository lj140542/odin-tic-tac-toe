const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const setName = (newName) => name = newName;
  return { name, symbol, getName, getSymbol, setName };
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
    turnDisplay.innerHTML = `${currentPlayer.getName()}'s turn`;
  };
  const displayVictory = (winningArray) => {
    turnDisplay.innerHTML = `${currentPlayer.getName()} wins !`;
    restartInstructions.innerHTML = '(click on the board to restart the game)';
    restartInstructions.classList.add('visible');
    buttons.forEach(button => {
      button.removeEventListener('click', GameBoard.turnPlayed);
      button.addEventListener('click', GameBoard.restart);
      if (winningArray.indexOf(button.id) == -1) {
        button.classList.toggle('shrink');
      }
    });
  };
  const displayDraw = () => {
    turnDisplay.innerHTML = 'Draw !';
    restartInstructions.innerHTML = '(click on the board to restart the game)';
    restartInstructions.classList.add('visible');
    buttons.forEach(button => {
      button.classList.toggle('shrink');
      button.removeEventListener('click', GameBoard.turnPlayed);
      button.addEventListener('click', GameBoard.restart);
    });
  };
  return { displayBoard, displayTurn, displayVictory, displayDraw };
})();

const GameBoard = (() => {
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let gameArray = [['', '', ''], ['', '', ''], ['', '', '']];
  let turnCpt = 1;
  const getGameArray = () => gameArray;
  const turnPlayed = (event) => {
    let buttonId = event.target.id;
    let button = document.getElementById(buttonId);
    let row = button.dataset.row - 1;
    let col = button.dataset.col - 1;
    let winningArray = [];

    if (gameArray[row][col] == '') {
      gameArray[row][col] = currentPlayer.getSymbol();
      DisplayController.displayBoard();
      winningArray = checkVictory();
      if (winningArray.length == 0) {
        if (turnCpt == 9) {
          DisplayController.displayDraw();
        }
        else {
          turnCpt++;
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          DisplayController.displayTurn();
        }
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
  const restart = () => {
    gameArray = [['', '', ''], ['', '', ''], ['', '', '']];
    turnCpt = 1;
    currentPlayer = getRandomPlayer();

    restartInstructions.innerHTML = '';
    restartInstructions.classList.remove('visible');
    buttons.forEach(button => {
      button.classList.remove('shrink');
      button.removeEventListener('click', GameBoard.restart);
      button.addEventListener('click', GameBoard.turnPlayed)
    });

    DisplayController.displayTurn();
    DisplayController.displayBoard();

  };
  const start = (e) => {
    let name1 = document.getElementById('player1-name');
    let name2 = document.getElementById('player2-name');

    // prevent further processing until both names are entered
    if (name1.value == '' || name2.value == '') {
      return false;
    }

    player1.setName(name1.value);
    player2.setName(name2.value);
    currentPlayer = getRandomPlayer();

    DisplayController.displayTurn();
    DisplayController.displayBoard();

    boardContainer.classList.toggle('visible');
    playersConfiguration.classList.toggle('hide');

    e.preventDefault();
  };
  const getRandomPlayer = () => {
    return Math.floor(Math.random() * 2) == 0 ? player1 : player2;
  };
  return { getGameArray, turnPlayed, restart, start };
})();

const buttons = Array.from(document.getElementsByClassName('board-button'));
const turnDisplay = document.getElementById('display-turn');
const restartInstructions = document.getElementById('restart-instructions');
const playersConfiguration = document.getElementById('players-configuration');
const startButton = document.getElementById('start-button');
const boardContainer = document.getElementById('board-container');
let currentPlayer;

buttons.forEach(button => {
  button.addEventListener('click', GameBoard.turnPlayed);
});
startButton.addEventListener('click', e => GameBoard.start(e));
