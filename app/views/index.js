'use strict';

const fs        = require('fs');
const path      = require('path');
const dirHelper = require('../recursive-directory-helper');

module.exports.load = load;

function load(basePath, container) {
  basePath = basePath || path.resolve(__dirname);
  container = container || module.exports;
  loadFiles(fs.readdirSync(basePath), basePath, container);
}

function loadFiles(paths, basePath, container) {
  requireThisLevel(paths, basePath, container);
  requireNestedFiles(paths, basePath, container);
}

function requireThisLevel(paths, basePath, container) {
  paths
    .map((partialPath) => {
      return path.resolve(basePath, partialPath);
    })
    .filter((fullPath) => {
      return fs.statSync(fullPath).isFile() &&
        path.extname(fullPath) === '.js' &&
        path.basename(fullPath, '.js') !== 'index';
    })
    .forEach((fullPath) => {
      requireFile(fullPath, container);
    });
}

let requireNestedFiles = dirHelper.requireNested(goDeep);

function requireFile(filePath, container) {
  let name = path.basename(filePath, '.js');
  container[name] = require(filePath);
}

function goDeep(basePath, partialPath, container) {
  container[partialPath] = container[partialPath] || {};
  load(path.join(basePath, partialPath), container[partialPath]);
}
