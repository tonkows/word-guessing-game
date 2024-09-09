const words = [
  "apple",
  "banana",
  "orange",
  "mango",
  "strawberry",
  "grape",
  "pineapple",
  "blueberry",
  "raspberry",
  "blackberry",
  "kiwi",
  "watermelon",
  "cantaloupe",
  "honeydew",
  "papaya",
  "guava",
  "lychee",
  "dragonfruit",
  "passionfruit",
  "grapefruit",
  "lime",
  "lemon",
  "cherry",
  "peach",
  "nectarine",
  "apricot",
  "plum",
  "pomegranate",
  "fig",
  "date",
  "persimmon",
  "tangerine",
  "clementine",
  "kumquat",
  "durian",
  "jackfruit",
  "starfruit",
  "avocado",
  "coconut",
  "cranberry",
  "currant",
  "gooseberry",
  "elderberry",
  "quince",
  "pear",
  "acai",
  "sapodilla",
  "soursop",
  "mulberry",
  "boysenberry",
  "loganberry",
  "jambolan",
  "salak",
  "rambutan",
  "longan",
  "pomelo",
];


let chosenWord;
let guessedLetters = [];
let attemptsLeft = 10;
let gameOver = false; 

function initGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  attemptsLeft = 10;
  gameOver = false; 

  displayWord();
  displayLetters();
  displayGuessedLetters();
  displayAttempts();
}

function displayWord() {
  const wordDisplay = document.getElementById("word");
  wordDisplay.innerHTML = chosenWord
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
    )
    .join(" ");
}

function displayLetters() {
  const lettersDiv = document.getElementById("letters");
  lettersDiv.innerHTML = "";

  for (let letter = 65; letter <= 90; letter++) {
    const letterButton = document.createElement("button");
    letterButton.innerText = String.fromCharCode(letter);
    letterButton.addEventListener("click", () =>
      handleLetterClick(String.fromCharCode(letter))
    );
    lettersDiv.appendChild(letterButton);
  }
}

function displayGuessedLetters() {
  const guessedDiv = document.getElementById("guessedLetters");
  guessedDiv.innerHTML = `Guessed letters: ${guessedLetters.join(", ")}`;
}

function displayAttempts() {
  const attemptsDiv = document.getElementById("attempts");
  attemptsDiv.innerHTML = `Attempts left: ${attemptsLeft}`;
}

function handleLetterClick(letter) {
  if (gameOver) {
    return; 
  }

  if (guessedLetters.includes(letter.toLowerCase())) {
    alert("You've already guessed this letter. Try another one.");
    return;
  }

  guessedLetters.push(letter.toLowerCase());

  if (!chosenWord.includes(letter.toLowerCase())) {
    attemptsLeft = Math.max(attemptsLeft - 1, 0);
  }

  displayWord();
  displayGuessedLetters();
  displayAttempts();
  disableLetterButton(letter);
  checkGameStatus();
}

function disableLetterButton(letter) {
  const buttons = document.querySelectorAll("#letters button");
  buttons.forEach((button) => {
    if (button.innerText === letter) {
      button.disabled = true;
      button.style.backgroundColor = "#ccc";
      button.style.cursor = "not-allowed";
    }
  });
}

function checkGameStatus() {
  const wordDisplay = document.getElementById("word");
  const messageDisplay = document.getElementById("message");
  const playAgainButton = document.getElementById("playAgain");

  if (chosenWord.split("").every((letter) => guessedLetters.includes(letter))) {
    messageDisplay.innerText = "Congratulations! You've won!";
    playAgainButton.style.display = "block";
    gameOver = true; 
  } else if (attemptsLeft === 0) {
    messageDisplay.innerText = `Game over! The word was "${chosenWord}".`;
    playAgainButton.style.display = "block";
    gameOver = true; 
  }
}

function resetGame() {
  initGame();

  document.getElementById("message").innerText = "";
  document.getElementById("playAgain").style.display = "none";
}

window.onload = initGame;
