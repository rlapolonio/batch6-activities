let boardState = []; // state of the board at current turn
let boardHistory = []; // records the state of the board at each turn
let activeTurn; // stores x or o as first turn
let tiles = document.querySelectorAll('.tile'); // gets all the tiles of the tic tac toe board
let targetID; // ID of tile clicked
let xAlerts = document.querySelectorAll('.x-wins'); // notification of winner
let oAlerts = document.querySelectorAll('.y-wins'); // notification of winner
let drawAlerts = document.querySelectorAll('.draw'); // notification of draw
let reviewBtns = document.querySelectorAll('.review-btn'); // if i delete this everything does not work WHY???
let xStartBtn = document.querySelector('#x-start'); // get xstart button
let oStartBtn = document.querySelector('#o-start'); // get ostart button
let resetBtn = document.querySelector('#reset-btn'); // get reset button
let playText = document.querySelector('#reset-play'); // get reset/play text
let againText = document.querySelector('#again'); // get again text
let prevBtn = document.querySelector('.prev'); // get previous button
let nextBtn = document.querySelector('.next'); // get next button
let z; // turn counter

function xStart() { // initialize as x to start
    clearBoard();
    activeTurn = 'x';
    pushToHistory();
    hideXO();
    showReset();
}

function oStart() { // initialize as o to start
    clearBoard();
    activeTurn = 'o';
    pushToHistory();
    hideXO();
    showReset();
}

function clearBoard() { // clear the board of everything
    clearImages();
    freeTiles();
    boardHistory = []; // reset move record
    boardState = [ // reset state of the game board
        [],
        [],
        [],
    ];
    xAlerts.forEach(msg => { // hide winning notification
        msg.style.display = 'none';
    })
    oAlerts.forEach(msg => { // hide winning notification
        msg.style.display = 'none';
    });
    drawAlerts.forEach(msg => { // hide draw notification
        msg.style.display = 'none';
    });
    reviewBtns.forEach(btn => { // hide move review buttons
        btn.style.display = 'none';
    });
    activeTurn = ''; // reset first turn
    prevBtn.classList.remove('disabled'); // enable review buttons
    nextBtn.classList.remove('disabled'); // enable review buttons
    showXO();
    hideReset();
    showResetText();
}

function hideXO() { // hide x o start buttons
    oStartBtn.style.visibility = 'hidden';
    xStartBtn.style.visibility = 'hidden';
}

function showXO() { // show x o start buttons
    oStartBtn.style.visibility = 'visible';
    xStartBtn.style.visibility = 'visible';
}

function hideReset() { // hide reset button
    resetBtn.style.visibility = 'hidden';
}

function showReset() { // show reset button
    resetBtn.style.visibility = 'visible';
}

function clearImages() { // clear the board of images only
    tiles.forEach(tile => {
        tile.classList.remove('x-tile');
        tile.classList.remove('o-tile');
    })
}

function freeTiles() { // make tiles clickable again
    tiles.forEach(tile => {
        tile.classList.add('free');
    })
}

function recordMove() { // record actual state of board on actual coordinates
    if (targetID === 'a1') {
        boardState[0][0] = activeTurn;
        pushToHistory();
    } else if (targetID === 'a2') {
        boardState[0][1] = activeTurn;
        pushToHistory();
    } else if (targetID === 'a3') {
        boardState[0][2] = activeTurn;
        pushToHistory();
    } else if (targetID === 'b1') {
        boardState[1][0] = activeTurn;
        pushToHistory();
    } else if (targetID === 'b2') {
        boardState[1][1] = activeTurn;
        pushToHistory();
    } else if (targetID === 'b3') {
        boardState[1][2] = activeTurn;
        pushToHistory();
    } else if (targetID === 'c1') {
        boardState[2][0] = activeTurn;
        pushToHistory();
    } else if (targetID === 'c2') {
        boardState[2][1] = activeTurn;
        pushToHistory();
    } else if (targetID === 'c3') {
        boardState[2][2] = activeTurn;
        pushToHistory();
    }
}

function pushToHistory() { // push current state of board to history array
    boardHistory.push(deepCopyFunction(boardState));
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

function checkWin() { // check board if someone wins or draw
    if ( (boardState[0][0] === 'x' && boardState[0][1] === 'x' && boardState[0][2] === 'x') || // x wins
         (boardState[1][0] === 'x' && boardState[1][1] === 'x' && boardState[1][2] === 'x') ||
         (boardState[2][0] === 'x' && boardState[2][1] === 'x' && boardState[2][2] === 'x') ||
         (boardState[0][0] === 'x' && boardState[1][0] === 'x' && boardState[2][0] === 'x') ||
         (boardState[0][1] === 'x' && boardState[1][1] === 'x' && boardState[2][1] === 'x') ||
         (boardState[0][2] === 'x' && boardState[1][2] === 'x' && boardState[2][2] === 'x') ||
         (boardState[0][0] === 'x' && boardState[1][1] === 'x' && boardState[2][2] === 'x') ||
         (boardState[0][2] === 'x' && boardState[1][1] === 'x' && boardState[2][0] === 'x') ) {
            console.log('x wins');
            xAlerts.forEach(msg => {
                msg.style.display = 'block';
            });
            removeFree();
            showReview();
            showPlayAgain();
    } else if ( (boardState[0][0] === 'o' && boardState[0][1] === 'o' && boardState[0][2] === 'o') || // o wins
        (boardState[1][0] === 'o' && boardState[1][1] === 'o' && boardState[1][2] === 'o') ||
        (boardState[2][0] === 'o' && boardState[2][1] === 'o' && boardState[2][2] === 'o') ||
        (boardState[0][0] === 'o' && boardState[1][0] === 'o' && boardState[2][0] === 'o') ||
        (boardState[0][1] === 'o' && boardState[1][1] === 'o' && boardState[2][1] === 'o') ||
        (boardState[0][2] === 'o' && boardState[1][2] === 'o' && boardState[2][2] === 'o') ||
        (boardState[0][0] === 'o' && boardState[1][1] === 'o' && boardState[2][2] === 'o') ||
        (boardState[0][2] === 'o' && boardState[1][1] === 'o' && boardState[2][0] === 'o') ) {
            console.log('o wins');
            oAlerts.forEach(msg => {
                msg.style.display = 'block';
            });
            removeFree();
            showReview();
            showPlayAgain();
    } else if (boardHistory.length === 10) { // draw
        console.log('draw');
        drawAlerts.forEach(msg => {
            msg.style.display = 'block';
            nextBtn.classList.toggle('disabled');
        });
        removeFree();
        showReview();
        showPlayAgain();
    }
}

function removeFree() { // make tiles unclickable
    tiles.forEach(tile => {
        tile.classList.remove('free');
    });
}

function showReview() { // show review buttons
    prevBtn.style.display = 'grid';
    nextBtn.style.display = 'grid';
    nextBtn.classList.toggle('disabled');
    z = boardHistory.length - 1;
}

function showPlayAgain() {
    playText.innerHTML = 'PLAY';
    againText.style.display = 'block';
}

function showResetText() {
    playText.innerHTML = 'RESET';
    againText.style.display = 'none';
}

function previousMove(){ // show previous board state
    if (z > 1) {
        z--;
        clearImages();
        rememberMoves();
        console.log(z);
        nextBtn.classList.remove('disabled');
    } else {
        prevBtn.classList.toggle('disabled');
    }
}

function nextMove(){ // show next board state
    
    if (z < boardHistory.length - 2) {
        z++;
        rememberMoves();
        console.log(z);
        prevBtn.classList.remove('disabled');
    } else {
        z = boardHistory.length - 1;
        rememberMoves();
        nextBtn.classList.toggle('disabled');
    }
}

function rememberMoves() { // display all images at board state
    if (boardHistory[z][0][0] === 'x') {
        document.querySelector('#a1').classList.add('x-tile');
    }
    if (boardHistory[z][0][1] === 'x') {
        document.querySelector('#a2').classList.add('x-tile');
    }
    if (boardHistory[z][0][2] === 'x') {
        document.querySelector('#a3').classList.add('x-tile');
    }
    if (boardHistory[z][1][0] === 'x') {
        document.querySelector('#b1').classList.add('x-tile');
    }
    if (boardHistory[z][1][1] === 'x') {
        document.querySelector('#b2').classList.add('x-tile');
    }
    if (boardHistory[z][1][2] === 'x') {
        document.querySelector('#b3').classList.add('x-tile');
    }
    if (boardHistory[z][2][0] === 'x') {
        document.querySelector('#c1').classList.add('x-tile');
    }
    if (boardHistory[z][2][1] === 'x') {
        document.querySelector('#c2').classList.add('x-tile');
    }
    if (boardHistory[z][2][2] === 'x') {
        document.querySelector('#c3').classList.add('x-tile');
    }
    if (boardHistory[z][0][0] === 'o') {
        document.querySelector('#a1').classList.add('o-tile');
    }
    if (boardHistory[z][0][1] === 'o') {
        document.querySelector('#a2').classList.add('o-tile');
    }
    if (boardHistory[z][0][2] === 'o') {
        document.querySelector('#a3').classList.add('o-tile');
    }
    if (boardHistory[z][1][0] === 'o') {
        document.querySelector('#b1').classList.add('o-tile');
    }
    if (boardHistory[z][1][1] === 'o') {
        document.querySelector('#b2').classList.add('o-tile');
    }
    if (boardHistory[z][1][2] === 'o') {
        document.querySelector('#b3').classList.add('o-tile');
    }
    if (boardHistory[z][2][0] === 'o') {
        document.querySelector('#c1').classList.add('o-tile');
    }
    if (boardHistory[z][2][1] === 'o') {
        document.querySelector('#c2').classList.add('o-tile');
    }
    if (boardHistory[z][2][2] === 'o') {
        document.querySelector('#c3').classList.add('o-tile');
    }
}


tiles.forEach(tile => { // add event listener to each tile
    tile.addEventListener('click', event => {
        var targetTile = event.target;
        
        if (activeTurn === 'x' && targetTile.classList.contains('free')) {
            targetTile.classList.add('x-tile');
            targetTile.classList.remove('free');
            targetID = targetTile.id;
            recordMove();
            checkWin();
            activeTurn = 'o';
        } else if (activeTurn === 'o' && targetTile.classList.contains('free')) {
            targetTile.classList.add('o-tile');
            targetTile.classList.remove('free');
            targetID = targetTile.id;
            recordMove();
            checkWin();
            activeTurn = 'x';
        }
    });
});

