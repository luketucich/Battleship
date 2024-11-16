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

describe("Ship class", () => {
  test("hit() increments hits when hits < length", () => {
    const ship = new Ship(3); // Create a ship of length 3
    ship.hits = 1; // Simulate 1 hit already
    ship.hit();
    expect(ship.hits).toBe(2); // Expect hits to increment
  });

  test("hit() does not increment hits when hits >= length", () => {
    const ship = new Ship(3); // Create a ship of length 3
    ship.hits = 3; // Simulate the ship already having max hits
    ship.hit();
    expect(ship.hits).toBe(3); // Expect hits to remain unchanged
  });
});
