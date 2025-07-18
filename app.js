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
        let row = document.createElement('div'); // creates a new div for each row
        row.className = 'letter-row'; // assigns a class name to the row for styling

        // creates 5 letter boxes for each row
        for (let j = 0; j < 5; j++) {
            let box = document.createElement('div'); // creates a new div for each letter box
            box.className = 'letter-box'; // assigns a class name to the letter box for styling
            row.appendChild(box); // adds the letter boxes to the row
        }
        // adds each row to the game board
        board.appendChild(row);
    }
}

gameBoard(); // calls the gameBoard function to create and display the game board




// functions to handle key presses
document.addEventListener('keypress', (event) => { // listens for key presses on the document
    if (guessesRemaining === 0) {
        return; // if out of guesses, do nothing
    }

    let pressedKey = String(event.key); 

    if (pressedKey === 'Backspace' && nextLetter !== 0) { // checks if backspace is pressed and if there are letters to delete
        deleteLetter(); // calls the deleteLetter function
        return; // if backspace is pressed, delete the last letter and return
    }

    if (pressedKey === 'Enter') {
        checkGuess(); // calls the checkGuess function if enter is pressed
        return; // if enter is pressed, check the guess and return
    }

    if (pressedKey.match(/^[a-zA-Z]$/) && nextLetter < 5) { // checks if the pressed key is a letter and if there is space in the current guess
        addLetter(pressedKey.toUpperCase()); // calls the addLetter function with the pressed key as an argument
    }
    
});