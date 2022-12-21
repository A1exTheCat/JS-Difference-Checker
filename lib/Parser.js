import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parseFile = (pathToFile, format = '') => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(fs.readFileSync(pathToFile, 'utf8'));
  }
  return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
};

export default parseFile;
