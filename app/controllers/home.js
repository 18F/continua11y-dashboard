'use strict';

const fs          = require('fs');
const path        = require('path');

const Mustache    = require('mustache');

const viewDir     = path.resolve(__dirname, '../views');
const templateDir = path.resolve(__dirname, '../templates');

const layoutTemplate  = fs.readFileSync(templateDir + '/layout.mustache').toString();
const layoutView      = require(viewDir + '/layout');

const homeTemplate    = fs.readFileSync(templateDir + '/home.mustache').toString();
const homeView        = require(viewDir + '/home');

module.exports = function home(req, res) {
  let rendered = Mustache.render(layoutTemplate, Object.assign({}, layoutView, homeView), {page: homeTemplate});
  res.send(rendered);
};
