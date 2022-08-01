/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // DONE: set "board" to empty HEIGHT x WIDTH matrix array
  for(let h=0; h<HEIGHT; h++){
    board[h]=[]
    for(let w=0; w<WIDTH; w++){
      board[h].push('empty')
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById('board')
  // DONE: add comment for this code
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);//sets up top row and onclick handler

  for (var x = 0; x < WIDTH; x++) { //creates, ids, then appends topmost row
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);//creates and appends top row to board

  // DONE: add comment for this code
  for (var y = (HEIGHT-1); y>=0 ; y--) {//creates game board by looping through y direction
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {//nested x loop creates x row for y position
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);//id set to match board[][] callouts
      row.append(cell);
      
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // DONE: write the real version of this, rather than always returning 0
  for (let y=0; y<HEIGHT ;y++){
    if (board[y][x]=='empty'){
      return (y)
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    board[x][y] = currPlayer
  const piece=document.createElement("div")

  piece.setAttribute("class",'piece p'+`${currPlayer}`)
  const space= document.getElementById(`${y}-${x}`)
  space.appendChild(piece)
  // DONE: make a div and insert into correct table cell
}

/** endGame: announce game end */
function endGame(msg) {
  window.alert(msg)
  // DONE: pop up alert message
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(x, y);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // DONE: switch currPlayer 1 <-> 2
  if (currPlayer== 1){
    currPlayer=2
    return
  }else if (currPlayer==2){
    currPlayer=1
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //checks along x-axis, creates array of arrays
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //checks along y-axis
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // checks UP-RIGHT Diagonal
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // checks UP-LEFT Diagonal

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {  // just very long if/or/or/or statement
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

