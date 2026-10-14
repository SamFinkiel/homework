function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function getCss(element, property) {
  // return element.style[property];
  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

function setText(element, str) {
    element.innerText = str;
}

function getText(element) {
  return element.textContent;
}

function addClass(element, className) {
  element.classList.add(className);
}

/*
const pcsTools = {
  getElement,
  /*setCss,
  getCss,* /
  css: function (element, property, value) {
    console.log(arguments);

    if (arguments.length < 3) {
      return getCss(element, property);
    } else {
      setCss(element, property, value);
    }
  },
  on,
  click
};

export default pcsTools;
*/

export default function (selector) {
  const element = getElement(selector);

  return {
    css: function (property, value) {
      // console.log(arguments);

      if (arguments.length < 2) {
        return getCss(element, property);
      } else {
        setCss(element, property, value);
      }
    },
    on: (eventType, callback) => on(element, eventType, callback),
    click: callback => click(element, callback),
    hide: ()=> setCss(element, 'display', 'none'),
    show: () => setCss(element, 'display', 'inline-block'),
    sparkle: (duration, speed) => {
      const colors = ['red', 'blue', 'green', 'orange', 'purple'];
      let index = 0;

      const interval = setInterval(() => {
        element.style.color = colors[index % 3];
        index++;
      }, speed);

      setTimeout(() => {
        clearInterval(interval);
      }, duration);
    },
    text: function (str) {
      console.log(arguments);
      
      if (arguments.length === 1) {
        setText(element, str);
      }
      return getText(element);
    },
    addClass: (className)=> addClass(element, className)
  };
}