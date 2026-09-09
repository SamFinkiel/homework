import showMessage from './messageBox.js';

//showMessage('it works');

const msgInput = document.querySelector('#message');
const btnString = document.querySelector('#buttons');

document.querySelector('#showMessage').addEventListener('submit', (e) => {
    e.preventDefault();
    showMessage(msgInput.value, btnString.value);
});