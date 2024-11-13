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

export function getComputerInput(playerGameboard) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const coords =
        playerGameboard.available[
          Math.floor(Math.random() * playerGameboard.available.length)
        ];
      resolve(coords);
    }, 10);
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
