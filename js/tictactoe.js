var size = 3;
var CellEnum = {
    EMPTY : 0,
    PLAYER_ONE : 1,
    PLAYER_TWO : 2
};
Object.freeze(CellEnum);
var currentPlayer = CellEnum.EMPTY;

var board = [
    [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
    [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
    [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY]
];

function isCellEmpty(array, row, col) {
    console.log("board["+row+"]["+col+"] = " + array[row][col]); 
    return array[row][col] == CellEnum.EMPTY;
}

function isCurrentTurn(player) {
    return currentPlayer == player;
}
        
function getRowWinner(array, row) {
    if (array[row][0] == array[row][1] && array[row][0] == array[row][2]) {
        return array[row][0];
    }
    
    return CellEnum.EMPTY;
}

function getColWinner(array, col) {
    if (array[0][col] == array[1][col] && array[0][col] == array[2][col]) {
        return array[0][col];
    }
    
    return CellEnum.EMPTY;
}

function getDiagWinner(array) {
    if (array[0][0] == array[1][1] && array[0][0] == array[2][2]) {
        return array[0][0];
    } else if (array[0][2] == array[1][1] && array[0][2] == array[2][0]) {
        return array[0][2];
    }
                     
    return CellEnum.EMPTY;
}

function getWinner(array) {
    var winner = getDiagWinner(array), i;
    if (winner !== CellEnum.EMPTY) {
        return winner; // diagonal winner
    } else {
        for (i = 0; i < size; i += 1) {
            winner = getRowWinner(array, i);
            if (winner !== CellEnum.EMPTY) {
                return winner; // row winner
            } else {
                winner = getColWinner(array, i);
                if (winner !== CellEnum.EMPTY) {
                    return winner; // column winner
                }
            }
        }
    }
    
    return CellEnum.EMPTY; // no winner
}

function isBoardActive(array) {
    return getWinner(array) == CellEnum.EMPTY;
}