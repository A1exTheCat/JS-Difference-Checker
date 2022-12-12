import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import differencesGenerator from '../lib/Differences-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('differencesGenerator', () => {
  const expected = '- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true';
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(differencesGenerator(path1, path2)).toEqual(expected);
});
