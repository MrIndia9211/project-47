var bgimg;
var player,ply_running;
var invisibleground;
var zombie,zomimg;
var carimg,carsGroup;
var boy_jump;
var coin_run,coinGroup;
var gameState = "Play" ;
var score = 0;
var gameimg,restartimg;
var gameOver,restart;
var zombieimg2;


function preload(){
    bgimg = loadImage("images/backgroung.png")
    ply_running = loadAnimation("images/p1.png","images/p2.png","images/p3.png","images/p4.png")
    zomimg = loadAnimation("images/zombie.png");
    carimg = loadImage("images/obstacle1.png")
    boy_jump = loadAnimation("images/p5.png","images/p6.png","images/p7.png")
    coin_run = loadAnimation("images/coin 1.png","images/coin 3.png","images/coin 4.png")
    gameimg = loadImage("images/gameOver .png")
    restartimg = loadImage("images/restart.png")
    boy_down = loadAnimation("images/p8.png")
    zombieimg2 = loadAnimation("images/zomb.png");
    brigeimg = loadImage("images/m10.png");
}
function setup(){
createCanvas(1100,670);
backgrounds = createSprite(670,390);
backgrounds.addImage(bgimg);
backgrounds.scale = 2;
backgrounds.velocityX = -3

player = createSprite(400,650,40,80);
player.addAnimation("running", ply_running);
player.addAnimation("jumping",boy_jump);
player.addAnimation("down",boy_down)
zombie = createSprite(190,590,40,80);
zombie.addAnimation("de",zomimg)
zombie.addAnimation("dead",zombieimg2)
zombie.scale = 0.3;

carsGroup = createGroup();
coinGroup = createGroup();
brigeGroup = createGroup();
obstacleGroup= createGroup();

invisibleground = createSprite(390,670,1800,10);
invisibleground.visible = false;

gameOver = createSprite(530,350,10,70);
gameOver.addImage(gameimg);

gameOver.visible = false;
restart = createSprite(670,350,10,70);
restart.addImage(restartimg)
restart.scale = 0.2;
restart.visible = false;
}
function draw(){
background(0)
if(gameState === "Play"){
    player.visible = true;
   
if(keyDown("space")){
    player.velocityY = -15 

    player.changeAnimation("jumping",boy_jump);

}
   
if(keyDown("UP_ARROW")){
    player.velocityY = -9 

    player.changeAnimation("jumping",boy_jump);

}
if (player.isTouching(invisibleground)  ){
    player.changeAnimation("running", ply_running);

}
player.velocityY = player.velocityY + 0.3
  
if (backgrounds.x < 0){
    backgrounds.x = 550
}

player.collide(invisibleground);
crashcar();
spawnCoin();


if(player.isTouching(carsGroup)){
    gameState = "end";
}
if(player.isTouching(coinGroup)){
    coinGroup.destroyEach();
    score = score +1
}
}
else if(gameState === "end"){
    gameOver.visible = true;
    restart.visible = true;
    backgrounds.velocityX = 0;
    player.velocityY = 0;
    player.changeAnimation("down", boy_down);
     carsGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0);
     carsGroup.setLifetimeEach(-1);
     coinGroup.setLifetimeEach(-1);
     
     zombie.changeAnimation("dead",zombieimg2)
    zombie.scale = 0.5;

    if(mousePressedOver(restart)){
        reset()
    }        
    player.visible = false;
    }
drawSprites()
stroke("red");
textSize(30);
fill("yellow");
text("Coin:" + score, 600, 200)
}

function crashcar(){
    if(frameCount % 350 === 0){
    var car = createSprite(700,610,30,80);
    car.addImage(carimg)
    car.velocityX = -2
    car.lifetime = 390;
    car.depth  = zombie.depth;
   zombie.depth  = car.depth+1;
   carsGroup.add(car)
    }

}

function spawnCoin(){
    if(frameCount % 200 === 0){
        var coin  = createSprite(700,610,30,80);
        coin.y = Math.round(random(100,500))
        coin.addAnimation("coin",coin_run);
        coin.velocityX = -2;
        coin.lifetime = 390;
        coin.depth  = zombie.depth;
        zombie.depth  = coin.depth+1;
        coinGroup.add(coin);
    }
}
function reset(){
    gameState = "Play";
    gameOver.visible = false;
    restart.visible = false;
    player.changeAnimation("running",ply_running);
    zombie.changeAnimation("de",zomimg);
    zombie.scale = 0.3
    carsGroup.destroyEach();
    coinGroup.destroyEach();
    backgrounds.velocityX = -2;
    score = 0
   
}


