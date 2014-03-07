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

  // var solution = [];
  // if (n === 1) {
  //   return [0, 0];
  //   // returns a length 2 array where index 0 is the row and index 1 is the column.
  //   // return position of the where rook is at 
  //   // return new Board({n: 1});
  //   // solution.push(new Board([1]));
  // } else {
  //   for (var row = 0; row < n; row++) {
  //     for (var col = 0; col < n; col++) {
  //       var board = new Board({n: n}); // can be generalized by using the value of n (i.e. {n: n})
  //       board.togglePiece(row, col);
  //       var lowerSolution = findNRooksSolution(n - 1);
  //       // lowerSolutions will produce an array of valid rook positions in the context of the smaller findNRook problem
  //       for (var rookPositions = 0; rookPositions < lowerSolution.length; rookPositions++) {
  //         if (lowerSolution[rookPositions][0] === row) {
  //           lowerSolution[rookPositions][0] += 1;
  //         }
  //         if (lowerSolution[rookPositions][1] === col) {
  //           lowerSolution[rookPositions][1] += 1;
  //         }
  //         board.togglePiece(lowerSolution[rookPositions][0], lowerSolution[rookPositions][1]);
  //         solution.push(board);
  //       }
  //       // eliminate all rows and all cols with conflict
  //       // and remove those rows and cols
  //       // and pass remaining board into findNRooksSolution(n - 1)
  //     }
  //   }
  // }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if(n === 1){
    return 1
  } else{
    return n*window.countNRooksSolutions(n-1);
  }
  // expect inner function to return an array of arrays, where the inner array contains row / column positions of a valid rook
  // input is a number corresponding to the number of rows
  /*var fn = function (n) {
    var array = [];
    var board = new Board({n: n});
    for (var row = 0; row < n; row++) {
      board.togglePiece(row, 0);
      if (n !== 1) {
        array = fn(n - 1);
        for (var i = 0; i < array.length; i += 1) {
          var validBoard = [];
          for (var j = 0; j < array[i].length; j += 1) {
            if (array[i][j][0] >= row) {
              array[i][j][0] += 1;
            }
            if (array[i][j][1] >= 0) {
              array[i][j][1] += 1; 
            }
            validBoard.push(array[i][j]);
          }

        }
      }
    }
    return array;
  };

  for (var row = 0; row < n; row += 1) {

  }*/

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  /*var solution = new Board({n:n});
  for(var row = 0; row < n; row++){
    for(var col = 0; col < n; col++){
      solution.togglePiece(row, col);
      console.log(solution.rows());
      if(solution.hasAnyQueensConflicts()){
        solution.togglePiece(row, col);
      }
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();*/
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
