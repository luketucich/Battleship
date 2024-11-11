import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.board = this.board = Array.from({ length: 10 }, () =>
      Array(10).fill(null)
    );
  }

  place(coords, length, orientation) {
    const [row, col] = coords;

    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error("Coordinates out of bounds!");
    }

    if (
      (orientation === 0 && row + length > 9) || // Vertical boundary check
      (orientation === 1 && col + length > 9) // Horizontal boundary check
    ) {
      throw new Error("Ship would exceed board!");
    }

    const ship = new Ship(length);

    // Place ship based on orientation
    for (let i = 0; i < length; i++) {
      const x = orientation === 0 ? row + i : row;
      const y = orientation === 1 ? col + i : col;

      // Check if cell is already occupied
      if (this.board[x][y] !== null) {
        throw new Error("Cells already occupied!");
      }

      // Place part of the ship at (x, y)
      this.board[x][y] = ship;
    }
  }
}
