var dog, dogImg, happyDog, happyDogImg, database, foodS, foodStock;

var food;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
 
  database = firebase.database();

  dog = createSprite(375, 250, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readstock)
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW && foodS > 0)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  fill(255, 255, 255);
  textSize(15);
  text("Note : Press Up Arrow Key To Feed Drago Milk", 100, 50);

  fill(255, 255, 255);
  textSize(15);
  text("Food Remaning : "+foodS,170,200);
}

function readstock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }
    database.ref("/").update({
      Food : x,
    });
}



