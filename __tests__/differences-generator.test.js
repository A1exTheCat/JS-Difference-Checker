import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import differencesGenerator from '../lib/Differences-generator.js';
import stylish from '../lib/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expected = `    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }`;

test('differencesGenerator_JSON', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const diff = differencesGenerator(path1, path2);
  expect(diff).toEqual(expected);
});

test('differencesGenerator_YAML', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yaml');
  const diff = differencesGenerator(path1, path2);
  expect(diff).toEqual(expected);
});
