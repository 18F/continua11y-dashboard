'use strict';

const InsertRecords = require('./records');

class Issues extends InsertRecords {
  attributes(data) {
    return {
      code:         data.code,
      context:      data.context,
      description:  data.message,
      selector:     data.selector,
      type:         data.type,
      page_id:      data.page_id
    };
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

module.exports = Issues;

