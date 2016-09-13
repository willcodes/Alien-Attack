//alien position
var alienX = 80;
var alienY= 20;
//guess positon
var guessX = 0;
var guessY = 0;
//inputs
var explodeX=0;
var explodeY=0;

var output = document.querySelector("#output");
var inputX = document.querySelector("#inputX");
var inputY = document.querySelector("#inputY");
var score = document.querySelector("#score");
//stats
var shotsRemaining = 8;
var shotsMade = 0;
var gameState = "";
var gameWon = false;

//objects in game
var cannon = document.querySelector("#cannon");
var alien = document.querySelector("#alien");
var missile = document.querySelector("#missile");
var explode = document.querySelector("#explode"); 

//button
var button = document.querySelector("button");

button.onclick = function(){
	validate();
}
window.addEventListener("keydown", keydownHandler, false); 
function keydownHandler(event)
{
 if(event.keyCode === 13)
 {
 validate();
 }
}
function validate(){
	if(isNaN(guessX) || isNaN(guessY) ){
		output.innerHTML = "Please type only numbers 0-300";
	}
	else if((guessX > 300) ^ (guessY > 300)){
		output.innerHTML = "Your number is too big!";
	}
	// else if(guessX == "" || guessY == ""){
	// 	output.innerHTML = "Please type a number";
	// }
	else{
	playGame();
	}
}

function playGame(){
	shotsRemaining --;
	shotsMade ++;
	gameState = "Missiles Fired: "+ shotsMade + "<br>" + "Remaining: " + shotsRemaining;

	guessX = parseInt(inputX.value);
	guessY = parseInt(inputY.value);
	if(guessX >= alienX && guessX <= alienX +20){
		if (guessY >= alienX && guessY <= alienY + 15) {
			gameWon = true;
			endGame();
		}
	}
	else{
		score.innerHTML = gameState;
		output.style.color = "red";
		output.innerHTML = "Miss!";
		if
			(shotsRemaining < 1){
				endGame();
			}
		}	
	if(!gameWon){
		alienX = Math.floor(Math.random() *281);
		alienY += 30;
	}
	render();
	inputX.value = "0";
	inputY.value = "0";
	console.log("alienX");
	console.log("alienY");
}
function endGame(){
	if(gameWon){
		output.style.color = "green";
		output.innerHTML = "Hit! You saved the planet!" + "<br>"
		+ "It only took you " + shotsMade + "missiles.";
		alien.style.background = "url('./assets/explosion.png')";
	}
	else{
		output.style.color = "red";
		output.innerHTML = "You lost!" + "<br>"
		+ "The earth is doomed!";
		cannon.style.background = "url('./assets/explosion.png')";
		
	}
	disable();
}

function render(){
	alien.style.left = alienX + "px";
	alien.style.top = alienY + "px";
	cannon.style.left = guessX + "px";
	missile.style.left = guessX + "px";
 	missile.style.top = guessY + "px";
 	missile.style.background = "url('./assets/explosion.png')";
 	if(gameWon){
 		missile.style.display = "none";
  	}
}

function disable(){
	button.disabled = true;
	window.removeEventListener("keydown", keydownHandler, false);
	inputX.disabled = true;
  	inputY.disabled = true;
}