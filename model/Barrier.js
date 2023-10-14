class Barrier{
    isBroken = false;
    isPressed = false;

    maxRadius = 50;
    minRadius = 5;

    constructor(){
        this.radius = 20;
    }

    update(){
        if (this.isBroken) return;

        this.xPos = mouseX;
        this.yPos = mouseY;

        if (this.isPressed){
            this.radius += 1;

            if (this.radius >= this.maxRadius){
                this.isBroken = true;
                this.xPos = -100;
                this.yPos = -100;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    }

    draw(){
        push();

        stroke(255);
        strokeWeight(2);
        fill(255, 50);
        circle(this.xPos, this.yPos, this.radius);

        pop();
    }

    onClick(){
        this.isPressed = true;
    }

    onRelease(){
        this.isPressed = false;
    }

    touchBullet(bullet){
        if (this.isBroken) return false;

        return (dist(this.xPos, this.yPos, bullet.xPos, bullet.yPos) <= this.radius/2 + bullet.size);
    }

    drawBattery() {    
        push();
    
        //Battery outline
        fill(255, 0);
        stroke(255);
        strokeWeight(10);
        rect(windowWidth - 10, windowHeight - 10, -50, -200);
    
        //Battery insides
        fill(255, 200);
        noStroke();
        rect(windowWidth - 10, windowHeight - 10, -50, -constrain((this.radius/this.maxRadius)*200, 0, 200));
    
        pop();
      }
}