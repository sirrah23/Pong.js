function Player(x, y){
  this.x = x;
  this.y = y;
  this.width = width/2;
  this.height = 45;
  this.vel = 0;

  this.show = function(){
    stroke(255);
    this.x += this.vel;
    rect(this.x, this.y, this.width, this.height);
  };

  this.setSpeed = function(vel){
    this.vel = vel;
  };

}
