class HoningBullet extends Bullet{
    isHoning = true;
    honingRadiusMuliplier = 3;

    constructor(minSpeed, maxSpeed, minSize, maxSize, xPlayerPos, yPlayerPos){
        super(minSpeed, maxSpeed, minSize, maxSize);
        
        this.color = color(255, 255, 0);
        this.setDirection(xPlayerPos, yPlayerPos);
    }

    update(player){
        this.xPos += this.speed * cos(this.direction);
        this.yPos += this.speed * sin(this.direction);

        if (this.checkCollision(player.xPos, player.yPos, player.radius * this.honingRadiusMuliplier)){
            this.isHoning = false;
        }

        if (this.isHoning) {
            this.setDirection(player.xPos, player.yPos)
        }

    }

}