		var sketchProc=function(processingInstance){ with (processingInstance){
// NIE RUSZAĆ TEGO NA GÓRZE /\ 
		
var sizeX = 600;
var sizeY = 600;

size(sizeX, sizeY);
frameRate(60);


//Sterowanie graczami , strzalkami , animacja , 

// Konstruktor

var Character = function (config){
    this.name = config.name;
    this.picture = config.picture;
    this.xPosition = config.xPosition;
    this.yPosition = config.yPosition;
    this.keys = [];
    this.points = 0;
    this.width = config.width ||40;
    this.height = config.height || 80;
};

var player1 = new Character ({
name: "Gracz 1",
picture: requestImage("CharacterBoy.png"),
xPosition: sizeX*1/8,
yPosition: sizeY*1/3
});

var player2 = new Character ({
name: "Gracz 2",
picture: requestImage("CharacterCatGirl.png"),
xPosition: sizeX*6/8,
yPosition: sizeY*1/3
});

/*
var graczJeden = {
    picture: requestImage("CharacterBoy.png"),
    xPosition: sizeX*1/8,
    yPosition: sizeY*1/3,
    keys: [],
    points: 0};

var graczDwa = {  
    picture: requestImage("CharacterCatGirl.png"),
    xPosition: sizeX*6/8,
    yPosition: sizeY*1/3,
    keys: [],
    points: 0};
*/
var serce = requestImage("healthheart.png");

var bonus = {
    picture: requestImage("mr-pink.png"),
    xPosition:random(20, (sizeX-140)),
    yPosition:random(20, (sizeY-140))};


var keyPressed = function () { 
    graczJeden.keys [key.code] = true;
    graczDwa.keys [key.code] = true;
};
 
var keyReleased = function () { 
    graczJeden.keys [key.code] = false; 
    graczDwa.keys [key.code] = false; 
};


Character.prototype.draw = function() {
    //background (204, 247, 255);
 // rysowanie graczy
 image (this.picture, this.xPosition, this.yPosition, this.width, this.height);
};






draw =function () {
    //rysowanie tla
   background (204, 247, 255);

    // rysowanie graczy
    //image ((graczJeden.picture), graczJeden.xPosition, graczJeden.yPosition, 40, 80);
    //image ((graczDwa.picture), graczDwa.xPosition, graczDwa.yPosition, 40, 80);
    player1.draw();
    player2.draw();

    // rysowanie bonus
    image ((bonus.picture), bonus.xPosition, bonus.yPosition, 40, 40);
    /*
    // poruszanie sie graczJeden
    if(keyPressed && graczJeden.keys[100] && graczJeden.xPosition<(sizeX-35)) {
        // w prawo przycisk D
        graczJeden.xPosition ++;
        }
    if(keyPressed && graczJeden.keys[97] && graczJeden.xPosition>-5) {
        // w lewo przycisk A
        graczJeden.xPosition --; 
    }
    if(keyPressed && graczJeden.keys [119] && graczJeden.yPosition>-30) {
        // do gory przycik W
        graczJeden.yPosition --; 
    }
    if(keyPressed && graczJeden.keys [115] && graczJeden.yPosition<(sizeY+65)) {
        //do dolu przycisk S
        graczJeden.yPosition ++; 
    }
    
    // poruszanie sie graczDwa
    if(keyPressed && graczDwa.keys [108] && graczDwa.xPosition<(sizeX-35)) {
        // w prawo przycisk L
        graczDwa.xPosition ++;
    }
    if(keyPressed && graczDwa.keys [106] && graczDwa.xPosition>-5){
        // w lewo przycisk J
        graczDwa.xPosition --; 
    }
    if(keyPressed && graczDwa.keys [105] && graczDwa.yPosition>-30){
        // do gory przycik I
        graczDwa.yPosition --; 
    }
    if(keyPressed && graczDwa.keys[107] && graczDwa.yPosition<(sizeY+65)){
        //do dolu przycisk K
        graczDwa.yPosition ++; 
    }
    
    //sprawdzanie odleglosci miedzy graczami
    var roznicaPolorzeniaGraczaX = abs((graczJeden.xPosition - graczDwa.xPosition));
    var roznicaPolorzeniaGraczaY = abs((graczJeden.yPosition - graczDwa.yPosition));
    // sprawdzanie odleglosci miedzy bonusem a graczem 1
    var roznicaPolorzeniaBonusuGraczJedenX = abs((graczJeden.xPosition - bonus.xPosition));
    var roznicaPolorzeniaBonusuGraczJedenY = abs((graczJeden.yPosition - (bonus.yPosition-30)));
    
     // sprawdzanie odleglosci miedzy bonusem a graczem 2
    var roznicaPolorzeniaBonusuGraczDwaX = abs((graczDwa.xPosition - bonus.xPosition));
    var roznicaPolorzeniaBonusuGraczDwaY = abs((graczDwa.yPosition - (bonus.yPosition-30)));
    
    // gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie         obrazek     (LEPSZA WERSJA)
    if(roznicaPolorzeniaGraczaX <20 && roznicaPolorzeniaGraczaY <20 ){
        image(serce,150,150,100,100);
    }
    // gdy gracz spotyka bobus dostaje extra punkty
    //gracz 1
    if(roznicaPolorzeniaBonusuGraczJedenX <35 && roznicaPolorzeniaBonusuGraczJedenY <35 ){      //fill(0,0,0);
        //textSize(30);
        //text("Bonus Gracz",95,140);
        //image(getImage("space/1"),150,150,100,100);
        graczJeden.points +=10;
        bonus.xPosition = random(20, 260);
        bonus.yPosition = random(20, 260);
        
    }
   //gracz 2
    if(roznicaPolorzeniaBonusuGraczDwaX <35 && roznicaPolorzeniaBonusuGraczDwaY <35 ){
        //fill(0,0,0);
        //textSize(30);
        //text("Bonus Gracz",95,140);
        //image(getImage("space/2"),150,150,100,100);
        graczDwa.points +=10;
        bonus.xPosition = random(20, 260);
        bonus.yPosition = random(20, 260);
    }
   */
    textSize(18);
    fill(0,0,0);
    text("Punkty Gracz 1: " + player1.points, 20, 30);
    text("Punkty Gracz 2: " + player2.points, 20, 59);



};




// NIE RUSZAĆ TEGO POD SPODEM \/ 
		}};
