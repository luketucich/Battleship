export default class Ship {
  constructor(length) {
    this.orientation = null;
    this.length = length;
    this.hits = 0;
    this.coords = [];
  }

  hit() {
    if (this.hits < this.length) {
      this.hits++;
    }
  }

  isSunk() {
    return this.hits === this.length ? true : false;
  }
}
