'use strict';

const MustacheRenderer = require('../mustache-renderer');
const logger = require('../config/logging')().transports[0];

module.exports = function notFound(error, req, res, next) {
  logger(error);
  res.status(500);
  let renderer = new MustacheRenderer('500');
  res.send(renderer.render());
};
