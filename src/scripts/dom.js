export default function updateBoard(player) {
  const board = document.getElementById(player.id);
  board.innerHTML = ""; // Clear the board before updating

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = `${i},${j}`;

      if (player.gameboard.board[i][j] !== null) {
        cell.classList.add("ship");
      }

      cell.setAttribute("coords", `${i},${j}`);
      board.appendChild(cell);
    }
  }
}
