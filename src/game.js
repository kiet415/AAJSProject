import RandomWord from "./words";

class Game {
    constructor(difficulty) {
        this.lives = difficulty;
        this.randomWord = new RandomWord();
        this.word = this.randomWord.word.toUpperCase();
        this.firstHint = this.randomWord.hints[0];
        this.secondHint = this.randomWord.hints[1];
        this.setUpWord();
    }
    setUpWord() {
        const wordUL = document.querySelector(".guess-word");
        for(let i = 0; i < this.word.length; i++) {
            if(this.word[i] === ' ') {
                const letterLI = document.createElement('li');
                letterLI.append("-")
                wordUL.append(letterLI);
            } else {
                const letterLI = document.createElement('li');
                letterLI.className = "letterGuess";
                letterLI.append("_");
                wordUL.append(letterLI);
            }
            
        }
        this.clickHandler();
    }
    
    clickHandler() {
        document.addEventListener("click",this.handleClick);
    }
    handleClick = (e) => {
        const el = e.target;
        this.checkGuess(el);
    }
    checkGuess(letter) {
        let char = letter.innerText.toUpperCase();
        console.log(char);
        if(char.length === 1) {
            if(this.word.includes(char)) {
                let pos = [];
                
                for(let i = 0; i < this.word.length; i++) {
                    if(char === this.word[i]) pos.push(i);
                }
                console.log(pos);
                const liList = document.querySelector(".guess-word").children;
                for(let i = 0; i < pos.length; i++) {
                    liList[pos[i]].innerText = char;
                }
            } else {
                this.decrementLives();
            }
            console.log(lives);
        }
    }
    decrementLives() {
        this.lives--;
        this.isGameOver();
    }
    isGameOver() {
        if(this.lives === 0) {
            console.log("Game Over");
            //create h1 elements later
        }
    }

}

export default Game;