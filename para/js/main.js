var colors = ['#00b080', '#b04040', '#0080b0'];
var currentPlayer = CellEnum.EMPTY; // (0, 1, 2) = (green, red, blue) = (empty, player1, player2)
    
$(document).ready(function () {
    
    addGame(GameEnum.TIC_TAC_TOE);
    addGame(GameEnum.CONNECT_FOUR);
    
    function cleanFinished(game) {
        
        if (game) {
            console.log("active = " + game.isBoardActive());
            if (!game.isBoardActive()) {
                $("#" + game.id).animate({
                    opacity: 0.20
                }, 1000 );
                if (currentPlayer == CellEnum.PLAYER_ONE) {
                    playerOneScore++;
                    $(".player-one-score").text(playerOneScore);
                } else if (currentPlayer == CellEnum.PLAYER_TWO) {
                    playerTwoScore++;
                    $(".player-two-score").text(playerTwoScore);
                }
                
            }
        } else {
            console.log("nogame - " + JSON.stringify(game));
        }
        anime();
    }
    
    $(".grid-cell").click(function () {
        var cellid = $(this).attr('id');
        var splitCell = cellid.split("-");
        var boardIndex = splitCell[0];
        var row = splitCell[1] - 1;
        var col = splitCell[2] - 1;

        var game = games[boardIndex];
        if (game.gameType == GameEnum.TIC_TAC_TOE) {
            console.log("game is tic-tac-toe");
            if (game.tryPlayMove(currentPlayer, row, col)) {
                console.log("try play success of player : " + JSON.stringify(currentPlayer));
                if (currentPlayer == CellEnum.PLAYER_ONE) {
                    $("#"+cellid).addClass("player-one", 1000);
                } else if (currentPlayer == CellEnum.PLAYER_TWO) {
                    $("#"+cellid).addClass("player-two", 1000);
                }

                cleanFinished(game);
            }
        } else if (game.gameType == GameEnum.CONNECT_FOUR) {
            console.log("game is connect four");
            var nextEmptyRow = game.getNextEmptyRowInColumn(row, col);
            var newCellid = "" + boardIndex + "-" + (nextEmptyRow+1) + "-" + (col+1);

            if (game.tryPlayMove(currentPlayer, row, col)) {
                console.log("last: " + game.lastMoveRow);
                var newCellid = "" + boardIndex + "-" + (game.lastMoveRow+1) + "-" + (col+1);
                if (currentPlayer == CellEnum.PLAYER_ONE) {
                    $("#"+newCellid).addClass("player-one", 1000);
                } else if (currentPlayer == CellEnum.PLAYER_TWO) {
                    $("#"+newCellid).addClass("player-two", 1000);
                }
                cleanFinished(game);
            } else {
                console.log("did not play move");
            }
        }
        
        

        console.log("click ended, current player is: " + currentPlayer);
    });
        
    function anime() {
        var i = 3 - currentPlayer; // 2 to 0, 1 to 1, 0 to 2 (empty stays empty, players switch)
        $('body:before').animate({
            opacity: 0.5
        }, 500 );
        $('body').animate({
            backgroundColor: colors[i]
        }, 500 );
        $('body:before').animate({
            opacity: 1
        }, 500 );
        currentPlayer = i;
    }
    
    currentPlayer = Math.floor(1 + 2 * Math.random());
    console.log("current player was randomly selected to be: " + currentPlayer);
    
    anime();
});

//function Gamemaster(size, InputManager, Actuator, StorageManager) {
//  this.size           = size; // Size of the grid
//  this.inputManager   = new InputManager;
//  this.storageManager = new StorageManager;
//  this.actuator       = new Actuator;
//
//  this.startTiles     = 2;
//
//  this.inputManager.on("move", this.move.bind(this));
//  this.inputManager.on("restart", this.restart.bind(this));
//  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
//
//  this.setup();
//}