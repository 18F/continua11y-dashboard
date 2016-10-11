'use strict';

const fs        = require('fs');
const path      = require('path');
const _         = require('lodash');
const dirHelper = require('../recursive-directory-helper');

module.exports.load = load;

function load(basePath, container) {
  basePath = basePath || path.resolve(__dirname);
  container = container || module.exports;
  loadFiles(fs.readdirSync(basePath), basePath, container);
}

function loadFiles(paths, basePath, container) {
  loadFilesThisLevel(paths, basePath, container);
  loadNestedFiles(paths, basePath, container);
}

function loadFilesThisLevel(paths, basePath, container) {
  paths
    .map((partialPath) => {
      return path.resolve(basePath, partialPath);
    })
    .filter((fullPath) => {
      return fs.statSync(fullPath).isFile() &&
        path.extname(fullPath) === '.mustache';
    })
    .forEach((fullPath) => {
      loadFile(fullPath, container);
    });
}

let loadNestedFiles = dirHelper.requireNested(goDeep);

function loadFile(filePath, container) {
  let name = path.basename(filePath, '.mustache');
  let content = fs.readFileSync(filePath).toString();
  container[name] = content;
}

function goDeep(basePath, partialPath, container) {
  container[partialPath] = container[partialPath] || {};
  if (_.isString(container[partialPath])) {
    throw new Error('Hey developer, please reorg your templates. ' +
                    basePath + '/' + partialPath +
                    ' is a template/string, and other templates cannot be attached to it.');
  }
  load(path.join(basePath, partialPath), container[partialPath]);
}
