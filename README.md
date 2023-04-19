# JS-Difference-Checker
Utility that compares two configuration files and shows a difference

[![my-tests](https://github.com/A1exTheCat/frontend-project-46/actions/workflows/my-tests.yml/badge.svg)](https://github.com/A1exTheCat/frontend-project-46/actions/workflows/my-tests.yml)
[![Actions Status](https://github.com/A1exTheCat/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/A1exTheCat/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6bd1d23e29d074a87c13/maintainability)](https://codeclimate.com/github/A1exTheCat/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6bd1d23e29d074a87c13/test_coverage)](https://codeclimate.com/github/A1exTheCat/frontend-project-46/test_coverage)

### Requirements:
* Git
* Make
* Node.js ^17

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
