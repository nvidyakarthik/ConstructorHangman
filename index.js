var word = require("./Word");
var letter = require("./Letter");
var inquirer = require("inquirer");
//Declaring global variables;
var numberOfGuesses = 0;
var data = "";
var previousWord = "";
var computerGuess = "";

//This function picks a random animal name from an array and stores in Word construtor function
function playGame() {
    var wordChoices = ["elephant", "lion", "tiger", "giraffe", "crocodile", "gorilla", "hippopotamus", "kangaroo"];
    computerGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    //console.log(computerGuess);
    console.log("Hint:Its an Animal!!\n");
    var computerGuessArray = computerGuess.split("");
    var letterObjectsArray = [];
    numberOfGuesses = 10;
    //Creating letter object from the computer guessed word and storing it in an array
    for (var i = 0; i < computerGuessArray.length; i++) {
        letterObjectsArray.push(new letter(computerGuessArray[i]));
    }
    data = new word(letterObjectsArray);
    previousWord = data.getData();
    console.log(previousWord);
    checkUserInput();
}

//This function check if the user guessed the letter correctly or not and displays the 
//letter in the appropriate place.If the user guessed wrongly it displays the number of 
//remaining guesses.
function checkUserInput() {
    if (numberOfGuesses > 0) {
        inquirer.prompt([

            {
                type: "input",
                name: "userGuessedLetter",
                message: "Guess a letter!!!"
            }
        ]).then(function (response) {
            //console.log(response.guessedLetter);
            data.isLetterGuessed(response.userGuessedLetter.toLowerCase());
            var userGuessedWord = data.getData();
            console.log("\n" + userGuessedWord + "\n");
            checkNumGuesses(userGuessedWord);
            previousWord = userGuessedWord;
            checkUserInput();

        });
    }
    else {
        inquirer.prompt([

            {
                type: "confirm",
                name: "playAgain",
                message: "Do you want to Play again?",
                default: false

            }
        ]).then(function (response) {
            if (response.playAgain) {
                playGame();
            }


        });

    }

}

playGame();
//This function checks for the userGuessedword and displays information accordingly.Also keeps track
//of the number of guesses remaining.
function checkNumGuesses(userGuessedWord) {
    userGuessedWord = userGuessedWord.split(" ").join("");
    previousWord = previousWord.split(" ").join("");
    if (userGuessedWord === computerGuess) {
        console.log("YOU GUESSED CORRECTLY!!!\n");
        numberOfGuesses = -1;
    }
    else if (previousWord === userGuessedWord) {
        numberOfGuesses--;
        console.log("\x1b[31m%s\x1b[0m", "INCORRECT!!!");
        if (numberOfGuesses === 0)
            console.log("\nThe correct Word is " + computerGuess);
        else
            console.log("\n" + numberOfGuesses + " guesses remaining\n");

    }
    else if (previousWord !== userGuessedWord)
        console.log("\x1b[32m%s\x1b[0m", "CORRECT!!!\n");


}
