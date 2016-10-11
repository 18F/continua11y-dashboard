'use strict';

const MustacheRenderer = require('../mustache-renderer');

module.exports = function home(req, res) {
  let renderer = new HomeRenderer('home');
  res.send(renderer.render());
};

class HomeRenderer extends MustacheRenderer {
  partials() {
    return Object.assign({}, MustacheRenderer.templates.home, {page: this.pageTemplate()});
  }
}
