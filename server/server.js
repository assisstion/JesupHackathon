const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const io = socketio(server);

let gameNames = [];


//key: gameName
//value:
//getInstance: (function: (void -> Game))
//getInfo: (function: (void -> GameInfo))
let games = {};

//socket: (Socket)
//nickname: (String)
//roomId: (String)
let clients = {};

//players: (String[])
//spectators?: (String[])
//gameName: (String)
//gameData: (Object)
//game: (Game)
let rooms = {};

loadGames();

io.on('connection', (sock) => {
  try{
    console.log('Someone connected!');
    //TODO better id
    let id = randomId();
    sock.emit('message', cmd('supplyId', {
      'id': id
    }));

    sock.on('message', (text) => {
      processMessage(sock, text);
      //io.emit('message', text);
    });
  }
  catch(e){
    console.error('On connect error', e);
  }
});

server.on('error', (e) => {
  console.error('Server error:', e);
});

server.listen(8080, () => {
  console.log('RPS started on 8080');
});

function processMessage(sock, obj){
  console.log('Message recieved:', obj);
  try{
    let user = obj.user;
    let command = obj.command;
    let data = obj.data;
    if(command){
      let commandFunction = commands[command];
      if(commandFunction){
        commandFunction(sock, user, data);
      }
      else{
        console.log(`Command ${command} not found!`)
      }
    }
  }
  catch(e){
    console.error('Message process error:', e);
  }
}

let commands = {
  //nickname: (String)
  register: function(sock, user, data){
    clients[user] = {
      socket: sock,
      nickname: data.nickname
    };
    sock.emit('message', cmd('registerSuccess', {

    }));
    console.log('Register success!');
  },
  //gameName: (String)
  //initData: (Object)
  createRoom: function(sock, user, data){
    let roomId = randomId();
    rooms[roomId] = {
      players: [user],
      gameName: data.gameName,
      gameData: data.initData
    };
    clients[user].roomId = roomId;
    sock.emit('message', cmd('createSuccess', {
      'roomId': roomId
    }));
    io.emit('message', cmd('roomCreated', {
      'roomId': roomId,
      'gameName': data.gameName
    }));
    console.log('Room created!');
    //If player join causes cap to be reached,
    //start the game
    let info = gameInfo(rooms[roomId].gameName);
    if(players.length == info.playerCount){
      startGame(roomId);
    }
  },
  joinRoom: function(sock, user, data){
    let roomId = data.roomId;
    if(rooms[roomId]){
      let players = playersInRoom(roomId);
      players.push(user);
      clients[user].roomId = roomId;
      sock.emit('message', cmd('joinSuccess', {
        playerList: players
      }));
      //Notify other players that someone joined
      for(let i = 0; i < players.length; i++){
        let player = players[i];
        if(player != user){
          let playerSock = clients[player].socket;
          playerSock.emit('message', cmd('playerJoined', {
            playerList: players
          }));
        }
      }
      console.log('Room joined!');
      //If player join causes cap to be reached,
      //start the game
      let info = gameInfo(rooms[roomId].gameName);
      if(players.length == info.playerCount){
        startGame(roomId);
      }
    }
    else{
      sock.emit('message', cmd('joinFailed', {
        reason: 'Room does not exist!'
      }));
      console.log('Room join failed!');
    }
  },
  gameMove: function(sock, user, data){
    //Find the player's game
    let roomId = clients[user].roomId;
    let room = rooms[roomId];
    let game = room.game;
    //Find the player in the user list
    let playerList = room.players;
    let found = -1;
    for(let i = 0; i < playerList.length; i++){
      if(playerList[i] == user){
        found = i;
        break;
      }
    }
    game.update(found, data);
  }
};

function playersInRoom(roomId){
  if(rooms[roomId]){
    return rooms[roomId].players;
  }
  else{
    return [];
  }
}

function cmd(command, data){
  let obj;
  if(data){
    obj = {
      'command': command,
      'data': data
    };
  }
  else{
    obj = {'command': command};
  }
  return obj;
}

function randomId(){
  return Math.floor(Math.random() * 1000000) + '';
}

function startGame(roomId){
  let room = rooms[roomId];
  room.game = gameInstance(room.gameName);
  let playerCount = room.players.length;
  room.game.start(roomId, playerCount, room.gameData);
}

function loadGames(){
  for(let i = 0; i < gameNames.length; i++){
    let name = gameNames[i];
    let gameExport = require(`./games/${name}.js`);
    games[name] = {
      getInstance: gameExport.getInstance,
      getInfo: gameExport.getInfo
    };
  }
}

function gameInfo(gameName){
  return games[gameName].getInfo();
}

function gameInstance(gameName){
  return games[gameName].getInstance();
}

//Functions that the game use to send data
module.exports = {
  sendClient: function(roomId, player, data){
    let players = playersInRoom(roomId);
    let target = players[player];
    let sock = clients[target].socket;
    sock.emit('message', cmd('gameUpdate', data));
  }
};

//Games export a getInstance method,
//Insances have
//start: (roomId: (int), playerCount: (int), initData: (Object))
//update: (source: (int), data: (Object))
