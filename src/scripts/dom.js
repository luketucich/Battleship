export default function updateBoard(player) {
  const board = document.getElementById(player.id);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("coords", `${i},${j}`);
      board.appendChild(cell);
    }
  }
}
