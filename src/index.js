import Game from "./game";
let game;

function createGame(difficulty) {
  game = new Game(difficulty);
  console.log(game)
}
document.addEventListener("DOMContentLoaded", () => {
    // Your code here
    console.log('DOM fully loaded and parsed');
    //let container = document.querySelector(".whole-page");
    
    function createGame(difficulty) {
      game = new Game(difficulty);
      console.log(game)
    }
    
  });
  