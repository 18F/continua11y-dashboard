'use strict';

const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');

const homeController = require('./controllers/home');
const createReport   = require('./controllers/create-report');
const showReport     = require('./controllers/show-report');
const getStarted     = require('./controllers/get-started');
const failController = require('./controllers/fail');

router.get('/',             homeController);
router.get('/get-started',  getStarted);
router.get('/reports/:id',  showReport);
router.post('/reports',     bodyParser.json(), createReport);
router.get('/fail',         failController); // for testing

module.exports = router;

