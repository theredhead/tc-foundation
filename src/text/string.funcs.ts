import {
  emailAddressExtractDisplayName,
  stringIsEmailAddressPlain,
  stringIsEmailAddressWithDisplayName,
} from "../mail";

/**
 * Grab initials from a string that holds a name or an email address.
 *
 * @example:
 *  initials('John') => ['J']
 *  initials('John Doe') => ['J', 'D']
 *  initials('john-doe+nospam@lostfound.com') => ['J', 'D']
 *
 * @param input
 * @returns string[]
 */
export const initials = (input: string): string[] => {
  if (stringIsEmailAddressWithDisplayName(input)) {
    const displayName = emailAddressExtractDisplayName(input);
    return initials(displayName);
  } else if (stringIsEmailAddressPlain(input)) {
    const mailbox = input.substring(0, input.indexOf("@"));
    if (mailbox.indexOf("+") > -1) {
      return initials(mailbox.substring(0, mailbox.indexOf("+")));
    } else {
      return initials(mailbox);
    }
  } else {
    const name = input;
    const parts =
      name
        ?.split(/\s|\-|\_|\.|\b/)
        .map((p) => p.substring(0, 1).toLocaleUpperCase()) ?? [];

    if (parts.length > 2) {
      return [parts.shift()!, parts.pop()!];
    }
    return parts.filter((p) => p.length === 1);
  }
};

/**
 * Determine if a given value string is wrapped between the given prefix and suffix
 *
 * @param value
 * @param prefix
 * @param suffix
 * @returns
 */
export const isWrappedIn = (
  value: string,
  prefix: string,
  suffix: string
): boolean => {
  return value.startsWith(prefix) && value.endsWith(suffix);
};

/**
 * Trims a number of characters from both the start en end of the given string
 *
 * @param value
 * @param n
 * @returns
 */
export const unwrap = (value: string, n: number): string => {
  if (n * 2 > value.length) {
    return "";
  }
  return value.substring(n, value.length - n);
};

/**
 * Removes the given prefix from given string or leaves it untouched if value does not start with the prefix
 *
 * @param value
 * @param prefix
 * @returns
 */
export const removePrefix = (value: string, prefix: string): string => {
  if (value.startsWith(prefix)) {
    return value.substring(prefix.length);
  }
  return value;
};

/**
 * Removes the given suffix from given string or leaves it untouched if value does not end with the suffix
 *
 * @param value
 * @param suffix
 * @returns
 */
export const removeSuffix = (value: string, suffix: string): string => {
  if (value.endsWith(suffix)) {
    return value.substring(0, value.length - suffix.length);
  }
  return value;
};

/**
 * Reverses the given value
 *
 * @param value
 * @returns
 */
export const reverse = (value: string): string => {
  const chars = value.split("");
  chars.reverse();
  return chars.join("");
};

export const extractPrefix = (
  value: string,
  characters: string | string[]
): string => {
  const extracted: string[] = [];
  for (let ix = 0; ix < value.length; ix++) {
    const c = value[ix];
    if (characters.includes(c)) {
      extracted.push(c);
    } else break;
  }
  return extracted.join("");
};

export const extractSuffix = (
  value: string,
  characters: string | string[]
): string => {
  return reverse(extractPrefix(reverse(value), characters));
};
