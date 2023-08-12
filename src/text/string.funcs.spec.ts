import { EmailAddressStringPlain } from "../mail";
import {
  extractPrefix,
  extractSuffix,
  initials,
  isWrappedIn,
  removePrefix,
  removeSuffix,
  reverse,
  unwrap,
} from "./string.funcs";

describe("initials", () => {
  it("capitalizes the letters that it grabs", () => {
    expect(initials("amelia earhart")).toEqual(["A", "E"]);
  });
  it("grabs the first letters of the first and last name from source", () => {
    expect(initials("Amelia Mary Earhart")).toEqual(["A", "E"]);
  });
  it("grabs at most 2 letters from source", () => {
    expect(initials("Amelia Mary Earhart")).toEqual(["A", "E"]);
  });

  it("prefers to take initials from the displayName over the raw email address", () => {
    expect(initials('"John Doe" <john@example.com>')).toEqual(["J", "D"]);
  });
  it("ignores mailboxes after the name part of a mailbox", () => {
    expect(initials("john-doe+nospam@lostfound.com")).toEqual(["J", "D"]);
    expect(initials("john+nospam@lostfound.com")).toEqual(["J"]);
  });
  it("just works with the plainest of plain email addresses", () => {
    const plain: EmailAddressStringPlain = "john@lostfound.com";
    expect(initials(plain)).toEqual(["J"]);
  });
  it("returns an empty array when given an empty string as input", () => {
    expect(initials("")).toEqual([]);
  });

  it("returns an empty array when given an null as input", () => {
    expect(initials(<string>(<any>null))).toEqual([]);
  });
});

describe("isWrappedIn", () => {
  it("checks both the first and the last character(s) of a string", () => {
    expect(isWrappedIn("<foo>", "<", ">")).toBeTrue();
    expect(isWrappedIn("{{ foo }}", "{{", "}}")).toBeTrue();
    expect(isWrappedIn("* bold *", "-", "-")).toBeFalse();
  });
});

describe("unwrap", () => {
  it("takes off n characters at the front and rear of a string simultaneously", () => {
    expect(unwrap("abcdef", 1)).toEqual("bcde");
    expect(unwrap("The quick brown fox jums over the lazy dog", 4)).toEqual(
      "quick brown fox jums over the lazy"
    );
  });

  it("returns an empty string when the number of characters given is less than n * 2", () => {
    expect(unwrap("four", 3)).toEqual("");
  });
});

describe("removePrefix", () => {
  it("removes exact matches from the front of strings", () => {
    expect(removePrefix("<html>", "<")).toEqual("html>");
    expect(removePrefix("There once was a lass", "There ")).toEqual(
      "once was a lass"
    );
  });
  it("leaves non matching prefixes untouched", () => {
    expect(removePrefix("<html>", "*")).toEqual("<html>");
    expect(removePrefix("There once was a lass", "there ")).toEqual(
      "There once was a lass"
    );
  });
});

describe("removeSuffix", () => {
  it("removes exact matches from the rear of strings", () => {
    expect(removeSuffix("<html>", ">")).toEqual("<html");
    expect(removeSuffix("There once was a lass", "lass")).toEqual(
      "There once was a "
    );
  });
  it("leaves non matching suffixes untouched", () => {
    expect(removeSuffix("<html>", "*")).toEqual("<html>");
    expect(removeSuffix("There once was a lass", "Lass")).toEqual(
      "There once was a lass"
    );
  });
});

describe("reverse", () => {
  it("reverses strings", () => {
    expect(reverse("foo bar baz")).toBe("zab rab oof");
    expect(reverse("The quick brown fox jumps over the lazy dog")).toBe(
      "god yzal eht revo spmuj xof nworb kciuq ehT"
    );
    expect(reverse(" ")).toBe(" ");
    expect(reverse("")).toBe("");
  });
});

describe("extractPrefix", () => {
  it("extracts given characters from the front of a string", () => {
    expect(extractPrefix("321Pizza", "0123457689")).toBe("321");
  });
});

describe("extractPrefix", () => {
  it("extracts given characters from the back of a string", () => {
    expect(extractSuffix("321Pizza", "aiPz")).toBe("Pizza");
  });
});
