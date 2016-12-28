var P1;


function setup() {
  createCanvas(800, 640);
  P1 = new Player(50, 25);
}

function draw() {
  background(0);
  P1.show();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){
    console.log("YO");
    P1.setSpeed(-10);
  } else if (keyCode === RIGHT_ARROW){
    P1.setSpeed(10);
  }
}

function keyReleased(){
  P1.setSpeed(0);
}
