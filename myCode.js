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
    this.speed = config.speed || 1;
};


// nowy gracz 1
var player1 = new Character ({
name: "Gracz 1",
picture: requestImage("CharacterBoy.png"),
xPosition: sizeX*1/8,
yPosition: sizeY*1/3
});
// nowy gracz 2
var player2 = new Character ({
name: "Gracz 2",
picture: requestImage("CharacterCatGirl.png"),
xPosition: sizeX*6/8,
yPosition: sizeY*1/3
});
// nowy bonus
var bonus = new Character ({
    picture: requestImage("mr-pink.png"),
    xPosition: random(20, (sizeX-140)),
    yPosition: random(20, (sizeY-140)),
    height: 40
});

var serce = requestImage("healthheart.png");
/*
Character.prototype.keyPressed = function () {
    player1.keys [key.code] = true;
    player2.keys [key.code] = true;
};*/

var keyPressed = function () {
    player1.keys [key.code] = true;
    player2.keys [key.code] = true;
};

/*
Character.prototype.keyReleased = function () {
    player1.keys [key.code] = false;
    player2.keys [key.code] = false;

};*/

var keyReleased = function () {
    player1.keys [key.code] = false;
    player2.keys [key.code] = false;
};

Character.prototype.up = function() {
    this.yPosition -= this.speed;
};
Character.prototype.down = function() {
    this.yPosition += this.speed;
};
Character.prototype.right = function() {
    this.xPosition += this.speed;
};
Character.prototype.left = function() {
    this.xPosition -= this.speed;
};

var checkForPlayerCollision = function() {
return abs(player1.xPosition - player2.xPosition) <=20 &&
               abs(player1.yPosition - player2.yPosition)<=20;
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
    player1.draw();
    player2.draw();

    // rysowanie bonus
    bonus.draw();
    // poruszanie sie graczJeden
    // w prawo przycisk D
    if (keyPressed && player1.keys [100] && player1.xPosition<(sizeX-35)) {
        player1.right();
    };
    // w lewo przycisk A
    if (keyPressed && player1.keys [97] && player1.xPosition>-5) {
        player1.left();
    };
    // do gory przycik W
    if (keyPressed && player1.keys [119] && player1.yPosition>-30) {
        player1.up();
    };
    //do dolu przycisk S
    if (keyPressed && player1.keys [115] && player1.yPosition<(sizeY-65)) {
    player1.down();
    };

    // poruszanie sie graczDwa
    // w prawo przycisk L
    if (keyPressed && player2.keys [108] && player2.xPosition<(sizeX-35)) {
    player2.right();
    };
    // w lewo przycisk J
    if (keyPressed && player2.keys [106] && player2.xPosition>-5){
    player2.left();
    };
    // do gory przycik I
    if (keyPressed && player2.keys [105] && player2.yPosition>-30){
    player2.up();
    };
    //do dolu przycisk K
    if (keyPressed && player2.keys[107] && player2.yPosition<(sizeY-65)){
    player2.down();
    };
    /*


    
    //sprawdzanie odleglosci miedzy graczami
    var roznicaPolorzeniaGraczaX = abs((graczJeden.xPosition - graczDwa.xPosition));
    var roznicaPolorzeniaGraczaY = abs((graczJeden.yPosition - graczDwa.yPosition));
    // sprawdzanie odleglosci miedzy bonusem a graczem 1
    var roznicaPolorzeniaBonusuGraczJedenX = abs((graczJeden.xPosition - bonus.xPosition));
    var roznicaPolorzeniaBonusuGraczJedenY = abs((graczJeden.yPosition - (bonus.yPosition-30)));
    
     // sprawdzanie odleglosci miedzy bonusem a graczem 2
    var roznicaPolorzeniaBonusuGraczDwaX = abs((graczDwa.xPosition - bonus.xPosition));
    var roznicaPolorzeniaBonusuGraczDwaY = abs((graczDwa.yPosition - (bonus.yPosition-30)));
    */
    /*
    // gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie         obrazek     (LEPSZA WERSJA)
    if(roznicaPolorzeniaGraczaX <20 && roznicaPolorzeniaGraczaY <20 ){
        image(serce,150,150,100,100);
    }
    */

    if(checkForPlayerCollision()){
    image(serce,150,150,100,100);
    };
    /*
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
    text("Punkty " + player1.name + ": " + player1.points, 20, 30);
    text("Punkty " + player2.name + ": " + player2.points, 20, 59);



};




// NIE RUSZAĆ TEGO POD SPODEM \/ 
		}};
