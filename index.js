/* ndex.js: The file containing the logic for the course of the game, which depends on Word.js and:
Randomly selects a word and uses the Word constructor to store it
Prompts the user for each guess and keeps track of the user's remaining guesses
etter.js should not require any other files.
Word.js should only require Letter.js */
var word = require("./Word");
var letter = require("./Letter");
var inquirer = require("inquirer");
var wordChoices = ["elephant", "lion", "tiger", "giraffe", "crocodile", "gorilla", "hippopotamus", "kangaroo"];
var computerGuess = wordChoices[Math.floor(Math.random() * wordChoices.length)];
console.log(computerGuess);
var numberOfGuesses = 10;
inquirer.prompt([

    {
      type: "input",
      name: "guessedLetter",
      message: "Guess a letter!!!"
    }
]).then(function(response){
    console.log(response.guessedLetter);

});


