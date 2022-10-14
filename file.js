let word = document.getElementById('word');
let text = document.getElementById('text');
let scoreEl = document.getElementById('score');
let timeEl = document.getElementById('time');
let endContainer = document.getElementById('end-game-container');
let difficultySelect = document.getElementById('diffculty');
let settingsBtn = document.getElementById('setting-btn');
let settingsForm = document.getElementById('settings-form');
let settings = document.querySelector('.settings');
let container = document.querySelector('.container');
// declare class - .
// declare id - #

let time = 10;
let score = 0;
let randomWord;
// focus function focuses the intial cursor to the textbox
text.focus();
let words = ['airplane','Shrey', 'Patel', 'donkey','english','lion','conservation','evaporation',
'food','cycle','promise','black','orange','silver'];
// session storage - stores data for one session only
// local storage - after first trail, local storage stores the value set by user
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = difficulty; 

// Math.Random return value between 0-1 eg: 0.22
// Math.floor return the floor number (round off) value

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}
function randomWordOnPage(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
randomWordOnPage();
function calcScore(){
    score++;
    scoreEl.innerHTML = score;
}
let calTime = setInterval(timeLeft,1000);
function timeLeft(){
    time--;
    timeEl.innerHTML = `${time}s`;
    if(time === 0){
        clearInterval(calTime);
        endContainer.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
        `;
        endContainer.style.display = 'flex';
    }
}

text.addEventListener('input', (e) => {
    let currentText = e.target.value;
    if(currentText === randomWord){
         randomWordOnPage();
         calcScore();
         if(difficultySelect.value === 'hard'){
             time += 2;
         }else if(difficultySelect.value === 'medium'){
             time += 4;
         }else{
             time += 6;
         }
         timeLeft();
         e.target.value = '';
    }
});
settingsBtn.addEventListener('click',(e) => {
    settings.classList.toggle('hide');
});
settingsForm.addEventListener('change',(e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
});


