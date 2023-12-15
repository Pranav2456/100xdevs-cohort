/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str.length === 0) return true;

  // Remove spaces and punctuation marks, and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // So, /[^a-zA-Z0-9]/g RegEx is saying "match any character that is not a lowercase letter, uppercase letter, or digit" and replace it with an empty string.
  let reverseString = "";

  for (let i = cleanStr.length - 1; i >= 0; i--) {
    reverseString += cleanStr[i];
  }

  if (reverseString === cleanStr) {
    return true;
  }
  return false;
}

module.exports = isPalindrome;
