import * as fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import _ from 'lodash';

const differencesGenerator = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  const file1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
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
  return console.log(result.join('\n'));
};

export default differencesGenerator;
