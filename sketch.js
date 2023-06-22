var brinquedo, jaula, meia, osso, pipoca;
var pipocaImg, ossoImg, meiaImg, jaulaImg, brinquedoImg;
var treasureCollection = 0;
var meiaG, ossoG, brinquedoG, jaulaGroup;
var pathImg, endImg, gameover;

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){

    pathImg = loadImage("/assets/pista.jpg");
    pipocaImg = loadAnimation("/assets/pipoca1.jpg","/assets/pipoca2.jpg");
    ossoImg = loadImage("/assets/osso.jpg");
    meiaImg = loadImage("/assets/meia.jpg");
    jaulaImg = loadImage("/assets/jaula.png");
    brinquedoImg = loadImage("/assets/brinquedo.png");
    endImg = loadAnimation("/assets/gameover.png");
}

function setup() {
  
    createCanvas(400,400);
    // Movendo plano de fundo
    path=createSprite(200,200);
    path.addImage(pathImg);
    path.velocityY = -2;

    //criar menino correndo 
    pipoca = createSprite(200,200);
    pipoca.addAnimation("SahilRunning",pipocaImg);
    pipoca.scale=0.1;

    meiaG=new Group();
    ossoG=new Group();
    brinquedoG=new Group();
    jaulaGroup=new Group();

}

function draw() {
  
    background("gray");

    if(gameState===PLAY){
        
        pipoca.x = World.mouseX;
        
        edges= createEdgeSprites();
        pipoca.collide(edges);

        if(path.y < 0 ){
           path.y = path.height;
           console.log(path.y);
          }
         
            createMeia();
            createOsso();
            createBrinquedo();
            createJaula();

            if (meiaG.isTouching(pipoca)) {
                meiaG.destroyEach();
                treasureCollection=treasureCollection+50;
              }
              else if (ossoG.isTouching(pipoca)) {
                ossoG.destroyEach();
                treasureCollection=treasureCollection+100;
                
              }else if(brinquedoG.isTouching(pipoca)) {
                brinquedoG.destroyEach();
                treasureCollection= treasureCollection + 150;
                
              }else{
                if(jaulaGroup.isTouching(pipoca)) {
                  gameState=END;
                  
                  pipoca.addAnimation("SahilRunning",endImg);
                  pipoca.x= windowWidth,windowHeight;
                  pipoca.y= windowWidth,windowHeight;
                  pipoca.scale=0.6;
                  
                  meiaG.destroyEach();
                  ossoG.destroyEach();
                  brinquedoG.destroyEach();
                  jaulaGroup.destroyEach();
                  
                  meiaG.setVelocityYEach(0);
                  ossoG.setVelocityYEach(0);
                  brinquedoG.setVelocityYEach(0);
                  jaulaGroup.setVelocityYEach(0);
               
              }
            }
            
            textSize(20);
            fill(255);
            text("Pontuação: "+ treasureCollection,20,30);
    }
    drawSprites();
}

function createMeia() {
    if (World.frameCount % 200 == 0) {
    var meia = createSprite(Math.round(random(50, width-50),40, 10, 10));
    meia.addImage(meiaImg);
    meia.scale= 0.07;
    meia.velocityY = 3;
    meia.lifetime = 190;
    meiaG.add(meia);
    }
  }
  
  function createOsso() {
    if (World.frameCount % 320 == 0) {
    var osso = createSprite(Math.round(random(50, width-50),40, 10, 10));
    osso.addImage(ossoImg)
    osso.scale= 0.1;
    osso.velocityY = 3;
    osso.lifetime = 190;
    ossoG.add(osso);
  }
  }
  
  function createBrinquedo() {
    if (World.frameCount % 410 == 0) {
    var brinquedo = createSprite(Math.round(random(50, width-50),40, 10, 10));
    brinquedo.addImage(brinquedoImg);
    brinquedo.scale= 0.07;
    brinquedo.velocityY = 3;
    brinquedo.lifetime = 190;
    brinquedoG.add(brinquedo);
    }
  }
  
  function createJaula(){
    if (World.frameCount % 530 == 0) {
    var jaula = createSprite(Math.round(random(50, width-50),40, 10, 10));
    jaula.addImage(jaulaImg);
    jaula.scale= 0.08
    jaula.velocityY = 3;
    jaula.lifetime = 190;
    jaulaGroup.add(jaula);
    }
  }