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
      let move;

      // If there's a last hit and the ship is not yet sunk, prioritize adjacent cells
      if (
        playerGameboard.lastHitShip &&
        !playerGameboard.lastHitShip.isSunk()
      ) {
        move = selectAdjacentCell(playerGameboard);
      }

      // If no adjacent cells or no last hit, pick a random cell from available
      if (!move) {
        move =
          playerGameboard.available[
            Math.floor(Math.random() * playerGameboard.available.length)
          ];
      }

      // Check if the selected move hits a ship
      const { ship, hit } = checkIfHit(move, playerGameboard.ships);
      if (hit) {
        playerGameboard.lastHitShip = ship;
      }

      resolve(move);
    }, 500);
  });
}

export function selectAdjacentCell(playerGameboard) {
  const available = playerGameboard.available;
  const shipCoords = playerGameboard.lastHitShip.coords.map((coord) => {
    return [coord[0], coord[1]];
  });

  const validTargets = available.filter((coord) =>
    shipCoords.some(
      (shipCoord) => shipCoord[0] === coord[0] && shipCoord[1] === coord[1]
    )
  );

  // Decide randomly to select a cell adjacent to the ship (80%) or any cell (20%)
  if (Math.random() < 0.8) {
    return validTargets[Math.floor(Math.random() * validTargets.length)];
  } else {
    return available[Math.floor(Math.random() * available.length)];
  }
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
    return true;
  } else {
    return false;
  }
}

export function checkIfHit(move, ships) {
  const hitShip = ships.find((ship) =>
    ship.coords.some((coord) => coord[0] === move[0] && coord[1] === move[1])
  );

  if (hitShip) {
    return { ship: hitShip, hit: true };
  }

  return { ship: null, hit: false };
}
