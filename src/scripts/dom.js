export default function updateBoard(player) {
  const board = document.getElementById(player.id);
  board.innerHTML = ""; // Clear the board before updating

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = `${i},${j}`;

      if (
        typeof player.gameboard.board[i][j] === "object" &&
        player.gameboard.board[i][j] !== null &&
        player.name !== "Computer"
      ) {
        cell.classList.add("ship");
      } else if (
        player.gameboard.misses.some((miss) => miss[0] === i && miss[1] === j)
      ) {
        cell.classList.add("miss");
      } else if (
        player.gameboard.hits.some((hit) => hit[0] === i && hit[1] === j)
      ) {
        cell.classList.add("hit");
      }

      cell.setAttribute("coords", `${i},${j}`);
      board.appendChild(cell);
    }
  }
}
