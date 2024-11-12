import "../styles/styles.css";

import updateBoard from "./dom";
import Player from "./player";

const player1 = new Player("Player 1", "p1-board");
const player2 = new Player("Computer", "p2-board");

player1.gameboard.place([0, 0], 5, 0);
updateBoard(player1);
updateBoard(player2);
