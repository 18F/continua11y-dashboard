'use strict';

const fs          = require('fs');
const path        = require('path');

const Mustache    = require('mustache');

const templates   = require('../templates');
templates.load();

const views       = require('../views');

module.exports = function home(req, res) {
  let rendered = Mustache.render(templates.raw.layout, Object.assign({}, views.layout, views.home), {page: templates.raw.home});
  res.send(rendered);
};
