document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
});

import { dockingSong } from "./menu.js";
import rotateSoundLocation from "../assets/rotate.wav";
const rotateSound = new Audio(rotateSoundLocation);

import winSongLocation from "../assets/winSong.mp3";
const winSong = new Audio(winSongLocation);

import loseSongLocation from "../assets/loseSong.mp3";
const loseSong = new Audio(loseSongLocation);

import battleSongLocation from "../assets/battleSong.mp3";
const battleSong = new Audio(battleSongLocation);

import "../styles/styles.css";
import { titleScreen } from "./menu.js";
import {
  transition,
  updateBoard,
  generateBoard,
  changeToControlCenter,
  winScreen,
  loseScreen,
} from "./dom";
import Player from "./player";
import { getInput, getComputerInput, checkRepeat } from "./input";
import { getComputerShips } from "./placement.js";
import dragDrop from "./drag.js";
import { playSound, playSong } from "./drag.js";
import feather from "feather-icons";

const player = new Player("Player 1", "p1-board");
const computer = new Player("Computer", "p2-board");

await titleScreen();
generateBoard(player);
await dragDrop(player);
changeToControlCenter();

(async function gameLoop(player1, player2, turn = 0) {
  dockingSong.pause();
  document.getElementById("p1-board-container").style.pointerEvents = "none";

  playSong(battleSong);
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
  if (player1.gameboard.isDefeated()) {
    battleSong.pause();
    transition();
    playSong(loseSong);
    loseScreen();
    const mainMenuButton = document.getElementById("back-to-menu-button");
    mainMenuButton.addEventListener("click", () => {
      playSound(rotateSound);
      location.reload();
    });
  } else {
    battleSong.pause();
    transition();
    playSong(winSong);
    winScreen();
    const mainMenuButton = document.getElementById("back-to-menu-button");
    mainMenuButton.addEventListener("click", () => {
      playSound(rotateSound);
      location.reload();
    });
  }
})(player, computer);
