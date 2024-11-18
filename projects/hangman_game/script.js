const wordEl = document.getElementById('word');
const wrongLetterE = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// We are selecting all the classes that has the class .figure-part
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

// Randomnize the selection of the words
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Accumulate the words
const correctLetters = ['r'];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
            )
            .join('')}
        `;
}