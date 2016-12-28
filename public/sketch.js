var P1;
var P2;
var socket;
var isPlayer;
var playerNum;


function setup() {
  createCanvas(800, 640);
  socket = io.connect("http://localhost:8080")

  socket.on("connectionSetup", function(data){
    isPlayer = data.isPlayer;
    playerNum = data.playerNum;
    console.log("YO")
    P1 = new Player(data.P1x, data.P1y);
    P2 = new Player(data.P2x, data.P2y);
    console.log(P1);
    console.log(P2);
  });

  socket.on("updateScreen", function(data){
    P1.update(data.P1x, data.P1y);
    P2.update(data.P2x, data.P2y);
  });
}

function draw() {
  background(0);
  if(P1)
    P1.show();
  if(P2)
    P2.show();
}

function keyPressed(){
  if(!isPlayer){
    return;
  }

  var data = {}
  data.playerNum = playerNum;

  if (keyCode === LEFT_ARROW){
    data.speed = -10
    socket.emit("updateSpeed", data);
  } else if (keyCode === RIGHT_ARROW){
    data.speed = 10;
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
