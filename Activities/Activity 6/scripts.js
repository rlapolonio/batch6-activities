let activeTurn = 'white';
let attemptPiece;
let pieceId;
let allPieces = document.querySelectorAll('.piece');
let allTiles = document.querySelectorAll('.tile');
let board = document.querySelector('.container');
let tileArr = Array.from(allTiles);
let boardState = [
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','','']
];
let tempBoardState = [];
let whitePile = document.querySelector('.taken-white');
let blackPile = document.querySelector('.taken-black');
let activePiece;
let tileNum;
let colTiles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let rowTiles = ['8', '7', '6', '5', '4', '3', '2', '1'];
let possibleMoves = [];
let possibleTakes = [];
let temp = [];
let parentTileId;
let a;
let b;
let attemptTile;
let diagonals = [];
let cross = [];
let gallops = [];
let col = 0;
let row = 0;
let notice = document.querySelector('.notice');
let whtTimerDisplay = document.querySelector('.wht-timer');
let blkTimerDisplay = document.querySelector('.blk-timer');
let startBtn = document.querySelector('.start');
let resetBtn = document.querySelector('.reset');
let whtIsPaused = false;
let blkIsPaused = true;
let z;
let blkMin;
let blkSec;
let blkMSec;
let whtMin;
let whtSec;
let whtMSec;
let whtTimer;
let blkTimer;
let isEPass = false;
let isWhiteCast = true;
let isBlackCast = true;
let ePiece;
let tile;
let x;
let y;
let wKCtr = 0;
let bKCtr = 0;
let wR1Ctr = 0;
let wR2Ctr = 0;
let bR1Ctr = 0;
let bR2Ctr = 0;
let wr1Tile = document.getElementById('A1');
let wr2Tile = document.getElementById('H1');
let br1Tile = document.getElementById('A8');
let br2Tile = document.getElementById('H8');
let wr1CastTile = document.getElementById('D1');
let wr2CastTile = document.getElementById('F1');
let br1CastTile = document.getElementById('D8');
let br2CastTile = document.getElementById('F8');
let wr1 = document.getElementById('wr1');
let wr2 = document.getElementById('wr2');
let br1 = document.getElementById('br1');
let br2 = document.getElementById('br2');
let isBklCheck = false;
let isWhtCheck = false;
let wKing = document.getElementById('wkk');
let bKing = document.getElementById('bkk');
let wKingId,
    bKingId;
let checkers = [],
    possibleChecks = [];
let checkTiles;
let blackWins = false;
let whiteWins = false;
let wKingPiece, bKingPiece;
let winMessage = document.querySelector('.winmessage');
let winNotice = document.querySelector('.win-notice');
let turnMsg = document.querySelector('.turn-msg');
let timeLeft = document.querySelector('.time-left');
let turnCtr = 0;
let pbRooks = document.querySelector('.pb-rooks');
let pwRooks = document.querySelector('.pw-rooks');
let pbBishops = document.querySelector('.pb-bishops');
let pwBishops = document.querySelector('.pw-bishops');
let pbHorses = document.querySelector('.pb-horses');
let pwHorses = document.querySelector('.pw-horses');
let pbQueens = document.querySelector('.pb-queens');
let pwQueens = document.querySelector('.pw-queens');
let promoChoices = document.querySelector('.promo-choices');
let promoWhite = document.querySelector('.promo-white');
let promoBlack = document.querySelector('.promo-black');
let promoPiece;
let promoTileId,
    promoTile;

initializeBoard();

board.addEventListener('click', event => {
    activePiece = document.querySelector('.active-piece');
    if (event.target.classList.contains('piece')) {
        if (activePiece === null) {
            pieceId = event.target.id;
            attemptPiece = document.getElementById(pieceId);
            if (attemptPiece.classList.contains(activeTurn)) {
                activePiece =  document.getElementById(pieceId);
                activePiece.classList.add("active-piece");
                calcMove();
            }
        } else if ((event.target.id === activePiece.id) ||
            (event.target.classList.contains(activeTurn) && activePiece.classList.contains(activeTurn))) {
            clearSelection();
        }
    } else if (event.target.classList.contains('tile')) {
        if (activeTurn) {
            if (event.target.classList.contains('possible-move')) {
                event.target.appendChild(activePiece);
                if (pieceId.includes('wp') || pieceId.includes('bp')) {
                    initEPass(event);
                    takeEPass(event);
                    checkPromo(event);
                } else if (pieceId.includes('wk')) {
                    if (isWhiteCast && event.target.id.includes('C1')) {
                        wr1CastTile.appendChild(wr1);
                    } else if (isWhiteCast && event.target.id.includes('G1')) {
                        wr2CastTile.appendChild(wr2);
                    }
                    wKCtr++;
                } else if (pieceId.includes('bk')) {
                    if (isBlackCast && event.target.id.includes('C8')) {
                        br1CastTile.appendChild(br1);
                    } else if (isBlackCast && event.target.id.includes('G8')) {
                        br2CastTile.appendChild(br2);
                    } 
                    bKCtr++;
                } else if (pieceId.includes('wr1')) { 
                    wR1Ctr++;
                } else if (pieceId.includes('wr2')) { 
                    wR2Ctr++;
                } else if (pieceId.includes('br1')) { 
                    bR1Ctr++;
                } else if (pieceId.includes('br2')) { 
                    bR2Ctr++;
                } else {
                    isEPass = false;
                }
                activePiece.classList.remove('active-piece');
                transferToPile();
                turnHandler();
            }
        }
    }
});

promoChoices.addEventListener('click', event => {
    promoTile = document.getElementById(promoTileId);
    promoTile.removeChild(promoTile.firstChild);
    if (event.target.id.includes('wr')) {
        promoTile.appendChild(pwRooks.children[0]);
    } else if (event.target.id.includes('wb')) {
        promoTile.appendChild(pwBishops.children[0]);
    } else if (event.target.id.includes('wh')) {
        promoTile.appendChild(pwHorses.children[0]);
    } else if (event.target.id.includes('wq')) {
        promoTile.appendChild(pwQueens.children[0]);
    } else if (event.target.id.includes('br')) {
        promoTile.appendChild(pbRooks.children[0]);
    } else if (event.target.id.includes('bb')) {
        promoTile.appendChild(pbBishops.children[0]);
    } else if (event.target.id.includes('bh')) {
        promoTile.appendChild(pbHorses.children[0]);
    } else if (event.target.id.includes('bq')) {
        promoTile.appendChild(pbQueens.children[0]);
    }
    promoChoices.style.display = 'none';
    promoWhite.style.display = 'none'
    promoBlack.style.display = 'none'
});

function transferToPile() {
    allTiles.forEach(tile => {
        if (tile.children.length > 1) {
            if (tile.children[0].classList.contains('black')) {
                whitePile.appendChild(tile.children[0]);
            } else if (tile.children[0].classList.contains('white')) {
                blackPile.appendChild(tile.children[0]);
            }
        }
    })
}

function clearSelection() {
    activePiece.classList.remove('active-piece');
    activePiece = null;
    deHiLightTiles();
}

function turnHandler() {
    turnCtr++;
    updateBoard();
    checkCast();
    checkWin();
    checkCheck();
    (activeTurn === 'white') ? activeTurn = 'black' : activeTurn = 'white';
    if (activeTurn === 'white') {
        blkIsPaused = true;
        whtIsPaused = false;
    } else {
        blkIsPaused = false;
        whtIsPaused = true;
    }
    deHiLightTiles();
    notice.innerHTML = `${activeTurn} turn`;
    console.log(`${activeTurn}'s turn`); 
}

function updateBoard() {
    disablePiece();
    toggleOccupied();
    recordState();
}

function disablePiece() {
    allPieces.forEach(piece => {
        piece.classList.toggle('disabled-piece');
    });
}

function toggleOccupied() {
    allTiles.forEach(tile => {
        if (tile.hasChildNodes()) {
            tile.classList.add('occupied');
        } else {
            tile.classList.remove('occupied');
        }
    });
}

function initializeBoard() {
    allPieces.forEach(piece => {
        if (!piece.classList.contains(activeTurn)) {
            piece.classList.toggle('disabled-piece');
        }
    });
    toggleOccupied();
    recordState();
    // board.style.pointerEvents = 'none';
    notice.innerHTML = 'press start';
}

function recordState() {
    tileNum = 0;
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            if (allTiles[tileNum].hasChildNodes()) {
                boardState[x][y] = tileArr[tileNum].children[0].getAttribute('id');
            } else {
                // boardState[x][y] = tileArr[tileNum].getAttribute('id');
                boardState[x][y] = '';
            }
            tileNum++;
        }
    }
}

function calcMove() {
    getPieceCoord();
    getDiagonal();
    getCross();
    getGallop();
    checkTake();
    checkBlock();
    highlightTiles();
}

function getPieceCoord() {
    parentTileId = activePiece.parentElement.id;
    a = colTiles.indexOf(parentTileId[0]);
    b = rowTiles.indexOf(parentTileId[1]);
}

function highlightTiles() {
    possibleMoves.forEach(tile => {
        document.getElementById(tile).classList.add('possible-move');
    });
    possibleTakes.forEach(tile => {
        document.getElementById(tile).classList.add('possible-move');
    });
    if (checkers.length > 0) {
        checkers.forEach(tile => {
            document.getElementById(tile).classList.add('checker');
            document.getElementById(tile).children[0].classList.add('checked');
        });

    }
}

function deHiLightTiles() {
    possibleMoves.forEach(tile => {
        document.getElementById(tile).classList.remove('possible-move');
    });
    possibleTakes.forEach(tile => {
        document.getElementById(tile).classList.remove('possible-move');
    });

    possibleMoves = [];
    possibleTakes = [];
}

function checkBlock() {
    if (pieceId.includes('wp')) {
        cross[0].length = 0;
        cross[1].length = parentTileId.includes('2') ? 2 : 1;
        cross[2].length = 0;
        cross[3].length = 0;
        purgeBlocked(cross);
        checkEPass();
    } else if (pieceId.includes('bp')) {
        cross[0].length = 0;
        cross[1].length = 0;
        cross[2].length = 0;
        cross[3].length = parentTileId.includes('7') ? 2 : 1;
        purgeBlocked(cross);
        checkEPass();
    } 
    else if (pieceId.includes('wr') || pieceId.includes('br')) {
        purgeBlocked(cross);
    } else if (pieceId.includes('wb') || pieceId.includes('bb')) {
        purgeBlocked(diagonals);
    } else if (pieceId.includes('wq') || pieceId.includes('bq') ||
        pieceId.includes('wk') || pieceId.includes('bk')) {
        purgeBlocked(diagonals);
        purgeBlocked(cross);
    } else if (pieceId.includes('wh') || pieceId.includes('bh')) {
        purgeBlocked(gallops);
    }
}

function checkTake() {
    if (pieceId.includes('wp')) {
        diagonals[0].length = 1;
        diagonals[1].length = 1;
        diagonals[2].length = 0;
        diagonals[3].length = 0;
        purgeForTake(diagonals);
    } else if (pieceId.includes('bp')) {
        diagonals[0].length = 0;
        diagonals[1].length = 0;
        diagonals[2].length = 1;
        diagonals[3].length = 1;
        purgeForTake(diagonals);
    } else if (pieceId.includes('wr') || pieceId.includes('br')) {
        purgeForTake(cross);
    } else if (pieceId.includes('wb') || pieceId.includes('bb')) {
        purgeForTake(diagonals);
    } else if (pieceId.includes('wq') || pieceId.includes('bq') ||
        pieceId.includes('wk') || pieceId.includes('bk')) {
        purgeForTake(cross);
        purgeForTake(diagonals);
    } else if (pieceId.includes('wh') || pieceId.includes('bh')) {
        purgeForTake(gallops);
    }
    possibleTakes = possibleTakes.filter(isUnoccupied);
}

function checkCheck() {

    checkers = [];

    checkTiles = document.querySelectorAll('.checker');
    if (checkTiles.length > 0) {
        checkTiles.forEach(tile => {
            tile.classList.remove('checker');
        })
    }
    wKing.classList.remove('checked');
    bKing.classList.remove('checked');

    parentTileId = activePiece.parentElement.id;
    a = colTiles.indexOf(parentTileId[0]);
    b = rowTiles.indexOf(parentTileId[1]);

    getCross();
    getDiagonal();
    getGallop();

    
    if (pieceId.includes('wp')) {
        diagonals[0].length = 1;
        diagonals[1].length = 1;
        diagonals[2].length = 0;
        diagonals[3].length = 0;
        purgeForCheck(diagonals);
    } else if (pieceId.includes('bp')) {
        diagonals[0].length = 0;
        diagonals[1].length = 0;
        diagonals[2].length = 1;
        diagonals[3].length = 1;
        purgeForCheck(diagonals);
    } else if (pieceId.includes('wr') || pieceId.includes('br')) {
        purgeForCheck(cross);
    } else if (pieceId.includes('wb') || pieceId.includes('bb')) {
        purgeForCheck(diagonals);
    } else if (pieceId.includes('wq') || pieceId.includes('bq') ||
        pieceId.includes('wk') || pieceId.includes('bk')) {
        purgeForCheck(cross);
        purgeForCheck(diagonals);
    } else if (pieceId.includes('wh') || pieceId.includes('bh')) {
        purgeForCheck(gallops);
    }
    checkers = checkers.filter(isUnoccupied);
    highlightTiles();
}

function checkWin() {
    tempBoardState = [];
    tempBoardState = deepCopyFunction(boardState);
    bKingPiece = 0;
    wKingPiece = 0;
    for (g = 0; g < tempBoardState.length; g++) {
        tempBoardState[g].forEach(tile => {
            if (tile != '') {
                if (tile.includes('wk')) {
                    wKingPiece++;
                } else if (tile.includes('bk')) {
                    bKingPiece++;
                }
            }
        });
    }
    if (wKingPiece === 0) {
        blackWins = true;
        console.log(`black wins`);
        endGame();
    } else if (bKingPiece === 0) {
        whiteWins = true;
        console.log(`white wins`);
        endGame();
    }
}

function endGame() {
    board.style.pointerEvents = 'none';
    winNotice.style.display = 'grid';
    if (blackWins) {
        winMessage.innerHTML = `Black<br>wins!`;
        z = blkSec < 10 ? 0 : '';
        timeLeft.innerHTML = `Time left: ${blkMin}:${z}${blkSec}`;
    } else if (whiteWins) {
        winMessage.innerHTML = `White<br>wins!`;
        z = whtSec < 10 ? 0 : '';
        timeLeft.innerHTML = `Time left: ${whtMin}:${z}${whtSec}`;
    }
    turnMsg.innerHTML = `# of Turns: ${turnCtr}`;
    clearInterval(blkTimer);
    clearInterval(whtTimer);
}

function checkPromo(e) {
    promoTileId = '';
    if (pieceId.includes('wp') && e.target.id[1] === '8') {
        promoTileId = e.target.id;
        promoChoices.style.display = 'grid';
        promoWhite.style.display = 'grid';
    } else if (pieceId.includes('bp') && e.target.id[1] === '1') {
        promoTileId = e.target.id;
        promoChoices.style.display = 'grid';
        promoBlack.style.display = 'grid';
    }
}

function initEPass(e) {
    isEPass = isEPass ? false : false;
    ePiece = document.querySelector('.pass');
    if (ePiece != undefined) {
        ePiece.classList.remove('pass');
    }
    if (pieceId.includes('wp')) {
        if ((rowTiles.indexOf(e.target.id[1]) - rowTiles.indexOf(parentTileId[1])) === -2 ) {
            isEPass = true;
            activePiece.classList.add('pass');
        }
    } else if (pieceId.includes('bp')) {
        if ((rowTiles.indexOf(e.target.id[1]) - rowTiles.indexOf(parentTileId[1])) === 2 ) {
            isEPass = true;
            activePiece.classList.add('pass');
        }
    }
    // console.log(isEPass);
}

function takeEPass(e) {
    if (isEPass && (pieceId.includes('wp') || pieceId.includes('bp'))) {
        if ((colTiles.indexOf(e.target.id[0]) != colTiles.indexOf(parentTileId[0])) &&
            ((e.target.id[1] === '6' && pieceId.includes('wp')) ||
            (e.target.id[1] === '3' && pieceId.includes('bp')))  ) {
                x = e.target.id[0];
                y = parentTileId[1]
                tile = document.getElementById(`${x}${y}`);
                if (tile.children[0].classList.contains('black')) {
                    whitePile.appendChild(tile.children[0]);
                } else if (tile.children[0].classList.contains('white')) {
                    blackPile.appendChild(tile.children[0]);
                }
        } 
    }
    isEPass = isEPass ? false : false;
}

function checkEPass() {
    if (isEPass && (parentTileId.includes('5') || parentTileId.includes('4'))) {
        col = a - 1; 
        row = b;
        checkAdjacentPass();
        col = a + 1; 
        row = b;
        checkAdjacentPass();
    }
}

function checkAdjacentPass() {
    if (col >= 0 && row >= 0 && col < 8 && row < 8) {
        tile = document.getElementById(`${colTiles[col]}${rowTiles[row]}`);
        if (tile.children.length > 0) {
            if (col >= 0 && row >= 0 && col < 8 && row < 8 && tile.children[0].classList.contains('pass')) {
                if (activePiece.classList.contains('white')) {
                    possibleMoves.push(colTiles[col] + rowTiles[row - 1]);
                    possibleMoves = possibleMoves.filter(isUndefined);
                } else if (activePiece.classList.contains('black')) {
                    possibleMoves.push(colTiles[col] + rowTiles[row + 1]);
                    possibleMoves = possibleMoves.filter(isUndefined);
                }
            }
        }
    }
}

function checkCast() {
    isBlackCast = (bKCtr < 1) ? true : false;
    isWhiteCast = (wKCtr < 1) ? true : false;
    if (bKing.classList.contains('checked')) {
        isBlackCast = false;
    }
    if (wKing.classList.contains('checked')) {
        isWhiteCast = false;
    }
}

function isUnoccupied(tile) {
    attemptTile = document.getElementById(tile);
    return attemptTile.classList.contains('occupied');
}

function isBlocked(tile) {
    attemptTile = document.getElementById(tile);
    return !attemptTile.classList.contains('occupied');
}

function getDiagonal() {
    diagonals = [[],[],[],[]];
    for (c = 0; c < 4; c++) {
        col = 0;
        row = 0;
        for (d = 0; d < 8; d++) {
            if (c == 0) {
                col = a - (d + 1);
                row = b - (d + 1);
                pushToArr(diagonals, c);
            } else if (c == 1) {
                col = a + (d + 1);
                row = b - (d + 1);
                pushToArr(diagonals, c);
            } else if (c == 2) {
                col = a + (d + 1);
                row = b + (d + 1);
                pushToArr(diagonals, c);
            } else if (c == 3) {
                col = a - (d + 1);
                row = b + (d + 1);
                pushToArr(diagonals, c);
            }
        }
    }
    if (pieceId.includes('wk') || pieceId.includes('bk')) {
        diagonals[0].length = diagonals[0].length > 0 ? 1 : 0;
        diagonals[1].length = diagonals[1].length > 0 ? 1 : 0;
        diagonals[2].length = diagonals[2].length > 0 ? 1 : 0;
        diagonals[3].length = diagonals[3].length > 0 ? 1 : 0;
    }
    // console.log(diagonals);
}

function getCross() {
    cross = [[],[],[],[]];
    for (c = 0; c < 4; c++) {
        col = 0;
        row = 0;
        for (f = 0; f < 8; f++) {
            if (c == 0) {
                col = a - (f + 1);
                row = b;
                pushToArr(cross, c);
            } else if (c == 1) {
                col = a;
                row = b - (f + 1);
                pushToArr(cross, c);
            } else if (c == 2) {
                col = a + (f + 1);
                row = b;
                pushToArr(cross, c);
            } else if (c == 3) {
                col = a;
                row = b + (f + 1);
                pushToArr(cross, c);
            }
        }
    }
    // console.log(cross);
    if (pieceId.includes('wk') || pieceId.includes('bk')) {
        if (isWhiteCast || isBlackCast) {
            cross[0] = cross[0].filter(isBlocked);
            cross[2] = cross[2].filter(isBlocked);
            if (pieceId.includes('wk') && isWhiteCast) {
                if (cross[0].length > 2 && wR1Ctr < 1 && wr1Tile.children[0].id.includes('wr1')) {
                    cross[0].length = 2;  
                } else {
                    cross[0].length = cross[0].length > 0 ? 1 : 0;
                }
                if (cross[2].length > 1 && wR2Ctr < 1 && wr2Tile.children[0].id.includes('wr2')) {
                    cross[2].length = 2;  
                } else {
                    cross[2].length = cross[2].length > 0 ? 1 : 0;
                }
            } else if (pieceId.includes('bk') && isBlackCast) {
                if (cross[0].length > 2 && bR1Ctr < 1 && br1Tile.children[0].id.includes('br1')) {
                    cross[0].length = 2;  
                } else {
                    cross[0].length = cross[0].length > 0 ? 1 : 0;
                }
                if (cross[2].length > 1 && bR2Ctr < 1 && br2Tile.children[0].id.includes('br2')) {
                    cross[2].length = 2;
                } else {
                    cross[2].length = cross[2].length > 0 ? 1 : 0;
                }
            }
            cross[1].length = cross[1].length > 0 ? 1 : 0;
            cross[3].length = cross[3].length > 0 ? 1 : 0;
        } else {
            cross[0].length = cross[0].length > 0 ? 1 : 0;
            cross[1].length = cross[1].length > 0 ? 1 : 0;
            cross[2].length = cross[2].length > 0 ? 1 : 0;
            cross[3].length = cross[3].length > 0 ? 1 : 0;
        }
    }
    // console.log(cross);
}

function getGallop() {
    gallops = [[],[],[],[],[],[],[],[]];
    for (d = 0; d < 8; d++) {
        col = 0;
        row = 0;
        if (d == 0) {
            col = a - 2;
            row = b - 1;
            pushToArr(gallops, d);
        } else if (d == 1) {
            col = a - 1;
            row = b - 2;
            pushToArr(gallops, d);
        } else if (d == 2) {
            col = a + 1;
            row = b - 2;
            pushToArr(gallops, d);
        } else if (d == 3) {
            col = a + 2;
            row = b - 1;
            pushToArr(gallops, d);
        } else if (d == 4) {
            col = a + 2;
            row = b + 1;
            pushToArr(gallops, d);
        } else if (d == 5) {
            col = a + 1;
            row = b + 2;
            pushToArr(gallops, d);
        } else if (d == 6) {
            col = a - 1;
            row = b + 2;
            pushToArr(gallops, d);
        } else if (d == 7) {
            col = a - 2;
            row = b + 1;
            pushToArr(gallops, d);
        }
    }
    // console.log(gallops);
}

function pushToArr(arr, c = 0) {
    if (col >= 0 && row >= 0 && col < 8 && row < 8) {
        arr[c].push(colTiles[col] + rowTiles[row]);
        arr[c] = arr[c].filter(isUndefined);
    }
}

function isUndefined(tile) {
    return !tile.includes('undefined');
}

function isBlocked(tile) {
    return !tile.includes('occupied');
}

function purgeBlocked(arr) {
    temp = [];
    temp = deepCopyFunction(arr);
    for (g = 0; g < temp.length; g++) {
        if (temp[g].length > 0) {
            temp[g].forEach(tile => {
                attemptTile = document.getElementById(tile);
                if (attemptTile.classList.contains('occupied')) {
                    temp[g].splice(temp[g].indexOf(tile), temp[g].length);
                }
            });
        }
    }
    pushToPossibleMoves(temp);
}

function purgeForTake(arr) {
    temp = [];
    temp = deepCopyFunction(arr);
    for (g = 0; g < temp.length; g++) {
        if (temp[g].length > 0) {
            temp[g].forEach(tile => {
                attemptTile = document.getElementById(tile);
                if (attemptTile.classList.contains('occupied')) {
                    if (attemptTile.children[0].classList.contains(activeTurn)) {
                        temp[g].splice(temp[g].indexOf(tile), temp[g].length);
                    } else {
                        temp[g].splice(temp[g].indexOf(tile) + 1, temp[g].length);
                    }
                } 
            });
        }
    }
    pushToPossibleTakes(temp);
}

function purgeForCheck(arr) {
    temp = [];
    temp = deepCopyFunction(arr);
    possibleChecks = [];
    for (g = 0; g < temp.length; g++) {
        if (temp[g].length > 0) {
            temp[g].forEach(tile => {
                attemptTile = document.getElementById(tile);
                if (attemptTile.classList.contains('occupied')) {
                    if (attemptTile.children[0].classList.contains(activeTurn)) {
                        temp[g].splice(temp[g].indexOf(tile), temp[g].length);
                    } else {
                        temp[g].splice(temp[g].indexOf(tile) + 1, temp[g].length);
                    }
                } 
            });
        }
    }
    pushToPossibleChecks(temp);
    possibleChecks.forEach(tile => {
        attemptTile = document.getElementById(tile);
        if (attemptTile.classList.contains('occupied')) {
            if (activeTurn === 'black' && attemptTile.children[0].id.includes('wk')) {
                checkers.push(tile); 
            } else if (activeTurn === 'white' && attemptTile.children[0].id.includes('bk')) {
                checkers.push(tile);
            }
        } 
    })
}

function pushToPossibleMoves(arr) {
    for (h = 0; h < arr.length; h++) {
        if (arr[h].length > 0) {
            arr[h].forEach(tile => {
                possibleMoves.push(tile);
            });
        }
    }
}

function pushToPossibleTakes(arr) {
    for (h = 0; h < arr.length; h++) {
        if (arr[h].length > 0) {
            arr[h].forEach(tile => {
                possibleTakes.push(tile);
            });
        }
    }
}

function pushToPossibleChecks(arr) {
    for (h = 0; h < arr.length; h++) {
        if (arr[h].length > 0) {
            arr[h].forEach(tile => {
                possibleChecks.push(tile);
            });
        }
    }
}

const deepCopyFunction = (inObject) => { // deep copy the array
    let outObject, value, key
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
  
    for (key in inObject) {
      value = inObject[key]
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value)
    }
  
    return outObject
}

// BUILD TIMER

function initializeTimer() {
    blkMin = 30;
    blkSec = 00;
    blkMSec = 100;
    whtMin = 30;
    whtSec = 00;
    whtMSec = 100;
    whiteTimer();
    board.style.pointerEvents = 'all';
    notice.innerHTML = `${activeTurn} turn`;
    whtTimerDisplay.innerHTML = `${whtMin}:0${whtSec}`;
    blkTimerDisplay.innerHTML = `${blkMin}:0${blkSec}`;
}

function whiteTimer() {
    clearInterval(blkTimer);
    startBtn.classList.add('disabled');
    resetBtn.classList.remove('disabled');
    whtTimerDisplay.style.backgroundColor = 'rgb(17, 17, 17)';
    whtTimerDisplay.style.color = 'rgb(239, 239, 239)';
    blkTimerDisplay.style.backgroundColor = 'transparent';
    blkTimerDisplay.style.color = 'rgb(17, 17, 17)';
    whtTimer = setInterval(() => {
        z = whtSec < 10 ? 0 : '';
        whtTimerDisplay.innerHTML = `${whtMin}:${z}${whtSec}`;
        whtMSec--;
        if (whtIsPaused) {
            clearInterval(whtTimer);
            blackTimer();
        } else if (whtMin == 0) {
            clearInterval(whtTimer);
            blackWins = true;
        } else if (whtMSec < 0) {
            whtSec--;
            whtMSec = 99;
        } else if (whtSec < 0) {
            whtMin--;
            whtSec = 59;
        }
    }, 10);
}

function blackTimer() {
    clearInterval(whtTimer);
    whtTimerDisplay.style.backgroundColor = 'transparent';
    whtTimerDisplay.style.color = 'rgb(17, 17, 17)';
    blkTimerDisplay.style.backgroundColor = 'rgb(17, 17, 17)';
    blkTimerDisplay.style.color = 'rgb(239, 239, 239)';
    blkTimer = setInterval(() => {
        z = blkSec < 10 ? 0 : '';
        blkTimerDisplay.innerHTML = `${blkMin}:${z}${blkSec}`;
        blkMSec--;
        if (blkIsPaused) {
            clearInterval(blkTimer);
            whiteTimer();
        } else if (blkMin == 0) {
            clearInterval(blkTimer);
            whiteWins = true;
        } else if (blkMSec < 0) {
            blkSec--;
            blkMSec = 99;
        } else if (blkSec < 0) {
            blkMin--;
            blkSec = 59;
        }
    }, 10);
}


// create promotion function
// complete castling condition