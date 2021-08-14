//Create variables here
var dog,dogImg,happyDogImg,database,foodS,foodStockRef,database;
var frameCountNow = 0;
var fedTime, lastFed, feed, addFood,foodObj,currentTime;
var milk,input,name;
var gameState = 0;
var gameStateRef;
var bedroomImg,gardenImg,runImg,washroomImg,sleepImg;
var feed,addFood,milkBottle1,milkBottle2;
var input,button;
var hungryDog;
var milkBottle;

function preload(){
	//load images here
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
  bedroomImg = loadImage("Bed Room.png");
  milkBottle = loadImage("Milk.png");
  gardenImg = loadImage("Garden.png");
  washroomImg = loadImage("Wash Room.png");
  sleepImg = loadImage("Lazy.png");
  runImg = loadImage("running.png");
  hungryDog = loadImage("dogImg1.png");   
  livingRoom=loadImage("Living Room.png");
}


function setup() {
  createCanvas(900,500);
   database= firebase.database();
  
  foodObj = new Food();

  dog = createSprite(600,300,10,10);
 dog.addImage(dogImg)
  dog.scale = 0.3;

 

  foodStock = database.ref('/')
  foodStock.on("value" , readStock)
  foodStock.set(20)

  milkBottle1 = createSprite(400,400,10,10);
  milkBottle1.addImage(milkBottle)
  milkBottle1.scale = 0.025;
  
  milkBottle2 = createSprite(450,450,10,10);
  milkBottle2.addImage(milkBottle)
  milkBottle2.scale =0.025;
  milkBottle2.visible = false;
  
 

}

function draw() {  
  background("yellow")

  var gameStateRef = database.ref('/');
  gameStateRef.on("value", function(data){
    gameState: data.val()
  })
  foodObj.display();
  writeStock(foodS);
  var Bath=createButton("I want to take bath");
  Bath.position(580,125);
 if(Bath.mousePressed(function(){
   gameState=3;
   database.ref('/').update({'gameState':gameState});

 }));
 if(gameState===3){
   dog.addImage(washroomImg);
   dog.scale=1;
   milkBottle2.visible=false;
 }

var Sleep=createButton("I am very sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
 gameState=4;
 database.ref('/').update({'gameState':gameState});

}));
if(gameState===4){
 dog.addImage(bedroomImg);
 dog.scale=1;
 milkBottle1.visible=false;
}

var Play=createButton("Let's Play !");
Play.position(960,125);
if(Play.mousePressed(function(){
 gameState=5;
 database.ref('/').update({'gameState':gameState});

}));
if(gameState===5){
 dog.addImage(livingRoom);
 dog.scale=1;
 milkBottle2.visible=false;
}

var PlayInGarden=createButton("Let's play in park");
PlayInGarden.position(830,125);
if(PlayInGarden.mousePressed(function(){
 gameState=6;
 database.ref('/').update({'gameState':gameState});

}));
if(gameState===6){
  dog.y=175;
 dog.addImage(gardenImg);
 dog.scale=1;
 milkBottle1.visible=false;
}

var button = createButton("Feed the dog");
button.position(400,125);

if(button.mousePressed(function(){
  foodS=foodS-1;
  gameState=1;
  database.ref('/').update({'gameState':gameState})
}));

var addFoods = createButton("Add Food");
addFoods.position(500,125);

if(addFoods.mousePressed(function(){
  foodS=foodS+1;
  gameState=2;
  database.ref('/').update({'gameState':gameState})
}));

  

  if(foodS === 0){
    dog.addImage(happyDogImg);
    milkBottle1.visible = false;
  }else{
    dog.addImage(dogImg);
    milkBottle1.visible = true;
  }

  if(gameState===1){
    dog.addImage(happyDogImg);
    dog.scale=0.175;
    dog.y=250;
  }

  if(gameState===2){
    dog.addImage(dogImg);
    dog.scale=0.175;
    milkBottle1.visible=false;
    dog.y=250;
  }
 
  
  

  fedTime = database.ref('FeedTime')
  fedTime.on("value", function (data){
  lastFed = data.val();
})

  if(gameState === 0){
    feedDog.visible = true;

    dog.addImage(hungryDog);
    
  }
  else{
    feedDog.visible = false;
   // addFood.visible = false;
    dog.remove();
  
  }

    drawSprites();


    fill("red");
    textSize(20);
    text("Last Fed: "+lastFed+":00",300,40);

    fill("red");
    textSize(20);
    text("Time Since last fed: "+(currentTime - lastFed),300,125);
    
}

  function feedDog(){
    foodObj.deductFood();
    foodObj.updateFoodStock();
    dog.addImage("happy", happyDogImg);
    gameState="happy";
    updateGameState();
  }

//function to add food in stock
function addFoods(){
foodObj.addFood();
foodObj.updateFoodStock();
}

async function hour(){
  var site = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var siteJSON = await site.json();
  var datetime = siteJSON.datetime;
  var hourTime = datetime.slice(11,13);
  return hourTime;
}

function createName(){
  input.hide();
  button.hide();

  name = input.value();
  var greeting = createElement('h3');
  greeting.html("Pet's Name: "+ name);
  greetin.position(width/2+850,height/2+200);
}





function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}


