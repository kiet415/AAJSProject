import RandomWord from "./words";

class Game {
    constructor(difficulty) {
        this.lives = difficulty;
        this.randomWord = new RandomWord();
        this.word = this.randomWord.word.toUpperCase();
        this.firstHint = this.randomWord.hints[0];
        this.secondHint = this.randomWord.hints[1];
        this.setUpWord();
        this.setUpHints();
        this.setUpLives();
        this.setUpScoreBoard();
    }
    setUpScoreBoard() {
        const scoreDiv = document.querySelector('.scoreboard');
        const values = Object.values(sessionStorage);
        for(let i = 0; i < values.length; i++) {
            if(values[i] !== "true") {
                const list = document.createElement('li');
                list.append(`${values[i].slice(0,values[i].length-1)}: ${values[i].slice(values[i].length-1)} lives`);
                scoreDiv.append(list);
            }
        }
    }
    setUpLives() {
        const div = document.querySelector(".display-lives");
        const livesDiv = document.createElement('div');
        livesDiv.className = "lives";
        livesDiv.append(`You have ${this.lives} lives left`);
        div.append(livesDiv);
    }
    setUpWord() {
        const wordUL = document.querySelector(".guess-word");
        for(let i = 0; i < this.word.length; i++) {
            if(this.word[i] === ' ') {
                const letterLI = document.createElement('div');
                letterLI.innerHTML = ("&nbsp;&nbsp;")
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
                const button = document.querySelector(`#letter-${char.toLowerCase()}`);
                button.remove();
                if(this.isWin()) {
                    const keyboardDiv = document.querySelector(".keyboard-div");
                    console.log("You win!");
                    const hint1 = document.querySelector("#hint-1");
                    const hint2 = document.querySelector("#hint-2");
                    if(hint1) hint1.remove();
                    if(hint2) hint2.remove();
                    const keyboardDiv1 = document.querySelector(".game");
                    keyboardDiv.className = "winner"
                    keyboardDiv.innerText = "You win!";
                    const reloadBtn = document.createElement("button");
                    reloadBtn.append("Play again?")
                    reloadBtn.className = "reload";
                    reloadBtn.addEventListener("click", this.restart);
                    keyboardDiv1.append(reloadBtn);
                    this.win();
                }
            } else {
                const button = document.querySelector(`#letter-${char.toLowerCase()}`);
                button.remove();
                this.decrementLives();
            }
            
        }
        
    }
    win() {
        const name = prompt("Please enter your name");
        const len = sessionStorage.length;
        const val = name + this.lives;
        sessionStorage.setItem(`name${len}`, val);
        const value = sessionStorage.getItem(`name${len}`)
        const scoreDiv = document.querySelector('.scoreboard');
        const list = document.createElement('li');
        list.append(`${value.slice(0,value.length-1)}: ${value.slice(value.length-1)} lives`); 
        scoreDiv.append(list);
    }

    restart() {
        window.location.reload();
    }
    setUpHints() {
        const hintDiv = document.querySelector(".hint-div");
        const firstHint = document.createElement("button");
        firstHint.append("Hint 1");
        firstHint.className = "hint";
        firstHint.id = "hint-1"
        const secondHint = document.createElement("button");
        secondHint.append("Hint 2");
        secondHint.className = "hint";
        secondHint.id = "hint-2"
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
            div.append(`Hint 1: ${this.firstHint}`);
            hintDiv.append(div);
            const hint = document.querySelector("#hint-1");
            hint.remove();
        } else if(hint.innerText === 'Hint 2' && this.lives > 1) {
            const div = document.createElement("div");
            div.append(`Hint 2: ${this.secondHint}`);
            hintDiv.append(div);
            const hint = document.querySelector("#hint-2");
            hint.remove();
            this.decrementLives();
        } else if(hint.innerText === 'Hint 2' && this.lives === 1) {
            alert("YOU CAN'T USE HINT 2 WITH 1 LIFE LEFT!")
        }
    }
    decrementLives() {
        this.lives--;
        const livesDiv = document.querySelector(".lives");
        livesDiv.innerText = `You have ${this.lives} lives left`;
        this.isGameOver();
    }
    isWin() {
        const liList = document.querySelector(".guess-word").children;
        for(let i = 0; i < liList.length; i++) {
            if(liList[i].innerText === "_") return false;
        }
        return true;
    }
    isGameOver() {
        if(this.lives === 0) {
            const livesDiv = document.querySelector(".lives");
            const keyboardDiv = document.querySelector(".keyboard-div");
            console.log("Game Over");
            const hint1 = document.querySelector("#hint-1");
            const hint2 = document.querySelector("#hint-2");
            if(hint1) hint1.remove();
            if(hint2) hint2.remove();
            livesDiv.remove();
            keyboardDiv.className = "game-over"
            keyboardDiv.innerText = "GAME OVER!";
            const keyboardDiv1 = document.querySelector(".game");
            const reloadBtn = document.createElement("button");
            reloadBtn.append("Play again?")
            reloadBtn.className = "reload";
            reloadBtn.addEventListener("click", this.restart);
            keyboardDiv1.append(reloadBtn);
        }
    }

}

export default Game;