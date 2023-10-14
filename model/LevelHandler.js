class LevelHandler{
    levelingUpAmount = 10;
    millisOffset = 0;

    constructor(){
        this.level = 0;
    }

    getSeconds(){
        return int((millis()) / 1000);
    }

    nextLevel(){
        this.level += 1;
        this.millisOffset = millis();
    }

    update(){
        if (this.getSeconds() - this.millisOffset/1000 >= this.levelingUpAmount){
            this.nextLevel();
        }
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