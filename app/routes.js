'use strict';

const express = require('express');
const router = express.Router();

const homeController = require('./controllers/home');
const createReport   = require('./controllers/create-report');
const failController = require('./controllers/fail');

router.get('/',         homeController);
router.post('/reports', createReport);
router.get('/fail',     failController); // for testing

module.exports = router;

