'use strict';

const InsertRecords = require('../insert-records');

class Page extends InsertRecords {
  attributes(data) {
    return {
      report_id: data.report_id,
      path: data.path,
      size: data.size
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
