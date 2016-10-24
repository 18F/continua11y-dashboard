'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('pages', function (table) {
      table.increments();
      table.integer('report_id');
      table.string('path');
      table.string('size');
      table.index(['report_id', 'path', 'size'], 'pages_report_path_and_size');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages')
  ]);
};
