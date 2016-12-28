var P1;
var P2;
var socket;


function setup() {
  createCanvas(800, 640);
  socket = io.connect("http://localhost:8080")
  P1 = new Player(50, 25);
  P2 = new Player(50, height - 75);
}

function draw() {
  background(0);
  P1.show();
  P2.show();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){
    P1.setSpeed(-10);
  } else if (keyCode === RIGHT_ARROW){
    P1.setSpeed(10);
  }

  if (keyCode === 65){
    P2.setSpeed(-10);
  } else if (keyCode === 68){
    P2.setSpeed(10);
  }
}

function keyReleased(){
  P1.setSpeed(0);
  P2.setSpeed(0);
}
