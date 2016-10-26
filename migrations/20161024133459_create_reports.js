'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reports', function (table) {
      table.increments();
      table.integer('repository_id');
      table.string('branch');
      table.string('commit');
      table.boolean('pull_request');
      table.dateTime('run_at');
      table.index(['repository_id', 'branch'], 'reports_repository_and_branch');
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('reports')
  ]);
};
