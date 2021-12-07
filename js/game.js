'use strict'
const WALL = '#'
const FOOD = '.'
const SUPERFOOD = '🍔'
const CHERRY = '🍒'
const EMPTY = ' ';

var gIntervalCherry;
var modal = document.querySelector('.modal')
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    modal.style.display = 'none'
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(putCherry, 15000)
}

function playAgain() {
    init()

}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === 1 && j === 8)
                || (i === 8 && j === 1) || (i === 8 && j === 8)) {
                board[i][j] = SUPERFOOD
            }
        }
    }
    return board;
}



function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === 60) {
        gGame.isOn = false
        clearInterval(gIntervalGhosts)
        clearInterval(gIntervalCherry)
        winOrLose('Victory!')
    }

}

function gameOver() {
    console.log('Game Over');
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    renderCell(gPacman.location, '')
    gGame.isOn = false
    // TODO
    winOrLose('Game Over!')
}



function putCherry(){
    var emptyLocations = []
    emptyLocations =  findEmptyLocation()
    var idx = getRandomIntInclusive(0,emptyLocations.length)
    gBoard[emptyLocations[idx].i][emptyLocations[idx].j] = CHERRY
    renderCell(emptyLocations[idx],CHERRY)
    }



function findEmptyLocation() {
    var emptyLocations = []
    var emptyLocation = {
        i: 0,
        j: 0
    }
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === ' ') {
                emptyLocation.i = i
                emptyLocation.j = j
                emptyLocations.push(emptyLocation)
            }
        }
    }
    return emptyLocations
}


function winOrLose(state) {
    // Todo: update the modal content and use openModal
    var elBlessBtn = document.querySelector('.modal h2')
    elBlessBtn.innerText = state
    openModal()
  }

