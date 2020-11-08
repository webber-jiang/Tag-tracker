const uppercaseAlphabetOnly = (character) => {
  return character.match(/[A-Z]/);
};

const tagTracker = (str) => {
  if (typeof str !== 'string') {
    return 'Invalid input';
  }

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (
      str[i] === '<' &&
      uppercaseAlphabetOnly(str[i + 1]) &&
      str[i + 2] === '>'
    ) {
      stack.push(str[i] + '/' + str[i + 1] + str[i + 2]); // adding "/" for simpler comparison with closing tag.
    }

    if (
      str[i] === '<' &&
      str[i + 1] === '/' &&
      uppercaseAlphabetOnly(str[i + 2]) &&
      str[i + 3] === '>'
    ) {
      const closingTag = str.substring(i, i + 4);
      const peekLastElement = stack.slice(-1)[0];

      if (peekLastElement === undefined) {
        return `Expected # found ${closingTag}`;
      } else if (peekLastElement === closingTag) {
        stack.pop();
      } else if (peekLastElement !== closingTag) {
        return `Expected ${stack.pop()} found ${closingTag}`;
      }
    }
  }

  return stack.length
    ? `Expected ${stack.pop()} found #`
    : 'Correctly tagged paragraph';
};

module.exports = tagTracker;
