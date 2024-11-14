import { playDockingSong } from "./music.js";
import { transition } from "./dom.js";
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
    const settingsButton = document.getElementById("settings-button");

    menuButtons.forEach((button) => {
      button.addEventListener("click", () => {
        rotateSound.play();
      });
    });

    settingsButton.addEventListener("click", () => {});

    startButton.addEventListener("click", () => {
      transition();
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
