let level = 1;

let player;
let bullets;

function setup(){
    createCanvas(windowWidth, windowHeight);
    player = Player.createDefaultPlayer();
    bullets = [];
}

function update(){
    //Updating player
    player.update();

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
                level, level + 1,
                10, 20,
                player.xPos, player.yPos
            ))
        }
    }
}

function draw(){
    this.update();
    
    background(0);

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
