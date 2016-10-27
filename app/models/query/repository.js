'use strict';

const db = require('../../config/db-connection');

module.exports.where = function where(attributes) {
  return db
    .select()
    .from('repositories')
    .where(attributes);
};

module.exports.byIds = function byIds(ids) {
  return db
    .select()
    .from('repositories')
    .orderBy(['owner', 'name'])
    .whereIn('id', ids);
};
