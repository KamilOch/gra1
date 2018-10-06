		var sketchProc=function(processingInstance){ with (processingInstance){
// NIE RUSZAĆ TEGO NA GÓRZE /\ 
		
		
size(400, 400); 
frameRate(30);


//Sterowanie graczami , strzalkami , animacja , 

var graczJeden = {  
    obrazek: getImage("cute/CharacterBoy"),
    xPosition: 50,
    yPosition: 150,
    keys: [],
    punkty: 0};
    
var graczDwa = {  
    obrazek: getImage("cute/CharacterCatGirl"),
    xPosition: 250,
    yPosition: 150,  
    keys: [],
    punkty: 0};
    
var bonus = {
    obrazek: getImage("avatars/mr-pink"),
    xPosition:random(20, 260),
    yPosition:random(20, 260)};


var keyPressed = function () { 
    graczJeden.keys [key.code] = true;
    graczDwa.keys [key.code] = true;
};
 
var keyReleased = function () { 
    graczJeden.keys [key.code] = false; 
    graczDwa.keys [key.code] = false; 
};


draw =function () {
    //rysowanie tla
    background (204, 247, 255);
    
    // rysowanie graczy
    image ((graczJeden.obrazek), graczJeden.xPosition, graczJeden.yPosition, 40, 80);   
    image ((graczDwa.obrazek), graczDwa.xPosition, graczDwa.yPosition, 40, 80);
    // rysowanie bonus
    image ((bonus.obrazek), bonus.xPosition, bonus.yPosition, 40, 40);
    
    // poruszanie sie graczJeden
    if(keyPressed && graczJeden.keys[100] && graczJeden.xPosition<365) {
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
    if(keyPressed && graczJeden.keys [115] && graczJeden.yPosition<335) {
        //do dolu przycisk S
        graczJeden.yPosition ++; 
    }
    
    // poruszanie sie graczDwa
    if(keyPressed && graczDwa.keys [108] && graczDwa.xPosition<365) {
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
    if(keyPressed && graczDwa.keys[107] && graczDwa.yPosition<335){
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
        image(getImage("space/healthheart"),150,150,100,100);
    }
    // gdy gracz spotyka bobus dostaje extra punkty
    //gracz 1
    if(roznicaPolorzeniaBonusuGraczJedenX <35 && roznicaPolorzeniaBonusuGraczJedenY <35 ){      //fill(0,0,0);
        //textSize(30);
        //text("Bonus Gracz",95,140);
        //image(getImage("space/1"),150,150,100,100);
        graczJeden.punkty +=10;
        bonus.xPosition = random(20, 260);
        bonus.yPosition = random(20, 260);
        
    }
   //gracz 2
    if(roznicaPolorzeniaBonusuGraczDwaX <35 && roznicaPolorzeniaBonusuGraczDwaY <35 ){
        //fill(0,0,0);
        //textSize(30);
        //text("Bonus Gracz",95,140);
        //image(getImage("space/2"),150,150,100,100);
        graczDwa.punkty +=10;
        bonus.xPosition = random(20, 260);
        bonus.yPosition = random(20, 260);
    }
   
    textSize(18);
    fill(0,0,0);
    text("Punkty Gracz 1: " + graczJeden.punkty, 20, 30);
    text("Punkty Gracz 2: " + graczDwa.punkty, 20, 59);
};



// NIE RUSZAĆ TEGO POD SPODEM \/ 
		}};
