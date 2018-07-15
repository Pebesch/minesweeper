const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  var board = [];
  for(var rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    var row = [];
    for(var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

console.log(generatePlayerBoard(4,4));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  var board = [];
  for(var rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    var row = [];
    for(var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(null);
    }
    board.push(row);
  }

  var numberOfBombsPlaced = 0;
  while(numberOfBombsPlaced < numberOfBombs){
    var randomRowIndex = Math.floor(Math.random() * (numberOfRows));
    var randomColumnIndex = Math.floor(Math.random() * (numberOfColumns));
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }


  return board;
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('playerBoard: ');
printBoard(playerBoard);
console.log('bombBoard: ');
printBoard(bombBoard);
