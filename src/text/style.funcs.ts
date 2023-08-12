const ABSOLUTE_LENGTH_UNITS = ["cm", "mm", "in", "px", "pt", "pc"];
const RELATIVE_LENGTH_UNITS = [
  "em",
  "ex",
  "ch",
  "rem",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "%",
];
// const ALL_LENGTH_UNITS = [...ABSOLUTE_LENGTH_UNITS, ...RELATIVE_LENGTH_UNITS];

/**
 * Any of the absolute css length unit terms
 */
export type StyleLengthUnitAbsolute = "cm" | "mm" | "in" | "px" | "pt" | "pc";

/**
 * Any of the relative css length unit terms
 */
export type StyleLengthUnitRelative =
  | "em"
  | "ex"
  | "ch"
  | "rem"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "%";

export const isRelativeLengthUnit = (value: string): boolean =>
  RELATIVE_LENGTH_UNITS.includes(value);
export const isAbsoluteLengthUnit = (value: string): boolean =>
  ABSOLUTE_LENGTH_UNITS.includes(value);

/**
 * Any of the css length unit terms
 */
export type StyleLengthUnit = StyleLengthUnitAbsolute | StyleLengthUnitRelative;

/**
 * Describes a 'length' in css terms
 */
export type StyleLength = `${number}${StyleLengthUnit}`;

export const isStyleLength = (v: string): v is StyleLength => {
  return false;
};

/**
 * Describes an absolute 'length' in css terms
 */
export type StyleLengthAbsolute = `${number}${StyleLengthUnitAbsolute}`;

/**
 * Describes a relative 'length' in css terms
 */
export type StyleLengthRelative = `${number}${StyleLengthUnitRelative}`;

/**
 *
 * @param n
 * @returns
 */
export const unitizedStyleLength = (n: string | number): string => {
  try {
    if (typeof n == "string" && /\d+?/.test(n)) {
      return unitizedStyleLength(Number(n));
    }
    if (typeof n == "number") {
      return `${n}px`;
    }
    return n;
  } catch (error: any) {
    console.error(error);
    return "0";
  }
};
