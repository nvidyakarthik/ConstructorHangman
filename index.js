var word = require("./Word");
var letter = require("./Letter");
var inquirer = require("inquirer");

var wordChoices = ["elephant", "lion", "tiger", "giraffe", "crocodile", "gorilla", "hippopotamus", "kangaroo"];
var computerGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
console.log("Hint:Its an Animal!!\n");
var computerGuessArray = computerGuess.split("");
var letterObjectsArray = [];
var numberOfGuesses = 10;
for (var i = 0; i < computerGuessArray.length; i++) {
    letterObjectsArray.push(new letter(computerGuessArray[i]));
}
var data = new word(letterObjectsArray);
//console.log(data.getData());
var previousWord=data.getData();

var count = 0;
function getUserInput() {
    if (numberOfGuesses > 0) {
        inquirer.prompt([

            {
                type: "input",
                name: "userGuessedLetter",
                message: "Guess a letter!!!"
            }
        ]).then(function (response) {
            //console.log(response.guessedLetter);
            data.guess(response.userGuessedLetter.toLowerCase());
            
            var userGuessedWord=data.getData();
            console.log("\n"+userGuessedWord+"\n");
            checkNumGuesses(userGuessedWord);
            previousWord=userGuessedWord;
            count++;
            getUserInput();

        });
    }
}
getUserInput();

function checkNumGuesses(userGuessedWord){
    userGuessedWord= userGuessedWord.split(" ").join("");
    previousWord=previousWord.split(" ").join("");
    if(userGuessedWord===computerGuess){
        console.log("YOU GUESSED CORRECTLY!!!");
        numberOfGuesses=-1;
    }
    else if(previousWord===userGuessedWord)    {
        numberOfGuesses--;
        console.log("\x1b[31m%s\x1b[0m","INCORRECT!!!");
        if(numberOfGuesses===0)
            console.log("\nThe correct Word is "+computerGuess);
        else    
             console.log("\n"+numberOfGuesses+" guesses remaining\n");

    }
    else if(previousWord!==userGuessedWord)
    console.log("\x1b[32m%s\x1b[0m","CORRECT!!!");

    
}