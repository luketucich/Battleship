import { clearShipCells, updateShipCells, transition } from "./dom.js";
import placeSoundLocation from "../assets/place.wav";
import errorSoundLocation from "../assets/error.wav";
import rotateSoundLocation from "../assets/rotate.wav";
import trashSoundLocation from "../assets/trash.wav";
import deploySoundLocation from "../assets/deploy.wav";

const rotateSound = new Audio(rotateSoundLocation);
const placeSound = new Audio(placeSoundLocation);
const errorSound = new Audio(errorSoundLocation);
const trashSound = new Audio(trashSoundLocation);
const deploySound = new Audio(deploySoundLocation);

export function playSound(sound) {
  if (localStorage.getItem("sfxEnabled") === "true") {
    sound.play();
  }
}

export function playSong(song) {
  if (localStorage.getItem("musicEnabled") === "true") {
    song.volume = 0.5;
    song.play().catch((err) => console.log("Error playing song:", err));
    song.loop = true;
  }
}

function handleDragStart(event) {
  event.target.classList.add("dragging");
}

function handleDragEnd(event) {
  event.target.classList.remove("dragging");
}

function handleDragOver(event) {
  const shipsContainer = document.getElementById("ship-placement");

  if (!shipsContainer.classList.contains("vertical.container")) {
    event.preventDefault();
    const cell = event.target;
    const [row, col] = cell.getAttribute("coords").split(",").map(Number);
    const ship = document.querySelector(".dragging");
    const shipLength = ship.children.length;

    cell.classList.add("highlight");
    for (let i = 0; i < shipLength; i++) {
      const highlightRow = row - shipLength + 1 >= 0 ? row - i : row + i;
      document
        .querySelector(`[coords="${highlightRow},${col}"]`)
        .classList.add("highlight");
    }
  } else {
    event.preventDefault();
    const cell = event.target;
    const [row, col] = cell.getAttribute("coords").split(",").map(Number);
    const ship = document.querySelector(".dragging");
    const shipLength = ship.children.length;

    cell.classList.add("highlight");
    for (let i = 0; i < shipLength; i++) {
      const highlightCol = col - shipLength + 1 >= 0 ? col - i : col + i;
      document
        .querySelector(`[coords="${row},${highlightCol}"]`)
        .classList.add("highlight");
    }
  }
}

function handleDragLeave(event) {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("highlight");
  });
}

function handleDrop(event, player) {
  const shipsContainer = document.getElementById("ship-placement");

  if (!shipsContainer.classList.contains("vertical.container")) {
    event.preventDefault();
    try {
      const shipPlacement = document.querySelectorAll(".highlight");
      const smallestCell = Array.from(shipPlacement).reduce(
        (smallest, cell) => {
          const [row] = cell.getAttribute("coords").split(",").map(Number);
          const [smallestRow] = smallest
            .getAttribute("coords")
            .split(",")
            .map(Number);
          return row < smallestRow ? cell : smallest;
        },
        shipPlacement[0]
      );

      const [row, col] = smallestCell
        .getAttribute("coords")
        .split(",")
        .map(Number);

      // Check for collisions on each cell
      shipPlacement.forEach((cell) => {
        const coords = cell.getAttribute("coords").split(",").map(Number);
        player.gameboard.checkCollision(coords[0], coords[1]);
      });

      player.gameboard.place([row, col], shipPlacement.length, 0);

      shipPlacement.forEach((cell) => {
        cell.classList.remove("highlight");
        const coords = cell.getAttribute("coords").split(",").map(Number);
        updateShipCells(player, coords);
      });
      playSound(placeSound);

      const draggingShip = document.querySelector(".dragging");
      draggingShip.classList.add("placed");
      draggingShip.draggable = false;
    } catch (error) {
      playSound(errorSound);
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.classList.remove("highlight");
      });
      console.error("Error during drop event:", error);
    }
  } else {
    event.preventDefault();
    try {
      const shipPlacement = document.querySelectorAll(".highlight");
      const smallestCell = Array.from(shipPlacement).reduce(
        (smallest, cell) => {
          const [row] = cell.getAttribute("coords").split(",").map(Number);
          const [smallestRow] = smallest
            .getAttribute("coords")
            .split(",")
            .map(Number);
          return row < smallestRow ? cell : smallest;
        },
        shipPlacement[0]
      );

      const [row, col] = smallestCell
        .getAttribute("coords")
        .split(",")
        .map(Number);

      // Check for collisions on each cell
      shipPlacement.forEach((cell) => {
        const coords = cell.getAttribute("coords").split(",").map(Number);
        player.gameboard.checkCollision(coords[0], coords[1]);
      });

      player.gameboard.place([row, col], shipPlacement.length, 1);

      shipPlacement.forEach((cell) => {
        cell.classList.remove("highlight");
        const coords = cell.getAttribute("coords").split(",").map(Number);
        updateShipCells(player, coords);
      });
      playSound(placeSound);

      const draggingShip = document.querySelector(".dragging");
      draggingShip.classList.add("placed");
      draggingShip.draggable = false;
    } catch (error) {
      playSound(errorSound);
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.classList.remove("highlight");
      });
      console.error("Error during drop event:", error);
    }
  }
}

export default function dragDrop(player) {
  return new Promise((resolve) => {
    const draggables = document.querySelectorAll(".ship-draggable");
    const cells = document.querySelectorAll(".cell");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", handleDragStart);
      draggable.addEventListener("dragend", handleDragEnd);
    });

    cells.forEach((cell) => {
      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("dragleave", handleDragLeave);
      cell.addEventListener("drop", (event) => handleDrop(event, player));
    });

    (function rotateButton() {
      const rotateButton = document.getElementById("rotate-button");
      const shipsContainer = document.getElementById("ship-placement");
      const ships = document.querySelectorAll(".ship-draggable");

      rotateButton.addEventListener("click", () => {
        playSound(rotateSound);
        if (shipsContainer.classList.contains("vertical.container")) {
          shipsContainer.classList.remove("vertical.container");
          ships.forEach((ship) => {
            ship.style.flexDirection = "row";
          });
        } else {
          shipsContainer.classList.add("vertical.container");
          shipsContainer.style.flexDirection = "row";
          shipsContainer.style.flexWrap = "wrap";
          ships.forEach((ship) => {
            ship.style.flexDirection = "column";
          });
        }
      });
    })();

    (function trashButton() {
      const trashButton = document.getElementById("trash-button");

      trashButton.addEventListener("click", () => {
        playSound(trashSound);
        player.gameboard.ships = [];
        player.gameboard.board = Array.from({ length: 10 }, () =>
          Array(10).fill(null)
        );

        clearShipCells(player);

        const draggables = document.querySelectorAll(".ship-draggable");

        draggables.forEach((draggable) => {
          draggable.classList.remove("placed");
          draggable.draggable = true;
        });
      });
    })();

    (function deployButton() {
      const deployButton = document.getElementById("deploy-button");

      deployButton.addEventListener("click", () => {
        if (player.gameboard.ships.length < 5) {
          playSound(errorSound);
        } else {
          transition();
          playSound(deploySound);
          resolve();
        }
      });
    })();
  });
}
