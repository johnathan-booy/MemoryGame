let gameContainer;
let symbolQuantity;
let turnCount = 0;

function createGameContainer(id) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", id);
  document.querySelector("body").append(newDiv);
  gameContainer = document.querySelector("#" + id);
}

createGameContainer("menu");

// Create object for the different difficulty of symbols
const easySymbols = [];
const moderateSymbols = [];
const expertSymbols = [];
let availableSymbols = [];

function createSymbol(array, elementID, elementName, elementSymbol) {
  array.push({ name: elementName, symbol: elementSymbol, id: elementID });
}

// Easy
createSymbol(easySymbols, "whole-note", "Whole Note", "𝅝");
createSymbol(easySymbols, "half-note", "Half Note", "𝅗𝅥");
createSymbol(easySymbols, "quarter-note", "Quarter Note", "𝅘𝅥");
createSymbol(easySymbols, "quarter-rest", "Quarter Rest", "𝄽");
createSymbol(easySymbols, "repeat-sign", "Repeat Sign", "𝄇");
createSymbol(easySymbols, "bass-clef", "Bass Clef", "𝄢");
createSymbol(easySymbols, "treble-clef", "Treble Clef", "𝄞");
createSymbol(easySymbols, "staff", "Staff", "𝄚");
createSymbol(easySymbols, "bar", "Bar", "𝄀𝄚𝄀");

// Moderate
createSymbol(moderateSymbols, "eighth-notes", "Eighth Note", "𝅘𝅥𝅮");
createSymbol(moderateSymbols, "whole-rest", "Whole Rest", "𝄻");
createSymbol(moderateSymbols, "half-rest", "Half Rest", "𝄼");
createSymbol(moderateSymbols, "eighth-rest", "Eighth Rest", "𝄾");
createSymbol(moderateSymbols, "flat", "Flat", "♭");
createSymbol(moderateSymbols, "natural", "Natural", "♮");
createSymbol(moderateSymbols, "sharp", "Sharp", "♯");
createSymbol(moderateSymbols, "end-barline", "End Bar Line", "𝄂");
createSymbol(moderateSymbols, "octave-sign", "Octave Sign", "𝄶");

// Expert
createSymbol(expertSymbols, "fermata", "Fermata", "𝄐");
createSymbol(expertSymbols, "sixteenth-note", "Sixteenth Note", "𝅘𝅥𝅯");
createSymbol(expertSymbols, "sixteenth-rest", "Sixteenth Rest", "𝄿");
createSymbol(expertSymbols, "trill", "Trill", "𝆖");
createSymbol(expertSymbols, "pedal", "Pedal Marking", "𝆮 𝆯");
createSymbol(expertSymbols, "rolled-chord", "Rolled Chord", "𝆃");

function createStartButtons() {
  // create Elements
  const easyModeButton = document.createElement("button");
  const moderateModeButton = document.createElement("button");
  const expertModeButton = document.createElement("button");

  // Set Classes
  easyModeButton.classList.add("start-button");
  moderateModeButton.classList.add("start-button");
  expertModeButton.classList.add("start-button");

  // Set ID's
  easyModeButton.setAttribute("id", "easy-mode");
  moderateModeButton.setAttribute("id", "moderate-mode");
  expertModeButton.setAttribute("id", "expert-mode");

  // Set Text
  easyModeButton.innerText = "Easy";
  moderateModeButton.innerText = "Moderate";
  expertModeButton.innerText = "Expert";

  // Create Event Listeners
  easyModeButton.addEventListener("click", startGame);
  moderateModeButton.addEventListener("click", startGame);
  expertModeButton.addEventListener("click", startGame);

  // Append
  gameContainer.append(easyModeButton);
  gameContainer.append(moderateModeButton);
  gameContainer.append(expertModeButton);
}

function createGameOverDisplay(userScore, lowestScore) {
  gameContainer.remove();
  document.querySelector("#turn-counter").innerText = "";
  createGameContainer("menu");

  // create Elements
  const userScoreDiv = document.createElement("div");
  const lowestScoreDiv = document.createElement("div");
  const restartButton = document.createElement("button");

  // Set Classes
  userScoreDiv.classList.add("game-over");
  lowestScoreDiv.classList.add("game-over");
  restartButton.classList.add("game-over");

  // Set ID's
  userScoreDiv.setAttribute("id", "user-score");
  lowestScoreDiv.setAttribute("id", "lowest-score");
  restartButton.setAttribute("id", "restart-button");

  // Set Text
  userScoreDiv.innerHTML = `<p>Your Score <br> ${userScore}</p>`;
  if (lowestScore < userScore) {
    lowestScoreDiv.innerHTML = `<p>Lowest Score <br> ${lowestScore}</p>`;
  } else {
    lowestScoreDiv.innerHTML = `<p>New Lowest Score!</p>`;
  }
  restartButton.innerText = "New Game";

  // Create Event Listener
  restartButton.addEventListener("click", function () {
    gameContainer.remove();
    createGameContainer("menu");
    createStartButtons();
  });

  // Append
  gameContainer.append(userScoreDiv);
  gameContainer.append(lowestScoreDiv);
  gameContainer.append(restartButton);
}

function shuffle(array) {
  // Fisher-Yates shuffle
  // Move backwards over the array, and stop before the very first index
  for (let counter = array.length; counter > 0; counter--) {
    const oldIdx = counter - 1;
    const randomIdx = Math.floor(Math.random() * oldIdx);

    // Swap positions
    const element = array[oldIdx];
    array[oldIdx] = array[randomIdx];
    array[randomIdx] = element;
  }
  return array;
}

function randomIdxArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array[i] = i;
  }
  return shuffle(array);
}

function seperateSymbols(idxArray, symbolArray) {
  const newArray = [];
  idxArray.forEach((idx) => {
    newArray.push({ id: symbolArray[idx].id, text: symbolArray[idx].symbol, fontType: "music-symbol" });
    newArray.push({ id: symbolArray[idx].id, text: symbolArray[idx].name, fontType: "symbol-name" });
  });
  return newArray;
}

function createDivs(idxArray, symbolArray) {
  for (let idx of idxArray) {
    // create new elements
    const newCard = document.createElement("div");
    const newInner = document.createElement("div");
    const newFront = document.createElement("div");
    const newBack = document.createElement("div");
    const newBackImg = document.createElement("img");
    const newFrontText = document.createElement("p");

    // set the classes
    newBackImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png";
    newCard.classList.add("card");
    newInner.classList.add("card-inner");
    newFront.classList.add("card-front");
    newBack.classList.add("card-back");
    newFrontText.classList.add("card-text");
    newFrontText.classList.add(symbolArray[idx].fontType);

    // create a dataset for ids
    newCard.dataset.id = symbolArray[idx].id;

    // Set the text for the front side of the card
    newFrontText.innerText = symbolArray[idx].text;

    // call a function handleCardClick when a div is clicked on
    newCard.addEventListener("click", handleCardClick);

    // Append and organize the div's
    newFront.append(newFrontText);
    newBack.append(newBackImg);
    newInner.append(newFront);
    newInner.append(newBack);
    newCard.append(newInner);
    gameContainer.append(newCard);
  }
}

function startGame(event) {
  // Reset turnCount
  turnCount = 0;

  // Remove startButtons
  gameContainer.remove();

  // Choose the available symbols
  if (event.currentTarget.getAttribute("id") === "easy-mode") {
    createGameContainer("easy-game");
    gameType = "easy";
    symbolQuantity = 4;
    gameContainer = document.getElementById("easy-game");
    availableSymbols = easySymbols;
  } else if (event.currentTarget.getAttribute("id") === "moderate-mode") {
    createGameContainer("moderate-game");
    gameType = "moderate";
    symbolQuantity = 6;
    gameContainer = document.getElementById("moderate-game");
    availableSymbols = easySymbols.concat(moderateSymbols);
  } else if (event.currentTarget.getAttribute("id") === "expert-mode") {
    createGameContainer("expert-game");
    gameType = "expert";
    symbolQuantity = 9;
    gameContainer = document.getElementById("expert-game");
    availableSymbols = easySymbols.concat(moderateSymbols).concat(expertSymbols);
  }

  // Display turn count
  document.querySelector("#turn-counter").innerText = "Turns: " + turnCount;

  // Randomly choose Symbols
  // We only want as many symbols as we can fit on the board
  let symbolIDXs = randomIdxArray(availableSymbols.length).splice(0, symbolQuantity);

  // Create seperate objects for symbols and their names, since they will be on seperate cards
  const allCards = seperateSymbols(symbolIDXs, availableSymbols);
  cardIDXs = randomIdxArray(allCards.length);

  // Create the gameboard
  createDivs(cardIDXs, allCards);
}

function handleCardClick(event) {
  const card = event.currentTarget;
  const cardFront = event.currentTarget.firstChild.firstChild;

  // Mark the div as .clicked
  let clickedCards = document.querySelectorAll(".selected");
  // clickedCards.push(card);
  if (clickedCards.length < 2) {
    card.classList.add("face-up");
    card.classList.add("selected");
  }

  clickedCards = document.querySelectorAll(".selected");
  if (clickedCards.length === 2) {
    turnCount++;
    document.querySelector("#turn-counter").innerText = "Turns: " + turnCount;
    if (clickedCards[0].dataset.id === clickedCards[1].dataset.id) {
      clickedCards[0].classList.add("matched");
      clickedCards[1].classList.add("matched");
      clickedCards[0].classList.remove("selected");
      clickedCards[1].classList.remove("selected");
      clickedCards[0].removeEventListener("click", handleCardClick);
      clickedCards[1].removeEventListener("click", handleCardClick);

      // Check if the game is finished
      if (document.querySelectorAll(".matched").length === symbolQuantity * 2) {
        // Set the bestScore if no previous game was played, or the current game had the lowest turnCount to date
        const lowestScore = localStorage[`${gameType}Record`];
        if (lowestScore === undefined || parseInt(lowestScore) > turnCount) {
          localStorage[`${gameType}Record`] = turnCount;
        }
        createGameOverDisplay(turnCount, lowestScore);
      }
    } else {
      setTimeout(function () {
        clickedCards[0].classList.add("shake");
        clickedCards[1].classList.add("shake");
      }, 500);

      setTimeout(function () {
        clickedCards[0].classList.remove("shake");
        clickedCards[1].classList.remove("shake");
      }, 1000);

      setTimeout(function () {
        clickedCards[0].classList.remove("face-up");
        clickedCards[1].classList.remove("face-up");
        clickedCards[0].classList.remove("selected");
        clickedCards[1].classList.remove("selected");
      }, 1000);
    }
  }
}

// When the DOM Loads
createStartButtons();
