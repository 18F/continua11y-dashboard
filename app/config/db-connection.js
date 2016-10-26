'use strict';

const env         = process.env.NODE_ENV;
const knexConfig  = require('../../knexfile');
const knex        = require('knex');

module.exports    = knex(knexConfig[env]);
