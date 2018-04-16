function Letter(letterChar){
    this.letterChar=letterChar;
    this.isLetterGuessed=false;
    this.underLyingChar=function(){
        if(isLetterGuessed)
            return this.letterChar;
        else
            return "_";    

    }
    this.letterCheck=function(guessedChar){
        if(guessedChar===this.letterChar)
            this.isLetterGuessed=true;
    }
}

module.exports=Letter;