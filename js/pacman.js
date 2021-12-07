'use strict'
const PACMAN = '😷';

var gPacman;
var deletedGhosts = []
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        currCellContent: ''
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    // TODO: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    console.log(gPacman.location);
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return
    // TODO: hitting a ghost?  call gameOver

    if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true
        setTimeout(function () { gPacman.isSuper = false; }, 5000);
    }
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            var gohstIDX = getGohstIDX(nextLocation.i, nextLocation.j)
            console.log(gohstIDX)
            deletedGhosts.push(gGhosts.splice(gohstIDX, 1))
            console.log(deletedGhosts)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }

    // TODO: moving from current position:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
    // TODO: Move the pacman to new location
    // TODO: update the model
    gPacman.location = nextLocation
    gPacman.currCellContent = nextCell
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getGohstIDX(locationI, locationJ) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === locationI && gGhosts[i].location.j === locationJ)
            return i
    }
}

function getNextLocation(eventKeyboard) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default:
            return null

    }

    return nextLocation;
}