import * as fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import _ from 'lodash';

const getPath = (currentPath) => path.resolve(process.cwd(), currentPath);

const readFile = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile, 'utf8'));

const differencesGenerator = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const file1 = readFile(path1);
  const file2 = readFile(path2);
  const allKeys = _.sortBy(Object.keys({ ...file2, ...file1 }));
  const result = [];
  for (const key of allKeys) {
    if (file1[key] !== undefined && file2[key] !== undefined) {
      if (file1[key] === file2[key]) {
        result.push(`  ${key}: ${file1[key]}`);
      }
      if (file1[key] !== file2[key]) {
        result.push(`- ${key}: ${file1[key]}`);
        result.push(`+ ${key}: ${file2[key]}`);
      }
    }
    if (file1[key] !== undefined && file2[key] === undefined) {
      result.push(`- ${key}: ${file1[key]}`);
    }
    if (file1[key] === undefined && file2[key] !== undefined) {
      result.push(`+ ${key}: ${file2[key]}`);
    }
  }
  return result.join('\n');
};

export default differencesGenerator;
