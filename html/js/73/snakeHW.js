const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');
const SNAKE_SIZE = 64;
const gameOverSound = document.querySelector('#game_over');
const snakeHead = document.createElement('img');
snakeHead.src = 'snakeHead.png';
const apple = document.createElement('img');
apple.src = 'apple.png';

let appleX = getRandomSpot(0, theCanvas.width / SNAKE_SIZE - 1) * SNAKE_SIZE;
let appleY = getRandomSpot(0, theCanvas.height / SNAKE_SIZE - 1) * SNAKE_SIZE;
let gameOver = false;
let x = -SNAKE_SIZE;
let y = 0;
let direction = 'ArrowRight';
let score = 0;
let firstTime = true;
let wentDown = false;

function getRandomSpot(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function triggerSoundGO() {
  try {
    await gameOverSound.play();
  } catch (error) {
    console.log('Playback prevented:', error.name);
  }
}

function crash() {
    triggerSoundGO();
    direction = null;
    gameOver = true;
}

const interval = setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    switch (direction) {
        case 'ArrowUp':
            y -= SNAKE_SIZE;
            break;
        case 'ArrowDown':
            y += SNAKE_SIZE;
            break;
        case 'ArrowLeft':
            x -= SNAKE_SIZE;
            break;
        case 'ArrowRight':
            x += SNAKE_SIZE;
            break;
    }
    context.drawImage(snakeHead, x, y);
    context.drawImage(apple, appleX, appleY);

    if (x === appleX && y === appleY) {
        console.log('you ate an apple');
        score += 10;
        appleX = getRandomSpot(0, theCanvas.width / SNAKE_SIZE - 1) * SNAKE_SIZE;
        appleY = getRandomSpot(0, theCanvas.height / SNAKE_SIZE - 1) * SNAKE_SIZE;
    }

    if (x === (theCanvas.width - SNAKE_SIZE)) {
        crash();
    } else if (!firstTime && x === 0) {
        crash();
    } else if (y === (theCanvas.height - SNAKE_SIZE)) {
        crash();
    } else if (!firstTime && y === 0 && wentDown) {
        crash();
    } else if (!firstTime && y < 0 && !wentDown) {
        crash();
    }

    if (gameOver) {
        clearInterval(interval);
    }

    firstTime = false;

    // Filling in the Score
    context.fillStyle = 'green';
    context.font = '32px cursive';
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);
}, 500);

function sizeCanvas() {
theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

snakeHead.onload = () => {
    interval;
};

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
            direction = e.key;
            console.log(e.key);
            break;
        case 'ArrowDown':
            direction = e.key;
            console.log(e.key);
            wentDown = true;
            break;
        default:
            console.log(`${e.key} not processed.`);
    }
});
