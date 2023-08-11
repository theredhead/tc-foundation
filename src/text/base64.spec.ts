import { Base64 } from "./base64.class";

describe("Base64 class", () => {
  const encoded = "SGVsbG8sIFdvcmxkIQ==";
  const decoded = "Hello, World!";

  it("Encodes plaintext correctly", () => {
    expect(Base64.encode(decoded)).toEqual(encoded);
  });

  it("Decodes base64 correctly", () => {
    expect(Base64.decode(encoded)).toEqual(decoded);
  });
});
