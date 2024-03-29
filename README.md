# JS-Difference-Checker
JS-Difference-Checker is CLI application that determines the differences between two data structures.

[![my-tests](https://github.com/A1exTheCat/frontend-project-46/actions/workflows/my-tests.yml/badge.svg)](https://github.com/A1exTheCat/frontend-project-46/actions/workflows/my-tests.yml)
[![Actions Status](https://github.com/A1exTheCat/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/A1exTheCat/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6bd1d23e29d074a87c13/maintainability)](https://codeclimate.com/github/A1exTheCat/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6bd1d23e29d074a87c13/test_coverage)](https://codeclimate.com/github/A1exTheCat/frontend-project-46/test_coverage)

### Options:
- Supported formats: `.yaml`, `.yml` and `.json`
- Representing reports as *plain text, stylish* and *JSON*.
- Don't need a full file path. Just write a file name.


### Examples
#### Plain text report:
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

#### Stylish report:
```
{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

#### JSON report:
```
[{"key":"common","type":"nest","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"deleted"},{"key":"setting3","value":null,"previousValue":true,"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","type":"nest","children":[{"key":"doge","type":"nest","children":[{"key":"wow","value":"so much","previousValue":"","type":"changed"}]},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}]}]},{"key":"group1","type":"nest","children":[{"key":"baz","value":"bars","previousValue":"bas","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value":"str","previousValue":{"key":"value"},"type":"changed"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}},"type":"added"}]
```


## Setup:
```sh
$ git clone https://github.com/A1exTheCat/JS-Difference-Checker.git
$ cd frontend-project-lvl2
$ make install
```
## Usage:
```sh
gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (json, plain or stylish) (default: "stylish")
  -h, --help           display help for command
```

### Demo:
* [JSON file diff in stylish (default) format](https://asciinema.org/a/578639)
* [YAML file diff in stylish (default) format](https://asciinema.org/a/578638)
* [JSON file diff in plain format](https://asciinema.org/a/578640)
* [JSON file diff in JSON format](https://asciinema.org/a/578641)
