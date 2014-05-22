var colors = ['#b04040', '#00b080', '#0080b0'];
var currentColorIndex; // (0, 1, 2) = (r, g, b)
    
$(document).ready(function () {
    
    function cleanFinished() {
        if (!isBoardActive(board)) {
            $(".grid-container").animate({
                opacity: 0.5
            }, 500 );
        }
    }
    
    $(".grid-cell").click(function () {
        var cellid = $(this).attr('id');
        var splitCell = cellid.split("-");
        var boardIndex = splitCell[0];
        var row = splitCell[1] - 1;
        var col = splitCell[2] - 1;
        
        if (isBoardActive(board)) {
            console.log("board is active");
            if (isCellEmpty(board, row, col)) {
                console.log("cell is empty");
                console.log("color index is: " + currentColorIndex);
                if (currentColorIndex == 0) {
                    board[row][col] = CellEnum.PLAYER_ONE;
                    $("#"+cellid).addClass("player-one", 1000);
                    cleanFinished();
                } else if (currentColorIndex == 2) {
                    board[row][col] = CellEnum.PLAYER_TWO;
                    $("#"+cellid).addClass("player-two", 1000 );
                    cleanFinished();
                } else {
                    // WTF ( no player? )
                    alert("no current player");
                }
                
                anime();
            }
        }
    });
    
    function anime() {
        var i = 2 - currentColorIndex; // 2 to 0, 1 to 1, 0 to 2
        $('body:before').animate({
            opacity: 0.5
        }, 500 );
        $('body').animate({
            backgroundColor: colors[i]
        }, 500 );
        $('body:before').animate({
            opacity: 1
        }, 500 );
        currentColorIndex = i;
    }
    
    currentColorIndex = Math.floor(2 * Math.random()) == 0 ? 0 : 2;
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