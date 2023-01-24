const FRONT = "card_front";
const BACK  = "card_back";
const CARD  = "card";
const ICON  = "icon";
const FLIP  = "flip";


startGame();

function startGame(){
    // cards = game.createCardsFromTechs();
    // shuffleCards(cards);

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card=>{

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);

    })
}

function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementFace);
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

// createCardsFromTechs(techs);

// function createCardsFromTechs(techs){
//     let cards = [];
//     for(let tech of techs){
//         cards.push(createPairFromTech(tech))
//     }
//     return cards.flatMap(pair=>pair);
// }

// function createPairFromTech(tech){
//     return [
//         {
//             id: createIdWithTech(tech),
//             icon: tech,
//             flipped: false
//         },
//         {
//             id: createIdWithTech(tech),
//             icon: tech,
//             flipped: false
//         }
//     ]
// }

// function createIdWithTech(tech){
//     return tech + parseInt(Math.random() * 1000);
// }

function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){

            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(()=>{

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unFlipCard();
                }, 1000);
            };
        }
    }
}

function restart() {
    // window.location.reload();
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
};