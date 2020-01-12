/**
 *  @module utilities/helperFunctions
*/

/**
  * Takes number within a string and returns it casted to Number
  * @param {String} string String to parse number from
*/
export const parseNumber = string => Number(string.replace(/[^0-9.]+/g, ''));

/**
  * Returns given string with its first letter capitalized
  * @param {String} string String to capitalize first letter
*/
export const capitalizeFirstLetter = string => string[0].toUpperCase() + string.slice(1).toLowerCase();


/**
  * Returns given text, truncated at given max length, with ellipses at the end
  * @param {String} text - String to truncate
  * @param {Number} max - Max length for text to be truncated to
*/
export const truncateTextWithEllipses = (text, max) => {
  let shortString = '';
  if (text) {
    shortString = text.substr(0, max - 1) + (text.length > max ? '...' : '');
  }
  return shortString;
};
