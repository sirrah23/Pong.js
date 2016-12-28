var express = require('express');
var socket = require('socket.io');

var app = express();

var P1Socket; // Player One
var P2Socket; // Player Two
var guestSockets = []; // People Watching

var width = 800;

var P1Pos = {
    "x" : 50,
    "y" : 25
};
var P2Pos = {
    "x" : 50,
    "y" : 565
}

var P1Speed = 0;
var P2Speed = 0;

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
    "P2y" : P2Pos.y
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
      var data = {
        "P1x" : P1Pos.x,
        "P1y" : P1Pos.y,
        "P2x" : P2Pos.x,
        "P2y" : P2Pos.y
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
