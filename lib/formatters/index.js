import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json_formatter.js';

const formatter = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonFormatter(diff);
    default:
      return `{\n${stylish(diff)}\n}`;
  }
};

export default formatter;
