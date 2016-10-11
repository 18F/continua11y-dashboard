'use strict';

const environmentSetup  = require('./app/config/environment-setup');
                          environmentSetup.load();
                          environmentSetup.ensureEnvVars();
const globals           = environmentSetup.globals();

const path              = require('path');
const appDir            = path.resolve(__dirname + '/app');
const express           = require('express');
//const bodyParser        = require('body-parser');
const enableCORS        = require('./app/config/enable-cors');
const routes            = require(appDir + '/routes');

const notFound          = require(appDir + '/controllers/not-found');
const error             = require(appDir + '/controllers/error');

const app               = express();

app.use(express.static(appDir + '/public'));
app.use(enableCORS);
app.use('/', routes);

app.use(notFound);
app.use(error);

module.exports = app;
