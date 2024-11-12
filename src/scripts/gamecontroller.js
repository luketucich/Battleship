import "../styles/styles.css";
import updateBoard from "./dom";
import Player from "./player";

const player = new Player("Player 1", "p1-board");
const computer = new Player("Computer", "p2-board");

player.gameboard.place([0, 0], 5, 0);
player.gameboard.place([6, 9], 4, 0);
player.gameboard.place([4, 4], 3, 1);
player.gameboard.place([7, 1], 3, 1);
player.gameboard.place([0, 8], 2, 0);

computer.gameboard.place([0, 0], 5, 0);
computer.gameboard.place([6, 9], 4, 0);
computer.gameboard.place([4, 4], 3, 1);
computer.gameboard.place([7, 1], 3, 1);
computer.gameboard.place([0, 8], 2, 0);

updateBoard(player);
updateBoard(computer);

function getInput() {
  return new Promise((resolve) => {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", function handleClick() {
        const coords = cell
          .getAttribute("coords")
          .split(",")
          .map((coord) => parseInt(coord, 10));

        resolve(coords);
      });
    });
  });
}

function getComputerInput() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      resolve([row, col]);
    }, 1000);
  });
}

function checkRepeat(coords, player) {
  if (
    player.gameboard.hits.some(
      (ele) => ele[0] === coords[0] && ele[1] === coords[1]
    ) ||
    player.gameboard.misses.some(
      (ele) => ele[0] === coords[0] && ele[1] === coords[1]
    )
  ) {
    console.log("Already attacked this square");
    return true;
  } else {
    console.log("Good to go!");
    return false;
  }
}

(async function gameLoop(player1, player2, turn = 0) {
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
      updateBoard(player2);

      turn = 1;
    } else {
      let coords = await getComputerInput();

      while (checkRepeat(coords, player1)) {
        coords = await getComputerInput();
      }

      player1.gameboard.receiveAttack(coords);
      updateBoard(player1);

      turn = 0;
    }
  }
})(player, computer);

console.log("FINISHED!");
