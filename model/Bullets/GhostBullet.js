class GhostBullet extends Bullet{
    constructor(minSpeed, maxSpeed, minSize, maxSize, xPlayerPos, yPlayerPos){
        super(minSpeed, maxSpeed, minSize, maxSize);
        
        this.color = color(100, 100, 255);
        this.isCollidable = false;
        this.setDirection(xPlayerPos, yPlayerPos);
    }
}