const writeEvent = (text) => {
  const parent = document.querySelector("#events");

  const el = document.createElement('li');
  el.innerHTML = text;

  parent.appendChild(el);
};

const onFormSubmitted = (e) => {
  e.preventDefault();
  const input = document.querySelector('#message');
  const text = input.value;
  input.value = '';

  sock.emit('message', text);
}

writeEvent('Testing Zone');

const sock = io();

sock.on('message', (text) => {
  writeEvent(text);
});

document
  .querySelector('#message-form')
  .addEventListener('submit', onFormSubmitted);
