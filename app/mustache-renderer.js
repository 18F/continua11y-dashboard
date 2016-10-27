'use strict';

const _           = require('lodash');
const Mustache    = require('mustache');
const templates   = require('./templates');
const views       = require('./views');

templates.load();
views.load();

class MustacheRenderer {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

  render() {
    return Mustache.render(this.layoutTemplate(), this.view(), this.partials());
  }

  pageTemplate() {
    return MustacheRenderer.templates[this.name + '_page'];
  }

  layoutTemplate() {
    return MustacheRenderer.templates.layout;
  }

  pageView() {
    let view = MustacheRenderer.views[this.name];
    if (_.isFunction(view)) { view = view(this.data); }
    return view;
  }

  layoutView() {
    return MustacheRenderer.views.layout;
  }

  view() {
    return Object.assign({}, this.layoutView(), this.pageView());
  }

  partials() {
    return Object.assign({}, MustacheRenderer.templates, {page: this.pageTemplate()});
  }
}

MustacheRenderer.templates = templates;
MustacheRenderer.views = views;

module.exports = MustacheRenderer;
