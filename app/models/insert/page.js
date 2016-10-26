'use strict';

const InsertRecord = require('../insert-record');

class Page extends InsertRecord {
  attributes() {
    return {
      report_id: this.data.report_id,
      path: this.data.path,
      size: this.data.size
    };
  }

  tableName() {
    return 'pages';
  }

  requiredKeys() {
    return ['report_id', 'path', 'size'];
  }

  returningColumns() {
    return ['id', 'report_id', 'path', 'size'];
  }
}

module.exports = Page;
