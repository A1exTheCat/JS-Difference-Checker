import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import differencesGenerator from '../lib/Differences-generator.js';
import {
  deepExpectedResult as deepExpected,
  plainExpectedResult as plainExpected,
  jsonExpectedResult as jsonExpected,
} from '../__fixtures__/tests_expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('differencesGenerator_JSON_StylishFormat', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const diff = differencesGenerator(path1, path2);
  expect(diff).toEqual(deepExpected);
});

test('differencesGenerator_YAML_StylishFormat', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yaml');
  const diff = differencesGenerator(path1, path2);
  expect(diff).toEqual(deepExpected);
});

test('differencesGenerator_PlainFormat', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yaml');
  const diff = differencesGenerator(path1, path2, 'plain');
  expect(diff).toEqual(plainExpected);
});

test('differencesGenerator_JsonFormat', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yaml');
  const diff = differencesGenerator(path1, path2, 'json');
  expect(diff).toEqual(jsonExpected);
});
