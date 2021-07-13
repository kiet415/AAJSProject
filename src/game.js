import RandomWord from "./words";

class Game {
    constructor() {
        this.lives = 10;
        this.randomWord = new RandomWord();
        this.word = this.randomWord.word.toUpperCase();
        this.firstHint = this.randomWord.hints[0];
        this.secondHint = this.randomWord.hints[1];
        this.setUpWord();
        this.setUpHints();
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
        //console.log(char);
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
            console.log(this.lives);
        }
        //removeEventListener("click",letter)
    }
    setUpHints() {
        const hintDiv = document.querySelector(".hint-div");
        const firstHint = document.createElement("button");
        firstHint.append("Hint 1");
        firstHint.className = "hint";
        const secondHint = document.createElement("button");
        secondHint.append("Hint 2");
        secondHint.className = "hint";
        hintDiv.append(firstHint);
        hintDiv.append(secondHint);
        this.hintClickHandler();
    }
    hintClickHandler() {
        document.addEventListener("click",this.handleHintClick);
    }
    handleHintClick = (e) => {
        const el = e.target;
        this.displayHint(el);
    }
    displayHint(hint) {
        const hintDiv = document.querySelector(".display-hint");
        //console.log(hint.innerText)
        if(hint.innerText === 'Hint 1') {
            const div = document.createElement("div");
            div.append(this.firstHint);
            hintDiv.append(div);
            removeEventListener("click",hint)
        } else if(hint.innerText === 'Hint 2') {
            const div = document.createElement("div");
            div.append(this.secondHint);
            hintDiv.append(div);
            removeEventListener("click",hint)
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