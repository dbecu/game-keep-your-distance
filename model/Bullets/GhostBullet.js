class GhostBullet extends Bullet{
    constructor(minSpeed, maxSpeed, minSize, maxSize, xPlayerPos, yPlayerPos){
        super(minSpeed, maxSpeed, minSize, maxSize);
        
        this.color = color(0, 0, 255);
        this.isCollidable = false;
        this.setDirection(xPlayerPos, yPlayerPos);
    }
}