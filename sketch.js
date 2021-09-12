var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;


function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  // Moving background
  path = createSprite(width / 2, 200);
  path.addImage(pathImg);
  path.velocityY = 10;


  //creating boy running
  boy = createSprite(width / 2, 580, height - 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  boy.debug = false
  gameOverSprite = createSprite(width / 2, height / 2, height - 20, 20);
  gameOverSprite.visible = false
  gameOverSprite.addAnimation("gameover", endImg);
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {
   
  if (gameState === PLAY) {
    // background(0);
    boy.x = World.mouseX;
    touches = [];

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > height) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;

    } if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;

    }


    if (swordGroup.isTouching(boy)) {
      gameState = END;
      gameOverSprite.visible=true
     boy.visible=false
      cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();
      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);


      textSize(20)
      fill(300)
      text("PRESS SPACE BUTTON TO PLAY BACK", 500, 500)
    }
  }
  if (keyDown("SPACE")) {
    reset();
   
  }






  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);







}
function createCash() {
  if (World.frameCount % 120 == 0) {
    var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 5;
    cash.lifetime = 250;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 150 == 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 250;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 120 == 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 250;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 250 == 0) {
    var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 250;
    swordGroup.add(sword);
  }
}


function reset() {
  gameState = PLAY;
  gameOverSprite.visible=false
  boy.visible=true
  // swordGroup.destroyEach();
  // cashG.destroyEach();
  // diamondsG.destroyEach();
  // jwelleryG.destroyEach();

  treasureCollection = 0;

}
