export function getInput() {
  return new Promise((resolve) => {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", function handleClick() {
        const coords = cell
          .getAttribute("coords")
          .split(",")
          .map((coord) => parseInt(coord, 10));

        resolve(coords);
      });
    });
  });
}

export function getComputerInput() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      resolve([row, col]);
    }, 1000);
  });
}

export function checkRepeat(coords, player) {
  if (
    player.gameboard.hits.some(
      (ele) => ele[0] === coords[0] && ele[1] === coords[1]
    ) ||
    player.gameboard.misses.some(
      (ele) => ele[0] === coords[0] && ele[1] === coords[1]
    )
  ) {
    console.log("Already attacked this square");
    return true;
  } else {
    console.log("Good to go!");
    return false;
  }
}
