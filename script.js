let word = document.getElementById('word');
let text = document.getElementById('text');
let scoreEl = document.getElementById('score');
let timeEl = document.getElementById('time');
let endContainer = document.getElementById('end-game-container');
let diffcultySelect = document.getElementById('diffculty');
let settingsBtn = document.getElementById('setting-btn');
let settingsForm = document.getElementById('settings-form');
let settings = document.querySelector('.settings');
let container = document.querySelector('.container');

let time = 20;
let score = 0;
let randomWord;
text.focus();
let diffculty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
diffcultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


let words = ['airplane','donkey','english','lion','conservation','evaporation','food','cycle','promise','shrey'];

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}
randomWordOnPage();
function randomWordOnPage(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
function calcScore(){
    score++;
    scoreEl.innerHTML = score;
}
let timeupdate = setInterval(timeLeft,1000);
function timeLeft(){
    time--;
    timeEl.innerHTML = `${time}s`;
    if(time === 0){
        clearInterval(timeupdate);
        gameOver();
    }
}
function gameOver(){
    endContainer.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button class="reload" onclick = 'location.reload()'>Reload</button>
        
        `;
        endContainer.style.display = 'flex';

}
text.addEventListener('input', (e) => {
    let currentText = e.target.value;
    if(currentText === randomWord){
        randomWordOnPage();
        calcScore();
        if(diffcultySelect.value === 'hard'){
            time += 2;
        }else if(diffcultySelect.value === 'medium'){
           time += 4;
        }else{
            time += 6;
        }
        
        e.target.value = '';
        timeLeft();
    }
});
settingsBtn.addEventListener('click', (e) => {
     settings.classList.toggle('hide');
});
settingsForm.addEventListener('change',(e) => {
     diffculty = e.target.value;
     localStorage.setItem('difficulty',diffculty);
     console.log(diffculty);
});



