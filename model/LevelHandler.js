class LevelHandler{
    levelingUpAmount = 10;
    resetMillisOffset = 0;

    range = 0.5;

    constructor(){
        this.reset();
    }

    getSeconds(){
        return int((millis() - this.resetMillisOffset) / 1000);
    }

    update(){
        //Calculates the level
        this.level = int(this.getSeconds() / this.levelingUpAmount);
    }

    reset(){
        this.level = 0;
        this.resetMillisOffset = millis();
    }

    draw(){
        push();
        textSize(32);
        textAlign(LEFT, TOP);
        fill(255, 100);
        text(
            "Level " + this.level + "\n" + this.getSeconds() + " sec",
            12, 12);
        pop();
    }
}