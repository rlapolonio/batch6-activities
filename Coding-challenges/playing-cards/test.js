let deck = [];
let temp = [];
let suitSymbols = ['♠', '♦', '♥', '♣'];
let faceValue = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A'];
let suitNames = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
let faceNames = ['King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six',
'Five', 'Four', 'Three', 'Two', 'Ace'];
let spades = [];
let diamonds = [];
let hearts = [];
let clubs = [];
let dealtCard;
let dealtHand = [];
let dealtValues = [];
let suit;
let value;
let isSameSuit = false;
let isRoyal = false;
let isStraight = false;
let isFour = false;
let isThree = false;
let isFullHouse = false;
let isTwoPair = false;
let isOnePair = false;

// welcomeScreen();

createDeck();
shuffleDeck();

function welcomeScreen() { // prints instructions
    console.log(
`
======================================================================
Let's play Cards!

Available commands:
Create a New Deck: createDeck()
Shuffle the current Deck: shuffleDeck()
Arrange current Deck to each suit: suitUp()
Arrange current Deck in ascending order: faceUp()
Arrange current Deck in descending order: faceDown()  (///.^)
Deal 1 card from current Deck: dealCard()
Deal 1 hand (5 cards) from current Deck: dealHand()
Deal hands (5 cards each) from a newly created and shuffled deck until
    said deck is exhausted: dealAllHands()

To play, input keywords.
======================================================================
`
    )
}

function createDeck() {
    let card = '';
    deck = [];
    for (i = 0; i < suitSymbols.length; i++) {
        for (j = 0; j < faceValue.length; j++) {
            card = `${suitSymbols[i]}${faceValue[j]}`;
            deck.push(card);
        }
    }
    temp = [];
    return `Fresh 52-card deck created.`;
}

function shuffleDeck() {
    deck = deck.sort(() => Math.random() - 0.5);
    return `Current deck has been shuffled. There are ${deck.length} cards left.`;
}

function suitUp() { // sort to suit
    deck = deck.sort((a,b) => {
        return (suitSymbols.indexOf(a[0]) > suitSymbols.indexOf(b[0])) ? 1 : -1;
    });
    console.log(`${JSON.stringify(deck)}`)
    return `Current deck has been sorted per suit. There are ${deck.length} cards left.`;
}

function faceUp() {
    deck = deck.sort((a,b) => {
        return (faceValue.indexOf(a.substr(1)) > faceValue.indexOf(b.substr(1))) ? -1 : 1;
    });

    console.log(`${JSON.stringify(deck)}`)
    return `Current deck has been sorted in ascending order. There are ${deck.length} cards left.`;
}


function faceDown() { // sort to descending order
    arrangeDown(deck);
    console.log(`${JSON.stringify(deck)}`)
    return `Current deck has been sorted in descending order. There are ${deck.length} cards left.`;
}

function dealCard() { // deal a single card
    if (deck.length > 0) {
        dealtCard = deck[0];
        deck.splice(0, 1);
        identifyCard();
        showActualCard(dealtCard);
        return `You got ${dealtCard} ${value} of ${suit}. There are ${deck.length} cards left.`;
    } else {
        return `There are no cards left to play.`;
    }
}

function showActualCard(card) {
    x = card[0];
    y = card.substr(1);
    if (y === '10') {
        console.log(
        `
┌─────────┐
│${x}${y}      │
│         │
│         │
│    ${x}    │
│         │
│         │ 
│      ${x}${y}│
└─────────┘
        `
        )
    } else {
        console.log(
        `
┌─────────┐
│${x}${y}       │
│         │
│         │
│    ${x}    │
│         │
│         │ 
│       ${x}${y}│
└─────────┘
        `
        )

    }
}

function dealHand() { // deal a hand with 5 cards
    dealtHand = [];
    if (deck.length > 4) {
        for (e = 0; e < 5; e++) {
            dealtCard = deck[0];
            deck.splice(0, 1);
            dealtHand.push(dealtCard);
        }
        arrangeHand();
        showActualHand(dealtHand);
        showHand();
        checkHand();
        return `There are ${deck.length} cards left.`;
    } else if (deck.length <= 4 && deck.length > 0) {
        for (f = deck.length; f > 0; f--) {
            dealtCard = deck[0];
            deck.splice(0, 1);
            dealtHand.push(dealtCard);
        }
        arrangeHand();
        showHand();
        return `There are ${deck.length} cards left.`;
    } else {
        return `There are no cards left to play.`;
    }
    
}

function showActualHand(x) {
    temp = [];
    dealtValues = [];
    temp = deepCopyFunction(dealtHand);
    for (y = 0; y < x.length; y++) {
        if (temp[y].substr(1) !== '10') {
            dealtValues.push(temp[y].substr(1));
        } else {
            dealtValues.push('X');
        }
    }
    console.log(
    `
┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐
│${x[0][0]}${dealtValues[0]}       ││${x[1][0]}${dealtValues[1]}       ││${x[2][0]}${dealtValues[2]}       ││${x[3][0]}${dealtValues[3]}       ││${x[4][0]}${dealtValues[4]}       │
│         ││         ││         ││         ││         │
│         ││         ││         ││         ││         │
│    ${x[0][0]}    ││    ${x[1][0]}    ││    ${x[2][0]}    ││    ${x[3][0]}    ││    ${x[4][0]}    │
│         ││         ││         ││         ││         │
│         ││         ││         ││         ││         │ 
│       ${x[0][0]}${dealtValues[0]}││       ${x[1][0]}${dealtValues[1]}││       ${x[2][0]}${dealtValues[2]}││       ${x[3][0]}${dealtValues[3]}││       ${x[4][0]}${dealtValues[4]}│
└─────────┘└─────────┘└─────────┘└─────────┘└─────────┘
    `
    )
}

function dealAllHands() { // deal 5-card hands until deck is exhausted
    createDeck();
    shuffleDeck();
    dealtHand = [];
    console.log(`Dealing all available hands....`);
    do {
        for (g = 0; g < 5; g++) {
            dealtCard = deck[0];
            deck.splice(0, 1);
            dealtHand.push(dealtCard);
        }
        arrangeHand();
        showActualHand(dealtHand);
        showHand();
        checkHand();
        console.log(`There are ${deck.length} cards left.`);
        dealtHand = [];
    } while (deck.length > 4);
    return `Not enough cards left for a 5-card Hand.`;
}

function clearTempDeck() { 
    spades = [];
    diamonds = [];
    hearts = [];
    clubs = [];
    temp = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
}

function arrangeDown(arr) { // sort cards to descending order
    clearTempDeck();
    arr = arr.sort((a,b) => {
        return (faceValue.indexOf(a.substr(1)) > faceValue.indexOf(b.substr(1))) ? 1 : -1;
    });
}

function identifyCard() { // identify card
    value = faceNames[faceValue.indexOf(dealtCard.substr(1))];
    suit = suitNames[suitSymbols.indexOf(dealtCard[0])];
}

function checkHand() {
    arrangeHand();

    dealtValues = [];
    temp = deepCopyFunction(dealtHand);

    for (h = 0; h < temp.length; h++) {
        dealtValues.push(temp[h].substr(1));
    }

    // console.log(dealtHand);
    // console.log(dealtValues);

    resetHandCheck();
    checkSameSuit();
    checkRoyal();
    checkStraight();
    checkFourThree();
    checkFullHouse();
    checkPair();
    
    // console.log(`is straight? ${isStraight}`);
    // console.log(`is same suit? ${isSameSuit}`);
    // console.log(`is royal? ${isRoyal}`);
    // console.log(`is four of a kind? ${isFour}`);
    // console.log(`is three of a kind? ${isThree}`);
    // console.log(`is full house? ${isFullHouse}`);
    // console.log(`is two pair? ${isTwoPair}`);
    // console.log(`is one pair? ${isOnePair}`);
    
    if (isRoyal && isSameSuit) {
        console.log(`You got a Royal Flush!`);
    } else if (isSameSuit && isStraight) {
        console.log(`You got a Straight Flush!`);
    } else if (isFour) {
        console.log(`You got Four of a Kind!`);
    } else if (isFullHouse) {
        console.log(`You got a Full House!`);
    } else if (isSameSuit) {
        console.log(`You got a Flush!`);
    } else if (isStraight) {
        console.log(`You got a Straight!`);
    } else if (isThree) {
        console.log(`You got Three of a Kind!`);
    } else if (isTwoPair) {
        console.log(`You got a Two Pair!`);
    } else if (isOnePair) {
        console.log(`You got One Pair!`);
    } else {
        console.log(`You got a High Card, ${dealtHand[0]}`);
    }
}

function arrangeHand() { // sort dealt hand to descending order
    arrangeDown(dealtHand);
}

function checkSameSuit() {
    if (dealtHand[0][0] === dealtHand[1][0] && dealtHand[1][0] === dealtHand[2][0] &&
        dealtHand[2][0] === dealtHand[3][0] && dealtHand[3][0] === dealtHand[4][0]) {
        isSameSuit = true;
    }
}

function checkStraight() {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < faceValue.length; j++) {
            if (dealtValues[i] === faceValue[j] && dealtValues[i+1] === faceValue[j+1] &&
                dealtValues[i+2] === faceValue[j+2] && dealtValues[i+3] === faceValue[j+3] &&
                dealtValues[i+4] === faceValue[j+4] && dealtValues[i] !== undefined && 
                dealtValues[i+1] !== undefined && dealtValues[i+2] !== undefined &&
                dealtValues[i+3] !== undefined && dealtValues[i+4] !== undefined &&
                faceValue[j] !== undefined && faceValue[j+1] !== undefined &&
                faceValue[j+2] !== undefined && faceValue[j+3] !== undefined && 
                faceValue[j+4] !== undefined) {
                isStraight = true;
            }
        }
    }                       
}

function checkRoyal() {
    if (dealtValues[0] === 'K' && dealtValues[1] === 'Q' && dealtValues[2] === 'J' &&
        dealtValues[3] === '10' && dealtValues[4] === 'A') {
        isRoyal = true;
    }
}

function checkFourThree() {
    if ((dealtValues[0] === dealtValues[1] && dealtValues[1] === dealtValues[2] &&
        dealtValues[2] === dealtValues[3]) ||
        (dealtValues[1] === dealtValues[2] && dealtValues[2] === dealtValues[3] &&
        dealtValues[3] === dealtValues[4]))  {
        isFour = true;
    } else if ((dealtValues[0] === dealtValues[1] && dealtValues[1] === dealtValues[2]) ||
        (dealtValues[1] === dealtValues[2] && dealtValues[2] === dealtValues[3]) ||
        (dealtValues[2] === dealtValues[3] && dealtValues[3] === dealtValues[4])) {
        isThree = true;
    }

}

function checkFullHouse() {
    if (dealtValues[0] === dealtValues[1] && dealtValues[1] === dealtValues[2] &&
        dealtValues[3] === dealtValues[4]) {
        isFullHouse = true;
    } else if (dealtValues[0] === dealtValues[1] && dealtValues[2] === dealtValues[3] &&
        dealtValues[3] === dealtValues[4]) {
        isFullHouse = true;
    }
}

function checkPair() {
    if ((dealtValues[0] === dealtValues[1] && dealtValues[2] === dealtValues[3]) ||
        (dealtValues[0] === dealtValues[1] && dealtValues[3] === dealtValues[4]) ||
        (dealtValues[1] === dealtValues[2] && dealtValues[3] === dealtValues[4])) {
        isTwoPair = true;
    } else if (dealtValues[0] === dealtValues[1] || dealtValues[1] === dealtValues[2] ||
        dealtValues[2] === dealtValues[3] || dealtValues[3] === dealtValues[4]) {
        isOnePair = true;
    }
}

function resetHandCheck() {
    isSameSuit = false;
    isRoyal = false;
    isStraight = false;
    isFour = false;
    isThree = false;
    isFullHouse = false;
    isTwoPair = false;
    isOnePair = false;
}

function showHand() {
    console.log(`You got: ${JSON.stringify(dealtHand)}`);
}

function showDeck() {
    return JSON.stringify(deck);   
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


// test dealtHand = ['♦K', '♦Q', '♦J', '♦10', '♦9'] straight
// test dealtHand = ['♦10', '♦9', '♦8', '♦7', '♦6'] straight flush
// test dealtHand = ['♦K', '♦Q', '♦J', '♦10', '♦A'] royal flush
// test dealtHand = ['♠4', '♦4', '♥4', '♣4', '♦A'] four of a kind
// test dealtHand = ['♦3', '♦3', '♦3', '♦4', '♦A'] three of a kind
// test dealtHand = ['♦4', '♦3', '♦3', '♦3', '♦4'] three of a kind
// test dealtHand = ['♦5', '♦3', '♦3', '♦3', '♦4'] three of a kind

