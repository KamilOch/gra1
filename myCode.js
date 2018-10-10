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
    this.keyUP = config.keyUP;
    this.keyDown = config.keyDown;
    this.keyLeft = config.keyLeft;
    this.keyRight = config.keyRight;
    this.points = 0;
    this.width = config.width ||40;
    this.height = config.height || 80;
    this.speed = config.speed || 1;
    this.score;
};


// nowy gracz 1
var player1 = new Character ({
name: "Gracz 1",
picture: requestImage("CharacterBoy.png"),
xPosition: sizeX*1/8,
yPosition: sizeY*1/3,
keyUP: 119,
keyDown: 115,
keyRight: 100,
keyLeft: 97
});
// nowy gracz 2
var player2 = new Character ({
name: "Gracz 2",
picture: requestImage("CharacterCatGirl.png"),
xPosition: sizeX*6/8,
yPosition: sizeY*1/3,
keyUP: 105,
keyDown: 107,
keyRight: 108,
keyLeft: 106
});
// nowy bonus
var bonus = new Character ({
    picture: requestImage("mr-pink.png"),
    xPosition: random(20, (sizeX-140)),
    yPosition: random(20, (sizeY-140)),
    height: 40
});

var serce = requestImage("healthheart.png");

var keyPressed = function () {
   player1.keys [key.code] = true;
   player2.keys [key.code] = true;
};
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
Character.prototype.random = function() {
   this.xPosition = random (20, (sizeX-140));
   this.yPosition = random (20, (sizeY-140));
};
Character.prototype.score = function() {
    this.points +=10;
};


Character.prototype.move = function() {
   // Right
   if (keyPressed && this.keys [this.keyRight] && this.xPosition<(sizeX-35)){
   return true;
   };
   // Left
   //if (keyPressed && player1.keys [player1.keyLeft] && player1.xPosition>-5){
   //return true;
   //};
   // UP
  // keyPressed && player1.keys [player1.keyUP] && player1.yPosition>-30
   // Down
  // keyPressed && player1.keys [player1.keyDown] && player1.yPosition<(sizeY-65)

};


var checkForPlayerCollision = function() {
return abs(player1.xPosition - player2.xPosition) <=20 &&
       abs(player1.yPosition - player2.yPosition)<=20;
};
var checkForPlayer1Catch = function() {
return abs(player1.xPosition - bonus.xPosition) <35 &&
       abs(player1.yPosition - (bonus.yPosition-30))<35;
};
var checkForPlayer2Catch = function() {
return abs(player2.xPosition - bonus.xPosition) <35 &&
       abs(player2.yPosition - (bonus.yPosition-30))<35;
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
    if (player1.move()) {
        player1.right();
    };
    // w lewo przycisk A
    if (keyPressed && player1.keys [player1.keyLeft] && player1.xPosition>-5) {
        player1.left();
    };
    // do gory przycik W
    if (keyPressed && player1.keys [player1.keyUP] && player1.yPosition>-30) {
       player1.up();
    };
    //do dolu przycisk S
    if (keyPressed && player1.keys [player1.keyDown] && player1.yPosition<(sizeY-65)) {
    player1.down();
    };

    // poruszanie sie graczDwa
    // w prawo przycisk L
    if (keyPressed && player2.keys [player2.keyRight] && player2.xPosition<(sizeX-35)) {
    player2.right();
    };
    // w lewo przycisk J
    if (keyPressed && player2.keys [player2.keyLeft] && player2.xPosition>-5){
    player2.left();
    };
    // do gory przycik I
    if (keyPressed && player2.keys [player2.keyUP] && player2.yPosition>-30){
    player2.up();
    };
    //do dolu przycisk K
    if (keyPressed && player2.keys[player2.keyDown] && player2.yPosition<(sizeY-65)){
    player2.down();
    };

    // gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie         obrazek     (LEPSZA WERSJA)
    if(checkForPlayerCollision()){
    image(serce,sizeX*1/2 -50,sizeY*1/2-50,100,100);
    };

    // gdy gracz spotyka bobus dostaja punkty
    //gracz 1
    if(checkForPlayer1Catch()){
        player1.score();
        bonus.random();
    };
   //gracz 2
    if(checkForPlayer2Catch()){
        player2.score();
        bonus.random();
     };
    //Wyswietlanie punktow
    textSize(18);
    fill(0,0,0);
    text("Punkty " + player1.name + ": " + player1.points, 20, 30);
    text("Punkty " + player2.name + ": " + player2.points, 20, 59);



};




// NIE RUSZAĆ TEGO POD SPODEM \/ 
		}};
