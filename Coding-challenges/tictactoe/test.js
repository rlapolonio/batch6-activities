let boardState = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9']
];
let boardHistory = [];
let activeTurn;
let turnString;
let x = 'X';
let o = 'O';
let moves;

welcomeScreen();

function welcomeMsg() {
    console.log("Let's play Tic x Tac x Toe");
}

function showBoardState() {
    console.log("==========");
    console.log(`${boardState[0][0]} | ${boardState[0][1]} | ${boardState[0][2]}`);   
    console.log(`${boardState[1][0]} | ${boardState[1][1]} | ${boardState[1][2]}`);   
    console.log(`${boardState[2][0]} | ${boardState[2][1]} | ${boardState[2][2]}`);
    console.log("==========");   
}

function showInstructions() {
    console.log("Choose first player: first(), input: 'x' or 'o'.");
    console.log("Make move: move(cell_number), input: 1 - 9.");
}

function welcomeScreen() {
    welcomeMsg();
    showBoardState();
    showInstructions();
}

function first(turn) {
    if (turn !== x && turn !== o) {
        console.log("Invalid! Please input 'x' or 'o'.");
    } else {
        activeTurn = turn;
        showCurrentPlayer();
        pushToHistory();
        showBoardState();
    }
}

function showCurrentPlayer() {
    console.log(`${activeTurn.toString()}'s turn`);
}

function switchTurn() {
    if (activeTurn === x) {
        activeTurn = o;
    } else if (activeTurn === o) {
        activeTurn = x;
    }
}

function switchTurnSequence() {
    switchTurn();
    showCurrentPlayer();
    showBoardState();
    pushToHistory();
}

function showWinScreen() {
    console.log(`${activeTurn.toString()} wins!`);
    pushToHistory();
    showBoardState();
    showReview();
    showPlayAgain();
    moves = boardHistory.length;
}

function showDrawScreen() {
    console.log(`Draw!`);
    pushToHistory();
    showBoardState();
    showReview();
    showPlayAgain();
    moves = boardHistory.length - 1;
}

function showReview() {
    console.log('You can review moves by: prev() or next()');
}

function showPlayAgain() {
    console.log('Play again? You can refresh the browser or enter resetGame()');
}

function resetGame() {
    location.reload();
}

function move(cell) {
    if (activeTurn === x || activeTurn === o) {
        if (cell === 1) {
            boardState[0][0] = activeTurn;
            checkWin();
        } else if (cell === 2) {
            boardState[0][1] = activeTurn;
            checkWin();
        } else if (cell === 3) {
            boardState[0][2] = activeTurn;
            checkWin();
        } else if (cell === 4) {
            boardState[1][0] = activeTurn;
            checkWin();
        } else if (cell === 5) {
            boardState[1][1] = activeTurn;
            checkWin();
        } else if (cell === 6) {
            boardState[1][2] = activeTurn;
            checkWin();
        } else if (cell === 7) {
            boardState[2][0] = activeTurn;
            checkWin();
        } else if (cell === 8) {
            boardState[2][1] = activeTurn;
            checkWin();
        } else if (cell === 9) {
            boardState[2][2] = activeTurn;
            checkWin();
        } else {
            console.log(`Invalid! Please input value between 1 - 9.`);
            showBoardState();
        }
    } else {
        console.log(`Invalid! Choose 'x' or 'o' first.`);
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

function checkWin() {
    if ( (boardState[0][0] === x && boardState[0][1] === x && boardState[0][2] === x) || // x wins
         (boardState[1][0] === x && boardState[1][1] === x && boardState[1][2] === x) ||
         (boardState[2][0] === x && boardState[2][1] === x && boardState[2][2] === x) ||
         (boardState[0][0] === x && boardState[1][0] === x && boardState[2][0] === x) ||
         (boardState[0][1] === x && boardState[1][1] === x && boardState[2][1] === x) ||
         (boardState[0][2] === x && boardState[1][2] === x && boardState[2][2] === x) ||
         (boardState[0][0] === x && boardState[1][1] === x && boardState[2][2] === x) ||
         (boardState[0][2] === x && boardState[1][1] === x && boardState[2][0] === x) ) {
            showWinScreen();
    } else if ( (boardState[0][0] === o && boardState[0][1] === o && boardState[0][2] === o) || // o wins
    (boardState[1][0] === o && boardState[1][1] === o && boardState[1][2] === o) ||
    (boardState[2][0] === o && boardState[2][1] === o && boardState[2][2] === o) ||
    (boardState[0][0] === o && boardState[1][0] === o && boardState[2][0] === o) ||
    (boardState[0][1] === o && boardState[1][1] === o && boardState[2][1] === o) ||
    (boardState[0][2] === o && boardState[1][2] === o && boardState[2][2] === o) ||
    (boardState[0][0] === o && boardState[1][1] === o && boardState[2][2] === o) ||
    (boardState[0][2] === o && boardState[1][1] === o && boardState[2][0] === o) ) {
        showWinScreen();
    } else if (boardHistory.length === 9) {
        pushToHistory();
        showDrawScreen();
    } else {
        switchTurnSequence();
    }
}

function prev() {
    if (moves > 0) {
        moves--;
        showBoardStateHistory(moves);
    } else {
        reviewError();
    }
}

function next() {
    if (moves < (boardHistory.length - 1)) {
        moves++;
        showBoardStateHistory(moves);
    } else {
        reviewError();
    }
}

function reviewError() {
    console.log('No more moves to show');
    showBoardStateHistory(moves);
}

function showBoardStateHistory(moves) {
    console.log("==========");
    console.log(`${boardHistory[moves][0][0]} | ${boardHistory[moves][0][1]} | ${boardHistory[moves][0][2]}`);   
    console.log(`${boardHistory[moves][1][0]} | ${boardHistory[moves][1][1]} | ${boardHistory[moves][1][2]}`);   
    console.log(`${boardHistory[moves][2][0]} | ${boardHistory[moves][2][1]} | ${boardHistory[moves][2][2]}`);
    console.log("==========");
    showReview();
    showPlayAgain();  
}