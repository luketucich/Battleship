import "../styles/styles.css";

import updateBoard from "./dom";
import Player from "./player";
import Gameboard from "./gameboard";

const player1 = new Player("Player 1");

updateBoard(player1);
