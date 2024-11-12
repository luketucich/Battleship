import "../styles/styles.css";

import updateBoard from "./dom";
import Player from "./player";

const player1 = new Player("Player 1", "p1-board");
const player2 = new Player("Computer", "p2-board");

player1.gameboard.place([0, 0], 5, 0);
player1.gameboard.place([6, 9], 4, 0);
player1.gameboard.place([4, 4], 3, 1);
player1.gameboard.place([7, 1], 3, 1);
player1.gameboard.place([0, 8], 2, 0);

player2.gameboard.place([0, 0], 5, 0);
player2.gameboard.place([6, 9], 4, 0);
player2.gameboard.place([4, 4], 3, 1);
player2.gameboard.place([7, 1], 3, 1);
player2.gameboard.place([0, 8], 2, 0);

player1.gameboard.receiveAttack([0, 1]);
player1.gameboard.receiveAttack([0, 0]);
player1.gameboard.receiveAttack([3, 2]);
player1.gameboard.receiveAttack([3, 3]);

player2.gameboard.receiveAttack([0, 0]);
player2.gameboard.receiveAttack([3, 3]);
updateBoard(player1);
updateBoard(player2);
