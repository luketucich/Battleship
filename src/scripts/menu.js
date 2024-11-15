import dockingSongLocation from "../assets/dockingSong.mp3";
import menuSongLocation from "../assets/menuSong.mp3";
export const dockingSong = new Audio(dockingSongLocation);
const menuSong = new Audio(menuSongLocation);

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

    // Initialize settings with defaults
    let musicEnabled = localStorage.getItem("musicEnabled");
    let sfxEnabled = localStorage.getItem("sfxEnabled");

    if (musicEnabled === null) {
      musicEnabled = true;
      localStorage.setItem("musicEnabled", musicEnabled);
    } else {
      musicEnabled = musicEnabled === "true";
    }

    if (sfxEnabled === null) {
      sfxEnabled = true;
      localStorage.setItem("sfxEnabled", sfxEnabled);
    } else {
      sfxEnabled = sfxEnabled === "true";
    }

    // Apply settings
    if (musicEnabled) {
      menuSong.volume = 0.5;
      menuSong.play().catch((err) => console.log("Error playing song:", err));
      menuSong.loop = true;
    }

    rotateSound.muted = !sfxEnabled;

    menuButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (sfxEnabled) {
          rotateSound.play();
        }
      });
    });

    settingsButton.addEventListener("click", () => {
      const settingsModal = document.getElementById("settings-modal");
      const closeButton = settingsModal.querySelector(".close-button");
      const musicCheckbox = document.getElementById("music-checkbox");
      const sfxCheckbox = document.getElementById("sfx-checkbox");

      musicCheckbox.checked = musicEnabled;
      sfxCheckbox.checked = sfxEnabled;

      settingsModal.style.display = "flex";

      closeButton.addEventListener("click", () => {
        if (sfxEnabled) {
          rotateSound.play();
        }
        settingsModal.style.display = "none";
      });
    });

    const saveSettingsButton = document.getElementById("save-settings-button");
    saveSettingsButton.addEventListener("click", () => {
      musicEnabled = document.getElementById("music-checkbox").checked;
      sfxEnabled = document.getElementById("sfx-checkbox").checked;

      localStorage.setItem("musicEnabled", musicEnabled);
      localStorage.setItem("sfxEnabled", sfxEnabled);

      const settingsModal = document.getElementById("settings-modal");
      settingsModal.style.display = "none";

      if (musicEnabled) {
        menuSong.volume = 0.5;
        menuSong.play().catch((err) => console.log("Error playing song:", err));
        menuSong.loop = true;
      } else {
        menuSong.pause();
      }

      rotateSound.muted = !sfxEnabled;
    });

    startButton.addEventListener("click", () => {
      transition();
      if (musicEnabled) {
        menuSong.pause();
        dockingSong.volume = 0.5;
        dockingSong
          .play()
          .catch((err) => console.log("Error playing song:", err));
        dockingSong.loop = true;
      }
      document.querySelector("#menu-buttons").style.display = "none";
      logo.style.display = "none";
      gameboard.style.display = "flex";
      deployButton.style.display = "block";
      headerText.style.display = "block";
      resolve();
    });
  });
}
