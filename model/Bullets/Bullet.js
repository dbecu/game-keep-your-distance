class Bullet{
    isCollidable = true;

    constructor(minSpeed, maxSpeed, minSize, maxSize){
        this.speed = random(minSpeed, maxSpeed);
        this.size = random(minSize, maxSize);

        this.color = color(255, 100);

        //Spawn point
        if (random(1) > 0.5) {
            this.xPos = random(windowWidth);
            this.yPos = random(1) > 0.5 ? 0 : windowHeight;
        } else {
            this.yPos = random(windowHeight);
            this.xPos = random(1) > 0.5 ? 0 : windowWidth;
        }

        this.setDirection(windowWidth/2, windowHeight/2);
    }

    setDirection(xPos, yPos){
        this.direction = atan2(yPos - this.yPos, xPos - this.xPos);
    }

    update(player){
        this.xPos += this.speed * cos(this.direction);
        this.yPos += this.speed * sin(this.direction);

        //console.log(this.xPos + " " + this.yPos);
    }

    draw(){
        noStroke();
        fill(this.color);
        circle(this.xPos, this.yPos, this.size);
    }

    checkOutOfBounds(){
        return (this.xPos < 0 || this.xPos > windowWidth || this.yPos < 0 || this.yPos > windowHeight);
    }

    checkPlayerCollision(player){
        return this.checkCollision(player.xPos, player.yPos, player.radius/2);
    }

    checkCollision(xOther, yOther, radiusOther){
        return (this.isCollidable && dist(this.xPos, this.yPos, xOther, yOther) <= this.size + radiusOther);
    }
}