'use strict';

const winston           = require('winston');

const defaultLogging = {
  transports: [ new winston.transports.Console({ json: true }) ]
};

const testLogging = {
  transports: [new winston.transports.File({dirname: __dirname + '/../../log'})]
};

module.exports = function loggingConfig() {
  let config;
  if (process.env.NODE_ENV === 'test') {
    config = testLogging;
  } else {
    config = defaultLogging;
  }

  return  config;
};
