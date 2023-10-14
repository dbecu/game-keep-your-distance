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
        bullet.update();

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
            bullets.push(new DefaultBullet(
                2, levelHandler.level + 1,
                2, constrain(levelHandler.level * 3, 5, 100),
                player.xPos, player.yPos
            ))
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
    background(0);
    player = Player.createDefaultPlayer();
    bullets = [];
    levelHandler.reset();
    restartButton.hide();
    barrier = new Barrier();
}
