/* eslint-disable no-implicit-globals */
let index = 1;

function addButton() {
    index++;
    const newButton = document.createElement('button');
    newButton.textContent = index;
    document.body.appendChild(newButton);
    newButton.addEventListener('click', addButton);
}

document.querySelector('#originalButton').addEventListener('click', addButton);
