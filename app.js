import { wordBank } from './word-bank.js'; // imports the word bank from the word-bank.js file

/* *************************************************** GLOBAL VARIABLES *************************************************
global constants and variables used throughout the app.js file to manage the game state, user input, and logic. */
// constants/variables that initialize the number of guesses and set up the game state.
const numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses; // sets the user's guesses remaining for start of game.
let gameOver = false; // sets the game state to not over at the start.
let currentGuess = []; // empty array to hold the user's current guess.
let nextLetter = 0; // index to track the next letter to be added to the current guess.


// selecting a random word from the word bank
let correctGuess = wordBank[Math.floor(Math.random() * wordBank.length)];

console.log(correctGuess); // logs the randomly selected word to the console to check work.





/* ************************************************* EVENT LISTENERS *************************************************
primary event listener for different key presses that handles user input for the game and manages the game state.
when specific key presses received from user, listener calls the appropriate functions to handle them (such as  when adding/deleting letters, or submitting/checking guesses. */
// primary event listener that handles user inputs from keyboard (on-screen or physical) and updates game state accordingly.
document.addEventListener('keydown', (event) => { // event listener for key presses.
    if (guessesRemaining === 0) {
        return; // if out of guesses, do nothing and return to the event listener.
    }

    let pressedKey = String(event.key); // gets the key that was pressed and converts it to a string
    if (pressedKey === 'Backspace') { // if key pressed is backspace and there is input in the current guess...
        deleteLetter(); // calls the deleteLetter function to remove the last letter from the current guess.
        return; // returns to the event listener to wait for the next key press.
    }


    if (pressedKey === 'Enter') {
        checkGuess(); // calls the checkGuess function if Enter key is pressed.
        return; // if so, check the guess and return to the event listener to wait for the next key press.
    }

    let found = pressedKey.match(/^[a-zA-Z]$/); // checks if the pressed key is a letter (a-z or A-Z)
    if (found && nextLetter < 5) { // checks if input is 'found' or valid, and if there is space remaining in the current guess...
        addLetter(pressedKey); // calls the addLetter function with the pressed key as an argument.
    }
});

// event listener to generate input from the on-screen keyboard:
document.getElementById('keyboard').addEventListener('click', (event) => {
    const target = event.target; // gets the element/keyboard button that was clicked.

    if (!target.classList.contains('key')) {
        return; // if the clicked element is not a key, do nothing and return to the event listener.
    }

    let key = target.textContent; // gets the text content of the clicked key.
    if (key === 'DEL' || key === 'Delete') {
        key = 'Backspace'; // if the key is 'DEL' or 'Delete', sets it to 'Backspace' for consistency with the keydown event listener.
    }
    if (key === 'GUESS' || key === 'Enter') {
        key = 'Enter'; // if the key is 'GUESS' or 'Enter', sets it to 'Enter' for consistency with the keydown event listener.
    }

    document.dispatchEvent(new KeyboardEvent('keydown', {'key': key})); 
    // dispatches a new keyboard event with the pressed key to trigger the same functionality as the keydown event listener.
    // this allows the on-screen keyboard to work the same way as the physical keyboard.
});

// event listener for the dropdown menu (instructions) to toggle visibility when the button is clicked:
document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.querySelector('.dropbtn');
  const dropdownContent = document.querySelector('.dropdown-content');

  dropdownBtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('show'); // Toggles a 'show' class
  });

  // Optional: Close dropdown when clicking outside
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    }
  });
});


/* ************************************************* FUNCTIONS *************************************************
functions to handle user input, validate guesses and update the game state (as called by the event listener above). */

// function to create the game board with specified number of rows and columns.
function gameBoard() {
    // selects the game-board element from HTML index file.
    let board = document.getElementById('game-board');

    // clears the board before creating a new one
    for (let i = 0; i < numberOfGuesses; i++) {
        let row = document.createElement('div'); // creates a new div for each row.
        row.className = 'letter-row'; // assigns a class name to the row for styling and functionality.

        // creates 5 letter boxes for each row
        for (let j = 0; j < 5; j++) {
            let box = document.createElement('div'); // creates a new div for each letter box.
            box.className = 'letter-box'; // assigns a class name to the letter box for styling and functionality.
            //box.textContent = ''; // initializes the text content of the letter box to an empty string. *********************************************
            row.appendChild(box); // adds the letter boxes to the given row
        }
        board.appendChild(row); // adds the given row to the game board.
    }
}

gameBoard(); // calls the gameBoard function above to create and display the game board.




// addLetter() -- function to accept/validate user input called by the event listener when a letter key is pressed:
function addLetter(letter) {
    if (nextLetter === 5) { // checks if the current guess is full (5 letters max).
        return; // if so, return and do nothing.
        }
    if (nextLetter < 5) { // checks if there is space in the current guess (5 letters max).
        let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining]; // selects the current row based on guesses remaining.
        let box = row.children[nextLetter]; // selects the current letter box in the current row.
        animateCSS(box, "pulse"); // applies a pulse animation to the letter box when a letter is added.
        //let box = row.getElementsByClassName('letter-box')[nextLetter]; // selects the current letter box in the current row.
        box.textContent = letter; // sets the text content of the letter box to the pressed letter.
        currentGuess.push(letter); // adds the pressed letter to the current guess array.
        nextLetter++; // increments the index for the next letter to be added.
        box.classList.add('filled'); // adds a class to the letter box indicating it's occupied (can be used for styling and functionality in other fxns).

        console.log(currentGuess); // logs the current guess to the console for debugging purposes.
    }
}


// deleteLetter() -- function to remove the last letter from the current guess when called by the event listener when the Backspace key is pressed:
function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining]; // selects the current row based on guesses remaining.
    let box = row.children[nextLetter - 1]; // selects the last letter box in the current row.
    box.textContent = ''; // clears the text content of the letter box.
    box.classList.remove('filled'); // removes the 'filled' class from the letter box.
    currentGuess.pop(); // removes the last letter from the current guess.
    nextLetter--; // decrements the index for the next letter to be added.
    console.log(currentGuess); // logs the current guess to the console for debugging purposes.
}




// shadeKeyboard() -- function to update the keyboard letter colors based on the user's guess:
function shadeKeyboard(letter, color) {
    for (const elem of document.getElementsByClassName('key')) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor; // gets the current background color of the key.
            if (oldColor === 'cyan') {
                return; // if the key is already blue, do nothing and return.
            } 
            if (oldColor === 'pink' && color !== 'cyan') {
                return; // if the key is already pink and the new color is not blue, do nothing and return.
            }

            elem.style.backgroundColor = color; // sets the background color of the key to the new color.
            break; // breaks out of the loop after updating the key color.
        }
    }
}








function checkGuess () {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]; // selects the current row based on guesses remaining.
    let guessString = ''; // initializes an empty string to hold the guessed word.
    let rightGuess = Array.from(correctGuess); // converts the correctGuess into an array for comparison to the user's guess.


    

    for (const val of currentGuess) {
        guessString += val; // builds the guessed word string from the current guess array.
    }

    if (guessString.length != 5) { // checks if the current guess is not 5 letters long/invalid.
        toastr.error("Guesses must be 5 letters!! 🤣 Try again, silly."); // alerts the user if their guess is not long enough.
        return; // returns to the event listener to wait for the next key press.
    }

    if (!wordBank.includes(guessString)) { // checks if the guessed word is not in the word bank/invalid.
        toastr.error("Hmmm, I don't know that word. 🤨 Try another one."); // alerts the user if their guess is not in the word bank.
        return; // returns to the event listener to wait for the next key press.
    }


    for (let i = 0; i < 5; i++) {
        let letterColor = ''; // variable initialized to hold the color for the letter boxes.
        let box = row.children[i]; // selects the current letter box in the current row.
        let letter = currentGuess[i]; // gets the current letter from the user's guess.

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) { // if the letter is not in the correct guess...
            letterColor = 'grey' // sets the letter box color to grey.
        } else { // if the letter IS in the correct guess...
            if (currentGuess[i] === rightGuess[i]) { // checks if letter is in the rightGuess AND in right position by index...
                letterColor = 'cyan'; // shades the letter box green if so.
            } else { // if the letter is in the rightGuess but NOT in the right position as well...
                letterColor = 'pink'; // shades the letter box yellow if so.
            }

            rightGuess[letterPosition] = '#'; // marks the letter as checked by replacing it with a placeholder.
        }

        let delay = 250 * i; // sets a delay for the letter box color change animation.
        // set a timeout to change the letter box color after the delay.
        setTimeout(()=> {
            animateCSS(box, 'flipInX'); // applies a flip-in animation to the letter box when the letter is checked.
            box.style.backgroundColor = letterColor; // changes the background color of the letter box to the determined color.
            shadeKeyboard(letter, letterColor); // calls the shadeKeyboard function to update the keyboard letter color based on the user's guess.
        }, delay); // applies the delay to the letter box color change animation.
    }

    if (guessString === correctGuess) { // checks if the user's guess matches the correct guess.
        // alerts the user if they guessed the word correctly.
        toastr.success("You guessed my word!! You win! 🎉");
        guessesRemaining = 0; // sets guesses remaining to 0 to end the game.
        return;
    } else { // if the guess was incorrect...
        guessesRemaining -= 1; // decrements the guesses remaining by 1 if the guess was incorrect.
        currentGuess = []; // resets the current guess array for the next guess.
        nextLetter = 0; // resets the index for the next letter to be added.
        if (guessesRemaining === 0) { // checks if the user has run out of guesses.
            // alerts the user if they ran out of guesses and what the answer was.
            toastr.error("Oof, you ran out of guesses! 😢 That's game over, baby.");
            toastr.info(`The word I was thinking of was: "${correctGuess}"`); // informs the user of the correct word.
        }
    }
}




// function utilizing animate.css to utilize the animation library for visual effects in the game.
const animateCSS = (element, animation, prefix = 'animate__') => { // adds the animateCSS function to apply animations to elements.
    return new Promise((resolve, reject) => { // creates a new Promise to handle the animation.
        const animationName = `${prefix}${animation}`; // constructs the animation class name.
        
        const node = element;
        node.style.setProperty('--animate-duration', '0.5s'); // sets the animation duration to 0.5 seconds.
        node.classList.add(`${prefix}animated`, animationName); // adds the animation classes to the element.

        function handleAnimationEnd(event) { // function to handle the end of the animation.
            node.classList.remove(`${prefix}animated`, animationName); // removes the animation classes from the element.
            resolve('Animation ended'); // resolves the Promise when the animation ends.
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true}); // adds an event listener for the animation end event to handle cleanup.
    });
}


