/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
  . An anagram of a string is another string that contains the same characters, 
  only the order of characters can be different. For example, “abcd” and “dabc” are an anagram of each other.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) return false;

  const sortedStr1 = str1.toLowerCase().split("").sort();
  const sortedStr2 = str2.toLowerCase().split("").sort();

  for (i = 0; i < str1.length; i++) {
    if (sortedStr1[i] != sortedStr2[i]) {
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;
