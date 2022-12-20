import _ from 'lodash';
import path from 'node:path';
import process from 'node:process';
import parseFile from './Parser.js';
import formatter from './formatters/index.js';

const getPath = (currentPath) => path.resolve(process.cwd(), currentPath);

const getFormat = (currentPath) => path.extname(currentPath);

const differencesGenerator = (filepath1, filepath2, formaterName = 'stylish') => {
  const originalFile1 = parseFile(getPath(filepath1), getFormat(filepath1));
  const originalFile2 = parseFile(getPath(filepath2), getFormat(filepath2));
  const originalCommonKeys = _.sortBy(Object.keys({ ...originalFile1, ...originalFile2 }));

  const keysFilter = (key, file1, file2) => {
    const result = {};
    if (typeof file1[key] === 'object' && typeof file2[key] === 'object' && file1[key] !== null) {
      const currentFile1 = file1[key];
      const currentFile2 = file2[key];
      const commonKeys = _.sortBy(Object.keys({ ...currentFile1, ...currentFile2 }));
      result.name = `${key}`;
      result.type = 'nested';
      result.children = commonKeys.map((keys) => keysFilter(keys, file1[key], file2[key]));
      return result;
    }
    if (file1[key] === file2[key]) {
      result.name = `${key}`;
      result.status = '  ';
      result.type = 'leaf';
      result.value = file1[key];
      return result;
    }
    if (file1[key] === undefined) {
      result.name = `${key}`;
      result.status = '+ ';
      result.type = 'leaf';
      result.value = file2[key];
      return result;
    }
    if (file2[key] === undefined) {
      result.name = `${key}`;
      result.status = '- ';
      result.type = 'leaf';
      result.value = file1[key];
      return result;
    }
    result.name = `${key}`;
    result.status = 'changed';
    result.type = 'leaf';
    result.deletedValue = file1[key];
    result.addedValue = file2[key];
    return result;
  };
  const diff = originalCommonKeys.map((keys) => keysFilter(keys, originalFile1, originalFile2));
  return formatter(diff, formaterName);
};

export default differencesGenerator;
