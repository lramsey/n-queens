// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    cols: function () {
      //swap this.get() can replace rows, maybe more efficient
      var results = [];
      for (var col = 0; col < this.rows().length; col++) {
        var c = [];
        for (var row = 0; row < this.rows().length; row++) {
          c.push(this.rows()[row][col]);
        }
        results.push(c);
      }
      return results;
    },
    getValueAt: function(row, col){
      return this.rows()[row][col];
    },
    majorDiagonals: function () {
      //swap this.get() can replace rows, maybe more efficient
      var results = [];
      var fulcrum = this.rows().length-1;
      for(var diags = 0; diags < 2*this.rows().length - 1; diags++){
        results.push([]);
      }
      for(var row=0; row < this.rows().length; row++){
        for(var col=0; col < this.rows().length; col++){
          results[col + fulcrum - row].push(this.rows()[row][col]);
        }
      }
      return results;
    },
    minorDiagonals: function () {
      var results = [];
      for(var diags = 0; diags < 2*this.rows().length - 1; diags++){
        results.push([]);
      }
      for(var row=0; row < this.rows().length; row++){
        for(var col=0; col < this.rows().length; col++){
          results[col + row].push(this.rows()[row][col]);
        }
      }
      return results;
    },
    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var thisRow = this.rows()[rowIndex];
      var result = _.reduce(thisRow, function (a, c) {
        return a + c;
      });
      return (result > 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var allRows = this.rows();
      for (var i = 0; i < allRows.length; i += 1) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var thisCol = this.cols()[colIndex];
      var result = _.reduce(thisCol, function (a, c) {
        return a + c;
      });
      return (result > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var allCols = this.cols();
      for (var i = 0; i < allCols.length; i += 1) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalIndex) {
      var fulcrum = this.rows().length-1;
      var thisMajorDiags = this.majorDiagonals()[majorDiagonalIndex + fulcrum];
      var result = _.reduce(thisMajorDiags, function (a, c) {
        return a + c;
      });
      return (result > 1);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var allMajorDiags = this.majorDiagonals();
      for (var i = 0; i < allMajorDiags.length; i += 1) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalIndex) {
      var thisMinorDiags = this.minorDiagonals()[minorDiagonalIndex];
      var result = _.reduce(thisMinorDiags, function (a, c) {
        return a + c;
      });
      return (result > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var allMinorDiags = this.minorDiagonals();
      for (var i = 0; i < allMinorDiags.length; i += 1) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
