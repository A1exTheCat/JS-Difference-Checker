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
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      const currentFile1 = file1[key];
      const currentFile2 = file2[key];
      const commonKeys = _.sortBy(Object.keys({ ...currentFile1, ...currentFile2 }));
      return {
        ...{},
        name: `${key}`,
        type: 'nested',
        children: commonKeys.map((keys) => keysFilter(keys, file1[key], file2[key])),
      };
    }
    if (file1[key] === file2[key]) {
      return {
        ...{},
        name: `${key}`,
        status: '  ',
        type: 'leaf',
        value: file1[key],
      };
    }
    if (file1[key] === undefined) {
      return {
        ...{},
        name: `${key}`,
        status: '+ ',
        type: 'leaf',
        value: file2[key],
      };
    }
    if (file2[key] === undefined) {
      return {
        ...{},
        name: `${key}`,
        status: '- ',
        type: 'leaf',
        value: file1[key],
      };
    }
    return {
      ...{},
      name: `${key}`,
      status: 'changed',
      type: 'leaf',
      deletedValue: file1[key],
      addedValue: file2[key],
    };
  };
  const diff = originalCommonKeys.map((keys) => keysFilter(keys, originalFile1, originalFile2));
  return formatter(diff, formaterName);
};

export default differencesGenerator;
