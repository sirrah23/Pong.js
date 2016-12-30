var express = require('express');
var socket = require('socket.io');
var Ball = require('./public/lib/ball.js')

var app = express();

var P1Socket; // Player One
var P2Socket; // Player Two
var guestSockets = []; // People Watching

var screen = {
    width : 800,
    height: 640
};

var width = 800;
var height = 640;

var playerWidth = width/2
var playerHeight = 45

//TODO: Create full fledged player and ball objects

var P1Pos = {
    "x" : 50,
    "y" : 25
};

var P2Pos = {
    "x" : 50,
    "y" : height - 75,
}

var ball = new Ball(width/2, height/2, -10, -10, screen);

var P1Speed = 0;
var P2Speed = 0;

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
    playerNum = "P1"
  } else if (!P2Socket){
    P2Socket = socket;
    isPlayer = true;
    playerNum = "P2"
  } else {
    guestSockets.push(socket);
  }
  var data = {
    "isPlayer" : isPlayer,
    "playerNum" : playerNum,
    "P1x" : P1Pos.x,
    "P1y" : P1Pos.y,
    "P2x" : P2Pos.x,
    "P2y" : P2Pos.y,
    "ballX" : ball.x,
    "ballY" : ball.y
  };

  socket.emit("connectionSetup", data)

  socket.on("updateSpeed", function(data){
      if(data.playerNum === "P1")
        P1Speed = data.speed;
      else
        P2Speed = data.speed;
  });


  setInterval(function(){
      P1Pos.x += P1Speed;
      P2Pos.x += P2Speed;
      if (ball.ballGoal()){
        ball.ballReset();
      } else if (ball.ballCollisionSides()){
        ball.invertXSpeed();
      } else if(ball.ballCollisionPlayer(P1Pos)){
          ball.ballCollisionPlayerReact(P1Pos);
      } else if (ball.ballCollisionPlayer(P2Pos)){
          ball.ballCollisionPlayerReact(P2Pos);
      }
      ball.updateLocWithSpeed();
      ball.ballCollisionPlayer(P1Pos)
      var data = {
        "P1x" : P1Pos.x,
        "P1y" : P1Pos.y,
        "P2x" : P2Pos.x,
        "P2y" : P2Pos.y,
        "ballX" : ball.x,
        "ballY" : ball.y
      };
      checkPos();
      socket.emit("updateScreen", data);
  }, 50);

});

function checkPos(){
  if(P1Pos.x < 0){
    P1Pos.x = 0;
  }else if (P1Pos.x > width){
    P1Pos.x = width - playerWidth;
  }
}

function abs(n){
  if(n < 0){
    return n*-1;
  }
  return n;
}
