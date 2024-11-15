function generateCoords(lengths) {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  const orientation = Math.floor(Math.random() * 2);

  return [[row, col], lengths[0], orientation];
}

export function getComputerShips(computer) {
  const ships = [];
  const shipLengths = [5, 4, 3, 3, 2];

  while (ships.length < 5) {
    const [coords, length, orientation] = generateCoords(shipLengths);

    try {
      computer.gameboard.place(coords, length, orientation);
      ships.push([coords, length, orientation]);
      shipLengths.shift();
      console.log(computer.gameboard.ships);
    } catch (err) {
      console.error("Computer ship placement invalid, retrying.");
    }
  }
}
