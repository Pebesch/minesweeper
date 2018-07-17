export class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    } else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBobms(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBobms(rowIndex, columnIndex) {
    var neighborOffsets = [
      [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
    ];
    var numberOfRows = this._bombBoard.length;
    var numberOfColumns = this._bombBoard[0].length;
    var numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if(neighborRowIndex >= 0 && neighborColumnIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex < numberOfColumns){
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfBombs === this._numberOfTiles;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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

   static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
     console.log();
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
        if(board[randomRowIndex][randomColumnIndex] !== 'B'){
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
}
