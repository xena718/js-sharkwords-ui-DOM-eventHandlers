const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

const numWrong = 0;

// Loop over the chars in `word` and create divs.
// The divs should be appended to the section with id="word-container".
const createDivsForChars = (word) => {
  for (const char of word){
    const container = document.querySelector('#word-container');
    container.insertAdjacentHTML('beforeend', `<div class="letter-box ${char}"></div>`);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons"
const generateLetterButtons = () => {
  for (const letter of ALPHABET){
    const container = document.querySelector("#letter-buttons");
    container.insertAdjacentHTML('beforeend', `<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
    //const container = document.querySelector("#buttonEl");
    buttonEl.disabled = true
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter) => {
    return document.querySelector(`div.${letter}`) !== null;

    // const in_word = (document.querySelector(`div.${letter}`))
    // return (in_word.length > 0)
};

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  const letterDivs = document.querySelectorAll(`div.${letter}`);
  for (const div of letterDivs) {
    div.innerHTML = letter;
    correctGuesses += 1;
  }
  if (correctGuesses === word.length) {
    document.querySelector("#win").style.display = "block";
  }
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;

  document
    .querySelector("#shark-img img")
    .setAttribute("src", `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    const buttons = document.querySelectorAll("buttons");

    for (const button of buttons) {
      button.disabled = true;
    }

    document.querySelector("#play-again").style.display = "block";
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = "/sharkwords";
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // Math.random() gives us a random number between 0 and 1
  // we multiply it by the length of the list to get a random
  // index in the list and then round down since it may be a decimal
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  createDivsForChars(word);
  generateLetterButtons();

  const buttons = document.querySelectorAll("button");

  for (const button of buttons) {
    button.addEventListener("click", (event) => {
      const clickedBtn = evt.target;
      disableLetterButton(clickedBtn);

      const letter = clickedBtn.textContent;

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter, word);
      } else {
        handleWrongGuess(letter);
      }
    });
  }

  document.querySelector("#play-again").addEventListener("click", resetGame);
  document.querySelector("#win").addEventListener("click", resetGame);
})();
