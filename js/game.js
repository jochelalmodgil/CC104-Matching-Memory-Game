// initialize
let attempts = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let baseCards = [
    {
        id: 1,
        name: "gift",
        content: '<img src="images/gift.png" alt="Gift">'
    },
    {
        id: 2,
        name: "gift",
        content: '<img src="images/gift.png" alt="Gift">'
    },

    {
        id: 3,
        name: "tree",
        content: '<img src="images/tree.png" alt="Tree">'
    },
    {
        id: 4,
        name: "tree",
        content: '<img src="images/tree.png" alt="Tree">'
    },

    {
        id: 5,
        name: "santa",
        content: '<img src="images/santa.png" alt="Santa">'
    },
    {
        id: 6,
        name: "santa",
        content: '<img src="images/santa.png" alt="Santa">'
    },

    {
        id: 7,
        name: "snowflake",
        content: '<img src="images/snowflake.png" alt="Snowflake">'
    },
    {
        id: 8,
        name: "snowflake",
        content: '<img src="images/snowflake.png" alt="Snowflake">'
    },

    {
        id: 9,
        name: "bell",
        content: '<img src="images/bell.png" alt="Bell">'
    },
    {
        id: 10,
        name: "bell",
        content: '<img src="images/bell.png" alt="Bell">'
    },

    {
        id: 11,
        name: "deer",
        content: '<img src="images/deer.png" alt="Deer">'
    },
    {
        id: 12,
        name: "deer",
        content: '<img src="images/deer.png" alt="Deer">'
    }
];

// shuffle yung cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledCards = shuffle([...baseCards]);

function renderBoard() {
    let board = $('#game-board');
    board.empty();

    shuffledCards.forEach((card, index) => {
        let cardElement = $('<div>')
            .addClass('memory-card')
            .attr('data-index', index)
            .attr('data-name', card.name)
            .text('?');

        board.append(cardElement);
    });
}

renderBoard();

// click cards event jQuery

$('#game-board').on('click', '.memory-card', function() {

    let clickedCard = $(this);
    let index = clickedCard.attr('data-index');

    if (lockBoard || clickedCard.hasClass('flipped') || clickedCard.hasClass('matched')) {
        return;
    }

    let cardData = shuffledCards[index];

    clickedCard.html(cardData.content).addClass('flipped');

    if (!firstCard) {
        firstCard = {
            element: clickedCard,
            name: cardData.name
        };
        return;
    }

    secondCard = {
        element: clickedCard,
        name: cardData.name
    };

    attempts++;
    $('#attempts').text(attempts);

    checkForMatch();
});

function checkForMatch() {

    let isMatch = firstCard.name === secondCard.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {

    firstCard.element
        .removeClass('flipped')
        .addClass('matched');

    secondCard.element
        .removeClass('flipped')
        .addClass('matched');

    matches++;
    $('#matches').text(`${matches} / 6`);

    if (matches === 6) {
        setTimeout(() => {
            let playAgain = confirm(
                `🎉 Congratulations!\n\nYou won in ${attempts} attempts!\n\nPlay again?`
            );

            if (playAgain) {
                $('#restart-btn').click();
            }
        }, 300);
    }

    resetBoardState();
}

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

       firstCard.element
            .html('?')
            .removeClass('flipped');

        secondCard.element
            .html('?')
            .removeClass('flipped');
      
            resetBoardState();

    }, 1000);
}

function resetBoardState() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart Game

$('#restart-btn').click(function () {

    attempts = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    $('#attempts').text('0');
    $('#matches').text('0 / 6');

    shuffledCards = shuffle([...baseCards]);

    renderBoard();
});