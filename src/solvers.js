/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = 0;
  var board = new Board({n:n});
  var column = {};

  var recursiveRook = function (b, currentRow) {
    for (var col = 0; col < n; col++) {
      if (column[col] !== true) {
        b.togglePiece(currentRow, col);
        column[col] = true;
        // if(!column[col]){
        //   b.togglePiece(currentRow, col);
        //   continue;
        // }
        if (currentRow === n - 1) {
          solutions++;
        } else {
          recursiveRook(b, currentRow + 1);
        }
        b.togglePiece(currentRow, col);
        column[col] = false;
      }
    }
  };
  if(n>0){
    recursiveRook(board, 0);
  }
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutions;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var board = new Board({n:n});
  var column = {};
  var minorDiags = {};
  var majorDiags = {};

  var recursiveQueen = function (b, currentRow) {
    for (var col = 0; col < n; col++) {
      if (column[col] !== true && majorDiags[col - currentRow] !== true && minorDiags[col + currentRow] !== true) {
        b.togglePiece(currentRow, col);
        column[col] = true;
        majorDiags[col - currentRow] = true;
        minorDiags[col + currentRow] = true;
        if (currentRow === n - 1) {
          solutions.push(b);
          return;
        } else {
          recursiveQueen(b, currentRow + 1);
        }
        b.togglePiece(currentRow, col);
        column[col] = false;
        majorDiags[col - currentRow] = false;
        minorDiags[col + currentRow] = false;
      }
    }
  };
  if(n>0){
    recursiveQueen(board, 0);
  }

  return solutions;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = 0;
  var board = new Board({n:n});
  var column = {};
  var minorDiags = {};
  var majorDiags = {};

  var recursiveQueen = function (b, currentRow) {
    for (var col = 0; col < n; col++) {
      if (column[col] !== true && majorDiags[col - currentRow] !== true && minorDiags[col + currentRow] !== true) {
        b.togglePiece(currentRow, col);
        column[col] = true;
        majorDiags[col - currentRow] = true;
        minorDiags[col + currentRow] = true;
        if (currentRow === n - 1) {
          solutions++;
        } else {
          recursiveQueen(b, currentRow + 1);
        }
        b.togglePiece(currentRow, col);
        column[col] = false;
        majorDiags[col - currentRow] = false;
        minorDiags[col + currentRow] = false;
      }
    }
  };
  if(n>0){
    recursiveQueen(board, 0);
  } else if (n === 0){
    return 1;
  }
  return solutions;
};
