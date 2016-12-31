function Player(x, y, width, height, screen){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = 45;
  this.vel = 0;
  this.screen = screen;

  this.show = function(){
    stroke(255);
    this.edgeCheck();
    rect(this.x, this.y, this.width, this.height);
  };

  this.update = function(x, y){
    this.x = x;
    this.y = y;
  }

  this.setSpeed = function(vel){
    this.vel = vel;
  };

  this.edgeCheck = function(){
    if (this.x < 0){
      this.x = 0;
    } else if ((this.x + this.width) > this.screen.width){
      this.x = this.screen.width - this.width;
    }
  };

}

if(typeof window !== 'undefined'){
    window.Player = Player;
} else {
     module.exports = Player;
}
