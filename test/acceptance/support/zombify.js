'use strict';

const Browser = require('zombie');
const app     = require('../../../app');

module.exports.start = function start(callback) {
  let port = process.env.PORT || 3456;
  let browser;

  app.listen(port, () => {
    Browser.localhost('example.com', port);
    browser = new Browser();
    callback(browser);
  });
};

