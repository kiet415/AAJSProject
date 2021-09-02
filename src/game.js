import RandomWord from "./words";

class Game {
    static soundEffect = true;
    constructor(difficulty) {
        this.lives = difficulty;
        this.randomWord = new RandomWord();
        this.word = this.randomWord.word.toUpperCase();
        this.firstHint = this.randomWord.hints[0];
        this.secondHint = this.randomWord.hints[1];
        this.category = this.randomWord.hints[2];
        this.setUpWord();
        this.setUpHints();
        this.setUpLives();
        this.setUpScoreBoard();
        this.setUpSounds();
        
    }
    
    setUpSounds() {
        const div = document.querySelector(".sound");
        const btn = document.createElement("button");
        btn.className = "sound-btn"
        btn.append("SOUND ON");
        btn.addEventListener("click", this.changeSound);
        div.append(btn);
    }
    changeSound() {
        const btn = document.querySelector(".sound-btn");
        if(Game.soundEffect) {
            btn.innerText = "SOUND OFF";
            Game.soundEffect = false;
        } else {
            btn.innerText = "SOUND ON";
            Game.soundEffect = true;
        }
    }
    setUpScoreBoard() {
        const scoreDiv = document.querySelector('.scoreboard');
        const values = Object.values(sessionStorage);
        let arr = [];
        for(let i = 0; i < values.length; i++) {
            if(values[i] !== "true") {
                arr.push(values[i]);
            }
        }
        let sorted = arr.sort().reverse();
        //console.log(arr, sorted)
        for(let i = 0; i < sorted.length; i++)  {
            const list = document.createElement('li');
            list.append(`${sorted[i].slice(1)}: ${sorted[i].slice(0,1)}`);
            scoreDiv.append(list);
        }

    }
    setUpLives() {
        const div = document.querySelector(".lives-text");
        const livesDiv = document.createElement('div');
        livesDiv.className = "lives";
        livesDiv.append(`You have ${this.lives} lives left`);
        div.append(livesDiv);
        const livesPicDiv = document.querySelector(".lives-pic-div");
        for(let i = 0; i < this.lives; i++) {
            const img = document.createElement("img");
            img.src = "photos/lives.png";
            livesPicDiv.append(img);
        }
        
    }
    setUpWord() {
        const wordUL = document.querySelector(".guess-word");
        const category = document.querySelector(".category");
        const categoryWord = document.createElement("div");
        categoryWord.append(`Category is "${this.category}"`)
        category.append(categoryWord);
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
                if(Game.soundEffect) {
                    const audio =   new Audio("sounds/correct.mp3");
                    audio.volume = 0.1;
                    audio.play();
                }
                for(let i = 0; i < this.word.length; i++) {
                    if(char === this.word[i]) pos.push(i);
                }
                //console.log(pos);
                const liList = document.querySelector(".guess-word").children;
                for(let i = 0; i < pos.length; i++) {
                    liList[pos[i]].innerText = char;
                }
                const button = document.querySelector(`#letter-${char.toLowerCase()}`);
                button.className = "used";
                if(this.isWin()) {
                    const keyboardDiv = document.querySelector(".keyboard-div");
                   // console.log("You win!");
                    const hint1 = document.querySelector("#hint-1");
                    const hint2 = document.querySelector("#hint-2");
                    if(hint1) hint1.remove();
                    if(hint2) hint2.remove();
                    const btn = document.querySelector(".sound-btn");
                    btn.remove();
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
                if(Game.soundEffect) {
                
                    const audio = new Audio("sounds/buzz.mp3");
                    audio.volume = 0.1;
                    audio.play();
                }
                
                const button = document.querySelector(`#letter-${char.toLowerCase()}`);
                button.className = "used";
                this.decrementLives();
            }
            
        }
        
    }
    win() {
        const name = prompt("Please enter your name");
        const len = sessionStorage.length;
        const val = `${this.lives}${name}`;
        sessionStorage.setItem(`name${len}`, val);
        const value = sessionStorage.getItem(`name${len}`)
        const scoreDiv = document.querySelector('.scoreboard');
        const list = document.createElement('div');
        list.className = "new-score";
        list.append(`New score - ${value.slice(1)}: ${value.slice(0,1)} lives`); 
        scoreDiv.append(list);
    }

    restart() {
        window.location.reload();
    }
    setUpHints() {
        const hintDiv = document.querySelector(".hint-div");
        const keyboard = document.querySelector(".keyboard-div");
        const firstHint = document.createElement("button");
        firstHint.append("Hint 1");
        firstHint.className = "hint";
        firstHint.id = "hint-1"
        const secondHint = document.createElement("button");
        secondHint.append("Hint 2");
        secondHint.className = "hint";
        secondHint.id = "hint-2"
        const secondHintInfo = document.createElement("div");
        secondHintInfo.append("Hint 2 takes away 1 life!")
        secondHintInfo.className="hint-info"
        hintDiv.append(firstHint);
        hintDiv.append(secondHint);
        keyboard.prepend(secondHintInfo);
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
            if(Game.soundEffect) {
                const audio =   new Audio("sounds/unlocked.mp3");
                audio.volume = 0.1;
                audio.play();
            }
            const div = document.createElement("div");
            div.append(`Hint 1: ${this.firstHint}`);
            div.className = "hints"
            hintDiv.append(div);
            const hint = document.querySelector("#hint-1");
            hint.remove();
        } else if(hint.innerText === 'Hint 2' && this.lives > 1) {
            if(Game.soundEffect) {
                const audio =   new Audio("sounds/unlocked.mp3");
                audio.volume = 0.1;
                audio.play();
            }
            const div = document.createElement("div");
            div.append(`Hint 2: ${this.secondHint}`);
            div.className = "hints"
            hintDiv.append(div);
            const hint = document.querySelector("#hint-2");
            hint.remove();
            this.decrementLives();
            const hintInfo = document.querySelector(".hint-info");
            hintInfo.remove();
        } else if(hint.innerText === 'Hint 2' && this.lives === 1) {
            alert("YOU CAN'T USE HINT 2 WITH 1 LIFE LEFT!")
        }
    }
    decrementLives() {
        this.lives--;
        const livesDiv = document.querySelector(".lives");
        livesDiv.innerText = `You have ${this.lives} lives left`;
        this.isGameOver();
        const livesPicList= document.querySelector(".lives-pic-div").children;
        livesPicList[0].remove();
        
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
            //console.log("Game Over");
            const hint1 = document.querySelector("#hint-1");
            const hint2 = document.querySelector("#hint-2");
            if(hint1) hint1.remove();
            if(hint2) hint2.remove();
            livesDiv.remove();
            const btn = document.querySelector(".sound-btn");
            btn.remove();
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