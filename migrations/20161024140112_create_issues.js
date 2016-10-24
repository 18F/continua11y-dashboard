'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('issues', function (table) {
      table.increments();
      table.integer('page_id');
      table.string('type');
      table.text('code');
      table.text('description');
      table.text('context');
      table.text('selector');
      table.index(['page_id', 'type'], 'issues_page_and_type');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages')
  ]);
};
