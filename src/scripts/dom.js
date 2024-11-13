export function generateBoard(player) {
  const board = document.getElementById(player.id);

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
