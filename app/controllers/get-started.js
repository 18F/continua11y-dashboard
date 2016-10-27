'use strict';

const MustacheRenderer = require('../mustache-renderer');

module.exports = function notFound(req, res) {
  res.status(404);
  let renderer = new MustacheRenderer('get-started');
  res.send(renderer.render());
};

