/**
 *  - Passwords will contain at least 1 upper case letter
 *  - Passwords will contain at least 1 lower case letter
 *  - Passwords will contain at least 1 number
 *  - Passwords will contain at least 1 special character
 *  - Passwords will contain at least 8 characters
 */
export const PASSWORD_REGEX =
  // eslint-disable-next-line no-useless-escape
  /((?=.*\d)(?=.*\W+))(?![\.\s\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
export const EMAIL_REGEX =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
export const LETTERS_AND_SPACES_REGEX = /^[a-zA-Z ]*$/;
export const LETTERS_NUMBERS_AND_SPACES_REGEX = /^[a-zA-Z0-9 ]*$/;

/**
 * Allow number with two decimal places
 */
export const DECIMAL_NUMBER_REGEX = /^([0-9]+(\.?[0-9]?[0-9]?)?)$/;
