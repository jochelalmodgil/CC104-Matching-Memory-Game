
// initialize
let attempts = 0
let matches = 0
let firstCard = null
let secondCard = null
let lockBard = false

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
        let j = Math.floor(Math.random() * (i + 1))
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

let shuffledCards = shuffle([...baseCards])


function renderBoard() {
    let board = $('#game-board')
    board.empty()

    shuffledCards.forEach((card, index) => {
        let cardElement = $('<div>')
            .addClass('memory-card')
            .attr('data-index', index)
            .attr('data-name', card.name)
            .text(card.content)

        board.append(cardElement)
    })
}

renderBoard()