import Ship from "../scripts/ship.js";

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

test("Should be a ship with length 3, hits 0, and isSunk false", () => {
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.isSunk()).toBe(false);
});

test("", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(3);
  expect(ship.isSunk()).toBe(true);
});
