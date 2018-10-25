		var sketchProc=function(processingInstance){ with (processingInstance){
// NIE RUSZAĆ TEGO NA GÓRZE /\ 
		
var sizeX = 600;
var sizeY = 600;

size(sizeX, sizeY);
frameRate(60);


//Sterowanie graczami , strzalkami , animacja , 

// Konstruktor

var Klawiatura = function (config){
    this.keyUP = config.keyUP;
    this.keyDown = config.keyDown;
    this.keyLeft = config.keyLeft;
    this.keyRight = config.keyRight;
};

var klawiaturaPlayer1 = new Klawiatura ({
    keyUP: 119,
    keyDown: 115,
    keyRight: 100,
    keyLeft: 97
});

var klawiaturaPlayer2 = new Klawiatura ({
    keyUP: 105,
    keyDown: 107,
    keyRight: 108,
    keyLeft: 106

});

var komputerKeyUp;
var komputerKeyDown;
var komputerKeyRight;
var komputerKeyLeft;

var KlawiaturaKomputer = function (config){
    this.keyUP = config.keyUP;
    this.keyDown = config.keyDown;
    this.keyLeft = config.keyLeft;
    this.keyRight = config.keyRight;
};

var klawiaturaKomputer = new KlawiaturaKomputer ({
    keyUP: komputerKeyUp,
    keyDown: komputerKeyDown,
    keyRight: komputerKeyRight,
    keyLeft: komputerKeyLeft
});

komputerKeyUp = true;

// proba zastapienia kplawiatury
klawiaturaPlayer2 = klawiaturaKomputer;


var Character = function (config){
    this.name = config.name;
    this.picture = config.picture;
    this.xPosition = config.xPosition;
    this.yPosition = config.yPosition;
    //this.keys = [];
    this.klawiatura = config.klawiatura;
    //this.keyUP = config.keyUP;
    //this.keyDown = config.keyDown;
    //this.keyLeft = config.keyLeft;
    //this.keyRight = config.keyRight;
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
klawiatura: klawiaturaPlayer1
//keyUP: 119,
//keyDown: 115,
//keyRight: 100,
//keyLeft: 97
});

// nowy gracz 2
var player2 = new Character ({
name: "Gracz 2",
picture: requestImage("CharacterCatGirl.png"),
xPosition: sizeX*6/8,
yPosition: sizeY*1/3,
klawiatura: klawiaturaPlayer2
//keyUP: 105,
//keyDown: 107,
//keyRight: 108,
//keyLeft: 106
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
   player1.klawiatura [key.code] = true;
   player2.klawiatura [key.code] = true;
   player2.klawiaturaKomputer = true;
};

var keyReleased = function () {
    player1.klawiatura [key.code] = false;
    player2.klawiatura [key.code] = false;
    player2.klawiaturaKomputer = false;
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
    // w prawo
    if (keyPressed && this.klawiatura [this.klawiatura.keyRight] && this.xPosition<(sizeX-35)) {
    this.right();
    };
    // w lewo
    if (keyPressed && this.klawiatura [this.klawiatura.keyLeft] && this.xPosition>-5){
    this.left();
    };
    // do gory
    if (keyPressed && this.klawiatura [this.klawiatura.keyUP] && this.yPosition>-30){
    this.up();
    };
    //do dolu
    if (keyPressed && this.klawiatura[this.klawiatura.keyDown] && this.yPosition<(sizeY-65)){
    this.down();
    };
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

var funkcjaSerce = function() {
// gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie obrazek (LEPSZA WERSJA)
    if (checkForPlayerCollision()) {
    image(serce,sizeX*1/2 -50,sizeY*1/2-50,100,100);
       };
};

Character.prototype.draw = function() {
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

    // poruszanie sie graczy
    player1.move();
    player2.move();
/*
    // gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie obrazek (LEPSZA WERSJA)
    if(checkForPlayerCollision()){
        image(serce,sizeX*1/2 -50,sizeY*1/2-50,100,100);
    };
*/
    funkcjaSerce();
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
