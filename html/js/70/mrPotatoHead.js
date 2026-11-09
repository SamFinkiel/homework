const drawingSpace = document.getElementById('drawingSpace');
let dragPiece = null;
let topZindex = 2;
let offset;

const parts = document.querySelectorAll('.part');

parts.forEach(part => {
    part.addEventListener('mousedown', e => {
        const piece = createPiece(e.target.src);
        startDrag(piece, e);
    });
});

function startDrag(piece, e) {
    e.preventDefault();
    offset = { x: e.offsetX, y: e.offsetY };
    piece.style.zIndex = topZindex++;
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    dragPiece = piece;
    mouseMove(e);
}

function mouseMove(e) {
    const board = drawingSpace.getBoundingClientRect();
    dragPiece.style.top = `${e.clientY - board.y - offset.y}px`;
    dragPiece.style.left = `${e.clientX - board.x - offset.x}px`;
}

function mouseUp() {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
    save();
}

function createPiece(src) {
    const piece = document.createElement('img');
    piece.src = src;
    piece.classList.add('piece');
    drawingSpace.appendChild(piece);
    piece.addEventListener('mousedown', e => startDrag(piece, e));
    return piece;
}

function save() {
    const pieces = document.querySelectorAll('.piece');
    const list = [];
    pieces.forEach(p => {
        list.push({
            src: p.src,
            left: p.style.left,
            top: p.style.top,
            z: p.style.zIndex,
        });
    });
    localStorage.setItem('potato', JSON.stringify(list));
}

function load() {
    const text = localStorage.getItem('potato');
    if (!text) return;

    const list = JSON.parse(text);
    list.forEach(item => {
        const piece = createPiece(item.src);
        piece.style.left = item.left;
        piece.style.top = item.top;
        piece.style.zIndex = item.z;

        // keep the counter higher than any loaded piece
        if (Number(item.z) >= topZindex) {
            topZindex = Number(item.z) + 1;
        }
    });
}

load();

// Getting the button to work

const music = document.querySelector('#music');
const button = document.querySelector('#musicButton');
let paused = true;
button.addEventListener('click', playMusic);

function playMusic() {
    if (paused) {
        music.play();
        paused = false;
        button.textContent = 'Pause Music';
    } else {
        music.pause();
        paused = true;
        button.textContent = 'Play Music';
    }
}