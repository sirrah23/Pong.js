function Ball(x, y, speedX, speedY, screen){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.screen = screen;
    this.playerWidth = 400 //TODO: get rid of this
    this.playerHeight = 45 //TODO: get rid of this

  //TODO: Get rid of globals

  this.ballCollisionPlayer = function(player){
    if (this.x < player.x || this.x > (player.x + this.playerWidth)
      || this.y < player.y || this.y > (player.y + this.playerHeight)){
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
      this.x=screen.width/2;
      this.y=screen.height/2;
      this.speedX=-10;
      this.speedY = -10;
  }

  this.ballCollisionPlayerReact = function(player){
      this.speedY *= -1;
      if (this.x < player.x + this.playerWidth/2){
          this.speedX = Math.abs(this.speedX) * -1
      } else {
          this.speedX = Math.abs(this.speedX);
      }
  }

  this.invertXSpeed = function(){
    this.speedX *= -1;
  }

  this.updateLoc = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

if(typeof window !== 'undefined'){
    window.mydata = Ball;
} else {
     module.exports = Ball;
}
