//Global Variable Init
var score = 0;
var winPoint = 3;
var losePoint = 1;
var hardmode = false;

//Main algorithm start
function point(status){
  if(status){
    score -= losePoint;
    setPosition("player", "140", "400");
  } else if (!status){
    score += winPoint;
  }
  if(score < 0 ){
    score = 0;
    setScreen("loseScreen");
  }
  if(score>=10){
    setScreen("winGame");
  }
  randomize();
  setText("label1", score);
  setPosition("player", "140", "400");
}

function isTouching(){
  var obs0_x = getXPosition("obstacle");
  var obs0_y = getYPosition("obstacle");
  var obs1_x = getXPosition("obstacle1");
  var obs1_y = getYPosition("obstacle1");
  var obs2_x = getXPosition("obstacle2");
  var obs2_y = getYPosition("obstacle2");
  var min_x = getXPosition("reach");
  var min_y = getYPosition("reach");
  var play_x = getXPosition("player");
  var play_y = getYPosition("player");
    //Ultra 
    if((play_x >= obs0_x) && (play_x <= obs0_x+60) && (play_y >= obs0_y) && (play_y <= obs0_y+60)){
      console.log("hit");
      point(true);
    }
    if((play_x >= obs1_x) && (play_x <= obs1_x+60) && (play_y >= obs1_y) && (play_y <= obs1_y+60)){
      console.log("hit1");
      point(true);
    }
    //Hard mode implementation
    if((play_x >= obs2_x) && (play_x <= obs2_x+60) && (play_y >= obs2_y) && (play_y <= obs2_y+60) && hardmode){
      console.log("hit2");
      point(true);
    }
    //End Ultra
    //Mineral 
    if((play_x >= min_x) && (play_x <= min_x+60) && (play_y >= min_y) && (play_y <= min_y+60)){
      console.log("min");
      point(false);
    }
}

function randomize(){
  var obsx = Number((Math.random())*245+25);
  var obsx1 = Number((Math.random())*245+25);
  var obsx2 = Number((Math.random())*245+25);
  var obsy = Number((Math.random())*245 +70);
  var obsy1 = Number((Math.random())*245 +70);
  var obsy2 = Number((Math.random())*245 +70);
  setPosition("obstacle", obsx, obsy);
  setPosition("obstacle1", obsx1, obsy1);
  setPosition("obstacle2", obsx2, obsy2);
}

//main algorithm end


function main(){
//screen change
onEvent("mGameBtn", "click", function(){
  score = 0;
  randomize();
  setScreen("mGame");
});
onEvent("ezmode", "click", function(){
  hardmode = false;
  hideElement("obstacle2");
  setScreen("objective");
});
onEvent("hdmode", "click", function(){
  hardmode = true;
  showElement("obstacle2");
  setScreen("objective");
});
onEvent("loseBtn", "click", function(){
  setScreen("objective");
});
onEvent("winBtn", "click", function(){
  setScreen("start");
});
//Screen change end

//Movement setting
onEvent("mGame", "keydown", function(event){
  var x_crd = getXPosition("player");
  var y_crd = getYPosition("player");
  if(event.keyCode == '38'){
  setPosition("player", x_crd, y_crd-5);
  }
  if (event.keyCode == '40'){
  setPosition("player", x_crd, (y_crd+5));
  }
  if(event.keyCode == '37'){
  setPosition("player", x_crd-5, y_crd);
  }
  if (event.keyCode == '39'){
  setPosition("player", x_crd+5,y_crd);
  }
  isTouching();
});
//Movement setting end

}

main();
