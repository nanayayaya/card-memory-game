// Cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Deck of all cards in game
const deck = document.getElementById("card-deck");

// Declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// Declaring variables for star icons
const stars = document.querySelectorAll(".fa-star");

// Declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// Stars list
let starsList = document.querySelectorAll(".stars li");

// Close icon in modal
let closeicon = document.querySelector(".close");

// Declare modal
let modal = document.getElementById("popup1");

// Array for opened cards
var openedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle cards on page load/refresh
document.body.onload = startGame();

// Function to start a new game
function startGame() {
    // Empty the openCards array
    openedCards = [];

    // Shuffle deck
    cards = shuffle(cards);
    
    // 修复: 先清空deck内容，然后重新添加所有卡片
    deck.innerHTML = "";
    // Remove all existing classes from each card
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("show", "open", "match", "disabled", "unmatched");
        deck.appendChild(cards[i]);
    }
    
    // Reset moves
    moves = 0;
    counter.innerHTML = moves;
    
    // Reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFCC00";
        stars[i].style.visibility = "visible";
    }
    
    // Reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// Display card function - 修改为明确添加类而不是切换
var displayCard = function() {
    if (!this.classList.contains("open") && !this.classList.contains("match") && !this.classList.contains("disabled")) {
        this.classList.add("open");
        this.classList.add("show");
        this.classList.add("disabled");
    }
};

// Add opened cards to OpenedCards list and check if cards match
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

// When cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// When cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}

// Disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

// Enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// Count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    
    // Start timer on first click
    if(moves == 1) {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    
    // Setting rates based on moves
    if (moves > 8 && moves < 12) {
        for(i = 0; i < 3; i++) {
            if(i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 13) {
        for(i = 0; i < 3; i++) {
            if(i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// Timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        if(minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// Congratulations when all cards match, show modal and stats
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // Show congratulations modal
        modal.classList.add("show");

        // Declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        // Show moves, rating, time
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // Close icon on modal
        closeModal();
    }
}

// Close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}

// Play again function
function playAgain() {
    modal.classList.remove("show");
    startGame();
}

// Loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
}
