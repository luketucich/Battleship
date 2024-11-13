import "../styles/styles.css";
import { updateBoard, generateBoard } from "./dom";
import Player from "./player";
import songLocation from "../assets/song.mp3";
import { getInput, getComputerInput, checkRepeat } from "./input";
import { getComputerShips } from "./computer";

const song = new Audio(songLocation);
const player = new Player("Player 1", "p1-board");
const computer = new Player("Computer", "p2-board");

player.gameboard.place([0, 0], 5, 0);
player.gameboard.place([6, 9], 4, 0);
player.gameboard.place([4, 4], 3, 1);
player.gameboard.place([7, 1], 3, 1);
player.gameboard.place([0, 8], 2, 0);

document.body.addEventListener("click", () => {
  song.volume = 0.5;
  song.play().catch((err) => console.log("Error playing song:", err));
  song.loop = true;
});

(async function gameLoop(player1, player2, turn = 0) {
  getComputerShips(player2);
  generateBoard(player1);
  generateBoard(player2);

  while (
    player.gameboard.isDefeated() === false &&
    computer.gameboard.isDefeated() === false
  ) {
    if (turn === 0) {
      let coords = await getInput();

      while (checkRepeat(coords, player2)) {
        coords = await getInput();
      }

      player2.gameboard.receiveAttack(coords);
      updateBoard(player2, coords);

      turn = 1;
    } else {
      const coords = await getComputerInput(player1.gameboard);

      player1.gameboard.receiveAttack(coords);
      updateBoard(player1, coords);

      turn = 0;
    }
  }
  console.log("Game Over");
})(player, computer);
