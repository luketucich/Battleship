import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
    this.misses = [];
    this.hits = [];
  }

  validateCoordinates(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error("Coordinates out of bounds!");
    }
  }

  checkBoundary(row, col, length, orientation) {
    if (
      (orientation === 0 && row + length > 9) || // Vertical boundary check
      (orientation === 1 && col + length > 9) // Horizontal boundary check
    ) {
      throw new Error("Ship would exceed board!");
    }
  }

  checkCollision(row, col, length, orientation) {
    for (let i = 0; i < length; i++) {
      const x = orientation === 0 ? row + i : row;
      const y = orientation === 1 ? col + i : col;

      if (this.board[x][y] !== null) {
        throw new Error("Cells already occupied!");
      }
    }
  }

  place(coords, length, orientation) {
    const [row, col] = coords;

    this.validateCoordinates(row, col);
    this.checkBoundary(row, col, length, orientation);
    this.checkCollision(row, col, length, orientation);

    const ship = new Ship(length);

    for (let i = 0; i < length; i++) {
      const x = orientation === 0 ? row + i : row;
      const y = orientation === 1 ? col + i : col;
      this.board[x][y] = ship;
    }

    this.ships.push(ship);
  }

  receiveAttack(coords) {
    const [row, col] = coords;
    this.validateCoordinates(row, col);

    let cell = this.board[row][col];

    if (cell === null) {
      this.board[row][col] = "MISS";
      this.misses.push(coords);
    } else if (cell === "HIT" || cell === "MISS") {
      throw new Error("Cannot interact with cell twice!");
    } else {
      cell.hit();
      this.board[row][col] = "HIT";
      this.hits.push(coords);
    }
  }

  isDefeated() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
