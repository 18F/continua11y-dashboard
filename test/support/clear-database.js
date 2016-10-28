'use strict';

const db = require('../../app/config/db-connection');

module.exports = function(done) {
  db('repositories').del().then(() => {
    db('reports').del().then(() => {
      db('pages').del().then(() => {
        db('issues').del().then(() => { done(); });
      });
    });
  });
};
