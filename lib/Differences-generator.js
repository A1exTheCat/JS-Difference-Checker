import _ from 'lodash';
import path from 'node:path';
import process from 'node:process';
import parseFile from './Parser.js';

const getPath = (currentPath) => path.resolve(process.cwd(), currentPath);

const getFormat = (currentPath) => path.extname(currentPath);

const differencesGenerator = (filepath1, filepath2) => {
  const file1 = parseFile(getPath(filepath1), getFormat(filepath1));
  const file2 = parseFile(getPath(filepath2), getFormat(filepath2));
  const allKeys = _.sortBy(Object.keys({ ...file2, ...file1 }));

  const keysFilter = (key) => {
    const result = [];
    if (file1[key] !== undefined && file2[key] !== undefined) {
      if (file1[key] === file2[key]) {
        result.push(`  ${key}: ${file1[key]}`);
      }
      if (file1[key] !== file2[key]) {
        result.push([`- ${key}: ${file1[key]}`], [`+ ${key}: ${file2[key]}`]);
      }
    }
    if (file1[key] !== undefined && file2[key] === undefined) {
      result.push(`- ${key}: ${file1[key]}`);
    }
    if (file1[key] === undefined && file2[key] !== undefined) {
      result.push(`+ ${key}: ${file2[key]}`);
    }
    return result;
  };
  const diff = allKeys.map((keys) => keysFilter(keys));
  return diff.flat().join('\n');
};

export default differencesGenerator;
