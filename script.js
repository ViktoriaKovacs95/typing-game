const quotes = [
    'Never forget what you are. The rest of the world will not.',
    'The things I do for love',
    'Winter is coming',
    'The man who passes the sentence should swing the sword'
];

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');
let wordQueue;
let highlightPosition;
let startTime;
function startGame() {
    console.log("Game started!");
    document.body.className = "";
    start.className = "started";
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    wordQueue = quoteText.split(' ');
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');


    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';
    
    startTime = new Date().getTime();
}
start.addEventListener('click', startGame); 
input.addEventListener('input', checkInput);

function checkInput() {
    const currentWord = wordQueue[0].replaceAll(".","").replaceAll(","," ");
    const typedValue = input.value.trim();

    if (currentWord !== typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }

    wordQueue.shift(); 
    input.value = ""; 
    quote.childNodes[highlightPosition].className = ""; // unhighlight word

    if (wordQueue.length === 0) { // if we have run out of words then game over.
        gameOver();
        return;
    }

    highlightPosition++;                             
    quote.childNodes[highlightPosition].className = 'highlight';    
}

function gameOver() {
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `<span class="congrats">Congratulations!</span><br>You finished in ${elapsedTime / 1000} seconds;`
}