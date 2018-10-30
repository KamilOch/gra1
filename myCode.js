		var sketchProc=function(processingInstance){ with (processingInstance){
// NIE RUSZAĆ TEGO NA GÓRZE /\ 
		
var sizeX = 600;
var sizeY = 600;

size(sizeX, sizeY);
frameRate(60);

//Ekrany
var game_state = 0; // 0: Start screen. 1: Play. 3: Game over. 4:You Won.

var Mysz = function() {
}

Mysz.prototype.jakiJestX = function(){
    return mouseX;
};
Mysz.prototype.jakiJestY = function(){
    return mouseY;
};



//Konstruktor do przyciskow

var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 200;
    this.height = config.height || 50;
    this.label = config.label || "Click";
};

Button.prototype.draw = function() {
    fill(0, 0, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(250, 250, 250);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};

var btn1 = new Button({
    x: sizeX/10,
    y: 50,
    width: 200,
    label: "Game for two players"
});

var btn2 = new Button({
    x: sizeX/10,
    y: 300,
    width: 260,
    label: "Game for one player and bot"
});
var btn3 = new Button({
    x: (sizeX - 75) ,
    y: 5,
    width:  70,
    height: 40,
    label: "Reset"
});

Button.prototype.isMouseInside  = function(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
        y >= this.y && y <= this.y + this.height;
};





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
};
KlawiaturaBot.prototype.czyIdzieDoGory = function () {
    return bonus.yPosition<player2.yPosition;
};
KlawiaturaBot.prototype.czyIdzieDoDolu = function () {
    return player2.yPosition<bonus.yPosition;
};





function botSretowanySekundami() {
    var d = new Date();
    var n = d.getSeconds();
    return n;
}

/*

// inna wersja sterowania graczem2 (czasowa)
KlawiaturaBot.prototype.czyIdzieWPrawo = function () {
    return botSretowanySekundami() >21 && botSretowanySekundami() <30;
};
KlawiaturaBot.prototype.czyIdzieWLewo = function () {
    return botSretowanySekundami() > 0 && botSretowanySekundami()< 10;
};
KlawiaturaBot.prototype.czyIdzieDoGory = function () {
    return botSretowanySekundami() > 11 && botSretowanySekundami() < 20;
};
KlawiaturaBot.prototype.czyIdzieDoDolu = function () {
    return botSretowanySekundami() > 31 && botSretowanySekundami() < 40;
};

*/


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
//klawiatura: klawiatura1
});

// nowy gracz 2
var player2 = new Character ({
name: "Gracz 2",
picture: requestImage("CharacterCatGirl.png"),
xPosition: sizeX*6/8,
yPosition: sizeY*1/3,
//klawiatura: klawiatura2
});


// Wybor ilosci graczy =  podmiana klawiatury
var mousePressed = function() {
        //dla ekranu wyboru planszy
        if (game_state === 0) {
            if (btn1.isMouseInside(mouseX,mouseY)) {
                player1.klawiatura = klawiatura1;
                player2.klawiatura = klawiatura2;
                player2.points = 0;
                player1.points = 0;
                bonus.random();
                player1.xPosition = sizeX*1/8;
                player1.yPosition = sizeY*1/3;
                player2.xPosition = sizeX*6/8;
                player2.yPosition = sizeY*1/3;

                game_state = 1;

            }
            else if (btn2.isMouseInside(mouseX,mouseY)) {
                    player1.klawiatura = klawiatura1;
                    klawiatura2 = new KlawiaturaBot ();
                    player2.klawiatura = klawiatura2;
                    player2.points = 0;
                    player1.points = 0;
                    bonus.random();
                    player1.xPosition = sizeX*1/8;
                    player1.yPosition = sizeY*1/3;
                    player2.xPosition = sizeX*6/8;
                    player2.yPosition = sizeY*1/3;

                    game_state = 1;

            }
        }
        else if (game_state !==0 ) {
            if (btn3.isMouseInside(mouseX,mouseY)) {
                game_state = 0;
            }
        }

};

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
    var title_red = color(255, 100, 50); // should be const
    var title_grn = color(13, 184, 67);  // should be const

    //Ekran startowy
    if (game_state === 0) {
        //rysowanie tla
        background (204, 247, 255);
        btn1.draw();
        btn2.draw();
    }

    if (game_state === 1) {

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

        botSretowanySekundami();

        btn3.draw();

        if (player1.points === 50){
        game_state = 2};

        if (player2.points === 50){
        game_state = 2};
      }

    if (game_state === 2) {
        background (204, 247, 255);

        //Wyswietlanie punktow
        textSize(70);
        fill(0,0,0);
        text ("GAME OVER",sizeX/8,sizeY/7);
        textSize(30);
        text("Punkty " + player1.name + ": " + player1.points, sizeX/4, sizeY/2);
        text("Punkty " + player2.name + ": " + player2.points, sizeX/4, sizeY/1.5);
        btn3.draw();
    }


};




// NIE RUSZAĆ TEGO POD SPODEM \/ 
		}};
