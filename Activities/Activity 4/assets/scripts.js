/* add onclick event to pieces */
var allPieces = document.querySelectorAll('.piece');
allPieces.forEach(item => {
    item.addEventListener('click', event => {
        var activePiece = document.querySelectorAll('.active-piece');

        if (activePiece.length === 0) {
            var pieceId = event.target.id;
            var activePiece =  document.getElementById(pieceId);
            activePiece.classList.add("active-piece");
        } else if (event.target.id === activePiece[0].id) {
            // clear selection when re-selecting piece
            clearSelection();   
        } else if (event.target.classList.contains('black') && activePiece[0].classList.contains('black')) {
            // prevent same color taking
            clearSelection();   
        } else if (event.target.classList.contains('white') && activePiece[0].classList.contains('white')) {
            // prevent same color taking
            clearSelection();   
        } else {
            // put taken piece to respective piles
            if (event.target.classList.contains('black')) {
                var whitePile = document.querySelector('.taken-white');
                whitePile.appendChild(event.target);
            } else if (event.target.classList.contains('white')) {
                var blackPile = document.querySelector('.taken-black');
                blackPile.appendChild(event.target);
            }
        }
    });
});

// add onclick events to tiles

var allTiles = document.querySelectorAll('.tile');
allTiles.forEach(item => {
    item.addEventListener('click', event => {
        var activePiece = document.querySelector('.active-piece');

        // move active piece to empty tile
        if (event.target.classList.contains('possible-move')){
        event.target.appendChild(activePiece);
        activePiece.classList.remove('active-piece');
        } else {
            return `invalid move`;
        };

        // move active piece to place of captured piece
        if (!item.hasChildNodes()) {
            item.appendChild(activePiece);
            activePiece.classList.remove('active-piece');
        };

        // avoid doubling of piece inside a tile
        if (item.childElementCount > 1) {
            item.removeChild(item.firstChild);
            activePiece.classList.remove('active-piece');
        };
        
    });
});

/* clear active piece */

function clearSelection() {
    var activePiece = document.querySelector('.active-piece');
    activePiece.classList.remove('active-piece');
}


// generate chess logo stitches

function generateLogo() {

    const stitchBoard = document.querySelector('.chess-logo');
    const stitchBoard2 = document.querySelector('.chess-logo2');

    removeAllStitch(stitchBoard);
    removeAllStitch(stitchBoard2);

    for (i = 0; i < 186; i++) {
        generateLogoTask(i);
        generateLogoTask2(i);     
    }

    function generateLogoTask(i) {
        setTimeout(function() {
            var stitch = document.createElement('div');
            if (i == 7 ||i == 8 ||i == 9 ||i == 10 ||i == 13 ||i == 14 ||i == 19 ||i == 20 ||i == 25 ||i == 26 ||i == 31 ||
                i == 32 ||i == 33 ||i == 34 ||i == 43 ||i == 44 ||i == 46 ||i == 49 ||i == 50 ||i == 52 ||i == 55 ||i == 56 ||
                i == 58 ||i == 61 ||i == 62 ||i == 63 ||i == 64 ||i == 67 ||i == 68 ||i == 70 ||i == 79 ||i == 80 ||i == 81 ||
                i == 82 ||i == 85 ||i == 86 ||i == 91 ||i == 92 ||i == 93 ||i == 97 ||i == 98 ||i == 103 ||i == 104 ||i == 105 ||
                i == 106 ||i == 115 ||i == 116 ||i == 117 ||i == 118 ||i == 121 ||i == 122 ||i == 127 ||i == 128 ||i == 129 ||
                i == 130 ||i == 135 ||i == 136 ||i == 139 ||i == 140 ||i == 141 ||i == 142 ||i == 151 ||i == 152 ||i == 153 ||
                i == 154 ||i == 157 ||i == 158 ||i == 163 ||i == 164 ||i == 165 ||i == 166 ||i == 171 ||i == 172 ||i == 175 ||
                i == 176 ||i == 177 ||i == 178) {
                stitch.className = 'stitch';
            }

            // fade in effect
            stitch.style.opacity = 0;
            stitchBoard.appendChild(stitch);
            
            for (j = 1; j <= 10; j++) {
                opacityTask(j);
            }

            function opacityTask(j) {
                setTimeout(function() {
                    stitch.style.opacity = j/10;
                }, 50 * j);
            }

        }, 8 * i);                
    }

    function generateLogoTask2(i) {
        setTimeout(function() {
            var stitch = document.createElement('div');
            if (i == 7 || i == 8 || i == 9 || i == 13 || i == 14 || i == 16 || i == 19 || i == 20 || i == 21 || i == 25 ||
                i == 26 || i == 28 || i == 31 || i == 32 || i == 32 || i == 33 || i == 43 || i == 44 || i == 45 || i == 46 || i == 49 ||
                i == 50 || i == 52 || i == 55 || i == 56 || i == 58 || i == 61 || i == 62 || i == 64 || i == 67 || i == 68 ||
                i == 69 || i == 70 || i == 79 || i == 80 || i == 81 || i == 82 || i == 85 || i == 87 || i == 88 || i == 91 ||
                i == 93 || i == 94 || i == 97 || i == 98 || i == 99 || i == 100 || i == 103 || i == 105 || i == 106 || i == 115 ||
                i == 116 || i == 117 || i == 118 || i == 121 || i == 122 || i == 124 || i == 127 || i == 128 || i == 130 ||
                i == 133 || i == 134 || i == 135 || i == 139 || i == 140 || i == 142 || i == 151 || i == 152 || i == 153 ||
                i == 157 || i == 158 || i == 160 || i == 163 || i == 164 || i == 166 || i == 169 || i == 170 || i == 172 ||
                i == 175 || i == 176 || i == 177) {
                stitch.className = 'stitch';
            }

            // fade in effect
            stitch.style.opacity = 0;
            stitchBoard2.appendChild(stitch);
            
            for (k = 1; k <= 10; k++) {
                opacityTask(k);
            }

            function opacityTask(k) {
                setTimeout(function() {
                    stitch.style.opacity = k/10;
                }, 50 * k);
            }

        }, 8 * i);                
    }

    function removeAllStitch(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
};
    
// show trivia
function showTrivia() {

    const triviaPane = document.querySelector('.trivia-box');

    if (triviaPane.style.opacity == 0) {
        for (k = 1; k <= 100; k++) {
            opacityTrivia(k);
        }

        function opacityTrivia(k) {
            setTimeout(function() {
                triviaPane.style.opacity = k/100;
            }, 5 * k);
        }
    } else {
        for (k = 1; k <= 100; k++) {
            opacityTrivia(k);
        }

        function opacityTrivia(k) {
            setTimeout(function() {
                triviaPane.style.opacity = 1 - k/100;
            }, 5 * k);
        }
    }
}
