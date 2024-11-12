import "../styles/styles.css";

import updateBoard from "./dom";
import Player from "./player";
import Gameboard from "./gameboard";

const player1 = new Player("Player 1", "p1-board");
const player2 = new Player("Computer", "p2-board");

updateBoard(player1);
updateBoard(player2);
