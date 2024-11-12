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

test("Should throw an error if placing a ship outside coordinates", () => {
  expect(() => gameboard.place([10, 10], 5, 0)).toThrow(
    "Coordinates out of bounds!"
  );
});

test("Should throw an error if placing a horizontal ship exceeds board boundaries", () => {
  expect(() => gameboard.place([6, 0], 5, 0)).toThrow(
    "Ship would exceed board!"
  );
});

test("Should throw an error if placing a vertical ship exceeds board boundaries", () => {
  expect(() => gameboard.place([0, 6], 5, 1)).toThrow(
    "Ship would exceed board!"
  );
});

test("Should throw an error if attempting to place in occupied cell", () => {
  gameboard.place([0, 0], 5, 0);
  expect(() => gameboard.place([0, 0], 5, 0)).toThrow(
    "Cells already occupied!"
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

test("Should update ships array when ship is placed", () => {
  gameboard.place([0, 0], 5, 1);
  expect(gameboard.ships).toEqual([{ hits: 0, length: 5 }]);
});

test("Should update board cell if attack misses", () => {
  gameboard.place([0, 0], 5, 1);
  gameboard.receiveAttack([1, 0]);

  expect(gameboard.board[1][0]).toEqual("MISS");
});

test("Should update board cell and ship object if attack hits", () => {
  gameboard.place([0, 0], 5, 1);
  gameboard.receiveAttack([0, 0]);

  expect(gameboard.board[0][0]).toBe("HIT");
  for (let i = 1; i < 5; i++) {
    expect(gameboard.board[0][i]).toEqual({ hits: 1, length: 5 });
  }
});

test("Should prevent user from interacting with a cell twice", () => {
  gameboard.place([0, 0], 5, 1);
  gameboard.receiveAttack([0, 0]);

  expect(() => gameboard.receiveAttack([0, 0])).toThrow(
    "Cannot interact with cell twice!"
  );
});

test("Should return 'false' if all ships have not been sunk", () => {
  gameboard.place([0, 0], 5, 1);

  expect(gameboard.isDefeated()).toBe(false);
});

test("Should return 'true' if all ships have been sunk", () => {
  gameboard.place([0, 0], 5, 1);
  gameboard.place([1, 0], 3, 0);

  for (let i = 0; i < 5; i++) {
    gameboard.receiveAttack([0, i]);
  }

  for (let i = 1; i < 4; i++) {
    gameboard.receiveAttack([i, 0]);
  }

  expect(gameboard.isDefeated()).toBe(true);
});
