/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let player1PlayScore = document.getElementById('score-0');
let player2PlayScore = document.getElementById('score-1');
let player1RoundScore = document.getElementById('current-0');
let player2RoundScore = document.getElementById('current-1');
let diceDisplay = document.querySelector('.dice');
let player1Panel = document.querySelector('.player-0-panel');
let player2Panel = document.querySelector('.player-1-panel');
let buttons = document.querySelectorAll('.btn');
let gameOver = false;
let turnMsg1 = document.querySelector('.turn-msg1');
let turnMsg2 = document.querySelector('.turn-msg2');
let turnFailMsg = `Too bad! You rolled a 1.<br>No points for you this round.`;
let breakSnd = new Audio('pig_squeal.wav');
let eatSnd = new Audio('eat.mp3');
let winSnd = new Audio('win.mp3');
let rollSnd = new Audio('dice.mp3');

let currentValue,
    activeTurn = 'player-0',
    roundScore1 = 0, roundScore2 = 0,
    playScore1 = 0, playScore2 = 0; 

function rollDice() {
    currentValue = Math.ceil(Math.random() * 6);
    diceDisplay.src = `dice-${currentValue}.png`;
    rollSnd.currentTime = 0;
    rollSnd.play();
    if (currentValue === 1) {
        if (activeTurn === 'player-0') {
            roundScore1 = 0;
            player1RoundScore.innerHTML = `${roundScore1}`;
            turnMsg1.innerHTML = turnFailMsg;
            turnMsg2.innerHTML = '';
            breakSnd.currentTime = 0;
            breakSnd.play();
        } else if (activeTurn === 'player-1') {
            roundScore2 = 0;
            player2RoundScore.innerHTML = `${roundScore2}`;
            turnMsg2.innerHTML = turnFailMsg;
            turnMsg1.innerHTML = '';
            breakSnd.currentTime = 0;
            breakSnd.play();
        }
        turnHandler();
    } else {
        if (activeTurn === 'player-0') {
            roundScore1 += currentValue;
            player1RoundScore.innerHTML = `${roundScore1}`;
        } else if (activeTurn === 'player-1') {
            roundScore2 += currentValue;
            player2RoundScore.innerHTML = `${roundScore2}`;
        }
    }
}

function holdValue() {
    if (activeTurn === 'player-0') {
        playScore1 += roundScore1;
        player1PlayScore.innerHTML = `${playScore1}`;
        roundScore1 = 0;
        player1RoundScore.innerHTML = `${roundScore1}`;
        eatSnd.currentTime = 0;
        eatSnd.play();
    } else if (activeTurn === 'player-1') {
        playScore2 += roundScore2;
        player2PlayScore.innerHTML = `${playScore2}`;
        roundScore2 = 0;
        player2RoundScore.innerHTML = `${roundScore2}`;
        eatSnd.currentTime = 0;
        eatSnd.play();
    }
    checkWin();
    turnHandler();
}

function turnHandler() {
    if (!gameOver) {
        (activeTurn === 'player-1') ? activeTurn = 'player-0' : activeTurn = 'player-1';
        player1Panel.classList.toggle('active');
        player2Panel.classList.toggle('active');
    }
}

function checkWin() {
    if (playScore1 >= 100) {
        console.log(`Player 1 Wins`);
        buttons.forEach(btn => {
            btn.classList.add('disabled');
        })
        player1Panel.classList.add('winner');
        gameOver = true;
        winSnd.currentTime = 0;
        winSnd.play();
    } else if (playScore2 >= 100) {
        console.log(`Player 2 Wins`);
        buttons.forEach(btn => {
            btn.classList.add('disabled');
        })
        player2Panel.classList.add('winner');
        gameOver = true;
        winSnd.currentTime = 0;
        winSnd.play();
    }
}

// win display
