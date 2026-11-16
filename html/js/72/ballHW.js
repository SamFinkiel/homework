const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');
const colorInput = document.querySelector('#colorInput');
const sizeInput = document.querySelector('#numInput');
const addBallBtn = document.querySelector('#addBall');
const balls = [];

class Ball {
    constructor(color, size) {
        this.color = color;
        if (isNaN(size) || size <= 0) {
            this.size = 10;
        } else {
            this.size = size;
        }
        this.x = this.size + 1;
        this.y = this.size + 1;
        this.dx = 1;
        this.dy = 1;
    }
    bounce() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < (this.size + 1) || this.x >= window.width - (this.size + 1)) {
            this.dx = -this.dx;
        }
        if (this.y < (this.size + 1) || this.y >= window.innerHeight - (this.size + 1)) {
            this.dy = -this.dy;
        }
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

function sizeCanvas() {
    theCanvas.width = window.innerWidth;
    theCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

function createBall() {
    const b = new Ball(colorInput.value, sizeInput.valueAsNumber);
    balls.push(b);
}

addBallBtn.addEventListener('click', createBall);

setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    balls.forEach(ball => {
        ball.draw();
        ball.bounce();
    });
}, 1);

