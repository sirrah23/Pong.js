function Player(x, y){
  this.x = x;
  this.y = y;
  this.width = width/2;
  this.height = 45;
  this.vel = 0;

  this.show = function(){
    stroke(255);
    this.x += this.vel;
    this.edgeCheck();
    rect(this.x, this.y, this.width, this.height);
  };

  this.setSpeed = function(vel){
    this.vel = vel;
  };

  this.edgeCheck = function(){
    if (this.x < 0){
      this.x = 0;
    } else if (this.x + this.width > width){
      this.x = width - this.width;
    }
  };

}