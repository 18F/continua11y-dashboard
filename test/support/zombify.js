'use strict';

const Browser     = require('zombie');
const testServer  = require('./test-server');

module.exports.start = function start(callback) {
  let browser;
  testServer.start((port) => {
    Browser.localhost('example.gov', port);
    browser = new Browser();
    browser.port = port;
    callback(browser);
  });
};

module.exports.stop = testServer.stop;

