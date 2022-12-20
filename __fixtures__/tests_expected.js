const deepExpectedResult = `    common: {
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

const plainExpectedResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

// eslint-disable-next-line quotes
const jsonExpectedResult = `[{"name":"common","type":"nested","children":[{"name":"follow","status":"+ ","type":"leaf","value":false},{"name":"setting1","status":"  ","type":"leaf","value":"Value 1"},{"name":"setting2","status":"- ","type":"leaf","value":200},{"name":"setting3","status":"changed","type":"leaf","deletedValue":true,"addedValue":null},{"name":"setting4","status":"+ ","type":"leaf","value":"blah blah"},{"name":"setting5","status":"+ ","type":"leaf","value":{"key5":"value5"}},{"name":"setting6","type":"nested","children":[{"name":"doge","type":"nested","children":[{"name":"wow","status":"changed","type":"leaf","deletedValue":"","addedValue":"so much"}]},{"name":"key","status":"  ","type":"leaf","value":"value"},{"name":"ops","status":"+ ","type":"leaf","value":"vops"}]}]},{"name":"group1","type":"nested","children":[{"name":"baz","status":"changed","type":"leaf","deletedValue":"bas","addedValue":"bars"},{"name":"foo","status":"  ","type":"leaf","value":"bar"},{"name":"nest","status":"changed","type":"leaf","deletedValue":{"key":"value"},"addedValue":"str"}]},{"name":"group2","status":"- ","type":"leaf","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","status":"+ ","type":"leaf","value":{"deep":{"id":{"number":45}},"fee":100500}}]`;

export { deepExpectedResult, plainExpectedResult, jsonExpectedResult };
