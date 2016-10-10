'use strict';

const environmentSetup  = require('./app/config/environment-setup');
                          environmentSetup.load();
                          environmentSetup.ensureEnvVars();
const globals           = environmentSetup.globals();

const path              = require('path');
const appDir            = path.resolve(__dirname + '/app');
const express           = require('express');
const bodyParser        = require('body-parser');
const enableCORS        = require('./app/config/enable-cors');
const routes            = require(appDir + '/routes');

const app               = express();

app.use(express.static(appDir + '/public'));

app.use(enableCORS);

app.use('/', routes);

app.use(function (req, res) {
  res.status(404);
  res.render('404.mustache');
});

app.use(function (error, req, res, next) {
  console.log(error);
  // TODO: some kind of better error logging here!
  res.status(500);
  res.render('500.mustache');
});

module.exports = app;
