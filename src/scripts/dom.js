import staticLocation from "../assets/static.gif";
import staticSoundLocation from "../assets/static.mp3";
const staticSound = new Audio(staticSoundLocation);

export function updateTitle() {
  const title = document.getElementById("title");
  title.textContent = "Control Center";
}

export function generateBoard(player) {
  const boardContainer = document.getElementById(player.id + "-container");
  boardContainer.style.display = "flex";

  const board = document.getElementById(player.id);
  board.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const currentCell = player.gameboard.board[i][j];
      if (
        currentCell &&
        typeof currentCell === "object" &&
        currentCell !== null &&
        player.name !== "Computer"
      ) {
        cell.classList.add("ship");
      }
      cell.setAttribute("coords", `${i},${j}`);
      board.appendChild(cell);
    }
  }
}

export function updateBoard(player, coords) {
  const board = document.getElementById(player.id);
  const [row, col] = coords;
  const cellDiv = board.querySelector(`[coords="${row},${col}"]`);
  const currentCell = player.gameboard.board[row][col];

  if (
    currentCell &&
    typeof currentCell === "object" &&
    currentCell !== null &&
    currentCell.isSunk()
  ) {
    cellDiv.classList.add("hit");
    const shipCoords = currentCell.coords;
    shipCoords.reverse().forEach((coord, index) => {
      setTimeout(() => {
        const [x, y] = coord;
        const cellDiv = board.querySelector(`[coords="${x},${y}"]`);
        cellDiv.classList.add("sunk");
      }, index * 250);
    });
  } else if (
    player.gameboard.misses.some((miss) => miss[0] === row && miss[1] === col)
  ) {
    cellDiv.classList.add("miss");
  } else if (
    player.gameboard.hits.some((hit) => hit[0] === row && hit[1] === col)
  ) {
    cellDiv.classList.remove("ship");
    cellDiv.classList.add("hit");
  }
}
export function updateShipCells(player, coord) {
  const board = document.getElementById(player.id);
  const [row, col] = coord;
  const cellDiv = board.querySelector(`[coords="${row},${col}"]`);
  cellDiv.classList.add("ship");
}

export function clearShipCells(player) {
  const board = document.getElementById(player.id);
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("ship");
  });
}

export function changeToControlCenter() {
  updateTitle();

  const dockingStation = document.getElementById("fleet-dock");
  const deployButton = document.getElementById("deploy-button");
  dockingStation.style.display = "none";
  deployButton.style.display = "none";
}

export function transition() {
  if (localStorage.getItem("sfxEnabled") === "true") {
    staticSound.volume = 0.2;
    staticSound.play();
    setTimeout(() => {
      staticSound.pause();
      staticSound.currentTime = 0;
    }, 550);
  }

  const staticGif = document.createElement("img");
  staticGif.src = staticLocation;
  staticGif.style.position = "fixed";
  staticGif.style.top = "0";
  staticGif.style.left = "0";
  staticGif.style.width = "100%";
  staticGif.style.height = "100%";
  staticGif.style.zIndex = "9998";
  staticGif.style.opacity = "0.2";
  staticGif.style.pointerEvents = "none";
  staticGif.style.transition = "opacity 0.1s ease-in-out";
  document.body.appendChild(staticGif);

  setTimeout(() => {
    staticGif.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(staticGif);
    }, 300);
  }, 300);
}
