#!/usr/bin/env node

import { program } from 'commander';
import differencesGenerator from '../lib/Differences-generator.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format (json, plain or stylish)', 'stylish')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'plain') {
      return console.log(differencesGenerator(filepath1, filepath2, 'plain'));
    }
    if (options.format === 'json') {
      return console.log(differencesGenerator(filepath1, filepath2, 'json'));
    }
    return console.log(differencesGenerator(filepath1, filepath2, 'stylish'));
  });

program.parse();
