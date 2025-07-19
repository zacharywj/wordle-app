import { wordBank } from './word-bank.js'; // imports the word bank from the word-bank.js file

// constants and variables
// initializes number of guesses and sets up the game state
const numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses; // sets the user's guesses remaining for start of game
let gameOver = false; // sets the game state to not over at the start
let currentGuess = []; // empty array to hold the user's current guess
let nextLetter = 0; // index to track the next letter to be added to the current guess


// selecting a random word from the word bank
let correctGuess = wordBank[Math.floor(Math.random() * wordBank.length)];

console.log(correctGuess); // logs the randomly selected word to the console to check work



// function to create the game board with specified number of rows and columns
function gameBoard() {
    // selects the game-board element from HTML index file
    let board = document.getElementById('game-board');

    // clears the board before creating a new one
    for (let i = 0; i < numberOfGuesses; i++) {
        let row = document.createElement('div'); // creates a new div for each row.
        row.className = 'letter-row'; // assigns a class name to the row for styling and functionality.

        // creates 5 letter boxes for each row
        for (let j = 0; j < 5; j++) {
            let box = document.createElement('div'); // creates a new div for each letter box.
            box.className = 'letter-box'; // assigns a class name to the letter box for styling and functionality.
            box.textContent = ''; // initializes the text content of the letter box to an empty string. *********************************************
            row.appendChild(box); // adds the letter boxes to the given row
        }
        board.appendChild(row); // adds the given row to the game board.
    }
}

gameBoard(); // calls the gameBoard function above to create and display the game board.



/* ************************************************* EVENT LISTENERS *************************************************
primary event listener for different key presses that handles user input for the game and manages the game state.
when specific key presses received from user, listener calls the appropriate functions to handle them (such as  when adding/deleting letters, or submitting/checking guesses. */
document.addEventListener('keypress', (event) => { // event listener for key presses.
    if (guessesRemaining === 0) {
        return; // if out of guesses, return and do nothing.
    }

    let pressedKey = String(event.key); // gets the key that was pressed and converts it to a string
    if (pressedKey === 'Backspace' && nextLetter !== 0) { // if key pressed is backspace and there is input in the current guess delete the last letter
        deleteLetter(); 
        return; // if backspace is pressed, delete the last letter and return
    }

    if (pressedKey === 'Enter') {
        checkGuess(); // calls the checkGuess function if Enter key is pressed.
        return; // if so, check the guess and return
    }

    let found = pressedKey.match(/^[a-zA-Z]$/); // checks if the pressed key is a letter (a-z or A-Z)
    if (found && nextLetter < 5) { // checks if input is 'found' or valid, and if there is space remaining in the current guess...
        addLetter(pressedKey.toUpperCase()); // calls the addLetter function with the pressed key as an argument.
    }
});


/* ************************************************* FUNCTIONS *************************************************
functions to handle user input, validate guesses and update the game state (as called by the event listener above). */

// addLetter() -- function to accept/validate user input called by the event listener when a letter key is pressed:
function addLetter(letter) {
    if (nextLetter < 5) { // checks if there is space in the current guess (5 letters max).
        let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining]; // selects the current row based on guesses remaining.
        let box = row.getElementsByClassName('letter-box')[nextLetter]; // selects the current letter box in the current row.
        box.textContent = letter; // sets the text content of the letter box to the pressed letter.
        currentGuess.push(letter); // adds the pressed letter to the current guess array.
        nextLetter++; // increments the index for the next letter to be added.

        console.log(currentGuess); // logs the current guess to the console for debugging purposes.
        // expected output to console: array with each letter input, i.e ['A', 'B', 'C', 'D', 'E'].
    }
}



// deleteLetter() -- function to remove the last letter from the current guess when called by the event listener when the Backspace key is pressed:
function deleteLetter() {
    if (nextLetter > 0) { // checks if there are letters to delete.
        let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining]; // selects the current row based on guesses remaining.
        let box = row.getElementsByClassName('letter-box')[nextLetter - 1]; // selects the last letter box in current row.
        currentGuess.pop(); // removes the last letter from the current guess
        nextLetter--; // decrements the index for the next letter to be added.

    }
}



// checkGuess() -- function to validate the user's guess called by the event listener when the Enter key is pressed:
function checkGuess() {

}