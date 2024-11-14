import { playDockingSong } from "./music.js";
import rotateSoundLocation from "../assets/rotate.wav";
const rotateSound = new Audio(rotateSoundLocation);

export function titleScreen() {
  return new Promise((resolve) => {
    const menuButtons = document.querySelectorAll("#menu-buttons button");
    const logo = document.getElementById("menu-ascii");
    const startButton = document.getElementById("start-game-button");
    const gameboard = document.getElementById("gameboards");
    const deployButton = document.getElementById("deploy-button");
    const headerText = document.getElementById("title");

    menuButtons.forEach((button) => {
      button.addEventListener("click", () => {
        rotateSound.play();
      });
    });

    startButton.addEventListener("click", () => {
      playDockingSong();
      document.querySelector("#menu-buttons").style.display = "none";
      logo.style.display = "none";
      gameboard.style.display = "flex";
      deployButton.style.display = "block";
      headerText.style.display = "block";
      resolve();
    });
  });
}
