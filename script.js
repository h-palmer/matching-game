const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
const scoreKeeper = document.getElementById('score');
scoreKeeper.innerText = score;


function flipCard() {
    if (lockBoard) {
        return;
    }
    if (this === firstCard) {
        return;
    }
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        
    // isMatch ? disableCards() : unFlipCards();

    if (isMatch) {
        disableCards();
        addScore();
        setTimeout(() => {
            endGame()
        }, 200);
    }
    else {
        unFlipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function addScore() {
    score = score + 10;
    scoreKeeper.innerText = score;
    
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function endGame() {
    if (score === 60) {
            alert('You Won!')
    }
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
