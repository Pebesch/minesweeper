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
    if(board[randomRowIndex][randomColumnIndex] !== 'B'){
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }


  return board;
}

const getNumberOfNeighborBobms = (bombBoard, rowIndex, columnIndex) = {
  var neighborOffsets = [
    [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
  ];
  var numberOfRows = bombBoard.lentgh;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;

  neighborOffsets.forEach((offset) => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex > 0 && neighborColumnIndex < numberOfColumns){
      if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  } else if(bombBoard[rowIndex][columnIndex] === 'B'){
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBobms(bombBoard, rowIndex, columnIndex);
  }
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
flipTile(playerBoard, bombBoard, 0, 0);
console.log("updated player board: ");
printBoard(playerBoard);
