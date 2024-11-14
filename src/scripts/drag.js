export default function dragDrop() {
  const draggables = document.querySelectorAll(".ship");
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
    cell.addEventListener("dragover", () => {
      const coords = cell.getAttribute("coords"),
        row = parseInt(coords[0]),
        col = parseInt(coords[2]),
        ship = document.querySelector(".dragging"),
        shipLength = ship.children.length;

      if (row - shipLength + 1 >= 0) {
        cell.classList.add("highlight");
        const minRowCoord = row - shipLength + 1;

        for (let i = row; i >= minRowCoord; i--) {
          const nextCell = document.querySelector(`[coords="${i},${col}"]`);
          nextCell.classList.add("highlight");
        }
      } else if (row - shipLength + 1 < 0) {
        cell.classList.add("highlight");
        const maxRowCoord = row + shipLength - 1;

        for (let i = row; i <= maxRowCoord; i++) {
          const nextCell = document.querySelector(`[coords="${i},${col}"]`);
          nextCell.classList.add("highlight");
        }
      }
    });

    cell.addEventListener("dragleave", () => {
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.classList.remove("highlight");
      });
    });
  });
}
