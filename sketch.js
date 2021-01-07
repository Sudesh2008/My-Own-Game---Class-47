var batman, batmanImage;
var bg;
var bat, batImage, batGroup;
var joker, jokerImage;
var batarang, batarangImage, batarangGroup;
var bullet, bulletImage, bulletGroup;
var win, winImage;
var lose, loseImage;
var invisibleGround;

var PLAY = 1;
var END = 0;
var WINGAME = 2;
var gameState = PLAY;

function preload(){
  
  batmanImage = loadAnimation("b1.png","b2.png","b3.png","b4.png");
  bg = loadImage("Bg.png");
  
  batImage = loadAnimation("bat1.png","bat2.png","bat3.png","bat4.png");
  jokerImage = loadAnimation("j1.png","j2.png","j3.png");
  
  batarangImage = loadImage("batarang.png");
  bulletImage = loadImage("bullet.png");

  winImage = loadImage("you win.gif");
  loseImage = loadImage("you lose.jpg");
}

function setup() {
  createCanvas(800,400);
  batman = createSprite(250,350,30,30);
  batman.addAnimation("batman",batmanImage);
  
  joker = createSprite(600,350,30,30);
  joker.addAnimation("joker",jokerImage);
  joker.scale = 1.5;

  batarangGroup = new Group();
  bulletGroup = new Group();
  batGroup = new Group();

  win = createSprite(400,200,20,20);
  win.addImage("win",winImage);
  win.visible = false;

  lose = createSprite(400,200,20,20);
  lose.addImage("lose",loseImage);
  lose.scale = 3;
  lose.visible = false;

  invisibleGround = createSprite(400,390,800,10);
  invisibleGround.visible = false;
}

function draw() {
  background(bg);  

  if(gameState === PLAY){

    if(keyDown("right")){
      batman.x = batman.x + 5;
    }

    if(keyDown("left")){
      batman.x = batman.x -5;
    }

    if(keyDown("up")){
      batman.velocityY = -10;
    }

    batman.velocityY = batman.velocityY + 0.5;

    batman.collide(invisibleGround);

    spawnBats();
    spawnBullets();

    if(keyDown("space")){
      spawnBatarangs();
    }

    if(batarangGroup.isTouching(joker)){
      gameState = WINGAME;
    }

    if(bulletGroup.isTouching(batman)){
      gameState = END;
    }
}

if(gameState === WINGAME){
  win.visible = true;
  batarangGroup.destroyEach();
  joker.destroy();
  bulletGroup.setVelocityXEach(0);
  batGroup.setVelocityXEach(0);
  bulletGroup.destroyEach();
  batGroup.destroyEach();
}


if(gameState === END){
  lose.visible = true;
  batarangGroup.destroyEach();
  joker.destroy();
  bulletGroup.setVelocityXEach(0);
  bulletGroup.destroyEach();
  batGroup.destroyEach();
  batGroup.setVelocityXEach(0);
}

  drawSprites();
}


function spawnBats() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    bat = createSprite(800,120,40,10);
    bat.y = Math.round(random(80,120));
    bat.addAnimation("Bat",batImage);
    bat.scale = 0.5;
    bat.velocityX = -3;
    
    //assign lifetime to the variable
    bat.lifetime = 350;
    batGroup.add(bat);
  }
}

function spawnBatarangs() {
  //write code here to spawn the clouds
    batarang = createSprite(batman.x,batman.y,40,10);
    batarang.addImage("batarang",batarangImage);
    batarang.scale = 0.05;
    batarang.velocityX = 3;
    batarang.rotationSpeed = 10;
    
    //assign lifetime to the variable
    batarang.lifetime = 350;
    batarangGroup.add(batarang);
}

function spawnBullets() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    bullet = createSprite(joker.x - 30,joker.y - 30,20,10);
    bullet.addImage("Bullet",bulletImage);
    bullet.scale = 0.07;
    bullet.velocityX = -3;
    
    //assign lifetime to the variable
    bullet.lifetime = 350;
    bulletGroup.add(bullet);

  }
}

