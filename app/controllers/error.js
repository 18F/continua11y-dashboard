'use strict';

const MustacheRenderer = require('../mustache-renderer');

module.exports = function notFound(error, req, res, next) {
  // TODO: better logging
  console.log(error);
  res.status(500);
  let renderer = new MustacheRenderer('500');
  res.send(renderer.render());
};
