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
let btnNew = document.querySelector('.btn-new');
let gameOver = false;
let turnMsg1 = document.querySelector('.turn-msg1');
let turnMsg2 = document.querySelector('.turn-msg2');
let turnFailMsg = `Too bad! You rolled a 1.<br>No points for you this round.`;
let breakSnd = new Audio('pig_squeal.wav');
    breakSnd.volume = 0.2;
let eatSnd = new Audio('eat.mp3');
let winSnd = new Audio('win.mp3');
let rollSnd = new Audio('dice.mp3');
let bgmSnd = new Audio('bgm.mp3');
    bgmSnd.volume = 0.4;
    bgmSnd.loop = true;
let rollInt;
let rollCtr;
let currentValue, rollTemp = 0;
    activeTurn = 'player-0',
    roundScore1 = 0, roundScore2 = 0,
    playScore1 = 0, playScore2 = 0; 
let roundBar1 = document.querySelector('.a-round-bar1');
let roundBar2 = document.querySelector('.a-round-bar2');
let scoreBar1 = document.querySelector('.a-score-bar1');
let scoreBar2 = document.querySelector('.a-score-bar2');
let errorMsg = document.querySelector('.error-msg');
let walkAnim = document.querySelector('.walk-container');
let insWrapper = document.querySelector('.ins-wrapper');
let reviewBtn = document.querySelector('.review');

playSnd(bgmSnd);

function rollDice() {
    errorMsg.innerHTML = '';
    rollCtr = 10;
    clearInterval(rollInt);
    rollInt = setInterval(() => {
        rollCtr--;
        rollTemp = Math.ceil(Math.random() * 6);
        diceDisplay.src = `dice-${rollTemp}.png`;
        if (rollCtr < 1) {
            clearInterval(rollInt);
            currentValue = rollTemp
            rollCheck();
        }
    }, 25);
    playSnd(rollSnd);
}

function rollCheck() {
    console.log(`current is ${currentValue}`);
    if (currentValue === 1) {
        playSnd(breakSnd);
        clearInterval(rollInt);
        if (activeTurn === 'player-0') {
            roundScore1 = 0;
            player1RoundScore.innerHTML = `${roundScore1}`;
            roundBar1.style.height = `${roundScore1}%`;
            turnMsg1.innerHTML = turnFailMsg;
            turnMsg2.innerHTML = '';
        } else if (activeTurn === 'player-1') {
            roundScore2 = 0;
            player2RoundScore.innerHTML = `${roundScore2}`;
            roundBar2.style.height = `${roundScore2}%`;
            turnMsg2.innerHTML = turnFailMsg;
            turnMsg1.innerHTML = '';
        }
        turnHandler();
    } else {
        if (activeTurn === 'player-0') {
            roundScore1 += currentValue;
            roundBar1.style.height = `${roundScore1}%`;
            player1RoundScore.innerHTML = `${roundScore1}`;
            
        } else if (activeTurn === 'player-1') {
            roundScore2 += currentValue;
            roundBar2.style.height = `${roundScore2}%`;
            player2RoundScore.innerHTML = `${roundScore2}`;
        }
    }
}

function holdValue() {
    if (activeTurn === 'player-0') {
        if (roundScore1 > 0) {
            playScore1 += roundScore1;
            scoreBar1.style.height = `${playScore1}%`;
            player1PlayScore.innerHTML = `${playScore1}`;
            roundScore1 = 0;
            roundBar1.style.height = `${roundScore1}%`;
            player1RoundScore.innerHTML = `${roundScore1}`;
            playSnd(eatSnd);
            checkWin();
            turnHandler();
        } else {
            errorMsg.innerHTML = 'Roll dice first!';
        }
    } else if (activeTurn === 'player-1') {
        if (roundScore2 > 0) {
            playScore2 += roundScore2;
            scoreBar2.style.height = `${playScore2}%`;
            player2PlayScore.innerHTML = `${playScore2}`;
            roundScore2 = 0;
            roundBar2.style.height = `${roundScore2}%`;
            player2RoundScore.innerHTML = `${roundScore2}`;
            playSnd(eatSnd);
            checkWin();
            turnHandler();
        } else {
            errorMsg.innerHTML = 'Roll dice first!';
        }
    } 
}

function turnHandler() {
    if (!gameOver) {
        (activeTurn === 'player-1') ? activeTurn = 'player-0' : activeTurn = 'player-1';
        (activeTurn === 'player-1') ? turnMsg2.innerHTML = '' : turnMsg1.innerHTML = '';
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
        player1Panel.classList.remove('active');
        gameOver = true;
        playSnd(winSnd);
        btnNew.classList.add('emp');
        walkAnim.style.display = 'none';
    } else if (playScore2 >= 100) {
        console.log(`Player 2 Wins`);
        buttons.forEach(btn => {
            btn.classList.add('disabled');
        })
        player2Panel.classList.add('winner');
        player2Panel.classList.remove('active');
        gameOver = true;
        playSnd(winSnd);
        btnNew.classList.add('emp');
        walkAnim.style.display = 'none';
    }
}

function playSnd(sound) {
    sound.currentTime = 0;
    sound.play();
}

function toggleIns() {
    insWrapper.classList.toggle('hidden');
    reviewBtn.classList.toggle('hidden');
    walkAnim.classList.toggle('hidden');
    playSnd(eatSnd);
}

