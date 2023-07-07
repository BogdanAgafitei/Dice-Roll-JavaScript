'use strict';

const sectionPlayer1 = document.querySelector('.player--0');
const sectionPlayer2 = document.querySelector('.player--1');

let scorePlayer1 = Number(document.querySelector('#score--0').textContent);
let scorePlayer2 = Number(document.querySelector('#score--1').textContent);

let currentPlayer1 = Number(document.querySelector('#current--0').textContent);
let currentPlayer2 = Number(document.querySelector('#current--1').textContent);

let dice = document.querySelector('.dice');

const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdScoreButton = document.querySelector('.btn--hold');

function checkIfWinner(){
    // Player 1 is the winner
    if(scorePlayer1 >= 100){
        sectionPlayer1.classList.add('player--winner');
        rollDiceButton.disabled = true;
        holdScoreButton.disabled = true;
        // Player 2 is the winner
    }else if(scorePlayer2 >= 100){
        sectionPlayer2.classList.add('player--winner');
        rollDiceButton.disabled = true;
        holdScoreButton.disabled = true;
    }
}
function changeTurn() {
    // From player 1 to player 2
    if (sectionPlayer1.classList.contains('player--active')) {
        sectionPlayer1.classList.remove('player--active');
        sectionPlayer2.classList.add('player--active');
        // From player 2 to player 1
    } else {
        sectionPlayer2.classList.remove('player--active');
        sectionPlayer1.classList.add('player--active');
    }
}

function startANewGame() {
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    sectionPlayer2.classList.remove('player--active');
    sectionPlayer1.classList.add('player--active');
    sectionPlayer1.classList.remove('player--winner');
    sectionPlayer2.classList.remove('player--winner');
    rollDiceButton.disabled = false;
    holdScoreButton.disabled = false;
}

function rollDice() {
    // Randomize the dice
    let number = Math.trunc(Math.random() * 6) + 1;
    dice.src = 'dice-' + number + '.png';

    //Player 1 turn
    if (sectionPlayer1.classList.contains('player--active')) {
        //Dice with 1 lose the current points
        if (number === 1) {
            changeTurn();
            currentPlayer1 = 0;
            document.querySelector('#current--0').textContent = 0;
        } else {
            currentPlayer1 += number;
            document.querySelector('#current--0').textContent = currentPlayer1;
        }
        //Player 2 turn
    } else {
        //Dice with 1 lose the current points
        if (number === 1) {
            changeTurn();
            currentPlayer2 = 0;
            document.querySelector('#current--1').textContent = 0;
        } else {
            currentPlayer2 += number;
            document.querySelector('#current--1').textContent = currentPlayer2;
        }
    }
}

function hold() {
    //Player 1 hold
    if (sectionPlayer1.classList.contains('player--active')) {
        scorePlayer1 += currentPlayer1;
        currentPlayer1 = 0;
        document.querySelector('#score--0').textContent = scorePlayer1;
        document.querySelector('#current--0').textContent = 0;
        checkIfWinner()
        changeTurn();
        //Player 2 hold
    } else {
        scorePlayer2 += currentPlayer2;
        currentPlayer2 = 0;
        document.querySelector('#score--1').textContent = scorePlayer2;
        document.querySelector('#current--1').textContent = 0;
        checkIfWinner()
        changeTurn();
    }
}

newGameButton.addEventListener('click', startANewGame);
rollDiceButton.addEventListener('click', rollDice);
holdScoreButton.addEventListener('click', hold);