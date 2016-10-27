'use strict';

const db = require('../../config/db-connection');

module.exports.where = function where(attributes) {
  return db
    .select()
    .from('repositories')
    .where(attributes);
};
