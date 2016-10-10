'use strict';

const Mustache    = require('mustache');
const templates   = require('./templates');
const views       = require('./views');

templates.load();
views.load();

class MustacheRenderer {
  constructor(name) {
    this.name = name;
  }

  render() {
    return Mustache.render(this.layoutTemplate(), this.view(), this.partials());
  }

  pageTemplate() {
    return templates[this.name + '_page'];
  }

  layoutTemplate() {
    return templates.layout;
  }

  pageView() {
    return views[this.name];
  }

  layoutView() {
    return views.layout;
  }

  view() {
    return Object.assign({}, this.layoutView(), this.pageView());
  }

  partials() {
    return Object.assign({}, templates, {page: this.pageTemplate()});
  }
}


module.exports = MustacheRenderer;
