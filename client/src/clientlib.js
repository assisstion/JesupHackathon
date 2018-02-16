var id = '';

const sock = io();

sock.on('message', (text) => {
  processMessage(text);
  gameMessage(text);
  //writeEvent(JSON.stringify(text));
});

loadId();

function loadId(){
  let param = getParameterByName('id');
  if(param){
    id = param;
  }
  sock.emit('message', cmd('register'));
}

function processMessage(obj){
  console.log('Message recieved:', obj);
  try{
    let user = obj.user;
    let command = obj.command;
    let data = obj.data;
    if(command){
      if(command == "supplyId"){
        if(!id){
          id = data.id;
        }
      }
      else if(command == "gameUpdate"){
        gameUpdate(data);
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

function gameMessage(message){
  let event = new CustomEvent("gameMessage", {
    detail: message
  });
  document.dispatchEvent(event);
}

function gameUpdate(data){
  let event = new CustomEvent("gameUpdate", {
    detail: data
  });
  document.dispatchEvent(event);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
