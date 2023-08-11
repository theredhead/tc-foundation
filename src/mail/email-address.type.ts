import { removePrefix, removeSuffix } from "../text/string.funcs";

/**
 * Indicate an attempt to do some kind of operation using an invalid representation of an email address
 */
export class InvalidEmailAddressError extends Error {
  constructor(message = 'The given string is not an email address') {
    super(message);
  }
  static throw(source: string): never {
    throw new InvalidEmailAddressError(`The given string "${source}" is not an email address'`);
  }
}

/**
 * String representing a raw email address
 */
export type EmailAddressStringPlain = `${string}@${string}.${string}`;

/**
 * String representing an email address with a displayname, 
 */
export type EmailAddressStringWithDisplayName = `"${string}" <${EmailAddressStringPlain}>`;

/**
 * String representing either a raw email address or an email address with a displayname
 */
export type EmailAddressString = EmailAddressStringPlain | EmailAddressStringWithDisplayName;

/**
 * The regular expression used to test if a string is a valid (raw) email address.
 */
const EMAIL_TEST_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Determine if the given string can be used to represent a raw email address
 * 
 * @param value 
 * @returns 
 */
export const stringIsEmailAddressPlain = (value: string) : value is EmailAddressStringPlain => {
  return EMAIL_TEST_PATTERN.test(value);
}

/**
 * Determine wether the given string contains an email address with displayname, where the displayname is not just the email address
 * 
 * @param value 
 * @returns 
 */
export const stringIsEmailAddressWithDisplayName = (value: string) : value is EmailAddressStringWithDisplayName => {
  try {
    const tuple = disectEmailAddress(<EmailAddressString>value);
    const [displayName, email] = tuple;
    return displayName !== email;
  }
  catch {
    return false
  }
}

/**
 * Determine if the given string can be used to represent a valid email address (without judgement on configuration)
 * 
 * @param value 
 * @returns 
 */
export const stringIsEmailAddress = (value: string) : value is EmailAddressString => {
  return stringIsEmailAddressPlain(value) || stringIsEmailAddressWithDisplayName(value);
}

/**
 * Extract a display value from an EmailAddress representation
 * 
 * @param value an email address (in unknown configuration)
 * @returns 
 */
export const emailAddressExtractDisplayName = (value: EmailAddressString) : string => {
  return disectEmailAddress(value)[0]
}

/**
 * Extract the raw email address from an EmailAddress representation
 * 
 * @param value an email address (in unknown configuration)
 * @returns 
 */
export const emailAddressExtractRawEmail = (value: EmailAddressString) : string => {
  return disectEmailAddress(value)[1]
}

/**
 * Extract the raw email address and a display value from an EmailAddress representation
 * 
 * Throws when the passed value cannot be dissected
 * 
 * @param value an email address (in unknown configuration)
 * @throws
 * @returns 
 */
export const disectEmailAddress = (value: EmailAddressString) : [string, EmailAddressStringPlain] => {
  const spaceIndex = value.lastIndexOf(' ');
  if (spaceIndex > 0) {
    const [displayNameWrapped, emailWrapped] = [value.substring(0, spaceIndex), value.substring(spaceIndex + 1)];
    const displayName = removeSuffix(removePrefix(displayNameWrapped, '"'), '"');
    const email = removeSuffix(removePrefix(emailWrapped, '<'), '>');
    if (stringIsEmailAddressPlain(email)) {
      return [displayName, email];
    }
    else InvalidEmailAddressError.throw(value);
  } else {
    return [value, value];
  }
}

/**
 * Exposes an email address as a simple object with two 
 */
export class EmailAddress extends Object {
  /**
   * Determine if a string represents a valid email address and could therefor be used to create an EmailAddress instance
   * 
   * @param value 
   * @returns 
   */
  static isEmailAddress(value: string) : value is EmailAddressString {
    return stringIsEmailAddress(value);
  }

  /**
   * Determine if the given string represents an email address with a displayname
   * 
   * @param value 
   * @returns 
   */
  static hasDisplayName(value: string) : value is EmailAddressStringWithDisplayName {
    return stringIsEmailAddressWithDisplayName(value);
  }

  /**
   * Extract the displayname from an email address representation
   * 
   * @param value 
   * @returns 
   */
  static getDisplayName(value: EmailAddressString): string {
    return emailAddressExtractDisplayName(value);
  }

  public displayName!: string;
  readonly address!: EmailAddressStringPlain;

  constructor(value: EmailAddressString) {
    super();
    // the typehint only helps distinguish from strings at design time…
    if (EmailAddress.isEmailAddress(value)) {
      const tuple = disectEmailAddress(value);
      this.displayName = tuple[0];
      this.address = tuple[1];
    } else throw new InvalidEmailAddressError();
  }

  override toString(): string {
    if (this.displayName !== this.address) {
      return `"${this.displayName}" <${this.address}>`;
    } else {
      return this.address;
    }
  }
}