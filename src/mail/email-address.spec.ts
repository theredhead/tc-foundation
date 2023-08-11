import {
  EmailAddress,
  EmailAddressString,
  disectEmailAddress,
  emailAddressExtractDisplayName,
  emailAddressExtractRawEmail,
  stringIsEmailAddress,
  stringIsEmailAddressPlain,
  stringIsEmailAddressWithDisplayName,
} from "./email-address.type";

const validPlainEmailAddressesForTest = [
  "john.doe@lostfound.com",
  "someonw@somewhere.com",
  "info+urgent@work.com",
];
const validEmailAddressesWithDisplayNamesForTest = [
  '"John Doe" <john.doe@lostfound.com>',
  '"John Doe" <john@example.com>',
  '"Someone special" <someone@somewhere.com>',
  '"Company" <info+urgent@work.com>',
];
const allValidEmailAddressesForTest = [
  ...validPlainEmailAddressesForTest,
  ...validEmailAddressesWithDisplayNamesForTest,
];

const invalidValidEmailAddressesForTest = [
  "",
  "this is not an email",
  "Fr@cking toaster",
];

describe("disectEmailAddress", () => {
  it("can separate displayname from email address", () => {
    expect(disectEmailAddress('"John Doe" <john-doe@lostfound.com>')).toEqual([
      "John Doe",
      "john-doe@lostfound.com",
    ]);
  });
});

describe("EmailAddressStringWithDisplayName", () => {
  it("can be identified using `stringIsEmailAddressWithDisplayName`", () => {
    for (let value of validEmailAddressesWithDisplayNamesForTest) {
      expect(stringIsEmailAddressWithDisplayName(value))
        .withContext(value)
        .toBeTrue();
    }
  });
});

describe("EmailAddressStringPlain", () => {
  it("can be identified using `stringIsEmailAddressPlain`", () => {
    for (let value of validPlainEmailAddressesForTest) {
      expect(stringIsEmailAddressPlain(value)).withContext(value).toBeTrue();
    }
  });
});

describe("stringIsEmailAddress", () => {
  it("can identify valid email addresses", () => {
    for (let value of allValidEmailAddressesForTest) {
      expect(stringIsEmailAddress(value)).withContext(value).toBeTruthy();
    }
  });
});

describe("emailAddressExtractDisplayName", () => {
  it("extracts the displayname from an email address", () => {
    expect(
      emailAddressExtractDisplayName('"Display Name" <someone@somewhere.com>')
    ).toEqual("Display Name");
  });
});

describe("emailAddressExtractRawEmail", () => {
  it("extracts the raw email address from an email address", () => {
    expect(
      emailAddressExtractRawEmail('"Display Name" <someone@somewhere.com>')
    ).toEqual("someone@somewhere.com");
  });
});

describe("EmailAddress", () => {
  it("can identify valid email addresses", () => {
    for (let value of allValidEmailAddressesForTest) {
      expect(EmailAddress.isEmailAddress(value))
        .withContext(value)
        .toBeTruthy();
    }
  });

  it("Can be instantiated with a valid email address", () => {
    for (let value of allValidEmailAddressesForTest) {
      const instance = new EmailAddress(value as EmailAddressString);
      expect(instance).withContext(value).toBeTruthy();
    }
  });

  it("Cannot be instantiated with an invalid email address", () => {
    for (let value of invalidValidEmailAddressesForTest) {
      expect(() => {
        new EmailAddress(value as EmailAddressString);
      }).toThrow();
    }
  });

  it('parses into "displayName" and "address"', () => {
    const instance = new EmailAddress('"Display Name" <someone@somewhere.com>');

    expect(instance.displayName).toEqual("Display Name");
    expect(instance.address).toEqual("someone@somewhere.com");
  });

  it("creates string representations with displayname if one was given", () => {
    const raw = '"John Doe" <johndoe@lostfound.com>';
    const email = new EmailAddress(raw);
    expect(email.toString()).toEqual(raw);
  });

  it("creates string representations without displayname if none was given", () => {
    const raw = "johndoe@lostfound.com";
    const email = new EmailAddress(raw);
    expect(email.toString()).toEqual(raw);
  });
});
