		var sketchProc=function(processingInstance){ with (processingInstance){
// NIE RUSZAĆ TEGO NA GÓRZE /\ 
		
var sizeX = 600;
var sizeY = 600;

size(sizeX, sizeY);
frameRate(60);

var startTime = Date.now();

//Sterowanie graczami , strzalkami , animacja , 

//Nowa Klawiatura
var Klawiatura = function(config){
    this.keyUP = config.keyUP;
    this.keyDown = config.keyDown;
    this.keyLeft = config.keyLeft;
    this.keyRight = config.keyRight;
}

Klawiatura.prototype.czyIdzieWPrawo = function () {
    return keyPressed && this [this.keyRight];
};
Klawiatura.prototype.czyIdzieWLewo = function () {
    return keyPressed && this [this.keyLeft];
};
Klawiatura.prototype.czyIdzieDoGory = function () {
    return keyPressed && this [this.keyUP];
};
Klawiatura.prototype.czyIdzieDoDolu = function () {
    return keyPressed && this [this.keyDown];
};

var KlawiaturaBot = function(){
};

KlawiaturaBot.prototype.czyIdzieWPrawo = function () {
    return player2.xPosition<bonus.xPosition; // automatyczne podazanie za bonusem
};
KlawiaturaBot.prototype.czyIdzieWLewo = function () {
    return bonus.xPosition<player2.xPosition; // automatyczne podazanie za bonusem
   //true * losowy (od 3 do 5 sec) czas podtrzymania
   //oddawajPrawdePrzezLosowyCzas();


};
KlawiaturaBot.prototype.czyIdzieDoGory = function () {
    return bonus.yPosition<player2.yPosition;
};
KlawiaturaBot.prototype.czyIdzieDoDolu = function () {
    return player2.yPosition<bonus.yPosition;
};

// Test
var oddawajPrawdePrzezLosowyCzas = function () {

    var czaPpodtrzymania = 5;
    return ((czaPpodtrzymania - Math.floor((Date.now()-startTime)/1000))>=0 )
}


var klawiatura1 = new Klawiatura ({
    keyUP: 119,
    keyDown: 115,
    keyRight: 100,
    keyLeft: 97
});
var klawiatura2 = new Klawiatura ({
    keyUP: 105,
    keyDown: 107,
    keyRight: 108,
    keyLeft: 106
});

klawiatura2 = new KlawiaturaBot ();


// Konstruktor

var Character = function (config){
    this.name = config.name;
    this.picture = config.picture;
    this.xPosition = config.xPosition;
    this.yPosition = config.yPosition;
    this.points = 0;
    this.width = config.width ||40;
    this.height = config.height || 80;
    this.speed = config.speed || 1;
    this.score;
    this.klawiatura = config.klawiatura;
};


// nowy gracz 1
var player1 = new Character ({
name: "Gracz 1",
picture: requestImage("CharacterBoy.png"),
xPosition: sizeX*1/8,
yPosition: sizeY*1/3,
klawiatura: klawiatura1
});

// nowy gracz 2
var player2 = new Character ({
name: "Gracz 2",
picture: requestImage("CharacterCatGirl.png"),
xPosition: sizeX*6/8,
yPosition: sizeY*1/3,
klawiatura: klawiatura2
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
};

var keyReleased = function () {
    player1.klawiatura [key.code] = false;
    player2.klawiatura [key.code] = false;
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
    if (this.klawiatura.czyIdzieWPrawo() && this.xPosition<(sizeX-35)) {
        this.right();
        };
        // w lewo
        if (this.klawiatura.czyIdzieWLewo () && this.xPosition>-5){
        this.left();
        };
        // do gory
        if (this.klawiatura.czyIdzieDoGory () && this.yPosition>-30){
        this.up();
        };
        //do dolu
        if (this.klawiatura.czyIdzieDoDolu () && this.yPosition<(sizeY-65)){
        this.down();
    };
};

var funkcjaSerce = function() {
// gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie obrazek (LEPSZA WERSJA)
    if (checkForPlayerCollision()) {
    image(serce,sizeX*1/2 -50,sizeY*1/2-50,100,100);
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

    // gdy gracze sie spotkaja(sa w mniejszej odleglosci niz 20 pixeli), pojawia sie obrazek (LEPSZA WERSJA)
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
