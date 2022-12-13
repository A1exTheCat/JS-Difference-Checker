import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parseFile = (pathToFile, format = '') => {
  let parsedFile;
  if (format === '' || format === '.json') {
    parsedFile = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
  }
  if (format === '.yml' || format === '.yaml') {
    parsedFile = yaml.load(fs.readFileSync(pathToFile, 'utf8'));
  }
  return parsedFile;
};

export default parseFile;
