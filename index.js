var word = require("./Word");
var letter = require("./Letter");
var inquirer = require("inquirer");
var wordChoices = ["elephant", "lion", "tiger", "giraffe", "crocodile", "gorilla", "hippopotamus", "kangaroo"];
var computerGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
console.log(computerGuess);
var computerGuessArray=computerGuess.split("");
var letterObjectsArray=[];
for(var i=0;i<computerGuessArray.length;i++){
    letterObjectsArray.push(new letter(computerGuessArray[i]));
}
var data=new word(letterObjectsArray);
console.log(data.getData());
var numberOfGuesses = 3;
var count=0;
function getUserInput(){
if(count<=numberOfGuesses){
inquirer.prompt([

    {
      type: "input",
      name: "guessedLetter",
      message: "Guess a letter!!!"
    }
]).then(function(response){
    //console.log(response.guessedLetter);
    
    
    data.guess(response.guessedLetter);
    
    console.log(data.getData());
    count++;
    getUserInput();  

});
}
}
getUserInput();

