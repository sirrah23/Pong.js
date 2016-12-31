var P1;
var P2;
var ball;
var socket;
var isPlayer;
var playerNum;


function setup() {
  createCanvas(800, 640);
  socket = io.connect("http://localhost:8080");

  socket.on("connectionSetup", function(data){
    var screen = {"width":width, "height": height};
    isPlayer = data.isPlayer;
    playerNum = data.playerNum;
    P1 = new window.Player(data.P1x, data.P1y, width/2, 45, screen);
    P2 = new window.Player(data.P2x, data.P2y, width/2, 45, screen);
    ball = new window.Ball(data.ballX, data.ballY, -10, -10, screen);
  });

  socket.on("updateScreen", function(data){
    P1.update(data.P1x, data.P1y);
    P2.update(data.P2x, data.P2y);
    ball.updateLocWithLoc(data.ballX, data.ballY);
  });

  socket.on("promoteToPlayer", function(data){
    isPlayer = data.isPlayer;
    playerNum = data.playerNum;
  });
}

function draw() {
  background(0);
  if(P1)
    P1.show();
  if(P2)
    P2.show();
  if(ball){
    ball.show();
  }
}

function keyPressed(){
  if(!isPlayer){
    return;
  }

  var data = {};
  data.playerNum = playerNum;

  if (keyCode === LEFT_ARROW){
    data.speed = -10;
    console.log(data);
    socket.emit("updateSpeed", data);
  } else if (keyCode === RIGHT_ARROW){
    data.speed = 10;
    console.log(data);
    socket.emit("updateSpeed", data);
  }
}

function keyReleased(){
  if(!isPlayer){
    return;
  }
  var data = {
    "playerNum" : playerNum,
    speed : 0
  };
  socket.emit("updateSpeed", data);
}
