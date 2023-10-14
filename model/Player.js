class Player{
    speed = 10;
    isAlive = true;
    playerColor = color(255, 0, 0);

    constructor(radius, xPos, yPos){
        this.radius = radius;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    static createDefaultPlayer(){
        return new Player(30, windowWidth/2, windowHeight/2);
    }

    dies(){
        this.isAlive = false;
        this.playerColor = color(255, 0, 0, 100);
    }


    //CONTROLS
    currentKey;

    keyPressed(key){
        this.currentKey = key;
    }

    keyReleased(){
        this.currentKey = null;
    }

    update(){
        if (this.isAlive && this.currentKey != null) {
            this.#movement();
        }
    }

    #movement(){
        let xTemp = this.xPos;
        let yTemp = this.yPos;

        //Controls
        switch(this.currentKey){
            case 87:  //w
                yTemp = this.yPos - this.speed;
                break;
            case 83: //s
                yTemp = this.yPos + this.speed;
                break;
            case 65: //a
                xTemp = this.xPos - this.speed;
                break;
            case 68: //d
                xTemp = this.xPos + this.speed;
                break;
        }

        //If value changed and is in the boundaries
        if (yTemp != this.yPos && yTemp > 0 && yTemp < windowHeight) { this.yPos = yTemp; }
        if (xTemp != this.xPos && xTemp > 0 && xTemp < windowWidth) { this.xPos = xTemp; }
    }

    draw(){
        noStroke();
        fill(this.playerColor);
        circle(this.xPos, this.yPos, this.radius);
    }


}