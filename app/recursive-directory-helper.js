'use strict';

const fs    = require('fs');
const path  = require('path');

module.exports.requireNested = function buildNested(goDeep) {
  return function requireNested(paths, basePath, container) {
    paths
      .filter((partialPath) => {
        let fullPath = path.resolve(basePath, partialPath);
        return !fs.statSync(fullPath).isFile();
      })
      .forEach((partialPath) => {
        goDeep(basePath, partialPath, container);
      });
  };
};

module.exports.load = function buildLoader(loadFiles, rootDir) {
  return function load(basePath, container) {
    basePath = basePath || rootDir;
    container = container || module.exports;
    loadFiles(fs.readdirSync(basePath), basePath, container);
  };
};
