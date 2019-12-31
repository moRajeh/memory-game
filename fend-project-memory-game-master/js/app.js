/*
 * (done)Create a list that holds all of your cards
 */

let array = [];
let interval;
let minutes = 0;
let seconds = 0;
let openCards = [];
let movesNumber = 0;
let correctMove = 0; //increment this variable every time the user pick the correct two cards.
let numberOfStarts = 3;


const allCards = document.querySelectorAll('.card');
allCards.forEach(function(e) {
    array.push(e.children[0].className);

});

shuffle(array);
console.log(array);
let cardsDeck = document.querySelector('.deck');

displayCards();

function displayCards() {
    cardsDeck.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        let element = document.createElement('li');
        element.classList.add('card');
        element.innerHTML = `<i class="${array[i]}"></i>`;
        cardsDeck.append(element);
        element.addEventListener('click', cardClicked);
    }
    startTimer();
}


function restartAll() {
    document.querySelector('.winDialog').open = false;
    shuffle(array);
    movesNumber = 0;
    document.querySelector('.moves').textContent = String(movesNumber);
    seconds = 0;
    minutes = 0;
    window.clearInterval(interval);
    correctMove = 0;
    displayCards();
}
reset = document.querySelector('.restart');
reset.addEventListener('click', restartAll);



/*
 * Display the cards on the page
 * (done)  - shuffle the list of cards using the provided "shuffle" method below
 *  (done) - loop through each card and create its HTML
 *  (done) - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
console.log(array);

/*
 * (done) set up the event listener for a card. If a card is clicked:
 * (done) - display the card's symbol (put this functionality in another function that you call from this one)
 * (done) - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * (done) - if the list already has another card, check to see if the two cards match
 *   (done) + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *   (done) + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *   (done) + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// allCards.forEach(function(card) {
//     card.addEventListener('click', cardClicked);
//     // console.log(card.childNodes[0].classList);

// });


function cardClicked(e) {
    let theCard = e.target;
    console.log(theCard.children[0].className);
    theCard.classList.add('open', 'show');
    addCard(theCard);
}

function addCard(card) {
    if (openCards.length <= 1) {
        openCards.push(card.children[0].className);
        console.log(openCards);

    }
    if (openCards.length == 2) {
        console.log(openCards);
        checkCards();
        incMoves();
    }
    console.log(card.classList);
}

function checkCards() {
    if (openCards[0] == openCards[1]) {
        setTimeout(lockCards, 200);
    } else {
        console.log('remove the cards');
        setTimeout(removeCards, 400);
    }
}

function lockCards() {
    document.getElementsByClassName(openCards[0])[0].parentElement.classList.add('match');
    document.getElementsByClassName(openCards[1])[1].parentElement.classList.add('match');
    correctMove++;
    if (correctMove == 8) {
        window.clearInterval(interval);
        openDialog();
    }
    openCards = [];

}
//in this function i'm trying to find which copy is selected so i flip down.
function removeCards() {
    let firstElement = document.getElementsByClassName(openCards[0])[0].parentElement;
    let firstElement2 = document.getElementsByClassName(openCards[0])[1].parentElement;
    let secondElement = document.getElementsByClassName(openCards[1])[0].parentElement;
    let secondElement2 = document.getElementsByClassName(openCards[1])[1].parentElement;


    if (firstElement.classList.contains('show')) {
        firstElement.classList.remove('show', 'open');
    } else {
        firstElement2.classList.remove('show', 'open');
    }


    if (secondElement.classList.contains('show')) {
        secondElement.classList.remove('show', 'open');
    } else {
        secondElement2.classList.remove('show', 'open');
    }

    openCards = [];
    console.log(openCards);
}

function incMoves() {
    movesNumber++;
    stars = document.querySelector('.stars');
    document.querySelector('.moves').textContent = String(movesNumber);
    if (movesNumber == 10) {
        stars.children[0].style.display = 'none';
        numberOfStarts = 2;
    }
    if (movesNumber == 12) {
        stars.children[1].style.display = 'none';
        numberOfStarts = 1;

    }
}





function startTimer() {
    interval = setInterval(function() {
        document.querySelector('.sec').innerHTML = seconds < 10 ? '0' + String(seconds) : String(seconds);
        seconds++;
        if (seconds == 60) {
            minutes++;
            document.querySelector('.min').innerHTML = minutes < 10 ? '0' + String(minutes) : String(minutes);
            seconds = 0;
            document.querySelector('.sec').innerHTML = seconds < 10 ? '0' + String(seconds) : String(seconds);
        }

    }, 1000);
}

function openDialog() {
    document.querySelector('.timePassed').innerHTML = `${minutes}:${seconds}`;
    document.querySelector('.starsNumber').innerHTML = `${numberOfStarts}`;
    document.querySelector('.winDialog').showModal();
    document.querySelector('.restartButton').addEventListener('click', restartAll);
}