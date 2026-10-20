function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');
const loadContactButton = getElement('#load');
let contacts = [];

async function preLoad() {
  try {
    const r = await fetch('contacts.json');
    const t = await r.json();

    if (!t.length) {
      console.log('empty');
      return;
    }

    if (t.length) {
      contactsTable.innerText = '';
    }

    for (let i = 0; i < t.length; i++) {
      const contact = t[i];

      const row = contactsTable.insertRow();

      row.innerHTML = `
        <td>${contact.first}</td>
        <td>${contact.last}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><button>delete</button></td>
      `;

      row.querySelector('button').addEventListener('click', () => {
        row.remove();
      });
    }

    

  } catch (e) {
    console.error('oops', e);
  }
}

click(loadContactButton, preLoad);


function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addContactButton, 'visibility', 'visible');
}

on(addContactForm, 'submit', e => {
  e.preventDefault();

  if (!contacts.length) {
    contactsTable.innerHTML = '';
  }

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  contacts.push(newContact);

  const row = contactsTable.insertRow();

  row.innerHTML = `
    <td>${firstInput.value}</td>
    <td>${lastInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${phoneInput.value}</td>
    <td><button>delete</button></td>
  `;

  row.querySelector('button').addEventListener('click', () => {
    row.remove();

    contacts = contacts.filter(c => c !== newContact);

    if (!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    }
  });

  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addContactButton, 'visibility', 'hidden');
});

click(getElement('#cancel'), hideAddContactForm);