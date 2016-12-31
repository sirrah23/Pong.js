function Ball(x, y, speedX, speedY, screen){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = 25;
    this.height = 25;
    this.screen = screen;

  //TODO: Get rid of globals

  this.ballCollisionPlayer = function(player){
    if (this.x < player.x || this.x > (player.x + player.width)
      || this.y < player.y || this.y > (player.y + player.height)){
        return false;
      }
      return true;
  }

  this.ballCollisionSides = function(){
    return this.x < 0 || this.x > screen.width
  }

  this.ballGoal = function(){
    return this.y < 0 || this.y > screen.height
  }

  this.ballReset = function(){
      //TODO: randomize this
      this.x=screen.width/2;
      this.y=screen.height/2;
      this.speedX=-10;
      this.speedY = -10;
  }

  this.ballCollisionPlayerReact = function(player){
      this.speedY *= -1;
      if (this.x < player.x + player.width/2){
          this.speedX = Math.abs(this.speedX) * -1
      } else {
          this.speedX = Math.abs(this.speedX);
      }
  }

  this.invertXSpeed = function(){
    this.speedX *= -1;
  }

  this.updateLocWithSpeed = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.updateLocWithLoc = function(x, y){
    this.x = x;
    this.y = y;
  }

  this.show = function(){
    rectMode("CENTER");
    rect(this.x, this.y, this.width, this.height);
  }
}

if(typeof window !== 'undefined'){
    window.Ball = Ball;
} else {
     module.exports = Ball;
}
