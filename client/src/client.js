let id = '';

const writeEvent = (text) => {
  const parent = document.querySelector("#events");

  const el = document.createElement('li');
  el.innerHTML = text;

  parent.appendChild(el);
};

const registerForm = (e) => {
  e.preventDefault();
  const input = document.querySelector('#nickname');
  const text = input.value;
  input.value = '';

  sock.emit('message', cmd('register', {
    nickname: text
  }));
}

const createForm = (e) => {
  e.preventDefault();
  const input1 = document.querySelector('#gameName');
  const text1 = input1.value;
  input1.value = '';

  const input2 = document.querySelector('#initData');
  const text2 = input2.value;
  input2.value = '';

  sock.emit('message', cmd('createRoom', {
    gameName: text1,
    initData: text2
  }));
}

const joinForm = (e) => {
  e.preventDefault();
  const input = document.querySelector('#roomId');
  const text = input.value;
  input.value = '';

  sock.emit('message', cmd('joinRoom', {
    roomId: text
  }));
}

writeEvent('Welcome to RPS');

const sock = io();

sock.on('message', (text) => {
  processMessage(text);
  writeEvent(JSON.stringify(text));
});

function processMessage(obj){
  console.log('Message recieved:', obj);
  try{
    let user = obj.user;
    let command = obj.command;
    let data = obj.data;
    if(command){
      if(command == "supplyId"){
        id = data.id;
      }
    }
  }
  catch(e){
    console.error('Message process error:', err);
  }
}

function sendServer(data){
  sock.emit('message', cmd('gameMove', data));
}

function cmd(command, data){
  let obj;
  if(data){
    obj = {
      'user': id,
      'command': command,
      'data': data
    };
  }
  else{
    obj = {
      'user': id,
      'command': command
    };
  }
  return obj;
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
