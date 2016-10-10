'use strict';

const MustacheRenderer = require('../mustache-renderer');

module.exports = function home(req, res) {
  let renderer = new MustacheRenderer('home');
  res.send(renderer.render());
};
