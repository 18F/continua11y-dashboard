'use strict';

const InsertRecord = require('../insert-record');

class Issue extends InsertRecord {
  attributes() {
    return this.data;
  }

  tableName() {
    return 'issues';
  }

  requiredKeys() {
    return ['page_id', 'code', 'type', 'selector'];
  }

  returningColumns() {
    return ['id', 'page_id', 'code', 'type', 'selector', 'context'];
  }
}

module.exports = Issue;

