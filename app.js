var express = require('express');
var socket = require('socket.io');

var app = express();

var P1Socket; // Player One
var P2Socket; // Player Two
var guestSockets = []; // People Watching

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

var ballPos = {
  x: width/2,
  y: height/2
}

var P1Speed = 0;
var P2Speed = 0;
var ballSpeed = {
  x: -10,
  y: -10
};

var width = 800;
var playerWidth = 400;

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
    "ballX" : ballPos.x,
    "ballY" : ballPos.y
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
      if (ballGoal()){
        ballReset();
      } else if (ballCollisionSides()){
        ballSpeed.x *=-1
      } else if(ballCollisionPlayer(P1Pos)){
          ballCollisionPlayerReact(P1Pos);
      } else if (ballCollisionPlayer(P2Pos)){
          ballCollisionPlayerReact(P2Pos);
      }
      ballPos.x += ballSpeed.x
      ballPos.y += ballSpeed.y
      ballCollisionPlayer(P1Pos)
      var data = {
        "P1x" : P1Pos.x,
        "P1y" : P1Pos.y,
        "P2x" : P2Pos.x,
        "P2y" : P2Pos.y,
        "ballX" : ballPos.x,
        "ballY" : ballPos.y
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

function ballCollisionPlayer(player){
  if (ballPos.x < player.x || ballPos.x > (player.x + playerWidth)
    || ballPos.y < player.y || ballPos.y > (player.y + playerHeight)){
      return false;
    }
    return true;
}

function ballCollisionSides(){
  return ballPos.x < 0 || ballPos.x > width
}

function ballGoal(){
  return ballPos.y < 0 || ballPos.y > height
}

function ballReset(){

  ballPos = {
    x: width/2,
    y: height/2
  }

  ballSpeed = {
    x : -10,
    y : 10
  }
}

function ballCollisionPlayerReact(player){
    ballSpeed.y *= -1;
    if (ballPos.x < player.x + playerWidth/2){
        ballSpeed.x = abs(ballSpeed.x) * -1
    } else {
        ballSpeed.x = abs(ballSpeed.x);
    }
}

function abs(n){
  if(n < 0){
    return n*-1;
  }
  return n;
}
