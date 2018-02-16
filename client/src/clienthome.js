
const registerForm = (e) => {
  e.preventDefault();
  register();
}

function register(){
  const input = document.querySelector('#nickname');
  const text = input.value;
  input.value = '';

  sock.emit('message', cmd('register', {
    nickname: text
  }));
}

const createForm = (e) => {
  e.preventDefault();
  register();
  const input1 = document.querySelector('#gameName');
  const text1 = input1.value;

  //const input2 = document.querySelector('#initData');
  //const text2 = input2.value;
  //input2.value = '';

  sock.emit('message', cmd('createRoom', {
    gameName: text1,
    initData: {}//text2
  }));
}

const joinForm = (e) => {
  e.preventDefault();
  register();
  const input = document.querySelector('#roomId');
  const text = input.value;
  input.value = '';

  sock.emit('message', cmd('joinRoom', {
    roomId: text
  }));
}

document
  .querySelector('#register-form')
  .addEventListener('submit', registerForm);

document
  .querySelector('#create-form')
  .addEventListener('submit', createForm);

document
  .querySelector('#join-form')
  .addEventListener('submit', joinForm);

document.addEventListener('gameMessage', (evt) => {
  let obj = evt.detail;
  if(obj.command == "gameStart"){
    let gameName = obj.data.gameName;
    window.location = `./${gameName}/?id=${id}`;
    return;
  }
  else if(obj.command == "roomCreated"){
    document.getElementById("message").innerHTML = `Created room ${obj.data.roomId}`;
  }
  const parent = document.querySelector("#events");

  const el = document.createElement('li');
  el.innerHTML = JSON.stringify(evt.detail);

  parent.appendChild(el);
});
