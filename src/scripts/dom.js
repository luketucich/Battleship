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
      }, index * 200);
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

export function winScreen() {
  const gameboard = document.getElementById("gameboards");
  const title = document.getElementById("title");
  const gameOverScreen = document.getElementById("game-over-screen");
  const gameWinMessage = document.getElementById("game-win-message");
  gameOverScreen.style.display = "flex";
  gameWinMessage.style.display = "block";
  gameboard.style.display = "none";
  title.style.display = "none";
}

export function loseScreen() {
  const gameboard = document.getElementById("gameboards");
  const title = document.getElementById("title");
  const gameOverScreen = document.getElementById("game-over-screen");
  const gameLoseMessage = document.getElementById("game-lose-message");
  const backToMenuButton = document.getElementById("back-to-menu-button");

  gameOverScreen.style.display = "flex";
  gameLoseMessage.style.display = "block";
  gameboard.style.display = "none";
  title.style.display = "none";

  document.body.style.flexDirection = "column";
  document.body.style.backgroundColor = "var(--background-color-lose)";
  document.body.style.color = "var(--text-color)";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.style.height = "100vh";
  document.body.style.width = "100vw";
  document.body.style.position = "relative";
  document.body.style.filter = "contrast(1.1) brightness(1.2) blur(0.6px)";
  document.body.style.animation = "fadeIn 1s ease-out";
  document.body.style.boxSizing = "border-box";

  const beforeStyle = document.createElement("style");
  beforeStyle.innerHTML = `
    body::before {
      content: "";
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        var(--scanline-color-lose) 0%,
        var(--scanline-color-lose) 0.064rem,
        transparent 0.0625rem,
        transparent 0.3rem
      ),
      radial-gradient(circle, transparent, transparent 70%, rgba(0, 0, 0, 0.5));
      animation: scanlines 0.5s infinite;
      pointer-events: none;
      z-index: 9998;
    }
    #back-to-menu-button:hover {
      background-color: var(--cell-highlight-color-lose);
    }
    #back-to-menu-button {
      background-color: var(--board-bg-color-lose);
      color: var(--cell-hit-color);
      border: 0.25rem solid var(--board-border-color-lose);
    }
  `;
  document.head.appendChild(beforeStyle);
}
