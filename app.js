var express = require('express');
var socket = require('socket.io');
var Ball = require('./public/lib/ball.js');
var Player = require('./public/lib/player.js');

var app = express();

var P1Socket; // Player One
var P2Socket; // Player Two
var guestSockets = []; // People Watching

var screen = {
    width : 800,
    height: 640
};

var P1 = new Player(50, 25, screen.width/2, 45, screen);
var P2 = new Player(50, screen.height - 75, screen.width/2, 45, screen);
var ball = new Ball(screen.width/2, screen.height/2, -10, -10, screen);

app.use(express.static('public'));

var server = app.listen(8080, function(){
  console.log("Listening on port 8080");
});

var io = socket(server);

io.sockets.on('connection', function(socket){
  var isPlayer = false;
  var playerNum;
  if(!P1Socket){
    P1Socket = socket;
    isPlayer = true;
    playerNum = "P1";
  } else if (!P2Socket){
    P2Socket = socket;
    isPlayer = true;
    playerNum = "P2";
  } else {
    guestSockets.push(socket);
  }
  var data = {
    "isPlayer" : isPlayer,
    "playerNum" : playerNum,
    "P1x" : P1.x,
    "P1y" : P1.y,
    "P2x" : P2.x,
    "P2y" : P2.y,
    "ballX" : ball.x,
    "ballY" : ball.y
  };

  socket.emit("connectionSetup", data);

  socket.on("updateSpeed", function(data){
      if(data.playerNum === "P1"){
        P1.vel = data.speed;
      }
      else{
        P2.vel = data.speed;
      }
  });

  setInterval(function(){
      P1.x = P1.x +  P1.vel; //TODO: Create a method for this...
      P2.x = P2.x +  P2.vel;
      if (ball.ballGoal()){
        ball.ballReset();
      } else if (ball.ballCollisionSides()){
        ball.invertXSpeed();
      } else if(ball.ballCollisionPlayer(P1)){
          ball.ballCollisionPlayerReact(P1);
      } else if (ball.ballCollisionPlayer(P2)){
          ball.ballCollisionPlayerReact(P2);
      }
      ball.updateLocWithSpeed();
      var data = {
        "P1x" : P1.x,
        "P1y" : P1.y,
        "P2x" : P2.x,
        "P2y" : P2.y,
        "ballX" : ball.x,
        "ballY" : ball.y
      };
      P1.edgeCheck();
      P2.edgeCheck();
      socket.emit("updateScreen", data);
  }, 50);

  socket.on("disconnect", function(){
    if(socket === P1Socket){
      P1Socket = undefined;
      isPlayer = false;
      playerNum = undefined;
    } else if(socket === P2Socket){
      P2Socket = undefined;
      isPlayer = false;
      playerNum = undefined;
    }
    var newSocket;
    if(guestSockets.length > 0){
      newSocket = guestSockets.shift();
      if(!P1Socket){
        P1Socket = newSocket;
        isPlayer = true;
        playerNum = "P1";
      }else if(!P2Socket){
        P2Socket = newSocket;
        isPlayer = true;
        playerNum = "P2";
      }
      var data = {isPlayer, playerNum}; //Guest promoted to player
      newSocket.emit("promoteToPlayer", data);
    }
  });
});

function abs(n){
  if(n < 0){
    return n*-1;
  }
  return n;
}
