import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    default:
      return stylish(diff);
  }
};

export default formatter;
