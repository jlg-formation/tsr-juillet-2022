import { getAngleFromIndex } from "../src/misc";

describe("getAngleFromIndex", () => {
  it("works", () => {
    expect(getAngleFromIndex(0, 10)).toBe(0);
  });

  it("works with modulo", () => {
    expect(getAngleFromIndex(10, 10) % (2 * Math.PI)).toBe(0);
  });
});
