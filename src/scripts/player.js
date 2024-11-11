import Gameboard from "./gameboard.js";

export default class Player {
  constructor(Name) {
    this.name = Name;
    this.gameboard = new Gameboard();
  }
}
