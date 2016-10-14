'use strict';

const express = require('express');
const router = express.Router();

const homeController = require('./controllers/home');
const failController = require('./controllers/fail');

router.get('/', homeController);
router.get('/fail', failController); // for testing

module.exports = router;

