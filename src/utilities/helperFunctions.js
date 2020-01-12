export const parseNumber = string => Number(string.replace(/[^0-9.]+/g, ''));
export const capitalizeFirstLetter = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
export const truncateTextWithEllipses = (text, max) => {
  let shortString = '';
  if (text) {
    shortString = text.substr(0, max - 1) + (text.length > max ? '...' : '');
  }
  return shortString;
};
