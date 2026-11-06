
// initialize
let attempts = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let baseCards = [
    {id: 1, name: "gift", content: '🎁'},
    {id: 2, name: "gift", content: '🎁'},
    {id: 3, name: "tree", content: '🎄'},
    {id: 4, name: "tree", content: '🎄'},
    {id: 5, name: "santa", content: '🎅'},
    {id: 6, name: "santa", content: '🎅'},
    {id: 7, name: "snowflake", content: '❄️'},
    {id: 8, name: "snowflake", content: '❄️'},
    {id: 9, name: "bell", content: '🔔'},
    {id: 10, name: "bell", content: '🔔'},
    {id: 11, name: "deer", content: '🦌'},
    {id: 12, name: "deer", content: '🦌'},

]

//shuffle yung cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
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
            .text(card.content)

        board.append(cardElement);
    })
}

renderBoard();



// click cards event   jQuery

$('#game-board').on('click', '.memory-card', function() {
    let clickedCard = $(this);
    let index = clickedCard.attr('data-index');

    if (lockBoard || clickedCard.hasClass('flipped') || clickedCard.hasClass('matched')) return

    let cardData = shuffledCards[index];
    clickedCard.text(cardData.content).addClass('flipped');

    if(!firstCard) {
        firstCard = {element: clickedCard, name: cardData.name};
        return;

    }

    secondCard = {element: clickedCard, name: cardData.name}
    attempts++
    $('#attemps').text(attempts);
})

function checkForMatch() {
    let isMatch = firstCard.name === secondCard.name;

    if (isMatch) {
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.element.addClass('matched');
    secondCard.element.addClass('matched');
    matches++;
    $('#matches').text(`${matches} / 6`);

    resetBoardState();
}


function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.element.text('?').removeClass('flipped');
        secondCard.element.text('?').removeClass('flipped');
        resetBoardState()
    }, 1000)
}

function resetBoardState() {
    [firstCard, secondCard, lockBoard] = [null, null, false]
}