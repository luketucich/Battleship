import Ship from "./ship.js";
import hitSoundLocation from "../assets/hit.wav";
import missSoundLocation from "../assets/miss.wav";
import sunkSoundLocation from "../assets/sunk.wav";
const missSound = new Audio(missSoundLocation);
const hitSound = new Audio(hitSoundLocation);
const sunkSound = new Audio(sunkSoundLocation);

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
    this.misses = [];
    this.hits = [];
    this.available = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.available.push([i, j]);
      }
    }
    this.lastHitShip = null;
  }

  validateCoordinates(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error("Coordinates out of bounds!");
    }
  }

  checkBoundary(row, col, length, orientation) {
    if (
      (orientation === 0 && row + length > 10) || // Vertical boundary check
      (orientation === 1 && col + length > 10) // Horizontal boundary check
    ) {
      throw new Error("Ship would exceed board!");
    }
  }

  checkCollision(row, col) {
    if (
      this.ships.some((ship) =>
        ship.coords.some((coord) => coord[0] === row && coord[1] === col)
      )
    ) {
      throw new Error("Ship already placed here!");
    }
  }

  place(coords, length, orientation) {
    const [row, col] = coords;

    this.validateCoordinates(row, col);
    this.checkBoundary(row, col, length, orientation);
    for (let i = 0; i < length; i++) {
      const x = orientation === 0 ? row + i : row;
      const y = orientation === 1 ? col + i : col;
      this.checkCollision(x, y);
    }

    const ship = new Ship(length);

    for (let i = 0; i < length; i++) {
      const x = orientation === 0 ? row + i : row;
      const y = orientation === 1 ? col + i : col;
      this.board[x][y] = ship;
      ship.coords.push([x, y]);
    }
    this.ships.push(ship);
  }

  receiveAttack(coords) {
    const [row, col] = coords;
    this.validateCoordinates(row, col);

    let cell = this.board[row][col];

    if (cell === null) {
      if (localStorage.getItem("sfxEnabled") === "true") {
        missSound.play();
      }
      this.board[row][col] = "MISS";
      this.misses.push(coords);

      this.available.findIndex(
        (coord, index) =>
          coord[0] === row &&
          coord[1] === col &&
          this.available.splice(index, 1)
      );
    } else if (
      this.hits.some(
        (ele) =>
          (ele[0] === coords[0] && ele[1] === coords[1]) || cell === "MISS"
      )
    ) {
      throw new Error("Cannot interact with cell twice!");
    } else {
      cell.hit();
      if (localStorage.getItem("sfxEnabled") === "true") {
        cell.isSunk() ? sunkSound.play() : hitSound.play();
      }
      this.hits.push(coords);

      this.available.findIndex(
        (coord, index) =>
          coord[0] === row &&
          coord[1] === col &&
          this.available.splice(index, 1)
      );
    }
  }

  isDefeated() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
