import Gameboard from "./gameboard.js";

export default class Player {
  constructor(Name, Id) {
    this.name = Name;
    this.id = Id;
    this.gameboard = new Gameboard();
  }
}
