import Game from "./game";

let game;


document.addEventListener("DOMContentLoaded", () => {
    // Your code here
    //console.log('DOM fully loaded and parsed');
    //let container = document.querySelector(".whole-page");
    const difficulty = document.querySelector(".difficulty-div")
    difficulty.addEventListener("click", getDifficulty);

    function getDifficulty(e) {
      const el = e.target.innerText;
      //console.log(el)
      let difficulty;
      if(el === "EASY - 10") {
        difficulty = 10;
      } else if (el === "MED - 7") {
        difficulty = 7;
      } else if(el === "HARD - 5") {
        difficulty = 5;
      }
      if(Number.isInteger(difficulty)) {
        const start = document.querySelector('.start-page');
        const game = document.querySelector('.whole-page');
        start.style.display = "none";
        game.style.display = "flex";
        game.style.flexDirection = "column";
        game.style.alignItems = "center";
        game = new Game(difficulty);
       //console.log(game);
      }
      
    }
    
});


