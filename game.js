let player;
let bullets;
let levelHandler;
let restartButton;
let barrier;

function setup(){
    createCanvas(windowWidth, windowHeight);
    levelHandler = new LevelHandler();
    this.createRestartButton();
    this.restart();
}

function update(){
    //Updating 
    player.update();
    levelHandler.update();
    barrier.update();

    //Updating existing bullets
    bullets.forEach(bullet => {
        bullet.update(player);

        //Remove bullet that's out of bounds 
        //OR barrier touched bullet
        if (bullet.checkOutOfBounds() 
            || barrier.touchBullet(bullet)) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }
        
        //Losing consition
        if (bullet.checkPlayerCollision(player)){
            player.dies();
        }

    });

    //Spawining new bullets
    if (player.isAlive) {
        let mulitplier = 2.2;
        if (random(1) > 1 - (pow(0.1, mulitplier) * (levelHandler.level + 1))) {
        //if (random(1) > 1 - pow(0.1, levelHandler.level + 1)){
            let minSpeed = 2;
            let maxSpeed = constrain(levelHandler.level + 1, 2, 50);
            let minSize = 3;
            let maxSize = constrain(levelHandler.level * 3, 5, 100);

            if (random(1) > 0.2) {
                bullets.push(new DefaultBullet(
                    minSpeed, maxSpeed,
                    minSize, maxSize,
                    player.xPos, player.yPos
                ));
            } else {
                if (random(1) > 0.8) {
                    bullets.push(new GhostBullet(
                        minSpeed, maxSpeed,
                        minSize, maxSize,
                        player.xPos, player.yPos
                    ))
                } else {
                    bullets.push(new HoningBullet(
                        minSpeed, maxSpeed,
                        minSize, maxSize,
                        player.xPos, player.yPos
                    ))

                }
            }
        }
    }
}

function draw(){
    if (player.isAlive){
        this.update();
        
        background(0);

        levelHandler.draw();
        player.draw();
        barrier.draw();
        barrier.drawBattery();

        bullets.forEach(bullet => {
            bullet.draw();
        });
    } else {
        cursor();
        restartButton.show();
    }
}

function keyPressed(){
    player.keyPressed(keyCode);
}

function keyReleased() {
    player.keyReleased();
}

function mousePressed(){
    barrier.onClick();
}

function mouseReleased() {
    barrier.onRelease();
}



//RESTART
function createRestartButton(){
    push();
    restartButton = createButton('restart?');
    restartButton.position(
        windowWidth/2 - restartButton.width, 
        windowHeight/2 - restartButton.height);
    restartButton.mousePressed(restart);
    restartButton.style('font-size', '32px');
    restartButton.style('background-color', color(255, 100, 100));
    restartButton.style('color', color(255));
    
    pop();
}

function restart(){
    noCursor();
    background(0);
    player = Player.createDefaultPlayer();
    bullets = [];
    levelHandler.reset();
    restartButton.hide();
    barrier = new Barrier();
}
