let player;
let bullets;
let levelHandler;

function setup(){
    createCanvas(windowWidth, windowHeight);
    player = Player.createDefaultPlayer();
    bullets = [];
    levelHandler = new LevelHandler();
}

function update(){
    //Updating 
    player.update();
    levelHandler.update();

    //Updating existing bullets
    bullets.forEach(bullet => {
        bullet.update();

        //Remove bullet that's out of bounds
        if (bullet.checkOutOfBounds()) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }
        
        //Losing consition
        if (bullet.checkPlayerCollision(player)){
            player.dies();
        }

    });

    //Spawining new bullets
    if (player.isAlive) {
        if (random(1) > 1 - pow(0.1, 2)){
            bullets.push(new DefaultBullet(
                levelHandler.level, levelHandler.level + 1,
                10, 20,
                player.xPos, player.yPos
            ))
        }
    }
}

function draw(){
    this.update();
    
    background(0);

    levelHandler.draw();
    player.draw();
    bullets.forEach(bullet => {
        bullet.draw();
    });
}

function keyPressed(){
    player.keyPressed(keyCode);
}

function keyReleased() {
    player.keyReleased();
}
