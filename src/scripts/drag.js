import { updateShipCells } from "./dom.js";
import placeSoundLocation from "../assets/place.wav";
const placeSound = new Audio(placeSoundLocation);

export default function dragDrop(player) {
  const draggables = document.querySelectorAll(".ship-draggable");
  const cells = document.querySelectorAll(".cell");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  cells.forEach((cell) => {
    cell.addEventListener("dragover", (event) => {
      event.preventDefault();
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
    });

    cell.addEventListener("dragleave", () => {
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.classList.remove("highlight");
      });
    });

    cell.addEventListener("drop", (event) => {
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
        player.gameboard.place([row, col], shipPlacement.length, 0);

        shipPlacement.forEach((cell) => {
          const coords = cell.getAttribute("coords").split(",").map(Number);
          updateShipCells(player, coords);
        });
        placeSound.play();

        const draggingShip = document.querySelector(".dragging");
        draggingShip.classList.add("placed");
        draggingShip.draggable = false;
      } catch (error) {
        document.querySelectorAll(".cell").forEach((cell) => {
          cell.classList.remove("highlight");
        });
        console.error("Error during drop event:", error);
      }
    });
  });
}
