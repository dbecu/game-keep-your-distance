class DefaultBullet extends Bullet{
    constructor(minSpeed, maxSpeed, minSize, maxSize, xPlayerPos, yPlayerPos){
        super(minSpeed, maxSpeed, minSize, maxSize);
        
        console.log("Hi");

        this.color = color(255);
        this.setDirection(xPlayerPos, yPlayerPos);
    }


}