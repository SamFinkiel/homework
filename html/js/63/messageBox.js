const height = 170;
const width = 240;
let topOffSet = -height / 2;
let leftOffSet = -width / 2;

let nextXindex = 1;

export default function (msg, btn, callback) {
    console.log(msg);    
    
    const btnArray = btn ? btn.split(',') : [];
    const div = document.createElement('div');

    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg;
    msgDiv.style.overflow = 'auto';
    msgDiv.style.height = '6.5em';
    div.appendChild(msgDiv);

    div.style.backgroundColor = 'lightcyan';
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.boxSizing = 'border-box';
    div.style.height = `${height}px`; //'8.5em';
    div.style.width = `${width}px`;//'15em';
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.marginTop = `${topOffSet}px`;//'-4.25em';
    div.style.marginLeft = `${leftOffSet}px`;//'-7.5em';
    
    const buttonDiv = document.createElement('div');
    buttonDiv.style.position = 'absolute';
    buttonDiv.style.width = '100%';
    buttonDiv.style.bottom = '1em';
    buttonDiv.style.textAlign = 'center';
    buttonDiv.style.left = '0';

    if (btnArray.length === 0) {
        const okButton = document.createElement('button');
        okButton.innerText = 'OK';
        okButton.addEventListener('click', () => {
            if (callback) {
                console.log(`${okButton.value} was clicked`);
            }
            div.remove();
        });
        buttonDiv.appendChild(okButton);
        div.appendChild(buttonDiv);
    } else {
        for (let i = 0; i < btnArray.length; i++) {
            const newButton = document.createElement('button');
            newButton.innerText = btnArray[i];
            newButton.addEventListener('click', () => {
                if (callback) {
                    console.log(`${btnArray[i]} was clicked`);
                }
                div.remove();
            });
            buttonDiv.appendChild(newButton);
            div.appendChild(buttonDiv);
        }
    }

    document.body.appendChild(div);

    topOffSet += 10;
    leftOffSet += 10;

    if (topOffSet + height + (window.innerHeight / 2) > window.innerHeight) {
        topOffSet -= window.innerHeight - height;
    }

    if (leftOffSet + width + (window.innerWidth / 2) > window.innerWidth) {
        leftOffSet -= window.innerWidth - width;
    }

    div.addEventListener('click', () => {
        div.style.zIndex = nextXindex++;
    });
}