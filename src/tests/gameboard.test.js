import Gameboard from "../scripts/gameboard.js";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard();
});

test("Should contain a 10x10 board", () => {
  expect(gameboard.board).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Should throw an error if placing a horizontal ship exceeds board boundaries", () => {
  expect(() => gameboard.place([5, 0], 5, 0)).toThrow(
    "Ship would exceed board!"
  );
});

test("Should throw an error if placing a vertical ship exceeds board boundaries", () => {
  expect(() => gameboard.place([0, 5], 5, 1)).toThrow(
    "Ship would exceed board!"
  );
});

test("Should place a horizontal ship along 5 squares on the gameboard", () => {
  gameboard.place([0, 0], 5, 0);
  for (let i = 0; i < 5; i++) {
    expect(gameboard.board[i][0]).toEqual({ hits: 0, length: 5 });
  }
});

test("Should place a vertical ship along 5 squares on the gameboard", () => {
  gameboard.place([0, 0], 5, 1);
  for (let i = 0; i < 5; i++) {
    expect(gameboard.board[0][i]).toEqual({ hits: 0, length: 5 });
  }
});
