import { isStyleLength } from "./style.funcs";

const tests: [string, boolean][] = [
  ["640px", true],
  ["2ch", true],
  ["12em", true],
  ["10mm", true],
  ["12foo", false],
];

describe("isStyleLength", () => {
  it("correctly identifies Stylelength values (`${number}${StyleLengthUnit}`)", () => {
    for (let [value, expectation] of tests) {
      expect(isStyleLength(value))
        .withContext(
          `"${value}" should equal ${expectation ? "true" : "false"}`
        )
        .toEqual(expectation);
    }
  });
});
